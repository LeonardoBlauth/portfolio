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

        if (!header || !target) return false

        const offset = target.y - (header.y + header.height)
        return offset >= 0 && offset <= 64
      })
      .toBe(true)
  }

  const header = await headerLocator.boundingBox()
  const target = await targetLocator.boundingBox()

  expect(header).not.toBeNull()
  expect(target).not.toBeNull()
  expect(target!.y).toBeGreaterThanOrEqual(header!.y + header!.height)
}

test.describe('desktop shell navigation', () => {
  test.use({ viewport: { width: 1440, height: 900 } })

  test('scrolls to sections without changing the homepage URL', async ({
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

    const initialHistoryState = await page.evaluate(() => history.state)
    const navigation = page.getByRole('navigation', {
      name: 'Navegação principal',
    })

    await navigation.getByRole('link', { name: 'Projetos' }).click()
    await expect(page).toHaveURL(/\/$/)
    await expect
      .poll(() => page.evaluate(() => window.scrollY))
      .toBeGreaterThan(0)
    await headerOffsetIsClear(page, 'projects')

    await navigation.getByRole('link', { name: 'Stack' }).click()
    await expect(page).toHaveURL(/\/$/)
    await headerOffsetIsClear(page, 'stack')
    expect(await page.evaluate(() => history.state)).toEqual(
      initialHistoryState,
    )
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

  test('does not create a history entry when a section is selected', async ({
    page,
  }) => {
    await gotoHydrated(page, '/')
    const initialHistoryState = await page.evaluate(() => history.state)

    await page
      .getByRole('navigation', { name: 'Navegação principal' })
      .getByRole('link', { name: 'Projetos' })
      .click()

    await headerOffsetIsClear(page, 'projects')
    await expect(page).toHaveURL(/\/$/)
    expect(await page.evaluate(() => history.state)).toEqual(
      initialHistoryState,
    )
  })

  test('reveals a floating return control after leaving the Hero', async ({
    page,
  }) => {
    await gotoHydrated(page, '/')
    const returnToHero = page.getByRole('button', {
      name: 'Voltar ao início',
    })

    await expect(returnToHero).toBeHidden()
    await page
      .getByRole('navigation', { name: 'Navegação principal' })
      .getByRole('link', { name: 'Contato' })
      .click()
    await headerOffsetIsClear(page, 'contact')

    await expect(returnToHero).toBeVisible()
    await expect(returnToHero).toHaveCSS('position', 'fixed')
    await returnToHero.click()
    await expect(page).toHaveURL(/\/$/)
    await expect
      .poll(() => page.evaluate(() => window.scrollY))
      .toBeCloseTo(0, 0)
    await expect(returnToHero).toBeHidden()
  })

  test('keeps the floating return control visible in the light theme', async ({
    page,
  }) => {
    await page.addInitScript(() => {
      localStorage.setItem('portfolio-theme', 'light')
    })
    await gotoHydrated(page, '/')

    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')
    await page
      .getByRole('navigation', { name: 'Navegação principal' })
      .getByRole('link', { name: 'Contato' })
      .click()
    await headerOffsetIsClear(page, 'contact')

    const returnToHero = page.getByRole('button', {
      name: 'Voltar ao início',
    })
    await expect(returnToHero).toBeVisible()
    await expect(returnToHero).toHaveCSS('color', 'rgb(36, 95, 223)')
    await expect(returnToHero).toHaveCSS(
      'background-color',
      'rgb(255, 255, 255)',
    )
  })

  test('keeps the selected section URL-free across locale navigation', async ({
    page,
  }) => {
    await gotoHydrated(page, '/')

    await page
      .getByRole('navigation', { name: 'Navegação principal' })
      .getByRole('link', { name: 'Stack' })
      .click()
    await headerOffsetIsClear(page, 'stack')
    await page.evaluate(() => {
      ;(
        window as typeof window & { __localeSwitchSentinel?: boolean }
      ).__localeSwitchSentinel = true
    })
    const stackY = await page.evaluate(() => window.scrollY)
    await page.getByRole('link', { name: 'Mudar idioma para English' }).click()
    await expect(page).toHaveURL(/\/en$/)
    expect(
      await page.evaluate(
        () =>
          (window as typeof window & { __localeSwitchSentinel?: boolean })
            .__localeSwitchSentinel,
      ),
    ).toBe(true)
    await expect
      .poll(() => page.evaluate(() => window.scrollY))
      .toBeGreaterThan(stackY - 24)
    await expect(page.locator('html')).toHaveAttribute('lang', 'en')

    await page.goBack()
    await expect(page).toHaveURL(/\/$/)

    await page.goForward()
    await expect(page).toHaveURL(/\/en$/)
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

    await expect(page).toHaveURL(/\/en\/$/)
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

    const backToProjects = page.getByRole('button', {
      name: 'Voltar para projetos',
    })
    await expect(backToProjects).toHaveCount(2)
    await expect(
      page.getByRole('link', { name: 'Voltar para projetos' }),
    ).toHaveCount(0)
    await backToProjects.first().click()
    await expect(page).toHaveURL(/\/$/)
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

  test('condenses the long homepage without hiding core stack content', async ({
    page,
  }) => {
    await gotoHydrated(page, '/')

    await page.locator('#stack').scrollIntoViewIfNeeded()

    const stackColumns = await page
      .locator('.tech-stack-group ul')
      .first()
      .evaluate((element) => getComputedStyle(element).gridTemplateColumns)
    expect(stackColumns.split(' ')).toHaveLength(2)

    const complementaryTechnologies = page
      .locator('.tech-stack-group--additional')
      .getByRole('list')
    const exploringTechnologies = page
      .locator('.tech-stack-group--exploring')
      .getByRole('list')
    await expect(complementaryTechnologies).toBeHidden()
    await expect(exploringTechnologies).toBeHidden()
    const initialPageHeight = await page.evaluate(
      () => document.documentElement.scrollHeight,
    )

    const complementaryToggle = page.locator(
      'button[aria-controls="technology-list-additional"]',
    )
    await expect(complementaryToggle).toHaveAccessibleName(
      'Ver tecnologias de Experiência complementar',
    )
    await expect(complementaryToggle).toHaveAttribute('aria-expanded', 'false')
    await complementaryToggle.click()
    await expect(complementaryTechnologies).toBeVisible()
    await expect(complementaryToggle).toHaveAttribute('aria-expanded', 'true')
    await expect(complementaryToggle).toHaveAccessibleName(
      'Ocultar tecnologias de Experiência complementar',
    )

    const sectionPadding = await page
      .locator('#experience')
      .evaluate((element) =>
        Number.parseFloat(getComputedStyle(element).paddingTop),
      )
    expect(sectionPadding).toBeLessThanOrEqual(64)
    expect(initialPageHeight).toBeLessThan(6700)
  })

  test('uses only the hamburger navigation without horizontal overflow at 320px', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 320, height: 700 })
    await gotoHydrated(page, '/')

    await expect(page.getByRole('button', { name: 'Abrir menu' })).toBeVisible()
    await expect(
      page.getByRole('navigation', { name: 'Atalhos de seção' }),
    ).toHaveCount(0)
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true)

    const footerLayout = page.locator('.site-footer__layout')
    const footerIdentity = page.locator('.site-footer__identity')
    const footerCopyright = page.locator('[data-footer-copyright]')
    await expect(footerLayout).toHaveCSS('flex-direction', 'row')
    const identityBox = await footerIdentity.boundingBox()
    const copyrightBox = await footerCopyright.boundingBox()
    expect(identityBox).not.toBeNull()
    expect(copyrightBox).not.toBeNull()
    expect(Math.abs(identityBox!.y - copyrightBox!.y)).toBeLessThanOrEqual(8)
  })

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
    await expect(dialog.getByRole('button', { name: 'Contato' })).toBeFocused()

    await page.keyboard.press('Escape')
    await expect(dialog).toBeHidden()
    await expect(trigger).toBeFocused()

    await trigger.click()
    await dialog.getByRole('button', { name: 'Projetos' }).click()
    await expect(dialog).toBeHidden()
    await expect(page).toHaveURL(/\/$/)
    await headerOffsetIsClear(page, 'projects')
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

test.describe('contact and footer', () => {
  test('keeps footer content inside the shared page container on desktop', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await gotoHydrated(page, '/')

    const [contactLayoutBox, footerLayoutBox] = await Promise.all([
      page.locator('.contact__layout').boundingBox(),
      page.locator('.site-footer__layout').boundingBox(),
    ])

    expect(contactLayoutBox).not.toBeNull()
    expect(footerLayoutBox).not.toBeNull()
    expect(footerLayoutBox!.x).toBeCloseTo(contactLayoutBox!.x, 0)
    expect(footerLayoutBox!.width).toBeCloseTo(contactLayoutBox!.width, 0)
  })

  test('keeps the contact breathing room while the footer remains compact', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await gotoHydrated(page, '/')

    const contactLayout = page.locator('.contact__layout')
    const footer = page.locator('footer')
    const footerLayout = page.locator('.site-footer__layout')

    const [contactLayoutBox, footerBox, footerLayoutBox] = await Promise.all([
      contactLayout.boundingBox(),
      footer.boundingBox(),
      footerLayout.boundingBox(),
    ])

    expect(contactLayoutBox).not.toBeNull()
    expect(footerBox).not.toBeNull()
    expect(footerLayoutBox).not.toBeNull()
    const contactToFooterGap =
      footerBox!.y - (contactLayoutBox!.y + contactLayoutBox!.height)

    expect(contactToFooterGap).toBeGreaterThanOrEqual(112)
    expect(contactToFooterGap).toBeLessThanOrEqual(136)
    expect(footerLayoutBox!.height).toBeLessThanOrEqual(96)
  })

  test('exposes the approved destinations in logical keyboard order', async ({
    page,
  }) => {
    await gotoHydrated(page, '/en')

    const contact = page.getByRole('navigation', { name: 'Contact options' })
    const email = contact.getByRole('link', { name: 'Email' })
    const github = contact.getByRole('link', {
      name: 'GitHub (opens in a new tab)',
    })
    const linkedin = contact.getByRole('link', {
      name: 'LinkedIn (opens in a new tab)',
    })

    await expect(email).toHaveAttribute(
      'href',
      'mailto:contato@leonardoblauth.dev',
    )
    await expect(github).toHaveAttribute(
      'href',
      'https://github.com/LeonardoBlauth',
    )
    await expect(linkedin).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/leonardo-blauth',
    )

    for (const link of [github, linkedin]) {
      await expect(link).toHaveAttribute('target', '_blank')
      await expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    }

    await email.focus()
    await expect(email).toBeFocused()
    await page.keyboard.press('Tab')
    await expect(github).toBeFocused()
    await page.keyboard.press('Tab')
    await expect(linkedin).toBeFocused()

    const footer = page.locator('footer')
    await expect(footer).not.toContainText('Leonardo Blauth')
    await expect(footer).toContainText('© 2026')
    await expect(footer.getByRole('link')).toHaveCount(0)
    const footerMonogram = footer.locator('[data-footer-monogram]')
    await expect(footerMonogram).toHaveAttribute('aria-hidden', 'true')
    await expect(footerMonogram.locator('img')).toHaveCount(2)
    await expect(footerMonogram.locator('img').first()).toHaveAttribute(
      'src',
      '/brand/lb-monogram-color.svg',
    )
    await expect(footerMonogram.locator('img').last()).toHaveAttribute(
      'src',
      '/brand/lb-monogram-cobalt.svg',
    )
  })

  test('keeps contact actions comfortable and overflow-free on mobile', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await gotoHydrated(page, '/')

    const actions = page.locator('.contact__action')
    await expect(actions).toHaveCount(3)

    for (const action of await actions.all()) {
      const box = await action.boundingBox()
      expect(box).not.toBeNull()
      expect(box!.height).toBeGreaterThanOrEqual(44)
    }

    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true)
  })
})

