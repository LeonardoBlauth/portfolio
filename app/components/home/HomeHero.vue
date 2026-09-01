<script setup lang="ts">
import LightRays from '~/components/ui/LightRays.vue'
import TextType from '~/components/ui/TextType.vue'

const { t } = useI18n()
const { resolvedTheme } = useTheme()

const raysColor = computed(() =>
  resolvedTheme.value === 'light' ? '#FFD166' : '#fff',
)
const raysSaturation = computed(() =>
  resolvedTheme.value === 'light' ? 1 : 0.82,
)
</script>

<template>
  <section id="top" class="hero" aria-labelledby="hero-title">
    <LightRays
      class="hero__light-rays"
      aria-hidden="true"
      rays-origin="top-center"
      :rays-color="raysColor"
      :rays-speed="0.1"
      :light-spread="0.5"
      :ray-length="2.5"
      :fade-distance="1"
      :pulsating="false"
      :saturation="raysSaturation"
      :follow-mouse="true"
      :mouse-influence="0.05"
      :noise-amount="0"
      :distortion="0.01"
    />

    <div class="hero__layout layout-container">
      <div class="hero__identity">
        <TextType
          id="hero-title"
          class="hero__name"
          text="Leonardo&#10;Blauth"
          as="h1"
          :typing-speed="70"
          :show-cursor="true"
          cursor-character="|"
        />

        <p class="hero__role">Full Stack Developer</p>

        <p class="hero__availability">
          <span class="hero__availability-dot" aria-hidden="true" />
          {{ t('hero.availability') }}
        </p>
      </div>

      <div class="hero__details">
        <p class="hero__description">{{ t('hero.description') }}</p>

        <div class="hero__actions">
          <a class="hero__cta hero__cta--primary" href="#contact">
            {{ t('hero.actions.contact') }}
            <svg viewBox="0 0 20 20" aria-hidden="true">
              <path d="M4 10h11m-4-4 4 4-4 4" />
            </svg>
          </a>
          <a class="hero__cta hero__cta--secondary" href="#projects">
            {{ t('hero.actions.projects') }}
          </a>
        </div>

        <nav class="hero__socials" :aria-label="t('hero.social.label')">
          <a
            href="https://github.com/LeonardoBlauth"
            target="_blank"
            rel="noopener noreferrer"
            :aria-label="t('hero.social.githubLabel')"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M12 2.75a9.25 9.25 0 0 0-2.93 18.03c.46.08.63-.2.63-.44v-1.8c-2.57.56-3.11-1.09-3.11-1.09-.42-1.07-1.03-1.35-1.03-1.35-.84-.58.07-.57.07-.57.93.07 1.42.96 1.42.96.83 1.42 2.17 1.01 2.7.77.08-.6.32-1.01.59-1.25-2.05-.23-4.21-1.03-4.21-4.57 0-1.01.36-1.84.96-2.49-.1-.23-.42-1.18.09-2.45 0 0 .78-.25 2.54.95A8.8 8.8 0 0 1 12 7.09a8.8 8.8 0 0 1 2.31.31c1.77-1.2 2.54-.95 2.54-.95.51 1.27.19 2.22.09 2.45.6.65.96 1.48.96 2.49 0 3.55-2.16 4.33-4.22 4.56.33.29.63.85.63 1.72v2.67c0 .25.17.53.64.44A9.25 9.25 0 0 0 12 2.75Z"
              />
            </svg>
            <span>GitHub</span>
          </a>
          <a
            href="https://www.linkedin.com/in/leonardo-blauth"
            target="_blank"
            rel="noopener noreferrer"
            :aria-label="t('hero.social.linkedinLabel')"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M6.5 8.5v9m0-12.25v.01M10.5 17.5v-9m0 4a4 4 0 0 1 8 0v5"
              />
            </svg>
            <span>LinkedIn</span>
          </a>
        </nav>

        <ul class="hero__metadata" :aria-label="t('hero.metadata.label')">
          <li>{{ t('hero.metadata.location') }}</li>
          <li>{{ t('hero.metadata.experience') }}</li>
          <li>Vue.js · TypeScript · Laravel · MySQL</li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  --hero-accent: #6377ff;
  --hero-accent-hover: #7f90ff;
  --hero-button: #5269db;
  --hero-button-hover: #4058c8;
  --hero-name-typing-duration: 1.05s;
  --hero-role-delay: calc(var(--hero-name-typing-duration) + 0.08s);
  --hero-availability-delay: calc(var(--hero-role-delay) + 0.44s);
  --hero-details-delay: calc(
    var(--hero-availability-delay) + var(--motion-duration-base) +
      var(--motion-duration-fast)
  );
  position: relative;
  isolation: isolate;
  min-block-size: 100vh;
  min-block-size: 100svh;
  overflow: clip;
}

