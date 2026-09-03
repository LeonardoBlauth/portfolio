<script setup lang="ts">
import ProjectDetailShell from '~/components/projects/ProjectDetailShell.vue'
import ProjectSection from '~/components/projects/ProjectSection.vue'
import ProjectFlow from '~/components/projects/ProjectFlow.vue'
import CaseBackLink from '~/components/projects/CaseBackLink.vue'
import ZoomableImage from '~/components/projects/ZoomableImage.vue'

const { t } = useI18n()

const problemQuestions = [
  'exists',
  'version',
  'environment',
  'drift',
  'authority',
  'evidence',
] as const

const proposalInputs = [
  'desired',
  'observed',
  'authority',
  'compatibility',
  'evidence',
] as const

const inequalities = [
  'detection',
  'capture',
  'missing',
  'drift',
  'unmanage',
  'diagnosis',
] as const

const definedItems = [
  'positioning',
  'domain',
  'architecture',
  'lifecycle',
  'ownership',
  'cli',
  'catalog',
  'security',
  'privacy',
  'testing',
  'roadmap',
  'handoff',
] as const

const gitCapabilities = [
  'reconciliation',
  'adoption',
  'ownership',
  'configuration',
  'idempotence',
] as const

const nodeCapabilities = [
  'runtime',
  'path',
  'project',
  'compatibility',
  'isolation',
] as const

const vscodeCapabilities = [
  'desktop',
  'cli',
  'children',
  'preservation',
  'drift',
] as const

const gitFlow = computed(() => [
  t('pages.rigset.catalog.gitDetect'),
  t('pages.rigset.catalog.gitInstall'),
  t('pages.rigset.catalog.gitConfigure'),
  t('pages.rigset.catalog.gitVerify'),
  t('pages.rigset.catalog.gitSecond'),
  t('pages.rigset.catalog.gitNoop'),
])

const nextMilestones = computed(() => [
  { label: t('pages.rigset.status.language') },
  { label: t('pages.rigset.status.core') },
  { label: t('pages.rigset.status.gitSlice') },
  { label: t('pages.rigset.status.expand') },
  { label: t('pages.rigset.status.environments') },
  { label: t('pages.rigset.status.hardening') },
  { label: t('pages.rigset.status.release') },
])

const invariantRows = computed(() =>
  inequalities.map((item) => {
    const [left, right] = t(`pages.rigset.security.${item}`)
      .split('≠')
      .map((part) => part.trim())
    return { item, left, right }
  }),
)
</script>

