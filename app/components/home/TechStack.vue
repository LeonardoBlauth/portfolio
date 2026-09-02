<script setup lang="ts">
import LogoLoop from '~/components/ui/LogoLoop.vue'
import ScrollReveal from '~/components/ui/ScrollReveal.vue'
import { technologyCategories, technologyLogos } from '~/data/tech-stack'

const { t } = useI18n()

type TechnologyCategoryId = (typeof technologyCategories)[number]['id']

const compactMediaQuery = ref<MediaQueryList | null>(null)
const isCompact = ref(false)
const expandedCategories = ref<Set<TechnologyCategoryId>>(new Set(['core']))

const syncCompactLayout = () => {
  isCompact.value = compactMediaQuery.value?.matches ?? false
}
const isCategoryExpanded = (categoryId: TechnologyCategoryId) =>
  !isCompact.value || expandedCategories.value.has(categoryId)
const toggleCategory = (categoryId: TechnologyCategoryId) => {
  const nextExpandedCategories = new Set(expandedCategories.value)

  if (nextExpandedCategories.has(categoryId)) {
    nextExpandedCategories.delete(categoryId)
  } else {
    nextExpandedCategories.add(categoryId)
  }

  expandedCategories.value = nextExpandedCategories
}

onMounted(() => {
  compactMediaQuery.value = window.matchMedia('(width < 42rem)')
  syncCompactLayout()
  compactMediaQuery.value.addEventListener('change', syncCompactLayout)
})

onBeforeUnmount(() =>
  compactMediaQuery.value?.removeEventListener('change', syncCompactLayout),
)
</script>

<template>
  <section
    id="stack"
    class="tech-stack section-spacing"
    aria-labelledby="stack-heading"
  >
    <div class="layout-container">
      <ScrollReveal as="header" class="tech-stack__header">
        <p class="tech-stack__label">{{ t('techStack.label') }}</p>
        <h2 id="stack-heading">{{ t('techStack.headline') }}</h2>
      </ScrollReveal>

      <div class="tech-stack__logo-loop">
        <LogoLoop
          :logos="technologyLogos"
          :speed="42"
          direction="left"
          :logo-height="32"
          :gap="48"
          :hover-speed="14"
          :fade-out="true"
          :scale-on-hover="false"
          :aria-label="t('techStack.logoLoop.label')"
        />
      </div>

      <ScrollReveal as="div" class="tech-stack__groups">
        <article
          v-for="(category, index) in technologyCategories"
          :key="category.id"
          class="tech-stack-group"
          :class="`tech-stack-group--${category.id}`"
          data-technology-category
        >
          <header class="tech-stack-group__header">
            <span class="tech-stack-group__index" aria-hidden="true">
              {{ String(index + 1).padStart(2, '0') }}
            </span>
            <div class="tech-stack-group__details">
              <h3>{{ t(`techStack.categories.${category.id}.title`) }}</h3>
              <p class="tech-stack-group__description">
                {{ t(`techStack.categories.${category.id}.description`) }}
              </p>
              <button
                v-if="category.id !== 'core'"
                class="tech-stack-group__toggle"
                type="button"
                :aria-expanded="isCategoryExpanded(category.id)"
                :aria-controls="`technology-list-${category.id}`"
                :aria-label="
                  t(
                    isCategoryExpanded(category.id)
                      ? 'techStack.actions.hide'
                      : 'techStack.actions.show',
                    {
                      category: t(`techStack.categories.${category.id}.title`),
                    },
                  )
                "
                @click="toggleCategory(category.id)"
              >
                <span>
                  {{
                    t(
                      isCategoryExpanded(category.id)
                        ? 'techStack.actions.hideShort'
                        : 'techStack.actions.showShort',
                    )
                  }}
                </span>
                <svg viewBox="0 0 20 20" aria-hidden="true">
                  <path d="m5 8 5 5 5-5" />
                </svg>
              </button>
            </div>
          </header>

          <ul
            :id="`technology-list-${category.id}`"
            :hidden="!isCategoryExpanded(category.id)"
          >
            <li
              v-for="technology in category.technologies"
              :key="technology"
              data-technology
            >
              {{ t(`techStack.technologies.${technology}`) }}
            </li>
          </ul>
        </article>
      </ScrollReveal>
    </div>
  </section>
</template>

<style scoped>
.tech-stack {
  border-block-start: 1px solid var(--color-border);
}

.tech-stack__header {
  display: grid;
  grid-template-columns: minmax(10rem, 0.38fr) minmax(0, 1fr);
  gap: clamp(var(--space-8), 7vw, var(--space-20));
  align-items: start;
}

