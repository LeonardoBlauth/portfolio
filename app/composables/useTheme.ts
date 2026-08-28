import type { Theme } from '~/utils/theme'
import {
  DEFAULT_THEME,
  applyDocumentTheme,
  getSystemTheme,
  readThemePreference,
  writeThemePreference,
} from '~/utils/theme'

export const useTheme = () => {
  const explicitPreference = useState<Theme | null>(
    'theme:explicit-preference',
    () => null,
  )
  const systemTheme = useState<Theme>('theme:system-preference', () =>
    getSystemTheme(),
  )
  const initialized = useState('theme:initialized', () => false)

  const resolvedTheme = computed(
    () => explicitPreference.value ?? systemTheme.value ?? DEFAULT_THEME,
  )

  const syncDocument = () => applyDocumentTheme(resolvedTheme.value)

  const setTheme = (theme: Theme) => {
    explicitPreference.value = theme
    writeThemePreference(theme)
    syncDocument()
  }

  const clearThemePreference = () => {
    explicitPreference.value = null
    systemTheme.value = getSystemTheme()
    writeThemePreference(null)
    syncDocument()
  }

  const initializeTheme = () => {
    if (!import.meta.client || initialized.value) {
      return
    }

    explicitPreference.value = readThemePreference()
    systemTheme.value = getSystemTheme()
    syncDocument()

    if (typeof window.matchMedia === 'function') {
      const colorScheme = window.matchMedia('(prefers-color-scheme: dark)')
      colorScheme.addEventListener('change', (event) => {
        systemTheme.value = event.matches ? 'dark' : 'light'

        if (!explicitPreference.value) {
          syncDocument()
        }
      })
    }

    initialized.value = true
  }

  return {
    explicitPreference: readonly(explicitPreference),
    resolvedTheme: readonly(resolvedTheme),
    setTheme,
    clearThemePreference,
    initializeTheme,
  }
}
