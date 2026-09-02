<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'

interface Position {
  x: number
  y: number
}

interface SpotlightCardProps {
  className?: string
  spotlightColor?: string
}

const props = withDefaults(defineProps<SpotlightCardProps>(), {
  className: '',
  spotlightColor: 'rgba(255, 255, 255, 1)',
})

const cardRef = useTemplateRef<HTMLDivElement>('cardRef')
const position = ref<Position>({ x: 0, y: 0 })
const isActive = ref(false)

const setSpotlightToCenter = () => {
  const rect = cardRef.value?.getBoundingClientRect()

  if (!rect) return

  position.value = {
    x: rect.width / 2,
    y: rect.height / 2,
  }
}

const handlePointerMove = (event: PointerEvent) => {
  if (event.pointerType !== 'mouse' || !cardRef.value) return

  const rect = cardRef.value.getBoundingClientRect()
  position.value = {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
  }
}

const handlePointerEnter = (event: PointerEvent) => {
  if (event.pointerType !== 'mouse') return

  setSpotlightToCenter()
  isActive.value = true
}

const handlePointerLeave = (event: PointerEvent) => {
  if (event.pointerType === 'mouse') isActive.value = false
}

const handleFocusIn = () => {
  setSpotlightToCenter()
  isActive.value = true
}

const handleFocusOut = (event: FocusEvent) => {
  const nextFocusedElement = event.relatedTarget as Node | null

  if (!cardRef.value?.contains(nextFocusedElement)) isActive.value = false
}
</script>

<template>
  <div
    ref="cardRef"
    :class="['spotlight-card', props.className]"
    :style="{
      '--spotlight-card-color': props.spotlightColor,
      '--spotlight-card-x': `${position.x}px`,
      '--spotlight-card-y': `${position.y}px`,
    }"
    data-spotlight-card
    @focusin="handleFocusIn"
    @focusout="handleFocusOut"
    @pointerenter="handlePointerEnter"
    @pointerleave="handlePointerLeave"
    @pointermove="handlePointerMove"
  >
    <div
      class="spotlight-card__layer"
      :class="{ 'spotlight-card__layer--active': isActive }"
      data-spotlight-layer
      aria-hidden="true"
    />

    <div class="spotlight-card__content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.spotlight-card {
  position: relative;
  overflow: hidden;
}

.spotlight-card__layer {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  opacity: 0;
  background: radial-gradient(
    circle at var(--spotlight-card-x) var(--spotlight-card-y),
    var(--spotlight-card-color),
    transparent 78%
  );
  transition: opacity var(--motion-duration-base) var(--motion-ease-standard);
}

.spotlight-card__layer--active {
  opacity: var(--spotlight-card-opacity, 0.48);
}

.spotlight-card__content {
  position: relative;
  z-index: 1;
}

@media (prefers-reduced-motion: reduce) {
  .spotlight-card__layer {
    transition-duration: var(--motion-duration-instant);
  }
}
</style>
