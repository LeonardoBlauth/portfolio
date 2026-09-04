import { expect, test } from '@playwright/test'

test.describe('Tech Stack logo loop', () => {
  test('fades the loop edges without painting a canvas-colored overlay', async ({
    page,
  }) => {
    await page.goto('/')

    const loop = page.locator('[data-logo-loop]')
    await expect(loop).toBeVisible()

    const fadeState = await loop.evaluate((element) => ({
      overlays: element.querySelectorAll('.logo-loop__fade').length,
      maskImage: getComputedStyle(element).maskImage,
    }))

    expect(fadeState.overlays).toBe(0)
    expect(fadeState.maskImage).not.toBe('none')
  })

  test('shows one accessible technology sequence without motion or horizontal overflow when reduced motion is enabled', async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/')

    const loop = page.locator('[data-logo-loop]')
    await expect(loop).toBeVisible()

    const state = await loop.evaluate((element) => ({
      copies: element.querySelectorAll('[data-logo-loop-copy]').length,
      accessibleCopies: element.querySelectorAll(
        '[data-logo-loop-copy]:not([aria-hidden="true"])',
      ).length,
      transform: getComputedStyle(
        element.querySelector('.logo-loop__track') as HTMLElement,
      ).transform,
      hasHorizontalOverflow:
        document.documentElement.scrollWidth > window.innerWidth,
      borderTopWidth: getComputedStyle(
        element.closest('.tech-stack__logo-loop') as HTMLElement,
      ).borderTopWidth,
      borderBottomWidth: getComputedStyle(
        element.closest('.tech-stack__logo-loop') as HTMLElement,
      ).borderBottomWidth,
    }))

    expect(state).toEqual({
      copies: 1,
      accessibleCopies: 1,
      transform: 'none',
      hasHorizontalOverflow: false,
      borderTopWidth: '0px',
      borderBottomWidth: '0px',
    })
  })

  test('keeps a seamless junction gap and continuous coverage while looping', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto('/')
    await page.locator('#stack').scrollIntoViewIfNeeded()

    const loop = page.locator('[data-logo-loop]')
    await expect(loop).toBeVisible()

    await expect
      .poll(async () =>
        loop.evaluate((element) => {
          const sequences = [
            ...element.querySelectorAll('[data-logo-loop-copy]'),
          ]
          if (sequences.length < 2) return null

          const firstSequence = sequences[0] as HTMLElement
          const secondSequence = sequences[1] as HTMLElement
          const last = firstSequence.querySelector('li:last-child')
          const next = secondSequence.querySelector('li')
          if (!last || !next) return null

          const gap = Number.parseFloat(
            getComputedStyle(firstSequence).gap || '0',
          )
          const junction = Math.round(
            next.getBoundingClientRect().left -
              last.getBoundingClientRect().right,
          )
          const paddingStart =
            getComputedStyle(firstSequence).paddingInlineStart

          return {
            copies: sequences.length,
            gap,
            junction,
            paddingStart,
          }
        }),
      )
      .toMatchObject({
        gap: 48,
        junction: 48,
        paddingStart: '0px',
      })

    await expect
      .poll(async () =>
        loop.evaluate(
          (element) =>
            element.querySelectorAll('[data-logo-loop-copy]').length >= 2,
        ),
      )
      .toBe(true)

    const coverageSamples: number[] = []
    for (let index = 0; index < 20; index += 1) {
      coverageSamples.push(
        await loop.evaluate((element) => {
          const root = element.getBoundingClientRect()
          const logos = [...element.querySelectorAll('img')].filter((img) => {
            const box = img.getBoundingClientRect()
            return box.right > root.left && box.left < root.right
          })
          return logos.length
        }),
      )
      await page.waitForTimeout(200)
    }

    expect(Math.min(...coverageSamples)).toBeGreaterThanOrEqual(8)
  })
})
