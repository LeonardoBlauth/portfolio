# V1 Incremental Implementation Plan

**Project:** Leonardo Blauth's personal portfolio

**Status:** Approved planning baseline for V1 implementation

**Plan scope:** Implementation sequencing, dependencies, validation, and release readiness

**Consolidated:** August 27, 2026

## 1. Purpose

This plan turns the approved portfolio handoff and technical definition into incremental, testable, and reviewable implementation units. It closes the V1 planning phase without starting application development.

The sequence is designed to keep the product buildable, accessible, bilingual, and theme-aware throughout development. Cross-cutting capabilities are introduced before the sections that depend on them and are validated continuously rather than deferred to a final cleanup phase.

## 2. Source Documents and Precedence

The official sources for this plan are the public documents in this repository:

1. [Final Prototype-to-Implementation Handoff](./final-implementation-handoff.md) — defines primarily the approved behavior, content, identity, user experience, responsiveness, accessibility, scope, and acceptance expectations for V1;
2. [Final Portfolio Implementation Technical Definition](./final-implementation-technical-definition.md) — defines primarily the stack, architecture, rendering, styling, internationalization, theming, testing, SEO, performance, CI/CD, deployment, and technical constraints.

This implementation plan converts those approved decisions into an incremental execution sequence with explicit dependencies, stage-level validation, and stage acceptance criteria. The handoff answers what V1 must deliver, the technical definition answers how it will be built, and this plan defines the order in which that work can be implemented and reviewed.

## 3. Implementation Principles

- Deliver one coherent, reviewable increment per stage.
- Begin each implementation unit from the current default branch and integrate it only after relevant validation succeeds.
- Use logical commits that describe meaningful outcomes; avoid both component-sized fragmentation and a single portfolio-wide change.
- Preserve the approved prototype as the reference for outcomes, not for generated code or internal architecture.
- Keep every completed stage buildable.
- Introduce internationalization, themes, semantics, accessibility, responsiveness, and testing when their dependent features are created.
- Prefer native browser and Nuxt capabilities before adding dependencies.
- Extract components and abstractions only for a real responsibility or reuse case.
- Keep factual content separate from presentation and typed where it has repeatable structure.
- Sanitize source, content, assets, and metadata before their first public commit.
- Treat the reference viewports as QA contexts, not automatic breakpoint values.
- Preserve PT-BR and English semantic equivalence without forcing literal translation.
- Keep `movune` lowercase in visible and accessible content.

## 4. V1 Scope

V1 includes:

- a statically generated Nuxt 4 application using Vue 3 and TypeScript;
- PT-BR Home at `/` and English Home at `/en`;
- PT-BR `movune` case study at `/projetos/movune` and English equivalent at `/en/projects/movune`;
- the approved Header, Hero, Projects, Experience and Education, Skills and Tech Stack, Work Approach, Contact, and Footer;
- light and dark themes with persisted explicit preference and system fallback;
- localized navigation, content, accessible names, and metadata;
- responsive behavior across desktop, intermediate, tablet, and mobile widths;
- real, restrained smooth scrolling with fixed-Header offset that remains perceptible with reduced motion enabled;
- temporary, clearly identified `movune` prototype representations;
- semantic HTML, keyboard support, visible focus, adequate contrast, and accessible interactions;
- localized SEO, social metadata, sitemap, robots behavior, and static delivery;
- proportional unit, component, end-to-end, and automated accessibility tests;
- GitHub Actions validation and Cloudflare Pages preview and production delivery.

## 5. Explicitly Out of Scope

V1 does not include:

- a blog, CMS, backend, application API, database, authentication, or administration interface;
- a contact form;
- analytics or undefined visitor tracking;
- Pinia without a demonstrated shared-state requirement;
- Tailwind CSS or a general-purpose component framework;
- a heavy animation library without a concrete need that native capabilities cannot meet;
- a project carousel, carousel controls, swipe behavior, or speculative multi-project infrastructure;
- fictional or placeholder projects;
- final `movune` screenshots as a release dependency;
- claims that `movune` is launched, commercially validated, complete, or operating with real users, clients, revenue, or production integrations;
- a custom deployment pipeline when Cloudflare Pages' native integration is sufficient;
- unrelated refactoring or changes to the approved prototype.

## 6. Dependency Map

| Capability | Depends on | Required by |
| --- | --- | --- |
| Static Nuxt foundation | Stable runtime and package versions | Every application stage |
| Localized route baseline | Nuxt foundation and Nuxt i18n | Header, all content sections, SEO, E2E |
| Typed content model | TypeScript and locale organization | Projects, experience, stack, case study, metadata |
| Design tokens and global styles | Application foundation and approved assets | Every visual section |
| Theme resolution and no-flash behavior | Semantic color tokens | Header control and all visual QA |
| Application shell | Routes, base styles, theme, and locale foundations | Header, page composition, landmarks, navigation |
| Header navigation | Shell and section identifiers | Smooth scroll, mobile navigation, deep-link tests |
| Home project presentation | Content model and design foundation | `movune` case navigation |
| `movune` case route | Localized routing, project data, and approved representations | Case-specific SEO and release coverage |
| Localized metadata | Stable localized routes and final page content | SEO hardening, sitemap, social previews |
| Full E2E coverage | Stable cross-section journeys | Final QA and release |
| Production deployment | Passing CI, final static build, approved origin, and hosting configuration | Post-deploy verification |

Cross-cutting i18n and theme architecture is introduced in Stages 1 and 2 because the Header and every subsequent content section depend on it. Stage 11 is therefore an integration audit, not the first implementation of either capability. Accessibility and responsiveness follow the same pattern: they are built into each stage and audited again near completion.

## 7. Implementation Sequence

| Stage | Increment | Primary dependency |
| --- | --- | --- |
| 1 | Project Foundation and Localized Routing | Approved technical definition |
| 2 | Design and Theme Foundation | Stage 1 |
| 3 | Application Shell, Header, and Navigation | Stages 1–2 |
| 4 | Hero | Stages 2–3 |
| 5 | Selected Project Presentation | Stages 1–4 |
| 6 | `movune` Case Study | Stage 5 |
| 7 | Experience and Education | Stages 1–4 |
| 8 | Skills and Tech Stack | Stages 1–4 |
| 9 | Work Approach | Stages 1–4 |
| 10 | Contact and Footer | Stages 1–4 |
| 11 | Cross-Cutting Integration Completion | Stages 3–10 |
| 12 | SEO, Performance, and Security Hardening | Stages 1–11 |
| 13 | Accessibility and Final V1 QA | Stages 1–12 |
| 14 | Production Release | Stage 13 |

