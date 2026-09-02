import { expect, test } from '@playwright/test'

const waitForHydration = (page: import('@playwright/test').Page) =>
  page.waitForFunction(() =>
    Boolean(
      (
        document.querySelector('#__nuxt') as
          (HTMLElement & { __vue_app__?: unknown }) | null
      )?.__vue_app__,
    ),
  )

test.describe('contact spotlight card', () => {
  test.use({ viewport: { width: 1440, height: 900 } })

  test('uses one contact CTA card with a subtle pointer spotlight', async ({
    page,
  }) => {
    await page.addInitScript(() => {
      localStorage.setItem('portfolio-theme', 'dark')
    })
    await page.goto('/')
    await waitForHydration(page)

    const contact = page.locator('#contact')
    const card = contact.locator('[data-spotlight-card]')
    const spotlight = card.locator('[data-spotlight-layer]')

    await expect(card).toHaveCount(1)
    await expect(card).toHaveClass(/contact__card/)
    await expect(spotlight).toHaveAttribute('aria-hidden', 'true')
    await expect(spotlight).toHaveCSS('pointer-events', 'none')
    await expect(contact.getByText('Contato', { exact: true })).toBeVisible()
    await expect(
      contact.getByRole('heading', {
        name: 'Vamos conversar sobre a próxima oportunidade?',
      }),
    ).toBeVisible()
    await expect(
      contact.getByText(
        'Projetos, desafios ou ideias para tirar do papel — quero conhecer o que você tem em mente.',
      ),
    ).toBeVisible()

    const actions = contact.locator('.contact__action')
    await expect(actions).toHaveCount(3)
    await expect(actions.nth(0)).toHaveText('contato@leonardoblauth.dev')
    await expect(actions.nth(1)).toHaveText('GitHub')
    await expect(actions.nth(2)).toHaveText('LinkedIn')

    await card.hover({ position: { x: 220, y: 180 } })
    await expect(spotlight).toHaveCSS('opacity', /0\.[1-9]/)
    await expect(spotlight).toHaveCSS(
      'background-image',
      /rgba\(255, 255, 255, 0\.12\)/,
    )
  })

  test('remains complete without a pointer spotlight on mobile and reduced motion', async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/')
    await waitForHydration(page)

    const contact = page.locator('#contact')
    await expect(contact.locator('[data-spotlight-card]')).toHaveCount(1)
    await expect(contact.locator('.contact__action')).toHaveCount(3)
    await expect(contact.locator('[data-spotlight-layer]')).toHaveCSS(
      'transition-duration',
      '0.001s',
    )
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true)
  })

  test('reduces spotlight intensity in the light theme', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('portfolio-theme', 'light')
    })
    await page.goto('/')
    await waitForHydration(page)

    const card = page.locator('#contact [data-spotlight-card]')
    const spotlight = card.locator('[data-spotlight-layer]')

    await card.hover({ position: { x: 180, y: 160 } })
    await expect(spotlight).toHaveCSS('opacity', '0.36')
    await expect(spotlight).toHaveCSS(
      'background-image',
      /rgba\(255, 209, 102, 0\.18\)/,
    )
  })
})
