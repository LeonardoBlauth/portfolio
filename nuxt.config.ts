import { localizedRoutes } from './app/data/localized-routes'

export default defineNuxtConfig({
  compatibilityDate: '2026-08-19',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@nuxtjs/i18n'],
  nitro: {
    prerender: {
      routes: Object.values(localizedRoutes).flatMap((route) =>
        Object.values(route.paths),
      ),
    },
  },
  i18n: {
    locales: [
      {
        code: 'pt-BR',
        language: 'pt-BR',
        file: 'pt-BR.json',
        name: 'Português',
      },
      { code: 'en', language: 'en', file: 'en.json', name: 'English' },
    ],
    defaultLocale: 'pt-BR',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: false,
    langDir: 'locales',
    customRoutes: 'config',
    pages: {
      'projects-movune': {
        'pt-BR': '/projetos/movune',
        en: '/projects/movune',
      },
    },
  },
})
