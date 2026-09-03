<script setup lang="ts">
import ProjectFlow from '~/components/projects/ProjectFlow.vue'

const { t } = useI18n()

const items = computed(() => [
  { label: t('selectedProjects.overtimeAutomation.flow.opportunity') },
  {
    label: t('selectedProjects.overtimeAutomation.flow.interpret'),
    details: [
      [
        t('selectedProjects.overtimeAutomation.flow.date'),
        t('selectedProjects.overtimeAutomation.flow.period'),
        t('selectedProjects.overtimeAutomation.flow.role'),
        t('selectedProjects.overtimeAutomation.flow.group'),
      ].join(' · '),
    ],
  },
  {
    label: t('selectedProjects.overtimeAutomation.flow.evaluate'),
    details: [
      [
        t('selectedProjects.overtimeAutomation.flow.schedule'),
        t('selectedProjects.overtimeAutomation.flow.availability'),
        t('selectedProjects.overtimeAutomation.flow.extras'),
        t('selectedProjects.overtimeAutomation.flow.limits'),
      ].join(' · '),
    ],
  },
  { label: t('selectedProjects.overtimeAutomation.flow.respond') },
  { label: t('selectedProjects.overtimeAutomation.flow.record') },
  { label: t('selectedProjects.overtimeAutomation.flow.notify') },
])
</script>

<template>
  <div class="overtime-home-diagram">
    <ProjectFlow :items="items" />
  </div>
</template>

<style scoped>
.overtime-home-diagram {
  display: grid;
  justify-items: center;
  align-content: center;
  width: 100%;
  height: 100%;
  min-block-size: 0;
  padding-block: var(--space-4);
}

.overtime-home-diagram :deep(.project-flow) {
  justify-items: center;
  align-content: center;
  width: 100%;
  max-inline-size: 100%;
  height: 100%;
  min-block-size: 0;
  margin-inline: 0;
  padding-inline: 0;
  gap: var(--space-5);
  text-align: center;
}

.overtime-home-diagram :deep(.project-flow__item) {
  display: grid;
  justify-items: center;
  width: 100%;
}

.overtime-home-diagram :deep(.project-flow__label) {
  text-align: center;
}

.overtime-home-diagram :deep(.project-flow__details) {
  display: block;
  width: 100%;
  max-inline-size: 100%;
  margin-block-start: var(--space-3);
  margin-inline: 0;
  padding-inline: 0;
  text-align: center;
}

.overtime-home-diagram :deep(.project-flow__details li) {
  max-inline-size: 100%;
}

.overtime-home-diagram :deep(.project-flow__arrow) {
  margin-block: var(--space-3);
  text-align: center;
}
</style>
