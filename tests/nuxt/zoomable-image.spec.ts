import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'

import ZoomableImage from '~/components/projects/ZoomableImage.vue'

const stubDialog = () => {
  const dialogProto = HTMLDialogElement.prototype
  if (!dialogProto.showModal) {
    dialogProto.showModal = function showModal() {
      this.setAttribute('open', '')
    }
  }
  if (!dialogProto.close) {
    dialogProto.close = function close() {
      this.removeAttribute('open')
      this.dispatchEvent(new Event('close'))
    }
  }
}

describe('ZoomableImage', () => {
  it('opens the lightbox from the trigger and closes with Escape', async () => {
    stubDialog()

    const wrapper = await mountSuspended(ZoomableImage, {
      props: {
        src: '/images/projects/rigset/concept-overview.png',
        alt: 'Concept overview',
        caption: 'Reference snapshot',
      },
    })

    const trigger = wrapper.get('button.zoomable-image__trigger')
    const dialog = wrapper.get('dialog')
    const close = wrapper.get('button.zoomable-image__close')

    expect((dialog.element as HTMLDialogElement).open).toBe(false)
    expect(trigger.attributes('aria-label')).toContain('Concept overview')
    expect(trigger.classes()).toContain('zoomable-image__trigger')
    expect(close.text()).toBe('×')
    expect(close.attributes('aria-label')).toBe('Fechar imagem')

    await trigger.trigger('click')
    expect((dialog.element as HTMLDialogElement).open).toBe(true)
    expect(dialog.attributes('aria-modal')).toBe('true')

    await dialog.trigger('keydown', { key: 'Escape' })
    expect((dialog.element as HTMLDialogElement).open).toBe(false)
  })

  it('closes from the control and the backdrop, but not from the screenshot', async () => {
    stubDialog()

    const wrapper = await mountSuspended(ZoomableImage, {
      props: {
        src: '/images/projects/movune/schedule-light.png',
        alt: 'Agenda',
      },
    })

    const dialog = wrapper.get('dialog')
    await wrapper.get('button.zoomable-image__trigger').trigger('click')
    expect((dialog.element as HTMLDialogElement).open).toBe(true)

    await wrapper.get('.zoomable-image__expanded').trigger('click')
    expect((dialog.element as HTMLDialogElement).open).toBe(true)

    await wrapper.get('button.zoomable-image__close').trigger('click')
    expect((dialog.element as HTMLDialogElement).open).toBe(false)

    await wrapper.get('button.zoomable-image__trigger').trigger('click')
    await dialog.trigger('click')
    expect((dialog.element as HTMLDialogElement).open).toBe(false)
  })
})
