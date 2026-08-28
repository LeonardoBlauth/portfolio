<script setup lang="ts">
const { locale } = useI18n()
const { initializeTheme } = useTheme()

initializeTheme()

useHead(() => ({
  htmlAttrs: {
    lang: locale.value,
  },
}))
</script>

<template>
  <main :data-locale="locale">
    <NuxtPage />
  </main>
</template>