.tech-stack__label {
  color: var(--color-accent);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.tech-stack h2 {
  max-inline-size: 40rem;
  font-size: var(--font-size-3xl);
  line-height: var(--line-height-tight);
  letter-spacing: -0.035em;
  text-wrap: balance;
}

.tech-stack__groups {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  border-block-end: 1px solid var(--color-border);
}

.tech-stack__logo-loop {
  padding-block: clamp(var(--space-8), 4vw, var(--space-12));
  margin-block: clamp(var(--space-12), 6vw, var(--space-20));
}

.tech-stack-group {
  min-inline-size: 0;
  padding-block: var(--space-10) var(--space-12);
}

.tech-stack-group + .tech-stack-group {
  padding-inline-start: var(--space-8);
  border-inline-start: 1px solid var(--color-border);
}

.tech-stack-group:not(:last-child) {
  padding-inline-end: var(--space-8);
}

.tech-stack-group__header {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: var(--space-4);
  align-items: start;
}

.tech-stack-group__index {
  padding-block-start: 0.15em;
  color: var(--color-accent);
  font-family: var(--font-mono);
  font-size: var(--font-size-xs);
  font-variant-numeric: tabular-nums;
}

.tech-stack-group h3 {
  font-size: var(--font-size-xl);
  line-height: var(--line-height-heading);
}

.tech-stack-group__description {
  min-block-size: 4.8em;
  margin-block-start: var(--space-3);
  color: var(--color-text-secondary);
}

.tech-stack-group__toggle {
  display: none;
}

.tech-stack-group ul {
  margin-block-start: var(--space-8);
  list-style: none;
}

.tech-stack-group ul[hidden] {
  display: none;
}

.tech-stack-group li {
  padding-block: var(--space-3);
  color: var(--color-text-secondary);
  border-block-start: 1px solid var(--color-border);
}

.tech-stack-group li:last-child {
  border-block-end: 1px solid var(--color-border);
}

.tech-stack-group--core li {
  color: var(--color-text-primary);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-medium);
}

.tech-stack-group--exploring h3,
.tech-stack-group--exploring .tech-stack-group__index {
  color: var(--color-text-secondary);
}

@media (width < 64rem) {
  .tech-stack__groups {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .tech-stack-group:nth-child(3) {
    grid-column: 1 / -1;
    padding-inline: 0;
    border-block-start: 1px solid var(--color-border);
    border-inline-start: 0;
  }

  .tech-stack-group:nth-child(3) .tech-stack-group__description {
    min-block-size: auto;
  }
}

@media (width < 42rem) {
  .tech-stack__header,
  .tech-stack__groups {
    grid-template-columns: minmax(0, 1fr);
  }

  .tech-stack__groups {
    border-block-end: 0;
  }

  .tech-stack__logo-loop {
    padding-block: 0;
    margin-block: var(--space-2) 0;
  }

  .tech-stack-group,
  .tech-stack-group + .tech-stack-group,
  .tech-stack-group:nth-child(3) {
    grid-column: auto;
    padding-inline: 0;
    border-block-start: 0;
    border-block-end: 1px solid var(--color-border);
    border-inline-start: 0;
  }

  .tech-stack-group {
    padding-block: var(--space-8);
  }

  .tech-stack-group--additional,
  .tech-stack-group--exploring {
    padding-block: var(--space-5);
  }

  .tech-stack-group__description {
    min-block-size: auto;
  }

  .tech-stack-group__toggle {
    display: inline-flex;
    min-block-size: 2.75rem;
    align-items: center;
    gap: var(--space-2);
    padding: 0;
    margin-block-start: var(--space-4);
    color: var(--color-text-primary);
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-semibold);
    background: transparent;
    border: 0;
    cursor: pointer;
  }

  .tech-stack-group__toggle svg {
    width: 1rem;
    fill: none;
    stroke: currentColor;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 1.8;
    transition: transform var(--motion-duration-fast)
      var(--motion-ease-standard);
  }

  .tech-stack-group__toggle[aria-expanded='true'] svg {
    transform: rotate(180deg);
  }

  .tech-stack-group ul {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0 var(--space-4);
    margin-block-start: var(--space-6);
  }

  .tech-stack-group li {
    min-inline-size: 0;
    overflow-wrap: anywhere;
  }
}

@media (prefers-reduced-motion: reduce) {
  .tech-stack-group__toggle svg {
    transition: none;
  }
}
</style>
