import type { SupportedLocale } from '~/utils/locale'

export const siteOrigin = 'https://leonardoblauth.dev'

type SeoRouteKey = 'home' | 'movune' | 'rigset' | 'eligent'

type PageSeo = {
  title: string
  description: string
  socialImage: string
  socialImageAlt: string
  socialImageUrl: string
}

const socialImage = (path: string, alt: string) => ({
  socialImage: path,
  socialImageAlt: alt,
  socialImageUrl: `${siteOrigin}${path}`,
})

const pageSeo: Record<SeoRouteKey, Record<SupportedLocale, PageSeo>> = {
  home: {
    en: {
      title: 'Leonardo Blauth — Full Stack Developer',
      description:
        'Portfolio of Leonardo Blauth, a product-oriented Full Stack Developer.',
      ...socialImage(
        '/images/social/home-en.png',
        "Social preview for Leonardo Blauth's portfolio",
      ),
    },
    pt: {
      title: 'Leonardo Blauth — Desenvolvedor Full Stack',
      description:
        'Portfólio de Leonardo Blauth, Desenvolvedor Full Stack orientado a produto.',
      ...socialImage(
        '/images/social/home-pt.png',
        'Prévia social do portfólio de Leonardo Blauth',
      ),
    },
  },
  movune: {
    en: {
      title: 'movune — Product case study | Leonardo Blauth',
      description:
        'A case study of movune, an evolving personal product in prototyping for physiotherapy and Pilates clinic management.',
      ...socialImage(
        '/images/social/movune-en.png',
        'Social preview for movune',
      ),
    },
    pt: {
      title: 'movune — Case de produto | Leonardo Blauth',
      description:
        'Um case de movune, produto pessoal em evolução e em prototipação para gestão de clínicas de fisioterapia e Pilates.',
      ...socialImage('/images/social/movune-pt.png', 'Prévia social de movune'),
    },
  },
  rigset: {
    en: {
      title: 'Rigset — Open-source CLI concept | Leonardo Blauth',
      description:
        'A planned open-source CLI concept for declarative, secure, and predictable workstation management.',
      ...socialImage(
        '/images/social/rigset-en.png',
        'Social preview for RIGSET',
      ),
    },
    pt: {
      title: 'Rigset — Conceito de CLI open source | Leonardo Blauth',
      description:
        'Um conceito planejado de CLI open source para gerenciar workstations de forma declarativa, segura e previsível.',
      ...socialImage('/images/social/rigset-pt.png', 'Prévia social de RIGSET'),
    },
  },
  eligent: {
    en: {
      title: 'Eligent — Decision support system | Leonardo Blauth',
      description:
        'A decision support system that detects time-sensitive opportunities, interprets them when needed, evaluates eligibility deterministically against availability and user rules, and notifies the user quickly.',
      ...socialImage(
        '/images/social/eligent-en.png',
        'Social preview for Eligent',
      ),
    },
    pt: {
      title: 'Eligent — Sistema de suporte à decisão | Leonardo Blauth',
      description:
        'Um sistema de suporte à decisão que detecta oportunidades sensíveis ao tempo, interpreta seu conteúdo quando necessário, avalia a elegibilidade de forma determinística conforme a disponibilidade e regras do usuário e o notifica rapidamente.',
      ...socialImage(
        '/images/social/eligent-pt.png',
        'Prévia social de Eligent',
      ),
    },
  },
}

export const getPageSeo = (route: SeoRouteKey, locale: SupportedLocale) =>
  pageSeo[route][locale]
