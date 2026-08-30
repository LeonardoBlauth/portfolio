import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

const waitForHydration = (page: import('@playwright/test').Page) =>
  page.waitForFunction(() =>
    Boolean(
      (
        document.querySelector('#__nuxt') as
          | (HTMLElement & {
              __vue_app__?: unknown
            })
          | null
      )?.__vue_app__,
    ),
  )

const gotoHydrated = async (
  page: import('@playwright/test').Page,
  path: string,
) => {
  await page.goto(path)
  await waitForHydration(page)
}

const headerOffsetIsClear = async (
  page: import('@playwright/test').Page,
  id: string,
  expectTightOffset = true,
) => {
  const headerLocator = page.locator('header .site-header__bar')
  const targetLocator = page.locator(`#${id}`)

  await expect(headerLocator).toBeVisible()
  await expect(targetLocator).toBeVisible()

  if (expectTightOffset) {
    await expect
      .poll(async () => {
        const header = await headerLocator.boundingBox()
        const target = await targetLocator.boundingBox()

        if (!header || !target) return Number.POSITIVE_INFINITY
        return target.y - (header.y + header.height)
      })
      .toBeLessThanOrEqual(64)
  }

  const header = await headerLocator.boundingBox()
  const target = await targetLocator.boundingBox()

  expect(header).not.toBeNull()
  expect(target).not.toBeNull()
  expect(target!.y).toBeGreaterThanOrEqual(header!.y + header!.height)
}

