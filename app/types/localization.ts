import type { SupportedLocale } from '~/utils/locale'

export type { SupportedLocale }

export interface LocalizedRouteDefinition {
  name: 'home' | 'movune' | 'rigset' | 'eligent'
  paths: Record<SupportedLocale, string>
}
