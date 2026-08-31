<script setup lang="ts">
import { localizedRoutes } from '~/data/localized-routes'

const { locale, t } = useI18n()

const projectsRoute = computed(() =>
  locale.value === 'en'
    ? `${localizedRoutes.home.paths.en}#projects`
    : `${localizedRoutes.home.paths['pt-BR']}#projects`,
)

const processSteps = [
  'product',
  'flows',
  'architecture',
  'interface',
  'prototype',
] as const

const decisions = ['schedule', 'recurrence', 'status', 'registration'] as const
</script>

<template>
  <article class="case-study" data-project-id="movune">
    <header id="top" class="case-hero layout-container">
      <NuxtLink class="case-hero__back" :to="projectsRoute">
        <svg viewBox="0 0 20 20" aria-hidden="true">
          <path d="M16 10H5m4-4-4 4 4 4" />
        </svg>
        {{ t('pages.movune.back') }}
      </NuxtLink>
      <div class="case-hero__identity" aria-hidden="true">
        <span class="case-hero__mark">m</span><span>movune</span>
      </div>
      <h1>{{ t('pages.movune.headline') }}</h1>
      <p class="case-hero__lead">{{ t('pages.movune.lead') }}</p>
      <div class="case-hero__role">
        <p>{{ t('pages.movune.roleLabel') }}</p>
        <p data-case-role>{{ t('pages.movune.role') }}</p>
      </div>
    </header>

    <div class="case-content layout-container">
      <section
        class="case-section case-overview"
        aria-labelledby="overview-heading"
      >
        <h2 id="overview-heading">{{ t('pages.movune.overview.title') }}</h2>
        <div class="case-section__body case-overview__body">
          <p>{{ t('pages.movune.overview.context') }}</p>
          <p class="case-overview__challenge">
            {{ t('pages.movune.overview.challenge') }}
          </p>
        </div>
      </section>

      <section class="case-section" aria-labelledby="process-heading">
        <h2 id="process-heading">{{ t('pages.movune.process.title') }}</h2>
        <div class="case-section__body">
          <p class="case-section__introduction">
            {{ t('pages.movune.process.introduction') }}
          </p>
          <ol class="process-list">
            <li v-for="step in processSteps" :key="step">
              <span class="process-list__marker" aria-hidden="true" />
              <div>
                <h3>{{ t(`pages.movune.process.${step}`) }}</h3>
                <p>{{ t(`pages.movune.process.${step}Description`) }}</p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      <section class="case-section" aria-labelledby="interface-heading">
        <h2 id="interface-heading">{{ t('pages.movune.interface.title') }}</h2>
        <div class="case-section__body">
          <p class="case-section__introduction">
            {{ t('pages.movune.interface.description') }}
          </p>
          <div class="interface-gallery">
            <figure class="interface-figure">
              <div
                class="demo-interface"
                data-demo-interface
                aria-hidden="true"
              >
                <div class="demo-interface__rail">
                  <span class="demo-interface__brand">m</span>
                  <span v-for="item in 5" :key="item" />
                </div>
                <div class="demo-interface__workspace">
                  <div class="demo-interface__topbar">
                    <span>movune</span><i />
                  </div>
                  <div class="demo-schedule">
                    <div class="demo-interface__heading"><span /><i /></div>
                    <div class="demo-schedule__days">
                      <span v-for="day in 5" :key="day" />
                    </div>
                    <div class="demo-schedule__grid">
                      <span
                        v-for="slot in 15"
                        :key="slot"
                        :class="`slot-${slot}`"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <figcaption>
                <strong>{{ t('pages.movune.interface.scheduleTitle') }}</strong>
                <span>{{
                  t('pages.movune.interface.scheduleDescription')
                }}</span>
                <small data-representation-note>{{
                  t('pages.movune.interface.representation')
                }}</small>
              </figcaption>
            </figure>

            <figure class="interface-figure">
              <div
                class="demo-interface"
                data-demo-interface
                aria-hidden="true"
              >
                <div class="demo-interface__rail">
                  <span class="demo-interface__brand">m</span>
                  <span v-for="item in 5" :key="item" />
                </div>
                <div class="demo-interface__workspace">
                  <div class="demo-interface__topbar">
                    <span>movune</span><i />
                  </div>
                  <div class="demo-patient">
                    <div class="demo-interface__heading"><span /><i /></div>
                    <div class="demo-patient__fields">
                      <span v-for="field in 4" :key="field" />
                    </div>
                    <div class="demo-patient__actions"><span /><span /></div>
                  </div>
                </div>
              </div>
              <figcaption>
                <strong>{{ t('pages.movune.interface.patientTitle') }}</strong>
                <span>{{
                  t('pages.movune.interface.patientDescription')
                }}</span>
                <small data-representation-note>{{
                  t('pages.movune.interface.representation')
                }}</small>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section class="case-section" aria-labelledby="decisions-heading">
        <h2 id="decisions-heading">{{ t('pages.movune.decisions.title') }}</h2>
        <div class="case-section__body">
          <p class="case-section__introduction">
            {{ t('pages.movune.decisions.introduction') }}
          </p>
          <ul class="decision-list">
            <li v-for="decision in decisions" :key="decision">
              <h3>{{ t(`pages.movune.decisions.${decision}`) }}</h3>
              <p>{{ t(`pages.movune.decisions.${decision}Description`) }}</p>
            </li>
          </ul>
        </div>
      </section>

      <section class="case-section" aria-labelledby="status-heading">
        <h2 id="status-heading">{{ t('pages.movune.status.title') }}</h2>
        <div class="case-section__body">
          <p class="case-status__label">{{ t('pages.movune.status.label') }}</p>
          <p class="case-status__description">
            {{ t('pages.movune.status.description') }}
          </p>
        </div>
      </section>

      <section class="case-section" aria-labelledby="next-heading">
        <h2 id="next-heading">{{ t('pages.movune.next.title') }}</h2>
        <div class="case-section__body">
          <p class="case-next__description">
            {{ t('pages.movune.next.description') }}
          </p>
          <div class="case-next__learnings">
            <h3>{{ t('pages.movune.next.learningsTitle') }}</h3>
            <p>{{ t('pages.movune.next.learnings') }}</p>
          </div>
          <NuxtLink class="case-next__back" :to="projectsRoute">
            {{ t('pages.movune.back') }}
            <svg viewBox="0 0 20 20" aria-hidden="true">
              <path d="M4 10h11m-4-4 4 4-4 4" />
            </svg>
          </NuxtLink>
        </div>
      </section>
    </div>
  </article>