## 8. Stage 1 — Project Foundation and Localized Routing

### Objective

Create a healthy, statically generated application baseline that can support every later feature without introducing visual content prematurely.

### Scope

- initialize Nuxt 4 with Vue 3 and TypeScript using pnpm;
- verify and pin mutually compatible stable versions and the supported Node LTS version;
- record `packageManager` and commit one lockfile;
- establish minimal application, page, component, composable, data, locale, asset, style, and test organization following current Nuxt conventions;
- configure SSG/prerender output for the four approved localized routes;
- install and configure Nuxt i18n with `prefix_except_default` behavior;
- set PT-BR as the unprefixed default and English under `/en`;
- create route-equivalence mapping for Home and the `movune` case;
- establish centralized locale messages and typed-data boundaries;
- configure essential development, lint, formatting-check, typecheck, test, and build scripts;
- create Vitest and Nuxt Test Utils foundations;
- add a minimal GitHub Actions validation pipeline for install, static checks, tests, and build.

### Out of scope

- approved visual sections;
- final page copy beyond minimal route fixtures needed to validate infrastructure;
- Cloudflare Pages configuration;
- complex component abstractions;
- analytics, CMS, backend, global store, or animation framework.

### Dependencies

- approved stack and route strategy;
- an empty or documentation-only implementation repository state;
- resolution of the blocking runtime/tooling choices listed in Section 25.

### Implementation considerations

- Essential content must exist in generated HTML before hydration.
- Browser-language detection must not redirect visitors automatically.
- Direct access to any localized URL must remain possible regardless of saved preference.
- The language architecture must update document language and support equivalent-route switching later.
- Content records such as projects, experience, and technologies belong in typed modules; editorial copy and interface labels belong in locale resources.
- Folder and component names should follow verified Nuxt 4 conventions and real responsibilities rather than speculative architecture.

### Validation

- run formatting, lint, typecheck, unit-test, and production-build commands;
- inspect generated output for all four routes and meaningful static HTML;
- verify direct loading of `/`, `/en`, `/projetos/movune`, and `/en/projects/movune`;
- confirm route locale and HTML `lang` behavior with foundation-level tests;
- confirm the lockfile and runtime version are deterministic in local and CI environments;
- review the initial dependency set for maintenance, weight, license, and necessity;
- scan tracked configuration for credentials, local paths, and private values.

### Acceptance criteria

- [x] Nuxt 4, Vue 3, TypeScript, and pnpm are configured with compatible pinned versions.
- [x] One lockfile and an explicit runtime/package-manager policy exist.
- [x] The four localized routes prerender successfully as complete HTML.
- [x] PT-BR is unprefixed, English uses `/en`, and no automatic language redirect occurs.
- [x] Formatting, lint, typecheck, tests, and static build pass locally and in minimal CI.
- [x] The structure supports typed data and centralized localized messages without premature abstraction.
- [x] No production feature or unrelated code is introduced.

### Implementation unit

A single foundation change that establishes the executable project, localized static routing, quality scripts, test harness, and minimal CI. Tooling-only commits may be separated from route/i18n configuration if that materially improves review, but the stage should integrate as one coherent foundation.

### Traceability

- Handoff: Internationalization; Quality; Approved Routes; What Not to Copy from the Prototype.
- Technical Definition: Selected Stack; Rendering; Application Architecture; Content Model; Internationalization; Testing; CI; Dependencies and Versioning.

## 9. Stage 2 — Design and Theme Foundation

### Objective

Establish the approved visual language and theme behavior before feature sections depend on it.

### Scope

- inventory and sanitize approved identity and font assets;
- load Instrument Sans efficiently with appropriate fallbacks and only required weights;
- implement a minimal reset and global base styles;
- define semantic CSS Custom Properties for canvas, surfaces, text, accent, borders, focus, shadows, radii, spacing, typography, Header height, and motion;
- map semantic tokens for both light and dark themes;
- create only the layout primitives and recurring utilities required by the approved portfolio;
- establish global `focus-visible` and reduced-motion foundations;
- implement theme resolution from explicit persisted choice, system preference fallback, and documented default;
- apply the resolved theme before hydration to prevent a relevant flash;
- expose a focused, testable theme composable and document-level attribute contract.

### Out of scope

- Header presentation and theme control UI;
- section-specific layouts;
- a generic design system, component library, utility framework, or Storybook requirement;
- SCSS without a demonstrated benefit;
- project-specific green outside `movune` representations.

### Dependencies

- Stage 1 application and test foundation;
- approved identity assets and visual direction.

### Implementation considerations

- Cobalt `#2563EB` is the identity color, not a replacement for every contextual theme variation.
- Dark and light are intentional experiences, not inverted palettes.
- Components consume semantic tokens and should not render different markup by theme.
- The `movune` green identity remains isolated from portfolio-global tokens.
- Token layers should be practical: foundational values, semantic roles, theme mappings, and rare component-specific exceptions.
- Motion defaults must support immediate or reduced alternatives from the beginning.

### Validation

- component tests for explicit choice, persistence, system fallback, and document attribute updates;
- a no-flash check against initial HTML and the pre-hydration theme path;
- contrast review for base text, links, focus, and representative surfaces in both themes;
- font-loading and fallback inspection for layout shift risk;
- keyboard review of base focus styles;
- reduced-motion verification;
- visual checks at all reference viewports and intermediate widths for global canvas and layout primitives;
- production build and dependency-size review.

### Acceptance criteria

- [x] Both themes are represented through semantic tokens.
- [x] Explicit preference persists and overrides the system preference.
- [x] System preference is used only when no explicit choice exists.
- [x] Theme application avoids a relevant pre-hydration flash.
- [x] Instrument Sans and fallbacks load efficiently.
- [x] Base focus, contrast, and reduced-motion behavior are usable in both themes.
- [x] No generic design-system or styling dependency is introduced without need.

### Implementation unit

A visual-foundation change containing assets, global CSS layers, semantic tokens, and tested theme infrastructure. It should not include page-section implementation.

### Traceability

- Handoff: Visual Identity; Light and Dark Themes; Accessibility; Performance.
- Technical Definition: Styling Strategy; Design Tokens; Theme and Preferences; Assets; Performance.

## 10. Stage 3 — Application Shell, Header, and Navigation

### Objective

Deliver the shared page shell and fully operable responsive Header, including locale, theme, mobile navigation, deep links, and correct smooth scrolling.

### Scope

