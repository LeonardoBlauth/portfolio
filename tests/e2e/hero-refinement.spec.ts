import { expect, test } from '@playwright/test'

test.describe('Hero refinement', () => {
  test('uses both desktop columns for identity and professional details', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto('/')

    const layout = await page.evaluate(() => {
      const identity = document.querySelector<HTMLElement>('.hero__identity')
      const details = document.querySelector<HTMLElement>('.hero__details')

      if (!identity || !details) throw new Error('Hero columns are missing')

      const identityRect = identity.getBoundingClientRect()
      const detailsRect = details.getBoundingClientRect()

      return {
        identityRight: identityRect.right,
        detailsLeft: detailsRect.left,
        detailsTop: detailsRect.top,
        identityTop: identityRect.top,
      }
    })

    expect(layout.identityRight).toBeLessThanOrEqual(layout.detailsLeft)
    expect(Math.abs(layout.identityTop - layout.detailsTop)).toBeLessThan(180)
  })

  test('keeps the professional context and core stack on one desktop row', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto('/')

    const metadata = await page.evaluate(() => {
      const context = document.querySelector<HTMLElement>(
        '.hero__metadata-context',
      )
      const stack = document.querySelector<HTMLElement>('.hero__metadata-stack')

      if (!context || !stack)
        throw new Error('Hero metadata groups are missing')

      const contextRect = context.getBoundingClientRect()
      const stackRect = stack.getBoundingClientRect()
      const stackStyle = getComputedStyle(stack)

      return {
        verticalDistance: Math.abs(contextRect.top - stackRect.top),
        stackLeft: stackRect.left,
        contextRight: contextRect.right,
        stackDividerWidth: stackStyle.borderInlineStartWidth,
      }
    })

    expect(metadata.verticalDistance).toBeLessThanOrEqual(1)
    expect(metadata.stackLeft).toBeGreaterThanOrEqual(metadata.contextRight)
    expect(metadata.stackDividerWidth).toBe('1px')
  })

  test('keeps hero copy below the header and drops the wrapped stack divider on a phone', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/')

    const layout = await page.evaluate(() => {
      const header = document.querySelector<HTMLElement>(
        'header .site-header__bar',
      )
      const identity = document.querySelector<HTMLElement>('.hero__identity')
      const stack = document.querySelector<HTMLElement>('.hero__metadata-stack')

      if (!header || !identity || !stack) {
        throw new Error('Hero mobile layout elements are missing')
      }

      const headerRect = header.getBoundingClientRect()
      const identityRect = identity.getBoundingClientRect()
      const stackStyle = getComputedStyle(stack)

      return {
        identityTop: identityRect.top,
        headerBottom: headerRect.bottom,
        stackDividerWidth: stackStyle.borderInlineStartWidth,
        stackPaddingInlineStart: stackStyle.paddingInlineStart,
      }
    })

    expect(layout.identityTop).toBeGreaterThanOrEqual(layout.headerBottom)
    expect(layout.stackDividerWidth).toBe('0px')
    expect(Number.parseFloat(layout.stackPaddingInlineStart)).toBe(0)
  })

  test('stacks the same semantic groups without horizontal overflow on mobile', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/')

    const layout = await page.evaluate(() => {
      const identity = document.querySelector<HTMLElement>('.hero__identity')
      const details = document.querySelector<HTMLElement>('.hero__details')

      if (!identity || !details) throw new Error('Hero groups are missing')

      return {
        identityBottom: identity.getBoundingClientRect().bottom,
        detailsTop: details.getBoundingClientRect().top,
        hasHorizontalOverflow:
          document.documentElement.scrollWidth > window.innerWidth,
      }
    })

    expect(layout.detailsTop).toBeGreaterThanOrEqual(layout.identityBottom)
    expect(layout.hasHorizontalOverflow).toBe(false)
  })

  test('shows every Hero group immediately with reduced motion', async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/')
    await page.waitForTimeout(20)

    const visibility = await page.evaluate(() =>
      ['.hero__role', '.hero__availability', '.hero__details'].map(
        (selector) => {
          const element = document.querySelector<HTMLElement>(selector)
          if (!element) throw new Error(`${selector} is missing`)

          const style = getComputedStyle(element)
          return { opacity: style.opacity, transform: style.transform }
        },
      ),
    )

    expect(visibility).toEqual([
      { opacity: '1', transform: 'none' },
      { opacity: '1', transform: 'none' },
      { opacity: '1', transform: 'none' },
    ])
  })

  test('starts professional details only after availability has finished appearing', async ({
    page,
  }) => {
    await page.goto('/')

    const schedule = await page.evaluate(() => {
      const availability = document.querySelector('.hero__availability')
      const details = document.querySelector('.hero__details')

      if (!availability || !details)
        throw new Error('Hero motion groups are missing')

      const availabilityStyle = getComputedStyle(availability)
      const detailsStyle = getComputedStyle(details)

      return {
        availabilityDelay: Number.parseFloat(availabilityStyle.animationDelay),
        availabilityDuration: Number.parseFloat(
          availabilityStyle.animationDuration,
        ),
        detailsDelay: Number.parseFloat(detailsStyle.animationDelay),
      }
    })

    expect(schedule.detailsDelay).toBeGreaterThanOrEqual(
      schedule.availabilityDelay + schedule.availabilityDuration,
    )
  })
})

