import { mountSuspended } from '@nuxt/test-utils/runtime'
import { afterEach, describe, expect, it, vi } from 'vitest'

import TextType from '~/components/ui/TextType.vue'

const setReducedMotion = (matches: boolean) => {
  vi.stubGlobal(
    'matchMedia',
    vi.fn(() => ({
      matches,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })),
  )
}

describe('TextType', () => {
  afterEach(() => {
    vi.useRealTimers()
    vi.unstubAllGlobals()
  })

  it('types the name once, keeps it written, and removes the cursor', async () => {
    vi.useFakeTimers()
    setReducedMotion(false)

    const wrapper = await mountSuspended(TextType, {
      props: {
        as: 'h1',
        text: 'Leonardo\nBlauth',
        typingSpeed: 70,
        cursorCharacter: '|',
      },
    })

    expect(wrapper.get('h1 .visually-hidden').text()).toBe('Leonardo Blauth')
    expect(wrapper.get('[aria-hidden="true"]').text()).toBe('|')

    await vi.advanceTimersByTimeAsync(15 * 70)
    expect(
      wrapper.get('[aria-hidden="true"]').text().replace(/\s+/g, ' '),
    ).toContain('Leonardo Blauth')

    await vi.advanceTimersByTimeAsync(1_000)
    expect(
      wrapper.get('[aria-hidden="true"]').text().replace(/\s+/g, ' '),
    ).toBe('Leonardo Blauth')

    await vi.advanceTimersByTimeAsync(10_000)
    expect(
      wrapper.get('[aria-hidden="true"]').text().replace(/\s+/g, ' '),
    ).toBe('Leonardo Blauth')
  })

  it('renders the complete name immediately when reduced motion is enabled', async () => {
    vi.useFakeTimers()
    setReducedMotion(true)

    const wrapper = await mountSuspended(TextType, {
      props: {
        as: 'h1',
        text: 'Leonardo\nBlauth',
        typingSpeed: 70,
        cursorCharacter: '|',
      },
    })

    expect(wrapper.get('h1 .visually-hidden').text()).toBe('Leonardo Blauth')
    expect(
      wrapper.get('[aria-hidden="true"]').text().replace(/\s+/g, ' '),
    ).toBe('Leonardo Blauth')
    expect(vi.getTimerCount()).toBe(0)
  })
})
