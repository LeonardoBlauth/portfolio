export type ProjectStatus =
  | 'concept'
  | 'planned'
  | 'prototyping'
  | 'technical-validation'
  | 'development'
  | 'available'

export type ProjectVisual =
  | {
      type: 'screenshot'
      src: string
      width: number
      height: number
      altKey: string
      captionKey?: string
    }
  | {
      type: 'concept-image'
      src: string
      width: number
      height: number
      altKey: string
      captionKey: string
    }
  | {
      type: 'diagram'
      altKey: string
      captionKey?: string
    }

export type ProjectRouteName = 'movune' | 'rigset' | 'eligent'

export type ProjectSummary = {
  slug: string
  route: ProjectRouteName
  status: ProjectStatus
  visual: ProjectVisual
  categoryKeys: string[]
  hasMaturityNote?: boolean
  messageKey: string
}
