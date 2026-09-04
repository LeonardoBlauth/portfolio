export type SupportedLocale = 'en' | 'pt'

export interface LocalizedRouteDefinition {
  name: 'home' | 'movune' | 'rigset' | 'overtimeAutomation'
  paths: Record<SupportedLocale, string>
}
