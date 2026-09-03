<script setup lang="ts">
defineProps<{
  items: Array<{
    label: string
    details?: string[]
  }>
}>()
</script>

<template>
  <ol class="project-flow">
    <li
      v-for="(item, index) in items"
      :key="item.label"
      class="project-flow__item"
    >
      <p class="project-flow__label">{{ item.label }}</p>
      <ul v-if="item.details?.length" class="project-flow__details">
        <li v-for="detail in item.details" :key="detail">{{ detail }}</li>
      </ul>
      <span
        v-if="index < items.length - 1"
        class="project-flow__arrow"
        aria-hidden="true"
      >
        ↓
      </span>
    </li>
  </ol>
</template>

<style scoped>
.project-flow {
  display: grid;
  gap: var(--space-3);
  margin: 0;
  list-style: none;
}

.project-flow__label {
  color: var(--color-text-primary);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.project-flow__details {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2) var(--space-4);
  margin-block-start: var(--space-2);
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
  list-style: none;
}

.project-flow__arrow {
  display: block;
  margin-block: var(--space-1);
  color: var(--color-text-muted);
}
</style>
