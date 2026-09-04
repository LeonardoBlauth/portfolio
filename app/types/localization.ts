import type { SupportedLocale } from '~/utils/locale'

export type { SupportedLocale }

export interface LocalizedRouteDefinition {
  name: 'home' | 'movune' | 'rigset' | 'overtimeAutomation'
  paths: Record<SupportedLocale, string>
}
