import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'

import App from '~/app.vue'

describe('localized routes', () => {
  it.each([
    ['/pt', 'pt', 'Leonardo Blauth'],
    ['/', 'en', 'Leonardo Blauth'],
    [
      '/pt/projetos/movune',
      'pt',
      'Organizando um produto complexo antes de implementar.',
    ],
    [
      '/projects/movune',
      'en',
      'Organizing a complex product before implementation.',
    ],
    [
      '/pt/projetos/rigset',
      'pt',
      'Configure e gerencie sua workstation do seu jeito.',
    ],
    [
      '/projects/rigset',
      'en',
      'Configure and manage your workstation, your way.',
    ],
    [
      '/pt/projetos/eligent',
      'pt',
      'Decida rápido quando uma oportunidade fizer sentido.',
    ],
    ['/projects/eligent', 'en', 'Decide quickly when an opportunity fits.'],
  ])('renders %s in %s', async (route, locale, heading) => {
    const wrapper = await mountSuspended(App, { route })

    const pageHeading = wrapper.get('h1')
    const accessibleHeading = pageHeading.find('.visually-hidden')

    expect(
      (accessibleHeading.exists()
        ? accessibleHeading.text()
        : pageHeading.text()
      )
        .replace(/\s+/g, ' ')
        .trim(),
    ).toBe(heading)
    expect(wrapper.get('main').attributes('data-locale')).toBe(locale)
  })
})
