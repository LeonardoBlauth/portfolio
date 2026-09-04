import { localizedRoutes } from './app/data/localized-routes'
import { createThemeInitializationScript } from './app/utils/theme'

export default defineNuxtConfig({
  compatibilityDate: '2026-08-19',
  devtools: { enabled: process.env.NUXT_DEVTOOLS !== 'false' },
  css: [
    '~/assets/styles/fonts.css',
    '~/assets/styles/tokens.css',
    '~/assets/styles/reset.css',
    '~/assets/styles/base.css',
    '~/assets/styles/utilities.css',
  ],
  app: {
    head: {
      link: [
        { rel: 'icon', href: '/brand/favicon.svg', type: 'image/svg+xml' },
        {
          rel: 'preload',
          href: '/fonts/instrument-sans-variable.woff2',
          as: 'font',
          type: 'font/woff2',
          crossorigin: 'anonymous',
        },
      ],
      meta: [{ name: 'color-scheme', content: 'dark light' }],
      script: [
        {
          innerHTML: createThemeInitializationScript(),
          tagPosition: 'head',
        },
      ],
    },
  },
  modules: ['@nuxt/eslint', '@nuxtjs/i18n'],
  build: {
    transpile: ['gsap', 'motion-v'],
  },
  nitro: {
    prerender: {
      routes: Object.values(localizedRoutes).flatMap((route) =>
        Object.values(route.paths),
      ),
    },
  },
  i18n: {
    locales: [
      { code: 'en', language: 'en', file: 'en.json', name: 'English' },
      {
        // URL prefix is `/pt`; BCP-47 language stays `pt-BR` for html[lang].
        code: 'pt',
        language: 'pt-BR',
        file: 'pt-BR.json',
        name: 'Português',
      },
    ],
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: false,
    langDir: 'locales',
    customRoutes: 'config',
    pages: {
      'projects-movune': {
        en: '/projects/movune',
        pt: '/projetos/movune',
      },
      'projects-rigset': {
        en: '/projects/rigset',
        pt: '/projetos/rigset',
      },
      'projects-overtime-automation': {
        en: '/projects/overtime-automation',
        pt: '/projetos/automacao-horas-extras',
      },
    },
  },
})
