import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'

import App from '~/app.vue'

describe('localized routes', () => {
  it.each([
    ['/', 'pt-BR', 'Leonardo Blauth'],
    ['/en', 'en', 'Leonardo Blauth'],
    [
      '/projetos/movune',
      'pt-BR',
      'Organizando um produto complexo antes de implementar.',
    ],
    [
      '/en/projects/movune',
      'en',
      'Organizing a complex product before implementation.',
    ],
    [
      '/projetos/rigset',
      'pt-BR',
      'Configure e gerencie sua workstation do seu jeito.',
    ],
    [
      '/en/projects/rigset',
      'en',
      'Configure and manage your workstation, your way.',
    ],
    [
      '/projetos/automacao-horas-extras',
      'pt-BR',
      'Responder rápido, sem aceitar o que não cabe na escala.',
    ],
    [
      '/en/projects/overtime-automation',
      'en',
      'Reply fast, without accepting what does not fit the schedule.',
    ],
  ])('renders %s in %s', async (route, locale, heading) => {
    const wrapper = await mountSuspended(App, { route })

    const pageHeading = wrapper.get('h1')
    const accessibleHeading = pageHeading.find('.visually-hidden')

    expect(
      accessibleHeading.exists()
        ? accessibleHeading.text()
        : pageHeading.text(),
    ).toBe(heading)
    expect(wrapper.get('main').attributes('data-locale')).toBe(locale)
  })
})
