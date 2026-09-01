<script setup lang="ts">
import { Mesh, Program, Renderer, Triangle } from 'ogl'
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'

export type RaysOrigin =
  | 'top-center'
  | 'top-left'
  | 'top-right'
  | 'right'
  | 'left'
  | 'bottom-center'
  | 'bottom-right'
  | 'bottom-left'

interface LightRaysProps {
  raysOrigin?: RaysOrigin
  raysColor?: string
  raysSpeed?: number
  lightSpread?: number
  rayLength?: number
  pulsating?: boolean
  fadeDistance?: number
  saturation?: number
  followMouse?: boolean
  mouseInfluence?: number
  noiseAmount?: number
  distortion?: number
}

const props = withDefaults(defineProps<LightRaysProps>(), {
  raysOrigin: 'top-center',
  raysColor: '#ffffff',
  raysSpeed: 1,
  lightSpread: 1,
  rayLength: 2,
  pulsating: false,
  fadeDistance: 1,
  saturation: 1,
  followMouse: true,
  mouseInfluence: 0.1,
  noiseAmount: 0,
  distortion: 0,
})

interface Uniforms {
  iTime: { value: number }
  iResolution: { value: [number, number] }
  rayPos: { value: [number, number] }
  rayDir: { value: [number, number] }
  raysColor: { value: [number, number, number] }
  raysSpeed: { value: number }
  lightSpread: { value: number }
  rayLength: { value: number }
  pulsating: { value: number }
  fadeDistance: { value: number }
  saturation: { value: number }
  mousePos: { value: [number, number] }
  mouseInfluence: { value: number }
  noiseAmount: { value: number }
  distortion: { value: number }
}

const container = ref<HTMLDivElement>()
const webglReady = ref(false)

let renderer: Renderer | undefined
let mesh: Mesh | undefined
let uniforms: Uniforms | undefined
let frameId: number | undefined
let pointerFrameId: number | undefined
let intersectionObserver: IntersectionObserver | undefined
let resizeObserver: ResizeObserver | undefined
let visible = false
let documentVisible = true
let reducedMotion = false
let pointerEnabled = false
let pointer = { x: 0.5, y: 0.5 }
let smoothPointer = { x: 0.5, y: 0.5 }

const vertexShader = `
attribute vec2 position;
varying vec2 vUv;

void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}`

const fragmentShader = `
precision highp float;

uniform float iTime;
uniform vec2 iResolution;
uniform vec2 rayPos;
uniform vec2 rayDir;
uniform vec3 raysColor;
uniform float raysSpeed;
uniform float lightSpread;
uniform float rayLength;
uniform float pulsating;
uniform float fadeDistance;
uniform float saturation;
uniform vec2 mousePos;
uniform float mouseInfluence;
uniform float noiseAmount;
uniform float distortion;

varying vec2 vUv;

float noise(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

float rayStrength(vec2 raySource, vec2 rayRefDirection, vec2 coord,
  float seedA, float seedB, float speed) {
  vec2 sourceToCoord = coord - raySource;
  vec2 dirNorm = normalize(sourceToCoord);
  float cosAngle = dot(dirNorm, rayRefDirection);
  float distortedAngle = cosAngle + distortion *
    sin(iTime * 2.0 + length(sourceToCoord) * 0.01) * 0.2;
  float spreadFactor = pow(max(distortedAngle, 0.0),
    1.0 / max(lightSpread, 0.001));
  float distance = length(sourceToCoord);
  float maxDistance = iResolution.x * rayLength;
  float lengthFalloff = clamp((maxDistance - distance) / maxDistance, 0.0, 1.0);
  float fadeFalloff = clamp(
    (iResolution.x * fadeDistance - distance) /
      (iResolution.x * fadeDistance),
    0.5,
    1.0
  );
  float pulse = pulsating > 0.5
    ? (0.8 + 0.2 * sin(iTime * speed * 3.0))
    : 1.0;
  float baseStrength = clamp(
    (0.45 + 0.15 * sin(distortedAngle * seedA + iTime * speed)) +
    (0.3 + 0.2 * cos(-distortedAngle * seedB + iTime * speed)),
    0.0,
    1.0
  );

  return baseStrength * lengthFalloff * fadeFalloff * spreadFactor * pulse;
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  vec2 coord = vec2(fragCoord.x, iResolution.y - fragCoord.y);
  vec2 finalRayDir = rayDir;

  if (mouseInfluence > 0.0) {
    vec2 mouseScreenPos = mousePos * iResolution.xy;
    vec2 mouseDirection = normalize(mouseScreenPos - rayPos);
    finalRayDir = normalize(mix(rayDir, mouseDirection, mouseInfluence));
  }

  vec4 rays1 = vec4(1.0) * rayStrength(
    rayPos, finalRayDir, coord, 36.2214, 21.11349, 1.5 * raysSpeed
  );
  vec4 rays2 = vec4(1.0) * rayStrength(
    rayPos, finalRayDir, coord, 22.3991, 18.0234, 1.1 * raysSpeed
  );
  fragColor = rays1 * 0.5 + rays2 * 0.4;

  if (noiseAmount > 0.0) {
    float n = noise(coord * 0.01 + iTime * 0.1);
    fragColor.rgb *= (1.0 - noiseAmount + noiseAmount * n);
  }

  float brightness = 1.0 - (coord.y / iResolution.y);
  fragColor.x *= 0.1 + brightness * 0.8;
  fragColor.y *= 0.3 + brightness * 0.6;
  fragColor.z *= 0.5 + brightness * 0.5;

  if (saturation != 1.0) {
    float gray = dot(fragColor.rgb, vec3(0.299, 0.587, 0.114));
    fragColor.rgb = mix(vec3(gray), fragColor.rgb, saturation);
  }

  fragColor.rgb *= raysColor;
}

void main() {
  vec4 color;
  mainImage(color, gl_FragCoord.xy);
  gl_FragColor = color;
}`

