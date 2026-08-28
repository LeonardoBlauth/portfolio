<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <div class="navigation-destinations layout-container">
    <h1 id="top">{{ t('pages.home.heading') }}</h1>

    <section
      v-for="section in ['projects', 'experience', 'stack', 'contact']"
      :id="section"
      :key="section"
      class="navigation-destination"
      :aria-labelledby="`${section}-heading`"
    >
      <h2 :id="`${section}-heading`">{{ t(`navigation.${section}`) }}</h2>
    </section>
  </div>
</template>

<style scoped>
.navigation-destinations > h1 {
  padding-block: var(--space-12) var(--space-24);
}

.navigation-destination {
  min-height: 72vh;
  min-height: 72dvh;
  padding-block: var(--section-spacing);
  scroll-margin-block-start: var(--scroll-offset);
  border-block-start: 1px solid var(--color-border);
}
</style>
