import { expect, test } from '@playwright/test'

test.describe('Post-hero Aurora', () => {
  test('keeps the ambient layer perceptible in both themes', async ({
    page,
  }) => {
    await page.addInitScript(() => {
      localStorage.setItem('portfolio-theme', 'dark')
    })
    await page.goto('/')

    for (const [theme, minimumOpacity, maximumOpacity] of [
      ['dark', 0.3, 0.32],
      ['light', 0.09, 0.1],
    ] as const) {
      if (theme === 'light') {
        await page
          .getByRole('button', { name: 'Ativar tema claro', exact: true })
          .click()
      }
      await expect(page.locator('html')).toHaveAttribute('data-theme', theme)
      await page.locator('#projects').scrollIntoViewIfNeeded()

      const opacity = await page
        .locator('[data-post-hero-ambient]')
        .evaluate((element) => Number(getComputedStyle(element).opacity))

      expect(opacity).toBeGreaterThanOrEqual(minimumOpacity)
      expect(opacity).toBeLessThanOrEqual(maximumOpacity)
    }
  })

  test('uses one viewport-sized ambient canvas only below the Hero', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto('/')

    const ambient = page.locator('[data-post-hero-ambient]')
    const aurora = ambient.locator('[data-aurora]')
    const canvas = aurora.locator('canvas')

    await expect(ambient).toBeVisible()
    await expect(aurora).toHaveAttribute('data-render-state', 'paused')
    await page.locator('#projects').scrollIntoViewIfNeeded()
    await expect(canvas).toHaveCount(1)
    await expect(aurora).toHaveAttribute('data-render-state', 'rendering')

    const geometry = await page.evaluate(() => {
      const hero = document.querySelector<HTMLElement>('#top')
      const ambientLayer = document.querySelector<HTMLElement>('[data-aurora]')
      const auroraCanvas =
        ambientLayer?.querySelector<HTMLCanvasElement>('canvas')

      if (!hero || !ambientLayer || !auroraCanvas) {
        throw new Error('Hero or Aurora layer is missing')
      }

      return {
        heroBottom: hero.getBoundingClientRect().bottom,
        ambientTop: ambientLayer.getBoundingClientRect().top,
        cssHeight: auroraCanvas.getBoundingClientRect().height,
        bufferHeight: auroraCanvas.height,
        viewportHeight: window.innerHeight,
      }
    })

    expect(geometry.ambientTop).toBeGreaterThanOrEqual(geometry.heroBottom - 1)
    expect(geometry.cssHeight).toBeLessThanOrEqual(geometry.viewportHeight + 1)
    expect(geometry.bufferHeight).toBeLessThanOrEqual(
      geometry.viewportHeight * 2,
    )
  })

  test('keeps a static ambient fallback when reduced motion is requested', async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/')

    await expect(page.locator('[data-aurora]')).toHaveAttribute(
      'data-motion',
      'static',
    )
    await expect(page.locator('[data-aurora] canvas')).toHaveCount(0)
  })

  test('keeps the ambient contained on a compact viewport', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/')
    await page.locator('#projects').scrollIntoViewIfNeeded()

    await expect(page.locator('[data-aurora] canvas')).toHaveCount(1)

    const metrics = await page.evaluate(() => {
      const canvas = document.querySelector<HTMLCanvasElement>(
        '[data-aurora] canvas',
      )

      if (!canvas) throw new Error('Aurora canvas is missing')

      return {
        pageWidth: document.documentElement.scrollWidth,
        viewportWidth: window.innerWidth,
        dpr: canvas.width / canvas.clientWidth,
      }
    })

    expect(metrics.pageWidth).toBeLessThanOrEqual(metrics.viewportWidth)
    expect(metrics.dpr).toBeLessThanOrEqual(1.25)
  })
})
