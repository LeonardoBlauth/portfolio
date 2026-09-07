import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'

import App from '~/app.vue'

describe('Eligent case study', () => {
  it.each([
    [
      '/projects/eligent',
      'Certainty to decide; transparency when in doubt.',
      'ELIGIBLE — the known details are compatible with availability and rules.',
      'INELIGIBLE — the known details conflict with availability or rules.',
      'ABSTAIN is an internal result: there is insufficient information or confidence to assert either of the other outcomes.',
      'ABSTAIN notifications are enabled by default as possible opportunities that require verification. The user-facing notification does not use the technical term ABSTAIN; it explains what was determined and what remains unknown or ambiguous.',
    ],
    [
      '/pt/projetos/eligent',
      'Certeza para decidir; transparência quando houver dúvida.',
      'ELIGIBLE — os dados conhecidos são compatíveis com a disponibilidade e as regras.',
      'INELIGIBLE — os dados conhecidos conflitam com a disponibilidade ou as regras.',
      'ABSTAIN é um resultado interno: há informação ou confiança insuficiente para afirmar qualquer um dos dois resultados anteriores.',
      'As notificações de ABSTAIN ficam ativadas por padrão como possíveis oportunidades que exigem verificação. A notificação voltada ao usuário não usa o termo técnico ABSTAIN; ela explica o que foi determinado e o que permanece desconhecido ou ambíguo.',
    ],
  ])(
    'explains eligibility and delivery independently at %s',
    async (
      route,
      principle,
      eligible,
      ineligible,
      abstain,
      abstainDelivery,
    ) => {
      const wrapper = await mountSuspended(App, { route })

      expect(wrapper.text()).toContain(principle)
      expect(wrapper.text()).toContain(eligible)
      expect(wrapper.text()).toContain(ineligible)
      expect(wrapper.text()).toContain(abstain)
      expect(wrapper.text()).toContain(abstainDelivery)
      expect(wrapper.find('.eligent-architecture-flow').exists()).toBe(true)
      expect(
        wrapper.findAll('.eligent-architecture-flow .project-flow__arrow'),
      ).toHaveLength(3)
    },
  )
})