<template>
  <ProjectDetailShell
    :back-label="t('pages.rigset.back')"
    project-slug="rigset"
    data-project-id="rigset"
  >
    <template #hero>
      <p class="case-hero__eyebrow">{{ t('pages.rigset.eyebrow') }}</p>
      <p class="case-hero__meta">
        <span>{{ t('pages.rigset.categories') }}</span>
        <span class="case-status" data-status="planned">{{
          t('selectedProjects.status.planned')
        }}</span>
      </p>
      <h1>{{ t('pages.rigset.headline') }}</h1>
      <p class="case-hero__lead">{{ t('pages.rigset.lead') }}</p>
      <p class="case-copy case-hero__note">{{ t('pages.rigset.note') }}</p>
      <ZoomableImage
        src="/images/projects/rigset/concept-overview.png"
        :alt="t('pages.rigset.overviewAlt')"
        :width="1536"
        :height="1024"
        :caption="t('pages.rigset.caption')"
      />
    </template>

    <ProjectSection
      index="01"
      :title="t('pages.rigset.problem.section')"
      heading-id="problem-heading"
    >
      <h3>{{ t('pages.rigset.problem.title') }}</h3>
      <p class="case-copy">{{ t('pages.rigset.problem.p1') }}</p>
      <p class="case-copy">{{ t('pages.rigset.problem.p2') }}</p>
      <p class="case-copy">{{ t('pages.rigset.problem.p3') }}</p>
      <dl class="case-visual inquiry">
        <div v-for="item in problemQuestions" :key="item" class="inquiry__row">
          <dt>{{ t(`pages.rigset.problem.${item}Q`) }}</dt>
          <dd>{{ t(`pages.rigset.problem.${item}A`) }}</dd>
        </div>
      </dl>
      <p class="case-kicker">{{ t('pages.rigset.problem.close') }}</p>
    </ProjectSection>

    <ProjectSection
      index="02"
      :title="t('pages.rigset.proposal.section')"
      heading-id="proposal-heading"
    >
      <h3>{{ t('pages.rigset.proposal.title') }}</h3>
      <p class="case-copy">{{ t('pages.rigset.proposal.p1') }}</p>
      <p class="case-copy">{{ t('pages.rigset.proposal.p2') }}</p>
      <p class="case-copy">{{ t('pages.rigset.proposal.p3') }}</p>
      <div class="case-visual case-visual--wide plan-model">
        <ul class="plan-model__inputs">
          <li v-for="item in proposalInputs" :key="item">
            <strong>{{ t(`pages.rigset.proposal.${item}Label`) }}</strong>
            <span>{{ t(`pages.rigset.proposal.${item}Text`) }}</span>
          </li>
        </ul>
        <ol class="plan-model__stages">
          <li>{{ t('pages.rigset.model.planStage') }}</li>
          <li>{{ t('pages.rigset.model.applyStage') }}</li>
          <li>{{ t('pages.rigset.model.verifyStage') }}</li>
        </ol>
      </div>
      <p class="case-copy">{{ t('pages.rigset.proposal.plan') }}</p>
      <p class="case-callout">{{ t('pages.rigset.proposal.planCallout') }}</p>
      <p class="case-copy">{{ t('pages.rigset.proposal.apply') }}</p>
      <p class="case-copy">{{ t('pages.rigset.proposal.verify') }}</p>
      <p class="case-kicker">{{ t('pages.rigset.proposal.close1') }}</p>
      <p class="case-kicker">{{ t('pages.rigset.proposal.close2') }}</p>
    </ProjectSection>

    <ProjectSection
      index="03"
      :title="t('pages.rigset.model.section')"
      heading-id="model-heading"
    >
      <h3>{{ t('pages.rigset.model.title') }}</h3>
      <p class="case-copy">{{ t('pages.rigset.model.p1') }}</p>
      <p class="case-copy">{{ t('pages.rigset.model.p2') }}</p>
      <div class="case-visual case-visual--wide machine">
        <p class="machine__root">{{ t('pages.rigset.model.machine') }}</p>
        <span class="machine__stem" aria-hidden="true" />
        <span class="machine__rule" aria-hidden="true" />
        <ul class="machine__targets editorial-distribution--3">
          <li class="editorial-distribution__start">
            <span>{{ t('pages.rigset.model.windowsNative') }}</span>
            <small>{{ t('pages.rigset.catalog.git') }}</small>
            <small>{{ t('pages.rigset.catalog.node') }}</small>
          </li>
          <li class="editorial-distribution__center">
            <span>{{ t('pages.rigset.model.wslUbuntu') }}</span>
            <small>{{ t('pages.rigset.catalog.git') }}</small>
            <small>{{ t('pages.rigset.catalog.node') }}</small>
          </li>
          <li class="editorial-distribution__end">
            <span>{{ t('pages.rigset.model.wslArch') }}</span>
            <small>{{ t('pages.rigset.catalog.git') }}</small>
            <small>{{ t('pages.rigset.catalog.node') }}</small>
          </li>
        </ul>
      </div>
      <h3>{{ t('pages.rigset.model.instanceTitle') }}</h3>
      <p class="case-copy">{{ t('pages.rigset.model.instance') }}</p>
      <p class="case-visual equation">{{ t('pages.rigset.model.formula') }}</p>
      <p class="case-kicker">{{ t('pages.rigset.model.unequal') }}</p>
      <p class="case-copy">{{ t('pages.rigset.model.independent') }}</p>
      <p class="case-copy">{{ t('pages.rigset.model.targetFirst') }}</p>
      <ol class="case-visual target-path">
        <li>{{ t('pages.rigset.model.wantNode') }}</li>
        <li>{{ t('pages.rigset.model.whichTarget') }}</li>
        <li>{{ t('pages.rigset.model.wslUbuntu') }}</li>
        <li>{{ t('pages.rigset.model.validStrategy') }}</li>
      </ol>
    </ProjectSection>

    <ProjectSection
      index="04"
      :title="t('pages.rigset.security.section')"
      heading-id="security-heading"
    >
      <h3>{{ t('pages.rigset.security.title') }}</h3>
      <p class="case-copy">{{ t('pages.rigset.security.intro1') }}</p>
      <p class="case-copy">{{ t('pages.rigset.security.intro2') }}</p>
      <p class="case-copy">{{ t('pages.rigset.security.intro3') }}</p>
      <ul class="case-visual invariants">
        <li v-for="row in invariantRows" :key="row.item">
          <span>{{ row.left }}</span>
          <span class="invariants__op">≠</span>
          <span>{{ row.right }}</span>
        </li>
      </ul>
      <h3>{{ t('pages.rigset.security.trustTitle') }}</h3>
      <p class="case-copy">{{ t('pages.rigset.security.trust1') }}</p>
      <p class="case-copy">{{ t('pages.rigset.security.trust2') }}</p>
      <div class="case-visual authority-composition">
        <ol class="authority-path">
          <li>{{ t('pages.rigset.security.existingResource') }}</li>
          <li>{{ t('pages.rigset.security.observe') }}</li>
          <li>{{ t('pages.rigset.security.explicitAdoption') }}</li>
          <li>{{ t('pages.rigset.security.managementAuthority') }}</li>
        </ol>
        <ul class="permission">
          <li>
            <span>{{ t('pages.rigset.security.permissionConfig') }}</span>
            <span aria-hidden="true">✓</span>
          </li>
          <li>
            <span>{{ t('pages.rigset.security.permissionUpdate') }}</span>
            <span aria-hidden="true">✓</span>
          </li>
          <li>
            <span>{{ t('pages.rigset.security.permissionUninstall') }}</span>
            <span aria-hidden="true">✕</span>
          </li>
        </ul>
      </div>
      <p class="case-callout">
        {{ t('pages.rigset.security.automationCallout') }}
      </p>
      <p class="case-copy">{{ t('pages.rigset.security.recovery') }}</p>
      <p class="case-kicker">
        {{ t('pages.rigset.security.recoveryCallout') }}
      </p>
      <p class="case-copy">{{ t('pages.rigset.security.privacy') }}</p>
      <dl class="privacy-notes">
        <div>
          <dt>{{ t('pages.rigset.security.localFirst') }}</dt>
          <dd>{{ t('pages.rigset.security.observationTransmission') }}</dd>
        </div>
        <div>
          <dt>{{ t('pages.rigset.security.coreTelemetry') }}</dt>
          <dd>{{ t('pages.rigset.security.none') }}</dd>
        </div>
        <div>
          <dt>{{ t('pages.rigset.security.v1Telemetry') }}</dt>
          <dd>{{ t('pages.rigset.security.zeroDefault') }}</dd>
        </div>
      </dl>
    </ProjectSection>

    <ProjectSection
      index="05"
      :title="t('pages.rigset.catalog.section')"
      heading-id="catalog-heading"
    >
      <h3>{{ t('pages.rigset.catalog.title') }}</h3>
      <p class="case-copy">{{ t('pages.rigset.catalog.intro1') }}</p>
      <p class="case-copy">{{ t('pages.rigset.catalog.intro2') }}</p>
      <div
        class="case-visual case-visual--wide capability-grid editorial-distribution--3"
      >
        <section class="editorial-distribution__start">
          <h4>{{ t('pages.rigset.catalog.git') }}</h4>
          <ul>
            <li v-for="item in gitCapabilities" :key="item">
              {{ t(`pages.rigset.catalog.${item}`) }}
            </li>
          </ul>
          <p class="proof">{{ gitFlow.join(' → ') }}</p>
        </section>
        <section class="editorial-distribution__center">
          <h4>{{ t('pages.rigset.catalog.node') }}</h4>
          <ul>
            <li v-for="item in nodeCapabilities" :key="item">
              {{ t(`pages.rigset.catalog.${item}`) }}
            </li>
          </ul>
          <p class="proof">{{ t('pages.rigset.catalog.nodeEquation') }}</p>
        </section>
        <section class="editorial-distribution__end">
          <h4>{{ t('pages.rigset.catalog.vscode') }}</h4>
          <ul>
            <li v-for="item in vscodeCapabilities" :key="item">
              {{ t(`pages.rigset.catalog.${item}`) }}
            </li>
          </ul>
          <pre class="proof-tree" tabindex="0">{{
            t('pages.rigset.catalog.vscodeTree')
          }}</pre>
        </section>
      </div>
      <h3>{{ t('pages.rigset.catalog.depthTitle') }}</h3>
      <p class="case-copy">{{ t('pages.rigset.catalog.depth') }}</p>
      <p class="case-callout">{{ t('pages.rigset.catalog.supportCallout') }}</p>
      <p class="case-copy">{{ t('pages.rigset.catalog.slices') }}</p>
    </ProjectSection>

    <ProjectSection
      index="06"
      :title="t('pages.rigset.status.section')"
      heading-id="status-heading"
    >
      <h3>{{ t('pages.rigset.status.title') }}</h3>
      <p class="case-copy">{{ t('pages.rigset.status.intro1') }}</p>
      <p class="case-copy">{{ t('pages.rigset.status.intro2') }}</p>
      <div class="status-close editorial-distribution--2">
        <section class="editorial-distribution__start">
          <h4>{{ t('pages.rigset.status.definedLabel') }}</h4>
          <ul class="check-list">
            <li v-for="item in definedItems" :key="item">
              {{ t(`pages.rigset.status.${item}`) }}
            </li>
          </ul>
        </section>
        <section class="editorial-distribution__end">
          <h4>{{ t('pages.rigset.status.evaluatingLabel') }}</h4>
          <p class="case-copy">{{ t('pages.rigset.status.languageChoice') }}</p>
          <p class="case-copy">{{ t('pages.rigset.status.languageText') }}</p>
        </section>
      </div>
      <div class="status-roadmap">
        <h4>{{ t('pages.rigset.status.nextLabel') }}</h4>
        <ProjectFlow :items="nextMilestones" />
      </div>
      <p class="case-kicker status-tagline">{{ t('pages.rigset.headline') }}</p>
      <CaseBackLink
        :label="t('pages.rigset.back')"
        project-slug="rigset"
        placement="footer"
      />
    </ProjectSection>
  </ProjectDetailShell>
