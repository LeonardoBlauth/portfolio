<script setup lang="ts">
/**
 * Inspira UI Compare interaction (hover | drag), without Tailwind, StarField, or autoplay.
 * Source: https://registry.inspira-ui.com/compare.json
 */
interface Props {
  firstImage: string
  secondImage: string
  firstImageAlt: string
  secondImageAlt: string
  firstLabel: string
  secondLabel: string
  accessibleName: string
  width?: number
  height?: number
  initialSliderPercentage?: number
  showHandlebar?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  width: 2397,
  height: 1352,
  initialSliderPercentage: 50,
  showHandlebar: true,
})

const sliderRef = useTemplateRef<HTMLElement>('sliderRef')
const sliderXPercent = ref(props.initialSliderPercentage)
const isDragging = ref(false)
const isSettling = ref(false)
const fineHover = ref(false)
const reducedMotion = ref(false)

let hoverQuery: MediaQueryList | null = null
let motionQuery: MediaQueryList | null = null

const clampPercent = (value: number) => Math.max(0, Math.min(100, value))

const setFromClientX = (clientX: number) => {
  if (!sliderRef.value) return
  const rect = sliderRef.value.getBoundingClientRect()
  if (rect.width === 0) return
  isSettling.value = false
  sliderXPercent.value = clampPercent(
    ((clientX - rect.left) / rect.width) * 100,
  )
}

const resetToInitial = () => {
  isDragging.value = false
  isSettling.value = !reducedMotion.value
  sliderXPercent.value = props.initialSliderPercentage
}

const onPointerMove = (event: PointerEvent) => {
  if (event.pointerType === 'touch' || event.pointerType === 'pen') {
    if (!isDragging.value) return
    setFromClientX(event.clientX)
    return
  }

  if (fineHover.value) {
    setFromClientX(event.clientX)
    return
  }

  if (isDragging.value) setFromClientX(event.clientX)
}

const onPointerDown = (event: PointerEvent) => {
  if (fineHover.value && event.pointerType === 'mouse') return
  isDragging.value = true
  isSettling.value = false
  sliderRef.value?.setPointerCapture(event.pointerId)
  setFromClientX(event.clientX)
}

const onPointerUp = (event: PointerEvent) => {
  if (!isDragging.value) return
  isDragging.value = false
  if (sliderRef.value?.hasPointerCapture(event.pointerId)) {
    sliderRef.value.releasePointerCapture(event.pointerId)
  }
}

const onPointerLeave = () => {
  if (isDragging.value) return
  if (fineHover.value) resetToInitial()
}

const onKeydown = (event: KeyboardEvent) => {
  isSettling.value = false
  if (event.key === 'ArrowLeft') {
    event.preventDefault()
    sliderXPercent.value = clampPercent(sliderXPercent.value - 2)
  }
  if (event.key === 'ArrowRight') {
    event.preventDefault()
    sliderXPercent.value = clampPercent(sliderXPercent.value + 2)
  }
  if (event.key === 'Home') {
    event.preventDefault()
    sliderXPercent.value = 0
  }
  if (event.key === 'End') {
    event.preventDefault()
    sliderXPercent.value = 100
  }
}

const syncMedia = () => {
  fineHover.value = hoverQuery?.matches ?? false
  reducedMotion.value = motionQuery?.matches ?? false
}

onMounted(() => {
  hoverQuery = window.matchMedia('(hover: hover) and (pointer: fine)')
  motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  syncMedia()
  hoverQuery.addEventListener('change', syncMedia)
  motionQuery.addEventListener('change', syncMedia)
})

onBeforeUnmount(() => {
  hoverQuery?.removeEventListener('change', syncMedia)
  motionQuery?.removeEventListener('change', syncMedia)
})
</script>

<template>
  <div class="theme-compare" :data-fine-hover="fineHover ? 'true' : 'false'">
    <div
      ref="sliderRef"
      class="theme-compare__surface"
      :class="{ 'theme-compare__surface--settle': isSettling }"
      :style="{ aspectRatio: `${width} / ${height}` }"
      @pointerdown="onPointerDown"
      @pointermove="onPointerMove"
      @pointerup="onPointerUp"
      @pointercancel="onPointerUp"
      @pointerleave="onPointerLeave"
    >
      <img
        class="theme-compare__image theme-compare__image--second"
        :src="secondImage"
        :alt="secondImageAlt"
        :width="width"
        :height="height"
        draggable="false"
        decoding="async"
      />
      <div
        class="theme-compare__first"
        :style="{ clipPath: `inset(0 ${100 - sliderXPercent}% 0 0)` }"
      >
        <img
          class="theme-compare__image"
          :src="firstImage"
          :alt="firstImageAlt"
          :width="width"
          :height="height"
          draggable="false"
          decoding="async"
        />
      </div>
      <div
        class="theme-compare__divider"
        :style="{ insetInlineStart: `${sliderXPercent}%` }"
      >
        <button
          v-if="showHandlebar"
          type="button"
          class="theme-compare__handle"
          role="slider"
          :aria-label="accessibleName"
          :aria-valuemin="0"
          :aria-valuemax="100"
          :aria-valuenow="Math.round(sliderXPercent)"
          :aria-valuetext="`${Math.round(sliderXPercent)}%`"
          @keydown="onKeydown"
          @pointerdown.stop="onPointerDown"
        />
      </div>
    </div>
    <p class="theme-compare__labels">
      <span>{{ firstLabel }}</span>
      <span>{{ secondLabel }}</span>
    </p>
  </div>
</template>

<style scoped>
.theme-compare {
  min-inline-size: 0;
}

.theme-compare__surface {
  position: relative;
  overflow: hidden;
  touch-action: pan-y;
  cursor: ew-resize;
  user-select: none;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
}

.theme-compare[data-fine-hover='true'] .theme-compare__surface {
  cursor: col-resize;
}

.theme-compare__surface--settle .theme-compare__first,
.theme-compare__surface--settle .theme-compare__divider {
  transition:
    clip-path 240ms var(--motion-ease-standard),
    inset-inline-start 240ms var(--motion-ease-standard);
}

.theme-compare__image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: top left;
  pointer-events: none;
}

.theme-compare__image--second,
.theme-compare__first {
  position: absolute;
  inset: 0;
}

.theme-compare__first {
  z-index: 1;
  overflow: hidden;
}

.theme-compare__divider {
  position: absolute;
  z-index: 2;
  inset-block: 0;
  width: 1px;
  background: var(--color-accent);
  transform: translateX(-50%);
  pointer-events: none;
}

.theme-compare__handle {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 1.25rem;
  height: 1.25rem;
  padding: 0;
  pointer-events: auto;
  cursor: ew-resize;
  background: var(--color-surface-elevated);
  border: 2px solid var(--color-accent);
  border-radius: var(--radius-sm);
  box-shadow: var(--shadow-subtle);
  transform: translate(-50%, -50%);
}

.theme-compare__labels {
  display: flex;
  justify-content: space-between;
  margin-block-start: var(--space-3);
  color: var(--color-text-muted);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

@media (prefers-reduced-motion: reduce) {
  .theme-compare__surface--settle .theme-compare__first,
  .theme-compare__surface--settle .theme-compare__divider {
    transition: none;
  }
}
</style>
