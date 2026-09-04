import { beforeEach, describe, expect, it, vi } from 'vitest'

import {
  LOCALE_STORAGE_KEY,
  readLocalePreference,
  writeLocalePreference,
} from '~/utils/locale'

describe('manual locale preference', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.restoreAllMocks()
  })

  it('persists only supported explicit locale choices', () => {
    writeLocalePreference('en')
    expect(localStorage.getItem(LOCALE_STORAGE_KEY)).toBe('en')
    expect(readLocalePreference()).toBe('en')

    localStorage.setItem(LOCALE_STORAGE_KEY, 'unsupported')
    expect(readLocalePreference()).toBeNull()
  })

  it('fails safely when storage is unavailable', () => {
    vi.spyOn(window.localStorage, 'setItem').mockImplementation(() => {
      throw new Error('storage unavailable')
    })
    vi.spyOn(window.localStorage, 'getItem').mockImplementation(() => {
      throw new Error('storage unavailable')
    })

    expect(() => writeLocalePreference('pt')).not.toThrow()
    expect(readLocalePreference()).toBeNull()
  })
})
