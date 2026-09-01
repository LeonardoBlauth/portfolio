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
  fadeOutColor?: string
  scaleOnHover?: boolean
}

const props = withDefaults(defineProps<LogoLoopProps>(), {
  speed: 42,
  direction: 'left',
  logoHeight: 32,
  gap: 48,
  hoverSpeed: 14,
  fadeOut: true,
  fadeOutColor: 'var(--color-canvas)',
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
  '--logo-loop-fade-color': props.fadeOutColor,
}))

let animationFrame: number | null = null
let lastTimestamp: number | null = null
let offset = 0
let velocity = 0
let sequenceWidth = 0
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

const updateDimensions = async () => {
  await nextTick()

  const containerWidth = rootRef.value?.clientWidth ?? 0
  const measuredWidth = sequenceRef.value?.getBoundingClientRect().width ?? 0

  if (measuredWidth <= 0) return

  sequenceWidth = Math.ceil(measuredWidth)
  copyCount.value = Math.max(2, Math.ceil(containerWidth / sequenceWidth) + 2)
  offset %= sequenceWidth
  renderOffset()
  startAnimation()
}

const setSequenceRef = (element: unknown, copyIndex: number) => {
  if (copyIndex === 1) {
    sequenceRef.value = element instanceof HTMLUListElement ? element : null
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

  resizeObserver = new ResizeObserver(() => void updateDimensions())
  if (rootRef.value) resizeObserver.observe(rootRef.value)

  intersectionObserver = new IntersectionObserver(
    ([entry]) => {
      isVisible.value = entry?.isIntersecting ?? false
      startAnimation()
    },
    { threshold: 0.01 },
  )
  if (rootRef.value) intersectionObserver.observe(rootRef.value)

  document.addEventListener('visibilitychange', syncDocumentVisibility)
  isReady.value = true
  await updateDimensions()
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
    :class="{ 'logo-loop--scale-on-hover': scaleOnHover }"
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
            loading="lazy"
            decoding="async"
            draggable="false"
          />
        </li>
      </ul>
    </div>

    <template v-if="fadeOut">
      <span class="logo-loop__fade logo-loop__fade--start" aria-hidden="true" />
      <span class="logo-loop__fade logo-loop__fade--end" aria-hidden="true" />
    </template>
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
  user-select: none;
  will-change: transform;
}

.logo-loop__sequence {
  flex: none;
  gap: var(--logo-loop-gap);
  padding-inline-end: var(--logo-loop-gap);
  margin: 0;
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

.logo-loop__fade {
  position: absolute;
  z-index: 1;
  inset-block: 0;
  width: clamp(2rem, 8%, 7.5rem);
  pointer-events: none;
}

.logo-loop__fade--start {
  inset-inline-start: 0;
  background: linear-gradient(
    to right,
    var(--logo-loop-fade-color),
    transparent
  );
}

.logo-loop__fade--end {
  inset-inline-end: 0;
  background: linear-gradient(
    to left,
    var(--logo-loop-fade-color),
    transparent
  );
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
