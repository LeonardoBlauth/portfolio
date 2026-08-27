# 05 — Final Prototype-to-Implementation Handoff

**Project:** Leonardo Blauth's personal portfolio

**Status:** Prototyping completed and approved

**Approved public reference:** Version 38

**Consolidated:** August 27, 2026

## 1. Purpose

This document closes the portfolio prototyping phase and records the approved product, content, identity, layout, behavior, and responsive requirements for the final implementation.

The approved prototype defines the expected result, but its generated code is not considered production architecture. The final implementation prioritizes maintainability, semantic HTML, accessibility, performance, SEO, testability, and a clean component structure while preserving the approved experience.

The handoff does not introduce new product, design, or architecture decisions. Future functionality remains excluded unless explicitly identified as a later evolution.

## 2. Approved Prototype

The approved visual and functional reference is public prototype version 38:

<https://leonardo-blauth-portfolio.l-blauth00.chatgpt.site/>

The following aspects are authoritative for V1:

- visual identity and typography;
- composition and hierarchy;
- theme palettes and surface treatment;
- spacing rhythm;
- section structure and order;
- approved PT-BR and English content;
- responsive behavior;
- the visual intent of hover, focus, and touch states;
- Header, Hero, orbit, and glow composition;
- Home and `movune` case-study presentation;
- navigation and global controls, subject to the implementation gaps documented below.

Interactive prototype states define the intended visual and behavioral result. They are not authoritative when their mechanism conflicts with correct semantics, keyboard support, `focus-visible`, touch behavior, contrast, or assistive technology. Technical correctness and accessibility take precedence over reproducing an unsuitable prototype mechanism without changing the approved visual direction.

### 2.1 Prototype versus production implementation

The prototype is a reference for outcomes, not necessarily for:

- software architecture;
- component boundaries;
- CSS organization;
- dependencies;
- state management;
- internationalization architecture;
- HTML semantics;
- accessibility implementation;
- SEO and metadata generation;
- performance strategy;
- testing;
- deployment.

Generated prototype code does not need to be reused. Fragile conditionals, resolution-specific offsets, experimental handlers, or environment-generated dependencies should not be carried into the final product merely because they reproduce the expected appearance.

## 3. Portfolio Overview

The portfolio presents Leonardo Blauth primarily for professional opportunities in Brazil and with international or remote teams. Its narrative should help visitors understand:

1. who Leonardo is;
2. what he builds;
3. the projects and solutions he works on;
4. his professional experience and education;
5. the technologies he uses and explores;
6. how he works;
7. how to contact him.

### 3.1 Approved routes

- `/` — portfolio Home;
- `/projetos/movune` — `movune` case study.

Localized route behavior is defined in the technical definition.

### 3.2 Approved Home order

1. Header;
2. Hero;
3. Projects;
4. Professional experience and complementary education;
5. Skills and Tech Stack;
6. How I Work;
7. Contact;
8. Footer.

No additional V1 sections are approved.

## 4. Visual Identity

### 4.1 Direction

The approved direction combines minimalism, controlled depth, restrained motion, and strong typographic hierarchy. It should read as an individual developer's portfolio rather than an agency or software company's institutional website.

### 4.2 Identity hierarchy

1. `Leonardo Blauth` — primary identity;
2. `Full Stack Developer` — professional descriptor;
3. `LB` monogram — secondary visual signature.

The Header uses the monogram as the Home link. The full name remains dominant in the Hero. The monogram must not compete with the name or be repeated decoratively throughout the site.

### 4.3 Approved assets

- `favicon.svg`;
- `lb-monogram-color.svg`;
- `lb-monogram-white.svg`;
- `lb-monogram-cobalt.svg`;
- `lb-lockup-dark.svg`;
- `lb-lockup-light.svg`.

The Open Loop LB monogram must preserve its proportions, stroke, terminals, and small-size legibility. Glow, gradients, 3D treatment, ornamental shadows, and permanent symbol animation are excluded.

### 4.4 Typography and color

**Instrument Sans** is the approved typeface for headings, body copy, navigation, labels, and interface text. Monospace is reserved for content with a concrete technical meaning.

