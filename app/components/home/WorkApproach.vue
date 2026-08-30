<script setup lang="ts">
const { t } = useI18n()

const principles = ['understand', 'decide', 'evolve'] as const
</script>

<template>
  <section
    id="work-approach"
    class="work-approach section-spacing"
    aria-labelledby="work-approach-heading"
  >
    <div class="work-approach__layout layout-container">
      <header class="work-approach__header">
        <p class="work-approach__label">{{ t('workApproach.label') }}</p>
        <h2 id="work-approach-heading">
          {{ t('workApproach.headline') }}
        </h2>
      </header>

      <div class="work-approach__content">
        <div class="work-approach__copy">
          <p>{{ t('workApproach.paragraphs.context') }}</p>
          <p>{{ t('workApproach.paragraphs.ai') }}</p>
        </div>

        <ol class="work-approach__principles">
          <li
            v-for="(principle, index) in principles"
            :key="principle"
            data-work-principle
          >
            <span aria-hidden="true">
              {{ String(index + 1).padStart(2, '0') }}
            </span>
            <strong>{{ t(`workApproach.principles.${principle}`) }}</strong>
          </li>
        </ol>
      </div>
    </div>
  </section>
</template>

<style scoped>
.work-approach {
  border-block-start: 1px solid var(--color-border);
}

.work-approach__layout {
  display: grid;
  grid-template-columns: minmax(0, 0.95fr) minmax(24rem, 1.05fr);
  gap: clamp(var(--space-12), 9vw, var(--space-24));
  align-items: start;
}

.work-approach__header {
  max-inline-size: 36rem;
}

.work-approach__label {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  color: var(--color-text-muted);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.work-approach__label::before {
  width: var(--space-6);
  height: 1px;
  content: '';
  background: var(--color-accent);
}

.work-approach h2 {
  margin-block-start: var(--space-6);
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  line-height: 0.98;
  letter-spacing: -0.04em;
  text-wrap: balance;
}

.work-approach__content {
  max-inline-size: 44rem;
}

.work-approach__copy {
  display: grid;
  gap: var(--space-6);
  color: var(--color-text-secondary);
  font-size: var(--font-size-lg);
  line-height: 1.7;
}

.work-approach__principles {
  margin-block-start: var(--space-10);
  list-style: none;
  border-block-start: 1px solid var(--color-border);
}

.work-approach__principles li {
  display: grid;
  grid-template-columns: 2rem minmax(0, 1fr);
  gap: var(--space-4);
  align-items: center;
  min-block-size: 4rem;
  border-block-end: 1px solid var(--color-border);
}

.work-approach__principles span {
  color: var(--color-accent);
  font-family: var(--font-mono);
  font-size: var(--font-size-xs);
  font-variant-numeric: tabular-nums;
}

.work-approach__principles strong {
  font-weight: var(--font-weight-semibold);
}

@media (width < 52rem) {
  .work-approach__layout {
    grid-template-columns: minmax(0, 1fr);
    gap: clamp(var(--space-12), 12vw, var(--space-20));
  }

  .work-approach__content {
    max-inline-size: 42rem;
  }
}

@media (width < 32rem) {
  .work-approach h2 {
    font-size: clamp(2.35rem, 12vw, 3.25rem);
  }
}
</style>
