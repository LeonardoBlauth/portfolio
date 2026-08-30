<script setup lang="ts">
import { education, professionalExperience } from '~/data/professional-history'

const { t } = useI18n()
</script>

<template>
  <section
    id="experience"
    class="professional-history section-spacing"
    aria-labelledby="experience-heading"
  >
    <div class="layout-container">
      <header class="professional-history__header">
        <p class="professional-history__label">{{ t('experience.label') }}</p>
        <h2 id="experience-heading">{{ t('experience.headline') }}</h2>
      </header>

      <article class="experience-record" data-professional-experience>
        <div class="experience-record__identity">
          <div>
            <h3>{{ professionalExperience.company }}</h3>
            <p class="experience-record__role">
              {{ professionalExperience.role }}
            </p>
          </div>
          <div class="experience-record__metadata">
            <p>
              {{ professionalExperience.startYear }} —
              {{ t('experience.present') }}
            </p>
            <p>{{ t('experience.location') }}</p>
          </div>
        </div>

        <p class="experience-record__description">
          {{ t('experience.description') }}
        </p>

        <div class="contribution-groups">
          <article
            v-for="group in professionalExperience.contributionGroups"
            :key="group"
            class="contribution-group"
          >
            <h4>{{ t(`experience.contributions.${group}.title`) }}</h4>
            <p>{{ t(`experience.contributions.${group}.description`) }}</p>
          </article>
        </div>

        <div class="experience-record__footer">
          <ul
            class="experience-record__technologies"
            :aria-label="t('experience.technologies')"
          >
            <li
              v-for="technology in professionalExperience.technologies"
              :key="technology"
              data-technology
            >
              {{ technology }}
            </li>
          </ul>

          <a
            class="experience-record__cta"
            :href="professionalExperience.linkedinUrl"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ t('experience.cta') }}
            <span class="visually-hidden">{{ t('experience.ctaNewTab') }}</span>
            <svg viewBox="0 0 20 20" aria-hidden="true">
              <path d="M7 5h8v8m0-8-9 9" />
            </svg>
          </a>
        </div>
      </article>

      <aside
        class="education"
        data-education
        aria-labelledby="education-heading"
      >
        <p class="education__label">{{ t('education.label') }}</p>
        <div class="education__content">
          <h3 id="education-heading">{{ t('education.program') }}</h3>
          <p>{{ education.institution }}</p>
        </div>
        <p class="education__status">
          {{
            t('education.status', { year: education.expectedCompletionYear })
          }}
        </p>
      </aside>
    </div>
  </section>
</template>

<style scoped>
.professional-history {
  border-block-start: 1px solid var(--color-border);
}

.professional-history__header {
  display: grid;
  grid-template-columns: minmax(10rem, 0.38fr) minmax(0, 1fr);
  gap: clamp(var(--space-8), 7vw, var(--space-20));
  align-items: start;
}

.professional-history__label,
.education__label {
  color: var(--color-accent);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.professional-history h2 {
  max-inline-size: 38rem;
  font-size: var(--font-size-3xl);
  line-height: var(--line-height-tight);
  letter-spacing: -0.035em;
  text-wrap: balance;
}

.experience-record {
  margin-block-start: clamp(var(--space-16), 8vw, var(--space-24));
}

.experience-record__identity {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: var(--space-8);
  padding-block-end: var(--space-8);
  border-block-end: 1px solid var(--color-border);
}

.experience-record h3 {
  max-inline-size: 42rem;
  font-size: clamp(2rem, 4vw, 4rem);
  font-weight: var(--font-weight-semibold);
  line-height: 1;
  letter-spacing: -0.04em;
}

.experience-record__role {
  margin-block-start: var(--space-4);
  color: var(--color-text-secondary);
  font-size: var(--font-size-xl);
}

.experience-record__metadata {
  display: grid;
  align-content: start;
  gap: var(--space-2);
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
  font-variant-numeric: tabular-nums;
  text-align: end;
}

.experience-record__metadata p:first-child {
  color: var(--color-text-primary);
  font-weight: var(--font-weight-semibold);
}

.experience-record__description {
  max-inline-size: 50rem;
  margin-block-start: var(--space-8);
  color: var(--color-text-secondary);
  font-size: var(--font-size-lg);
  line-height: 1.7;
}

.contribution-groups {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  margin-block-start: clamp(var(--space-12), 6vw, var(--space-16));
  border-block: 1px solid var(--color-border);
}

.contribution-group {
  padding-block: var(--space-8);
  padding-inline-end: var(--space-8);
}

.contribution-group + .contribution-group {
  padding-inline-start: var(--space-8);
  border-inline-start: 1px solid var(--color-border);
}

.contribution-group h4 {
  font-size: var(--font-size-lg);
  line-height: var(--line-height-heading);
}

.contribution-group p {
  margin-block-start: var(--space-4);
  color: var(--color-text-secondary);
}

.experience-record__footer {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-8);
  margin-block-start: var(--space-8);
}

.experience-record__technologies {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  list-style: none;
}

.experience-record__technologies li {
  padding: var(--space-2) var(--space-3);
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-pill);
}

.experience-record__cta {
  display: inline-flex;
  min-block-size: 3rem;
  align-items: center;
  gap: var(--space-3);
  color: var(--color-text-primary);
  font-weight: var(--font-weight-semibold);
  text-decoration-color: var(--color-accent);
  text-underline-offset: 0.35em;
}

.experience-record__cta:hover {
  color: var(--color-accent-interactive);
}

.experience-record__cta svg {
  width: 1.2rem;
  fill: none;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 1.7;
}

.education {
  display: grid;
  grid-template-columns: minmax(10rem, 0.38fr) minmax(15rem, 0.8fr) minmax(
      15rem,
      0.7fr
    );
  gap: clamp(var(--space-6), 5vw, var(--space-12));
  align-items: start;
  padding-block-start: var(--space-10);
  margin-block-start: clamp(var(--space-16), 8vw, var(--space-24));
  border-block-start: 1px solid var(--color-border);
}

.education__label {
  color: var(--color-text-muted);
}

.education h3 {
  font-size: var(--font-size-xl);
}

.education__content p,
.education__status {
  margin-block-start: var(--space-2);
  color: var(--color-text-secondary);
}

.education__status {
  margin-block-start: 0;
}

@media (width < 58rem) {
  .contribution-groups {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .contribution-group:nth-child(3) {
    grid-column: 1 / -1;
    padding-inline-start: 0;
    border-block-start: 1px solid var(--color-border);
    border-inline-start: 0;
  }

  .education {
    grid-template-columns: minmax(9rem, 0.4fr) minmax(0, 1fr);
  }

  .education__status {
    grid-column: 2;
  }
}

@media (width < 42rem) {
  .professional-history__header,
  .experience-record__identity,
  .education {
    grid-template-columns: minmax(0, 1fr);
  }

  .experience-record__metadata {
    text-align: start;
  }

  .contribution-groups {
    grid-template-columns: minmax(0, 1fr);
  }

  .contribution-group,
  .contribution-group + .contribution-group,
  .contribution-group:nth-child(3) {
    grid-column: auto;
    padding-inline: 0;
    border-block-start: 1px solid var(--color-border);
    border-inline-start: 0;
  }

  .contribution-group:first-child {
    border-block-start: 0;
  }

  .experience-record__footer {
    align-items: flex-start;
  }

  .education__status {
    grid-column: auto;
  }
}
</style>
