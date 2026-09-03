<script setup lang="ts">
defineProps<{
  index: string
  title: string
  headingId: string
}>()
</script>

<template>
  <section class="case-section" :aria-labelledby="headingId">
    <div class="case-section__heading">
      <p class="case-section__index">{{ index }}</p>
      <h2 :id="headingId">{{ title }}</h2>
    </div>
    <div class="case-section__body">
      <slot />
    </div>
  </section>
</template>
