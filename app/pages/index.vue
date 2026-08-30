<script setup lang="ts">
import HomeHero from '~/components/home/HomeHero.vue'
import ProfessionalHistory from '~/components/home/ProfessionalHistory.vue'
import SelectedProject from '~/components/home/SelectedProject.vue'
import TechStack from '~/components/home/TechStack.vue'

const { t } = useI18n()
</script>

<template>
  <div>
    <HomeHero />
    <SelectedProject />
    <ProfessionalHistory />
    <TechStack />

    <div class="navigation-destinations layout-container">
      <section
        v-for="section in ['contact']"
        :id="section"
        :key="section"
        class="navigation-destination"
        :aria-labelledby="`${section}-heading`"
      >
        <h2 :id="`${section}-heading`">{{ t(`navigation.${section}`) }}</h2>
      </section>
    </div>
  </div>
</template>

<style scoped>
.navigation-destination {
  min-height: 72vh;
  min-height: 72dvh;
  padding-block: var(--section-spacing);
  border-block-start: 1px solid var(--color-border);
}
</style>
