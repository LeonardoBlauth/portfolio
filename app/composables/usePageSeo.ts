import { localizedRoutes } from '~/data/localized-routes'
import { getPageSeo, siteOrigin } from '~/data/seo'
import { toSupportedLocale } from '~/utils/locale'

const localeTags = {
  en: 'en_US',
  pt: 'pt_BR',
} as const

export const usePageSeo = () => {
  const route = useRoute()
  const { locale } = useI18n()

  const currentLocale = computed(() => toSupportedLocale(locale.value))
  const currentRoute = computed(() => {
    const entry = Object.entries(localizedRoutes).find(([, definition]) =>
      (Object.values(definition.paths) as string[]).includes(route.path),
    )

    return entry?.[0] ?? 'home'
  })
  const page = computed(() =>
    getPageSeo(
      currentRoute.value as keyof typeof localizedRoutes,
      currentLocale.value,
    ),
  )
  const paths = computed(
    () =>
      localizedRoutes[currentRoute.value as keyof typeof localizedRoutes].paths,
  )
  const canonical = computed(
    () => `${siteOrigin}${paths.value[currentLocale.value]}`,
  )

  useHead(() => ({
    title: page.value.title,
    meta: [
      { name: 'description', content: page.value.description },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'Leonardo Blauth' },
      { property: 'og:locale', content: localeTags[currentLocale.value] },
      {
        property: 'og:locale:alternate',
        content: localeTags[currentLocale.value === 'en' ? 'pt' : 'en'],
      },
      { property: 'og:title', content: page.value.title },
      { property: 'og:description', content: page.value.description },
      { property: 'og:url', content: canonical.value },
      { property: 'og:image', content: page.value.socialImageUrl },
      { property: 'og:image:secure_url', content: page.value.socialImageUrl },
      { property: 'og:image:type', content: 'image/png' },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:image:alt', content: page.value.socialImageAlt },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: page.value.title },
      { name: 'twitter:description', content: page.value.description },
      { name: 'twitter:image', content: page.value.socialImageUrl },
      { name: 'twitter:image:alt', content: page.value.socialImageAlt },
    ],
    link: [
      { rel: 'canonical', href: canonical.value },
      {
        rel: 'alternate',
        hreflang: 'en',
        href: `${siteOrigin}${paths.value.en}`,
      },
      {
        rel: 'alternate',
        hreflang: 'pt-BR',
        href: `${siteOrigin}${paths.value.pt}`,
      },
      {
        rel: 'alternate',
        hreflang: 'x-default',
        href: `${siteOrigin}${paths.value.en}`,
      },
    ],
  }))
}
