<script setup lang="ts">
import ScrollReveal from '~/components/ui/ScrollReveal.vue'

defineProps<{
  index: string
  title: string
  headingId: string
}>()
</script>

<template>
  <ScrollReveal
    as="section"
    class="case-section"
    :aria-labelledby="headingId"
    :enable-blur="false"
  >
    <div class="case-section__heading">
      <p class="case-section__index">{{ index }}</p>
      <h2 :id="headingId">{{ title }}</h2>
    </div>
    <div class="case-section__body">
      <slot />
    </div>
  </ScrollReveal>
</template>
