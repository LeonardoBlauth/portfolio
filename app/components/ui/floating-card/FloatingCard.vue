<script setup lang="ts">
/**
 * Inspira UI Floating Card (perspective tilt), without Tailwind, glare, scale, or decorative shadow.
 * Source: https://registry.inspira-ui.com/floating-card.json
 */
import {
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from 'motion-v'

const props = withDefaults(
  defineProps<{
    rotateDepth?: number
    translateDepth?: number
    disabled?: boolean
  }>(),
  {
    rotateDepth: 8,
    translateDepth: 0,
    disabled: false,
  },
)

const floatingCardRef = useTemplateRef<HTMLElement>('floatingCardRef')
const cardRef = useTemplateRef<HTMLElement>('cardRef')
const carouselDragging = inject('projectCarouselDragging', ref(false))

const x = useMotionValue(0)
const y = useMotionValue(0)
const scaleTarget = useMotionValue(1)
const zTarget = useMotionValue(0)

const mouseXSpring = useSpring(x, { damping: 18, stiffness: 320 })
const mouseYSpring = useSpring(y, { damping: 18, stiffness: 320 })
const scale = useSpring(scaleTarget, { damping: 22, stiffness: 260 })
const z = useSpring(zTarget, { damping: 22, stiffness: 260 })

const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [
  `-${props.rotateDepth}deg`,
  `${props.rotateDepth}deg`,
])
const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [
  `${props.rotateDepth}deg`,
  `-${props.rotateDepth}deg`,
])
const translateX = useTransform(mouseXSpring, [-0.5, 0.5], [
  `-${props.translateDepth}px`,
  `${props.translateDepth}px`,
])
const translateY = useTransform(mouseYSpring, [-0.5, 0.5], [
  `${props.translateDepth}px`,
  `-${props.translateDepth}px`,
])
const cardTransform = useMotionTemplate`translateX(${translateX}) translateY(${translateY}) translateZ(${z}px) rotateX(${rotateX}) rotateY(${rotateY}) scale(${scale})`

const fineHover = ref(false)
const reducedMotion = ref(false)
const tiltEnabled = computed(
  () =>
    fineHover.value &&
    !reducedMotion.value &&
    !props.disabled &&
    !carouselDragging.value,
)

const cleanupFns: Array<() => void> = []
let hoverQuery: MediaQueryList | null = null
let motionQuery: MediaQueryList | null = null

const bindMotionValue = <T,>(
  value: {
    get: () => T
    on: (event: 'change', handler: (latest: T) => void) => () => void
  },
  handler: (latest: T) => void,
) => {
  handler(value.get())
  cleanupFns.push(value.on('change', handler))
}

const applyTransform = (latest: string) => {
  if (cardRef.value) cardRef.value.style.transform = latest
}

const resetCard = () => {
  x.set(0)
  y.set(0)
  scaleTarget.set(1)
  zTarget.set(0)
}

const canTilt = (event: PointerEvent) =>
  tiltEnabled.value && event.pointerType !== 'touch'

const handlePointerMove = (event: PointerEvent) => {
  if (!canTilt(event) || !floatingCardRef.value) return

  const rect = floatingCardRef.value.getBoundingClientRect()
  if (!rect.width || !rect.height) return

  x.set((event.clientX - rect.left) / rect.width - 0.5)
  y.set((event.clientY - rect.top) / rect.height - 0.5)
}

const handlePointerEnter = (event: PointerEvent) => {
  if (!canTilt(event)) return
  scaleTarget.set(1)
  zTarget.set(0)
}

const syncQueries = () => {
  fineHover.value = hoverQuery?.matches ?? false
  reducedMotion.value = motionQuery?.matches ?? false
  if (!tiltEnabled.value) resetCard()
}

watch(tiltEnabled, (enabled) => {
  if (!enabled) resetCard()
})

onMounted(() => {
  hoverQuery = window.matchMedia('(hover: hover) and (pointer: fine)')
  motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  syncQueries()
  hoverQuery.addEventListener('change', syncQueries)
  motionQuery.addEventListener('change', syncQueries)

  if (cardRef.value) bindMotionValue(cardTransform, applyTransform)
})

onBeforeUnmount(() => {
  hoverQuery?.removeEventListener('change', syncQueries)
  motionQuery?.removeEventListener('change', syncQueries)
  cleanupFns.forEach((cleanup) => cleanup())
})
</script>

<template>
  <div
    ref="floatingCardRef"
    class="floating-card"
    @pointerenter="handlePointerEnter"
    @pointermove="handlePointerMove"
    @pointerleave="resetCard"
    @pointercancel="resetCard"
  >
    <div ref="cardRef" class="floating-card__surface">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.floating-card,
.floating-card__surface {
  display: block;
  width: 100%;
  min-inline-size: 0;
}

.floating-card {
  perspective: 36rem;
}

.floating-card__surface {
  transform-style: preserve-3d;
}
</style>