- implement semantic shared layout landmarks and a consistent content container;
- add the approved LB monogram as the Home/top link;
- add Projects, Experience, Stack, and Contact navigation;
- implement the locale switcher using equivalent localized routes and persisted manual preference;
- implement the light/dark control using Stage 2 theme infrastructure;
- implement compact, translucent desktop and intermediate-width Header behavior;
- implement the mobile-menu trigger, panel, expanded state, focus containment, `Escape` handling, selection close, focus restoration, and obscured-content protection;
- implement semantic same-page links, fixed-Header offset, predictable hashes, deep links, and short perceptible smooth scrolling for section and Hero/top return controls;
- preserve short perceptible same-page scrolling when reduced motion is requested while reducing other nonessential motion;
- establish stable section identifiers for later stages.

### Out of scope

- fullscreen or cinematic navigation;
- custom cursor or scroll hijacking;
- page sections beyond temporary semantic destinations needed to validate navigation;
- active-section tracking unless the approved visual behavior demonstrably requires it.

### Dependencies

- localized routes and locale resources from Stage 1;
- semantic tokens, theme state, focus styles, and reduced-motion foundation from Stage 2.

### Implementation considerations

- Smooth scroll must correct the prototype's instant-jump limitation; the prototype mechanism is not authoritative.
- Navigation, including every implemented control that returns to the Hero/top, must reuse the same behavior, work upward and downward, keep destinations visible, preserve deep links, and avoid competing movement when the mobile menu closes.
- Header layout responds to available space rather than a named device category.
- Language and theme controls use localized accessible names and state that does not depend on color.
- External links that may appear in the mobile panel follow the approved safe new-tab pattern.

### Validation

- component tests for menu state, `Escape`, focus restoration, and relevant ARIA state;
- unit tests for locale-equivalent route mapping if logic exists outside Nuxt i18n;
- Playwright coverage for desktop navigation, mobile menu, locale switching, theme selection, persistence, deep links, fixed-Header offset, and reduced-motion navigation;
- manual keyboard, focus-containment, screen-reader naming, touch-target, and scroll-quality checks;
- responsive checks at 1440×900, 1024×768, 853×1280, 390×844, and intermediate widths;
- axe checks for the shell, navigation, and open-menu state;
- production build.

### Acceptance criteria

- [x] Shared landmarks and navigation are semantic.
- [x] Header content adapts cleanly across continuous widths.
- [x] Locale and theme controls work by keyboard, mouse, and touch.
- [x] The mobile menu closes after selection and on `Escape`, contains focus while open, and restores focus when closed.
- [x] Same-page navigation provides real perceptible smooth scrolling with correct Header offset.
- [x] Smooth scrolling remains short and perceptible when reduced motion is requested.
- [x] Deep links and browser history remain predictable.

### Implementation unit

A shared-shell feature containing the Header, global controls, responsive mobile navigation, and navigation behavior. The controls belong together because they share layout, focus, localization, and responsive dependencies.

### Traceability

- Handoff: Header; Internationalization; Themes; Navigation and Motion; Smooth-Scroll Gap; Accessibility; Responsiveness.
- Technical Definition: Locale Behavior; Theme Architecture; State and Client Behavior; Motion; Accessibility; E2E Testing.

## 11. Stage 4 — Hero

### Objective

Deliver the approved bilingual Hero as the first complete visual product increment.

### Scope

- render availability, name, role, description, primary and secondary CTAs, GitHub, LinkedIn, location, experience since 2021, and technical metadata;
- implement the approved name and `Full Stack Developer` hierarchy;
- build the orbit and glow as one decorative responsive system;
- keep decorative content outside the accessibility tree;
- preserve the approved relationship between the text composition, role line, orbit center, and glow;
- keep metadata inline while space permits and stack it cleanly at narrow widths;
- connect CTAs to Contact and Projects through the Stage 3 navigation system;
- implement restrained motion and reduced-motion behavior.

### Out of scope

- project content or case-study navigation;
- resolution-specific offsets, screenshot-specific media queries, duplicated layouts, and magic values for 853×1280;
- new copy, social destinations, or animation dependencies.

### Dependencies

- Stage 2 visual and motion foundations;
- Stage 3 shell, navigation destinations, and global controls;
- approved localized Hero copy.

### Implementation considerations

- Text and orbits form one responsive composition rather than independent layers aligned by screenshot-specific rules.
- The glow remains centered on the orbit system.
- The technical stack line should not fall alone to a second row at intermediate widths.
- Social links are visually secondary and use approved destinations and safe behavior.
- Professional development begins in 2021.

### Validation

- component/content tests for both locales and approved links where useful;
- visual comparison in both themes and locales;
- responsive review at all four reference viewports, intermediate widths, and continuous resizing;
- keyboard, focus, touch, accessible-name, decorative-element, contrast, and reduced-motion checks;
- axe scan and production build;
- inspect animation and paint behavior on representative mobile conditions.

### Acceptance criteria

- [x] All approved Hero content is present and localized.
- [x] Professional web development is stated from 2021.
- [x] CTAs and social links work with correct semantics and destinations.
- [x] Orbit and glow remain a coherent system in both themes and at all widths.
- [x] No 853px-specific or screenshot-specific layout rule is used.
- [x] Metadata wraps as a group without an isolated stack line.
- [x] The Hero remains readable and operable with reduced motion, keyboard, touch, and 200% zoom.

### Implementation unit

A dedicated Hero feature because its spatial composition, decorative motion, factual content, and responsive risk warrant isolated review.

### Traceability

- Handoff: Hero; Visual Identity; Responsiveness; Accessibility; Links; Performance.
- Technical Definition: Styling; Motion; Assets; Accessibility; Performance.

## 12. Stage 5 — Selected Project Presentation

### Objective

Add the Home Projects section with the single approved `movune` presentation and an honest path to its case study.

### Scope

- implement the localized section label, headline, and introduction;
- define the typed `movune` record and required localized content references;
- render identifier `01`, personal-project/B2B SaaS type, prototyping status, classification, description, current scope, and case-study CTA;
- include the approved temporary representation and explicit demo-data label;
- provide responsive two-area and stacked layouts;
- link to the equivalent localized case-study route.

### Out of scope

- carousel behavior, arrows, dots, swipe, inactive controls, placeholder projects, or generalized multi-project infrastructure;
- claims about launch, customers, revenue, metrics, integrations, or production architecture;
- final product screenshots.

### Dependencies

- Stage 1 typed-content and localized-route foundations;
- Stage 2 visual tokens and asset treatment;
- Stage 3 navigation;
- Stage 4 establishes the preceding Home composition.

### Implementation considerations

