import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'

import App from '~/app.vue'

describe('professional history', () => {
  it.each([
    {
      route: '/',
      label: 'Experiência profissional',
      headline: 'Minha experiência como desenvolvedor.',
      period: '2021 — atual',
      location: 'Brasil',
      contributionHeadings: [
        'Produto e interfaces',
        'Integrações e automação',
        'Aplicações e dados',
      ],
      educationLabel: 'Formação acadêmica',
      program: 'Engenharia de Software',
      status: 'Em andamento · conclusão prevista em 2027',
      cta: 'Ver trajetória completa no LinkedIn',
    },
    {
      route: '/en',
      label: 'Professional experience',
      headline: 'My experience as a developer.',
      period: '2021 — present',
      location: 'Brazil',
      contributionHeadings: [
        'Product and interfaces',
        'Integrations and automation',
        'Applications and data',
      ],
      educationLabel: 'Education',
      program: 'Software Engineering',
      status: 'In progress · expected completion in 2027',
      cta: 'View full experience on LinkedIn',
    },
  ])(
    'renders the approved experience and education hierarchy at $route',
    async ({
      route,
      label,
      headline,
      period,
      location,
      contributionHeadings,
      educationLabel,
      program,
      status,
      cta,
    }) => {
      const wrapper = await mountSuspended(App, { route })
      const section = wrapper.get('section#experience')
      const experience = section.get('[data-professional-experience]')
      const education = section.get('[data-education]')

      expect(section.get('.professional-history__label').text()).toBe(label)
      expect(section.get('h2').text()).toBe(headline)
      expect(experience.text()).toContain('DealerUp Consultoria e Sistemas')
      expect(experience.text()).toContain('Full Stack Developer')
      expect(experience.text()).toContain(period)
      expect(experience.text()).toContain(location)
      expect(
        experience
          .findAll('.contribution-group h4')
          .map((heading) => heading.text()),
      ).toEqual(contributionHeadings)
      expect(experience.findAll('[data-technology]')).toHaveLength(6)

      expect(education.get('.education__label').text()).toBe(educationLabel)
      expect(education.get('h3').text()).toBe(program)
      expect(education.text()).toContain('Universidade Positivo')
      expect(education.text()).toContain(status)

      const linkedin = experience.get(
        'a[href="https://www.linkedin.com/in/leonardo-blauth"]',
      )
      expect(linkedin.text()).toContain(cta)
      expect(linkedin.attributes('target')).toBe('_blank')
      expect(linkedin.attributes('rel')).toBe('noopener noreferrer')
    },
  )

  it('keeps education semantically separate from the employment record', async () => {
    const wrapper = await mountSuspended(App, { route: '/' })
    const section = wrapper.get('section#experience')

    expect(section.findAll('[data-professional-experience]')).toHaveLength(1)
    expect(section.findAll('[data-education]')).toHaveLength(1)
    expect(
      section
        .get('[data-professional-experience]')
        .find('[data-education]')
        .exists(),
    ).toBe(false)
  })
})