const hexToRgb = (hex: string): [number, number, number] => {
  const match = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)

  if (!match) return [1, 1, 1]

  return [
    Number.parseInt(match[1]!, 16) / 255,
    Number.parseInt(match[2]!, 16) / 255,
    Number.parseInt(match[3]!, 16) / 255,
  ]
}

const getPlacement = (
  origin: RaysOrigin,
  width: number,
  height: number,
): { anchor: [number, number]; direction: [number, number] } => {
  const outside = 0.2

  switch (origin) {
    case 'top-left':
      return { anchor: [0, -outside * height], direction: [0, 1] }
    case 'top-right':
      return { anchor: [width, -outside * height], direction: [0, 1] }
    case 'left':
      return { anchor: [-outside * width, 0.5 * height], direction: [1, 0] }
    case 'right':
      return {
        anchor: [(1 + outside) * width, 0.5 * height],
        direction: [-1, 0],
      }
    case 'bottom-left':
      return {
        anchor: [0, (1 + outside) * height],
        direction: [0, -1],
      }
    case 'bottom-center':
      return {
        anchor: [0.5 * width, (1 + outside) * height],
        direction: [0, -1],
      }
    case 'bottom-right':
      return {
        anchor: [width, (1 + outside) * height],
        direction: [0, -1],
      }
    default:
      return {
        anchor: [0.5 * width, -outside * height],
        direction: [0, 1],
      }
  }
}

const updateSize = () => {
  if (!container.value || !renderer || !uniforms) return

  const mobile = window.matchMedia('(width < 48rem)').matches
  renderer.dpr = Math.min(window.devicePixelRatio || 1, mobile ? 1.25 : 2)
  renderer.setSize(container.value.clientWidth, container.value.clientHeight)

  const width = container.value.clientWidth * renderer.dpr
  const height = container.value.clientHeight * renderer.dpr
  const { anchor, direction } = getPlacement(props.raysOrigin, width, height)

  uniforms.iResolution.value = [width, height]
  uniforms.rayPos.value = anchor
  uniforms.rayDir.value = direction
}

const stopAnimation = () => {
  if (frameId !== undefined) {
    cancelAnimationFrame(frameId)
    frameId = undefined
  }
}

const renderFrame = (time: number) => {
  if (!renderer || !mesh || !uniforms || !visible || !documentVisible) {
    frameId = undefined
    return
  }

  uniforms.iTime.value = time * 0.001

  if (pointerEnabled) {
    const smoothing = 0.92
    smoothPointer = {
      x: smoothPointer.x * smoothing + pointer.x * (1 - smoothing),
      y: smoothPointer.y * smoothing + pointer.y * (1 - smoothing),
    }
    uniforms.mousePos.value = [smoothPointer.x, smoothPointer.y]
  }

  renderer.render({ scene: mesh })
  frameId = requestAnimationFrame(renderFrame)
}

const startAnimation = () => {
  if (
    reducedMotion ||
    frameId !== undefined ||
    !renderer ||
    !visible ||
    !documentVisible
  ) {
    return
  }

  frameId = requestAnimationFrame(renderFrame)
}

const handlePointerMove = (event: PointerEvent) => {
  if (!container.value || pointerFrameId !== undefined) return

  pointerFrameId = requestAnimationFrame(() => {
    if (container.value) {
      const bounds = container.value.getBoundingClientRect()
      pointer = {
        x: (event.clientX - bounds.left) / bounds.width,
        y: (event.clientY - bounds.top) / bounds.height,
      }
    }
    pointerFrameId = undefined
  })
}

const handleVisibilityChange = () => {
  documentVisible = document.visibilityState === 'visible'
  if (documentVisible) startAnimation()
  else stopAnimation()
}

