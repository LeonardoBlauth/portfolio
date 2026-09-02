<script setup lang="ts">
import SpotlightCard from '~/components/ui/SpotlightCard.vue'

const { t } = useI18n()

const contactActions = [
  {
    key: 'email',
    href: 'mailto:contato@leonardoblauth.dev',
    label: 'contato@leonardoblauth.dev',
    external: false,
    primary: true,
  },
  {
    key: 'github',
    href: 'https://github.com/LeonardoBlauth',
    label: 'GitHub',
    external: true,
    primary: false,
  },
  {
    key: 'linkedin',
    href: 'https://www.linkedin.com/in/leonardo-blauth',
    label: 'LinkedIn',
    external: true,
    primary: false,
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
      <SpotlightCard
        class-name="contact__card"
        spotlight-color="var(--color-contact-spotlight)"
      >
        <div class="contact__card-content">
          <p class="contact__label">{{ t('contact.label') }}</p>
          <h2 id="contact-heading">{{ t('contact.headline') }}</h2>
          <p class="contact__description">{{ t('contact.description') }}</p>

          <nav
            class="contact__actions"
            :aria-label="t('contact.actions.label')"
          >
            <a
              v-for="action in contactActions"
              :key="action.key"
              class="contact__action"
              :class="{
                'contact__action--primary': action.primary,
                'contact__action--github': action.key === 'github',
              }"
              :href="action.href"
              :target="action.external ? '_blank' : undefined"
              :rel="action.external ? 'noopener noreferrer' : undefined"
              :aria-label="t(`contact.actions.${action.key}Label`)"
            >
              <svg
                v-if="action.key === 'email'"
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
              >
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m4 7 8 6 8-6" />
              </svg>
              <svg
                v-else-if="action.key === 'github'"
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12 2.75a9.25 9.25 0 0 0-2.93 18.03c.46.08.63-.2.63-.44v-1.8c-2.57.56-3.11-1.09-3.11-1.09-.42-1.07-1.03-1.35-1.03-1.35-.84-.58.07-.57.07-.57.93.07 1.42.96 1.42.96.83 1.42 2.17 1.01 2.7.77.08-.6.32-1.01.59-1.25-2.05-.23-4.21-1.03-4.21-4.57 0-1.01.36-1.84.96-2.49-.1-.23-.42-1.18.09-2.45 0 0 .78-.25 2.54.95A8.8 8.8 0 0 1 12 7.09a8.8 8.8 0 0 1 2.31.31c1.77-1.2 2.54-.95 2.54-.95.51 1.27.19 2.22.09 2.45.6.65.96 1.48.96 2.49 0 3.55-2.16 4.33-4.22 4.56.33.29.63.85.63 1.72v2.67c0 .25.17.53.64.44A9.25 9.25 0 0 0 12 2.75Z"
                />
              </svg>
              <svg
                v-else
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
              >
                <path
                  d="M6.5 8.5v9m0-12.25v.01M10.5 17.5v-9m0 4a4 4 0 0 1 8 0v5"
                />
              </svg>
              <span>{{ action.label }}</span>
            </a>
          </nav>
        </div>
      </SpotlightCard>
    </div>
  </section>
</template>

<style scoped>
.contact {
  border-block-start: 1px solid var(--color-border);
}

.contact__layout {
  display: block;
}

:deep(.contact__card) {
  --spotlight-card-opacity: var(--contact-spotlight-opacity);

  inline-size: 100%;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: color-mix(in srgb, var(--color-surface) 94%, transparent);
}

.contact__card-content {
  display: grid;
  justify-items: center;
  max-inline-size: 68rem;
  min-block-size: clamp(29rem, 46vw, 38rem);
  margin-inline: auto;
  padding: clamp(var(--space-10), 8vw, var(--space-24));
  text-align: center;
}

.contact__label {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  margin: 0 0 var(--space-6);
  color: var(--color-accent);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.contact__label::before {
  inline-size: var(--space-5);
  block-size: 1px;
  content: '';
  background: currentColor;
}

h2 {
  max-inline-size: 17ch;
  margin: 0;
  color: var(--color-text-primary);
  font-size: clamp(2.5rem, 6vw, 5.25rem);
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-tight);
  letter-spacing: -0.04em;
  text-wrap: balance;
}

.contact__description {
  max-inline-size: 55ch;
  margin: var(--space-6) 0 0;
  color: var(--color-text-secondary);
  font-size: var(--font-size-lg);
  line-height: var(--line-height-body);
}

.contact__actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--space-3);
  margin-block-start: var(--space-10);
}

.contact__action {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  min-block-size: 3rem;
  padding-inline: var(--space-5);
  color: var(--color-text-primary);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  line-height: 1.2;
  text-decoration: none;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: color-mix(
    in srgb,
    var(--color-surface-elevated) 50%,
    transparent
  );
  transition:
    color var(--motion-duration-fast) var(--motion-ease-standard),
    border-color var(--motion-duration-fast) var(--motion-ease-standard),
    background-color var(--motion-duration-fast) var(--motion-ease-standard);
}

.contact__action svg {
  flex: 0 0 auto;
  inline-size: 1rem;
  block-size: 1rem;
  fill: none;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.contact__action--github svg {
  fill: currentColor;
  stroke: none;
}

.contact__action--primary {
  color: var(--color-accent-contrast);
  border-color: var(--color-accent);
  background: var(--color-accent);
}

@media (hover: hover) {
  .contact__action:hover {
    color: var(--color-accent);
    border-color: color-mix(
      in srgb,
      var(--color-accent) 50%,
      var(--color-border)
    );
    background: var(--color-surface-elevated);
  }

  .contact__action--primary:hover {
    color: var(--color-accent-contrast);
    border-color: var(--color-accent-interactive);
    background: var(--color-accent-interactive);
  }
}

.contact__action:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: 3px;
}

@media (width < 42rem) {
  .contact__card-content {
    min-block-size: 0;
    padding: var(--space-10) var(--space-6);
  }

  h2 {
    max-inline-size: 14ch;
    font-size: clamp(2.35rem, 11vw, 3.75rem);
  }

  .contact__description {
    font-size: var(--font-size-base);
  }
}

@media (width < 32rem) {
  .contact__actions {
    inline-size: 100%;
  }

  .contact__action {
    inline-size: 100%;
    padding-inline: var(--space-4);
    overflow-wrap: anywhere;
  }
}
</style>
