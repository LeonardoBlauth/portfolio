<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    activeTab: string
    margin?: number
    blurStdDeviation?: number
  }>(),
  { margin: 0, blurStdDeviation: 0 },
)
const root = useTemplateRef<HTMLElement>('root')
const indicator = ref({ x: 0, width: 0, visible: false })
let observer: ResizeObserver | undefined
const update = () => {
  const element = root.value?.querySelector<HTMLElement>(
    `[data-tab-id="${props.activeTab}"]`,
  )
  const bounds = root.value?.getBoundingClientRect()
  if (!element || !bounds) return (indicator.value.visible = false)
  const rect = element.getBoundingClientRect()
  indicator.value = {
    x: rect.left - bounds.left - props.margin,
    width: rect.width + props.margin * 2,
    visible: true,
  }
}
watch(
  () => props.activeTab,
  () => nextTick(update),
  { immediate: true },
)
onMounted(() => {
  observer = new ResizeObserver(update)
  if (root.value) observer.observe(root.value)
  nextTick(update)
})
onBeforeUnmount(() => observer?.disconnect())
</script>
<template>
  <div ref="root" class="morphing-tabs" data-morphing-tabs>
    <span
      class="morphing-tabs__indicator"
      :class="{ 'morphing-tabs__indicator--visible': indicator.visible }"
      :style="{
        transform: `translateX(${indicator.x}px)`,
        width: `${indicator.width}px`,
      }"
      data-morphing-indicator
      data-indicator-kind="underline"
      aria-hidden="true"
    />
    <slot />
  </div>
</template>
<style scoped>
.morphing-tabs {
  position: relative;
  display: flex;
  align-items: center;
}

.morphing-tabs__indicator {
  position: absolute;
  z-index: 1;
  inset-inline-start: 0;
  inset-block-end: -0.2rem;
  height: 2px;
  pointer-events: none;
  border-radius: 1px;
  opacity: 0;
  background: var(--color-brand-cobalt);
  transition:
    transform var(--motion-duration-base) var(--motion-ease-emphasized),
    width var(--motion-duration-base) var(--motion-ease-emphasized),
    opacity var(--motion-duration-fast) var(--motion-ease-standard);
}

.morphing-tabs__indicator--visible {
  opacity: 1;
}

@media (prefers-reduced-motion: reduce) {
  .morphing-tabs__indicator {
    transition: none;
  }
}
</style>
