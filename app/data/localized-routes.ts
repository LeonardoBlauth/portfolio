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
  overtimeAutomation: {
    name: 'overtimeAutomation',
    paths: {
      en: '/projects/overtime-automation',
      pt: '/pt/projetos/automacao-horas-extras',
    },
  },
} as const satisfies Record<string, LocalizedRouteDefinition>
