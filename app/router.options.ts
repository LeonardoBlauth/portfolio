import type { RouterConfig } from '@nuxt/schema'

const localePrefix = /^\/pt(?=\/|$)/

const withoutLocalePrefix = (path: string) => {
  const stripped = path.replace(localePrefix, '')
  return stripped === '' ? '/' : stripped
}

export default {
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition

    const isLocaleSwitch =
      from.matched.length > 0 &&
      withoutLocalePrefix(to.path) === withoutLocalePrefix(from.path)

    if (isLocaleSwitch) return false

    if (to.hash) {
      const scrollPadding = Number.parseFloat(
        getComputedStyle(document.documentElement).scrollPaddingBlockStart,
      )

      return {
        el: to.hash,
        top: Number.isFinite(scrollPadding) ? scrollPadding : 0,
      }
    }

    return { top: 0 }
  },
} satisfies RouterConfig