The identity color is cobalt `#2563EB`. The interface also uses contextual accent and surface variations for each theme; these must be represented through coherent design tokens rather than replacing every variation with pure cobalt.

- Dark theme: near-black canvas, deep neutral surfaces, light text, restrained cobalt/blue-violet accents, and controlled glow.
- Light theme: off-white canvas, light surfaces, graphite text, darker cobalt accents, and lighter glow.
- Both themes use subtle borders, consistent radii, and controlled shadow and blur.

Leonardo's personal identity and the `movune` identity are separate systems. The green used by `movune` belongs only within project representations and must not become part of the portfolio's main identity.

## 5. Section Requirements

### 5.1 Header

The Header contains:

- the LB monogram as a link to the top of the Home page;
- internal navigation to Projects, Experience, Stack, and Contact;
- PT/EN language control;
- light/dark theme control;
- a menu button on smaller screens.

Approved behavior:

- fixed, compact, and centered presentation;
- translucent surface with restrained blur, border, and rounded radius;
- textual navigation while sufficient space is available;
- language and theme controls grouped to the right;
- compact mobile panel when primary navigation no longer fits;
- the mobile menu closes after selection and on `Escape`;
- focus remains contained while the panel is open and returns to its trigger when closed;
- links remain semantic and keyboard operable;
- focus states remain clearly visible.

Fullscreen navigation, cinematic menus, custom cursors, and scroll hijacking are excluded.

### 5.2 Hero

#### Approved product copy

Portuguese is included below only because it is approved localized product content.

| Element | PT-BR | English |
| --- | --- | --- |
| Availability | Disponível para oportunidades | Open to opportunities |
| Name | Leonardo Blauth | Leonardo Blauth |
| Role | Full Stack Developer | Full Stack Developer |
| Description | Desenvolvo soluções web de ponta a ponta, conectando necessidades de produto a decisões técnicas claras. | I build end-to-end web solutions, connecting product needs with clear technical decisions. |
| Primary CTA | Entrar em contato | Get in touch |
| Secondary CTA | Ver projetos | View projects |
| Location | Brasil | Brazil |
| Experience | Desenvolvimento web desde 2021 | Web development since 2021 |
| Technical metadata | Vue.js · TypeScript · Laravel · MySQL | Vue.js · TypeScript · Laravel · MySQL |

GitHub and LinkedIn links are also displayed in the Hero.

#### Composition

- The name uses a large scale and strong hierarchy.
- `Full Stack Developer` uses the accent color.
- Description and CTAs follow the primary title block.
- Social links remain visually secondary.
- Professional metadata follows the main composition.
- Orbits and glow operate as one decorative system and are ignored by assistive technology.

On wider screens, text and orbits form one spatial composition. The visual center of the orbit/glow system aligns approximately with the `Full Stack Developer` region. On smaller screens, the orbit system may become a visual layer behind or above the content without reducing readability or blocking interaction.

The layout must respond to available space rather than use resolution-specific hacks. Professional metadata remains on one row while space permits and stacks cleanly on narrow screens.

### 5.3 Selected Projects

| Element | PT-BR | English |
| --- | --- | --- |
| Label | Projetos selecionados | Selected projects |
| Headline | Projetos e soluções que desenvolvo. | Projects and solutions I develop. |
| Introduction | Apresento cada projeto com seu contexto, processo, decisões e estado real de desenvolvimento. | I present each project with its context, process, decisions, and current stage of development. |

V1 contains one real project: `movune`. Its presentation uses two areas—visual representation and project information—and preserves:

- identifier `01`;
- project type;
- status and classification;
- description;
- current scope;
- case-study CTA;
- an explicit label identifying the representation as demonstrative.

A project carousel is intentionally excluded from V1. Controls, dots, arrows, swipe behavior, placeholders, fictional projects, and speculative multi-project infrastructure must not be added.

### 5.4 `movune` on the Home page

The brand is always displayed as `movune` in visible and accessible content.

