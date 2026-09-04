import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'

import App from '~/app.vue'

describe('movune case study', () => {
  it.each([
    {
      route: '/projetos/movune',
      backLabel: 'Voltar para projetos',
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
        'A direção do produto está definida. A implementação vem depois.',
        'Claro e escuro como parte do mesmo sistema',
      ],
    },
    {
      route: '/en/projects/movune',
      backLabel: 'Back to projects',
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
        'The product direction is defined. Implementation comes later.',
        'Light and dark as part of the same system',
      ],
    },
  ])(
    'renders the approved localized case at $route',
    async ({ route, backLabel, headline, role, sections, facts }) => {
      const wrapper = await mountSuspended(App, { route })
      const article = wrapper.get('article[data-project-id="movune"]')

      expect(article.get('h1').text()).toBe(headline)
      expect(article.get('[data-case-role]').text()).toBe(role)
      expect(article.find('[data-case-evidence]').exists()).toBe(false)
      const backControls = article.findAll('a.case-back')
      expect(backControls).toHaveLength(2)
      expect(backControls.map((control) => control.text())).toEqual([
        backLabel,
        backLabel,
      ])
      for (const control of backControls) {
        expect(control.attributes('href')).toBe(
          route.startsWith('/en') ? '/en' : '/',
        )
      }
      expect(article.findAll('section')).toHaveLength(6)
      expect(
        article.findAll('section h2').map((heading) => heading.text()),
      ).toEqual(sections)

      for (const fact of facts) expect(article.text()).toContain(fact)
    },
  )

  it('uses real interface assets and a single light/dark compare', async () => {
    const wrapper = await mountSuspended(App, { route: '/projetos/movune' })
    const article = wrapper.get('article[data-project-id="movune"]')

    expect(article.findAll('[data-demo-interface]')).toHaveLength(0)
    expect(
      article
        .find('img[src="/images/projects/movune/schedule-light.png"]')
        .exists(),
    ).toBe(true)
    expect(
      article
        .find('img[src="/images/projects/movune/register-mobile-light.png"]')
        .exists(),
    ).toBe(true)
    expect(article.findAll('[role="slider"]')).toHaveLength(1)
    expect(article.findAll('.zoomable-image__trigger')).toHaveLength(2)
    expect(
      article.find('.theme-compare .zoomable-image__trigger').exists(),
    ).toBe(false)

    const statusSection = article
      .get('#status-heading')
      .element.closest('section')
    expect(statusSection?.querySelector('.case-status')?.textContent).toContain(
      'Em prototipação',
    )
  })
})
