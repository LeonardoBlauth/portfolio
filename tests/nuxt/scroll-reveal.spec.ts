import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'

import App from '~/app.vue'

describe('scroll reveal integration', () => {
  it('reveals post-hero section blocks without wrapping the hero or footer', async () => {
    const wrapper = await mountSuspended(App, { route: '/' })

    expect(wrapper.find('#top [data-scroll-reveal]').exists()).toBe(false)
    expect(wrapper.find('footer [data-scroll-reveal]').exists()).toBe(false)
    expect(
      wrapper.get('#projects header[data-scroll-reveal="block"]'),
    ).toBeTruthy()
    expect(
      wrapper.get(
        '#projects .selected-projects__stage[data-scroll-reveal="block"]',
      ),
    ).toBeTruthy()
    expect(
      wrapper.get('#experience header[data-scroll-reveal="block"]'),
    ).toBeTruthy()
    expect(
      wrapper.get('#experience article[data-scroll-reveal="block"]'),
    ).toBeTruthy()
    expect(
      wrapper.find('#experience aside [data-scroll-reveal]').exists(),
    ).toBe(false)
    expect(
      wrapper.get('#stack header[data-scroll-reveal="block"]'),
    ).toBeTruthy()
    expect(
      wrapper.find('.tech-stack__logo-loop [data-scroll-reveal]').exists(),
    ).toBe(false)
    expect(wrapper.get('.tech-stack__logo-loop')).toBeTruthy()
    expect(
      wrapper.get('#work-approach header[data-scroll-reveal="block"]'),
    ).toBeTruthy()
    expect(
      wrapper.get(
        '#work-approach .work-approach__content[data-scroll-reveal="block"]',
      ),
    ).toBeTruthy()
    expect(wrapper.get('#contact [data-scroll-reveal="block"]')).toBeTruthy()
    expect(wrapper.get('#contact [data-spotlight-card]')).toBeTruthy()
    expect(wrapper.get('#projects h2').element.tagName).toBe('H2')
    expect(wrapper.get('#projects h2').element.parentElement?.tagName).toBe(
      'HEADER',
    )
  })
})
