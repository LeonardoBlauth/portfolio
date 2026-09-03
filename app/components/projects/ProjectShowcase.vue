<script setup lang="ts">
import type { ProjectSummary } from '~/types/project'
import { localizedRoutes } from '~/data/localized-routes'
import type { SupportedLocale } from '~/utils/locale'
import OvertimeHomeDiagram from '~/components/projects/OvertimeHomeDiagram.vue'
import FloatingCard from '~/components/ui/floating-card/FloatingCard.vue'

const props = defineProps<{
  project: ProjectSummary
}>()

const { locale, t } = useI18n()
const { setActiveProjectSlug } = useProjectCarouselState()

const currentLocale = computed<SupportedLocale>(() =>
  locale.value === 'en' ? 'en' : 'pt-BR',
)
const message = (key: string) => t(`${props.project.messageKey}.${key}`)
const caseRoute = computed(
  () => localizedRoutes[props.project.route].paths[currentLocale.value],
)
const categories = computed(() =>
  props.project.categoryKeys.map((key) =>
    t(`selectedProjects.categories.${key}`),
  ),
)
const statusLabel = computed(() =>
  t(`selectedProjects.status.${props.project.status}`),
)
const visualCaption = computed(() =>
  props.project.visual.type === 'concept-image' ||
  props.project.visual.captionKey
    ? message(props.project.visual.captionKey ?? 'caption')
    : '',
)
const suppressVisualNavigation = inject('projectCarouselDragGuard', ref(false))
const visualPointerOrigin = { x: 0, y: 0 }
let hasVisualPointerOrigin = false
const openCaseLabel = computed(() =>
  t('selectedProjects.carousel.openCase', { name: message('name') }),
)

const onVisualPointerDown = (event: PointerEvent) => {
  visualPointerOrigin.x = event.clientX
  visualPointerOrigin.y = event.clientY
  hasVisualPointerOrigin = true
}

const onVisualClick = (event: MouseEvent) => {
  const moved = hasVisualPointerOrigin
    ? Math.hypot(
        event.clientX - visualPointerOrigin.x,
        event.clientY - visualPointerOrigin.y,
      )
    : 0
  hasVisualPointerOrigin = false

  if (suppressVisualNavigation.value || moved > 12) {
    event.preventDefault()
    return
  }

  setActiveProjectSlug(props.project.slug)
}
</script>

<template>
  <article class="project-showcase" :data-project-id="project.slug">
    <div class="project-showcase__visual">
      <div class="project-visual-slot" :data-visual-type="project.visual.type">
        <NuxtLink
          class="project-showcase__visual-link"
          :to="caseRoute"
          :aria-label="openCaseLabel"
          draggable="false"
          @pointerdown="onVisualPointerDown"
          @click="onVisualClick"
          @dragstart.prevent
        >
          <figure
            v-if="project.visual.type === 'screenshot'"
            class="project-showcase__figure"
          >
            <FloatingCard>
              <img
                :src="project.visual.src"
                alt=""
                :width="project.visual.width"
                :height="project.visual.height"
                decoding="async"
                draggable="false"
              />
            </FloatingCard>
          </figure>

          <figure
            v-else-if="project.visual.type === 'concept-image'"
            class="project-showcase__figure"
          >
            <FloatingCard>
              <img
                :src="project.visual.src"
                alt=""
                :width="project.visual.width"
                :height="project.visual.height"
                decoding="async"
                draggable="false"
              />
            </FloatingCard>
            <figcaption aria-hidden="true">{{ visualCaption }}</figcaption>
          </figure>

          <figure v-else class="project-showcase__diagram">
            <FloatingCard>
              <OvertimeHomeDiagram />
            </FloatingCard>
          </figure>
        </NuxtLink>
      </div>
    </div>

    <div class="project-showcase__content">
      <p class="project-showcase__categories">
        <span v-for="category in categories" :key="category">{{
          category
        }}</span>
      </p>

      <div class="project-showcase__title-row">
        <h3>{{ message('name') }}</h3>
        <span class="project-showcase__status" :data-status="project.status">{{
          statusLabel
        }}</span>
      </div>

      <p class="project-showcase__summary">{{ message('summary') }}</p>
      <p v-if="project.hasMaturityNote" class="project-showcase__note">
        {{ message('maturityNote') }}
      </p>

      <ul v-if="project.technologies?.length" class="project-showcase__tech">
        <li v-for="technology in project.technologies" :key="technology">
          {{ technology }}
        </li>
      </ul>

      <NuxtLink
        class="project-showcase__cta"
        :to="caseRoute"
        @click="setActiveProjectSlug(project.slug)"
      >
        {{ message('cta') }}
      </NuxtLink>
    </div>
  </article>
</template>

<style scoped>
.project-showcase {
  display: grid;
  grid-template-columns: minmax(0, 1.22fr) minmax(20rem, 0.78fr);
  gap: clamp(var(--space-8), 5vw, var(--space-16));
  align-items: center;
  padding-inline: 0.12rem;
}

.project-showcase__visual,
.project-showcase__visual-link,
.project-visual-slot,
.project-showcase__figure,
.project-showcase__diagram {
  min-inline-size: 0;
}

.project-showcase__visual {
  display: grid;
  place-items: center;
  align-self: stretch;
}

.project-showcase__visual-link {
  display: grid;
  place-items: center;
  max-inline-size: 100%;
  max-block-size: 100%;
  color: inherit;
  text-decoration: none;
  cursor: pointer;
}

