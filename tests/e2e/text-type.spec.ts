import { expect, test, type Page } from '@playwright/test'

const visualName = (page: Page) => page.locator('#hero-title')

test.describe('Hero Text Type', () => {
  test('renders the complete name without a hydration-time typing delay', async ({
    page,
  }) => {
    const relevantMessages: string[] = []
    page.on('console', (message) => {
      if (
        message.type() === 'error' ||
        /hydration|mismatch/i.test(message.text())
      ) {
        relevantMessages.push(message.text())
      }
    })
    page.on('pageerror', (error) => relevantMessages.push(error.message))

    await page.goto('/')

    await expect(
      page.getByRole('heading', { level: 1, name: 'Leonardo Blauth' }),
    ).toBeVisible()
    await expect(visualName(page)).toContainText('Leonardo\nBlauth')
    await expect(page.locator('#hero-title .text-type__cursor')).toHaveCount(
      0,
      {
        timeout: 5_000,
      },
    )
    await expect(visualName(page)).toHaveText('Leonardo\nBlauth')

    await page.locator('#projects').scrollIntoViewIfNeeded()
    await page.locator('#top').scrollIntoViewIfNeeded()
    await page.waitForTimeout(300)

    await expect(visualName(page)).toHaveText('Leonardo\nBlauth')
    await expect(page.locator('#hero-title .text-type__cursor')).toHaveCount(0)
    expect(relevantMessages).toEqual([])
  })

  test('keeps the reserved Hero layout overflow-free on mobile', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto('/')
    await expect(visualName(page)).toContainText('Leonardo\nBlauth')
    await expect(page.locator('#hero-title .text-type__cursor')).toHaveCount(
      0,
      {
        timeout: 5_000,
      },
    )

    const hasHorizontalOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth,
    )
    expect(hasHorizontalOverflow).toBe(false)
  })

  test('shows the complete name immediately without a cursor for reduced motion', async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/')

    await expect(visualName(page)).toHaveText('Leonardo\nBlauth')
    await expect(page.locator('#hero-title .text-type__cursor')).toHaveCount(0)
  })
})
