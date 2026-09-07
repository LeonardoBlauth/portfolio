import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'

import { describe, expect, it } from 'vitest'

const stylesPath = resolve(process.cwd(), 'app/assets/styles')
const utilities = await readFile(resolve(stylesPath, 'utilities.css'), 'utf8')
const tokens = await readFile(resolve(stylesPath, 'tokens.css'), 'utf8')

const statusRule = (status: string) => {
  const match = utilities.match(
    new RegExp(`\\[data-status='${status}'\\]\\s*\\{([\\s\\S]*?)\\n\\}`),
  )

  return match?.[1] ?? ''
}

describe('status semantic colors', () => {
  it('assigns planned, prototyping, and technical validation distinct tokens', () => {
    const statuses = ['planned', 'prototyping', 'technical-validation']
    const dotTokens = statuses.map(
      (status) =>
        statusRule(status).match(
          /--_status-dot: var\((--status-[\w-]+-dot)\)/,
        )?.[1],
    )

    expect(dotTokens).toEqual([
      '--status-planned-dot',
      '--status-prototyping-dot',
      '--status-technical-validation-dot',
    ])
  })

  it('defines the technical-validation tokens in both themes', () => {
    expect(tokens.match(/--status-technical-validation-dot:/g)).toHaveLength(2)
    expect(tokens.match(/--status-technical-validation-border:/g)).toHaveLength(
      2,
    )
    expect(tokens.match(/--status-technical-validation-bg:/g)).toHaveLength(2)
  })
})
