<script setup lang="ts">
import ProjectDetailShell from '~/components/projects/ProjectDetailShell.vue'
import ProjectSection from '~/components/projects/ProjectSection.vue'
import CaseBackLink from '~/components/projects/CaseBackLink.vue'

const { t } = useI18n()

const heroFlow = computed(() => [
  t('pages.overtime.flow.opportunity'),
  t('pages.overtime.flow.interpret'),
  t('pages.overtime.flow.evaluate'),
  t('pages.overtime.flow.respond'),
  t('pages.overtime.flow.record'),
  t('pages.overtime.flow.notify'),
])

const interpretDetails = computed(() => [
  t('pages.overtime.flow.date'),
  t('pages.overtime.flow.period'),
  t('pages.overtime.flow.role'),
  t('pages.overtime.flow.group'),
])

const evaluateDetails = computed(() => [
  t('pages.overtime.decision.scheduleCheck'),
  t('pages.overtime.problem.availability'),
  t('pages.overtime.decision.conflicts'),
  t('pages.overtime.decision.limit'),
])

const rules = [
  ['outside', 'outcomeOutside'],
  ['unavailability', 'outcomeUnavailability'],
  ['roles', 'outcomeRoles'],
  ['previous', 'outcomePrevious'],
  ['limits', 'outcomeLimits'],
  ['state', 'outcomeState'],
  ['notify', 'outcomeNotify'],
  ['ambiguity', 'outcomeAmbiguity'],
] as const

const definedItems = ['problem', 'proposal', 'rules', 'flow', 'limits'] as const

const openItems = [
  'requirements',
  'integrations',
  'security',
  'architecture',
  'stack',
] as const

const asFlowUnits = (value: string) => value.split(' → ')
</script>

