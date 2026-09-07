import { mkdir, readFile } from 'node:fs/promises'
import { resolve } from 'node:path'

import { chromium } from '@playwright/test'

const root = process.cwd()
const outputDirectory = resolve(root, 'public/images/social')

const dataUri = async (path, mimeType) =>
  `data:${mimeType};base64,${(await readFile(resolve(root, path))).toString('base64')}`

const [font, monogram, movuneDashboard] = await Promise.all([
  dataUri('public/fonts/instrument-sans-variable.woff2', 'font/woff2'),
  dataUri('public/brand/lb-monogram-cobalt.svg', 'image/svg+xml'),
  dataUri('public/images/projects/movune/dashboard-light.png', 'image/png'),
])

const previews = [
  {
    file: 'home-en.png',
    name: 'Leonardo Blauth',
    eyebrow: 'Full Stack Developer',
    headline:
      'I build end-to-end web solutions, connecting product needs with clear technical decisions.',
    visual: 'home',
  },
  {
    file: 'home-pt.png',
    name: 'Leonardo Blauth',
    eyebrow: 'Full Stack Developer',
    headline:
      'Desenvolvo soluções web de ponta a ponta, conectando necessidades de produto a decisões técnicas claras.',
    visual: 'home',
  },
  {
    file: 'movune-en.png',
    name: 'movune',
    eyebrow: 'B2B SaaS · In prototyping',
    headline: 'A B2B SaaS for managing physiotherapy and Pilates clinics.',
    visual: 'movune',
  },
  {
    file: 'movune-pt.png',
    name: 'movune',
    eyebrow: 'SaaS B2B · Em prototipação',
    headline: 'Um SaaS B2B para gestão de clínicas de fisioterapia e Pilates.',
    visual: 'movune',
  },
  {
    file: 'rigset-en.png',
    name: 'RIGSET',
    eyebrow: 'Environment Configuration · Open Source · Planned',
    headline: 'Configure and manage your workstation, your way.',
    visual: 'rigset-en',
  },
  {
    file: 'rigset-pt.png',
    name: 'RIGSET',
    eyebrow: 'Configuração de Ambientes · Open Source · Planejado',
    headline: 'Configure e gerencie sua workstation do seu jeito.',
    visual: 'rigset-pt',
  },
  {
    file: 'eligent-en.png',
    name: 'Eligent',
    eyebrow: 'Decision Support System · Technical validation',
    headline: 'Decide quickly when an opportunity fits.',
    visual: 'eligent-en',
  },
  {
    file: 'eligent-pt.png',
    name: 'Eligent',
    eyebrow: 'Sistema de suporte à decisão · Validação técnica',
    headline: 'Decida rápido quando uma oportunidade fizer sentido.',
    visual: 'eligent-pt',
  },
]

const requestedFiles = new Set(process.argv.slice(2))
const previewsToGenerate =
  requestedFiles.size === 0
    ? previews
    : previews.filter(({ file }) => requestedFiles.has(file))

if (
  requestedFiles.size > 0 &&
  previewsToGenerate.length !== requestedFiles.size
) {
  throw new Error('One or more requested social preview files are unknown.')
}

const visuals = {
  home: `<div class="home-visual"><img src="${monogram}" alt="" /></div>`,
  movune: `<div class="movune-frame"><img src="${movuneDashboard}" alt="" /></div>`,
  'rigset-en': `
    <div class="rigset-visual"><section class="state-card state-current"><b>CURRENT STATE</b><i></i><i></i><i></i></section><span class="state-bridge"></span><section class="state-card state-desired"><b>DESIRED STATE</b><i></i><i></i><i></i></section></div>`,
  'rigset-pt': `
    <div class="rigset-visual"><section class="state-card state-current"><b>ESTADO ATUAL</b><i></i><i></i><i></i></section><span class="state-bridge"></span><section class="state-card state-desired"><b>ESTADO DESEJADO</b><i></i><i></i><i></i></section></div>`,
  'eligent-en': `
    <div class="eligent-visual"><div class="opportunity"><b>OVERTIME OPPORTUNITY</b><span>TODAY · 7PM–11PM</span></div><div class="context"><b>AVAILABILITY</b><b>RULES</b></div><div class="decision-line"><i></i><span></span><strong>COMPATIBLE</strong></div></div>`,
  'eligent-pt': `
    <div class="eligent-visual"><div class="opportunity"><b>HE · PAINEL</b><span>HOJE · 19H–23H</span></div><div class="context"><b>DISPONIBILIDADE</b><b>REGRAS</b></div><div class="decision-line"><i></i><span></span><strong>COMPATÍVEL</strong></div></div>`,
}