| Element | PT-BR | English |
| --- | --- | --- |
| Identifier | 01 · Projeto pessoal · SaaS B2B | 01 · Personal project · B2B SaaS |
| Name | movune | movune |
| Status | Em prototipação | In prototyping |
| Classification | Produto e experiência | Product and experience |
| Description | O movune é um projeto pessoal em evolução: um SaaS B2B para apoiar a gestão de clínicas de fisioterapia e Pilates no Brasil. O case acompanha as decisões e o processo de desenvolvimento do produto. | movune is an evolving personal project: a B2B SaaS designed to support the management of physiotherapy and Pilates clinics in Brazil. The case study documents the decisions and product development process. |
| Scope label | Escopo atual | Current scope |
| Scope | Produto · Fluxos · Arquitetura de telas · UI/UX · Prototipação | Product · Flows · Screen architecture · UI/UX · Prototyping |
| CTA | Ver estudo de caso | View case study |
| Representation note | Representação do protótipo · dados demonstrativos | Prototype representation · demo data |

`movune` is an evolving personal project. It must not be presented as a commercially validated product, launched SaaS, completed product, established company, or startup. The portfolio makes no claims about users, clients, revenue, impact, completed integrations, or production architecture.

### 5.5 `movune` case study

Route: `/projetos/movune`.

The case study documents the path from the initial idea through product definition, flows, screen architecture, visual identity, and prototyping. It preserves an honest account of the project's current stage.

#### Opening copy

| Element | PT-BR | English |
| --- | --- | --- |
| Back link | Voltar para projetos | Back to projects |
| Headline | Organizando um produto complexo antes de implementar. | Organizing a complex product before implementation. |
| Lead | O movune é um SaaS B2B em evolução para gestão de clínicas de Fisioterapia e Pilates no Brasil. Este case registra o caminho da ideia à definição do produto, fluxos, arquitetura de telas, identidade visual e prototipação. | movune is an evolving B2B SaaS product for managing Physiotherapy and Pilates clinics in Brazil. This case study documents the path from the initial idea to product definition, flows, screen architecture, visual identity, and prototyping. |
| Role | Definição de produto, fluxos, arquitetura de telas, direção de UI/UX e prototipação. | Product definition, flows, screen architecture, UI/UX direction, and prototyping. |

#### Case structure

1. Overview;
2. Process;
3. Interface;
4. Key decisions;
5. Current status;
6. Next steps.

#### Factual scope

- Context: centralize management activities for Physiotherapy and Pilates clinics.
- Considered domain: schedules, patients, appointments, classes, packages, finance, documents, communication, and distinct operational rules.
- Challenge: organize a broad idea into a coherent product structure and validate the experience before defining production architecture.
- Stages: product definition, flows, screen architecture, identity/UI/UX, and prototyping.
- Highlighted decisions: individual and group schedules, recurrence and conflicts, two status layers, and quick patient registration within scheduling.
- Current stage: product definition, flows, screen architecture, visual identity, and part of the prototype have been developed and refined; production architecture and complete implementation have not been defined.
- Learnings: documentation and prototype need to evolve together; group flows require different rules from individual appointments; visual states cannot depend only on color; early prototyping reveals rules and inconsistencies before implementation.

This content must not be extended into unsupported promises, metrics, or completed functionality.

### 5.6 Temporary `movune` representations

The interfaces shown on the Home page and in the case study are temporary representations created to validate the portfolio composition. They are not final product screenshots.

V1 may reproduce these approved representations without blocking release. Once real, approved screenshots exist, they may replace the representations while preserving composition, visual quality, proportions, legibility, optimization, and accessible descriptions.

All data shown inside the representations is demonstrative and must remain clearly identified as such. It must not be interpreted as product metrics or facts.

### 5.7 Professional Experience

| Element | PT-BR | English |
| --- | --- | --- |
| Label | Experiência profissional | Professional experience |
| Headline | Minha experiência como desenvolvedor. | My experience as a developer. |
| Company | DealerUp Consultoria e Sistemas | DealerUp Consultoria e Sistemas |
| Role | Full Stack Developer | Full Stack Developer |
| Period | 2021 — atual | 2021 — present |
| Location | Brasil | Brazil |
| Description | Atuação no desenvolvimento e na evolução de produtos web, envolvendo frontend, backend, banco de dados, integrações, bots e automações. | Work focused on developing and evolving web products, involving frontend, backend, databases, integrations, bots, and automations. |
| CTA | Ver trajetória completa no LinkedIn | View full experience on LinkedIn |

