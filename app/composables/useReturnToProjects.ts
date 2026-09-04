import { localizedRoutes } from '~/data/localized-routes'
import type { SupportedLocale } from '~/utils/locale'

export const useReturnToProjects = () => {
  const { locale } = useI18n()
  const { setActiveProjectSlug } = useProjectCarouselState()
  const pendingHomeSection = useState<string | null>(
    'pending-home-section',
    () => null,
  )

  const currentLocale = computed<SupportedLocale>(() =>
    locale.value === 'en' ? 'en' : 'pt-BR',
  )

  const homeRoute = computed(
    () => localizedRoutes.home.paths[currentLocale.value],
  )

  // Clean Home path only — scroll to Projects is handled via pendingHomeSection
  // on Home mount, without persisting a hash in the address bar.
  const projectsTarget = computed(() => homeRoute.value)

  const prepareReturn = (projectSlug: string) => {
    setActiveProjectSlug(projectSlug)
    pendingHomeSection.value = 'projects'
  }

  return { homeRoute, projectsTarget, prepareReturn }
}
