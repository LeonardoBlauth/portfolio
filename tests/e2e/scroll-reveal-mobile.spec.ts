import { expect, test } from '@playwright/test'

test('uses a composited scroll reveal on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')

  const reveal = page.locator('#projects header[data-scroll-reveal="block"]')

  await expect(reveal).toHaveClass(/scroll-reveal--css-fade/)
})
