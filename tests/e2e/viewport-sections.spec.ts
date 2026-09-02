import { expect, test } from '@playwright/test'

test.describe('viewport section rhythm', () => {
  test('uses a full viewport for Projects and Work Approach on spacious desktops', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto('/')

    const sectionMetrics = await page.evaluate(() =>
      ['projects', 'work-approach'].map((id) => {
        const section = document.getElementById(id)
        if (!section) throw new Error(`Missing ${id} section`)

        return {
          height: section.getBoundingClientRect().height,
          minBlockSize: getComputedStyle(section).minBlockSize,
        }
      }),
    )

    expect(sectionMetrics.map((section) => section.minBlockSize)).toEqual([
      '900px',
      '900px',
    ])
    sectionMetrics.forEach((section) => {
      expect(section.height).toBeGreaterThanOrEqual(900)
    })
  })

  test('keeps the same sections content-sized below the desktop height threshold', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1024, height: 768 })
    await page.goto('/')

    const minBlockSizes = await page.evaluate(() =>
      ['projects', 'work-approach'].map((id) => {
        const section = document.getElementById(id)
        if (!section) throw new Error(`Missing ${id} section`)

        return getComputedStyle(section).minBlockSize
      }),
    )

    expect(minBlockSizes).toEqual(['0px', '0px'])
  })
})
