<script setup lang="ts">
const { t } = useI18n()

const contactActions = [
  {
    key: 'email',
    href: 'mailto:contato@leonardoblauth.dev',
    value: 'contato@leonardoblauth.dev',
    external: false,
  },
  {
    key: 'github',
    href: 'https://github.com/LeonardoBlauth',
    value: 'github.com/LeonardoBlauth',
    external: true,
  },
  {
    key: 'linkedin',
    href: 'https://www.linkedin.com/in/leonardo-blauth',
    value: 'linkedin.com/in/leonardo-blauth',
    external: true,
  },
] as const
</script>

<template>
  <section
    id="contact"
    class="contact section-spacing"
    aria-labelledby="contact-heading"
  >
    <div class="contact__layout layout-container">
      <header class="contact__header">
        <p class="contact__label">{{ t('contact.label') }}</p>
        <h2 id="contact-heading">{{ t('contact.headline') }}</h2>
        <p class="contact__description">{{ t('contact.description') }}</p>
      </header>

      <nav class="contact__actions" :aria-label="t('contact.actions.label')">
        <a
          v-for="action in contactActions"
          :key="action.key"
          class="contact__action"
          :href="action.href"
          :target="action.external ? '_blank' : undefined"
          :rel="action.external ? 'noopener noreferrer' : undefined"
          :aria-label="t(`contact.actions.${action.key}Label`)"
        >
          <span class="contact__action-name">
            {{ t(`contact.actions.${action.key}`) }}
          </span>
          <span class="contact__action-value">{{ action.value }}</span>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path v-if="action.external" d="M8 5h11v11m0-11L5 19" />
            <path
              v-else
              d="M4 7.5 12 13l8-5.5M5 6h14a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1Z"
            />
          </svg>
        </a>
      </nav>
    </div>
  </section>
</template>

<style scoped>
.contact {
  border-block-start: 1px solid var(--color-border);
}

.contact__layout {
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(26rem, 1.1fr);
  gap: clamp(var(--space-12), 9vw, var(--space-24));
  align-items: start;
}

.contact__header {
  max-inline-size: 40rem;
}

.contact__label {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-block: 0 var(--space-6);
  color: var(--color-text-muted);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.contact__label::before {
  width: var(--space-6);
  height: 1px;
  content: '';
  background: var(--color-accent);
}

.contact h2 {
  max-inline-size: 11ch;
  margin: 0;
  font-size: clamp(2.75rem, 6vw, 5.25rem);
  line-height: 0.98;
  letter-spacing: -0.04em;
  text-wrap: balance;
}

.contact__description {
  max-inline-size: 36rem;
  margin-block: var(--space-8) 0;
  color: var(--color-text-muted);
  font-size: clamp(var(--font-size-lg), 2vw, var(--font-size-xl));
  line-height: 1.6;
}

.contact__actions {
  border-block-start: 1px solid var(--color-border);
}

.contact__action {
  display: grid;
  grid-template-columns: minmax(6.5rem, 0.45fr) minmax(0, 1fr) var(--space-6);
  gap: var(--space-5);
  align-items: center;
  min-block-size: 6rem;
  padding: var(--space-6) var(--space-2);
  color: var(--color-text-primary);
  text-decoration: none;
  border-block-end: 1px solid var(--color-border);
  transition:
    color var(--motion-duration-fast) var(--motion-ease-standard),
    background-color var(--motion-duration-fast) var(--motion-ease-standard),
    padding-inline var(--motion-duration-fast) var(--motion-ease-standard);
}

.contact__action:hover {
  padding-inline: var(--space-5);
  color: var(--color-accent);
  background: var(--color-surface-elevated);
}

.contact__action:focus-visible {
  color: var(--color-accent);
  background: var(--color-surface-elevated);
  outline: 2px solid var(--color-focus);
  outline-offset: 3px;
}

.contact__action-name {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
}

.contact__action-value {
  min-width: 0;
  overflow-wrap: anywhere;
  color: var(--color-text-muted);
}

.contact__action svg {
  width: var(--space-6);
  height: var(--space-6);
  fill: none;
  stroke: currentcolor;
  stroke-width: 1.6;
  stroke-linecap: round;
  stroke-linejoin: round;
  transition: translate var(--motion-duration-fast) var(--motion-ease-standard);
}

.contact__action:hover svg,
.contact__action:focus-visible svg {
  translate: 0.2rem -0.2rem;
}

@media (max-width: 52rem) {
  .contact__layout {
    grid-template-columns: minmax(0, 1fr);
    gap: var(--space-12);
  }

  .contact h2 {
    max-inline-size: 14ch;
  }
}

@media (max-width: 42rem) {
  .contact__layout {
    gap: var(--space-10);
  }

  .contact__description {
    margin-block-start: var(--space-6);
  }
}

@media (max-width: 32rem) {
  .contact h2 {
    font-size: clamp(2.5rem, 12vw, 3.5rem);
  }

  .contact__action {
    grid-template-columns: minmax(0, 1fr) var(--space-6);
    gap: var(--space-2) var(--space-4);
    min-block-size: 6.5rem;
    padding-inline: var(--space-1);
  }

  .contact__action-value {
    grid-column: 1;
  }

  .contact__action svg {
    grid-row: 1 / span 2;
    grid-column: 2;
  }
}
</style>