Selected public contributions:

| Area | PT-BR | English |
| --- | --- | --- |
| Product & Interfaces | Dashboards, interfaces e funcionalidades de apoio a processos comerciais, pesquisas e atendimento ou primeiro contato. | Dashboards, interfaces, and features supporting sales processes, surveys, customer service, or initial contact. |
| Integrations & Automation | Integrações, bots e automações para rotinas operacionais. | Integrations, bots, and automations for operational workflows. |
| Applications & Data | Manutenção e evolução de aplicações com Vue.js, Laravel e MySQL. | Maintenance and evolution of applications using Vue.js, Laravel, and MySQL. |

Displayed technologies: Vue.js, JavaScript, TypeScript, Laravel, PHP, and MySQL.

Only approved, general public information is included. Client identities, proprietary code or architecture, internal metrics, sensitive rules, and internal names remain outside the portfolio.

### 5.8 Education

Education follows professional experience as a visually and semantically secondary block.

| Element | PT-BR | English |
| --- | --- | --- |
| Label | Formação acadêmica | Education |
| Program | Engenharia de Software | Software Engineering |
| Institution | Universidade Positivo | Universidade Positivo |
| Status | Em andamento · conclusão prevista em 2027 | In progress · expected completion in 2027 |

The portfolio does not make unsupported claims about the program's start date, current semester, courses, grades, or academic activities.

### 5.9 Skills and Tech Stack

| Element | PT-BR | English |
| --- | --- | --- |
| Label | Competências e Tech Stack | Skills and Tech Stack |
| Headline | O que uso no dia a dia. O que estou explorando. | What I use day to day. What I’m exploring. |

| Category | Meaning | Technologies and areas |
| --- | --- | --- |
| Core professional stack | Technologies used professionally. | Vue.js; JavaScript / TypeScript; Laravel; PHP; MySQL |
| Additional experience | Technologies used or encountered in practice. | Node.js; Python; Git; Linux; Docker |
| Currently exploring | Study and experimentation, not professional expertise. | AI-assisted development; AI agents; PostgreSQL; Redis; real-time applications |

The interface does not add technologies, proficiency levels, percentages, skill bars, or new categories. Exploratory technologies must not be presented as professional expertise.

### 5.10 How I Work

This section describes Leonardo's general approach and remains independent from any specific project.

| Element | PT-BR | English |
| --- | --- | --- |
| Label | Como trabalho | How I work |
| Headline | Contexto antes de código. Decisões que consigo explicar. | Context before code. Decisions I can explain. |
| Paragraph 1 | Trabalho conectando contexto de produto e execução técnica. Antes de implementar, procuro compreender o problema, as restrições e o impacto de cada decisão no restante da aplicação. | I connect product context with technical execution. Before implementing, I aim to understand the problem, its constraints, and how each decision affects the rest of the application. |
| Paragraph 2 | Utilizo IA como ferramenta para pesquisar, estruturar, revisar e acelerar partes do trabalho, mantendo as decisões e o código dentro do que consigo explicar e sustentar. | I use AI as a tool to research, structure, review, and accelerate parts of the work, while keeping decisions and code within what I can explain and stand behind. |

Approved principles:

| PT-BR | English |
| --- | --- |
| Entender antes de construir | Understand before building |
| Decidir com clareza | Make clear decisions |
| Evoluir de forma incremental | Evolve incrementally |

### 5.11 Contact

| Element | PT-BR | English |
| --- | --- | --- |
| Label | Contato | Contact |
| Headline | Vamos conversar sobre a próxima oportunidade? | Let’s talk about the next opportunity. |
| Description | Estou aberto a conversar sobre oportunidades Full Stack no Brasil e com equipes internacionais ou remotas. | I’m open to discussing Full Stack opportunities in Brazil and with international or remote teams. |

