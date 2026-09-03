import { mountSuspended } from '@nuxt/test-utils/runtime'
import { afterEach, describe, expect, it } from 'vitest'

import App from '~/app.vue'
import {
  resetProjectCarouselState,
  useProjectCarouselState,
} from '~/composables/useProjectCarouselState'

describe('project carousel state', () => {
  afterEach(() => {
    resetProjectCarouselState()
  })

  it('maps canonical slugs to carousel indexes', async () => {
    const wrapper = await mountSuspended({
      setup() {
        const { indexFromSlug } = useProjectCarouselState()
        return {
          movune: indexFromSlug('movune'),
          rigset: indexFromSlug('rigset'),
          automation: indexFromSlug('overtime-automation'),
          unknown: indexFromSlug('missing'),
        }
      },
      template:
        '<p>{{ movune }} {{ rigset }} {{ automation }} {{ unknown }}</p>',
    })

    expect(wrapper.text()).toBe('0 1 2 0')
  })

  it('persists canonical slugs instead of translated labels', async () => {
    const wrapper = await mountSuspended({
      setup() {
        const { activeProjectSlug, setActiveProjectSlug, indexFromSlug } =
          useProjectCarouselState()
        setActiveProjectSlug('overtime-automation')
        return {
          slug: activeProjectSlug,
          index: indexFromSlug(activeProjectSlug.value),
        }
      },
      template: '<p>{{ slug }}:{{ index }}</p>',
    })

    expect(wrapper.text()).toBe('overtime-automation:2')
  })

  it('keeps the visited project selected after returning home', async () => {
    const casePage = await mountSuspended(App, { route: '/projetos/rigset' })
    casePage.get('[data-project-id="rigset"]')
    casePage.unmount()

    const home = await mountSuspended(App, { route: '/' })
    const section = home.get('section#projects')
    const previous = section.get('button[aria-label="Projeto anterior"]')

    expect(previous.attributes('disabled')).toBeUndefined()
    expect(section.text()).toContain('02 / 03')
    home.unmount()
  })
})
