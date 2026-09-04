import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'

import App from '~/app.vue'

describe('skills and tech stack', () => {
  it.each([
    {
      route: '/pt',
      label: 'Competências e Tech Stack',
      headline: 'O que uso no dia a dia. O que estou explorando.',
      logoLoop: {
        label: 'Tecnologias principais',
        technologies: [
          'Vue.js',
          'TypeScript',
          'Laravel',
          'PHP',
          'MySQL',
          'Git',
          'Docker',
        ],
      },
      categories: [
        {
          title: 'Stack profissional principal',
          description: 'Tecnologias que uso no dia a dia.',
          technologies: [
            'Vue.js',
            'JavaScript / TypeScript',
            'Laravel',
            'PHP',
            'MySQL',
          ],
        },
        {
          title: 'Experiência complementar',
          description: 'Tecnologias que já utilizei.',
          technologies: ['Node.js', 'Python', 'Git', 'Linux', 'Docker'],
        },
        {
          title: 'Explorando atualmente',
          description: 'Áreas que estou estudando e explorando.',
          technologies: [
            'IA aplicada ao desenvolvimento',
            'Agentes de IA',
            'PostgreSQL',
            'Redis',
          ],
        },
      ],
    },
    {
      route: '/',
      label: 'Skills and Tech Stack',
      headline: 'What I use day to day. What I’m exploring.',
      logoLoop: {
        label: 'Core technologies',
        technologies: [
          'Vue.js',
          'TypeScript',
          'Laravel',
          'PHP',
          'MySQL',
          'Git',
          'Docker',
        ],
      },
      categories: [
        {
          title: 'Core professional stack',
          description: 'Technologies I use day to day.',
          technologies: [
            'Vue.js',
            'JavaScript / TypeScript',
            'Laravel',
            'PHP',
            'MySQL',
          ],
        },
        {
          title: 'Additional experience',
          description: 'Technologies I’ve used before.',
          technologies: ['Node.js', 'Python', 'Git', 'Linux', 'Docker'],
        },
        {
          title: 'Currently exploring',
          description: 'Areas I’m studying and exploring.',
          technologies: [
            'AI-assisted development',
            'AI agents',
            'PostgreSQL',
            'Redis',
          ],
        },
      ],
    },
  ])('renders the approved semantic groups at $route', async (scenario) => {
    const wrapper = await mountSuspended(App, { route: scenario.route })
    const section = wrapper.get('section#stack')
    const groups = section.findAll('[data-technology-category]')

    expect(section.get('.tech-stack__label').text()).toBe(scenario.label)
    expect(section.get('h2').text()).toBe(scenario.headline)

    const logoLoop = section.get('[data-logo-loop]')
    expect(logoLoop.attributes('aria-label')).toBe(scenario.logoLoop.label)
    expect(
      logoLoop
        .findAll('[data-logo-loop-copy]:not([aria-hidden="true"]) img')
        .map((logo) => logo.attributes('alt')),
    ).toEqual(scenario.logoLoop.technologies)
    expect(
      logoLoop
        .findAll('[data-logo-loop-copy]:not([aria-hidden="true"]) img')
        .map((logo) => logo.attributes('src')),
    ).not.toContainEqual(expect.stringContaining('/2563EB'))

    expect(groups).toHaveLength(3)

    groups.forEach((group, index) => {
      const expected = scenario.categories[index]

      if (!expected) {
        throw new Error(`Missing expected technology category at ${index}`)
      }

      expect(group.get('h3').text()).toBe(expected.title)
      expect(group.get('.tech-stack-group__description').text()).toBe(
        expected.description,
      )
      expect(
        group.findAll('[data-technology]').map((item) => item.text()),
      ).toEqual(expected.technologies)
    })
  })
})
