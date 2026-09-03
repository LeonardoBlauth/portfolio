<script setup lang="ts">
/**
 * Engine derived from the official Vue Bits Carousel (motion-v, drag, index).
 * Demo presentation (3D, loop, autoplay, dots, Tailwind, DEFAULT_ITEMS) is not used.
 * Source: https://github.com/DavidHDev/vue-bits/blob/main/src/content/Components/Carousel/Carousel.vue
 */
import { Motion, useMotionValue, type PanInfo } from 'motion-v'

const props = withDefaults(
  defineProps<{
    count: number
    startIndex?: number
  }>(),
  {
    startIndex: 0,
  },
)

const emit = defineEmits<{
  indexChange: [index: number]
}>()

const { t } = useI18n()

const DRAG_BUFFER = 64
const VELOCITY_THRESHOLD = 500
const TRANSITION_MS = 320
const CLICK_SLOP = 12

const suppressVisualNavigation = ref(false)
const isCarouselDragging = ref(false)

provide('projectCarouselDragGuard', suppressVisualNavigation)
provide('projectCarouselDragging', isCarouselDragging)

const currentIndex = ref(
  Math.min(Math.max(props.startIndex, 0), Math.max(props.count - 1, 0)),
)
const viewportRef = useTemplateRef<HTMLElement>('viewportRef')
const slideWidth = ref(0)
const activeSlideHeight = ref<number | undefined>(undefined)
const motionX = useMotionValue(0)
const reducedMotion = ref(false)
const allowMotion = ref(false)

let resizeObserver: ResizeObserver | null = null
let motionQuery: MediaQueryList | null = null

const lastIndex = computed(() => Math.max(props.count - 1, 0))
const canGoPrevious = computed(() => currentIndex.value > 0)
const canGoNext = computed(() => currentIndex.value < lastIndex.value)
const xTarget = computed(() => -currentIndex.value * slideWidth.value)
const counterCurrent = computed(() =>
  String(currentIndex.value + 1).padStart(2, '0'),
)
const counterTotal = computed(() => String(props.count).padStart(2, '0'))
const transition = computed(() =>
  !allowMotion.value || reducedMotion.value
    ? { duration: 0 }
    : {
        type: 'tween' as const,
        duration: TRANSITION_MS / 1000,
        ease: [0.2, 0, 0, 1],
      },
)
const dragConstraints = computed(() => ({
  left: -slideWidth.value * lastIndex.value,
  right: 0,
}))

const goTo = (index: number) => {
  const nextIndex = Math.min(Math.max(index, 0), lastIndex.value)
  currentIndex.value = nextIndex
}
const previous = () => goTo(currentIndex.value - 1)
const next = () => goTo(currentIndex.value + 1)

const isFlick = (velocity: number) =>
  Math.abs(velocity) >= VELOCITY_THRESHOLD ||
  (Math.abs(velocity) >= 0.45 && Math.abs(velocity) < 20)

const releaseVisualNavigation = () => {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      suppressVisualNavigation.value = false
    })
  })
}

const onDrag = (
  _event: MouseEvent | TouchEvent | PointerEvent,
  info: PanInfo,
) => {
  if (Math.abs(info.offset.x) > CLICK_SLOP) {
    isCarouselDragging.value = true
  }
}

const onDragEnd = (
  _event: MouseEvent | TouchEvent | PointerEvent,
  info: PanInfo,
) => {
  const offset = info.offset.x
  const velocity = info.velocity.x

  if (Math.abs(offset) > CLICK_SLOP) {
    suppressVisualNavigation.value = true
  }

  if (
    offset < -DRAG_BUFFER ||
    (offset < -24 && velocity < 0 && isFlick(velocity))
  ) {
    next()
  } else if (
    offset > DRAG_BUFFER ||
    (offset > 24 && velocity > 0 && isFlick(velocity))
  ) {
    previous()
  }

  isCarouselDragging.value = false
  releaseVisualNavigation()
}

const onKeydown = (event: KeyboardEvent) => {
  const target = event.target
  if (!(target instanceof HTMLElement)) return

  const isEditable =
    target instanceof HTMLInputElement ||
    target instanceof HTMLTextAreaElement ||
    target.isContentEditable
  if (isEditable) return

  if (target.closest('a')) return

  if (event.key === 'ArrowLeft') {
    event.preventDefault()
    previous()
  }

  if (event.key === 'ArrowRight') {
    event.preventDefault()
    next()
  }
}

const measure = () => {
  slideWidth.value = viewportRef.value?.getBoundingClientRect().width ?? 0
  const isMobile = window.matchMedia('(width < 64rem)').matches
  if (!isMobile) {
    activeSlideHeight.value = undefined
    return
  }

  const slides = Array.from(
    viewportRef.value?.querySelectorAll<HTMLElement>('[data-project-id]') ??
      [],
  )
  const activeEl = slides[currentIndex.value]
  activeSlideHeight.value = activeEl
    ? +activeEl.getBoundingClientRect().height.toFixed(1)
    : undefined
}

watch(currentIndex, (index) => {
  if (!allowMotion.value) return
  emit('indexChange', index)
  if (window.matchMedia('(width < 64rem)').matches) measure()
})

watch(
  () => props.startIndex,
  (index) => {
    if (index !== currentIndex.value) goTo(index)
  },
)

const onMotionChange = () => {
  reducedMotion.value = motionQuery?.matches ?? false
}