.project-visual-slot {
  display: grid;
  place-items: center;
  width: 100%;
}

.project-showcase__visual-link:hover {
  color: inherit;
}

.project-showcase__figure {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-inline-size: 100%;
  max-block-size: 100%;
  margin: 0;
}

.project-visual-slot[data-visual-type='screenshot']
  .project-showcase__visual-link,
.project-visual-slot[data-visual-type='concept-image']
  .project-showcase__visual-link,
.project-visual-slot[data-visual-type='screenshot'] .project-showcase__figure,
.project-visual-slot[data-visual-type='concept-image']
  .project-showcase__figure {
  width: 100%;
}

.project-visual-slot[data-visual-type='screenshot'] :deep(.floating-card),
.project-visual-slot[data-visual-type='concept-image'] :deep(.floating-card),
.project-visual-slot[data-visual-type='screenshot']
  :deep(.floating-card__surface),
.project-visual-slot[data-visual-type='concept-image']
  :deep(.floating-card__surface) {
  width: fit-content;
  max-inline-size: 100%;
}

.project-showcase__figure img {
  display: block;
  width: auto;
  height: auto;
  max-inline-size: 100%;
  max-block-size: 100%;
  object-fit: contain;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
}

.project-visual-slot[data-visual-type='concept-image'] img {
  max-block-size: calc(100% - 2.75rem);
}

.project-showcase__figure figcaption {
  width: 100%;
}

.project-showcase__figure figcaption,
.project-showcase__note {
  margin-block-start: var(--space-3);
  color: var(--color-text-muted);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  letter-spacing: 0.055em;
  text-transform: uppercase;
}

.project-showcase__diagram {
  display: grid;
  place-items: center;
  width: 100%;
  max-inline-size: 100%;
  max-block-size: 100%;
  padding: var(--space-5) var(--space-8);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
}

.project-showcase__categories {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2) var(--space-4);
  color: var(--color-text-muted);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.project-showcase__title-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-4);
  margin-block-start: var(--space-5);
}

.project-showcase h3 {
  font-size: clamp(2rem, 5vw, 4.25rem);
  font-weight: var(--font-weight-semibold);
  line-height: 0.95;
  letter-spacing: -0.04em;
}

.project-showcase__status {
  display: inline-flex;
  min-block-size: 2rem;
  align-items: center;
  padding-inline: var(--space-3);
  color: var(--color-text-secondary);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  background: var(--_status-bg, transparent);
  border: 1px solid var(--_status-border, var(--color-border));
  border-radius: var(--radius-pill);
}

.project-showcase__status::before {
  width: 0.4rem;
  height: 0.4rem;
  margin-inline-end: var(--space-2);
  content: '';
  background: var(--_status-dot, var(--color-accent));
  border-radius: 50%;
}

.project-showcase__summary {
  max-inline-size: 38rem;
  margin-block-start: var(--space-5);
  color: var(--color-text-secondary);
  font-size: var(--font-size-lg);
  line-height: 1.65;
}

.project-showcase__cta {
  display: inline-flex;
  min-block-size: 3rem;
  align-items: center;
  margin-block-start: var(--space-8);
  color: var(--color-text-primary);
  font-weight: var(--font-weight-semibold);
  text-decoration-color: var(--color-accent);
  text-underline-offset: 0.35em;
  cursor: pointer;
}

.project-showcase__cta:hover {
  color: var(--color-accent-interactive);
}

@media (width >= 64rem) {
  .project-visual-slot {
    block-size: clamp(23rem, 30vw, 27.5rem);
  }

  .project-visual-slot[data-visual-type='diagram']
    .project-showcase__visual-link,
  .project-visual-slot[data-visual-type='diagram'] .project-showcase__diagram {
    width: 100%;
    height: 100%;
    min-block-size: 0;
  }

  .project-visual-slot[data-visual-type='diagram'] :deep(.floating-card),
  .project-visual-slot[data-visual-type='diagram']
    :deep(.floating-card__surface),
  .project-visual-slot[data-visual-type='diagram']
    :deep(.overtime-home-diagram),
  .project-visual-slot[data-visual-type='diagram'] :deep(.project-flow) {
    width: 100%;
    height: 100%;
    min-block-size: 0;
  }

  .project-visual-slot[data-visual-type='diagram']
    :deep(.overtime-home-diagram) {
    align-content: space-evenly;
    padding-block: 0;
  }

  .project-visual-slot[data-visual-type='diagram'] :deep(.project-flow) {
    align-content: space-evenly;
    gap: 0.5rem;
  }

  .project-visual-slot[data-visual-type='diagram']
    :deep(.project-flow__details li) {
    max-inline-size: none;
    white-space: nowrap;
  }

  .project-visual-slot[data-visual-type='diagram'] :deep(.project-flow__arrow) {
    margin-block: 0;
  }

  .project-visual-slot[data-visual-type='diagram']
    :deep(.project-flow__details) {
    margin-block-start: var(--space-2);
  }
}

@media (width < 64rem) {
  .project-showcase {
    grid-template-columns: minmax(0, 1fr);
    align-items: start;
  }

  .project-showcase__content {
    max-inline-size: 44rem;
  }

  .project-showcase__diagram {
    width: 100%;
  }

  .project-visual-slot[data-visual-type='diagram']
    .project-showcase__visual-link {
    width: 100%;
  }
}
</style>
