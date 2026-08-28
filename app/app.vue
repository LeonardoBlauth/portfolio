<script setup lang="ts">
import { THEME_ATTRIBUTE } from '~/utils/theme'

const { locale } = useI18n()
const { initializeTheme, resolvedTheme } = useTheme()

initializeTheme()

useHead(() => ({
  htmlAttrs: {
    lang: locale.value,
    [THEME_ATTRIBUTE]: resolvedTheme.value,
  },
}))
</script>

<template>
  <main :data-locale="locale">
    <NuxtPage />
  </main>
</template>
