export const THEME_ATTRIBUTE = 'data-theme'
export const THEME_STORAGE_KEY = 'portfolio-theme'
// Used only when neither a persisted choice nor a system preference is available.
export const DEFAULT_THEME = 'dark' as const

export type Theme = 'light' | 'dark'
export type ThemePreference = Theme | null

export const isTheme = (value: unknown): value is Theme =>
  value === 'light' || value === 'dark'

export const getSystemTheme = (): Theme => {
  if (
    typeof window === 'undefined' ||
    typeof window.matchMedia !== 'function'
  ) {
    return DEFAULT_THEME
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

export const readThemePreference = (): ThemePreference => {
  if (typeof window === 'undefined') {
    return null
  }

  try {
    const value = window.localStorage.getItem(THEME_STORAGE_KEY)
    return isTheme(value) ? value : null
  } catch {
    return null
  }
}

export const writeThemePreference = (theme: ThemePreference): void => {
  if (typeof window === 'undefined') {
    return
  }

  try {
    if (theme) {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme)
    } else {
      window.localStorage.removeItem(THEME_STORAGE_KEY)
    }
  } catch {
    // Storage can be unavailable in privacy-restricted browsing contexts.
  }
}

export const applyDocumentTheme = (theme: Theme): void => {
  if (typeof document === 'undefined') {
    return
  }

  document.documentElement.setAttribute(THEME_ATTRIBUTE, theme)
  document.documentElement.style.colorScheme = theme
}

export const createThemeInitializationScript = (): string =>
  `(()=>{const a=${JSON.stringify(THEME_ATTRIBUTE)},k=${JSON.stringify(THEME_STORAGE_KEY)},d=${JSON.stringify(DEFAULT_THEME)};let p=null,t=d;try{const v=window.localStorage.getItem(k);if(v==='light'||v==='dark')p=v}catch{}if(p)t=p;else try{if(typeof window.matchMedia==='function')t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}catch{}document.documentElement.setAttribute(a,t);document.documentElement.style.colorScheme=t})()`
