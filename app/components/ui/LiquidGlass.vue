<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    radius?: number
    border?: number
    lightness?: number
    blend?: string
    alpha?: number
    blur?: number
    scale?: number
    frost?: number
  }>(),
  {
    radius: 16,
    border: 0.04,
    lightness: 50,
    blend: 'difference',
    alpha: 0.9,
    blur: 6,
    scale: -70,
    frost: 0.08,
  },
)

const root = useTemplateRef<HTMLElement>('root')
const enhanced = ref(false)
const filterId = `liquid-glass-${useId()}`
const dimensions = reactive({ width: 0, height: 0 })
let observer: ResizeObserver | undefined

const displacement = computed(
  () =>
    `data:image/svg+xml,${encodeURIComponent(`<svg viewBox="0 0 ${dimensions.width} ${dimensions.height}" xmlns="http://www.w3.org/2000/svg"><rect width="${dimensions.width}" height="${dimensions.height}" rx="${props.radius}" fill="hsl(0 0% ${props.lightness}% / ${props.alpha})" style="filter:blur(${props.blur}px)"/></svg>`)}`,
)

onMounted(() => {
  enhanced.value = CSS.supports('backdrop-filter', `url(#${filterId})`)
  observer = new ResizeObserver(([entry]) => {
    if (!entry) return
    dimensions.width = entry.contentRect.width
    dimensions.height = entry.contentRect.height
  })
  if (root.value) observer.observe(root.value)
})
onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <div
    ref="root"
    class="liquid-glass"
    :class="{ 'liquid-glass--enhanced': enhanced }"
    :style="{
      '--liquid-radius': `${radius}px`,
      '--liquid-frost': frost,
      '--liquid-filter': `url(#${filterId})`,
    }"
    data-liquid-glass
  >
    <slot />
    <svg aria-hidden="true">
      <defs>
        <filter :id="filterId">
          <feImage :href="displacement" result="map" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="map"
            xChannelSelector="R"
            yChannelSelector="B"
            :scale="scale"
          />
        </filter>
      </defs>
    </svg>
  </div>
</template>

<style scoped>
.liquid-glass {
  position: relative;
  overflow: hidden;
  border-radius: var(--liquid-radius);
  background: color-mix(in srgb, var(--color-surface) 82%, transparent);
  border: 1px solid color-mix(in srgb, var(--color-border) 74%, transparent);
  box-shadow: var(--shadow-subtle);
  backdrop-filter: blur(1rem);
}
.liquid-glass--enhanced {
  backdrop-filter: var(--liquid-filter);
}
.liquid-glass svg {
  position: absolute;
  width: 0;
  height: 0;
  pointer-events: none;
}
</style>