</template>

<style scoped>
.case-hero__note {
  margin-block-start: var(--space-6);
}

.status-close h4 {
  margin-block: 0 var(--space-4);
  font-size: var(--font-size-sm);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.inquiry,
.plan-model__inputs,
.plan-model__stages,
.machine__targets,
.target-path,
.invariants,
.authority-path,
.permission,
.privacy-notes,
.capability-grid ul,
.check-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.inquiry__row,
.plan-model__inputs li,
.permission li {
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) auto minmax(0, 1fr);
  gap: var(--space-4);
  align-items: baseline;
  padding-block: var(--space-4);
  border-block-end: 1px solid var(--color-border);
}

.inquiry__row {
  grid-template-columns: minmax(0, 1.6fr) minmax(8rem, 0.7fr);
}

.inquiry dt {
  color: var(--color-text-secondary);
}

.inquiry dd,
.plan-model__inputs strong,
.invariants li,
.equation,
.machine__root,
.proof {
  margin: 0;
  color: var(--color-text-primary);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.plan-model {
  display: grid;
  gap: var(--space-10);
}

.plan-model__inputs {
  display: grid;
  gap: 0;
}

.plan-model__inputs li {
  grid-template-columns: minmax(10rem, 0.42fr) minmax(0, 1fr);
}

.plan-model__inputs span,
.machine small,
.check-list,
.capability-grid li {
  color: var(--color-text-secondary);
  font-weight: var(--font-weight-regular);
  letter-spacing: 0;
  text-transform: none;
}

.plan-model__stages {
  display: grid;
  justify-items: start;
  gap: var(--space-3);
  padding-block-start: var(--space-2);
}

.plan-model__stages li,
.target-path li,
.authority-path li {
  color: var(--color-text-primary);
  font-weight: var(--font-weight-semibold);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.target-path,
.authority-composition {
  justify-self: center;
  width: fit-content;
  max-inline-size: 100%;
  margin-inline: auto;
}

.target-path,
.authority-path {
  text-align: center;
}

.authority-composition {
  display: grid;
  justify-items: center;
  gap: var(--space-8);
}

.authority-composition .permission {
  width: max-content;
  max-inline-size: 100%;
  margin-inline: auto;
  margin-block-start: 0;
  text-align: start;
}

.plan-model__stages li + li::before,
.target-path li + li::before,
.authority-path li + li::before {
  display: block;
  margin-block: var(--space-2);
  color: var(--color-text-muted);
  font-weight: var(--font-weight-regular);
  content: '↓';
}

.machine {
  display: grid;
  justify-items: center;
}

.machine__root {
  margin: 0;
  text-align: center;
}

.machine__stem,
.machine__rule {
  background: var(--color-border);
}

.machine__stem {
  width: 1px;
  height: var(--space-6);
}

.machine__rule {
  width: 100%;
  height: 1px;
}

.machine__targets {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--space-6);
  width: 100%;
}

.machine__targets li {
  display: grid;
  gap: var(--space-2);
  padding-block-start: var(--space-4);
}

.machine__targets .editorial-distribution__start,
.capability-grid .editorial-distribution__start,
.status-close .editorial-distribution__start {
  justify-self: start;
  justify-items: start;
  text-align: start;
}

.machine__targets .editorial-distribution__center,
.capability-grid .editorial-distribution__center {
  justify-self: center;
  justify-items: center;
  text-align: center;
}

.machine__targets .editorial-distribution__end,
.capability-grid .editorial-distribution__end,
.status-close .editorial-distribution__end {
  justify-self: end;
  justify-items: end;
  text-align: end;
}

.capability-grid .editorial-distribution__end .proof-tree {
  justify-self: end;
  text-align: start;
}

.machine__targets span {
  font-weight: var(--font-weight-semibold);
}

.equation {
  padding-block: var(--space-6);
  font-family: var(--font-mono);
  line-height: 1.6;
  text-align: center;
  border-block: 1px solid var(--color-border);
}

.invariants {
  display: grid;
  grid-template-columns: max-content auto max-content;
  justify-self: center;
  width: fit-content;
  max-inline-size: 100%;
  margin-inline: auto;
}

.invariants li {
  display: grid;
  grid-template-columns: subgrid;
  grid-column: 1 / -1;
  column-gap: var(--space-5);
  align-items: baseline;
  padding-block: var(--space-4);
  border-block-end: 1px solid var(--color-border);
  font-family: var(--font-mono);
  font-size: var(--font-size-xs);
}

.invariants li > span:first-child {
  text-align: end;
}

.invariants__op {
  min-inline-size: 1.25em;
  color: var(--color-accent);
  text-align: center;
}

.invariants li > span:last-child {
  text-align: start;
}

.permission {
  display: grid;
  gap: 0;
  max-inline-size: 24rem;
  margin-block-start: var(--space-6);
}

.permission li {
  grid-template-columns: minmax(0, 1fr) 1.5rem;
}

.privacy-notes {
  display: grid;
  grid-template-columns: max-content minmax(0, max-content);
  justify-self: center;
  width: fit-content;
  max-inline-size: 100%;
  margin-inline: auto;
  margin-block-start: var(--space-8);
  column-gap: var(--space-8);
  row-gap: 0;
}

.privacy-notes div {
  display: grid;
  grid-template-columns: subgrid;
  grid-column: 1 / -1;
  align-items: baseline;
  padding-block: var(--space-4);
  border-block-end: 1px solid var(--color-border);
  text-align: start;
}

.privacy-notes dt,
.privacy-notes dd {
  margin: 0;
}

.capability-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  grid-template-rows: auto 1fr auto;
  gap: var(--space-8);
  align-items: start;
  padding-block: var(--space-8);
  border-block: 1px solid var(--color-border);
}

