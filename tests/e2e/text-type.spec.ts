import { expect, test, type Page } from '@playwright/test'

const visualName = (page: Page) => page.locator('#hero-title')
const typedName = (page: Page) => page.locator('#hero-title .text-type__typed')
const staticName = (page: Page) =>
  page.locator('#hero-title .text-type__static')

test.describe('Hero Text Type', () => {
  test('keeps the static title visible while replaying the typing enhancement', async ({
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

    const response = await page.request.get('/')
    const initialHtml = await response.text()

    expect(initialHtml).toContain('Leonardo\nBlauth')

    await page.goto('/')

    await expect(
      page.getByRole('heading', { level: 1, name: 'Leonardo Blauth' }),
    ).toBeVisible()

    await expect(staticName(page)).toHaveText('Leonardo\nBlauth')
    await expect(page.locator('#hero-title .text-type__cursor')).toHaveCount(1)
    await expect(typedName(page)).toContainText('L')
    await expect(typedName(page)).not.toHaveText('Leonardo\nBlauth')

    await expect(typedName(page)).toHaveText('Leonardo\nBlauth', {
      timeout: 5_000,
    })

    await expect(typedName(page)).toHaveText('Leonardo\nBlauth')
    await expect(page.locator('#hero-title .text-type__cursor')).toHaveCount(0)
    await expect(staticName(page)).toHaveText('Leonardo\nBlauth')
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

    await expect(typedName(page)).toHaveText('Leonardo\nBlauth')
    await expect(page.locator('#hero-title .text-type__cursor')).toHaveCount(0)
  })
})
