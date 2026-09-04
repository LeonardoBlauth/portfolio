<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'

export interface LogoLoopItem {
  id: string
  name: string
  src: string
}

interface LogoLoopProps {
  logos: readonly LogoLoopItem[]
  speed?: number
  direction?: 'left' | 'right'
  logoHeight?: number
  gap?: number
  hoverSpeed?: number
  fadeOut?: boolean
  scaleOnHover?: boolean
}

const props = withDefaults(defineProps<LogoLoopProps>(), {
  speed: 42,
  direction: 'left',
  logoHeight: 32,
  gap: 48,
  hoverSpeed: 14,
  fadeOut: true,
  scaleOnHover: false,
})

const rootRef = ref<HTMLDivElement | null>(null)
const trackRef = ref<HTMLDivElement | null>(null)
const sequenceRef = ref<HTMLUListElement | null>(null)
const copyCount = ref(2)
const isReady = ref(false)
const isHovered = ref(false)
const isVisible = ref(true)
const prefersReducedMotion = ref(false)

const renderedCopies = computed(() =>
  isReady.value && !prefersReducedMotion.value ? copyCount.value : 1,
)
const directionMultiplier = computed(() =>
  props.direction === 'left' ? 1 : -1,
)
const rootStyle = computed(() => ({
  '--logo-loop-gap': `${props.gap}px`,
  '--logo-loop-logo-height': `${props.logoHeight}px`,
}))

let animationFrame: number | null = null
let lastTimestamp: number | null = null
let offset = 0
let velocity = 0
let sequenceWidth = 0
let measureFrame: number | null = null
let resizeObserver: ResizeObserver | null = null
let intersectionObserver: IntersectionObserver | null = null
let motionQuery: MediaQueryList | null = null

const stopAnimation = () => {
  if (animationFrame !== null) window.cancelAnimationFrame(animationFrame)

  animationFrame = null
  lastTimestamp = null
}

const renderOffset = () => {
  if (!trackRef.value || sequenceWidth <= 0) return

  trackRef.value.style.transform = `translate3d(${-offset}px, 0, 0)`
}

const measureSequenceWidth = (sequence: HTMLUListElement) => {
  const items = sequence.querySelectorAll<HTMLElement>(':scope > li')
  if (items.length === 0) return 0

  const first = items[0]?.getBoundingClientRect()
  const last = items[items.length - 1]?.getBoundingClientRect()
  if (!first || !last) return 0

  // One logical cycle: first logo → last logo + the trailing gap before the next copy.
  return last.right - first.left + props.gap
}

const startAnimation = () => {
  stopAnimation()

  if (
    prefersReducedMotion.value ||
    !isVisible.value ||
    document.hidden ||
    sequenceWidth <= 0
  ) {
    return
  }

  const animate = (timestamp: number) => {
    if (lastTimestamp === null) lastTimestamp = timestamp

    const elapsed = Math.max(0, timestamp - lastTimestamp) / 1000
    lastTimestamp = timestamp

    const targetSpeed = isHovered.value ? props.hoverSpeed : props.speed
    const targetVelocity = targetSpeed * directionMultiplier.value
    const smoothing = 1 - Math.exp(-elapsed / 0.25)

    velocity += (targetVelocity - velocity) * smoothing
    offset = (offset + velocity * elapsed) % sequenceWidth
    if (offset < 0) offset += sequenceWidth

    renderOffset()
    animationFrame = window.requestAnimationFrame(animate)
  }

  animationFrame = window.requestAnimationFrame(animate)
}

const scheduleLayoutMeasure = () => {
  if (measureFrame !== null) return

  measureFrame = window.requestAnimationFrame(() => {
    measureFrame = window.requestAnimationFrame(() => {
      measureFrame = null
      void updateDimensions()
    })
  })
}

const observeResizeTargets = () => {
  if (!resizeObserver) return

  if (rootRef.value) resizeObserver.observe(rootRef.value)
  if (sequenceRef.value) resizeObserver.observe(sequenceRef.value)
}

const updateDimensions = async () => {
  await nextTick()

  const root = rootRef.value
  const sequence = sequenceRef.value
  if (!root || !sequence) return

  // Prefer clientWidth; fall back when layout is mid-settle after route remount.
  const containerWidth =
    root.clientWidth || Math.round(root.getBoundingClientRect().width)
  const measuredWidth = measureSequenceWidth(sequence)
  if (measuredWidth <= 0) return

  // Width 0 yields copyCount=2 and can stick if ResizeObserver never saw a
  // later size change (common after detail → Home remount off-screen).
  // Skip commit; mount rAF + IntersectionObserver/ResizeObserver will retry.
  if (containerWidth <= 0) return

  sequenceWidth = measuredWidth
  // Enough copies so the viewport stays covered plus a spare sequence ahead.
  copyCount.value = Math.max(2, Math.ceil(containerWidth / sequenceWidth) + 2)
  offset %= sequenceWidth
  renderOffset()
  startAnimation()
}

const handleImageLoad = () => {
  scheduleLayoutMeasure()
}

