<script setup lang="ts">
import ProjectDetailShell from '~/components/projects/ProjectDetailShell.vue'
import ProjectSection from '~/components/projects/ProjectSection.vue'
import ProjectFlow from '~/components/projects/ProjectFlow.vue'
import Compare from '~/components/ui/inspira/Compare.vue'
import CaseBackLink from '~/components/projects/CaseBackLink.vue'
import ZoomableImage from '~/components/projects/ZoomableImage.vue'

const { t } = useI18n()

const processSteps = [
  'product',
  'flows',
  'architecture',
  'interface',
  'prototype',
] as const

const decisions = ['schedule', 'recurrence', 'status', 'registration'] as const

const nextSteps = computed(() => [
  { label: t('pages.movune.next.refine') },
  { label: t('pages.movune.next.architecture') },
  { label: t('pages.movune.next.implement') },
])
</script>

<template>
  <ProjectDetailShell
    :back-label="t('pages.movune.back')"
    project-slug="movune"
    data-project-id="movune"
  >
    <template #hero>
      <p class="case-hero__eyebrow">{{ t('pages.movune.eyebrow') }}</p>
      <p class="case-hero__meta">
        <span>{{ t('pages.movune.category') }}</span>
        <span class="case-status" data-status="prototyping">{{
          t('pages.movune.statusLabel')
        }}</span>
      </p>
      <h1>{{ t('pages.movune.headline') }}</h1>
      <p class="case-hero__lead">{{ t('pages.movune.lead') }}</p>
      <div class="case-hero__role">
        <p>{{ t('pages.movune.roleLabel') }}</p>
        <p data-case-role>{{ t('pages.movune.role') }}</p>
      </div>
    </template>

    <ProjectSection
      index="01"
      :title="t('pages.movune.overview.title')"
      heading-id="overview-heading"
    >
      <p class="case-copy">{{ t('pages.movune.overview.context') }}</p>
      <p class="case-kicker">{{ t('pages.movune.overview.challenge') }}</p>
    </ProjectSection>

    <ProjectSection
      index="02"
      :title="t('pages.movune.process.title')"
      heading-id="process-heading"
    >
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
    </ProjectSection>

    <ProjectSection
      index="03"
      :title="t('pages.movune.interface.title')"
      heading-id="interface-heading"
    >
      <p class="case-section__introduction">
        {{ t('pages.movune.interface.description') }}
      </p>
      <div class="interface-composition case-visual--wide">
        <ZoomableImage
          figure-class="case-figure interface-composition__desktop"
          src="/images/projects/movune/schedule-light.png"
          :alt="t('pages.movune.interface.scheduleAlt')"
          :width="2397"
          :height="1352"
        />
        <ZoomableImage
          figure-class="case-figure interface-composition__mobile"
          src="/images/projects/movune/register-mobile-light.png"
          :alt="t('pages.movune.interface.mobileAlt')"
          :width="430"
          :height="932"
        />
      </div>

      <div class="interface-compare case-visual--wide">
        <h3>{{ t('pages.movune.interface.compareTitle') }}</h3>
        <p class="case-copy">
          {{ t('pages.movune.interface.compareDescription') }}
        </p>
        <Compare
          first-image="/images/projects/movune/patients-light.png"
          second-image="/images/projects/movune/patients-dark.png"
          :first-image-alt="t('pages.movune.interface.compareLightAlt')"
          :second-image-alt="t('pages.movune.interface.compareDarkAlt')"
          :first-label="t('pages.movune.interface.lightLabel')"
          :second-label="t('pages.movune.interface.darkLabel')"
          :accessible-name="t('pages.movune.interface.compareControl')"
          :initial-slider-percentage="50"
          :show-handlebar="true"
        />
      </div>
    </ProjectSection>

    <ProjectSection
      index="04"
      :title="t('pages.movune.decisions.title')"
      heading-id="decisions-heading"
    >
      <p class="case-section__introduction">
        {{ t('pages.movune.decisions.introduction') }}
      </p>
      <ul class="decision-list">
        <li v-for="decision in decisions" :key="decision">
          <h3>{{ t(`pages.movune.decisions.${decision}`) }}</h3>
          <p>{{ t(`pages.movune.decisions.${decision}Description`) }}</p>
        </li>
      </ul>
    </ProjectSection>

    <ProjectSection
      index="05"
      :title="t('pages.movune.status.title')"
      heading-id="status-heading"
    >
      <p class="case-status" data-status="prototyping">
        {{ t('pages.movune.statusLabel') }}
      </p>
      <h3 class="status-headline">{{ t('pages.movune.status.headline') }}</h3>
      <p class="case-copy">{{ t('pages.movune.status.description') }}</p>
    </ProjectSection>

    <ProjectSection
      index="06"
      :title="t('pages.movune.next.title')"
      heading-id="next-heading"
    >
      <h3 class="status-headline">{{ t('pages.movune.next.headline') }}</h3>
      <p class="case-copy">{{ t('pages.movune.next.description') }}</p>
      <div class="next-steps-flow">
        <ProjectFlow :items="nextSteps" />
      </div>
      <CaseBackLink
        :label="t('pages.movune.back')"
        project-slug="movune"
        placement="footer"
      />
    </ProjectSection>
  </ProjectDetailShell>
</template>

<style scoped>
.case-hero h1 {
  font-size: clamp(3rem, 7.5vw, 6rem);
  line-height: 0.98;
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

.next-steps-flow {
  display: grid;
  justify-items: center;
}

.next-steps-flow :deep(.project-flow) {
  justify-items: center;
  width: fit-content;
  max-inline-size: 100%;
  margin-inline: auto;
  padding: 0;
  text-align: center;
}

.next-steps-flow :deep(.project-flow__item) {
  display: grid;
  justify-items: center;
  width: 100%;
}

.next-steps-flow :deep(.project-flow__label),
.next-steps-flow :deep(.project-flow__arrow) {
  text-align: center;
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
  border: 2px solid var(--color-accent);
  border-radius: 50%;
}

.process-list h3,
.decision-list h3,
.status-headline,
.interface-compare h3 {
  font-size: var(--font-size-lg);
}

.process-list p,
.decision-list p {
  max-inline-size: 40rem;
  margin-block-start: var(--space-2);
  color: var(--color-text-secondary);
}

.interface-composition {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(11rem, 14rem);
  align-items: end;
  gap: var(--space-6);
  margin-block-start: var(--space-8);
}

.interface-composition__desktop,
.interface-composition__mobile {
  margin: 0;
}

.interface-composition__mobile img {
  width: 100%;
}

.interface-compare {
  margin-block-start: var(--space-10);
}

.interface-compare h3 {
  margin-block-end: var(--space-4);
}

.interface-compare :deep(.theme-compare) {
  margin-block-start: var(--space-6);
}

.status-headline {
  margin-block: var(--space-6) var(--space-4);
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

@media (width < 52rem) {
  .case-hero__role {
    grid-template-columns: minmax(0, 1fr);
    gap: var(--space-3);
  }

  .interface-composition {
    grid-template-columns: minmax(0, 1fr);
    justify-items: center;
  }

  .interface-composition__mobile {
    width: min(16rem, 70%);
  }
}

@media (width < 40rem) {
  .case-hero h1 {
    overflow-wrap: break-word;
    font-size: clamp(2.5rem, 12vw, 4.25rem);
  }

  .decision-list {
    grid-template-columns: minmax(0, 1fr);
  }

  .decision-list li,
  .decision-list li:nth-child(even) {
    padding-inline: 0;
    border-inline-start: 0;
  }
}
</style>
