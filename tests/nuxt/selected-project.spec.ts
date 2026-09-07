import { mountSuspended } from '@nuxt/test-utils/runtime'
import { afterEach, describe, expect, it } from 'vitest'

import App from '~/app.vue'
import { resetProjectCarouselState } from '~/composables/useProjectCarouselState'

describe('Selected project presentation', () => {
  afterEach(() => {
    resetProjectCarouselState()
  })
  it.each([
    [
      '/pt',
      'Projetos selecionados',
      'Projetos e soluções que desenvolvo.',
      'movune',
      'SaaS B2B',
      'Em prototipação',
      'Ver estudo de caso →',
      '/pt/projetos/movune',
      'RIGSET',
      'Explorar planejamento →',
      '/pt/projetos/rigset',
      'Eligent',
      'Explorar validação técnica →',
      '/pt/projetos/eligent',
    ],
    [
      '/',
      'Selected projects',
      'Projects and solutions I develop.',
      'movune',
      'B2B SaaS',
      'In prototyping',
      'View case study →',
      '/projects/movune',
      'RIGSET',
      'Explore the plan →',
      '/projects/rigset',
      'Eligent',
      'Explore technical validation →',
      '/projects/eligent',
    ],
  ])(
    'renders the approved project carousel at %s',
    async (
      route,
      label,
      headline,
      movuneName,
      movuneCategory,
      movuneStatus,
      movuneCta,
      movuneRoute,
      rigsetName,
      rigsetCta,
      rigsetRoute,
      eligentName,
      eligentCta,
      eligentRoute,
    ) => {
      const wrapper = await mountSuspended(App, { route })
      const section = wrapper.get('section#projects')

      expect(section.get('.selected-projects__label').text()).toBe(label)
      expect(section.get('h2').text()).toBe(headline)
      expect(section.text()).toContain(movuneName)
      expect(section.text()).toContain(movuneCategory)
      expect(section.text()).toContain(movuneStatus)
      expect(
        section.get(`a.project-showcase__cta[href="${movuneRoute}"]`).text(),
      ).toBe(movuneCta)
      expect(
        section
          .find(`a.project-showcase__visual-link[href="${movuneRoute}"]`)
          .exists(),
      ).toBe(true)
      expect(section.text()).toContain(rigsetName)
      expect(
        section.get(`a.project-showcase__cta[href="${rigsetRoute}"]`).text(),
      ).toBe(rigsetCta)
      expect(
        section
          .find(`a.project-showcase__visual-link[href="${rigsetRoute}"]`)
          .exists(),
      ).toBe(true)
      expect(section.text()).toContain(eligentName)
      expect(
        section.get(`a.project-showcase__cta[href="${eligentRoute}"]`).text(),
      ).toBe(eligentCta)
      expect(
        section
          .find(`a.project-showcase__visual-link[href="${eligentRoute}"]`)
          .exists(),
      ).toBe(true)
      expect(section.findAll('[data-project-id]')).toHaveLength(3)
      expect(section.findAll('.project-visual-slot')).toHaveLength(3)
      expect(
        section
          .get('[data-project-id="movune"] .project-visual-slot')
          .attributes('data-visual-type'),
      ).toBe('screenshot')
      expect(
        section
          .get('[data-project-id="rigset"] .project-visual-slot')
          .attributes('data-visual-type'),
      ).toBe('concept-image')
      expect(
        section
          .get('[data-project-id="eligent"] .project-visual-slot')
          .attributes('data-visual-type'),
      ).toBe('diagram')
    },
  )

  it('keeps carousel controls semantic and disables previous on the first slide', async () => {
    const wrapper = await mountSuspended(App, { route: '/pt' })
    const section = wrapper.get('section#projects')
    const previous = section.get('button[aria-label="Projeto anterior"]')
    const next = section.get('button[aria-label="Próximo projeto"]')

    expect(previous.attributes('disabled')).toBeDefined()
    expect(next.attributes('disabled')).toBeUndefined()
    expect(section.text()).toContain('01 / 03')
  })

  it('defers non-hero project visuals from the initial page load', async () => {
    const wrapper = await mountSuspended(App, { route: '/' })
    const visuals = wrapper.findAll('.project-showcase__figure img')

    expect(visuals).toHaveLength(2)
    for (const visual of visuals) {
      expect(visual.attributes('loading')).toBe('lazy')
    }
  })

  it.each([
    [
      '/',
      'Technical validation',
      'Decision support for time-sensitive opportunities, based on availability and user rules.',
    ],
    [
      '/pt',
      'Validação técnica',
      'Suporte à decisão para oportunidades sensíveis ao tempo, com base na disponibilidade e nas regras do usuário.',
    ],
  ])('keeps the Eligent card compact at %s', async (route, status, summary) => {
    const wrapper = await mountSuspended(App, { route })
    const card = wrapper.get('[data-project-id="eligent"]')

    expect(card.get('h3').text()).toBe('Eligent')
    expect(card.text()).toContain(status)
    expect(card.text()).toContain(summary)
    expect(card.text()).not.toContain('Android')
    expect(card.text()).not.toContain('selectedProjects.status.')
  })

  it.each([
    [
      '/pt',
      [
        'HE · PAINEL',
        'HOJE · 19H–23H',
        'DISPONIBILIDADE',
        'REGRAS',
        'COMPATÍVEL',
      ],
    ],
    [
      '/',
      [
        'OVERTIME OPPORTUNITY',
        'TODAY · 7PM–11PM',
        'AVAILABILITY',
        'RULES',
        'COMPATIBLE',
      ],
    ],
  ])(
    'localizes the Eligent opportunity assessment scene at %s',
    async (route, labels) => {
      const wrapper = await mountSuspended(App, { route })
      const visual = wrapper.get(
        '[data-project-id="eligent"] .eligent-home-signal',
      )

      for (const label of labels) expect(visual.text()).toContain(label)
    },
  )
})
