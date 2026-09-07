import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'

import App from '~/app.vue'

describe('project external links', () => {
  it.each([
    [
      '/projects/movune',
      'View repository',
      'https://github.com/LeonardoBlauth/movune',
    ],
    [
      '/pt/projetos/movune',
      'Ver repositório',
      'https://github.com/LeonardoBlauth/movune',
    ],
  ])(
    'renders the localized public repository link for %s',
    async (route, label, href) => {
      const wrapper = await mountSuspended(App, { route })
      const link = wrapper.get('[data-case-external-links] a')

      expect(link.text()).toBe(label)
      expect(link.attributes('href')).toBe(href)
      expect(link.attributes('target')).toBe('_blank')
      expect(link.attributes('rel')).toBe('noopener noreferrer')
      expect(link.find('svg').attributes('aria-hidden')).toBe('true')
    },
  )

  it.each([
    '/',
    '/pt',
    '/projects/rigset',
    '/projects/eligent',
    '/pt/projetos/rigset',
    '/pt/projetos/eligent',
  ])('does not render an external-link CTA for %s', async (route) => {
    const wrapper = await mountSuspended(App, { route })

    expect(wrapper.find('[data-case-external-links]').exists()).toBe(false)
  })
})
