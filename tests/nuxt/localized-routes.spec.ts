import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'

import App from '~/app.vue'

describe('localized routes', () => {
  it.each([
    ['/', 'pt-BR', 'Portfolio'],
    ['/en', 'en', 'Portfolio'],
    ['/projetos/movune', 'pt-BR', 'movune'],
    ['/en/projects/movune', 'en', 'movune'],
  ])('renders %s in %s', async (route, locale, heading) => {
    const wrapper = await mountSuspended(App, { route })

    expect(wrapper.get('h1').text()).toBe(heading)
    expect(wrapper.get('main').attributes('data-locale')).toBe(locale)
  })
})
