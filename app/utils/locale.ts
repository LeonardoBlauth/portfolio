export const LOCALE_STORAGE_KEY = 'portfolio-locale'

export type SupportedLocale = 'pt-BR' | 'en'

export const isSupportedLocale = (value: unknown): value is SupportedLocale =>
  value === 'pt-BR' || value === 'en'

export const readLocalePreference = (): SupportedLocale | null => {
  if (typeof window === 'undefined') return null

  try {
    const value = window.localStorage.getItem(LOCALE_STORAGE_KEY)
    return isSupportedLocale(value) ? value : null
  } catch {
    return null
  }
}

export const writeLocalePreference = (locale: SupportedLocale): void => {
  if (typeof window === 'undefined') return

  try {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, locale)
  } catch {
    // Storage can be unavailable in privacy-restricted browsing contexts.
  }
}
