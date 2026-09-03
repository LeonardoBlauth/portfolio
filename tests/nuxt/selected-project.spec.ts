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
      '/',
      'Projetos selecionados',
      'Projetos e soluções que desenvolvo.',
      'MOVUNE',
      'SaaS B2B',
      'Em prototipação',
      'Ver estudo de caso →',
      '/projetos/movune',
      'RIGSET',
      'Explorar planejamento →',
      '/projetos/rigset',
      'AUTOMAÇÃO DE HORAS EXTRAS',
      'Explorar conceito →',
      '/projetos/automacao-horas-extras',
    ],
    [
      '/en',
      'Selected projects',
      'Projects and solutions I develop.',
      'MOVUNE',
      'B2B SaaS',
      'In prototyping',
      'View case study →',
      '/en/projects/movune',
      'RIGSET',
      'Explore the plan →',
      '/en/projects/rigset',
      'OVERTIME AUTOMATION',
      'Explore the concept →',
      '/en/projects/overtime-automation',
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
      overtimeName,
      overtimeCta,
      overtimeRoute,
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
      expect(section.text()).toContain(overtimeName)
      expect(
        section.get(`a.project-showcase__cta[href="${overtimeRoute}"]`).text(),
      ).toBe(overtimeCta)
      expect(
        section
          .find(`a.project-showcase__visual-link[href="${overtimeRoute}"]`)
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
          .get('[data-project-id="overtime-automation"] .project-visual-slot')
          .attributes('data-visual-type'),
      ).toBe('diagram')
    },
  )

  it('keeps carousel controls semantic and disables previous on the first slide', async () => {
    const wrapper = await mountSuspended(App, { route: '/' })
    const section = wrapper.get('section#projects')
    const previous = section.get('button[aria-label="Projeto anterior"]')
    const next = section.get('button[aria-label="Próximo projeto"]')

    expect(previous.attributes('disabled')).toBeDefined()
    expect(next.attributes('disabled')).toBeUndefined()
    expect(section.text()).toContain('01 / 03')
  })
})
