<script setup lang="ts">
import CaseBackLink from '~/components/projects/CaseBackLink.vue'
import ProjectDetailShell from '~/components/projects/ProjectDetailShell.vue'
import ProjectFlow from '~/components/projects/ProjectFlow.vue'
import ProjectSection from '~/components/projects/ProjectSection.vue'

const { t } = useI18n()

const architectureFlow = computed(() => [
  { label: t('pages.eligent.architecture.source') },
  { label: t('pages.eligent.architecture.interpretation') },
  { label: t('pages.eligent.architecture.eligibility') },
  { label: t('pages.eligent.architecture.delivery') },
])

const outcomes = ['eligible', 'ineligible', 'abstain'] as const
</script>

<template>
  <ProjectDetailShell
    :back-label="t('pages.eligent.back')"
    project-slug="eligent"
    data-project-id="eligent"
  >
    <template #hero>
      <p class="case-hero__eyebrow">{{ t('pages.eligent.eyebrow') }}</p>
      <p class="case-hero__meta">
        <span>{{ t('pages.eligent.categories') }}</span>
        <span class="case-status" data-status="technical-validation">{{
          t('selectedProjects.status.technicalValidation')
        }}</span>
      </p>
      <h1>{{ t('pages.eligent.headline') }}</h1>
      <p class="case-hero__lead">{{ t('pages.eligent.lead') }}</p>
      <p class="case-copy case-hero__note">{{ t('pages.eligent.note') }}</p>
    </template>

    <ProjectSection
      index="01"
      :title="t('pages.eligent.origin.section')"
      heading-id="origin-heading"
    >
      <h3>{{ t('pages.eligent.origin.title') }}</h3>
      <p class="case-copy">{{ t('pages.eligent.origin.p1') }}</p>
      <p class="case-copy">{{ t('pages.eligent.origin.p2') }}</p>
    </ProjectSection>

    <ProjectSection
      index="02"
      :title="t('pages.eligent.feasibility.section')"
      heading-id="feasibility-heading"
    >
      <h3>{{ t('pages.eligent.feasibility.title') }}</h3>
      <p class="case-copy">{{ t('pages.eligent.feasibility.p1') }}</p>
      <p class="case-copy">{{ t('pages.eligent.feasibility.p2') }}</p>
    </ProjectSection>

    <ProjectSection
      index="03"
      :title="t('pages.eligent.reframe.section')"
      heading-id="reframe-heading"
    >
      <h3>{{ t('pages.eligent.reframe.title') }}</h3>
      <p class="case-copy">{{ t('pages.eligent.reframe.p1') }}</p>
      <p class="case-kicker">{{ t('pages.eligent.reframe.principle') }}</p>
    </ProjectSection>

    <ProjectSection
      index="04"
      :title="t('pages.eligent.architecture.section')"
      heading-id="architecture-heading"
    >
      <h3>{{ t('pages.eligent.architecture.title') }}</h3>
      <p class="case-copy">{{ t('pages.eligent.architecture.p1') }}</p>
      <ProjectFlow
        class="eligent-architecture-flow"
        :items="architectureFlow"
      />
    </ProjectSection>

    <ProjectSection
      index="05"
      :title="t('pages.eligent.eligibility.section')"
      heading-id="eligibility-heading"
    >
      <h3>{{ t('pages.eligent.eligibility.title') }}</h3>
      <p class="case-copy">{{ t('pages.eligent.eligibility.p1') }}</p>
      <ul class="plain-list">
        <li v-for="outcome in outcomes" :key="outcome">
          {{ t(`pages.eligent.eligibility.${outcome}`) }}
        </li>
      </ul>
      <p class="case-copy">{{ t('pages.eligent.eligibility.delivery') }}</p>
    </ProjectSection>

    <ProjectSection
      index="06"
      :title="t('pages.eligent.validation.section')"
      heading-id="validation-heading"
    >
      <h3>{{ t('pages.eligent.validation.title') }}</h3>
      <p class="case-copy">{{ t('pages.eligent.validation.p1') }}</p>
      <p class="case-copy">{{ t('pages.eligent.validation.p2') }}</p>
      <CaseBackLink
        :label="t('pages.eligent.back')"
        project-slug="eligent"
        placement="footer"
      />
    </ProjectSection>
  </ProjectDetailShell>
</template>

<style scoped>
:deep(.eligent-architecture-flow) {
  justify-items: center;
  margin-block-start: var(--space-10);
  text-align: center;
}

:deep(.eligent-architecture-flow .project-flow__item) {
  display: grid;
  justify-items: center;
}

:deep(.eligent-architecture-flow .project-flow__details) {
  justify-content: center;
}

:deep(.eligent-architecture-flow .project-flow__arrow) {
  justify-self: center;
}
</style>
