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
      'Ver projetos',
      'Brasil',
      'Desenvolvimento web desde 2021',
    ],
    [
      '/en',
      'Open to opportunities',
      'I build end-to-end web solutions, connecting product needs with clear technical decisions.',
      'Get in touch',
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
      expect(hero.text()).toContain('Vue.js · TypeScript · Laravel · MySQL')
      expect(hero.get('a[href="#contact"]').text()).toContain(contact)
      expect(hero.get('a[href="#projects"]').text()).toContain(projects)
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