Approved destinations:

- Email: `mailto:contato@leonardoblauth.dev`;
- GitHub: <https://github.com/LeonardoBlauth>;
- LinkedIn: <https://www.linkedin.com/in/leonardo-blauth>.

Interaction requirements:

- semantic links and logical tab order: email, GitHub, LinkedIn;
- visible hover and `focus-visible` states;
- keyboard and touch activation;
- comfortable touch targets;
- no overlapping layer that blocks interaction;
- external links use consistent new-tab behavior and `rel="noopener noreferrer"`;
- accessible names do not duplicate decorative icons.

A contact form is intentionally excluded from V1.

### 5.12 Footer

The Footer contains:

- LB monogram;
- `Leonardo Blauth`;
- copyright `© 2026`.

It uses a subtle top divider, keeps brand and name to the left, and places copyright to the right while space permits. Email, GitHub, and LinkedIn are intentionally omitted because they already appear in the Hero and Contact sections.

## 6. Internationalization

V1 provides complete, maintainable PT-BR and English experiences.

- PT-BR is the default content language.
- Visitors can switch manually between PT-BR and English.
- The page `lang` attribute is updated correctly.
- Messages are centrally organized.
- Home and case-study content remain semantically equivalent across languages.
- Layouts tolerate differences in copy length.
- Labels, accessible names, hidden text, and metadata are localized.

Localized content is semantically equivalent rather than mechanically literal. Duplicate pages and scattered hardcoded conditionals are avoided. The routing, detection, persistence, canonical, and `hreflang` strategy is recorded in the technical definition.

## 7. Light and Dark Themes

Both themes are intentional experiences, not simple color inversions.

- An explicit control is available in the Header.
- Manual preference is persisted.
- System preference may provide the initial fallback when no manual choice exists.
- Semantic tokens preserve surface, border, text, and accent hierarchy.
- Contrast is validated in both themes.
- The monogram variant matches its background.
- Orbits and glow retain the approved intent with theme-appropriate intensity.
- Theme application avoids a visible flash during loading.

## 8. Responsive Behavior

Responsive implementation preserves behaviors rather than isolated screenshots.

Reference QA viewports:

- 1440 × 900;
- 1024 × 768;
- 853 × 1280;
- 390 × 844.

These are validation contexts, not mandatory CSS breakpoints. Adjacent widths, continuous resizing, and both languages must also be tested.

Approved behavior includes:

- consistent centered content width;
- Header adaptation based on available space;
- side-by-side Hero while space permits;
- decorative orbit repositioning on mobile;
- inline Hero metadata when possible and clean stacking on narrow screens;
- two-column project presentation on wider screens and stacked presentation when needed;
- preserved hierarchy between professional experience and education;
- stacked contribution groups when columns become too narrow;
- Skills layout progressing from three columns to two and then one;
- How I Work progressing from two columns to one;
- comfortable full-width Contact actions on mobile;
- case-study media and grids without horizontal overflow.

Resolution-specific offsets, screenshot-specific media queries, duplicated layouts, compensating negative margins, and aggressive typography reduction are excluded. The Hero, orbit, and glow composition must respond as one system.

## 9. Navigation, Interaction, and Motion

Internal navigation includes Projects, Experience, Stack, Contact, View Projects, Get in Touch, Back to Top, and return from the case study to Projects.

Links remain semantic, keyboard operable, compatible with deep links, and offset correctly for the fixed Header.

The mobile menu:

- exposes an accessible name and expanded state;
- closes after destination selection and on `Escape`;
- manages focus and returns it to the trigger;
- prevents accidental interaction with obscured content;
- remains usable by touch and keyboard.

Language and theme controls have localized labels, visible focus, adequate touch targets, and states that are not communicated through color alone.

Orbit motion and approved transitions remain restrained. No content or action depends on animation, and `prefers-reduced-motion` provides an equivalent reduced or immediate experience.

### 9.1 Known smooth-scroll gap

The prototype may appear to jump instantly between sections. This behavior is not authoritative for the final product.

