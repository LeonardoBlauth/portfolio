import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'

import App from '~/app.vue'

describe('Selected project presentation', () => {
  it.each([
    [
      '/',
      'Projetos selecionados',
      'Projetos e soluções que desenvolvo.',
      'Projeto pessoal',
      'SaaS B2B',
      'Em prototipação',
      'Produto e experiência',
      'Escopo atual',
      'Produto · Fluxos · Arquitetura de telas · UI/UX · Prototipação',
      'Ver estudo de caso',
      'Representação do protótipo · dados demonstrativos',
      '/projetos/movune',
    ],
    [
      '/en',
      'Selected projects',
      'Projects and solutions I develop.',
      'Personal project',
      'B2B SaaS',
      'In prototyping',
      'Product and experience',
      'Current scope',
      'Product · Flows · Screen architecture · UI/UX · Prototyping',
      'View case study',
      'Prototype representation · demo data',
      '/en/projects/movune',
    ],
  ])(
    'renders the approved movune presentation at %s',
    async (
      route,
      label,
      headline,
      type,
      productType,
      status,
      classification,
      scopeLabel,
      scope,
      cta,
      representationNote,
      caseRoute,
    ) => {
      const wrapper = await mountSuspended(App, { route })
      const section = wrapper.get('section#projects')
      const identifier = section.get('.selected-project__identifier')

      expect(section.get('.selected-projects__label').text()).toBe(label)
      expect(section.get('h2').text()).toBe(headline)
      expect(identifier.text()).toContain('01')
      expect(identifier.text()).toContain(type)
      expect(identifier.text()).toContain(productType)
      expect(section.text()).toContain(status)
      expect(section.text()).toContain(classification)
      expect(section.text()).toContain(scopeLabel)
      expect(section.text()).toContain(scope)
      expect(section.get('.project-preview__note').text()).toBe(
        representationNote,
      )
      expect(section.get(`a[href="${caseRoute}"]`).text()).toContain(cta)
      expect(section.findAll('[data-project-id="movune"]')).toHaveLength(1)
    },
  )

  it('keeps the demonstrative interface out of the accessibility tree', async () => {
    const wrapper = await mountSuspended(App, { route: '/' })
    const section = wrapper.get('section#projects')

    expect(
      section.get('.project-preview__interface').attributes('aria-hidden'),
    ).toBe('true')
    expect(section.text()).toContain('dados demonstrativos')
  })
})