onMounted(() => {
  motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  reducedMotion.value = motionQuery.matches
  motionQuery.addEventListener('change', onMotionChange)
  measure()
  goTo(props.startIndex)
  motionX.set(xTarget.value)
  // Mobile: ensure viewport height matches the initial active slide.
  if (window.matchMedia('(width < 64rem)').matches) measure()
  if (viewportRef.value) {
    resizeObserver = new ResizeObserver(measure)
    resizeObserver.observe(viewportRef.value)
  }
  requestAnimationFrame(() => {
    allowMotion.value = true
  })
})

onBeforeUnmount(() => {
  motionQuery?.removeEventListener('change', onMotionChange)
  resizeObserver?.disconnect()
})

defineExpose({
  previous,
  next,
  goTo,
  currentIndex,
  canGoPrevious,
  canGoNext,
})
</script>

<template>
  <div
    class="project-carousel"
    role="region"
    tabindex="0"
    :aria-roledescription="t('selectedProjects.carousel.role')"
    :aria-label="t('selectedProjects.carousel.label')"
    @keydown="onKeydown"
  >
    <div
      ref="viewportRef"
      class="project-carousel__viewport"
      :style="
        activeSlideHeight ? { height: `${activeSlideHeight}px` } : undefined
      "
    >
      <Motion
        class="project-carousel__track"
        :class="{ 'is-dragging': isCarouselDragging }"
        :style="{ x: motionX }"
        :animate="{ x: xTarget }"
        :transition="transition"
        drag="x"
        :drag-constraints="dragConstraints"
        :drag-elastic="0.08"
        :drag-momentum="false"
        @drag="onDrag"
        @drag-end="onDragEnd"
      >
        <slot />
      </Motion>
    </div>

    <div class="project-carousel__controls">
      <p class="project-carousel__counter" aria-live="polite">
        <span class="visually-hidden">{{
          t('selectedProjects.carousel.position', {
            current: currentIndex + 1,
            total: count,
          })
        }}</span>
        <span aria-hidden="true"
          >{{ counterCurrent }} / {{ counterTotal }}</span
        >
      </p>
      <div class="project-carousel__buttons">
        <button
          type="button"
          class="project-carousel__button"
          :disabled="!canGoPrevious"
          :aria-label="t('selectedProjects.carousel.previous')"
          @click="previous"
        >
          ←
        </button>
        <button
          type="button"
          class="project-carousel__button"
          :disabled="!canGoNext"
          :aria-label="t('selectedProjects.carousel.next')"
          @click="next"
        >
          →
        </button>
      </div>
      <div
        class="project-carousel__mobile-progress"
        aria-hidden="true"
      >
        <span
          v-for="i in count"
          :key="i"
          class="project-carousel__mobile-segment"
          :class="{ 'is-active': i - 1 === currentIndex }"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.project-carousel {
  min-inline-size: 0;
  margin-block-start: clamp(var(--space-12), 7vw, var(--space-20));
  outline: none;
}

.project-carousel:focus-visible {
  outline: 0.1875rem solid var(--color-focus);
  outline-offset: 0.1875rem;
}

.project-carousel__viewport {
  overflow: hidden;
  touch-action: pan-y;
}

.project-carousel__track {
  display: flex;
  align-items: stretch;
}

.project-carousel__track > :deep(*) {
  flex: 0 0 100%;
  min-inline-size: 0;
  max-inline-size: 100%;
}

@media (hover: hover) and (pointer: fine) {
  .project-carousel__track {
    cursor: grab;
  }

  .project-carousel__track.is-dragging {
    cursor: grabbing;
  }

  .project-carousel__track.is-dragging :deep(*) {
    cursor: grabbing;
  }
}

.project-carousel__controls {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  margin-block-start: var(--space-6);
}

.project-carousel__mobile-progress {
  display: none;
}

.project-carousel__counter {
  color: var(--color-text-muted);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.project-carousel__buttons {
  display: flex;
  gap: var(--space-2);
}

.project-carousel__button {
  display: grid;
  min-inline-size: 2.75rem;
  min-block-size: 2.75rem;
  place-items: center;
  color: var(--color-text-primary);
  font: inherit;
  font-size: var(--font-size-lg);
  cursor: pointer;
  background: transparent;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
}

.project-carousel__button:hover:not(:disabled) {
  color: var(--color-accent-interactive);
  border-color: var(--color-accent);
}

.project-carousel__button:disabled {
  color: var(--color-text-muted);
  cursor: not-allowed;
  opacity: 0.45;
}

/* Mobile: keep controls attached to the current slide and
   add an informational progress indicator (no extra interaction). */
@media (width < 64rem) {
  .project-carousel__track {
    align-items: flex-start;
  }

  .project-carousel__controls {
    margin-block-start: var(--space-4);
    gap: var(--space-3);
  }

  .project-carousel__mobile-progress {
    display: flex;
    flex: 0 0 100%;
    justify-content: center;
    gap: var(--space-2);
    margin-top: var(--space-2);
  }

  .project-carousel__mobile-segment {
    flex: 1 1 0;
    max-inline-size: 7rem;
    height: 0.375rem;
    border-radius: 999px;
    background: var(--color-border);
    opacity: 0.6;
  }

  .project-carousel__mobile-segment.is-active {
    background: var(--color-accent);
    opacity: 1;
  }
}
</style>
