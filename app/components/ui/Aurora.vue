<script setup lang="ts">
import { Color, Mesh, Program, Renderer, Triangle } from 'ogl'
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'

interface AuroraProps {
  colorStops?: string[]
  amplitude?: number
  blend?: number
  time?: number
  speed?: number
}

interface AuroraUniforms {
  uTime: { value: number }
  uAmplitude: { value: number }
  uColorStops: { value: [number, number, number][] }
  uResolution: { value: [number, number] }
  uBlend: { value: number }
}

const props = withDefaults(defineProps<AuroraProps>(), {
  colorStops: () => ['#171D22', '#7cff67', '#171D22'],
  amplitude: 1,
  blend: 0.5,
  time: undefined,
  speed: 1,
})

const container = ref<HTMLDivElement | null>(null)
const webglReady = ref(false)
const reducedMotion = ref(false)
const isVisible = ref(false)
const isAnimating = ref(false)

let renderer: Renderer | undefined
let mesh: Mesh | undefined
let uniforms: AuroraUniforms | undefined
let animationFrame: number | undefined
let resizeObserver: ResizeObserver | undefined
let intersectionObserver: IntersectionObserver | undefined
let motionQuery: MediaQueryList | undefined
let documentVisible = true
let contextLost = false

const vertexShader = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}`

const fragmentShader = `#version 300 es
precision highp float;

uniform float uTime;
uniform float uAmplitude;
uniform vec3 uColorStops[3];
uniform vec2 uResolution;
uniform float uBlend;
out vec4 fragColor;

vec3 permute(vec3 x) {
  return mod(((x * 34.0) + 1.0) * x, 289.0);
}

