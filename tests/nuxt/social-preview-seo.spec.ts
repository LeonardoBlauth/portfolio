import { describe, expect, it } from 'vitest'

import { getPageSeo, siteOrigin } from '~/data/seo'

describe('localized social preview SEO data', () => {
  it.each([
    ['home', 'en', '/images/social/home-en.png'],
    ['home', 'pt', '/images/social/home-pt.png'],
    ['movune', 'en', '/images/social/movune-en.png'],
    ['movune', 'pt', '/images/social/movune-pt.png'],
    ['rigset', 'en', '/images/social/rigset-en.png'],
    ['rigset', 'pt', '/images/social/rigset-pt.png'],
    ['eligent', 'en', '/images/social/eligent-en.png'],
    ['eligent', 'pt', '/images/social/eligent-pt.png'],
  ] as const)('maps %s %s to its localized preview', (route, locale, image) => {
    const seo = getPageSeo(route, locale)

    expect(seo.socialImage).toBe(image)
    expect(seo.socialImageUrl).toBe(`${siteOrigin}${image}`)
  })
})
