<script setup lang="ts">
import HomeHero from '~/components/home/HomeHero.vue'
import ContactSection from '~/components/home/ContactSection.vue'
import ProfessionalHistory from '~/components/home/ProfessionalHistory.vue'
import SelectedProject from '~/components/home/SelectedProject.vue'
import TechStack from '~/components/home/TechStack.vue'
import WorkApproach from '~/components/home/WorkApproach.vue'
</script>

<template>
  <div>
    <HomeHero />
    <SelectedProject />
    <ProfessionalHistory />
    <TechStack />
    <WorkApproach />
    <ContactSection />
    <LayoutAppFooter />
  </div>
</template>
