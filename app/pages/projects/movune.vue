<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <div class="layout-container">
    <h1 id="top">{{ t('pages.movune.heading') }}</h1>
  </div>
</template>

<style scoped>
h1 {
  padding-block: var(--space-12);
  scroll-margin-block-start: var(--scroll-offset);
}
</style>