test.describe('desktop shell navigation', () => {
  test.use({ viewport: { width: 1440, height: 900 } })

  test('uses native hashes, fixed-header offset, and predictable history', async ({
    page,
  }) => {
    const clientErrors: string[] = []
    page.on('console', (message) => {
      if (message.type() === 'error' || message.text().includes('Hydration')) {
        clientErrors.push(message.text())
      }
    })
    await gotoHydrated(page, '/')

    await expect(
      page.getByRole('navigation', { name: 'Navegação principal' }),
    ).toBeVisible()
    await expect(page.getByRole('button', { name: 'Abrir menu' })).toBeHidden()

    await page
      .getByRole('navigation', { name: 'Navegação principal' })
      .getByRole('link', { name: 'Projetos' })
      .click()
    await expect(page).toHaveURL(/#projects$/)
    await expect
      .poll(() => page.evaluate(() => window.scrollY))
      .toBeGreaterThan(0)
    await headerOffsetIsClear(page, 'projects')

    await page
      .getByRole('navigation', { name: 'Navegação principal' })
      .getByRole('link', { name: 'Stack' })
      .click()
    await expect(page).toHaveURL(/#stack$/)
    await page.goBack()
    await expect(page).toHaveURL(/#projects$/)
    expect(clientErrors).toEqual([])
  })

  test('keeps direct hash navigation predictable', async ({ page }) => {
    const clientErrors: string[] = []
    page.on('console', (message) => {
      if (message.type() === 'error' || message.text().includes('Hydration')) {
        clientErrors.push(message.text())
      }
    })
    await gotoHydrated(page, '/#experience')
    await expect(page).toHaveURL(/#experience$/)
    await expect
      .poll(() => page.evaluate(() => window.scrollY))
      .toBeGreaterThan(0)
    await headerOffsetIsClear(page, 'experience')
    expect(clientErrors).toEqual([])
  })

  test('preserves router history state for controlled hash entries', async ({
    page,
  }) => {
    await gotoHydrated(page, '/')
    const initialHistoryState = await page.evaluate(() => history.state)

    await page
      .getByRole('navigation', { name: 'Navegação principal' })
      .getByRole('link', { name: 'Projetos' })
      .click()

    expect(await page.evaluate(() => history.state)).toMatchObject({
      back: '/',
      current: '/#projects',
      forward: null,
      position: initialHistoryState.position + 1,
      replaced: false,
    })
  })

  test('keeps hash history reachable across locale navigation', async ({
    page,
  }) => {
    await gotoHydrated(page, '/')

    await page
      .getByRole('navigation', { name: 'Navegação principal' })
      .getByRole('link', { name: 'Stack' })
      .click()
    await headerOffsetIsClear(page, 'stack')
    await page.getByRole('link', { name: 'Mudar idioma para English' }).click()
    await expect(page).toHaveURL(/\/en#stack$/)

    await page.goBack()
    await expect(page).toHaveURL(/\/#stack$/)
    await headerOffsetIsClear(page, 'stack')

    await page.goForward()
    await expect(page).toHaveURL(/\/en#stack$/)
  })

  test('treats a localized trailing slash as the same page', async ({
    page,
  }) => {
    await gotoHydrated(page, '/en/')
    await page.evaluate(() => {
      ;(
        window as typeof window & { __sameDocumentSentinel?: boolean }
      ).__sameDocumentSentinel = true
    })

    await page
      .getByRole('navigation', { name: 'Primary navigation' })
      .getByRole('link', { name: 'Projects' })
      .click()

    await expect(page).toHaveURL(/\/en#projects$/)
    expect(
      await page.evaluate(
        () =>
          (window as typeof window & { __sameDocumentSentinel?: boolean })
            .__sameDocumentSentinel,
      ),
    ).toBe(true)
    await headerOffsetIsClear(page, 'projects')
  })
})

test.describe('localized and persisted controls', () => {
  test('navigates from Home to the complete case and back to Projects', async ({
    page,
  }) => {
    await gotoHydrated(page, '/')

    await page.getByRole('link', { name: 'Ver estudo de caso' }).click()
    await expect(page).toHaveURL(/\/projetos\/movune$/)
    await expect(
      page.getByRole('heading', {
        level: 1,
        name: 'Organizando um produto complexo antes de implementar.',
      }),
    ).toBeVisible()
    await expect(page.locator('article section')).toHaveCount(6)

    await page
      .getByRole('link', { name: 'Voltar para projetos' })
      .first()
      .click()
    await expect(page).toHaveURL(/\/#projects$/)
    await headerOffsetIsClear(page, 'projects')
  })

  test('loads the English case directly and switches to its Portuguese equivalent', async ({
    page,
  }) => {
    await gotoHydrated(page, '/en/projects/movune')

    await expect(
      page.getByRole('heading', {
        level: 1,
        name: 'Organizing a complex product before implementation.',
      }),
    ).toBeVisible()
    await expect(
      page.getByText('Evolving personal project · in prototyping'),
    ).toBeVisible()

    await page
      .getByRole('link', { name: 'Switch language to português' })
      .click()
    await expect(page).toHaveURL(/\/projetos\/movune$/)
    await expect(page.locator('html')).toHaveAttribute('lang', 'pt-BR')
  })

  test('switches equivalent routes and persists only manual locale choices', async ({
    page,
  }) => {
    await gotoHydrated(page, '/en#stack')
    const localeControl = page.getByRole('link', {
      name: 'Switch language to português',
    })
    await expect(localeControl).toHaveAttribute('href', '/#stack')
    await expect(localeControl.locator('span')).toHaveAttribute('lang', 'pt-BR')
    await page
      .getByRole('link', { name: 'Switch language to português' })
      .click()
    await expect(page).toHaveURL(/\/#stack$/)
    await expect
      .poll(() => page.evaluate(() => localStorage.getItem('portfolio-locale')))
      .toBe('pt-BR')

    await gotoHydrated(page, '/en/projects/movune')
    await page
      .getByRole('link', { name: 'Switch language to português' })
      .click()
    await expect(page).toHaveURL(/\/projetos\/movune$/)
    await expect
      .poll(() => page.evaluate(() => localStorage.getItem('portfolio-locale')))
      .toBe('pt-BR')

    await page.evaluate(() => localStorage.setItem('portfolio-locale', 'en'))
    await gotoHydrated(page, '/')
    await expect(page).toHaveURL(/\/$/)
    await expect(page.locator('html')).toHaveAttribute('lang', 'pt-BR')
  })

  test('updates and persists an explicit theme choice', async ({ page }) => {
    await gotoHydrated(page, '/')
    const initialTheme = await page.locator('html').getAttribute('data-theme')
    const targetTheme = initialTheme === 'dark' ? 'light' : 'dark'
    const initialAction =
      initialTheme === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro'
    const targetAction =
      targetTheme === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro'
    const themeControl = page.getByRole('button', { name: initialAction })
    await themeControl.click()
    await expect(page.locator('html')).toHaveAttribute(
      'data-theme',
      targetTheme,
    )
    await expect(page.getByRole('button', { name: targetAction })).toBeVisible()
    await page.reload()
    await waitForHydration(page)
    await expect(page.locator('html')).toHaveAttribute(
      'data-theme',
      targetTheme,
    )
  })
})

test.describe('mobile navigation', () => {
  test.use({ viewport: { width: 390, height: 844 } })

  test('supports keyboard dismissal, focus restoration, and selection close', async ({
    page,
  }) => {
    await gotoHydrated(page, '/')
    const trigger = page.getByRole('button', { name: 'Abrir menu' })

    await expect(trigger).toBeVisible()
    await trigger.click()
    const dialog = page.getByRole('dialog', { name: 'Navegação móvel' })
    await expect(dialog).toBeVisible()
    await expect(trigger).toHaveAttribute('aria-expanded', 'true')
    await expect(
      page.getByRole('button', { name: 'Fechar menu' }),
    ).toBeFocused()
    await page.keyboard.press('Shift+Tab')
    await expect(dialog.getByRole('link', { name: 'Contato' })).toBeFocused()

    await page.keyboard.press('Escape')
    await expect(dialog).toBeHidden()
    await expect(trigger).toBeFocused()

    await trigger.click()
    await dialog.getByRole('link', { name: 'Projetos' }).click()
    await expect(dialog).toBeHidden()
    await expect(page).toHaveURL(/#projects$/)
  })

  test('closes the mobile menu when the Header transitions to desktop', async ({
    page,
  }) => {
    await gotoHydrated(page, '/')
    const trigger = page.getByRole('button', { name: 'Abrir menu' })
    await trigger.click()

    const dialog = page.getByRole('dialog', { name: 'Navegação móvel' })
    await expect(dialog).toBeVisible()

    await page.setViewportSize({ width: 1024, height: 768 })

    await expect(dialog).toBeHidden()
    await expect(
      page.getByRole('navigation', { name: 'Navegação principal' }),
    ).toBeVisible()
    await expect(trigger).toBeHidden()
    await expect(page.locator('body')).not.toHaveAttribute('inert')
  })

  test('has no automatically detectable accessibility violations in either theme or the open menu', async ({
    page,
  }) => {
    await gotoHydrated(page, '/')

    const shellScan = await new AxeBuilder({ page })
      .disableRules(['document-title'])
      .analyze()
    expect(shellScan.violations).toEqual([])

    await page.evaluate(() => localStorage.setItem('portfolio-theme', 'dark'))
    await page.reload()
    await waitForHydration(page)
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')

    const darkShellScan = await new AxeBuilder({ page })
      .disableRules(['document-title'])
      .analyze()
    expect(darkShellScan.violations).toEqual([])

    await page.getByRole('button', { name: 'Abrir menu' }).click()
    const openMenuScan = await new AxeBuilder({ page })
      .disableRules(['document-title'])
      .analyze()
    expect(openMenuScan.violations).toEqual([])
  })

  test('keeps the movune case usable without horizontal overflow', async ({
    page,
  }) => {
    await gotoHydrated(page, '/projetos/movune')

    await expect(page.locator('article section')).toHaveCount(6)
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true)

    const caseScan = await new AxeBuilder({ page })
      .disableRules(['document-title'])
      .analyze()
    expect(caseScan.violations).toEqual([])
  })
})

test.describe('reduced motion navigation', () => {
  test.use({
    viewport: { width: 1024, height: 768 },
    contextOptions: { reducedMotion: 'reduce' },
  })

  test('animates hash scrolling with reduced motion enabled', async ({
    page,
  }) => {
    await gotoHydrated(page, '/')
    expect(
      await page.evaluate(
        () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
      ),
    ).toBe(true)

    const scrollMetrics = await page.evaluate(() => {
      const target = document.querySelector<HTMLElement>('#contact')
      const scrollPadding = Number.parseFloat(
        getComputedStyle(document.documentElement).scrollPaddingBlockStart,
      )

      if (!target) throw new Error('Contact destination is missing')

      const expectedFinalY = Math.min(
        document.documentElement.scrollHeight - window.innerHeight,
        window.scrollY + target.getBoundingClientRect().top - scrollPadding,
      )
      const browserWindow = window as typeof window & {
        __scrollPositions: number[]
      }
      browserWindow.__scrollPositions = []
      window.addEventListener(
        'scroll',
        () => browserWindow.__scrollPositions.push(window.scrollY),
        { passive: true },
      )

      return { expectedFinalY, startY: window.scrollY }
    })

    await page
      .getByRole('navigation', { name: 'Navegação principal' })
      .getByRole('link', { name: 'Contato' })
      .click()
    await expect(page).toHaveURL(/#contact$/)
    await expect
      .poll(() => page.evaluate(() => window.scrollY))
      .toBeCloseTo(scrollMetrics.expectedFinalY, 0)

    const scrollPositions = await page.evaluate(
      () =>
        (window as typeof window & { __scrollPositions: number[] })
          .__scrollPositions,
    )
    const intermediatePositions = new Set(
      scrollPositions.filter(
        (position) =>
          position > scrollMetrics.startY + 1 &&
          position < scrollMetrics.expectedFinalY - 1,
      ),
    )

    expect(intermediatePositions.size).toBeGreaterThanOrEqual(2)
    await headerOffsetIsClear(page, 'contact', false)
  })

  test('animates return navigation to the Hero with reduced motion enabled', async ({
    page,
  }) => {
    await gotoHydrated(page, '/')
    const navigation = page.getByRole('navigation', {
      name: 'Navegação principal',
    })

    await navigation.getByRole('link', { name: 'Contato' }).click()
    await expect(page).toHaveURL(/#contact$/)
    await headerOffsetIsClear(page, 'contact', false)

    const scrollMetrics = await page.evaluate(() => {
      const target = document.querySelector<HTMLElement>('#top')
      const scrollPadding = Number.parseFloat(
        getComputedStyle(document.documentElement).scrollPaddingBlockStart,
      )

      if (!target) throw new Error('Hero destination is missing')

      const browserWindow = window as typeof window & {
        __returnScrollPositions: number[]
      }
      browserWindow.__returnScrollPositions = []
      window.addEventListener(
        'scroll',
        () => browserWindow.__returnScrollPositions.push(window.scrollY),
        { passive: true },
      )

      return {
        startY: window.scrollY,
        expectedFinalY: Math.max(
          0,
          window.scrollY + target.getBoundingClientRect().top - scrollPadding,
        ),
        historyPosition: (window.history.state as { position: number })
          .position,
      }
    })

    await page.getByRole('link', { name: 'Ir para o início' }).click()
    await expect(page).toHaveURL(/#top$/)
    await expect
      .poll(() => page.evaluate(() => window.scrollY))
      .toBeCloseTo(scrollMetrics.expectedFinalY, 0)

    const scrollPositions = await page.evaluate(
      () =>
        (window as typeof window & { __returnScrollPositions: number[] })
          .__returnScrollPositions,
    )
    const intermediatePositions = new Set(
      scrollPositions.filter(
        (position) =>
          position > scrollMetrics.expectedFinalY + 1 &&
          position < scrollMetrics.startY - 1,
      ),
    )

    expect(intermediatePositions.size).toBeGreaterThanOrEqual(2)
    expect(await page.evaluate(() => window.history.state)).toMatchObject({
      back: '/#contact',
      current: '/#top',
      position: scrollMetrics.historyPosition + 1,
    })
    await headerOffsetIsClear(page, 'top', false)

    await page.goBack()
    await expect(page).toHaveURL(/#contact$/)
    await headerOffsetIsClear(page, 'contact', false)
  })

  test('cancels an in-flight animation when browser history changes', async ({
    page,
  }) => {
    await gotoHydrated(page, '/')
    const navigation = page.getByRole('navigation', {
      name: 'Navegação principal',
    })

    await navigation.getByRole('link', { name: 'Projetos' }).click()
    await expect(page).toHaveURL(/#projects$/)
    await headerOffsetIsClear(page, 'projects')

    const projectsY = await page.evaluate(() => window.scrollY)
    await navigation.getByRole('link', { name: 'Stack' }).click()
    await expect(page).toHaveURL(/#stack$/)
    await expect
      .poll(() => page.evaluate(() => window.scrollY))
      .toBeGreaterThan(projectsY + 10)

    await page.goBack()
    await expect(page).toHaveURL(/#projects$/)
    await page.waitForTimeout(450)
    await headerOffsetIsClear(page, 'projects')
  })

  test('allows user input to interrupt an in-flight animation', async ({
    page,
  }) => {
    await gotoHydrated(page, '/')
    const expectedFinalY = await page.evaluate(() => {
      const target = document.querySelector<HTMLElement>('#contact')
      const scrollPadding = Number.parseFloat(
        getComputedStyle(document.documentElement).scrollPaddingBlockStart,
      )

      if (!target) throw new Error('Contact destination is missing')

      return Math.min(
        document.documentElement.scrollHeight - window.innerHeight,
        window.scrollY + target.getBoundingClientRect().top - scrollPadding,
      )
    })

    await page
      .getByRole('navigation', { name: 'Navegação principal' })
      .getByRole('link', { name: 'Contato' })
      .click()
    await expect(page).toHaveURL(/#contact$/)
    await expect
      .poll(() => page.evaluate(() => window.scrollY))
      .toBeGreaterThan(10)
    await page.mouse.wheel(0, -600)
    await page.waitForTimeout(450)

    expect(await page.evaluate(() => window.scrollY)).toBeLessThan(
      expectedFinalY - 50,
    )
  })
})
