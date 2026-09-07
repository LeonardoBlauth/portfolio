import { expect, test } from '@playwright/test'

test.describe('Rigset plan flow', () => {
  test('centers the vertical plan, apply, and verify sequence on narrow screens', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/projects/rigset')

    const flow = page.locator('.plan-model__stages')
    await expect(flow).toBeVisible()

    const state = await flow.evaluate((element) => {
      const items = [...element.querySelectorAll('li')]
      const flowBounds = element.getBoundingClientRect()

      return {
        labels: items.map((item) => item.textContent?.trim()),
        flowCenter: flowBounds.left + flowBounds.width / 2,
        itemCenters: items.map((item) => {
          const bounds = item.getBoundingClientRect()
          return bounds.left + bounds.width / 2
        }),
        arrowAlignments: items
          .slice(1)
          .map((item) => getComputedStyle(item, '::before').textAlign),
      }
    })

    expect(state.labels).toEqual(['Plan', 'Apply', 'Verify'])
    state.itemCenters.forEach((itemCenter) => {
      expect(Math.abs(itemCenter - state.flowCenter)).toBeLessThanOrEqual(1)
    })
    expect(state.arrowAlignments).toEqual(['center', 'center'])
  })
})
