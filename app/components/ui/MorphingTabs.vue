<script setup lang="ts">
const props = withDefaults(defineProps<{ activeTab: string; margin?: number; blurStdDeviation?: number }>(), { margin: 5, blurStdDeviation: 2 })
const root = useTemplateRef<HTMLElement>('root')
const indicator = ref({ x: 0, width: 0, visible: false })
let observer: ResizeObserver | undefined
const update = () => {
  const element = root.value?.querySelector<HTMLElement>(`[data-tab-id="${props.activeTab}"]`)
  const bounds = root.value?.getBoundingClientRect()
  if (!element || !bounds) return (indicator.value.visible = false)
  const rect = element.getBoundingClientRect()
  indicator.value = { x: rect.left - bounds.left - props.margin, width: rect.width + props.margin * 2, visible: true }
}
watch(() => props.activeTab, () => nextTick(update), { immediate: true })
onMounted(() => { observer = new ResizeObserver(update); if (root.value) observer.observe(root.value); nextTick(update) })
onBeforeUnmount(() => observer?.disconnect())
</script>
<template>
  <div ref="root" class="morphing-tabs" data-morphing-tabs :style="{ '--goo-blur': `${blurStdDeviation}px` }">
    <span class="morphing-tabs__indicator" :class="{ 'morphing-tabs__indicator--visible': indicator.visible }" :style="{ transform: `translateX(${indicator.x}px)`, width: `${indicator.width}px` }" aria-hidden="true" />
    <slot />
  </div>
</template>
<style scoped>
.morphing-tabs { position: relative; display: flex; align-items: center; }
.morphing-tabs__indicator { position: absolute; z-index: 0; inset-block: calc(-1 * var(--space-2)); border-radius: var(--radius-pill); opacity: 0; background: color-mix(in srgb, var(--color-accent) 16%, transparent); border: 1px solid color-mix(in srgb, var(--color-accent) 22%, transparent); filter: blur(var(--goo-blur)); transition: transform var(--motion-duration-base) var(--motion-ease-emphasized), width var(--motion-duration-base) var(--motion-ease-emphasized), opacity var(--motion-duration-fast) var(--motion-ease-standard); }
.morphing-tabs__indicator--visible { opacity: 1; }
@media (prefers-reduced-motion: reduce) { .morphing-tabs__indicator { transition: none; } }
</style>