- `movune` remains lowercase in visible and accessible content.
- The project is personal, evolving, and in prototyping.
- Temporary representations are valid V1 assets and do not block release.
- Demonstrative data must remain clearly labeled and must not be interpreted as product evidence.
- The architecture may use a normal typed record but must not build abstractions solely for hypothetical additional projects.

### Validation

- content-model tests for required project facts and locale references;
- route-link tests for PT-BR and English equivalents;
- responsive and visual review in both themes and locales;
- alternative-text, accessible-name, keyboard, focus, touch, and axe checks;
- asset dimensions, metadata, format, loading, and layout-shift review;
- production build.

### Acceptance criteria

- [x] Home presents exactly one real project: `movune`.
- [x] All project facts, status, scope, and demo-data disclosures are accurate in both locales.
- [x] The CTA reaches the equivalent localized case route.
- [x] The layout works in two-area and stacked forms without overflow.
- [x] No carousel or speculative multi-project system exists.
- [x] Temporary representations are optimized, accessible, and clearly identified.

### Implementation unit

A Home project-section feature including its minimal typed record and temporary representation assets. The case page remains separate because it is a complete route with independent content and metadata.

### Traceability

- Handoff: Selected Projects; `movune` on Home; Temporary Representations; Future Multiple Projects.
- Technical Definition: Content Architecture; Assets; Deliberate Exclusions; Localized Routing.

## 13. Stage 6 — `movune` Case Study

### Objective

Deliver the complete localized case-study route while preserving the project's current prototyping status and factual boundaries.

### Scope

- implement `/projetos/movune` and `/en/projects/movune` from the shared localized route definition;
- add the localized back-to-projects link, headline, lead, and role;
- implement Overview, Process, Interface, Key Decisions, Current Status, and Next Steps sections;
- represent the approved domain, challenge, process stages, highlighted product decisions, current status, and learnings;
- reuse approved temporary representations with demo-data disclosure;
- provide route-level heading hierarchy, media treatment, responsive grids, and accessible descriptions;
- support locale switching between equivalent case routes and return navigation to Projects.

### Out of scope

- a production architecture for `movune`;
- unsupported product features, claims, outcomes, metrics, or integrations;
- final screenshots as a completion requirement;
- redesigning the temporary internal representations beyond fidelity needs.

### Dependencies

- Stage 5 project record, presentation, assets, and localized CTA;
- Stage 1 localized route foundation;
- Stages 2–3 shared visual and shell behavior.

### Implementation considerations

- The case documents product definition and prototyping, not a launched SaaS.
- Individual and group scheduling, recurrence/conflicts, dual status layers, and quick patient registration are documented decisions, not claims of deployed functionality.
- Visual states shown in representations must not rely on color alone.
- Real screenshots may replace temporary representations later without changing the V1 release decision.

### Validation

- E2E coverage for direct loading of both locale routes, Home-to-case navigation, return navigation, and locale-equivalent switching;
- content checks for required sections, status, and prohibited commercial claims;
- heading, landmark, link, alternative-text, keyboard, focus, zoom, and axe review;
- responsive review of copy, grids, process, decisions, and media at reference and intermediate widths;
- image optimization and layout-shift review;
- route-level metadata placeholder readiness and production build.

### Acceptance criteria

- [x] Both localized case routes generate complete static HTML.
- [x] The six approved case areas and factual content are present.
- [x] `movune` remains lowercase and accurately described as an evolving personal project in prototyping.
- [x] Temporary assets and demo data are clearly identified and accessible.
- [x] Navigation between Home, case, and equivalent locales is correct.
- [x] The route contains no unsupported launch, validation, customer, revenue, integration, or architecture claim.

### Implementation unit

A complete localized route feature containing case composition, project-specific content, approved temporary media, and its navigation tests.

### Traceability

- Handoff: `movune` Case Study; Temporary Elements; Factual Scope; Accessibility; Responsiveness.
- Technical Definition: Route Matrix; Content Model; Assets; Testing; SEO Readiness.

## 14. Stage 7 — Experience and Education

### Objective

Add the approved professional history and secondary education block with accurate facts and a clear semantic hierarchy.

### Scope

- implement localized Experience section headings and content;
- present DealerUp Consultoria e Sistemas, Full Stack Developer, Brazil, and `2021 — present`;
- render the three approved public contribution groups and approved technologies;
- add the LinkedIn trajectory CTA with safe external-link behavior;
- implement Software Engineering at Universidade Positivo as a visually and semantically secondary block;
- state that the program is in progress with expected completion in 2027;
- preserve responsive transitions for contributions and the experience/education hierarchy.

### Out of scope

- client names, internal DealerUp information, proprietary architecture, metrics, sensitive rules, or confidential examples;
- invented course start date, semester, subjects, grades, or academic activities;
- treating education as another employment entry.

### Dependencies

- Stage 1 content and i18n architecture;
- Stage 2 visual foundation;
- Stage 3 section navigation.

### Implementation considerations

- DealerUp remains the primary professional experience.
- Professional development and the employment period begin in 2021.
- Education remains secondary and completion is expected in 2027.
- External-link indication must match actual new-tab behavior.

### Validation

- factual-content checks in both locales;
- explicit searches for correct 2021 and 2027 values in rendered and source content;
- external-link target, safe `rel`, accessible indication, keyboard, focus, and touch checks;
- semantic and visual hierarchy review;
- responsive checks for contribution columns and stacking in both languages and themes;
- axe scan and production build;
- privacy review for employer-related content and assets.

### Acceptance criteria

- [x] DealerUp Consultoria e Sistemas and the Full Stack Developer role are accurate.
- [x] The professional period is `2021 — present` and development experience begins in 2021.
- [x] Expected Software Engineering completion is 2027.
- [x] Education is visually and semantically subordinate to experience.
- [x] Only approved general professional information is public.
- [x] The LinkedIn action is safe, accessible, and functional.

### Implementation unit

One professional-history feature because experience and education share the approved narrative hierarchy and responsive composition while remaining semantically distinct.

### Traceability

- Handoff: Professional Experience; Education; Factual Content; Security and Privacy.
- Technical Definition: Typed Content; Accessibility; External Links; Security.

## 15. Stage 8 — Skills and Tech Stack

### Objective

Present technical experience with the approved distinctions between professional use, complementary exposure, and current exploration.

### Scope

- implement localized section label and headline;
- represent the three categories in typed data and localized explanatory content;
- preserve the exact approved technology lists and ordering;
- implement the three-to-two-to-one-column responsive progression;
- distinguish exploratory technologies without overstating expertise.

### Out of scope

- proficiency percentages, ratings, years per technology, skill bars, expert labels, or additional categories;
- promotion of exploratory technology to the professional stack;
- technologies removed from the approved content.

