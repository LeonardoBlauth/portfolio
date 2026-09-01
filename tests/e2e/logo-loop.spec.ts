import { expect, test } from '@playwright/test'

test.describe('Tech Stack logo loop', () => {
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
})
