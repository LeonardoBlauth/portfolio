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
  const header = await page.locator('header .site-header__bar').boundingBox()
  const target = await page.locator(`#${id}`).boundingBox()

  expect(header).not.toBeNull()
  expect(target).not.toBeNull()
  expect(target!.y).toBeGreaterThanOrEqual(header!.y + header!.height)
  if (expectTightOffset) {
    expect(target!.y).toBeLessThanOrEqual(header!.y + header!.height + 32)
  }
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
})

test.describe('localized and persisted controls', () => {
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
})

test.describe('reduced motion navigation', () => {
  test.use({
    viewport: { width: 1024, height: 768 },
    contextOptions: { reducedMotion: 'reduce' },
  })

  test('uses immediate scrolling while preserving hash navigation', async ({
    page,
  }) => {
    await gotoHydrated(page, '/')
    expect(
      await page.evaluate(
        () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
      ),
    ).toBe(true)
    await expect
      .poll(() =>
        page.evaluate(
          () => getComputedStyle(document.documentElement).scrollBehavior,
        ),
      )
      .toBe('auto')

    await page
      .getByRole('navigation', { name: 'Navegação principal' })
      .getByRole('link', { name: 'Contato' })
      .click()
    await expect(page).toHaveURL(/#contact$/)
    await headerOffsetIsClear(page, 'contact', false)
  })
})
