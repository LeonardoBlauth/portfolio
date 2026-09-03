<script setup lang="ts">
const props = defineProps<{
  label: string
  projectSlug: string
  placement?: 'hero' | 'footer'
}>()

const { projectsTarget, prepareReturn } = useReturnToProjects()
</script>

<template>
  <NuxtLink
    class="case-back"
    :class="{ 'case-back--footer': placement === 'footer' }"
    :to="projectsTarget"
    @click="prepareReturn(props.projectSlug)"
  >
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M16 10H5m4-4-4 4 4 4" />
    </svg>
    {{ label }}
  </NuxtLink>
</template>

<style scoped>
a.case-back {
  display: inline-flex;
  padding: 0;
  min-block-size: 2.75rem;
  align-items: center;
  gap: var(--space-3);
  color: var(--color-text-secondary);
  font: inherit;
  font-weight: var(--font-weight-semibold);
  text-align: start;
  text-decoration: underline;
  text-decoration-color: var(--color-border);
  text-underline-offset: 0.35em;
}

a.case-back:hover {
  color: var(--color-accent-interactive);
}

.case-back svg {
  width: 1.25rem;
  flex: none;
  fill: none;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 1.7;
}

.case-back--footer {
  margin-block-start: var(--space-12);
}
</style>
