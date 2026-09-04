export const LOCALE_STORAGE_KEY = 'portfolio-locale'

export type SupportedLocale = 'en' | 'pt'

export const isSupportedLocale = (value: unknown): value is SupportedLocale =>
  value === 'en' || value === 'pt'

/** Map i18n locale codes (and legacy `pt-BR` preference) to SupportedLocale. */
export const toSupportedLocale = (value: unknown): SupportedLocale => {
  if (value === 'en') return 'en'
  return 'pt'
}

export const readLocalePreference = (): SupportedLocale | null => {
  if (typeof window === 'undefined') return null

  try {
    const value = window.localStorage.getItem(LOCALE_STORAGE_KEY)
    if (value === 'pt-BR') return 'pt'
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
