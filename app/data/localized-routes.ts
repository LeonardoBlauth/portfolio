import type { LocalizedRouteDefinition } from '../types/localization'

export const localizedRoutes = {
  home: {
    name: 'home',
    paths: {
      'pt-BR': '/',
      en: '/en',
    },
  },
  movune: {
    name: 'movune',
    paths: {
      'pt-BR': '/projetos/movune',
      en: '/en/projects/movune',
    },
  },
} as const satisfies Record<string, LocalizedRouteDefinition>
