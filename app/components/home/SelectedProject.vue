<script setup lang="ts">
import { localizedRoutes } from '~/data/localized-routes'
import { selectedProject } from '~/data/projects'
import ScrollReveal from '~/components/ui/ScrollReveal.vue'
import type { SupportedLocale } from '~/utils/locale'

const { locale, t } = useI18n()

const currentLocale = computed<SupportedLocale>(() =>
  locale.value === 'en' ? 'en' : 'pt-BR',
)
const caseRoute = computed(
  () => localizedRoutes[selectedProject.route].paths[currentLocale.value],
)
const message = (key: string) => t(`${selectedProject.messageKey}.${key}`)
</script>

<template>
  <section
    id="projects"
    class="selected-projects section-spacing"
    aria-labelledby="projects-heading"
  >
    <div class="selected-projects__container layout-container">
      <ScrollReveal as="header" class="selected-projects__header">
        <p class="selected-projects__label">
          {{ t('selectedProjects.label') }}
        </p>
        <h2 id="projects-heading">{{ t('selectedProjects.headline') }}</h2>
        <p class="selected-projects__introduction">
          {{ t('selectedProjects.introduction') }}
        </p>
      </ScrollReveal>

      <ScrollReveal
        as="article"
        class="selected-project"
        :data-project-id="selectedProject.id"
      >
        <div class="project-preview">
          <div class="project-preview__frame">
            <div class="project-preview__interface" aria-hidden="true">
              <div class="project-preview__rail">
                <span class="project-preview__brand">m</span>
                <span
                  v-for="item in 5"
                  :key="item"
                  class="project-preview__rail-item"
                />
              </div>

              <div class="project-preview__workspace">
                <div class="project-preview__topbar">
                  <span>movune</span>
                  <span class="project-preview__avatar" />
                </div>

                <div class="project-preview__dashboard">
                  <div class="project-preview__dashboard-heading">
                    <span class="project-preview__eyebrow" />
                    <span class="project-preview__action" />
                  </div>

                  <div class="project-preview__metrics">
                    <span v-for="item in 3" :key="item" />
                  </div>

                  <div class="project-preview__schedule">
                    <div class="project-preview__schedule-header">
                      <span />
                      <span />
                      <span />
                    </div>
                    <div class="project-preview__schedule-grid">
                      <span v-for="item in 12" :key="item" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p class="project-preview__note">{{ message('representation') }}</p>
        </div>

        <div class="selected-project__content">
          <p class="selected-project__identifier">
            <span>{{ selectedProject.order }}</span>
            <span aria-hidden="true">·</span>
            <span>{{ message('type') }}</span>
            <span aria-hidden="true">·</span>
            <span>{{ message('productType') }}</span>
          </p>

          <div class="selected-project__title-row">
            <h3>{{ selectedProject.id }}</h3>
            <span class="selected-project__status">{{
              message('status')
            }}</span>
          </div>

          <p class="selected-project__classification">
            {{ message('classification') }}
          </p>
          <p class="selected-project__description">
            {{ message('description') }}
          </p>

          <div class="selected-project__scope">
            <p>{{ message('scopeLabel') }}</p>
            <p>{{ message('scope') }}</p>
          </div>

          <NuxtLink class="selected-project__cta" :to="caseRoute">
            {{ message('cta') }}
            <svg viewBox="0 0 20 20" aria-hidden="true">
              <path d="M4 10h11m-4-4 4 4-4 4" />
            </svg>
          </NuxtLink>
        </div>
      </ScrollReveal>
    </div>
  </section>
</template>

<style scoped>
.selected-projects {
  position: relative;
}

@media (width >= 64rem) and (height >= 52rem) {
  .selected-projects {
    display: grid;
    min-block-size: 100vh;
    min-block-size: 100svh;
    align-content: center;
  }
}

.selected-projects::before {
  position: absolute;
  inset: 12% 0 auto;
  height: 1px;
  content: '';
  background: linear-gradient(
    90deg,
    transparent,
    var(--color-border),
    transparent
  );
  opacity: 0.7;
}

.selected-projects__header {
  display: grid;
  grid-template-columns: minmax(8rem, 0.35fr) minmax(18rem, 0.85fr) minmax(
      18rem,
      0.7fr
    );
  gap: var(--space-8);
  align-items: start;
}

