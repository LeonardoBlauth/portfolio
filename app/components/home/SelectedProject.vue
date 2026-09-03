<script setup lang="ts">
import { selectedProjects } from '~/data/projects'
import ScrollReveal from '~/components/ui/ScrollReveal.vue'
import ProjectCarousel from '~/components/projects/ProjectCarousel.vue'
import ProjectShowcase from '~/components/projects/ProjectShowcase.vue'

const { t } = useI18n()
const { activeProjectSlug, setActiveProjectSlug, indexFromSlug } =
  useProjectCarouselState()

const startIndex = computed(() => indexFromSlug(activeProjectSlug.value))
const carouselReady = ref(false)

const onIndexChange = (index: number) => {
  if (!carouselReady.value) return
  const project = selectedProjects[index]
  if (project) setActiveProjectSlug(project.slug)
}

onMounted(() => {
  carouselReady.value = true
})
</script>

<template>
  <section
    id="projects"
    class="selected-projects section-spacing"
    aria-labelledby="projects-heading"
  >
    <div class="selected-projects__container layout-container">
      <ScrollReveal as="header" class="selected-projects__header">
        <p class="selected-projects__label">
          {{ t('selectedProjects.label') }}
        </p>
        <h2 id="projects-heading">{{ t('selectedProjects.headline') }}</h2>
        <p class="selected-projects__introduction">
          {{ t('selectedProjects.introduction') }}
        </p>
      </ScrollReveal>

      <ScrollReveal class="selected-projects__stage">
        <ProjectCarousel
          :count="selectedProjects.length"
          :start-index="startIndex"
          @index-change="onIndexChange"
        >
          <ProjectShowcase
            v-for="project in selectedProjects"
            :key="project.slug"
            :project="project"
          />
        </ProjectCarousel>
      </ScrollReveal>
    </div>
  </section>
</template>

<style scoped>
.selected-projects {
  position: relative;
  scroll-margin-top: var(--scroll-offset);
}

@media (width >= 64rem) and (height >= 52rem) {
  .selected-projects {
    display: grid;
    min-block-size: 100vh;
    min-block-size: 100svh;
    align-content: center;
  }
}

.selected-projects::before {
  position: absolute;
  inset: 12% 0 auto;
  height: 1px;
  content: '';
  background: linear-gradient(
    90deg,
    transparent,
    var(--color-border),
    transparent
  );
  opacity: 0.7;
}

.selected-projects__header {
  display: grid;
  grid-template-columns: minmax(8rem, 0.35fr) minmax(18rem, 0.85fr) minmax(
      18rem,
      0.7fr
    );
  gap: var(--space-8);
  align-items: start;
}

.selected-projects__label {
  padding-block-start: var(--space-2);
  color: var(--color-accent);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.selected-projects h2 {
  max-inline-size: 34rem;
  font-size: var(--font-size-3xl);
  line-height: var(--line-height-tight);
  letter-spacing: -0.045em;
}

.selected-projects__introduction {
  max-inline-size: 34rem;
  color: var(--color-text-secondary);
  font-size: var(--font-size-lg);
}

.selected-projects__stage {
  min-inline-size: 0;
}

@media (width < 64rem) {
  .selected-projects__header {
    grid-template-columns: minmax(0, 1fr) minmax(18rem, 1.2fr);
  }

  .selected-projects__label {
    grid-column: 1 / -1;
  }
}

@media (width < 42rem) {
  .selected-projects__header {
    grid-template-columns: minmax(0, 1fr);
    gap: var(--space-5);
  }
}
</style>