.capability-grid section {
  display: grid;
  grid-template-rows: subgrid;
  grid-row: span 3;
  min-inline-size: 0;
}

.capability-grid h4 {
  margin: 0;
}

.capability-grid li + li,
.check-list li + li {
  margin-block-start: var(--space-2);
}

.proof,
.proof-tree {
  margin-block-start: var(--space-5);
  color: var(--color-text-secondary);
  font-family: var(--font-mono);
  font-size: var(--font-size-xs);
  line-height: 1.7;
}

.proof-tree {
  overflow-x: auto;
  white-space: pre;
}

.status-close {
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(0, 0.8fr);
  gap: var(--space-10);
}

.check-list li::before {
  margin-inline-end: var(--space-2);
  color: var(--color-accent);
  content: '–';
}

@media (width >= 80rem) {
  .plan-model__inputs {
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: var(--space-4);
    padding-block-end: var(--space-6);
    border-block-end: 1px solid var(--color-border);
  }

  .plan-model__inputs li {
    grid-template-columns: minmax(0, 1fr);
    align-content: start;
    padding-block: 0;
    border-block-end: 0;
  }

  .plan-model__stages {
    justify-items: center;
    text-align: center;
  }
}

.status-roadmap {
  display: grid;
  justify-self: center;
  width: 100%;
  max-inline-size: min(100%, 48rem);
  margin-inline: auto;
}

