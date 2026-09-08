<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

defineOptions({ inheritAttrs: false })

interface TextTypeProps {
  text: string
  as?: string
  typingSpeed?: number
  showCursor?: boolean
  cursorCharacter?: string
  cursorHoldDuration?: number
  typeOnMount?: boolean
}

const props = withDefaults(defineProps<TextTypeProps>(), {
  as: 'div',
  typingSpeed: 50,
  showCursor: true,
  cursorCharacter: '|',
  cursorHoldDuration: 900,
  typeOnMount: true,
})

const displayedText = ref(props.text)
const cursorVisible = ref(false)
const isEnhanced = ref(false)
const accessibleText = computed(() => props.text.replace(/\s+/g, ' ').trim())

let characterIndex = 0
let typingTimer: ReturnType<typeof setTimeout> | undefined
let cursorTimer: ReturnType<typeof setTimeout> | undefined
let hydrationFrame: number | undefined
let completed = false

const clearTimers = () => {
  if (typingTimer) clearTimeout(typingTimer)
  if (cursorTimer) clearTimeout(cursorTimer)
  if (hydrationFrame) cancelAnimationFrame(hydrationFrame)
}

const finish = () => {
  if (completed) return

  completed = true
  displayedText.value = props.text

  if (!props.showCursor) return

  cursorTimer = setTimeout(() => {
    cursorVisible.value = false
  }, props.cursorHoldDuration)
}

const typeNextCharacter = () => {
  if (completed) return

  if (characterIndex >= props.text.length) {
    finish()
    return
  }

  typingTimer = setTimeout(() => {
    displayedText.value += props.text[characterIndex]
    characterIndex += 1
    typeNextCharacter()
  }, props.typingSpeed)
}

const startTyping = () => {
  isEnhanced.value = true
  characterIndex = 1
  displayedText.value = props.text.slice(0, characterIndex)
  cursorVisible.value = props.showCursor
  typeNextCharacter()
}

onMounted(() => {
  if (!props.typeOnMount) {
    completed = true
    return
  }

  const reducedMotion =
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (reducedMotion) {
    completed = true
    displayedText.value = props.text
    cursorVisible.value = false
    return
  }

  hydrationFrame = requestAnimationFrame(startTyping)
})

onBeforeUnmount(clearTimers)
</script>

<template>
  <component
    :is="as"
    class="text-type"
    :aria-label="typeOnMount ? accessibleText : undefined"
    v-bind="$attrs"
  >
    <template v-if="typeOnMount">
      <span
        class="text-type__visual"
        :class="{ 'text-type__visual--enhanced': isEnhanced }"
      >
        <span class="text-type__static">{{ text }}</span>
        <span class="text-type__animated" aria-hidden="true">
          <span class="text-type__typed">{{ displayedText }}</span>
          <span v-if="cursorVisible" class="text-type__cursor">{{
            cursorCharacter
          }}</span>
        </span>
      </span>
    </template>
    <span v-else class="text-type__static">{{ text }}</span>
  </component>
</template>

<style scoped>
.text-type__visual {
  position: relative;
  display: block;
  inline-size: fit-content;
  white-space: pre-line;
}

.text-type__static {
  display: block;
  white-space: pre-line;
}

.text-type__animated {
  position: absolute;
  inset: 0;
  color: transparent;
  white-space: pre-line;
}

.text-type__visual--enhanced .text-type__static {
  color: transparent;
}

.text-type__visual--enhanced .text-type__animated {
  color: var(--color-text-primary);
}

.text-type__cursor {
  margin-inline-start: 0.08em;
  color: var(--color-text-primary);
  animation: text-type-cursor 0.65s ease-in-out infinite alternate;
}

@keyframes text-type-cursor {
  to {
    opacity: 0.22;
  }
}

@media (prefers-reduced-motion: reduce) {
  .text-type__animated {
    display: none;
  }
}
</style>
