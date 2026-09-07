<script setup lang="ts">
import type { ProjectExternalLink } from '~/types/project'

defineProps<{
  links?: readonly ProjectExternalLink[]
}>()

const { t } = useI18n()
</script>

<template>
  <nav
    v-if="links?.length"
    class="case-hero__external-links"
    :aria-label="t('projectLinks.label')"
    data-case-external-links
  >
    <a
      v-for="link in links"
      :key="link.href"
      :href="link.href"
      target="_blank"
      rel="noopener noreferrer"
      :aria-label="t(link.accessibilityLabelKey)"
    >
      <svg v-if="link.type === 'github'" viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M12 2.75a9.25 9.25 0 0 0-2.93 18.03c.46.08.63-.2.63-.44v-1.8c-2.57.56-3.11-1.09-3.11-1.09-.42-1.07-1.03-1.35-1.03-1.35-.84-.58.07-.57.07-.57.93.07 1.42.96 1.42.96.83 1.42 2.17 1.01 2.7.77.08-.6.32-1.01.59-1.25-2.05-.23-4.21-1.03-4.21-4.57 0-1.01.36-1.84.96-2.49-.1-.23-.42-1.18.09-2.45 0 0 .78-.25 2.54.95A8.8 8.8 0 0 1 12 7.09a8.8 8.8 0 0 1 2.31.31c1.77-1.2 2.54-.95 2.54-.95.51 1.27.19 2.22.09 2.45.6.65.96 1.48.96 2.49 0 3.55-2.16 4.33-4.22 4.56.33.29.63.85.63 1.72v2.67c0 .25.17.53.64.44A9.25 9.25 0 0 0 12 2.75Z"
        />
      </svg>
      <span>{{ t(link.labelKey) }}</span>
    </a>
  </nav>
</template>

<style scoped>
.case-hero__external-links {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-4);
  margin-block-start: var(--space-8);
}

.case-hero__external-links a {
  display: inline-flex;
  min-block-size: 2.75rem;
  align-items: center;
  gap: var(--space-3);
  color: var(--color-text-secondary);
  font: inherit;
  font-weight: var(--font-weight-semibold);
  text-decoration: underline;
  text-decoration-color: var(--color-border);
  text-underline-offset: 0.35em;
}

.case-hero__external-links a:hover {
  color: var(--color-accent-interactive);
}

.case-hero__external-links svg {
  width: 1.25rem;
  flex: none;
  fill: currentColor;
}
</style>