### Dependencies

- Stage 1 typed data and locale resources;
- Stage 2 visual foundation;
- Stage 3 section navigation.

### Implementation considerations

- Core professional stack: Vue.js, JavaScript/TypeScript, Laravel, PHP, and MySQL.
- Complementary experience: Node.js, Python, Git, Linux, and Docker.
- Currently exploring: AI-assisted development, AI agents, PostgreSQL, Redis, and real-time applications.
- Category meaning must remain understandable without relying only on color or visual prominence.

### Validation

- data/content tests for category membership and no duplicates;
- semantic grouping and heading review;
- both-locale and both-theme visual review;
- responsive checks at reference and intermediate widths;
- contrast, zoom, keyboard reading order, and axe checks;
- production build.

### Acceptance criteria

- [ ] Exactly three approved categories are present.
- [ ] Every technology appears in the correct category.
- [ ] Exploratory items are not presented as professional expertise.
- [ ] No rating, percentage, experience-year claim, or unapproved technology is added.
- [ ] The layout transitions cleanly from three columns to two and then one based on available space.

### Implementation unit

A focused Skills and Tech Stack feature containing its typed category data, localized explanation, and responsive presentation.

### Traceability

- Handoff: Skills and Tech Stack; Responsiveness; Factual Content.
- Technical Definition: Content Model; Styling; Accessibility; Testing.

## 16. Stage 9 — Work Approach

### Objective

Add a concise bilingual explanation of Leonardo's working approach without turning it into a generic manifesto or project-specific narrative.

### Scope

- implement the approved localized label, headline, two paragraphs, and three principles;
- keep the section independent from `movune` and education;
- implement the approved two-column-to-one-column responsive behavior;
- preserve semantic reading order and accessible presentation.

### Out of scope

- a Projects CTA;
- project-specific process detail;
- new principles, claims, methodology branding, or marketing language.

### Dependencies

- Stage 1 locale resources;
- Stage 2 visual foundation;
- Stage 3 page shell.

### Implementation considerations

- The approved PT-BR headline is `Contexto antes de código. Decisões que consigo explicar.`
- English content remains semantically equivalent.
- AI is presented as a supporting tool within explainable and maintainable engineering decisions, with technical reasoning remaining central to the section.

### Validation

- copy parity review across PT-BR and English;
- heading hierarchy and reading-order checks;
- both-theme and responsive review at reference and intermediate widths;
- zoom, contrast, and axe checks;
- production build.

### Acceptance criteria

- [ ] The approved headline, paragraphs, and principles are present in both locales.
- [ ] The section remains independent from `movune` and academic education.
- [ ] No manifesto-style claims or new methodology are introduced.
- [ ] Layout and reading order remain clear at all widths and at 200% zoom.

### Implementation unit

A compact Work Approach feature that is independently reviewable for content tone, localization, semantics, and responsive composition.

### Traceability

- Handoff: How I Work; Internationalization; Responsiveness.
- Technical Definition: Localized Content; Styling; Accessibility.

## 17. Stage 10 — Contact and Footer

### Objective

Complete the Home narrative with approved contact actions and a restrained responsive Footer.

### Scope

- implement localized Contact label, headline, and description;
- add email, GitHub, and LinkedIn actions using approved destinations;
- implement logical tab order, visible focus, keyboard, mouse, and touch behavior;
- provide safe and consistent new-tab behavior for GitHub and LinkedIn with accessible indication;
- use `mailto:` for email;
- implement the Footer with LB monogram, Leonardo Blauth, and `© 2026`;
- preserve Footer stacking behavior and intentional omission of contact links.

### Out of scope

- contact form, form validation, email service, backend, scheduling integration, or analytics;
- Footer duplication of email, GitHub, or LinkedIn.

### Dependencies

- Stage 2 assets and visual foundation;
- Stage 3 navigation and external-link conventions;
- Stage 1 localized content.

### Implementation considerations

- External-link names and new-tab announcements must match actual behavior.
- Decorative icons must not duplicate accessible text.
- No overlay or decorative layer may block touch interaction.
- Contact remains usable without hover.

### Validation

- E2E checks for email, GitHub, and LinkedIn destinations and behavior;
- keyboard, tab-order, focus, touch-target, accessible-name, and screen-reader checks;
- safe `target` and `rel` validation;
- Footer content and omission checks;
- responsive review in both themes and locales;
- axe scan and production build.

### Acceptance criteria

- [ ] All three approved contact destinations are correct and operable.
- [ ] GitHub and LinkedIn open safely in a new tab with an accessible indication.
- [ ] Email uses the approved `mailto:` destination.
- [ ] Contact works by keyboard, mouse, and touch without hover dependency.
- [ ] Footer contains only the approved monogram, name, and copyright content.
- [ ] No contact form or unapproved integration exists.

### Implementation unit

One closing-content feature containing Contact and Footer because they complete the shared Home flow and external-link validation without introducing unrelated infrastructure.

### Traceability

- Handoff: Contact; Footer; External Links; Accessibility; Security.
- Technical Definition: External-Link Security; Localized Content; Accessibility.

## 18. Stage 11 — Cross-Cutting Integration Completion

### Objective

Audit and complete the interactions among all implemented sections, locales, themes, routes, and responsive states without introducing new product features.

### Scope

- verify complete PT-BR and English content, labels, hidden text, alternative text, accessible names, and route equivalence;
- verify language preference behavior and every Home/case switch path;
- validate all sections in light and dark themes and explicit/system preference combinations;
- confirm section identifiers, same-page navigation, every implemented return-to-Hero/top control, case return path, hashes, and fixed-Header offset;
- correct cross-section spacing, content-width consistency, and continuous responsive transitions;
- verify that Header, Hero, and later sections behave as one page rather than isolated snapshots;
- expand E2E journeys to cover the complete application.

### Out of scope

- new sections, new content, redesign, architecture replacement, or future features;
- first-time implementation of localization, themes, semantics, or responsive behavior.

### Dependencies

- Stages 3–10 complete;
- stable localized content and route structure.

### Implementation considerations

- This stage is an integration audit, not a late retrofit.
- QA uses 1440×900, 1024×768, 853×1280, and 390×844 as references plus intermediate widths and continuous resizing.
- No reference dimension becomes a special breakpoint without a layout-driven reason.
- Both languages must be tested because copy length can change layout behavior.

### Validation

- full localized-route E2E suite covering language, theme, mobile menu, smooth scroll, deep links, project navigation, and external links;
- visual review of every section in both themes and locales;
- keyboard-only traversal of Home and case;
- continuous resizing and 200% zoom checks;
- axe scans for all routes and key interactive states;
- content parity and broken-link checks;
- full formatting, lint, typecheck, test, and production build.

