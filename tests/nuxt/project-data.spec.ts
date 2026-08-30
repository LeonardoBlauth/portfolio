import { describe, expect, it } from 'vitest'

import { selectedProject } from '~/data/projects'

describe('selected project data', () => {
  it('contains only the stable approved movune facts', () => {
    expect(selectedProject).toEqual({
      id: 'movune',
      order: '01',
      type: 'B2B SaaS',
      route: 'movune',
      messageKey: 'selectedProjects.movune',
    })
  })
})
