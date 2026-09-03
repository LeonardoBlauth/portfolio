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
  rigset: {
    name: 'rigset',
    paths: {
      'pt-BR': '/projetos/rigset',
      en: '/en/projects/rigset',
    },
  },
  overtimeAutomation: {
    name: 'overtimeAutomation',
    paths: {
      'pt-BR': '/projetos/automacao-horas-extras',
      en: '/en/projects/overtime-automation',
    },
  },
} as const satisfies Record<string, LocalizedRouteDefinition>
