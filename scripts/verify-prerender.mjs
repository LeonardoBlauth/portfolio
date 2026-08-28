import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const generatedRoutes = [
  { file: 'index.html', lang: 'pt-BR', heading: 'Portfolio' },
  { file: 'en/index.html', lang: 'en', heading: 'Portfolio' },
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

  if (!html.includes(`<h1>${route.heading}</h1>`)) {
    throw new Error(`${route.file} does not contain its expected heading`)
  }
}

console.log(`Verified ${generatedRoutes.length} prerendered localized routes.`)
