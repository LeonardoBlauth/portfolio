import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'

import App from '~/app.vue'

describe('work approach', () => {
  it.each([
    {
      route: '/',
      label: 'Como trabalho',
      headline: 'Contexto antes de código. Decisões que consigo explicar.',
      paragraphs: [
        'Trabalho conectando contexto de produto e execução técnica. Antes de implementar, procuro compreender o problema, as restrições e o impacto de cada decisão no restante da aplicação.',
        'Utilizo IA como ferramenta para pesquisar, estruturar, revisar e acelerar partes do trabalho, mantendo as decisões e o código dentro do que consigo explicar e sustentar.',
      ],
      principles: [
        'Entender antes de construir',
        'Decidir com clareza',
        'Evoluir de forma incremental',
      ],
    },
    {
      route: '/en',
      label: 'How I work',
      headline: 'Context before code. Decisions I can explain.',
      paragraphs: [
        'I connect product context with technical execution. Before implementing, I aim to understand the problem, its constraints, and how each decision affects the rest of the application.',
        'I use AI as a tool to research, structure, review, and accelerate parts of the work, while keeping decisions and code within what I can explain and stand behind.',
      ],
      principles: [
        'Understand before building',
        'Make clear decisions',
        'Evolve incrementally',
      ],
    },
  ])(
    'renders the approved content and reading order at $route',
    async (copy) => {
      const wrapper = await mountSuspended(App, { route: copy.route })
      const section = wrapper.get('section#work-approach')

      expect(section.get('.work-approach__label').text()).toBe(copy.label)
      expect(section.get('h2').text()).toBe(copy.headline)
      expect(
        section
          .findAll('.work-approach__copy > p')
          .map((paragraph) => paragraph.text()),
      ).toEqual(copy.paragraphs)
      expect(
        section
          .findAll('[data-work-principle]')
          .map((item) => item.get('strong').text()),
      ).toEqual(copy.principles)
      expect(section.text()).not.toContain('movune')
      expect(section.text()).not.toContain('Universidade Positivo')
    },
  )
})
