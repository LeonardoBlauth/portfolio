import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const generatedRoutes = [
  { file: 'index.html', lang: 'pt-BR', heading: 'Leonardo Blauth' },
  { file: 'en/index.html', lang: 'en', heading: 'Leonardo Blauth' },
  {
    file: 'projetos/movune/index.html',
    lang: 'pt-BR',
    heading: 'movune',
  },
  {
    file: 'en/projects/movune/index.html',
    lang: 'en',
    heading: 'movune',
  },
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

  const headingMatch = html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/)
  const headingText = headingMatch?.[1]
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim()

  if (headingText !== route.heading) {
    throw new Error(`${route.file} does not contain its expected heading`)
  }
}

console.log(`Verified ${generatedRoutes.length} prerendered localized routes.`)
