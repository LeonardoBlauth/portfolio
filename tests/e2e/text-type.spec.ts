import { expect, test, type Page } from '@playwright/test'

const visualName = (page: Page) => page.locator('#hero-title')
const visualNameLayer = (page: Page) =>
  page.locator('#hero-title .text-type__visual')
const typedName = (page: Page) => page.locator('#hero-title .text-type__typed')
const staticName = (page: Page) =>
  page.locator('#hero-title .text-type__static')

test.describe('Hero Text Type', () => {
  test('hands the static title to the typing enhancement without visible overlap', async ({
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
    await expect(visualNameLayer(page)).toHaveClass(
      /text-type__visual--enhanced/,
    )
    const titleLayerColors = await visualName(page).evaluate((heading) => {
      const staticLayer = heading.querySelector('.text-type__static')
      const animatedLayer = heading.querySelector('.text-type__animated')

      return {
        static: staticLayer ? getComputedStyle(staticLayer).color : null,
        animated: animatedLayer ? getComputedStyle(animatedLayer).color : null,
      }
    })

    expect(titleLayerColors.static).toBe('rgba(0, 0, 0, 0)')
    expect(titleLayerColors.animated).not.toBe('rgba(0, 0, 0, 0)')
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
