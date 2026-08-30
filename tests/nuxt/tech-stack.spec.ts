import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'

import App from '~/app.vue'

describe('skills and tech stack', () => {
  it.each([
    {
      route: '/',
      label: 'Competências e Tech Stack',
      headline: 'O que uso no dia a dia. O que estou explorando.',
      categories: [
        {
          title: 'Stack profissional principal',
          description: 'Tecnologias utilizadas no trabalho profissional.',
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
          description:
            'Tecnologias já utilizadas ou com as quais tive contato.',
          technologies: ['Node.js', 'Python', 'Git', 'Linux', 'Docker'],
        },
        {
          title: 'Explorando atualmente',
          description:
            'Áreas de estudo e experimentação, sem apresentá-las como domínio profissional.',
          technologies: [
            'IA aplicada ao desenvolvimento',
            'Agentes de IA',
            'PostgreSQL',
            'Redis',
            'Aplicações em tempo real',
          ],
        },
      ],
    },
    {
      route: '/en',
      label: 'Skills and Tech Stack',
      headline: 'What I use day to day. What I’m exploring.',
      categories: [
        {
          title: 'Core professional stack',
          description: 'Technologies used in professional work.',
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
          description: 'Technologies I have used or had practical exposure to.',
          technologies: ['Node.js', 'Python', 'Git', 'Linux', 'Docker'],
        },
        {
          title: 'Currently exploring',
          description:
            'Topics I am studying and experimenting with, without presenting them as professional expertise.',
          technologies: [
            'AI-assisted development',
            'AI agents',
            'PostgreSQL',
            'Redis',
            'Real-time applications',
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
