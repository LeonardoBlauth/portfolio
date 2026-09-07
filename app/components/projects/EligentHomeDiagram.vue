<script setup lang="ts">
const { t } = useI18n()

const visualText = (key: string) =>
  t(`selectedProjects.eligent.visual.${key}`)
</script>

<template>
  <div class="eligent-home-signal" aria-hidden="true">
    <div class="eligent-home-signal__opportunity">
      <p>{{ visualText('opportunity') }}</p>
      <strong>{{ visualText('time') }}</strong>
    </div>

    <div class="eligent-home-signal__context">
      <p>{{ visualText('availability') }}</p>
      <p>{{ visualText('rules') }}</p>
    </div>

    <span class="eligent-home-signal__assessment" />
    <strong class="eligent-home-signal__result">{{
      visualText('result')
    }}</strong>
  </div>
</template>

<style scoped>
.eligent-home-signal {
  position: relative;
  display: grid;
  width: 100%;
  height: 100%;
  aspect-ratio: 1.7;
  min-block-size: 0;
  overflow: hidden;
}

.eligent-home-signal__opportunity,
.eligent-home-signal__context,
.eligent-home-signal__assessment,
.eligent-home-signal__result {
  position: absolute;
}

.eligent-home-signal__opportunity,
.eligent-home-signal__context {
  display: grid;
  gap: var(--space-3);
  padding: clamp(var(--space-4), 2.3vw, var(--space-6));
  background: color-mix(in srgb, var(--color-surface) 92%, transparent);
  border: 1px solid var(--color-border);
}

.eligent-home-signal__opportunity {
  inset: 18% auto auto 12%;
  width: min(52%, 15rem);
  rotate: -4deg;
}

.eligent-home-signal__opportunity::before {
  position: absolute;
  inset: var(--space-4) auto var(--space-4) var(--space-3);
  width: 2px;
  content: '';
  background: var(--color-accent);
}

.eligent-home-signal__opportunity p,
.eligent-home-signal__context p {
  margin: 0;
  padding-inline-start: var(--space-3);
  color: var(--color-text-secondary);
  font-size: clamp(0.55rem, 1.2vw, var(--font-size-xs));
  font-weight: var(--font-weight-semibold);
  letter-spacing: 0.07em;
  line-height: 1.2;
}

.eligent-home-signal__opportunity strong {
  padding-inline-start: var(--space-3);
  color: var(--color-text-primary);
  font-size: clamp(0.72rem, 1.8vw, var(--font-size-sm));
  letter-spacing: -0.02em;
  line-height: 1.15;
}

.eligent-home-signal__context {
  inset: auto auto 18% 27%;
  width: min(48%, 13.5rem);
  gap: 0;
  padding-block: var(--space-4);
  background: color-mix(in srgb, var(--color-surface) 94%, var(--color-text-muted));
  border-color: color-mix(in srgb, var(--color-text-muted) 34%, var(--color-border));
  rotate: 3deg;
}

.eligent-home-signal__context p {
  padding-block: var(--space-2);
  color: var(--color-text-primary);
}

.eligent-home-signal__context p + p {
  border-block-start: 1px solid var(--color-border);
}

.eligent-home-signal__assessment {
  inset: 51% 24% auto auto;
  width: min(31%, 8.25rem);
  height: 2px;
  background: color-mix(in srgb, var(--color-accent) 72%, var(--color-border));
}

.eligent-home-signal__assessment::before {
  position: absolute;
  inset: 50% auto auto 0;
  width: 0.55rem;
  height: 0.55rem;
  content: '';
  background: var(--color-accent);
  border-radius: 50%;
  translate: 0 -50%;
}

.eligent-home-signal__result {
  inset: 51% 5% auto auto;
  color: var(--color-accent);
  font-size: clamp(0.7rem, 1.6vw, var(--font-size-sm));
  font-weight: var(--font-weight-semibold);
  letter-spacing: 0.08em;
  line-height: 1;
  translate: 0 -50%;
}

@media (width < 42rem) {
  .eligent-home-signal {
    aspect-ratio: 1.45;
  }

  .eligent-home-signal__opportunity {
    width: 58%;
    inset-inline-start: 9%;
  }

  .eligent-home-signal__context {
    width: 54%;
    inset-inline-start: 22%;
  }

  .eligent-home-signal__assessment {
    inset-inline-end: 17%;
    width: 28%;
  }

  .eligent-home-signal__result {
    inset-inline-end: 2%;
  }
}
</style>
