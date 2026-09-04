/** Prepare carousel + pending Projects scroll, then navigate to clean Home. */
export const useReturnToProjects = () => {
  const { setActiveProjectSlug } = useProjectCarouselState()
  const { homeRoute, pendingHomeSection } = useNavigateToHomeSection()

  const prepareReturn = (projectSlug: string) => {
    setActiveProjectSlug(projectSlug)
    pendingHomeSection.value = 'projects'
  }

  return { homeRoute, prepareReturn }
}
