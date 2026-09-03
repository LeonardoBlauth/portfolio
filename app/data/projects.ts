import type { ProjectSummary } from '~/types/project'

export const selectedProjects: readonly ProjectSummary[] = [
  {
    slug: 'movune',
    route: 'movune',
    status: 'prototyping',
    messageKey: 'selectedProjects.movune',
    categoryKeys: ['saasB2b'],
    visual: {
      type: 'screenshot',
      src: '/images/projects/movune/dashboard-light.png',
      width: 2397,
      height: 1352,
      altKey: 'visualAlt',
    },
  },
  {
    slug: 'rigset',
    route: 'rigset',
    status: 'planned',
    messageKey: 'selectedProjects.rigset',
    hasMaturityNote: true,
    categoryKeys: ['developerTool', 'openSource'],
    visual: {
      type: 'concept-image',
      src: '/images/projects/rigset/home-concept.png',
      width: 1672,
      height: 941,
      altKey: 'visualAlt',
      captionKey: 'caption',
    },
  },
  {
    slug: 'overtime-automation',
    route: 'overtimeAutomation',
    status: 'concept',
    messageKey: 'selectedProjects.overtimeAutomation',
    hasMaturityNote: true,
    categoryKeys: ['automation', 'whatsapp'],
    visual: {
      type: 'diagram',
      altKey: 'visualAlt',
    },
  },
] as const
