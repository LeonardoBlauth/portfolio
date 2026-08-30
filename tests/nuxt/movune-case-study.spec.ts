import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'

import App from '~/app.vue'

describe('movune case study', () => {
  it.each([
    {
      route: '/projetos/movune',
      backLabel: 'Voltar para projetos',
      backRoute: '/#projects',
      headline: 'Organizando um produto complexo antes de implementar.',
      role: 'Definição de produto, fluxos, arquitetura de telas, direção de UI/UX e prototipação.',
      sections: [
        'Visão geral',
        'Processo',
        'Interface',
        'Decisões principais',
        'Estado atual',
        'Próximos passos',
      ],
      facts: [
        'agendas, pacientes, atendimentos, turmas, pacotes, finanças, documentos e comunicação',
        'Agendas individuais e em grupo',
        'Duas camadas de status',
        'A arquitetura de produção e a implementação completa ainda não foram definidas.',
        'dados demonstrativos',
        'não são capturas finais do produto',
      ],
    },
    {
      route: '/en/projects/movune',
      backLabel: 'Back to projects',
      backRoute: '/en#projects',
      headline: 'Organizing a complex product before implementation.',
      role: 'Product definition, flows, screen architecture, UI/UX direction, and prototyping.',
      sections: [
        'Overview',
        'Process',
        'Interface',
        'Key decisions',
        'Current status',
        'Next steps',
      ],
      facts: [
        'schedules, patients, appointments, classes, packages, finance, documents, and communication',
        'Individual and group schedules',
        'Two status layers',
        'Production architecture and complete implementation have not been defined yet.',
        'demo data',
        'not final product screenshots',
      ],
    },
  ])(
    'renders the approved localized case at $route',
    async ({
      route,
      backLabel,
      backRoute,
      headline,
      role,
      sections,
      facts,
    }) => {
      const wrapper = await mountSuspended(App, { route })
      const article = wrapper.get('article[data-project-id="movune"]')

      expect(article.get('h1').text()).toBe(headline)
      expect(article.get('[data-case-role]').text()).toBe(role)
      expect(article.get(`a[href="${backRoute}"]`).text()).toBe(backLabel)
      expect(article.findAll('section')).toHaveLength(6)
      expect(
        article.findAll('section h2').map((heading) => heading.text()),
      ).toEqual(sections)

      for (const fact of facts) expect(article.text()).toContain(fact)
    },
  )

  it('keeps illustrative interfaces out of the accessibility tree and labels their purpose', async () => {
    const wrapper = await mountSuspended(App, { route: '/projetos/movune' })
    const article = wrapper.get('article[data-project-id="movune"]')

    expect(article.findAll('[data-demo-interface]')).toHaveLength(2)
    for (const representation of article.findAll('[data-demo-interface]')) {
      expect(representation.attributes('aria-hidden')).toBe('true')
    }

    expect(article.findAll('[data-representation-note]')).toHaveLength(2)
  })
})
