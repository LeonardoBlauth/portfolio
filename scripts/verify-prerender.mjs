import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const generatedRoutes = [
  { file: 'index.html', lang: 'en', heading: 'Leonardo Blauth' },
  { file: 'pt/index.html', lang: 'pt-BR', heading: 'Leonardo Blauth' },
  {
    file: 'projects/movune/index.html',
    lang: 'en',
    heading: 'Organizing a complex product before implementation.',
  },
  {
    file: 'pt/projetos/movune/index.html',
    lang: 'pt-BR',
    heading: 'Organizando um produto complexo antes de implementar.',
  },
  {
    file: 'projects/rigset/index.html',
    lang: 'en',
    heading: 'Configure and manage your workstation, your way.',
  },
  {
    file: 'pt/projetos/rigset/index.html',
    lang: 'pt-BR',
    heading: 'Configure e gerencie sua workstation do seu jeito.',
  },
  {
    file: 'projects/overtime-automation/index.html',
    lang: 'en',
    heading: 'Reply fast, without accepting what does not fit the schedule.',
  },
  {
    file: 'pt/projetos/automacao-horas-extras/index.html',
    lang: 'pt-BR',
    heading: 'Responder rápido, sem aceitar o que não cabe na escala.',
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
}

for (const route of generatedRoutes) {
  const outputPath = resolve('.output/public', route.file)
  const html = await readFile(outputPath, 'utf8')

  const languagePattern = new RegExp(
    `<html\\b[^>]*\\blang=["']${route.lang}["']`,
  )

  if (!languagePattern.test(html)) {
    throw new Error(`${route.file} does not declare lang=${route.lang}`)
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

console.log(`Verified ${generatedRoutes.length} prerendered localized routes.`)
