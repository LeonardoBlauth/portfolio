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

export type ProjectExternalLink = {
  type: 'github'
  href: string
  labelKey: string
  accessibilityLabelKey: string
}

export type ProjectSummary = {
  slug: string
  route: ProjectRouteName
  status: ProjectStatus
  visual: ProjectVisual
  categoryKeys: string[]
  externalLinks?: readonly ProjectExternalLink[]
  hasMaturityNote?: boolean
  messageKey: string
}
