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