:global(:root[data-theme='light'] .hero) {
  --hero-accent: #245fdf;
  --hero-accent-hover: #1d4ed8;
  --hero-button: #245fdf;
  --hero-button-hover: #1d4ed8;
}

.hero__light-rays {
  position: absolute;
  z-index: 0;
  inset: 0;
  opacity: 0.52;
}

:global(:root[data-theme='light'] .hero__light-rays) {
  opacity: 0.34;
}

.hero__layout {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  align-content: center;
  gap: var(--space-10);
  min-block-size: inherit;
  padding-block: var(--space-8) var(--space-20);
}

.hero__identity,
.hero__details {
  position: relative;
  z-index: 1;
  min-inline-size: 0;
}

.hero__identity {
  max-inline-size: 32rem;
}

.hero__details {
  max-inline-size: 36rem;
}

.hero__availability {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  animation: hero-status-reveal var(--motion-duration-base)
    var(--motion-ease-emphasized) var(--hero-availability-delay) both;
}

.hero__availability-dot {
  width: 0.5rem;
  height: 0.5rem;
  background: var(--hero-accent);
  border-radius: 50%;
  box-shadow: 0 0 0 0.3rem
    color-mix(in srgb, var(--hero-accent) 16%, transparent);
}

.hero__name {
  display: grid;
  color: var(--color-text-primary);
  font-size: clamp(4.25rem, 8vw, 6rem);
  font-weight: var(--font-weight-semibold);
  line-height: 0.84;
  letter-spacing: -0.04em;
}

.hero__role {
  margin-block-start: var(--space-8);
  color: var(--hero-accent);
  font-size: clamp(var(--font-size-xl), 1.8vw, 1.75rem);
  line-height: var(--line-height-heading);
  letter-spacing: -0.035em;
  animation: hero-role-reveal var(--motion-duration-slow)
    var(--motion-ease-emphasized) var(--hero-role-delay) both;
}

.hero__role + .hero__availability {
  margin-block-start: var(--space-5);
}

.hero__details {
  animation: hero-details-reveal var(--motion-duration-slow)
    var(--motion-ease-emphasized) var(--hero-details-delay) both;
}

.hero__description {
  max-inline-size: 39rem;
  color: var(--color-text-secondary);
  font-size: clamp(var(--font-size-lg), 1.5vw, 1.4rem);
  line-height: 1.58;
  letter-spacing: -0.02em;
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  margin-block-start: var(--space-8);
}

.hero__cta {
  display: inline-flex;
  min-block-size: 3.125rem;
  align-items: center;
  justify-content: center;
  gap: var(--space-4);
  padding-inline: var(--space-5);
  color: var(--color-text-primary);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  text-decoration: none;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  transition:
    color var(--motion-duration-fast) var(--motion-ease-standard),
    background-color var(--motion-duration-fast) var(--motion-ease-standard),
    border-color var(--motion-duration-fast) var(--motion-ease-standard),
    translate var(--motion-duration-fast) var(--motion-ease-standard);
}

.hero__cta:hover {
  translate: 0 -0.125rem;
}

.hero__cta svg {
  width: 1.125rem;
  fill: none;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 1.7;
}

.hero__cta--primary {
  color: #ffffff;
  background: var(--hero-button);
  border-color: transparent;
}

