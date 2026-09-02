import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'

import App from '~/app.vue'

describe('contact and footer', () => {
  it.each([
    {
      route: '/',
      label: 'Contato',
      headline: 'Vamos conversar sobre a próxima oportunidade?',
      description:
        'Se meu perfil fizer sentido para o seu time, quero conhecer melhor a oportunidade.',
      emailLabel: 'Email',
      githubLabel: 'GitHub (abre em uma nova aba)',
      linkedinLabel: 'LinkedIn (abre em uma nova aba)',
    },
    {
      route: '/en',
      label: 'Contact',
      headline: 'Let’s talk about the next opportunity.',
      description:
        'If my profile feels like a good fit for your team, I’d like to learn more about the opportunity.',
      emailLabel: 'Email',
      githubLabel: 'GitHub (opens in a new tab)',
      linkedinLabel: 'LinkedIn (opens in a new tab)',
    },
  ])('renders approved localized contact content at $route', async (copy) => {
    const wrapper = await mountSuspended(App, { route: copy.route })
    const contact = wrapper.get('section#contact')

    expect(contact.get('.contact__label').text()).toBe(copy.label)
    expect(contact.get('h2').text()).toBe(copy.headline)
    expect(contact.get('.contact__description').text()).toBe(copy.description)
    expect(contact.findAll('[data-spotlight-card]')).toHaveLength(1)
    expect(contact.get('.contact__card')).toBeTruthy()
    expect(
      contact.get('[data-spotlight-layer]').attributes('aria-hidden'),
    ).toBe('true')

    const links = contact.findAll('.contact__action')
    expect(links.map((link) => link.attributes('aria-label'))).toEqual([
      copy.emailLabel,
      copy.githubLabel,
      copy.linkedinLabel,
    ])
    expect(links.map((link) => link.text())).toEqual([
      'contato@leonardoblauth.dev',
      'GitHub',
      'LinkedIn',
    ])
    expect(links.map((link) => link.attributes('href'))).toEqual([
      'mailto:contato@leonardoblauth.dev',
      'https://github.com/LeonardoBlauth',
      'https://www.linkedin.com/in/leonardo-blauth',
    ])
    expect(links[0]?.attributes('target')).toBeUndefined()

    for (const link of links.slice(1)) {
      expect(link.attributes('target')).toBe('_blank')
      expect(link.attributes('rel')).toBe('noopener noreferrer')
    }

    expect(links[1]?.get('svg path').attributes('d')).toContain(
      'M12 2.75a9.25 9.25',
    )
    expect(links[2]?.get('svg path').attributes('d')).toBe(
      'M6.5 8.5v9m0-12.25v.01M10.5 17.5v-9m0 4a4 4 0 0 1 8 0v5',
    )
  })

  it('keeps the footer intentionally limited to brand and copyright', async () => {
    const wrapper = await mountSuspended(App, { route: '/' })
    const footer = wrapper.get('footer')

    const monogram = footer.get('[data-footer-monogram]')
    expect(monogram.attributes('aria-hidden')).toBe('true')
    expect(monogram.findAll('img')).toHaveLength(2)
    expect(monogram.get('.site-footer__monogram-dark').attributes('src')).toBe(
      '/brand/lb-monogram-color.svg',
    )
    expect(monogram.get('.site-footer__monogram-light').attributes('src')).toBe(
      '/brand/lb-monogram-cobalt.svg',
    )
    expect(footer.find('[data-footer-name]').exists()).toBe(false)
    expect(footer.text()).not.toContain('Leonardo Blauth')
    expect(footer.get('[data-footer-copyright]').text()).toBe('© 2026')
    expect(footer.findAll('a')).toHaveLength(0)
    expect(footer.text()).not.toContain('contato@leonardoblauth.dev')
    expect(footer.text()).not.toContain('GitHub')
    expect(footer.text()).not.toContain('LinkedIn')
  })
})
