import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const generatedRoutes = [
  {
    file: 'index.html',
    lang: 'en',
    heading: 'Leonardo Blauth',
    title: 'Leonardo Blauth — Full Stack Developer',
    description:
      'Portfolio of Leonardo Blauth, a product-oriented Full Stack Developer.',
    canonical: 'https://leonardoblauth.dev/',
    socialImage: '/images/social/home-en.png',
  },
  {
    file: 'pt/index.html',
    lang: 'pt-BR',
    heading: 'Leonardo Blauth',
    title: 'Leonardo Blauth — Desenvolvedor Full Stack',
    description:
      'Portfólio de Leonardo Blauth, Desenvolvedor Full Stack orientado a produto.',
    canonical: 'https://leonardoblauth.dev/pt',
    socialImage: '/images/social/home-pt.png',
  },
  {
    file: 'projects/movune/index.html',
    lang: 'en',
    heading: 'Organizing a complex product before implementation.',
    title: 'movune — Product case study | Leonardo Blauth',
    description:
      'A case study of movune, an evolving personal product in prototyping for physiotherapy and Pilates clinic management.',
    canonical: 'https://leonardoblauth.dev/projects/movune',
    socialImage: '/images/social/movune-en.png',
  },
  {
    file: 'pt/projetos/movune/index.html',
    lang: 'pt-BR',
    heading: 'Organizando um produto complexo antes de implementar.',
    title: 'movune — Case de produto | Leonardo Blauth',
    description:
      'Um case de movune, produto pessoal em evolução e em prototipação para gestão de clínicas de fisioterapia e Pilates.',
    canonical: 'https://leonardoblauth.dev/pt/projetos/movune',
    socialImage: '/images/social/movune-pt.png',
  },
  {
    file: 'projects/rigset/index.html',
    lang: 'en',
    heading: 'Configure and manage your workstation, your way.',
    title: 'Rigset — Open-source CLI concept | Leonardo Blauth',
    description:
      'A planned open-source CLI concept for declarative, secure, and predictable workstation management.',
    canonical: 'https://leonardoblauth.dev/projects/rigset',
    socialImage: '/images/social/rigset-en.png',
  },
  {
    file: 'pt/projetos/rigset/index.html',
    lang: 'pt-BR',
    heading: 'Configure e gerencie sua workstation do seu jeito.',
    title: 'Rigset — Conceito de CLI open source | Leonardo Blauth',
    description:
      'Um conceito planejado de CLI open source para gerenciar workstations de forma declarativa, segura e previsível.',
    canonical: 'https://leonardoblauth.dev/pt/projetos/rigset',
    socialImage: '/images/social/rigset-pt.png',
  },
  {
    file: 'projects/eligent/index.html',
    lang: 'en',
    heading: 'Decide quickly when an opportunity fits.',
    title: 'Eligent — Decision support system | Leonardo Blauth',
    description:
      'A decision support system that detects time-sensitive opportunities, interprets them when needed, evaluates eligibility deterministically against availability and user rules, and notifies the user quickly.',
    canonical: 'https://leonardoblauth.dev/projects/eligent',
    socialImage: '/images/social/eligent-en.png',
  },
  {
    file: 'pt/projetos/eligent/index.html',
    lang: 'pt-BR',
    heading: 'Decida rápido quando uma oportunidade fizer sentido.',
    title: 'Eligent — Sistema de suporte à decisão | Leonardo Blauth',
    description:
      'Um sistema de suporte à decisão que detecta oportunidades sensíveis ao tempo, interpreta seu conteúdo quando necessário, avalia a elegibilidade de forma determinística conforme a disponibilidade e regras do usuário e o notifica rapidamente.',
    canonical: 'https://leonardoblauth.dev/pt/projetos/eligent',
    socialImage: '/images/social/eligent-pt.png',
  },
]

const caseSections = {
  'projects/movune/index.html': [
    'Overview',
    'Process',
    'Interface',
    'Key decisions',
    'Current status',
    'Next steps',
  ],
  'pt/projetos/movune/index.html': [
    'Visão geral',
    'Processo',
    'Interface',
    'Decisões principais',
    'Estado atual',
    'Próximos passos',
  ],
  'projects/eligent/index.html': [
    'The original problem',
    'What feasibility research changed',
    'Reducing scope, preserving value',
    'A source-agnostic system',
    'Deterministic eligibility',
    'Technical validation in progress',
  ],
  'pt/projetos/eligent/index.html': [
    'O problema original',
    'O que a pesquisa de viabilidade mudou',
    'Reduzindo o escopo, preservando o valor',
    'Um sistema independente de fonte',
    'Elegibilidade determinística',
    'Validação técnica em andamento',
  ],
}