<template>
  <ProjectDetailShell
    :back-label="t('pages.overtime.back')"
    project-slug="overtime-automation"
    data-project-id="overtime-automation"
  >
    <template #hero>
      <p class="case-hero__eyebrow">{{ t('pages.overtime.eyebrow') }}</p>
      <p class="case-hero__meta">
        <span>{{ t('pages.overtime.categories') }}</span>
        <span class="case-status" data-status="concept">{{
          t('selectedProjects.status.concept')
        }}</span>
      </p>
      <h1>{{ t('pages.overtime.headline') }}</h1>
      <p class="case-hero__lead">{{ t('pages.overtime.lead') }}</p>
      <p class="case-copy case-hero__note">{{ t('pages.overtime.note') }}</p>
      <ol class="hero-flow">
        <li v-for="step in heroFlow" :key="step">{{ step }}</li>
      </ol>
    </template>

    <ProjectSection
      index="01"
      :title="t('pages.overtime.problem.section')"
      heading-id="problem-heading"
    >
      <h3>{{ t('pages.overtime.problem.title') }}</h3>
      <p class="case-copy">{{ t('pages.overtime.problem.p1') }}</p>
      <p class="case-copy">{{ t('pages.overtime.problem.p2') }}</p>
      <p class="case-copy">{{ t('pages.overtime.problem.p3') }}</p>
      <p class="case-copy">{{ t('pages.overtime.problem.scenario') }}</p>
      <blockquote class="case-visual message">
        <p>{{ t('pages.overtime.problem.example') }}</p>
      </blockquote>
      <p class="decision-question">
        {{ t('pages.overtime.problem.canAccept') }}
      </p>
      <ul class="context-row editorial-distribution--3">
        <li class="editorial-distribution__start">
          {{ t('pages.overtime.problem.schedule') }}
        </li>
        <li class="editorial-distribution__center">
          {{ t('pages.overtime.problem.availability') }}
        </li>
        <li class="editorial-distribution__end">
          {{ t('pages.overtime.problem.limits') }}
        </li>
      </ul>
      <p class="case-kicker">{{ t('pages.overtime.problem.close') }}</p>
    </ProjectSection>

    <ProjectSection
      index="02"
      :title="t('pages.overtime.decision.section')"
      heading-id="decision-heading"
    >
      <h3>{{ t('pages.overtime.decision.title') }}</h3>
      <p class="case-copy">{{ t('pages.overtime.decision.p1') }}</p>
      <p class="case-copy">{{ t('pages.overtime.decision.p2') }}</p>
      <div class="case-visual decision">
        <ol class="decision__trunk">
          <li>{{ t('pages.overtime.problem.message') }}</li>
          <li>
            {{ t('pages.overtime.flow.interpret') }}
            <span>{{ interpretDetails.join(' · ') }}</span>
          </li>
          <li>
            {{ t('pages.overtime.flow.evaluate') }}
            <span>{{ evaluateDetails.join(' · ') }}</span>
          </li>
          <li class="decision__eligible">
            {{ t('pages.overtime.decision.eligible') }}
          </li>
        </ol>
        <div class="decision__fork">
          <span class="decision__stem" aria-hidden="true" />
          <span class="decision__bar" aria-hidden="true" />
          <div class="decision__arm">
            <span class="decision__drop" aria-hidden="true" />
            <p>
              <strong>{{ t('pages.overtime.decision.no') }}</strong>
            </p>
          </div>
          <div class="decision__arm">
            <span class="decision__drop" aria-hidden="true" />
            <p>
              <strong>{{ t('pages.overtime.decision.yes') }}</strong>
            </p>
            <ol class="decision__sequence" aria-hidden="true">
              <li>{{ t('pages.overtime.flow.respond') }}</li>
              <li>{{ t('pages.overtime.flow.record') }}</li>
              <li>{{ t('pages.overtime.flow.notify') }}</li>
            </ol>
          </div>
        </div>
      </div>
      <p class="case-copy">{{ t('pages.overtime.decision.interpret') }}</p>
      <p class="case-copy">{{ t('pages.overtime.decision.role') }}</p>
      <p class="case-copy">{{ t('pages.overtime.decision.group') }}</p>
      <p class="case-copy">{{ t('pages.overtime.decision.schedule') }}</p>
      <p class="case-copy">
        {{ t('pages.overtime.decision.unavailabilityText') }}
      </p>
      <p class="case-copy">{{ t('pages.overtime.decision.conflictsText') }}</p>
      <p class="case-copy">{{ t('pages.overtime.decision.limitText') }}</p>
      <p class="case-copy">{{ t('pages.overtime.decision.respond') }}</p>
      <p class="case-copy">{{ t('pages.overtime.decision.record') }}</p>
      <p class="case-copy">{{ t('pages.overtime.decision.evidence') }}</p>
      <p class="case-copy">{{ t('pages.overtime.decision.notify') }}</p>
      <p class="case-kicker flow-line">
        <span
          v-for="unit in asFlowUnits(t('pages.overtime.decision.rule'))"
          :key="unit"
          class="flow-line__unit"
        >
          {{ unit }}
        </span>
      </p>
    </ProjectSection>

    <ProjectSection
      index="03"
      :title="t('pages.overtime.rules.section')"
      heading-id="rules-heading"
    >
      <h3>{{ t('pages.overtime.rules.title') }}</h3>
      <ol class="engine-list case-visual--wide">
        <li v-for="([rule, outcome], index) in rules" :key="rule">
          <span>{{ String(index + 1).padStart(2, '0') }}</span>
          <p>{{ t(`pages.overtime.rules.${rule}`) }}</p>
          <strong>{{ t(`pages.overtime.rules.${outcome}`) }}</strong>
        </li>
      </ol>
      <p class="case-kicker">{{ t('pages.overtime.rules.close1') }}</p>
      <p class="case-kicker">{{ t('pages.overtime.rules.close2') }}</p>
      <p class="case-kicker">{{ t('pages.overtime.rules.close3') }}</p>
    </ProjectSection>

    <ProjectSection
      index="04"
      :title="t('pages.overtime.limits.section')"
      heading-id="limits-heading"
    >
      <h3>{{ t('pages.overtime.limits.title') }}</h3>
      <p class="case-copy">{{ t('pages.overtime.limits.p1') }}</p>
      <p class="case-copy">{{ t('pages.overtime.limits.p2') }}</p>
      <div class="limits-composition">
        <div class="limit-columns editorial-distribution--2">
          <div
            class="limit-columns__col editorial-distribution__start"
          >
            <section>
              <h4>{{ t('pages.overtime.limits.rulesLabel') }}</h4>
              <ul>
                <li>{{ t('pages.overtime.limits.groupEligibility') }}</li>
                <li>{{ t('pages.overtime.limits.periods') }}</li>
              </ul>
            </section>
            <section>
              <h4>{{ t('pages.overtime.limits.reliabilityLabel') }}</h4>
              <ul>
                <li>{{ t('pages.overtime.limits.credentials') }}</li>
                <li>{{ t('pages.overtime.limits.privacy') }}</li>
                <li>{{ t('pages.overtime.limits.persistence') }}</li>
                <li>{{ t('pages.overtime.limits.failures') }}</li>
                <li>{{ t('pages.overtime.limits.concurrency') }}</li>
                <li>{{ t('pages.overtime.limits.stale') }}</li>
              </ul>
            </section>
          </div>
          <div class="limit-columns__col editorial-distribution__end">
            <section>
              <h4>{{ t('pages.overtime.limits.integrationsLabel') }}</h4>
              <ul>
                <li>{{ t('pages.overtime.limits.whatsapp') }}</li>
                <li>{{ t('pages.overtime.limits.scheduleSource') }}</li>
                <li>{{ t('pages.overtime.limits.sync') }}</li>
              </ul>
            </section>
            <section>
              <h4>{{ t('pages.overtime.limits.implementationLabel') }}</h4>
              <ul>
                <li>{{ t('pages.overtime.limits.architecture') }}</li>
                <li>{{ t('pages.overtime.limits.stack') }}</li>
              </ul>
            </section>
          </div>
        </div>
        <section class="limit-out editorial-distribution__summary">
          <h4>{{ t('pages.overtime.limits.outOfScopeLabel') }}</h4>
          <ul>
            <li>{{ t('pages.overtime.limits.hr') }}</li>
            <li>{{ t('pages.overtime.limits.timeclock') }}</li>
            <li>{{ t('pages.overtime.limits.payroll') }}</li>
            <li>{{ t('pages.overtime.limits.scheduler') }}</li>
            <li>{{ t('pages.overtime.limits.generic') }}</li>
          </ul>
        </section>
      </div>
      <p class="case-kicker flow-line">
        <span
          v-for="unit in asFlowUnits(t('pages.overtime.limits.focus'))"
          :key="unit"
          class="flow-line__unit"
        >
          {{ unit }}
        </span>
      </p>
    </ProjectSection>

    <ProjectSection
      index="05"
      :title="t('pages.overtime.status.section')"
      heading-id="status-heading"
    >
      <h3>{{ t('pages.overtime.status.title') }}</h3>
      <p class="case-copy">{{ t('pages.overtime.status.p1') }}</p>
      <p class="case-copy">{{ t('pages.overtime.status.p2') }}</p>
      <div class="status-close editorial-distribution--2">
        <section class="editorial-distribution__start">
          <h3>{{ t('pages.overtime.status.definedLabel') }}</h3>
          <ul class="plain-list">
            <li v-for="item in definedItems" :key="item">
              {{ t(`pages.overtime.status.${item}`) }}
            </li>
          </ul>
        </section>
        <section class="editorial-distribution__end">
          <h3>{{ t('pages.overtime.status.openLabel') }}</h3>
          <ul class="plain-list">
            <li v-for="item in openItems" :key="item">
              {{ t(`pages.overtime.status.${item}`) }}
            </li>
          </ul>
        </section>
      </div>
      <h3>{{ t('pages.overtime.status.nextLabel') }}</h3>
      <p class="case-copy">{{ t('pages.overtime.status.next') }}</p>
      <p class="case-kicker">{{ t('pages.overtime.problem.close') }}</p>
      <CaseBackLink
        :label="t('pages.overtime.back')"
        project-slug="overtime-automation"
        placement="footer"
      />
    </ProjectSection>
  </ProjectDetailShell>
