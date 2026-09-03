import { selectedProjects } from '~/data/projects'

export const DEFAULT_PROJECT_SLUG = 'movune'

type CarouselGlobal = typeof globalThis & {
  __lbActiveProjectSlug?: Ref<string>
}

const clientActiveProjectSlug = () => {
  const scope = globalThis as CarouselGlobal
  if (!scope.__lbActiveProjectSlug) {
    scope.__lbActiveProjectSlug = ref(DEFAULT_PROJECT_SLUG)
  }
  return scope.__lbActiveProjectSlug
}

export const resetProjectCarouselState = () => {
  const scope = globalThis as CarouselGlobal
  if (scope.__lbActiveProjectSlug) {
    scope.__lbActiveProjectSlug.value = DEFAULT_PROJECT_SLUG
  }
}

export const useProjectCarouselState = () => {
  const activeProjectSlug = import.meta.client
    ? clientActiveProjectSlug()
    : ref(DEFAULT_PROJECT_SLUG)

  const setActiveProjectSlug = (slug: string) => {
    if (selectedProjects.some((project) => project.slug === slug)) {
      activeProjectSlug.value = slug
    }
  }

  const indexFromSlug = (slug: string) => {
    const index = selectedProjects.findIndex((project) => project.slug === slug)
    return index >= 0 ? index : 0
  }

  return {
    activeProjectSlug,
    setActiveProjectSlug,
    indexFromSlug,
  }
}