const contactSlideMetrics = (page: import('@playwright/test').Page) =>
  page.evaluate(() => {
    const cta = document.querySelector<HTMLElement>('.hero__cta--primary')
    const primary = document.querySelector<HTMLElement>(
      '.hero__cta-slide__layer--primary',
    )
    const secondary = document.querySelector<HTMLElement>(
      '.hero__cta-slide__layer--secondary',
    )

    if (!cta || !primary || !secondary) {
      throw new Error('Hero contact slide layers are missing')
    }

    const box = cta.getBoundingClientRect()

    return {
      width: box.width,
      height: box.height,
      accessibleName: cta.getAttribute('aria-label'),
      hover: matchMedia('(hover: hover) and (pointer: fine)').matches,
      primaryY: new DOMMatrix(getComputedStyle(primary).transform).f,
      secondaryY: new DOMMatrix(getComputedStyle(secondary).transform).f,
    }
  })

test.describe('Hero primary CTA slide text', () => {
  test.use({ viewport: { width: 1440, height: 900 } })

  test('slides the contact label as a unit without resizing the button', async ({
    page,
  }) => {
    await page.goto('/')
    const contact = page.getByRole('link', { name: 'Entrar em contato' })
    await expect(contact).toBeVisible()

    const rest = await contactSlideMetrics(page)
    expect(rest.accessibleName).toBe('Entrar em contato')
    expect(rest.hover).toBe(true)
    expect(rest.primaryY).toBeCloseTo(0, 0)
    expect(rest.secondaryY).toBeGreaterThan(0)

    await contact.hover()
    await expect
      .poll(async () => (await contactSlideMetrics(page)).primaryY)
      .toBeLessThan(-8)
    const hovered = await contactSlideMetrics(page)
    expect(hovered.secondaryY).toBeCloseTo(0, 0)
    expect(hovered.width).toBeCloseTo(rest.width, 0)
    expect(hovered.height).toBeCloseTo(rest.height, 0)
    expect(hovered.accessibleName).toBe('Entrar em contato')

    await page.mouse.move(0, 0)
    await expect
      .poll(async () => (await contactSlideMetrics(page)).primaryY)
      .toBeCloseTo(0, 0)

    await contact.focus()
    await page.keyboard.press('Shift+Tab')
    await page.keyboard.press('Tab')
    await expect
      .poll(async () => (await contactSlideMetrics(page)).primaryY)
      .toBeLessThan(-8)

    await page.keyboard.press('Enter')
    await expect(page).toHaveURL(/#contact$/)
  })

  test('keeps the primary contact label when reduced motion is requested', async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/')
    const contact = page.getByRole('link', { name: 'Entrar em contato' })
    await contact.hover()
    const hovered = await contactSlideMetrics(page)
    expect(hovered.primaryY).toBeCloseTo(0, 0)
    expect(hovered.secondaryY).toBeGreaterThan(0)
  })

  test('updates both slide labels after a client-side locale switch', async ({
    page,
  }) => {
    await page.goto('/')
    await page.getByRole('link', { name: 'Mudar idioma para English' }).click()
    await expect(page).toHaveURL(/\/en$/)
    const contact = page.getByRole('link', { name: 'Get in touch' })
    await expect(contact).toBeVisible()
    await expect(page.locator('.hero__cta-slide__layer--secondary')).toHaveText(
      /Let's talk/,
    )
    await contact.hover()
    await expect
      .poll(async () => (await contactSlideMetrics(page)).secondaryY)
      .toBeCloseTo(0, 0)
  })
})

test.describe('Hero primary CTA on a touch device', () => {
  test.use({
    hasTouch: true,
    isMobile: true,
    viewport: { width: 390, height: 844 },
  })

  test('keeps the primary label and navigates on the first tap', async ({
    page,
  }) => {
    await page.goto('/')
    const rest = await contactSlideMetrics(page)
    expect(rest.hover).toBe(false)
    expect(rest.accessibleName).toBe('Entrar em contato')
    expect(rest.primaryY).toBeCloseTo(0, 0)

    const contact = page.getByRole('link', { name: 'Entrar em contato' })
    await contact.hover()
    const afterHover = await contactSlideMetrics(page)
    expect(afterHover.primaryY).toBeCloseTo(0, 0)
    expect(afterHover.secondaryY).toBeGreaterThan(0)
    expect(afterHover.width).toBeCloseTo(rest.width, 0)

    await contact.click()
    await expect(page).toHaveURL(/#contact$/)
  })
})