float snoise(vec2 v) {
  const vec4 C = vec4(
    0.211324865405187, 0.366025403784439,
    -0.577350269189626, 0.024390243902439
  );
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

struct ColorStop {
  vec3 color;
  float position;
};

#define COLOR_RAMP(colors, factor, finalColor) { \
  int index = 0; \
  for (int i = 0; i < 2; i++) { \
    ColorStop currentColor = colors[i]; \
    bool isInBetween = currentColor.position <= factor; \
    index = int(mix(float(index), float(i), float(isInBetween))); \
  } \
  ColorStop currentColor = colors[index]; \
  ColorStop nextColor = colors[index + 1]; \
  float range = nextColor.position - currentColor.position; \
  float lerpFactor = (factor - currentColor.position) / range; \
  finalColor = mix(currentColor.color, nextColor.color, lerpFactor); \
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  ColorStop colors[3];
  colors[0] = ColorStop(uColorStops[0], 0.0);
  colors[1] = ColorStop(uColorStops[1], 0.5);
  colors[2] = ColorStop(uColorStops[2], 1.0);

  vec3 rampColor;
  COLOR_RAMP(colors, uv.x, rampColor);

  float height = snoise(vec2(uv.x * 2.0 + uTime * 0.1, uTime * 0.25)) * 0.5 * uAmplitude;
  height = exp(height);
  height = uv.y * 2.0 - height + 0.2;
  float intensity = 0.6 * height;
  float midpoint = 0.20;
  float auroraAlpha = smoothstep(midpoint - uBlend * 0.5, midpoint + uBlend * 0.5, intensity);
  vec3 auroraColor = intensity * rampColor;

  fragColor = vec4(auroraColor * auroraAlpha, auroraAlpha);
}`

const colorStopsToRgb = (stops: string[]): [number, number, number][] =>
  stops.slice(0, 3).map((hex) => {
    const color = new Color(hex)
    return [color.r, color.g, color.b]
  })

const stopAnimation = () => {
  if (animationFrame !== undefined) cancelAnimationFrame(animationFrame)

  animationFrame = undefined
  isAnimating.value = false
}

const render = (timestamp: number) => {
  if (!renderer || !mesh || !uniforms || !isVisible.value || !documentVisible) {
    animationFrame = undefined
    return
  }

  const time = props.time ?? timestamp * 0.01
  uniforms.uTime.value = time * props.speed * 0.1
  renderer.render({ scene: mesh })
  isAnimating.value = true
  animationFrame = requestAnimationFrame(render)
}

const renderStaticFrame = () => {
  if (!renderer || !mesh || !uniforms) return

  uniforms.uTime.value = 0
  renderer.render({ scene: mesh })
}

const startAnimation = () => {
  if (
    reducedMotion.value ||
    animationFrame !== undefined ||
    !renderer ||
    !isVisible.value ||
    !documentVisible
  ) {
    return
  }

  animationFrame = requestAnimationFrame(render)
  isAnimating.value = true
}

const updateSize = () => {
  if (!container.value || !renderer || !uniforms) return

  const width = container.value.clientWidth
  const height = container.value.clientHeight
  const compactViewport = window.matchMedia('(width < 48rem)').matches

  if (width <= 0 || height <= 0) return

  renderer.dpr = Math.min(
    window.devicePixelRatio || 1,
    compactViewport ? 1.25 : 1.5,
  )
  renderer.setSize(width, height)
  uniforms.uResolution.value = [
    renderer.gl.canvas.width,
    renderer.gl.canvas.height,
  ]

  if (reducedMotion.value) renderStaticFrame()
}

const destroyRenderer = (loseContext = true) => {
  stopAnimation()

  if (renderer) {
    const canvas = renderer.gl.canvas
    if (loseContext)
      renderer.gl.getExtension('WEBGL_lose_context')?.loseContext()
    canvas.remove()
  }

  renderer = undefined
  mesh = undefined
  uniforms = undefined
  webglReady.value = false
  isAnimating.value = false
}

const handleContextLost = (event: Event) => {
  event.preventDefault()
  contextLost = true
  destroyRenderer(false)
}

const initialize = () => {
  if (
    !container.value ||
    renderer ||
    reducedMotion.value ||
    contextLost ||
    !isVisible.value
  ) {
    return
  }

  try {
    renderer = new Renderer({
      alpha: true,
      antialias: false,
      dpr: 1,
      premultipliedAlpha: true,
      webgl: 2,
    })

    const gl = renderer.gl
    gl.clearColor(0, 0, 0, 0)
    gl.enable(gl.BLEND)
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA)

    const geometry = new Triangle(gl)
    if (geometry.attributes.uv) delete geometry.attributes.uv

    uniforms = {
      uTime: { value: 0 },
      uAmplitude: { value: props.amplitude },
      uColorStops: { value: colorStopsToRgb(props.colorStops) },
      uResolution: { value: [1, 1] },
      uBlend: { value: props.blend },
    }

    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms,
    })
    mesh = new Mesh(gl, { geometry, program })

    gl.canvas.classList.add('aurora__canvas')
    gl.canvas.setAttribute('aria-hidden', 'true')
    gl.canvas.addEventListener('webglcontextlost', handleContextLost, {
      once: true,
    })
    container.value.appendChild(gl.canvas)
    updateSize()
    webglReady.value = true
    startAnimation()
  } catch {
    destroyRenderer()
  }
}

const syncMotionPreference = () => {
  reducedMotion.value = motionQuery?.matches ?? false

  if (reducedMotion.value) {
    destroyRenderer()
    return
  }

  initialize()
  startAnimation()
}

const handleVisibilityChange = () => {
  documentVisible = document.visibilityState === 'visible'
  if (documentVisible) startAnimation()
  else stopAnimation()
}

watch(
  () => [props.colorStops, props.amplitude, props.blend],
  () => {
    if (!uniforms) return

    uniforms.uColorStops.value = colorStopsToRgb(props.colorStops)
    uniforms.uAmplitude.value = props.amplitude
    uniforms.uBlend.value = props.blend
    renderStaticFrame()
  },
  { deep: true },
)

watch(
  () => props.speed,
  () => startAnimation(),
)

onMounted(() => {
  if (!container.value) return

  motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  reducedMotion.value = motionQuery.matches
  motionQuery.addEventListener('change', syncMotionPreference)

  documentVisible = document.visibilityState === 'visible'
  document.addEventListener('visibilitychange', handleVisibilityChange)

  resizeObserver = new ResizeObserver(updateSize)
  resizeObserver.observe(container.value)

  intersectionObserver = new IntersectionObserver(
    ([entry]) => {
      isVisible.value = entry?.isIntersecting ?? false

      if (!isVisible.value) {
        stopAnimation()
        return
      }

      initialize()
      startAnimation()
    },
    { threshold: 0.01 },
  )
  intersectionObserver.observe(container.value)
})

onBeforeUnmount(() => {
  stopAnimation()
  resizeObserver?.disconnect()
  intersectionObserver?.disconnect()
  motionQuery?.removeEventListener('change', syncMotionPreference)
  document.removeEventListener('visibilitychange', handleVisibilityChange)
  destroyRenderer()
})
</script>

<template>
  <div
    ref="container"
    class="aurora"
    :class="{ 'aurora--ready': webglReady }"
    :data-motion="reducedMotion ? 'static' : 'active'"
    :data-render-state="
      reducedMotion ? 'static' : isAnimating ? 'rendering' : 'paused'
    "
    data-aurora
    aria-hidden="true"
  />
</template>

<style scoped>
.aurora {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
}

.aurora::before {
  position: absolute;
  inset: 0;
  content: '';
  background:
    radial-gradient(
      75% 52% at 72% 18%,
      var(--aurora-fallback-middle, transparent),
      transparent 72%
    ),
    linear-gradient(
      132deg,
      var(--aurora-fallback-start, transparent),
      var(--aurora-fallback-end, transparent)
    );
  opacity: 0.52;
  transition: opacity var(--motion-duration-base) var(--motion-ease-standard);
}

.aurora--ready::before {
  opacity: 0;
}

:deep(.aurora__canvas) {
  display: block;
  width: 100%;
  height: 100%;
}

@media (prefers-reduced-motion: reduce) {
  .aurora::before {
    transition: none;
  }
}
</style>