### Acceptance criteria

- [ ] Every public string and accessible label is correctly localized.
- [ ] Locale switching preserves the equivalent Home or case route.
- [ ] Both themes work consistently across every section without relevant flash.
- [ ] Navigation, hashes, smooth scroll, Header offset, and return paths work across the full page.
- [ ] No horizontal overflow or screenshot-specific responsive hack exists.
- [ ] All cross-section E2E journeys pass.

### Implementation unit

A cross-cutting integration change limited to gaps revealed when completed features interact. Corrections should remain logically grouped and avoid unrelated refactoring.

### Traceability

- Handoff: Internationalization; Themes; Responsiveness; Navigation; V1 Acceptance Criteria.
- Technical Definition: Locale Behavior; Theme Architecture; E2E Strategy; Build-Output Checks.

## 19. Stage 12 — SEO, Performance, and Security Hardening

### Objective

Prepare the complete static product for indexing, sharing, efficient delivery, and safe publication.

### Scope

- implement localized Home and `movune` case titles and descriptions using approved factual copy;
- configure self-referencing canonical URLs, PT-BR/English `hreflang`, and `x-default` relationships;
- add Open Graph, social-preview, favicon, and Twitter/X card metadata where applicable;
- configure sitemap and production/preview robots behavior;
- verify meaningful route content and metadata in generated HTML;
- optimize fonts, SVGs, temporary representations, dimensions, formats, loading priority, and lazy loading;
- reduce unnecessary JavaScript and dependencies;
- reserve media space and correct relevant layout shifts;
- review orbit, glow, blur, and animation paint cost;
- review dependencies, external links, public assets, metadata, and configuration for security and privacy;
- define appropriate static security headers from actual resource requirements.

### Out of scope

- invented SEO slogans or structured data without accurate data and a clear benefit;
- analytics, cookies, visitor tracking, or new third-party runtime scripts;
- micro-optimizations that compromise clarity or architecture;
- custom deployment machinery.

### Dependencies

- stable routes and final localized page content from Stages 1–11;
- production-origin and social-preview decisions from Section 25 before their affected acceptance checks can close.

### Implementation considerations

- Preview environments must not compete with production URLs in search results.
- `movune` metadata must describe a personal project in prototyping, not a launched commercial product.
- Metadata must be present in static HTML rather than depend on client execution.
- A Content Security Policy should reflect actual resource requirements and must not be broadly weakened for unnecessary scripts.
- Public assets must be sanitized before their first commit.

### Validation

- inspect generated HTML for localized titles, descriptions, canonical URLs, alternates, language, and social tags;
- validate sitemap, robots behavior, favicon, and preview images;
- crawl internal links and verify external destinations;
- inspect assets for embedded metadata, private data, local paths, and demonstrative-data disclosure;
- run dependency and secret-pattern review;
- analyze production bundle and generated asset sizes;
- run Lighthouse or equivalent diagnostics and evaluate Core Web Vitals under representative mobile conditions;
- verify no relevant layout shift, unnecessary eager loading, or console/hydration warning;
- run full build and regression tests.

### Acceptance criteria

- [ ] Every localized route has correct title, description, canonical, and language alternates.
- [ ] Home and case social previews are accurate and validated.
- [ ] Sitemap and robots behavior distinguish production from previews correctly.
- [ ] Essential content and metadata exist in generated HTML.
- [ ] Images, SVGs, fonts, JavaScript, and animations are proportionate and optimized.
- [ ] Core Web Vitals have been evaluated on a production build.
- [ ] No secret, private configuration, sensitive metadata, internal business data, or undefined collection is present.

### Implementation unit

A release-hardening feature grouping SEO, static-output inspection, asset optimization, and security review because these concerns depend on stable final routes and content and share production-build evidence.

### Traceability

- Handoff: SEO; Performance; Security and Privacy; Links; Temporary Assets.
- Technical Definition: SEO and Sharing; Performance; Assets; Deployment Environments; Security and Privacy.

## 20. Stage 13 — Accessibility and Final V1 QA

### Objective

Audit the complete V1 against product acceptance criteria, close residual accessibility and quality gaps, and produce release-candidate evidence.

### Scope

- perform a complete semantic, keyboard, focus, accessible-name, contrast, motion, touch, language, and zoom audit;
- validate landmarks and heading hierarchy on all routes;
- verify the mobile-menu focus lifecycle and all global controls;
- confirm decorative symbols, orbits, glow, and project marks are correctly excluded when redundant;
- confirm the accessible project name is exactly `movune`;
- run full automated tests, axe coverage, static checks, and production build;
- execute the complete responsive matrix in both locales and themes;
- review visual and content fidelity against the approved prototype and the handoff;
- verify facts, links, temporary-content disclosures, V1 exclusions, console output, and generated assets;
- review the complete change set for accidental files and sensitive information.

### Out of scope

- adding accessibility for the first time;
- new product features, visual redesign, speculative abstraction, final `movune` screenshots, or a carousel;
- production deployment.

### Dependencies

- Stages 1–12 complete;
- all open decisions that block release resolved.

### Implementation considerations

- Automated axe results do not replace manual keyboard, screen-reader, zoom, contrast, touch, and motion review.
- Visual fidelity cannot override semantic correctness or accessibility.
- QA corrections should address system causes rather than patch a single screenshot.
- Coverage targets are not arbitrary; tests protect real behaviors and risks.

### Validation

- formatting, lint, typecheck, unit/component tests, full Playwright suite, axe checks, and production static build;
- direct loading and generated-output checks for all four routes;
- manual keyboard and representative screen-reader review;
- `focus-visible`, focus order, mobile focus containment, and restoration checks;
- contrast checks in both themes and interactive states;
- reduced-motion and standard-motion comparison;
- 200% zoom and reflow review;
- responsive visual QA at 1440×900, 1024×768, 853×1280, 390×844, intermediate widths, and continuous resizing;
- content and factual searches for 2021, 2027, lowercase `movune`, single-project scope, and prohibited claims;
- clean-tree, diff, asset, secret, privacy, and broken-link review.

### Acceptance criteria

- [ ] All defined automated validation passes without relevant warnings.
- [ ] All four routes pass manual accessibility and responsive review.
- [ ] Visual and content fidelity match the approved handoff in both locales and themes.
- [ ] Smooth scroll, deep links, mobile navigation, locale, theme, project navigation, and external links pass end to end.
- [ ] Professional facts use 2021 and expected education completion uses 2027.
- [ ] V1 contains only `movune`, in lowercase, accurately framed as in prototyping.
- [ ] No carousel, contact form, analytics, final-screenshot dependency, or other excluded feature is present.
- [ ] The release-candidate diff is clean, sanitized, and limited to approved V1 work.