const initialize = async () => {
  if (!container.value || renderer || reducedMotion) return

  await nextTick()
  if (!container.value) return

  try {
    renderer = new Renderer({
      alpha: true,
      antialias: false,
      dpr: 1,
      powerPreference: 'high-performance',
    })

    const gl = renderer.gl
    const geometry = new Triangle(gl)
    uniforms = {
      iTime: { value: 0 },
      iResolution: { value: [1, 1] },
      rayPos: { value: [0, 0] },
      rayDir: { value: [0, 1] },
      raysColor: { value: hexToRgb(props.raysColor) },
      raysSpeed: { value: props.raysSpeed },
      lightSpread: { value: props.lightSpread },
      rayLength: { value: props.rayLength },
      pulsating: { value: props.pulsating ? 1 : 0 },
      fadeDistance: { value: props.fadeDistance },
      saturation: { value: props.saturation },
      mousePos: { value: [0.5, 0.5] },
      mouseInfluence: { value: pointerEnabled ? props.mouseInfluence : 0 },
      noiseAmount: { value: props.noiseAmount },
      distortion: { value: props.distortion },
    }

    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms,
    })
    mesh = new Mesh(gl, { geometry, program })

    gl.canvas.classList.add('light-rays__canvas')
    gl.canvas.setAttribute('aria-hidden', 'true')
    container.value.appendChild(gl.canvas)
    updateSize()
    webglReady.value = true
    startAnimation()
  } catch {
    destroyRenderer()
  }
}

const destroyRenderer = () => {
  stopAnimation()

  if (renderer) {
    const canvas = renderer.gl.canvas
    renderer.gl.getExtension('WEBGL_lose_context')?.loseContext()
    canvas.remove()
  }

  renderer = undefined
  mesh = undefined
  uniforms = undefined
  webglReady.value = false
}

watch(
  () => [
    props.raysColor,
    props.raysSpeed,
    props.lightSpread,
    props.rayLength,
    props.pulsating,
    props.fadeDistance,
    props.saturation,
    props.mouseInfluence,
    props.noiseAmount,
    props.distortion,
  ],
  () => {
    if (!uniforms) return
    uniforms.raysColor.value = hexToRgb(props.raysColor)
    uniforms.raysSpeed.value = props.raysSpeed
    uniforms.lightSpread.value = props.lightSpread
    uniforms.rayLength.value = props.rayLength
    uniforms.pulsating.value = props.pulsating ? 1 : 0
    uniforms.fadeDistance.value = props.fadeDistance
    uniforms.saturation.value = props.saturation
    uniforms.mouseInfluence.value = pointerEnabled ? props.mouseInfluence : 0
    uniforms.noiseAmount.value = props.noiseAmount
    uniforms.distortion.value = props.distortion
    updateSize()
  },
)

onMounted(() => {
  if (!container.value) return

  reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  pointerEnabled =
    props.followMouse &&
    !reducedMotion &&
    window.matchMedia('(hover: hover) and (pointer: fine)').matches

  documentVisible = document.visibilityState === 'visible'
  document.addEventListener('visibilitychange', handleVisibilityChange)

  intersectionObserver = new IntersectionObserver(
    ([entry]) => {
      if (!entry) return

      visible = entry.isIntersecting
      if (visible) {
        if (renderer) startAnimation()
        else void initialize()
      } else {
        stopAnimation()
      }
    },
    { threshold: 0.05 },
  )
  intersectionObserver.observe(container.value)

  resizeObserver = new ResizeObserver(updateSize)
  resizeObserver.observe(container.value)

  if (pointerEnabled) {
    window.addEventListener('pointermove', handlePointerMove, { passive: true })
  }
})

onBeforeUnmount(() => {
  intersectionObserver?.disconnect()
  resizeObserver?.disconnect()
  document.removeEventListener('visibilitychange', handleVisibilityChange)
  window.removeEventListener('pointermove', handlePointerMove)

  if (pointerFrameId !== undefined) cancelAnimationFrame(pointerFrameId)
  destroyRenderer()
})
</script>

<template>
  <div
    ref="container"
    class="light-rays"
    :class="{ 'light-rays--ready': webglReady }"
  />
</template>

<style scoped>
.light-rays {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
}

.light-rays::before {
  position: absolute;
  inset: 0;
  content: '';
  background:
    linear-gradient(
      112deg,
      transparent 18%,
      color-mix(in srgb, var(--color-accent) 12%, transparent) 37%,
      transparent 58%
    ),
    linear-gradient(
      72deg,
      transparent 32%,
      color-mix(in srgb, var(--color-accent) 8%, transparent) 48%,
      transparent 66%
    );
  mask-image: linear-gradient(to bottom, black, transparent 86%);
  transition: opacity var(--motion-duration-base) var(--motion-ease-standard);
}

.light-rays--ready::before {
  opacity: 0;
}

:deep(.light-rays__canvas) {
  display: block;
  width: 100%;
  height: 100%;
}

@media (prefers-reduced-motion: reduce) {
  .light-rays::before {
    opacity: 1;
    transition: none;
  }
}
</style>
