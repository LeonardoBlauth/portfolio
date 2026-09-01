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
}

const props = withDefaults(defineProps<TextTypeProps>(), {
  as: 'div',
  typingSpeed: 50,
  showCursor: true,
  cursorCharacter: '|',
  cursorHoldDuration: 900,
})

const displayedText = ref('')
const cursorVisible = ref(false)
const accessibleText = computed(() => props.text.replace(/\s+/g, ' ').trim())

let characterIndex = 0
let typingTimer: ReturnType<typeof setTimeout> | undefined
let cursorTimer: ReturnType<typeof setTimeout> | undefined
let completed = false

const clearTimers = () => {
  if (typingTimer) clearTimeout(typingTimer)
  if (cursorTimer) clearTimeout(cursorTimer)
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

onMounted(() => {
  const reducedMotion =
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (reducedMotion) {
    completed = true
    displayedText.value = props.text
    cursorVisible.value = false
    return
  }

  cursorVisible.value = props.showCursor
  typeNextCharacter()
})

onBeforeUnmount(clearTimers)
</script>

<template>
  <component :is="as" class="text-type" v-bind="$attrs">
    <span class="visually-hidden">{{ accessibleText }}</span>
    <span class="text-type__visual" :data-text="text" aria-hidden="true">
      <span class="text-type__animated">
        <span class="text-type__typed">{{ displayedText }}</span>
        <span v-if="cursorVisible" class="text-type__cursor">{{
          cursorCharacter
        }}</span>
      </span>
    </span>
  </component>
</template>

<style scoped>
.text-type__visual {
  position: relative;
  display: block;
  inline-size: max-content;
  white-space: pre-line;
}

.text-type__visual::before {
  display: block;
  content: attr(data-text);
  visibility: hidden;
}

.text-type__animated {
  position: absolute;
  inset: 0;
}

.text-type__cursor {
  margin-inline-start: 0.08em;
  animation: text-type-cursor 0.65s ease-in-out infinite alternate;
}

@keyframes text-type-cursor {
  to {
    opacity: 0.22;
  }
}

@media (prefers-reduced-motion: reduce) {
  .text-type__visual::before {
    visibility: visible;
  }

  .text-type__animated {
    display: none;
  }
}
</style>
