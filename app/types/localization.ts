export type SupportedLocale = 'pt-BR' | 'en'

export interface LocalizedRouteDefinition {
  name: 'home' | 'movune'
  paths: Record<SupportedLocale, string>
}