</template>

<style scoped>
.case-hero__note {
  margin-block-start: var(--space-8);
}

.status-close h3 {
  margin-block: 0 var(--space-4);
  font-size: var(--font-size-sm);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.limits-composition h4 {
  margin-block: 0 var(--space-4);
  font-size: var(--font-size-sm);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.hero-flow,
.context-row,
.decision__trunk,
.decision__sequence,
.engine-list,
.limits-composition ul,
.plain-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.hero-flow {
  display: flex;
  flex-wrap: wrap;
  column-gap: var(--space-5);
  row-gap: var(--space-3);
  width: 100%;
  max-inline-size: none;
  margin-block-start: var(--space-8);
  color: var(--color-text-primary);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.hero-flow li {
  display: inline-flex;
  align-items: center;
  white-space: nowrap;
}

.hero-flow li:not(:last-child)::after {
  margin-inline-start: var(--space-5);
  color: var(--color-text-muted);
  content: '→';
}

.message {
  max-inline-size: 36rem;
  margin-inline: 0;
  padding: var(--space-6);
  color: var(--color-text-primary);
  font-size: var(--font-size-xl);
  line-height: 1.45;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
}

.message p {
  margin: 0;
}

.decision-question {
  margin-block-start: var(--space-8);
  color: var(--color-text-primary);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  text-align: start;
}

@media (width >= 40rem) {
  .decision-question {
    text-align: center;
  }
}

.context-row {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--space-4);
  margin-block-start: var(--space-6);
  color: var(--color-text-secondary);
}

.context-row .editorial-distribution__start,
.limit-columns .editorial-distribution__start,
.status-close .editorial-distribution__start {
  justify-self: start;
  justify-items: start;
  align-items: start;
  text-align: start;
}

.context-row .editorial-distribution__center {
  justify-self: center;
  text-align: center;
}

.context-row .editorial-distribution__end,
.limit-columns .editorial-distribution__end,
.status-close .editorial-distribution__end {
  justify-self: end;
  justify-items: end;
  align-items: end;
  text-align: end;
}

.limit-columns .editorial-distribution__end {
  align-items: end;
}

.decision__trunk li,
.engine-list li {
  padding-block: var(--space-4);
  border-block-end: 1px solid var(--color-border);
}

.decision__trunk li {
  color: var(--color-text-primary);
  font-weight: var(--font-weight-semibold);
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.decision__trunk span {
  display: block;
  margin-block-start: var(--space-2);
  color: var(--color-text-secondary);
  font-weight: var(--font-weight-regular);
  letter-spacing: 0;
  text-transform: none;
}

.decision__trunk li + li::before {
  display: block;
  margin-block-end: var(--space-3);
  color: var(--color-text-muted);
  font-weight: var(--font-weight-regular);
  content: '↓';
}

.decision {
  justify-self: center;
  width: fit-content;
  max-inline-size: min(100%, 42rem);
  margin-inline: auto;
  text-align: center;
}

.decision__eligible {
  text-align: center;
}

.decision__eligible::before {
  text-align: center;
}

.decision__fork {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  width: 100%;
  max-inline-size: 28rem;
  margin-inline: auto;
  column-gap: var(--space-6);
}

.decision__stem,
.decision__bar,
.decision__drop {
  background: var(--color-border);
}

.decision__stem {
  grid-column: 1 / -1;
  justify-self: center;
  width: 1px;
  height: var(--space-5);
}

.decision__bar {
  grid-column: 1 / -1;
  justify-self: stretch;
  width: 100%;
  height: 1px;
}

.decision__arm {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  text-align: center;
}

.decision__drop {
  width: 1px;
  height: var(--space-5);
}

.decision__arm p {
  margin: 0;
}

.decision__sequence {
  margin-block-start: var(--space-3);
  color: var(--color-text-secondary);
}

.decision__sequence li::before {
  display: block;
  margin-block: var(--space-2);
  color: var(--color-text-muted);
  content: '↓';
}

.case-kicker.flow-line {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2) var(--space-4);
  width: fit-content;
  max-inline-size: 100%;
}

.flow-line__unit {
  display: inline-flex;
  align-items: center;
  white-space: nowrap;
}

.flow-line__unit:not(:last-child)::after {
  margin-inline-start: var(--space-4);
  color: var(--color-text-muted);
  content: '→';
}

.engine-list li {
  display: grid;
  grid-template-columns: 2.5rem minmax(0, 1fr) minmax(7rem, auto);
  gap: var(--space-4);
  align-items: baseline;
}

.engine-list span {
  color: var(--color-accent);
  font-weight: var(--font-weight-semibold);
}

.engine-list strong {
  color: var(--color-text-primary);
  font-size: var(--font-size-xs);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-align: end;
}

.limits-composition {
  margin-block-start: var(--space-10);
}

.limits-composition ul {
  padding-inline-start: var(--space-3);
}

.limit-columns {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-8) var(--space-10);
  align-items: start;
}

.limit-columns__col {
  display: flex;
  flex-direction: column;
  gap: var(--space-8);
}

.limit-out {
  margin-block-start: var(--space-10);
  padding-block-start: var(--space-8);
  border-block-start: 1px solid var(--color-border);
}

.limits-composition li,
.plain-list li {
  color: var(--color-text-secondary);
}

.plain-list li + li,
.limits-composition li + li {
  margin-block-start: var(--space-3);
}

.status-close {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-10);
  margin-block-start: var(--space-8);
}

@media (width < 40rem) {
  .context-row,
  .decision__fork,
  .limit-columns,
  .status-close,
  .engine-list li {
    grid-template-columns: minmax(0, 1fr);
  }

  .decision__stem,
  .decision__bar,
  .decision__drop {
    display: none;
  }

  .context-row .editorial-distribution__start,
  .context-row .editorial-distribution__center,
  .context-row .editorial-distribution__end,
  .limit-columns .editorial-distribution__start,
  .limit-columns .editorial-distribution__end,
  .status-close .editorial-distribution__start,
  .status-close .editorial-distribution__end {
    justify-self: stretch;
    justify-items: start;
    align-items: start;
    text-align: start;
  }

  .decision__arm {
    align-items: center;
    max-inline-size: none;
    text-align: center;
  }

  .decision__arm + .decision__arm {
    margin-block-start: var(--space-6);
  }

  .engine-list strong {
    text-align: start;
  }
}
</style>
