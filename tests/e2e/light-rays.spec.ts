import { expect, test } from '@playwright/test'

test.describe('Hero Light Rays', () => {
  test('starts at the viewport edge and keeps Projects below the first viewport', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto('/')

    const geometry = await page.evaluate(() => {
      const hero = document.querySelector<HTMLElement>('#top')
      const projects = document.querySelector<HTMLElement>('#projects')

      if (!hero || !projects) throw new Error('Home sections are missing')

      return {
        heroTop: hero.getBoundingClientRect().top,
        heroBottom: hero.getBoundingClientRect().bottom,
        projectsTop: projects.getBoundingClientRect().top,
        viewportHeight: window.innerHeight,
      }
    })

    expect(geometry.heroTop).toBe(0)
    expect(geometry.heroBottom).toBeGreaterThanOrEqual(geometry.viewportHeight)
    expect(geometry.projectsTop).toBeGreaterThanOrEqual(geometry.viewportHeight)
  })

  test('renders WebGL only inside the Hero and pauses outside the viewport', async ({
    page,
  }) => {
    await page.addInitScript(() => {
      const originalRequestAnimationFrame = window.requestAnimationFrame
      let frameCount = 0

      window.requestAnimationFrame = (callback: FrameRequestCallback) =>
        originalRequestAnimationFrame((time) => {
          frameCount += 1
          callback(time)
        })

      Object.defineProperty(window, '__portfolioFrameCount', {
        get: () => frameCount,
      })
    })

    const relevantMessages: string[] = []
    page.on('console', (message) => {
      const text = message.text()
      if (
        !/GL Driver Message/i.test(text) &&
        (message.type() === 'error' || /hydration|mismatch|webgl/i.test(text))
      ) {
        relevantMessages.push(text)
      }
    })
    page.on('pageerror', (error) => relevantMessages.push(error.message))

    await page.goto('/')
    const canvas = page.locator('#top .hero__light-rays canvas')
    await expect(canvas).toBeVisible()
    await expect(page.locator('.hero__orbit-system')).toHaveCount(0)
    await expect(page.locator('body > .hero__light-rays')).toHaveCount(0)

    const firstVisibleFrame = await page.evaluate(
      () =>
        (window as Window & { __portfolioFrameCount: number })
          .__portfolioFrameCount,
    )
    await page.waitForTimeout(250)
    const secondVisibleFrame = await page.evaluate(
      () =>
        (window as Window & { __portfolioFrameCount: number })
          .__portfolioFrameCount,
    )
    expect(secondVisibleFrame).toBeGreaterThan(firstVisibleFrame)

    await page.locator('#contact').scrollIntoViewIfNeeded()
    await page.waitForTimeout(250)
    const firstPausedFrame = await page.evaluate(
      () =>
        (window as Window & { __portfolioFrameCount: number })
          .__portfolioFrameCount,
    )
    await page.waitForTimeout(250)
    const secondPausedFrame = await page.evaluate(
      () =>
        (window as Window & { __portfolioFrameCount: number })
          .__portfolioFrameCount,
    )
    expect(secondPausedFrame).toBe(firstPausedFrame)
    expect(relevantMessages).toEqual([])
  })

  test('uses the static fallback for reduced motion', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/')

    await expect(page.locator('#top .hero__light-rays')).toBeVisible()
    await expect(page.locator('#top .hero__light-rays canvas')).toHaveCount(0)
  })

  test('caps mobile DPR and remains contained in both themes', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 })

    for (const theme of ['dark', 'light']) {
      await page.addInitScript((selectedTheme) => {
        localStorage.setItem('portfolio-theme', selectedTheme)
      }, theme)
      await page.goto('/')
      await expect(page.locator('html')).toHaveAttribute('data-theme', theme)

      const canvas = page.locator('#top .hero__light-rays canvas')
      await expect(canvas).toBeVisible()
      const dpr = await canvas.evaluate((element) => {
        const target = element as HTMLCanvasElement
        return target.width / target.clientWidth
      })

      expect(dpr).toBeLessThanOrEqual(1.25)
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth > window.innerWidth,
        ),
      ).toBe(false)
    }
  })
})
