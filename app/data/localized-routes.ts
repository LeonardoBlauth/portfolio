import type { LocalizedRouteDefinition } from '../types/localization'

export const localizedRoutes = {
  home: {
    name: 'home',
    paths: {
      en: '/',
      pt: '/pt',
    },
  },
  movune: {
    name: 'movune',
    paths: {
      en: '/projects/movune',
      pt: '/pt/projetos/movune',
    },
  },
  rigset: {
    name: 'rigset',
    paths: {
      en: '/projects/rigset',
      pt: '/pt/projetos/rigset',
    },
  },
  eligent: {
    name: 'eligent',
    paths: {
      en: '/projects/eligent',
      pt: '/pt/projetos/eligent',
    },
  },
} as const satisfies Record<string, LocalizedRouteDefinition>