User-initiated same-page navigation should produce a short, restrained, perceptible smooth transition while:

- working in both directions;
- accounting for the fixed Header;
- keeping the section heading visible;
- preserving semantic links, hashes, and deep links;
- supporting mouse, keyboard, and touch;
- closing the mobile menu without competing jumps;
- becoming immediate when reduced motion is requested;
- avoiding scroll hijacking and heavy dependencies.

Correct destination alone is insufficient; the transition must also be visually validated on desktop and mobile.

## 10. Accessibility

Minimum requirements:

- semantic HTML and correct `header`, `nav`, `main`, and `footer` landmarks;
- coherent heading hierarchy;
- links and buttons used according to their function;
- complete keyboard navigation and logical focus order;
- clearly visible `focus-visible` treatment in both themes;
- localized accessible names;
- ARIA only when necessary;
- mobile-menu focus management;
- appropriate image alternatives;
- decorative elements excluded from the accessibility tree;
- contrast validation in both themes;
- adequate touch targets;
- content that does not depend on color, hover, or motion;
- `prefers-reduced-motion` support;
- usable 200% zoom without content loss or horizontal overflow;
- updated page language after switching PT-BR/English;
- understandable external-link behavior;
- automated and manual accessibility testing where applicable.

The accessible project name is simply `movune`. Decorative symbols must not be concatenated with visible text by assistive technology or crawlers.

## 11. SEO and Sharing

The final implementation defines and validates:

- localized page titles and meta descriptions;
- canonical URLs;
- language alternates and `hreflang`;
- Open Graph metadata and validated social previews;
- Twitter/X cards when applicable;
- favicon and language metadata;
- consistent heading structure;
- indexing, sitemap, and robots behavior;
- structured data only when justified by accurate data;
- case-specific metadata for `movune`.

Baseline prototype copy includes:

- Title: `Leonardo Blauth — Full Stack Developer`;
- Description: `Portfólio de Leonardo Blauth, Full Stack Developer orientado a produto.`;
- the existing prototype social image.

The Portuguese description above is retained only as localized product content. Final metadata must remain factually equivalent across languages and must not present `movune` as launched or commercially validated.

## 12. Performance

- Optimize project representations with suitable dimensions and formats.
- Reserve media space to minimize layout shifts.
- Use lazy loading only where appropriate.
- Load Instrument Sans efficiently and avoid unnecessary weights.
- Minimize runtime JavaScript and dependencies.
- Do not introduce heavy libraries for simple effects.
- Keep orbit, glow, and transitions efficient.
- Avoid continuous scroll work without a clear need.
- Do not block content behind visual effects.
- Validate production Core Web Vitals on representative mobile conditions.

Visual fidelity does not justify a heavy implementation.

## 13. Security and Privacy

- No secrets, tokens, credentials, or private variables are included in code or assets.
- No internal DealerUp data, client identities, proprietary architecture, confidential metrics, or sensitive rules are published.
- No unnecessary personal data or sensitive metadata is exposed.
- Images, SVGs, and other assets are reviewed for embedded sensitive information.
- External links are validated and opened safely.
- Dependencies are reviewed for maintenance and necessity.
- V1 performs no analytics or undefined data collection.

## 14. External Links

| Destination | URL or action |
| --- | --- |
| Email | `mailto:contato@leonardoblauth.dev` |
| GitHub | <https://github.com/LeonardoBlauth> |
| LinkedIn | <https://www.linkedin.com/in/leonardo-blauth> |
| `movune` case | `/projetos/movune` |

No external `movune` URL is approved for V1.

GitHub and LinkedIn consistently open in a new tab from their approved locations. They use appropriate `target`, secure `rel` values, and an accessible indication of new-tab behavior. Email uses `mailto:`, and the `movune` case remains internal navigation.

## 15. Technical Quality Expectations

The final implementation is developed incrementally through isolated, reviewable changes with automated validation before integration.

Quality expectations include:

- linting and formatting validation;
- type checking when supported;
- tests proportional to risk;
- validated production build;
- consistent error handling;
- no relevant warnings or hydration errors;
- maintainable structure;
- components extracted for real responsibility or reuse;
- organized, updateable content;
- verifiable PT-BR/English parity;
- accessibility and link tests where applicable;
- responsive and performance review;
- no premature abstraction, unnecessary dependency, or overengineering.

## 16. Deliberate V1 Boundaries and Future Evolution

### 16.1 Included temporary elements

- Current `movune` prototype representations may ship in V1.
- Demonstrative data remains clearly labeled.

### 16.2 Later screenshot replacement

When real, approved `movune` screenshots exist, they may replace temporary representations with updated alternative text and asset optimization. This does not block V1.

### 16.3 Multiple projects

A carousel may be reconsidered only after at least one additional real project exists. Its desktop, keyboard, touch/swipe, mobile, controls, and accessibility behavior must then be designed against real content as an independent feature.

### 16.4 Explicit exclusions

- project carousel and speculative multi-project infrastructure;
- fictional projects, metrics, users, or results;
- contact form;
- analytics without a defined purpose and privacy decision;
- production claims or architecture for `movune`;
- prototype code and internal component structure as production authority.

## 17. V1 Acceptance Criteria

### 17.1 Product and content

- [ ] The implementation reproduces the approved prototype's visual result.
- [ ] Home and the `movune` case study are present.
- [ ] Section order and structure are preserved.
- [ ] Approved factual copy is preserved in both languages.
- [ ] `movune` is consistently lowercase.
- [ ] No project, metric, fact, or feature is invented.
- [ ] No carousel is included.
- [ ] Final `movune` screenshots are not required for release.

### 17.2 Languages and themes

- [ ] PT-BR and English remain semantically equivalent.
- [ ] Public copy, labels, metadata, and accessible names are localized.
- [ ] The page language updates correctly.
- [ ] Both themes reproduce the approved direction.
- [ ] Preferences work without a relevant flash or inconsistency.

### 17.3 Visual structure and responsiveness

- [ ] Desktop and mobile Header behavior works as specified.
- [ ] The Hero preserves its composition and spatial relationship with orbits and glow.
- [ ] Projects and the case study remain faithful to the approved result.
- [ ] Professional experience and education preserve their hierarchy.
- [ ] Skills categories remain unchanged.
- [ ] How I Work remains independent from a specific project.
- [ ] Contact and Footer contain the approved content and destinations.
- [ ] There is no horizontal overflow.
- [ ] Responsive QA passes at 1440×900, 1024×768, 853×1280, and 390×844, plus intermediate widths.

### 17.4 Interaction and accessibility

- [ ] Internal navigation provides real, perceptible smooth scrolling.
- [ ] Reduced motion provides an appropriate alternative.
- [ ] Fixed Header navigation does not obscure headings.
- [ ] Deep links work correctly.
- [ ] The mobile menu closes and manages focus correctly.
- [ ] Keyboard, mouse, and touch interaction work.
- [ ] Focus treatment is clearly visible.
- [ ] Landmarks, headings, links, and buttons are semantic.
- [ ] Accessible names do not duplicate decorative symbols and text.
- [ ] Contrast is adequate in both themes.
- [ ] The page remains usable at 200% zoom.

### 17.5 Links, SEO, performance, and quality

- [ ] Email, GitHub, LinkedIn, and case-study links use the approved destinations.
- [ ] New-tab behavior is consistent, safe, and accessibly communicated.
- [ ] Localized title, description, canonical, and social previews are defined.
- [ ] Language alternatives and indexing behavior are coherent.
- [ ] Images, fonts, and JavaScript are optimized.
- [ ] Relevant layout shifts are prevented and Core Web Vitals are evaluated.
- [ ] Lint, formatting, type checking, build, and defined tests pass.
- [ ] There are no relevant errors, warnings, broken links, or broken assets.
- [ ] No secret, credential, confidential information, or unapproved factual claim is published.

## 18. Closing Status

The portfolio prototyping phase is complete. Public prototype version 38 remains the approved visual and functional reference. This handoff distinguishes the result that must be preserved, mechanisms that require production-quality implementation, temporary content, and deliberately deferred evolution.