.hero__cta--primary:hover {
  color: #ffffff;
  background: var(--hero-button-hover);
}

.hero__cta--secondary:hover {
  color: var(--color-text-primary);
  background: var(--color-surface-elevated);
}

.hero__socials {
  display: flex;
  align-items: center;
  gap: var(--space-6);
  margin-block-start: var(--space-6);
}

.hero__socials a {
  display: inline-flex;
  min-block-size: 2.75rem;
  align-items: center;
  gap: var(--space-2);
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
  text-decoration: none;
}

.hero__socials a:hover {
  color: var(--hero-accent-hover);
}

.hero__socials svg {
  width: 1.125rem;
  height: 1.125rem;
  fill: none;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 1.6;
}

.hero__socials a:first-child svg {
  fill: currentColor;
  stroke: none;
}

.hero__metadata {
  display: grid;
  grid-template-columns: max-content minmax(0, 1fr);
  max-inline-size: 100%;
  padding: 0;
  margin: var(--space-8) 0 0;
  color: var(--color-text-muted);
  font-size: var(--font-size-xs);
  list-style: none;
  border-block-start: 1px solid var(--color-border);
}

.hero__metadata li {
  min-inline-size: 0;
  padding: var(--space-4) var(--space-5);
  white-space: nowrap;
  border-inline-start: 1px solid var(--color-border);
}

.hero__metadata li:first-child {
  padding-inline-start: 0;
  border-inline-start: 0;
}

.hero__metadata li:last-child {
  grid-column: 1 / -1;
  padding-inline-start: 0;
  border-block-start: 1px solid var(--color-border);
  border-inline-start: 0;
}

@keyframes hero-role-reveal {
  from {
    opacity: 0;
    clip-path: inset(0 0 100% 0);
    translate: 0 0.375rem;
  }
  to {
    opacity: 1;
    clip-path: inset(0);
    translate: 0;
  }
}

@keyframes hero-status-reveal {
  from {
    opacity: 0;
    translate: 0 0.25rem;
  }
  to {
    opacity: 1;
    translate: 0;
  }
}

@keyframes hero-details-reveal {
  from {
    opacity: 0;
    translate: 0 0.5rem;
  }
  to {
    opacity: 1;
    translate: 0;
  }
}

@media (width >= 68rem) {
  .hero__layout {
    grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
    align-items: center;
    column-gap: clamp(var(--space-12), 6vw, var(--space-24));
    padding-block: clamp(var(--space-16), 9vh, var(--space-20)) var(--space-12);
  }

  .hero__details {
    justify-self: end;
  }
}

@media (width < 42rem) {
  .hero__layout {
    padding-block: var(--space-6) var(--space-12);
  }

  .hero__name {
    font-size: clamp(3.75rem, 17vw, 4.5rem);
  }

  .hero__role {
    margin-block-start: var(--space-8);
  }

  .hero__actions {
    display: grid;
    grid-template-columns: minmax(0, 1.25fr) minmax(0, 0.8fr);
  }

  .hero__cta {
    padding-inline: var(--space-3);
    white-space: nowrap;
  }

  .hero__metadata {
    grid-template-columns: minmax(0, 1fr);
    margin-block-start: var(--space-4);
  }

  .hero__metadata li {
    padding: var(--space-3) 0;
    white-space: normal;
    border-block-end: 1px solid var(--color-border);
    border-inline-start: 0;
  }

  .hero__metadata li:last-child {
    grid-column: auto;
    padding-inline-start: 0;
    border-block-start: 0;
  }

  .hero__light-rays {
    inset-inline: -18%;
    width: 136%;
    opacity: 0.42;
  }
}

@media (width < 23rem) {
  .hero__actions {
    grid-template-columns: minmax(0, 1fr);
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero__role,
  .hero__availability,
  .hero__details {
    opacity: 1;
    clip-path: none;
    translate: 0;
    animation: none;
  }

  .hero__cta:hover {
    translate: 0;
  }
}
</style>