const setSequenceRef = (element: unknown, copyIndex: number) => {
  if (copyIndex !== 1) return

  const next = element instanceof HTMLUListElement ? element : null
  if (sequenceRef.value === next) return

  if (sequenceRef.value && resizeObserver) {
    resizeObserver.unobserve(sequenceRef.value)
  }

  sequenceRef.value = next

  if (next && resizeObserver) {
    resizeObserver.observe(next)
    scheduleLayoutMeasure()
  }
}

const syncMotionPreference = () => {
  prefersReducedMotion.value = motionQuery?.matches ?? false

  if (prefersReducedMotion.value) {
    offset = 0
    velocity = 0
    trackRef.value?.style.removeProperty('transform')
  }

  void nextTick(startAnimation)
}

const syncDocumentVisibility = () => startAnimation()

onMounted(async () => {
  motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  motionQuery.addEventListener('change', syncMotionPreference)
  syncMotionPreference()

  document.addEventListener('visibilitychange', syncDocumentVisibility)

  // Reveal copies first so sequence refs exist before measure/observe.
  isReady.value = true
  await nextTick()

  resizeObserver = new ResizeObserver(() => void updateDimensions())
  observeResizeTargets()

  intersectionObserver = new IntersectionObserver(
    ([entry]) => {
      const visible = entry?.isIntersecting ?? false
      isVisible.value = visible
      // Remeasure when entering view after route remount (layout may have been 0).
      if (visible) void updateDimensions()
      startAnimation()
    },
    { threshold: 0.01 },
  )
  if (rootRef.value) intersectionObserver.observe(rootRef.value)

  await updateDimensions()
  scheduleLayoutMeasure()
})

watch(
  () => [props.logos, props.gap, props.logoHeight, props.direction],
  () => void updateDimensions(),
  { deep: true },
)

watch(
  () => [props.speed, props.hoverSpeed],
  () => startAnimation(),
)

onBeforeUnmount(() => {
  stopAnimation()
  if (measureFrame !== null) window.cancelAnimationFrame(measureFrame)
  resizeObserver?.disconnect()
  intersectionObserver?.disconnect()
  motionQuery?.removeEventListener('change', syncMotionPreference)
  document.removeEventListener('visibilitychange', syncDocumentVisibility)
})
</script>

<template>
  <div
    ref="rootRef"
    class="logo-loop"
    :class="{
      'logo-loop--fade-out': fadeOut,
      'logo-loop--scale-on-hover': scaleOnHover,
    }"
    :style="rootStyle"
    role="region"
    data-logo-loop
  >
    <div
      ref="trackRef"
      class="logo-loop__track"
      @mouseenter="isHovered = true"
      @mouseleave="isHovered = false"
    >
      <ul
        v-for="copyIndex in renderedCopies"
        :key="copyIndex"
        :ref="(element) => setSequenceRef(element, copyIndex)"
        class="logo-loop__sequence"
        :aria-hidden="copyIndex > 1 ? 'true' : undefined"
        data-logo-loop-copy
      >
        <li v-for="logo in logos" :key="`${copyIndex}-${logo.id}`">
          <img
            :src="logo.src"
            :alt="copyIndex === 1 ? logo.name : ''"
            :width="logoHeight"
            :height="logoHeight"
            loading="eager"
            decoding="async"
            draggable="false"
            @load="handleImageLoad"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.logo-loop {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.logo-loop__track,
.logo-loop__sequence {
  display: flex;
  align-items: center;
}

.logo-loop__track {
  width: max-content;
  gap: 0;
  user-select: none;
  will-change: transform;
}

.logo-loop__sequence {
  flex: none;
  gap: var(--logo-loop-gap);
  margin: 0;
  padding: 0;
  /* Trailing gap equals inter-logo gap so copy boundaries stay seamless. */
  padding-inline-end: var(--logo-loop-gap);
  list-style: none;
}

.logo-loop__sequence li {
  display: grid;
  flex: none;
  width: var(--logo-loop-logo-height);
  height: var(--logo-loop-logo-height);
  place-items: center;
}

.logo-loop__sequence img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
  pointer-events: none;
  -webkit-user-drag: none;
}

.logo-loop--fade-out {
  --logo-loop-fade-width: clamp(2rem, 8%, 7.5rem);

  -webkit-mask-image: linear-gradient(
    to right,
    transparent,
    #000 var(--logo-loop-fade-width),
    #000 calc(100% - var(--logo-loop-fade-width)),
    transparent
  );
  mask-image: linear-gradient(
    to right,
    transparent,
    #000 var(--logo-loop-fade-width),
    #000 calc(100% - var(--logo-loop-fade-width)),
    transparent
  );
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
}

.logo-loop--scale-on-hover .logo-loop__sequence img {
  transition: transform var(--motion-duration-fast) var(--motion-ease-standard);
}

@media (hover: hover) {
  .logo-loop--scale-on-hover .logo-loop__sequence img:hover {
    transform: scale(1.04);
  }
}

@media (prefers-reduced-motion: reduce) {
  .logo-loop__track {
    width: 100%;
    transform: none !important;
  }

  .logo-loop__sequence {
    flex-wrap: wrap;
    justify-content: center;
  }

  .logo-loop--scale-on-hover .logo-loop__sequence img {
    transition: none;
  }
}
</style>
