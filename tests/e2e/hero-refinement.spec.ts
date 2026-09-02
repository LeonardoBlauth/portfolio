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