test.describe('reduced motion navigation', () => {
  test.use({
    viewport: { width: 1024, height: 768 },
    contextOptions: { reducedMotion: 'reduce' },
  })

  test('moves immediately to a hash with reduced motion enabled', async ({
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
    await expect(page).toHaveURL(/\/$/)
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

    expect(intermediatePositions.size).toBe(0)
    await headerOffsetIsClear(page, 'contact', false)
  })

  test('returns immediately to the Hero with reduced motion enabled', async ({
    page,
  }) => {
    await gotoHydrated(page, '/#contact')
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

    const homeControl = page.getByRole('button', { name: 'Ir para o início' })
    await expect(homeControl).toHaveCount(1)
    await expect(
      page.getByRole('link', { name: 'Ir para o início' }),
    ).toHaveCount(0)
    await homeControl.click()
    await expect(page).toHaveURL(/\/#contact$/)
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

    expect(intermediatePositions.size).toBe(0)
    expect(await page.evaluate(() => window.history.state)).toMatchObject({
      position: scrollMetrics.historyPosition,
    })
    const header = await page.locator('.site-header').boundingBox()
    const heroTitle = await page.locator('#hero-title').boundingBox()

    expect(header).not.toBeNull()
    expect(heroTitle).not.toBeNull()
    expect(heroTitle!.y).toBeGreaterThanOrEqual(header!.y + header!.height)

    await expect(page).toHaveURL(/\/#contact$/)
  })

  test('makes both native Hero hash links immediate with reduced motion enabled', async ({
    page,
  }) => {
    const destinations = [
      { link: 'Ver projetos', id: 'projects' },
      { link: 'Entrar em contato', id: 'contact' },
    ]

    for (const destination of destinations) {
      await gotoHydrated(page, '/')
      const metrics = await page.evaluate((id) => {
        const target = document.getElementById(id)
        if (!target) throw new Error(`Missing ${id} destination`)
        const scrollPadding = Number.parseFloat(
          getComputedStyle(document.documentElement).scrollPaddingBlockStart,
        )
        const browserWindow = window as typeof window & {
          __heroScrollPositions: number[]
        }
        browserWindow.__heroScrollPositions = []
        window.addEventListener(
          'scroll',
          () => browserWindow.__heroScrollPositions.push(window.scrollY),
          { passive: true },
        )
        return {
          expectedFinalY: Math.min(
            document.documentElement.scrollHeight - window.innerHeight,
            window.scrollY + target.getBoundingClientRect().top - scrollPadding,
          ),
        }
      }, destination.id)

      await page.getByRole('link', { name: destination.link }).click()
      await expect(page).toHaveURL(new RegExp(`#${destination.id}$`))
      await expect
        .poll(() => page.evaluate(() => window.scrollY))
        .toBeCloseTo(metrics.expectedFinalY, 0)

      const intermediatePositions = await page.evaluate(
        ({ finalY }) =>
          (
            window as typeof window & { __heroScrollPositions: number[] }
          ).__heroScrollPositions.filter(
            (position) => position > 1 && position < finalY - 1,
          ),
        { finalY: metrics.expectedFinalY },
      )
      expect(new Set(intermediatePositions).size).toBe(0)
      await headerOffsetIsClear(page, destination.id, false)
    }
  })

  test('cancels an in-flight animation when another section is selected', async ({
    page,
  }) => {
    await gotoHydrated(page, '/')
    const navigation = page.getByRole('navigation', {
      name: 'Navegação principal',
    })

    await navigation.getByRole('link', { name: 'Projetos' }).click()
    await expect(page).toHaveURL(/\/$/)
    await headerOffsetIsClear(page, 'projects')

    const projectsY = await page.evaluate(() => window.scrollY)
    await navigation.getByRole('link', { name: 'Stack' }).click()
    await expect(page).toHaveURL(/\/$/)
    await expect
      .poll(() => page.evaluate(() => window.scrollY))
      .toBeGreaterThan(projectsY + 10)

    await navigation.getByRole('link', { name: 'Projetos' }).click()
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
    await expect(page).toHaveURL(/\/$/)
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

test.describe('cross-cutting integration', () => {
  const publicRoutes = ['/', '/en', '/projetos/movune', '/en/projects/movune']

  test('keeps every localized route axe-clean in both themes', async ({
    page,
  }) => {
    for (const theme of ['light', 'dark']) {
      for (const route of publicRoutes) {
        await page.addInitScript((selectedTheme) => {
          localStorage.setItem('portfolio-theme', selectedTheme)
        }, theme)
        await gotoHydrated(page, route)
        await expect(page.locator('html')).toHaveAttribute('data-theme', theme)

        const results = await new AxeBuilder({ page })
          .disableRules(['document-title'])
          .analyze()
        expect(results.violations, `${theme} theme at ${route}`).toEqual([])
      }
    }
  })

  test('preserves both case-study routes and both return paths', async ({
    page,
  }) => {
    const journeys = [
      {
        casePath: '/projetos/movune',
        switchName: 'Mudar idioma para English',
        switchedPath: '/en/projects/movune',
        backName: 'Back to projects',
        homePath: '/en',
      },
      {
        casePath: '/en/projects/movune',
        switchName: 'Switch language to português',
        switchedPath: '/projetos/movune',
        backName: 'Voltar para projetos',
        homePath: '/',
      },
    ]

    for (const journey of journeys) {
      await gotoHydrated(page, journey.casePath)
      await page.getByRole('link', { name: journey.switchName }).click()
      await expect(page).toHaveURL(new RegExp(`${journey.switchedPath}$`))

      for (const position of ['first', 'last'] as const) {
        const returnButtons = page.getByRole('button', {
          name: journey.backName,
        })
        await expect(returnButtons).toHaveCount(2)
        await expect(
          page.getByRole('link', { name: journey.backName }),
        ).toHaveCount(0)
        await (
          position === 'first' ? returnButtons.first() : returnButtons.last()
        ).click()
        await expect(page).toHaveURL(
          new RegExp(`${journey.homePath.replace('#', '\\#')}$`),
        )
        await headerOffsetIsClear(page, 'projects')
        await gotoHydrated(page, journey.switchedPath)
      }
    }
  })

  test('reflows the full application at reference widths and 200% text size', async ({
    page,
  }) => {
    const viewports = [
      { width: 1440, height: 900 },
      { width: 1024, height: 768 },
      { width: 853, height: 1280 },
      { width: 641, height: 900 },
      { width: 390, height: 844 },
    ]

    for (const route of publicRoutes) {
      for (const viewport of viewports) {
        await page.setViewportSize(viewport)
        await gotoHydrated(page, route)
        expect(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= window.innerWidth,
          ),
          `${route} at ${viewport.width}px`,
        ).toBe(true)
      }
    }

    await page.setViewportSize({ width: 1024, height: 768 })
    const cdp = await page.context().newCDPSession(page)
    await cdp.send('Emulation.setDeviceMetricsOverride', {
      width: 512,
      height: 384,
      deviceScaleFactor: 2,
      mobile: false,
      screenWidth: 1024,
      screenHeight: 768,
    })

    for (const route of ['/', '/en']) {
      await gotoHydrated(page, route)
      expect(
        await page.evaluate(() => ({
          devicePixelRatio: window.devicePixelRatio,
          innerWidth: window.innerWidth,
        })),
        `${route} browser zoom emulation`,
      ).toEqual({ devicePixelRatio: 2, innerWidth: 512 })
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
        `${route} at 200% text size`,
      ).toBe(true)
      await expect(page.locator('#contact')).toBeAttached()
    }
    await cdp.send('Emulation.clearDeviceMetricsOverride')
  })

  test('supports complete keyboard traversal on every localized route', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 })

    for (const route of publicRoutes) {
      await gotoHydrated(page, route)
      const focusableCount = await page
        .locator(
          'a[href]:visible, button:not([disabled]):visible, [tabindex="0"]:visible',
        )
        .count()
      const visited = new Set<string>()

      for (let index = 0; index < focusableCount; index += 1) {
        await page.keyboard.press('Tab')
        const focusState = await page.evaluate(() => {
          const active = document.activeElement as HTMLElement | null
          if (!active) return null
          const focusable = Array.from(
            document.querySelectorAll<HTMLElement>(
              'a[href], button:not([disabled]), [tabindex="0"]',
            ),
          ).filter((element) => element.getClientRects().length > 0)
          const styles = getComputedStyle(active)
          return {
            key: String(focusable.indexOf(active)),
            outlineStyle: styles.outlineStyle,
            outlineWidth: styles.outlineWidth,
          }
        })

        expect(focusState, `missing focus at ${route}`).not.toBeNull()
        expect(focusState!.outlineStyle, `focus style at ${route}`).not.toBe(
          'none',
        )
        expect(focusState!.outlineWidth, `focus style at ${route}`).not.toBe(
          '0px',
        )
        visited.add(focusState!.key)
      }

      expect(visited.size, `keyboard sequence at ${route}`).toBe(focusableCount)
    }
  })

  test('uses valid themed interaction styles and accessible CTA contrast', async ({
    page,
  }) => {
    await page.addInitScript(() => {
      localStorage.setItem('portfolio-theme', 'dark')
    })
    await gotoHydrated(page, '/')

    const contactAction = page.locator('.contact__action').first()
    const initialBackground = await contactAction.evaluate(
      (element) => getComputedStyle(element).backgroundColor,
    )
    await contactAction.hover()
    await expect
      .poll(() =>
        contactAction.evaluate(
          (element) => getComputedStyle(element).backgroundColor,
        ),
      )
      .not.toBe(initialBackground)
    expect(
      await contactAction.evaluate(
        (element) => getComputedStyle(element).transitionDuration,
      ),
    ).not.toBe('0s')

    const primaryCta = page.locator('.hero__cta--primary')
    await primaryCta.hover()
    const contrast = await primaryCta.evaluate((element) => {
      const parseRgb = (value: string) =>
        value
          .match(/[\d.]+/g)!
          .slice(0, 3)
          .map(Number)
      const luminance = (rgb: number[]) => {
        const channels = rgb.map((value) => {
          const channel = value / 255
          return channel <= 0.04045
            ? channel / 12.92
            : Math.pow((channel + 0.055) / 1.055, 2.4)
        })
        return (
          0.2126 * channels[0]! + 0.7152 * channels[1]! + 0.0722 * channels[2]!
        )
      }
      const styles = getComputedStyle(element)
      const foreground = luminance(parseRgb(styles.color))
      const background = luminance(parseRgb(styles.backgroundColor))
      return (
        (Math.max(foreground, background) + 0.05) /
        (Math.min(foreground, background) + 0.05)
      )
    })
    expect(contrast).toBeGreaterThanOrEqual(4.5)

    for (const selector of ['.hero__name', '.selected-project h3']) {
      const typography = await page.locator(selector).evaluate((element) => {
        const styles = getComputedStyle(element)
        const fontSize = Number.parseFloat(styles.fontSize)
        const letterSpacing = Number.parseFloat(styles.letterSpacing)

        return {
          fontSize,
          trackingEm: letterSpacing / fontSize,
        }
      })

      expect(
        typography.fontSize,
        `${selector} display size`,
      ).toBeLessThanOrEqual(96)
      expect(
        typography.trackingEm,
        `${selector} tracking`,
      ).toBeGreaterThanOrEqual(-0.04)
    }
  })
})