const html = ({ name, eyebrow, headline, visual }) => `<!doctype html>
<html><head><style>
@font-face { font-family: Instrument; src: url('${font}') format('woff2'); font-weight: 100 900; }
* { box-sizing: border-box; }
html, body { width: 1200px; height: 630px; margin: 0; overflow: hidden; }
body { background: #080a0d; color: #f5f7fa; font-family: Instrument, Arial, sans-serif; }
.canvas { position: relative; width: 1200px; height: 630px; padding: 60px 74px; overflow: hidden; background: radial-gradient(circle at 83% 52%, rgba(37,99,235,.11), transparent 27%), #080a0d; }
.canvas::after { content: ''; position: absolute; inset: 28px; border: 1px solid rgba(148,163,184,.12); pointer-events: none; }
.signature { position: absolute; top: 55px; left: 70px; width: 42px; height: 42px; }
.signature img { display: block; width: 42px; height: 42px; }
.eyebrow { position: absolute; top: 144px; left: 74px; color: #8d98a9; font-size: 15px; line-height: 1.2; font-weight: 610; letter-spacing: .055em; text-transform: uppercase; }
h1 { position: absolute; top: 184px; left: 74px; z-index: 2; width: 500px; margin: 0; font-size: 47px; line-height: 1.07; font-weight: 650; letter-spacing: -.045em; }
.name { position: absolute; bottom: 58px; left: 74px; color: #9aa6b7; font-size: 15px; font-weight: 600; letter-spacing: .04em; }
.visual { position: absolute; top: 106px; right: 70px; width: 500px; height: 405px; }
.home-visual { position: absolute; inset: 0; overflow: hidden; }
.home-visual img { position: absolute; z-index: 2; top: 24px; right: 39px; width: 350px; height: 350px; filter: drop-shadow(0 18px 32px rgba(37,99,235,.14)); }
.movune-frame { position: absolute; top: 20px; right: 0; width: 498px; height: 336px; padding: 10px; border: 1px solid rgba(148,163,184,.3); border-radius: 12px; background: #e8edf3; box-shadow: 0 24px 50px rgba(0,0,0,.28); transform: perspective(900px) rotateY(-4deg) rotateX(2deg); }
.movune-frame img { display: block; width: 100%; height: 100%; object-fit: cover; object-position: top left; border-radius: 5px; }
.rigset-visual { position: absolute; inset: 0; }
.state-card { position: absolute; z-index: 2; width: 206px; min-height: 172px; padding: 25px 23px; border: 1px solid rgba(148,163,184,.31); border-radius: 10px; background: linear-gradient(135deg, rgba(30,41,59,.56), rgba(15,23,42,.14)); box-shadow: 0 20px 36px rgba(0,0,0,.16); }
.state-card b { display: block; color: #e6ebf1; font-size: 11px; line-height: 1.2; font-weight: 690; letter-spacing: .055em; }
.state-card i { display: block; height: 1px; margin-top: 21px; background: rgba(148,163,184,.42); }
.state-current { top: 80px; left: 24px; }.state-current i:nth-of-type(1) { width: 78%; }.state-current i:nth-of-type(2) { width: 56%; }.state-current i:nth-of-type(3) { width: 69%; }
.state-desired { right: 24px; bottom: 74px; }.state-desired b { color: #eaf1ff; }.state-desired i { width: 76%; background: linear-gradient(90deg, #2563eb 0 23%, rgba(148,163,184,.42) 23%); }.state-desired i:nth-of-type(2) { width: 64%; }.state-desired i:nth-of-type(3) { width: 82%; }
.state-bridge { position: absolute; z-index: 1; top: 184px; left: 192px; width: 157px; height: 1px; background: linear-gradient(90deg, rgba(148,163,184,.36), #2563eb 50%, rgba(148,163,184,.36)); transform: rotate(26deg); }.state-bridge::after { position: absolute; top: -5px; left: calc(50% - 5px); width: 10px; height: 10px; content: ''; border: 2px solid #2563eb; border-radius: 50%; background: #080a0d; }
.eligent-visual { position: absolute; top: 50px; left: 0; width: 500px; height: 320px; }
.opportunity, .context { position: absolute; border: 1px solid rgba(148,163,184,.32); border-radius: 9px; background: rgba(15,23,42,.58); }
.opportunity { top: 42px; left: 8px; width: 215px; padding: 22px 20px; }
.opportunity b, .context b { display: block; color: #e6ebf1; font-size: 12px; line-height: 1.2; font-weight: 690; letter-spacing: .045em; }
.opportunity span { display: block; margin-top: 12px; color: #9aa6b7; font-size: 12px; font-weight: 560; letter-spacing: .035em; }
.context { top: 170px; left: 92px; width: 180px; padding: 19px 18px; background: rgba(30,41,59,.46); }
.context b + b { margin-top: 15px; color: #aeb9c8; }
.decision-line { position: absolute; top: 178px; left: 238px; display: flex; align-items: center; gap: 11px; }
.decision-line i { display: block; width: 11px; height: 11px; border-radius: 50%; background: #2563eb; box-shadow: 0 0 0 8px rgba(37,99,235,.13); }.decision-line span { display: block; width: 116px; height: 1px; background: #2563eb; }.decision-line strong { color: #f5f7fa; font-size: 14px; font-weight: 700; letter-spacing: .045em; }
</style></head><body><main class="canvas"><div class="signature"><img src="${monogram}" alt="" /></div><div class="eyebrow">${eyebrow}</div><h1>${headline}</h1><div class="name">${name}</div><div class="visual">${visuals[visual]}</div></main></body></html>`

await mkdir(outputDirectory, { recursive: true })
const browser = await chromium.launch({ headless: true })
const page = await browser.newPage({
  viewport: { width: 1200, height: 630 },
  deviceScaleFactor: 1,
})

try {
  for (const preview of previewsToGenerate) {
    await page.setContent(html(preview), { waitUntil: 'load' })
    await page.screenshot({
      path: resolve(outputDirectory, preview.file),
      type: 'png',
    })
  }
} finally {
  await browser.close()
}
