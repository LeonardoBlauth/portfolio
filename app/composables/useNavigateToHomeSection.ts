import { localizedRoutes } from '~/data/localized-routes'
import type { SupportedLocale } from '~/utils/locale'
import { toSupportedLocale } from '~/utils/locale'

/** Cross-route Home section navigation via pending-home-section (no URL hash). */
export const useNavigateToHomeSection = () => {
  const { locale } = useI18n()
  const pendingHomeSection = useState<string | null>(
    'pending-home-section',
    () => null,
  )

  const currentLocale = computed<SupportedLocale>(() =>
    toSupportedLocale(locale.value),
  )
  const homeRoute = computed(
    () => localizedRoutes.home.paths[currentLocale.value],
  )

  const navigateToHomeSection = (sectionId: string) => {
    pendingHomeSection.value = sectionId
    return navigateTo(homeRoute.value)
  }

  return {
    homeRoute,
    pendingHomeSection,
    navigateToHomeSection,
  }
}