const alternateLocaleGroups = [
  ['https://leonardoblauth.dev/', 'https://leonardoblauth.dev/pt'],
  [
    'https://leonardoblauth.dev/projects/movune',
    'https://leonardoblauth.dev/pt/projetos/movune',
  ],
  [
    'https://leonardoblauth.dev/projects/rigset',
    'https://leonardoblauth.dev/pt/projetos/rigset',
  ],
  [
    'https://leonardoblauth.dev/projects/eligent',
    'https://leonardoblauth.dev/pt/projetos/eligent',
  ],
]

for (const route of generatedRoutes) {
  const outputPath = resolve('.output/public', route.file)
  const html = await readFile(outputPath, 'utf8')

  const languagePattern = new RegExp(
    `<html\\b[^>]*\\blang=["']${route.lang}["']`,
  )

  if (!languagePattern.test(html)) {
    throw new Error(`${route.file} does not declare lang=${route.lang}`)
  }

  const titleMatch = html.match(/<title>([^<]*)<\/title>/)
  if (titleMatch?.[1] !== route.title) {
    throw new Error(`${route.file} does not contain its expected title`)
  }

  const descriptionPattern = new RegExp(
    `<meta\\b[^>]*\\bname=["']description["'][^>]*\\bcontent=["']${route.description}["']`,
  )
  if (!descriptionPattern.test(html)) {
    throw new Error(`${route.file} does not contain its expected description`)
  }

  const canonicalPattern = new RegExp(
    `<link\\b[^>]*\\brel=["']canonical["'][^>]*\\bhref=["']${route.canonical}["']`,
  )
  if (!canonicalPattern.test(html)) {
    throw new Error(
      `${route.file} does not contain its self-referencing canonical URL`,
    )
  }

  const alternateLocaleGroup = alternateLocaleGroups.find((group) =>
    group.includes(route.canonical),
  )
  if (!alternateLocaleGroup) {
    throw new Error(`${route.file} does not belong to a localized route group`)
  }

  const [englishUrl, portugueseUrl] = alternateLocaleGroup
  const expectedLinks = [
    `<link rel="alternate" hreflang="en" href="${englishUrl}">`,
    `<link rel="alternate" hreflang="pt-BR" href="${portugueseUrl}">`,
    `<link rel="alternate" hreflang="x-default" href="${englishUrl}">`,
  ]
  for (const link of expectedLinks) {
    if (!html.includes(link)) {
      throw new Error(`${route.file} is missing a localized alternate link`)
    }
  }

  const socialImageUrl = `https://leonardoblauth.dev${route.socialImage}`
  if (
    !html.includes(`<meta property="og:title" content="${route.title}">`) ||
    !html.includes(`<meta property="og:image" content="${socialImageUrl}">`) ||
    !html.includes(`<meta property="og:image:width" content="1200">`) ||
    !html.includes(`<meta property="og:image:height" content="630">`) ||
    !html.includes(
      `<meta name="twitter:card" content="summary_large_image">`,
    ) ||
    !html.includes(`<meta name="twitter:image" content="${socialImageUrl}">`)
  ) {
    throw new Error(`${route.file} is missing its social metadata`)
  }

  const socialImage = await readFile(
    resolve('.output/public', route.socialImage.slice(1)),
  )
  if (
    socialImage.readUInt32BE(16) !== 1200 ||
    socialImage.readUInt32BE(20) !== 630
  ) {
    throw new Error(`${route.file} has an invalid social preview dimension`)
  }

  const headingMatch = html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/)
  const headingText = headingMatch?.[1]
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim()

  if (headingText !== route.heading) {
    throw new Error(`${route.file} does not contain its expected heading`)
  }

  const expectedSections = caseSections[route.file]
  if (expectedSections) {
    const documentText = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ')
    for (const section of expectedSections) {
      if (!documentText.includes(section)) {
        throw new Error(`${route.file} is missing the ${section} case section`)
      }
    }
  }
}

const robots = await readFile(resolve('.output/public', 'robots.txt'), 'utf8')
const expectedRobots =
  process.env.NUXT_PUBLIC_SITE_ENVIRONMENT === 'production'
    ? 'User-agent: *\nAllow: /\nSitemap: https://leonardoblauth.dev/sitemap.xml\n'
    : 'User-agent: *\nDisallow: /\n'
if (robots !== expectedRobots) {
  throw new Error('robots.txt does not match the requested build environment')
}

const sitemap = await readFile(resolve('.output/public', 'sitemap.xml'), 'utf8')
for (const route of generatedRoutes) {
  if (!sitemap.includes(`<loc>${route.canonical}</loc>`)) {
    throw new Error(`sitemap.xml is missing ${route.canonical}`)
  }
}

const headers = await readFile(resolve('.output/public', '_headers'), 'utf8')
for (const header of [
  'X-Content-Type-Options: nosniff',
  'X-Frame-Options: DENY',
  "Content-Security-Policy: default-src 'self'",
]) {
  if (!headers.includes(header)) {
    throw new Error(`_headers is missing ${header}`)
  }
}

console.log(`Verified ${generatedRoutes.length} prerendered localized routes.`)
