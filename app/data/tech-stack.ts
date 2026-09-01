import { technologyLogoSources } from '~/data/technology-logos'

export const technologyCategories = [
  {
    id: 'core',
    technologies: ['vue', 'javascript-typescript', 'laravel', 'php', 'mysql'],
  },
  {
    id: 'additional',
    technologies: ['node', 'python', 'git', 'linux', 'docker'],
  },
  {
    id: 'exploring',
    technologies: [
      'ai-assisted-development',
      'ai-agents',
      'postgresql',
      'redis',
      'real-time-applications',
    ],
  },
] as const

export const technologyLogos = [
  {
    id: 'vue',
    name: 'Vue.js',
    src: technologyLogoSources['Vue.js'],
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    src: technologyLogoSources.TypeScript,
  },
  {
    id: 'laravel',
    name: 'Laravel',
    src: technologyLogoSources.Laravel,
  },
  {
    id: 'php',
    name: 'PHP',
    src: technologyLogoSources.PHP,
  },
  {
    id: 'mysql',
    name: 'MySQL',
    src: technologyLogoSources.MySQL,
  },
  {
    id: 'git',
    name: 'Git',
    src: technologyLogoSources.Git,
  },
  {
    id: 'docker',
    name: 'Docker',
    src: technologyLogoSources.Docker,
  },
] as const
