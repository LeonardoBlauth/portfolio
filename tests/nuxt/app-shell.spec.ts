import { mountSuspended } from '@nuxt/test-utils/runtime'
import { flushPromises } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import App from '~/app.vue'
import { LOCALE_STORAGE_KEY } from '~/utils/locale'
import { THEME_STORAGE_KEY } from '~/utils/theme'

const installDialogBehavior = () => {
  vi.spyOn(HTMLDialogElement.prototype, 'showModal').mockImplementation(
    function (this: HTMLDialogElement) {
      this.setAttribute('open', '')
    },
  )
  vi.spyOn(HTMLDialogElement.prototype, 'close').mockImplementation(function (
    this: HTMLDialogElement,
  ) {
    this.removeAttribute('open')
    this.dispatchEvent(new Event('close'))
  })
}

describe('application shell', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.restoreAllMocks()
    installDialogBehavior()
  })

  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('renders semantic links within the integrated desktop navigation', async () => {
    const wrapper = await mountSuspended(App, {
      route: '/',
      attachTo: document.body,
    })

    expect(wrapper.get('header')).toBeTruthy()
    expect(wrapper.get('nav[aria-label="Navegação principal"]')).toBeTruthy()
    expect(wrapper.get('[data-liquid-glass]')).toBeTruthy()
    expect(wrapper.get('[data-morphing-tabs]')).toBeTruthy()
    const morphingIndicator = wrapper.get('[data-morphing-indicator]')
    expect(morphingIndicator.attributes('data-indicator-kind')).toBe(
      'underline',
    )
    expect(wrapper.get('main#main-content')).toBeTruthy()
    const homeControl = wrapper.get('button[aria-label="Ir para o início"]')
    expect(homeControl.attributes('aria-controls')).toBe('top')
    expect(wrapper.find('a[aria-label="Ir para o início"]').exists()).toBe(
      false,
    )

    const destinations = ['projects', 'experience', 'stack', 'contact']
    for (const destination of destinations) {
      expect(wrapper.get(`a[href="/#${destination}"]`)).toBeTruthy()
      expect(wrapper.get(`#${destination}`)).toBeTruthy()
    }

    wrapper.unmount()
  })

  it('maps section and locale links to equivalent English routes', async () => {
    const wrapper = await mountSuspended(App, {
      route: '/en/projects/movune',
      attachTo: document.body,
    })

    expect(wrapper.find('a[href="/en"]').exists()).toBe(true)
    expect(wrapper.find('a[href="/en#projects"]').exists()).toBe(false)
    expect(
      wrapper.get('a[aria-label="Go to the top"]').attributes('href'),
    ).toBe('/en')
    expect(wrapper.find('a[href="/en#top"]').exists()).toBe(false)
    const localeControl = wrapper.get(
      'a[aria-label="Switch language to português"]',
    )
    expect(localeControl.attributes('href')).toBe('/projetos/movune')

    await localeControl.trigger('click')
    expect(localStorage.getItem(LOCALE_STORAGE_KEY)).toBe('pt-BR')
    wrapper.unmount()
  })

  it('uses the existing theme infrastructure from the Header control', async () => {
    localStorage.setItem(THEME_STORAGE_KEY, 'dark')
    const wrapper = await mountSuspended(App, {
      route: '/',
      attachTo: document.body,
    })
    const themeControl = wrapper.get(
      'button:has(.site-header__theme-label--light)',
    )
    const expectedTheme =
      document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'

    await themeControl.trigger('click')

    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe(expectedTheme)
    expect(document.documentElement.dataset.theme).toBe(expectedTheme)
    wrapper.unmount()
  })

  it('closes the mobile menu on Escape and restores focus', async () => {
    const wrapper = await mountSuspended(App, {
      route: '/',
      attachTo: document.body,
    })
    const trigger = wrapper.get('[data-testid="mobile-menu-trigger"]')

    await trigger.trigger('click')
    await flushPromises()

    const dialog = wrapper.get('dialog')
    expect(dialog.attributes('open')).toBeDefined()
    expect(trigger.attributes('aria-expanded')).toBe('true')

    await dialog.trigger('keydown', { key: 'Escape' })
    await flushPromises()

    expect(dialog.attributes('open')).toBeUndefined()
    expect(trigger.attributes('aria-expanded')).toBe('false')
    expect(document.activeElement).toBe(trigger.element)
    wrapper.unmount()
  })

  it('contains focus in the open mobile menu and closes after selection', async () => {
    const wrapper = await mountSuspended(App, {
      route: '/',
      attachTo: document.body,
    })
    const trigger = wrapper.get('[data-testid="mobile-menu-trigger"]')
    await trigger.trigger('click')
    await flushPromises()

    const dialog = wrapper.get('dialog')
    const focusable = dialog.findAll<HTMLElement>('a, button')
    const first = focusable[0]!
    const last = focusable.at(-1)!

    first.element.focus()
    await dialog.trigger('keydown', { key: 'Tab', shiftKey: true })
    expect(document.activeElement).toBe(last.element)

    last.element.focus()
    await dialog.trigger('keydown', { key: 'Tab' })
    expect(document.activeElement).toBe(first.element)

    await dialog.get('button[aria-controls="projects"]').trigger('click')
    await flushPromises()
    expect(dialog.attributes('open')).toBeUndefined()
    wrapper.unmount()
  })
})