### Implementation unit

A final QA and corrective-hardening change backed by complete evidence. It should contain only gaps discovered by the audit, not new scope.

### Traceability

- Handoff: Complete V1 Acceptance Criteria; Accessibility; Responsiveness; Factual Content; Security.
- Technical Definition: Technical Acceptance Criteria; Testing; Build Output; Performance; Security.

## 21. Stage 14 — Production Release

### Objective

Publish the validated static V1 through Cloudflare Pages and confirm the production experience.

### Scope

- connect the repository to Cloudflare Pages using the approved production branch;
- configure the documented Node version, pnpm install command, static build command, and output directory;
- enable review previews and production deployment through native Git integration;
- configure the approved custom domain, HTTPS, canonical production origin, required redirects, environment values, and static security headers;
- ensure preview deployments remain noncanonical and non-indexable;
- run post-deploy smoke tests across localized routes, themes, navigation, links, assets, metadata, and not-found behavior;
- verify production performance and Core Web Vitals under representative conditions;
- record the final release outcome and any nonblocking future work separately from V1.

### Out of scope

- a custom deployment server or redundant deployment pipeline;
- analytics, backend services, CMS, contact form, carousel, new projects, or final `movune` screenshots;
- merging unrelated future work into the release.

### Dependencies

- Stage 13 release-candidate acceptance;
- approved Cloudflare project ownership, production branch, canonical origin, custom-domain settings, and required environment configuration;
- passing repository validation and successful static build.

### Implementation considerations

- Preview deployments support visual and functional review but must not compete with production indexing.
- Hosting configuration values belong in the provider when they are environment-specific or sensitive.
- Production release uses the native static output; custom infrastructure requires a demonstrated limitation.
- Deployment is not complete until direct routes and production metadata are verified from the public origin.

### Validation

- verify Cloudflare build logs and deployed artifact version;
- request all four localized routes directly and refresh them;
- verify custom domain, HTTPS, redirects, headers, canonical URLs, `hreflang`, sitemap, robots, favicon, and social metadata;
- smoke-test locale switching, theme behavior, mobile menu, smooth scroll, case navigation, email, GitHub, and LinkedIn;
- verify images, fonts, alternative text, console output, and not-found behavior;
- run representative production accessibility and performance checks;
- confirm repository main branch, deployment source, and production revision match.

### Acceptance criteria

- [ ] Cloudflare Pages serves the expected static build from the approved production revision.
- [ ] Custom domain and HTTPS work correctly.
- [ ] All four localized routes and direct deep links work in production.
- [ ] Production metadata, sitemap, robots, social previews, assets, and headers are correct.
- [ ] Preview deployments are not treated as canonical production pages.
- [ ] Post-deploy functional, accessibility, responsive, security, and performance smoke checks pass.
- [ ] No unapproved service, tracking, secret, or feature is introduced during release.

### Implementation unit

A release-configuration and production-verification unit performed only after the validated application is ready. It changes delivery configuration, not product scope.

### Traceability

- Handoff: V1 Completion; SEO; Performance; Security; External Links.
- Technical Definition: Cloudflare Pages; Environments; Build and Delivery; Post-Deployment Validation.

## 22. Cross-Cutting Validation Strategy

Validation is cumulative. Each stage runs the smallest complete set that proves its increment while preserving all prior behavior.

| Validation area | During feature stages | Integration and release gates |
| --- | --- | --- |
| Static checks | Formatting, lint, and typecheck on every stage | Full clean run in Stages 11–14 |
| Unit/component | Only for meaningful logic, state, mapping, and conditional rendering | Full suite before release |
| End to end | Add journeys when navigation, locale, theme, menu, smooth scroll, case, or external links appear | Complete route and journey matrix in Stages 11–14 |
| Accessibility automation | Axe on each new route or important interactive state | All routes, locales, themes, and key states |
| Accessibility manual | Keyboard, focus, touch, semantics, names, contrast, motion, and zoom with each feature | Complete audit in Stage 13 and production smoke test |
| Responsiveness | New feature at reference and intermediate widths | Continuous-resize and full-page matrix in Stages 11 and 13 |
| Build | Production build after relevant configuration and every integrated feature | Generated-output inspection and release build |
| Security/privacy | Before first commit of content, assets, configuration, or metadata | Full repository and deployed-output review |
| Performance | Asset and interaction review when introduced | Bundle, Core Web Vitals, and production review |

CI should remain proportional:

- pull requests: deterministic install, formatting validation, lint, typecheck, unit/component tests, static build, and targeted E2E/axe coverage appropriate to the change;
- integration to the production branch: the complete reliable validation suite and production static build;
- release: provider build validation plus post-deploy smoke, metadata, accessibility, and performance checks.

## 23. Responsive QA Matrix

| Reference viewport | Primary risks |
| --- | --- |
| 1440×900 | Wide Hero/orbit balance, content width, multi-column sections |
| 1024×768 | Intermediate Header density, Hero balance, project and contribution layouts |
| 853×1280 | Natural layout transitions, metadata grouping, tablet portrait composition |
| 390×844 | Mobile menu, touch, stacking, typography, orbit placement, overflow |

These dimensions do not define CSS breakpoints. Each stage also validates nearby widths, longer English or Portuguese copy, orientation changes where useful, and continuous resizing. Layout changes should occur when content and available space require them.

## 24. V1 Definition of Done

V1 is complete only when all conditions below are satisfied.

### Product and visual fidelity

- [ ] Home and the localized `movune` case reproduce the approved prototype's visual direction, hierarchy, content, and behavior.
- [ ] Header, Hero, Projects, Experience and Education, Skills and Tech Stack, Work Approach, Contact, and Footer are complete and correctly ordered.
- [ ] Orbit, glow, monogram, typography, spacing, surfaces, and light/dark palettes preserve the approved identity.
- [ ] Temporary `movune` representations are visually suitable, optimized, accessible, and clearly identified as demonstrative.

### Content fidelity

- [ ] PT-BR and English are complete and semantically equivalent across visible copy, hidden text, accessible names, and metadata.
- [ ] Professional web development and DealerUp experience begin in 2021.
- [ ] Software Engineering completion is expected in 2027.
- [ ] `movune` is lowercase, the only V1 project, personal, evolving, and in prototyping.
- [ ] No unsupported claim, project, metric, user, client, revenue, integration, or production architecture is published.