.selected-projects__label,
.selected-project__identifier,
.selected-project__classification,
.project-preview__note {
  color: var(--color-text-muted);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.selected-projects__label {
  padding-block-start: var(--space-2);
  color: var(--color-accent);
}

.selected-projects h2 {
  max-inline-size: 34rem;
  font-size: var(--font-size-3xl);
  line-height: var(--line-height-tight);
  letter-spacing: -0.045em;
}

.selected-projects__introduction {
  max-inline-size: 34rem;
  color: var(--color-text-secondary);
  font-size: var(--font-size-lg);
}

.selected-project {
  display: grid;
  grid-template-columns: minmax(0, 1.22fr) minmax(20rem, 0.78fr);
  gap: clamp(var(--space-8), 5vw, var(--space-16));
  align-items: center;
  margin-block-start: clamp(var(--space-12), 7vw, var(--space-20));
}

.project-preview {
  min-inline-size: 0;
}

.project-preview__frame {
  position: relative;
  padding: clamp(var(--space-4), 3vw, var(--space-8));
  overflow: hidden;
  background:
    radial-gradient(circle at 82% 14%, rgb(78 174 127 / 18%), transparent 34%),
    linear-gradient(145deg, #111a18, #090e0d 72%);
  border: 1px solid rgb(92 140 118 / 34%);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-elevated);
}

.project-preview__frame::after {
  position: absolute;
  inset: auto -10% -45% 28%;
  aspect-ratio: 1;
  content: '';
  border: 1px solid rgb(91 185 139 / 20%);
  border-radius: 50%;
}

.project-preview__interface {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: clamp(2.75rem, 6vw, 4.25rem) minmax(0, 1fr);
  aspect-ratio: 16 / 10;
  overflow: hidden;
  background: #f4f7f5;
  border: 1px solid rgb(255 255 255 / 12%);
  border-radius: calc(var(--radius-lg) - var(--space-1));
  box-shadow: 0 1.5rem 4rem rgb(0 0 0 / 38%);
  transition: transform var(--motion-duration-slow)
    var(--motion-ease-emphasized);
}

.project-preview__frame:hover .project-preview__interface {
  transform: scale(1.012);
}

.project-preview__rail {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(0.45rem, 1vw, 0.85rem);
  padding-block: clamp(0.6rem, 1.4vw, 1rem);
  background: #123c30;
}

.project-preview__brand {
  display: grid;
  width: clamp(1.5rem, 3vw, 2.2rem);
  aspect-ratio: 1;
  place-items: center;
  margin-block-end: clamp(0.2rem, 1vw, 0.7rem);
  color: #123c30;
  font-weight: var(--font-weight-bold);
  background: #79d6a8;
  border-radius: 28% 28% 50%;
}

.project-preview__rail-item {
  width: 42%;
  aspect-ratio: 1;
  border: 1px solid rgb(224 255 239 / 34%);
  border-radius: 0.3rem;
}

.project-preview__workspace {
  min-inline-size: 0;
}

.project-preview__topbar {
  display: flex;
  min-block-size: 16%;
  align-items: center;
  justify-content: space-between;
  padding-inline: 5%;
  color: #15382e;
  font-size: clamp(0.45rem, 1.2vw, 0.8rem);
  font-weight: var(--font-weight-semibold);
  border-block-end: 1px solid #dce5e1;
}

.project-preview__avatar {
  width: clamp(1rem, 2.4vw, 1.8rem);
  aspect-ratio: 1;
  background: #d5e7df;
  border-radius: 50%;
}

.project-preview__dashboard {
  padding: 5%;
}

.project-preview__dashboard-heading,
.project-preview__schedule-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.project-preview__eyebrow {
  width: 24%;
  height: clamp(0.35rem, 0.8vw, 0.6rem);
  background: #cdded7;
  border-radius: 999px;
}

.project-preview__action {
  width: 18%;
  height: clamp(0.55rem, 1.4vw, 1rem);
  background: #2e8e67;
  border-radius: 999px;
}

.project-preview__metrics {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 3%;
  margin-block-start: 5%;
}

.project-preview__metrics span {
  aspect-ratio: 2.4 / 1;
  background: linear-gradient(135deg, #ffffff, #edf3f0);
  border: 1px solid #dbe7e2;
  border-radius: clamp(0.2rem, 0.7vw, 0.5rem);
}

.project-preview__schedule {
  padding: 4%;
  margin-block-start: 5%;
  background: #ffffff;
  border: 1px solid #dbe7e2;
  border-radius: clamp(0.2rem, 0.7vw, 0.5rem);
}

.project-preview__schedule-header span {
  width: 18%;
  height: clamp(0.2rem, 0.5vw, 0.4rem);
  background: #dce8e3;
  border-radius: 999px;
}

.project-preview__schedule-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: clamp(0.15rem, 0.6vw, 0.4rem);
  margin-block-start: 5%;
}

.project-preview__schedule-grid span {
  aspect-ratio: 2.1 / 1;
  background: #edf5f1;
  border-inline-start: 2px solid #55ad85;
  border-radius: 0.15rem;
}

.project-preview__note {
  margin-block-start: var(--space-4);
  letter-spacing: 0.055em;
}

.selected-project__identifier {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.selected-project__identifier span:first-child {
  color: var(--color-accent);
}

.selected-project__title-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-4);
  margin-block-start: var(--space-5);
}

