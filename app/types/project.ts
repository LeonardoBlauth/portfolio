export type ProjectStatus =
  'concept' | 'planned' | 'prototyping' | 'development' | 'available'

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

export type ProjectRouteName = 'movune' | 'rigset' | 'overtimeAutomation'

export type ProjectSummary = {
  slug: string
  route: ProjectRouteName
  status: ProjectStatus
  visual: ProjectVisual
  categoryKeys: string[]
  hasMaturityNote?: boolean
  messageKey: string
}
