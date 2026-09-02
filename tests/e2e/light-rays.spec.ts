import { expect, test } from '@playwright/test'

test.describe('Hero Light Rays', () => {
  test('blends into the post-hero atmosphere without a hard Projects boundary', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 })

    for (const [theme, expectedPostHeroBackground] of [
      ['dark', 'rgb(8, 12, 17)'],
      ['light', 'rgb(245, 246, 244)'],
    ] as const) {
      await page.addInitScript((selectedTheme) => {
        localStorage.setItem('portfolio-theme', selectedTheme)
      }, theme)
      await page.goto('/')

      const transition = await page.evaluate(() => {
        const hero = document.querySelector<HTMLElement>('#top')
        const postHero = document.querySelector<HTMLElement>('.post-hero')
        const projects = document.querySelector<HTMLElement>('#projects')

        if (!hero || !postHero || !projects) {
          throw new Error('Hero transition elements are missing')
        }

        return {
          heroHeight: hero.getBoundingClientRect().height,
          viewportHeight: window.innerHeight,
          heroTransition: getComputedStyle(hero, '::after').backgroundImage,
          postHeroBackground: getComputedStyle(postHero).backgroundColor,
          postHeroVeil: getComputedStyle(postHero, '::before').backgroundImage,
          projectsBorderWidth: getComputedStyle(projects).borderTopWidth,
        }
      })

      expect(transition.heroTransition).not.toBe('none')
      expect(transition.postHeroBackground).toBe(expectedPostHeroBackground)
      expect(transition.postHeroVeil).not.toBe('none')
      expect(transition.projectsBorderWidth).toBe('0px')
      expect(transition.heroHeight).toBeGreaterThanOrEqual(
        transition.viewportHeight * 0.94,
      )
      expect(transition.heroHeight).toBeLessThan(transition.viewportHeight)
    }
  })

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
    expect(geometry.heroBottom).toBeGreaterThanOrEqual(
      geometry.viewportHeight * 0.94,
    )
    expect(geometry.projectsTop).toBeGreaterThanOrEqual(
      geometry.viewportHeight * 0.94,
    )
  })

  test('eases the post-hero atmosphere into the footer without a hard boundary', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 })

    for (const [theme, expectedFooterBackground] of [
      ['dark', 'rgb(5, 6, 8)'],
      ['light', 'rgb(246, 246, 243)'],
    ] as const) {
      await page.addInitScript((selectedTheme) => {
        localStorage.setItem('portfolio-theme', selectedTheme)
      }, theme)
      await page.goto('/')

      const footerTransition = await page.locator('footer').evaluate((footer) => {
        const footerStyles = getComputedStyle(footer)
        const transitionStyles = getComputedStyle(footer, '::before')

        return {
          background: footerStyles.backgroundColor,
          borderWidth: footerStyles.borderTopWidth,
          height: footer.getBoundingClientRect().height,
          transition: transitionStyles.backgroundImage,
          transitionHeight: Number.parseFloat(transitionStyles.height),
        }
      })

      expect(footerTransition.background).toBe(expectedFooterBackground)
      expect(footerTransition.borderWidth).toBe('0px')
      expect(footerTransition.transition).not.toBe('none')
      expect(footerTransition.transitionHeight).toBeLessThan(
        footerTransition.height,
      )
    }
  })

  test('renders WebGL only inside the Hero and pauses outside the viewport', async ({
    page,
  }) => {
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

    await page.locator('#contact').scrollIntoViewIfNeeded()
    await expect(canvas).not.toBeInViewport()
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
