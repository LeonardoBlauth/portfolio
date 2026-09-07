import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'

import { describe, expect, it } from 'vitest'

import { technologyLogoSources } from '~/data/technology-logos'

const headers = await readFile(
  resolve(process.cwd(), 'public/_headers'),
  'utf8',
)

const imageSources = headers.match(/img-src ([^;]+)/)?.[1] ?? ''

describe('static content security policy', () => {
  it('allows every external host used by published technology logos', () => {
    const logoHosts = [
      ...new Set(
        Object.values(technologyLogoSources).map(
          (source) => new URL(source).origin,
        ),
      ),
    ]

    logoHosts.forEach((host) => {
      expect(imageSources).toContain(host)
    })
  })
})
