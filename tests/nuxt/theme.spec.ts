import { mountSuspended } from '@nuxt/test-utils/runtime'
import { defineComponent, nextTick } from 'vue'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import {
  DEFAULT_THEME,
  THEME_ATTRIBUTE,
  THEME_STORAGE_KEY,
  createThemeInitializationScript,
} from '~/utils/theme'
import { useTheme } from '~/composables/useTheme'

type ThemeChangeListener = (event: MediaQueryListEvent) => void

const createSystemTheme = (initiallyDark: boolean) => {
  let matches = initiallyDark
  const listeners = new Set<ThemeChangeListener>()

  const mediaQuery = {
    get matches() {
      return matches
    },
    media: '(prefers-color-scheme: dark)',
    onchange: null,
    addEventListener: vi.fn((_type: string, listener: EventListener) => {
      listeners.add(listener as ThemeChangeListener)
    }),
    removeEventListener: vi.fn((_type: string, listener: EventListener) => {
      listeners.delete(listener as ThemeChangeListener)
    }),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  } as unknown as MediaQueryList

  return {
    mediaQuery,
    setDark(value: boolean) {
      matches = value
      const event = { matches: value } as MediaQueryListEvent
      listeners.forEach((listener) => listener(event))
    },
  }
}

const ThemeProbe = defineComponent({
  setup() {
    const theme = useTheme()
    theme.initializeTheme()

    return theme
  },
  template: '<div :data-resolved-theme="resolvedTheme" />',
})

describe('theme behavior', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.removeAttribute(THEME_ATTRIBUTE)
    clearNuxtState()
    vi.restoreAllMocks()
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('uses and applies an explicit persisted preference before the system theme', async () => {
    const system = createSystemTheme(false)
    vi.stubGlobal(
      'matchMedia',
      vi.fn(() => system.mediaQuery),
    )
    localStorage.setItem(THEME_STORAGE_KEY, 'dark')

    const wrapper = await mountSuspended(ThemeProbe)

    expect(wrapper.attributes('data-resolved-theme')).toBe('dark')
    expect(document.documentElement.getAttribute(THEME_ATTRIBUTE)).toBe('dark')
  })

  it('uses the system preference when no explicit preference exists', async () => {
    const system = createSystemTheme(true)
    vi.stubGlobal(
      'matchMedia',
      vi.fn(() => system.mediaQuery),
    )

    const wrapper = await mountSuspended(ThemeProbe)

    expect(wrapper.attributes('data-resolved-theme')).toBe('dark')
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBeNull()
  })

  it('persists an explicit choice and synchronizes the document attribute', async () => {
    const system = createSystemTheme(true)
    vi.stubGlobal(
      'matchMedia',
      vi.fn(() => system.mediaQuery),
    )
    const wrapper = await mountSuspended(ThemeProbe)

    wrapper.vm.setTheme('light')
    await nextTick()

    expect(wrapper.attributes('data-resolved-theme')).toBe('light')
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('light')
    expect(document.documentElement.getAttribute(THEME_ATTRIBUTE)).toBe('light')
  })

  it('tracks system changes only while no explicit preference exists', async () => {
    const system = createSystemTheme(false)
    vi.stubGlobal(
      'matchMedia',
      vi.fn(() => system.mediaQuery),
    )
    const wrapper = await mountSuspended(ThemeProbe)

    system.setDark(true)
    await nextTick()
    expect(wrapper.attributes('data-resolved-theme')).toBe('dark')

    wrapper.vm.setTheme('light')
    system.setDark(false)
    system.setDark(true)
    await nextTick()
    expect(wrapper.attributes('data-resolved-theme')).toBe('light')

    wrapper.vm.clearThemePreference()
    await nextTick()
    expect(wrapper.attributes('data-resolved-theme')).toBe('dark')
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBeNull()
  })

  it('falls back safely when browser preference APIs are unavailable', async () => {
    vi.stubGlobal('matchMedia', undefined)
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('storage unavailable')
    })

    const wrapper = await mountSuspended(ThemeProbe)

    expect(wrapper.attributes('data-resolved-theme')).toBe(DEFAULT_THEME)
    expect(document.documentElement.getAttribute(THEME_ATTRIBUTE)).toBe(
      DEFAULT_THEME,
    )
  })

  it.each([
    { stored: 'light', systemDark: true, expected: 'light' },
    { stored: 'dark', systemDark: false, expected: 'dark' },
    { stored: null, systemDark: true, expected: 'dark' },
    { stored: null, systemDark: false, expected: 'light' },
    { stored: 'invalid', systemDark: false, expected: 'light' },
  ])(
    'applies $expected before hydration for stored=$stored and systemDark=$systemDark',
    ({ stored, systemDark, expected }) => {
      const attributes = new Map<string, string>()
      const script = createThemeInitializationScript()
      const browserWindow = {
        localStorage: {
          getItem: vi.fn(() => stored),
        },
        matchMedia: vi.fn(() => ({ matches: systemDark })),
      }
      const browserDocument = {
        documentElement: {
          style: {},
          setAttribute: vi.fn((name: string, value: string) => {
            attributes.set(name, value)
          }),
        },
      }

      Function('window', 'document', script)(browserWindow, browserDocument)

      expect(attributes.get(THEME_ATTRIBUTE)).toBe(expected)
    },
  )
})
