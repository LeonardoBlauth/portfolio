export type SupportedLocale = 'pt-BR' | 'en'

export interface LocalizedRouteDefinition {
  name: 'home' | 'movune' | 'rigset' | 'overtimeAutomation'
  paths: Record<SupportedLocale, string>
}