</template>

<style scoped>
.case-study {
  --movune-green: #3f9f73;
  --movune-green-bright: #78d3a5;
  --movune-ink: #0c1713;
}
.case-hero {
  padding-block: var(--space-8) clamp(var(--space-20), 10vw, 8rem);
}
.case-hero__back,
.case-next__back {
  display: inline-flex;
  min-block-size: 2.75rem;
  align-items: center;
  gap: var(--space-3);
  color: var(--color-text-secondary);
  font-weight: var(--font-weight-semibold);
  text-decoration-color: var(--color-border);
  text-underline-offset: 0.35em;
}
.case-hero__back:hover,
.case-next__back:hover {
  color: var(--color-accent-interactive);
}
.case-hero__back svg,
.case-next__back svg {
  width: 1.25rem;
  fill: none;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 1.7;
}
.case-hero__identity {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-block-start: clamp(var(--space-16), 9vw, var(--space-24));
  color: var(--color-text-secondary);
  font-weight: var(--font-weight-semibold);
}
.case-hero__mark {
  display: grid;
  width: 2.25rem;
  aspect-ratio: 1;
  place-items: center;
  color: var(--movune-ink);
  background: var(--movune-green-bright);
  border-radius: 28% 28% 50%;
}
.case-hero h1 {
  max-inline-size: 62rem;
  margin-block-start: var(--space-8);
  font-size: clamp(3rem, 7.5vw, 6rem);
  font-weight: var(--font-weight-semibold);
  line-height: 0.98;
  letter-spacing: -0.04em;
  text-wrap: balance;
}
.case-hero__lead {
  max-inline-size: 50rem;
  margin-block-start: clamp(var(--space-8), 5vw, var(--space-12));
  color: var(--color-text-secondary);
  font-size: clamp(var(--font-size-lg), 2vw, var(--font-size-2xl));
  line-height: 1.55;
}
.case-hero__role {
  display: grid;
  grid-template-columns: minmax(9rem, 0.35fr) minmax(0, 1fr);
  gap: var(--space-8);
  max-inline-size: 50rem;
  padding-block-start: var(--space-8);
  margin-block-start: var(--space-10);
  border-block-start: 1px solid var(--color-border);
}
.case-hero__role p:first-child {
  color: var(--color-text-muted);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.case-hero__role p:last-child {
  color: var(--color-text-secondary);
}
.case-content {
  border-block-start: 1px solid var(--color-border);
}
.case-section {
  display: grid;
  grid-template-columns: minmax(10rem, 0.38fr) minmax(0, 1fr);
  gap: clamp(var(--space-8), 7vw, var(--space-20));
  padding-block: clamp(var(--space-16), 9vw, var(--space-24));
  border-block-end: 1px solid var(--color-border);
}
.case-section > h2 {
  font-size: var(--font-size-2xl);
  line-height: var(--line-height-heading);
  letter-spacing: -0.025em;
}
.case-section__body {
  min-inline-size: 0;
}
.case-section__introduction,
.case-overview__body > p,
.case-status__description,
.case-next__description {
  max-inline-size: 46rem;
  color: var(--color-text-secondary);
  font-size: var(--font-size-lg);
  line-height: 1.7;
}
.case-overview__challenge {
  padding-block-start: var(--space-8);
  margin-block-start: var(--space-8);
  color: var(--color-text-primary) !important;
  font-size: var(--font-size-2xl) !important;
  line-height: 1.4 !important;
  border-block-start: 1px solid var(--color-border);
}
.process-list {
  margin-block-start: var(--space-12);
  list-style: none;
}
.process-list li {
  position: relative;
  display: grid;
  grid-template-columns: 1rem minmax(0, 1fr);
  gap: var(--space-5);
  padding-block-end: var(--space-8);
}
.process-list li:not(:last-child)::before {
  position: absolute;
  inset-block: 0;
  inset-inline-start: 0.31rem;
  width: 1px;
  content: '';
  background: var(--color-border);
}
.process-list__marker {
  z-index: 1;
  width: 0.7rem;
  aspect-ratio: 1;
  margin-block-start: 0.35rem;
  background: var(--color-canvas);
  border: 2px solid var(--movune-green-bright);
  border-radius: 50%;
}
.process-list h3,
.decision-list h3,
.case-next__learnings h3 {
  font-size: var(--font-size-lg);
}
.process-list p,
.decision-list p,
.case-next__learnings p {
  max-inline-size: 40rem;
  margin-block-start: var(--space-2);
  color: var(--color-text-secondary);
}
.interface-gallery {
  display: grid;
  gap: var(--space-12);
  margin-block-start: var(--space-12);
}
.interface-figure {
  min-inline-size: 0;
}
.demo-interface {
  display: grid;
  grid-template-columns: clamp(2.5rem, 7vw, 4.5rem) minmax(0, 1fr);
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: #f2f6f4;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-elevated);
}
.demo-interface__rail {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(0.45rem, 1.3vw, 0.9rem);
  padding-block: clamp(0.75rem, 2vw, 1.25rem);
  background: #123c30;
}
.demo-interface__rail > span:not(.demo-interface__brand) {
  width: 38%;
  aspect-ratio: 1;
  border: 1px solid rgb(226 255 241 / 38%);
  border-radius: var(--radius-sm);
}
.demo-interface__brand {
  display: grid;
  width: 52%;
  aspect-ratio: 1;
  place-items: center;
  margin-block-end: clamp(0.25rem, 1vw, 0.75rem);
  color: #123c30;
  font-weight: var(--font-weight-bold);
  background: #79d6a8;
  border-radius: 28% 28% 50%;
}
.demo-interface__workspace {
  min-inline-size: 0;
}
.demo-interface__topbar {
  display: flex;
  min-block-size: 14%;
  align-items: center;
  justify-content: space-between;
  padding-inline: 5%;
  color: #15382e;
  font-size: clamp(0.5rem, 1.3vw, 0.85rem);
  font-weight: var(--font-weight-semibold);
  border-block-end: 1px solid #dce5e1;
}
.demo-interface__topbar i {
  width: clamp(1rem, 3vw, 1.8rem);
  aspect-ratio: 1;
  background: #d5e7df;
  border-radius: 50%;
}
.demo-schedule,
.demo-patient {
  padding: 5%;
}
.demo-interface__heading,
.demo-patient__actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.demo-interface__heading span {
  width: 27%;
  height: clamp(0.4rem, 1vw, 0.7rem);
  background: #cdded7;
  border-radius: var(--radius-pill);
}
.demo-interface__heading i {
  width: 18%;
  height: clamp(0.7rem, 1.8vw, 1.2rem);
  background: #2e8e67;
  border-radius: var(--radius-pill);
}
.demo-schedule__days,
.demo-schedule__grid {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: clamp(0.2rem, 0.8vw, 0.6rem);
}
.demo-schedule__days {
  margin-block-start: 5%;
}
.demo-schedule__days span {
  height: clamp(0.3rem, 0.7vw, 0.5rem);
  background: #d8e5df;
  border-radius: var(--radius-pill);
}
.demo-schedule__grid {
  margin-block-start: 3%;
}
.demo-schedule__grid span {
  aspect-ratio: 1.7 / 1;
  background: #fff;
  border: 1px solid #dbe7e2;
  border-radius: var(--radius-sm);
}
.demo-schedule__grid .slot-3,
.demo-schedule__grid .slot-8 {
  background: #dff2e8;
  border-style: dashed;
  border-color: #398864;
}
.demo-schedule__grid .slot-12 {
  background: #fff4dc;
  border-color: #a86818;
}
.demo-patient {
  width: 72%;
  margin: 7% auto;
  background: #fff;
  border-radius: var(--radius-md);
  box-shadow: 0 1rem 3rem rgb(22 56 45 / 16%);
}
.demo-patient__fields {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: clamp(0.4rem, 1.4vw, 0.9rem);
  margin-block-start: 8%;
}
.demo-patient__fields span {
  height: clamp(1rem, 3.4vw, 2.4rem);
  border: 1px solid #cbdad4;
  border-radius: var(--radius-sm);
}
.demo-patient__actions {
  justify-content: flex-end;
  gap: 4%;
  margin-block-start: 8%;
}
.demo-patient__actions span {
  width: 22%;
  height: clamp(0.65rem, 2.2vw, 1.5rem);
  background: #e3ebe7;
  border-radius: var(--radius-pill);
}
.demo-patient__actions span:last-child {
  background: #2e8e67;
}
.interface-figure figcaption {
  display: grid;
  grid-template-columns: minmax(12rem, 0.65fr) minmax(0, 1fr);
  gap: var(--space-4) var(--space-8);
  padding-block-start: var(--space-5);
}
.interface-figure figcaption span {
  color: var(--color-text-secondary);
}
.interface-figure figcaption small {
  grid-column: 1 / -1;
  color: var(--color-text-muted);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  letter-spacing: 0.055em;
  text-transform: uppercase;
}
.decision-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  margin-block-start: var(--space-12);
  list-style: none;
  border-block-start: 1px solid var(--color-border);
}
.decision-list li {
  padding: var(--space-8) var(--space-8) var(--space-8) 0;
  border-block-end: 1px solid var(--color-border);
}
.decision-list li:nth-child(even) {
  padding-inline: var(--space-8) 0;
  border-inline-start: 1px solid var(--color-border);
}
.case-status__label {
  display: inline-flex;
  align-items: center;
  gap: var(--space-3);
  color: var(--color-text-primary);
  font-weight: var(--font-weight-semibold);
}
.case-status__label::before {
  width: 0.55rem;
  aspect-ratio: 1;
  content: '';
  background: var(--movune-green-bright);
  border-radius: 50%;
}
.case-status__description {
  margin-block-start: var(--space-8);
}
.case-next__description {
  color: var(--color-text-primary);
  font-size: var(--font-size-2xl);
  line-height: 1.45;
}
.case-next__learnings {
  max-inline-size: 46rem;
  padding-block-start: var(--space-8);
  margin-block-start: var(--space-10);
  border-block-start: 1px solid var(--color-border);
}
.case-next__back {
  margin-block-start: var(--space-12);
}
@media (width < 52rem) {
  .case-section {
    grid-template-columns: minmax(0, 1fr);
    gap: var(--space-8);
  }
  .case-hero__role {
    grid-template-columns: minmax(0, 1fr);
    gap: var(--space-3);
  }
}
@media (width < 40rem) {
  .case-hero h1 {
    overflow-wrap: break-word;
    font-size: clamp(2.5rem, 12vw, 4.25rem);
  }
  .decision-list,
  .interface-figure figcaption {
    grid-template-columns: minmax(0, 1fr);
  }
  .decision-list li,
  .decision-list li:nth-child(even) {
    padding-inline: 0;
    border-inline-start: 0;
  }
  .demo-patient {
    width: 84%;
  }
  .interface-figure figcaption small {
    grid-column: auto;
  }
}
</style>