.selected-project h3 {
  font-size: clamp(3rem, 6vw, 5.5rem);
  font-weight: var(--font-weight-semibold);
  line-height: 0.9;
  letter-spacing: -0.04em;
}

.selected-project__status {
  display: inline-flex;
  min-block-size: 2rem;
  align-items: center;
  padding-inline: var(--space-3);
  color: var(--color-text-secondary);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-pill);
}

.selected-project__status::before {
  width: 0.4rem;
  height: 0.4rem;
  margin-inline-end: var(--space-2);
  content: '';
  background: var(--color-accent);
  border-radius: 50%;
}

.selected-project__classification {
  margin-block-start: var(--space-4);
  color: var(--color-text-secondary);
}

.selected-project__description {
  max-inline-size: 38rem;
  margin-block-start: var(--space-8);
  color: var(--color-text-secondary);
  font-size: var(--font-size-lg);
  line-height: 1.65;
}

.selected-project__scope {
  padding-block: var(--space-5);
  margin-block-start: var(--space-8);
  border-block: 1px solid var(--color-border);
}

.selected-project__scope p:first-child {
  color: var(--color-text-muted);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.selected-project__scope p:last-child {
  margin-block-start: var(--space-3);
  color: var(--color-text-secondary);
}

.selected-project__cta {
  display: inline-flex;
  min-block-size: 3rem;
  align-items: center;
  gap: var(--space-4);
  margin-block-start: var(--space-8);
  color: var(--color-text-primary);
  font-weight: var(--font-weight-semibold);
  text-decoration-color: var(--color-accent);
  text-underline-offset: 0.35em;
}

.selected-project__cta:hover {
  color: var(--color-accent-interactive);
}

.selected-project__cta svg {
  width: 1.25rem;
  fill: none;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 1.7;
  transition: transform var(--motion-duration-fast) var(--motion-ease-standard);
}

.selected-project__cta:hover svg {
  transform: translateX(0.2rem);
}

@media (width < 64rem) {
  .selected-projects__header {
    grid-template-columns: minmax(0, 1fr) minmax(18rem, 1.2fr);
  }

  .selected-projects__label {
    grid-column: 1 / -1;
  }

  .selected-project {
    grid-template-columns: minmax(0, 1fr);
  }

  .selected-project__content {
    max-inline-size: 44rem;
  }
}

@media (width < 42rem) {
  .selected-projects__header {
    grid-template-columns: minmax(0, 1fr);
    gap: var(--space-5);
  }

  .selected-project {
    margin-block-start: var(--space-12);
  }

  .project-preview__frame {
    padding: var(--space-3);
  }

  .project-preview__note {
    line-height: 1.5;
  }
}

@media (prefers-reduced-motion: reduce) {
  .project-preview__interface,
  .selected-project__cta svg {
    transition: none;
  }

  .project-preview__frame:hover .project-preview__interface,
  .selected-project__cta:hover svg {
    transform: none;
  }
}
</style>