### Themes, responsiveness, and interaction

- [ ] Light and dark themes work as intentional experiences with explicit persistence, system fallback, and no relevant flash.
- [ ] Layout works at all four reference viewports and intermediate widths without horizontal overflow or resolution-specific hacks.
- [ ] Smooth scrolling is perceptible, respects the fixed Header, works in both directions, preserves deep links, and remains perceptible with reduced motion enabled.
- [ ] Mobile menu, locale control, theme control, CTAs, and links work by keyboard, mouse, and touch.

### Accessibility

- [ ] Semantic HTML, landmarks, headings, link/button roles, page language, and reading order are correct.
- [ ] Keyboard navigation, visible focus, mobile focus management, touch targets, and external-link indications are complete.
- [ ] Contrast passes in both themes and state is not communicated by color alone.
- [ ] Decorative content is excluded appropriately and the accessible project name is exactly `movune`.
- [ ] The site remains usable at 200% zoom and with reduced motion.
- [ ] Automated axe coverage and required manual accessibility review pass.

### SEO and performance

- [ ] Every localized page has accurate title, description, canonical URL, `hreflang`, and social metadata.
- [ ] Favicon, sitemap, robots behavior, preview indexing rules, and case-specific metadata are correct.
- [ ] Images, SVGs, fonts, loading priority, runtime JavaScript, animation, and layout stability are optimized proportionately.
- [ ] Core Web Vitals are evaluated on production-like and production builds.

### Quality, CI, security, and release

- [ ] Formatting, lint, typecheck, unit/component tests, E2E tests, axe checks, and production build pass without relevant warnings.
- [ ] CI enforces the appropriate validation before integration.
- [ ] No broken link, asset, route, hydration path, or relevant console error remains.
- [ ] No secret, credential, private environment value, internal DealerUp information, customer data, confidential metric, sensitive asset metadata, or unnecessary personal data is published.
- [ ] Cloudflare Pages serves the approved revision through the custom domain and HTTPS.
- [ ] All localized routes, metadata, links, interactions, accessibility essentials, and assets pass the post-deploy smoke test.

### Explicit nonrequirements

The Definition of Done does not require a carousel, a second project, final `movune` screenshots, a contact form, analytics, a CMS, backend services, authentication, or speculative infrastructure.

## 25. Open Implementation Decisions

These decisions remain intentionally open within the approved handoff and technical definition. They do not reopen approved architecture.

| Decision | Why it is needed | Stage | Blocking status |
| --- | --- | --- | --- |
| Exact Node LTS, Nuxt, module, and tooling versions | Compatibility must be checked against stable releases at implementation start and recorded reproducibly. | Stage 1 | Blocks project initialization, not planning. |
| Minimal compatible ESLint and formatting configuration | The technical definition deliberately avoids freezing tool options before the selected versions are known. | Stage 1 | Blocks completion of Stage 1, not its initial audit. |
| Final Nuxt folder and component names | Names should follow current Nuxt conventions and actual responsibilities rather than speculative structure. | Stages 1–10 | Does not block Stage 1; resolved incrementally before each affected unit. |
| Detailed image format and processing choices | The best strategy depends on the approved asset inventory, intrinsic dimensions, visual fidelity, and hosting/build capabilities. | Stages 2, 5, 6, and 12 | Does not block foundation; blocks final asset acceptance. |
| Canonical production origin and approved custom domain configuration | Canonical URLs, sitemap, social previews, and production routing require the final public origin. | Stages 12 and 14 | Does not block feature implementation; blocks SEO completion and release. |
| Final social-preview asset source and localized treatment | The prototype provides a baseline, but the actual public asset must be inventoried, sanitized, and validated for both page types and locales. | Stage 12 | Does not block implementation; blocks social-preview acceptance. |
| Cloudflare Pages project and environment details | Production branch, build settings, domain ownership, redirects, and provider values must match the actual account configuration. | Stage 14 | Does not block application implementation; blocks deployment. |
| Exact static security-header policy | Headers, especially CSP, must be derived from the final resource set rather than copied from a generic template. | Stages 12 and 14 | Does not block implementation; blocks release hardening. |

No open decision authorizes a different framework, rendering model, styling system, i18n strategy, theme model, test stack, package manager, CI platform, or hosting platform.

## 26. Traceability Matrix

| Stage | Handoff areas | Technical-definition areas |
| --- | --- | --- |
| 1. Foundation and Routing | Routes; Internationalization; Quality; Technical Decisions | Stack; Rendering; Structure; Content; i18n; Testing; CI; Versioning |
| 2. Design and Theme Foundation | Visual Identity; Themes; Accessibility; Performance | Styling; Tokens; Theme; Assets; Performance |
| 3. Shell, Header, Navigation | Header; Navigation; Smooth Scroll; Responsiveness; Accessibility | i18n; Theme; State; Motion; Testing |
| 4. Hero | Hero; Identity; Responsiveness; Links; Performance | Styling; Motion; Assets; Accessibility |
| 5. Selected Project | Projects; `movune` on Home; Temporary Elements | Content Model; Routes; Assets; Exclusions |
| 6. `movune` Case | Case Structure; Factual Scope; Representations; Accessibility | Routes; Content; Assets; Testing; SEO |
| 7. Experience and Education | Experience; Education; Facts; Privacy | Typed Content; Accessibility; Security; Links |
| 8. Skills and Tech Stack | Stack Categories; Facts; Responsiveness | Content; Styling; Testing |
| 9. Work Approach | How I Work; Internationalization | Localized Content; Styling; Accessibility |
| 10. Contact and Footer | Contact; Footer; Links; Security | External Links; Accessibility; Security |
| 11. Integration Completion | i18n; Themes; Responsiveness; Navigation; Acceptance | Locale; Theme; E2E; Build Output |
| 12. SEO, Performance, Security | SEO; Performance; Security; Assets | SEO; Performance; Assets; Deployment; Security |
| 13. Accessibility and Final QA | Accessibility; Complete V1 Acceptance | Accessibility; Testing; Technical Acceptance |
| 14. Production Release | Completion; SEO; Performance; Security | Cloudflare Pages; Environments; Post-Deploy Validation |

## 27. Planning Closure

This plan provides the final incremental sequence for V1 implementation. It preserves the approved product and architecture, distributes accessibility, responsiveness, localization, themes, testing, and security across the work, and reserves final stages for integration evidence, hardening, and release rather than first-time implementation of essential quality.

Stage 1 begins only in a separate implementation task. This document completes planning and does not initialize Nuxt, install dependencies, configure external services, create implementation branches, or add production code.
