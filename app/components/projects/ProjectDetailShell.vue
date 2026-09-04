<script setup lang="ts">
import BackToTopButton from '~/components/ui/BackToTopButton.vue'
import CaseBackLink from '~/components/projects/CaseBackLink.vue'

const props = defineProps<{
  backLabel: string
  projectSlug: string
}>()

defineOptions({ inheritAttrs: false })

const attrs = useAttrs()
const { setActiveProjectSlug } = useProjectCarouselState()

setActiveProjectSlug(props.projectSlug)

watch(
  () => props.projectSlug,
  (slug) => setActiveProjectSlug(slug),
)
</script>

<template>
  <article class="case-study" v-bind="attrs">
    <header id="top" class="case-hero layout-container">
      <CaseBackLink :label="backLabel" :project-slug="projectSlug" />
      <slot name="hero" />
    </header>
    <div class="case-content layout-container">
      <slot />
    </div>
    <BackToTopButton />
  </article>
</template>

<style scoped>
.case-hero {
  padding-block: var(--space-8) clamp(var(--space-20), 10vw, 8rem);
}

.case-content {
  border-block-start: 1px solid var(--color-border);
}

:deep(.case-section) {
  display: grid;
  grid-template-columns: minmax(11.25rem, 12.5rem) minmax(0, 1fr);
  column-gap: var(--space-10);
  row-gap: var(--space-8);
  padding-block: var(--space-16);
  border-block-end: 1px solid var(--color-border);
}

:deep(.case-section__heading) {
  display: grid;
  align-content: start;
  gap: var(--space-3);
}

@media (width >= 52rem) {
  :deep(.case-section__heading) {
    grid-column: 1;
  }

  :deep(.case-section__body) {
    display: contents;
  }

  :deep(.case-section__body > *) {
    grid-column: 2;
  }

  :deep(.case-section__body > .case-visual--wide) {
    grid-column: 1 / -1;
  }
}

:deep(.case-section__index) {
  color: var(--color-accent);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

:deep(.case-section > .case-section__heading h2),
:deep(.case-section > h2) {
  font-size: var(--font-size-2xl);
  line-height: var(--line-height-heading);
  letter-spacing: -0.025em;
}

:deep(.case-section__body) {
  min-inline-size: 0;
}

:deep(.case-copy),
:deep(.case-section__introduction) {
  max-inline-size: 68ch;
  color: var(--color-text-secondary);
  font-size: var(--font-size-lg);
  line-height: 1.7;
}

:deep(.case-section__body > * + *) {
  margin-block-start: var(--space-6);
}

:deep(.case-section__body > h3) {
  margin-block: 0 0;
  font-size: var(--font-size-xl);
}

:deep(.case-section__body > h3:not(:first-child)) {
  margin-block-start: var(--space-10);
}

:deep(.case-section__body > h4) {
  margin-block: var(--space-8) var(--space-4);
  font-size: var(--font-size-sm);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

:deep(.case-visual) {
  min-inline-size: 0;
  max-inline-size: none;
  margin-block-start: var(--space-8);
}

:deep(.case-copy + .case-copy) {
  margin-block-start: var(--space-6);
}

:deep(.case-kicker) {
  max-inline-size: 40rem;
  margin-block-start: var(--space-8);
  color: var(--color-text-primary);
  font-size: clamp(var(--font-size-xl), 2.2vw, var(--font-size-2xl));
  line-height: 1.4;
  font-weight: var(--font-weight-semibold);
}

:deep(.case-callout) {
  max-inline-size: 46rem;
  margin-block-start: var(--space-8);
  padding: var(--space-5) var(--space-6);
  color: var(--color-text-primary);
  font-weight: var(--font-weight-semibold);
  background: var(--color-surface);
  border-inline-start: 2px solid var(--color-accent);
}

:deep(.case-figure) {
  min-inline-size: 0;
  margin-block-start: var(--space-8);
}

:deep(.case-figure img) {
  display: block;
  width: 100%;
  height: auto;
  object-fit: contain;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
}

:deep(.case-figure figcaption) {
  margin-block-start: var(--space-3);
  color: var(--color-text-muted);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  letter-spacing: 0.055em;
  text-transform: uppercase;
}

:deep(.case-status) {
  display: inline-flex;
  width: fit-content;
  max-inline-size: 100%;
  min-block-size: 2rem;
  align-items: center;
  align-self: start;
  justify-self: start;
  padding-inline: var(--space-3);
  color: var(--color-text-secondary);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  white-space: nowrap;
  background: var(--_status-bg, transparent);
  border: 1px solid var(--_status-border, var(--color-border));
  border-radius: var(--radius-pill);
}

:deep(.case-status::before) {
  width: 0.4rem;
  height: 0.4rem;
  margin-inline-end: var(--space-2);
  content: '';
  background: var(--_status-dot, var(--color-accent));
  border-radius: 50%;
}

:deep(.case-hero__eyebrow) {
  margin-block-start: clamp(var(--space-16), 9vw, var(--space-24));
  color: var(--color-text-muted);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

:deep(.case-hero__meta) {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-4);
  margin-block-start: var(--space-4);
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
}

:deep(.case-hero h1) {
  max-inline-size: 62rem;
  margin-block-start: var(--space-8);
  font-size: clamp(2.5rem, 6vw, 4.75rem);
  font-weight: var(--font-weight-semibold);
  line-height: 1.02;
  letter-spacing: -0.04em;
  text-wrap: balance;
}

:deep(.case-hero__lead) {
  max-inline-size: 50rem;
  margin-block-start: clamp(var(--space-8), 5vw, var(--space-12));
  color: var(--color-text-secondary);
  font-size: clamp(var(--font-size-lg), 2vw, var(--font-size-2xl));
  line-height: 1.55;
}

@media (width < 52rem) {
  :deep(.case-section) {
    grid-template-columns: minmax(0, 1fr);
    gap: var(--space-8);
    padding-block: var(--space-12);
  }

  :deep(.case-section__body) {
    display: block;
  }
}
</style>
