import { describe, expect, it } from 'vitest'

import { getSemanticHeadingText } from '../../scripts/get-semantic-heading.mjs'

describe('prerender heading verification', () => {
  it('ignores aria-hidden typing layers when reading the semantic heading', () => {
    const heading = `
      <h1 aria-label="Leonardo Blauth">
        <span class="text-type__static">Leonardo\nBlauth</span>
        <span class="text-type__animated" aria-hidden="true">
          <span>Leonardo\nBlauth</span>
        </span>
      </h1>
    `

    expect(getSemanticHeadingText(heading)).toBe('Leonardo Blauth')
  })
})
