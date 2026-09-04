<script setup lang="ts">
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import { THEME_ATTRIBUTE } from '~/utils/theme'

const { locale, localeProperties, t } = useI18n()
const getRouteBaseName = useRouteBaseName()
const { initializeTheme, resolvedTheme } = useTheme()

initializeTheme()

const pageKey = (pageRoute: RouteLocationNormalizedLoaded) => {
  const baseName = getRouteBaseName(pageRoute)
  return typeof baseName === 'string' ? baseName : pageRoute.path
}

const htmlLang = computed(() => localeProperties.value.language || locale.value)

useHead(() => ({
  htmlAttrs: {
    lang: htmlLang.value,
    [THEME_ATTRIBUTE]: resolvedTheme.value,
  },
}))
</script>

<template>
  <a class="skip-link" href="#main-content">{{ t('navigation.skip') }}</a>
  <LayoutAppHeader />
  <main id="main-content" :data-locale="locale" tabindex="-1">
    <NuxtPage :page-key="pageKey" />
  </main>
</template>

<style scoped>
.skip-link {
  position: fixed;
  z-index: 200;
  inset-block-start: var(--space-3);
  inset-inline-start: var(--space-3);
  padding: var(--space-3) var(--space-4);
  color: var(--color-accent-contrast);
  background: var(--color-accent);
  border-radius: var(--radius-md);
  translate: 0 calc(-100% - var(--space-6));
}

.skip-link:focus-visible {
  translate: 0;
}

main {
  min-height: 100vh;
  min-height: 100dvh;
  padding-block-start: calc(var(--header-height) + var(--space-8));
}
</style>
