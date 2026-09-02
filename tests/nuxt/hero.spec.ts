import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'

import App from '~/app.vue'

describe('Home Hero', () => {
  it.each([
    [
      '/',
      'Disponível para oportunidades',
      'Desenvolvo soluções web de ponta a ponta, conectando necessidades de produto a decisões técnicas claras.',
      'Entrar em contato',
      'Vamos conversar',
      'Ver projetos',
      'Brasil',
      'Desenvolvimento web desde 2021',
    ],
    [
      '/en',
      'Open to opportunities',
      'I build end-to-end web solutions, connecting product needs with clear technical decisions.',
      'Get in touch',
      "Let's talk",
      'View projects',
      'Brazil',
      'Web development since 2021',
    ],
  ])(
    'renders approved localized content at %s',
    async (
      route,
      availability,
      description,
      contact,
      contactSecondary,
      projects,
      location,
      experience,
    ) => {
      const wrapper = await mountSuspended(App, { route })
      const hero = wrapper.get('section#top')

      expect(hero.get('h1 .visually-hidden').text()).toBe('Leonardo Blauth')
      expect(hero.text()).toContain('Full Stack Developer')
      expect(hero.text()).toContain(availability)
      expect(hero.text()).toContain(description)
      expect(hero.text()).toContain(location)
      expect(hero.text()).toContain(experience)

      const metadata = hero.get('.hero__metadata')
      expect(metadata.get('.hero__metadata-context').text()).toContain(location)
      expect(metadata.get('.hero__metadata-context').text()).toContain(
        experience,
      )

      const stack = metadata.get('.hero__metadata-stack')
      expect(stack.text()).toContain('Vue.js')
      expect(stack.text()).toContain('TypeScript')
      expect(stack.text()).toContain('Laravel')
      expect(stack.text()).toContain('MySQL')
      expect(stack.findAll('img')).toHaveLength(4)
      for (const logo of stack.findAll('img')) {
        expect(logo.attributes('aria-hidden')).toBe('true')
        expect(logo.attributes('alt')).toBe('')
      }

      const contactLink = hero.get('a[href="#contact"]')
      expect(contactLink.attributes('aria-label')).toBe(contact)
      expect(
        contactLink.get('.hero__cta-slide').attributes('aria-hidden'),
      ).toBe('true')
      expect(contactLink.text()).toContain(contact)
      expect(contactLink.text()).toContain(contactSecondary)
      expect(hero.get('a[href="#projects"]').text()).toContain(projects)
      expect(hero.find('.hero__cta--secondary .hero__cta-slide').exists()).toBe(
        false,
      )
      expect(hero.get('.hero__light-rays').attributes('aria-hidden')).toBe(
        'true',
      )
      expect(hero.find('.hero__orbit-system').exists()).toBe(false)
    },
  )

  it('uses approved safe destinations for professional links', async () => {
    const wrapper = await mountSuspended(App, { route: '/' })
    const hero = wrapper.get('section#top')

    for (const [href, label] of [
      ['https://github.com/LeonardoBlauth', 'GitHub'],
      ['https://www.linkedin.com/in/leonardo-blauth', 'LinkedIn'],
    ]) {
      const link = hero.get(`a[href="${href}"]`)
      expect(link.attributes('target')).toBe('_blank')
      expect(link.attributes('rel')).toBe('noopener noreferrer')
      expect(link.attributes('aria-label')).toContain(label)
    }
  })
})
