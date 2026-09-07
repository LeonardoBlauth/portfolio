import { describe, expect, it } from 'vitest'

import { selectedProjects } from '~/data/projects'

describe('selected project data', () => {
  it('lists the three approved projects in order', () => {
    expect(selectedProjects.map((project) => project.slug)).toEqual([
      'movune',
      'rigset',
      'eligent',
    ])
    expect(selectedProjects.map((project) => project.status)).toEqual([
      'prototyping',
      'planned',
      'technical-validation',
    ])
  })
})
