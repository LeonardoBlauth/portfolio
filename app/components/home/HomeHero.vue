<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <section id="top" class="hero" aria-labelledby="hero-title">
    <div class="hero__layout layout-container">
      <div class="hero__content">
        <p class="hero__availability">
          <span class="hero__availability-dot" aria-hidden="true" />
          {{ t('hero.availability') }}
        </p>

        <h1 id="hero-title" class="hero__name">
          <span>Leonardo </span>
          <span>Blauth</span>
        </h1>

        <p class="hero__role">Full Stack Developer</p>
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

      <div class="hero__orbit-system" aria-hidden="true">
        <span class="hero__glow" />
        <span class="hero__orbit hero__orbit--outer" />
        <span class="hero__orbit hero__orbit--middle" />
        <span class="hero__orbit hero__orbit--inner" />
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
  --hero-orbit: rgb(117 138 221 / 50%);
  --hero-orbit-muted: rgb(99 116 151 / 30%);
  --hero-glow: rgb(46 65 139 / 22%);

  position: relative;
  isolation: isolate;
  min-block-size: min(
    47rem,
    calc(100svh - var(--header-height) - var(--space-8))
  );
  overflow: clip;
}

:global(:root[data-theme='light'] .hero) {
  --hero-accent: #245fdf;
  --hero-accent-hover: #1d4ed8;
  --hero-button: #245fdf;
  --hero-button-hover: #1d4ed8;
  --hero-orbit: rgb(36 95 223 / 34%);
  --hero-orbit-muted: rgb(86 103 136 / 22%);
  --hero-glow: rgb(68 111 209 / 16%);
}

.hero__layout {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  align-items: center;
  min-block-size: inherit;
  padding-block: var(--space-8) var(--space-20);
}

.hero__content {
  position: relative;
  z-index: 1;
  max-inline-size: 45rem;
}

.hero__availability {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
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
  margin-block-start: var(--space-8);
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
}

.hero__description {
  max-inline-size: 39rem;
  margin-block-start: var(--space-8);
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
  grid-template-columns: max-content minmax(12rem, 1fr) minmax(17rem, 1.25fr);
  max-inline-size: 45rem;
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

.hero__orbit-system {
  position: absolute;
  z-index: 0;
  inset-block-start: 4.5rem;
  inset-inline-start: 10%;
  width: 45rem;
  height: 27rem;
  pointer-events: none;
  animation: hero-orbit-drift 12s var(--motion-ease-emphasized) infinite
    alternate;
}

.hero__glow,
.hero__orbit {
  position: absolute;
  inset: 50% auto auto 50%;
  translate: -50% -50%;
}

.hero__glow {
  width: 60%;
  aspect-ratio: 1;
  background: radial-gradient(circle, var(--hero-glow), transparent 68%);
  border-radius: 50%;
  filter: blur(0.5rem);
}

.hero__orbit {
  border: 1px solid var(--hero-orbit-muted);
  border-radius: 50%;
  rotate: -15deg;
}

.hero__orbit--outer {
  width: 145%;
  height: 120%;
}

.hero__orbit--middle {
  width: 115%;
  height: 90%;
}

.hero__orbit--inner {
  width: 84%;
  height: 65%;
  border-color: var(--hero-orbit);
}

@keyframes hero-orbit-drift {
  from {
    transform: translate3d(0, -0.25rem, 0);
  }
  to {
    transform: translate3d(0.35rem, 0.35rem, 0);
  }
}

@media (width >= 68rem) {
  .hero__layout {
    grid-template-columns: minmax(34rem, 0.92fr) minmax(28rem, 1.08fr);
    gap: var(--space-8);
    padding-block: clamp(var(--space-16), 9vh, var(--space-20)) var(--space-12);
  }

  .hero__orbit-system {
    position: relative;
    inset: auto;
    justify-self: center;
    width: min(49vw, 49rem);
    height: min(31vw, 31rem);
  }
}

@media (width < 42rem) {
  .hero__layout {
    padding-block: var(--space-6) var(--space-12);
  }

  .hero__name {
    margin-block-start: var(--space-8);
    font-size: clamp(3.75rem, 17vw, 4.5rem);
  }

  .hero__role,
  .hero__description {
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

  .hero__orbit-system {
    inset-block-start: 3.5rem;
    inset-inline-start: 4.75rem;
    width: 43rem;
    height: 26rem;
    opacity: 0.82;
  }
}

@media (width < 23rem) {
  .hero__actions {
    grid-template-columns: minmax(0, 1fr);
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero__orbit-system {
    animation: none;
  }

  .hero__cta:hover {
    translate: 0;
  }
}
</style>