.status-roadmap h4 {
  width: 100%;
  margin-block: var(--space-8) var(--space-4);
  font-size: var(--font-size-sm);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-align: start;
}

.status-roadmap :deep(.project-flow) {
  justify-items: center;
  width: 100%;
  padding: 0;
  text-align: center;
}

.status-roadmap :deep(.project-flow__item) {
  display: grid;
  justify-items: center;
  width: 100%;
}

.status-roadmap :deep(.project-flow__label),
.status-roadmap :deep(.project-flow__arrow) {
  text-align: center;
}

.case-kicker.status-tagline {
  max-inline-size: min(100%, 52rem);
  text-wrap: balance;
}

@media (width < 52rem) {
  .machine__stem,
  .machine__rule {
    display: none;
  }

  .machine__targets,
  .capability-grid,
  .status-close,
  .inquiry__row,
  .plan-model__inputs li,
  .invariants,
  .invariants li,
  .privacy-notes,
  .privacy-notes div {
    grid-template-columns: minmax(0, 1fr);
  }

  .capability-grid {
    grid-template-rows: none;
  }

  .capability-grid section {
    display: grid;
    grid-template-rows: auto auto auto;
    grid-row: auto;
    gap: var(--space-4);
  }

  .invariants li,
  .invariants li > span:first-child,
  .invariants__op,
  .invariants li > span:last-child {
    justify-items: center;
    text-align: center;
  }

  .privacy-notes div {
    row-gap: var(--space-2);
  }

  .machine__targets li,
  .capability-grid .editorial-distribution__start,
  .capability-grid .editorial-distribution__center,
  .capability-grid .editorial-distribution__end,
  .status-close .editorial-distribution__start,
  .status-close .editorial-distribution__end {
    justify-self: stretch;
    justify-items: start;
    text-align: start;
  }

  .machine__targets li {
    border-block-start: 1px solid var(--color-border);
  }
}
</style>
