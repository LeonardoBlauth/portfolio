# 06 — Final Portfolio Implementation Technical Definition

**Project:** Leonardo Blauth's personal portfolio

**Document type:** Public technical definition

**Status:** Approved for final implementation

**Consolidated:** August 27, 2026

## 1. Purpose

This document defines the technical architecture for the final portfolio implementation. It complements the [Final Prototype-to-Implementation Handoff](./final-implementation-handoff.md), which remains the source for approved product content, visual direction, interaction intent, responsive behavior, and acceptance criteria.

The architecture is deliberately compact. The portfolio has a small, stable route set, no authenticated area, no server-owned business data, and no V1 requirement for a backend or content management system. The selected approach prioritizes complete static output, maintainable localized content, accessibility, performance, and a low operational burden.

The prototype establishes the expected experience, but its generated code is not production architecture. The final application should reproduce the approved result with appropriate semantics, component boundaries, test coverage, and delivery controls.

## 2. Architectural Principles

The implementation follows these principles:

- use the simplest architecture that satisfies the approved product;
- generate complete HTML for every public route and locale;
- keep content explicit, typed, and versioned with the application;
- separate localized copy from reusable structured data where practical;
- use native platform and framework capabilities before adding dependencies;
- preserve accessibility and semantic HTML as implementation constraints;
- treat themes and responsive behavior as coherent systems rather than local exceptions;
- test important user journeys and failure-prone behavior;
- avoid speculative infrastructure for future projects or features;
- keep hosting and deployment reproducible without introducing a custom server.

## 3. Selected Stack

| Concern | Selection | Rationale |
| --- | --- | --- |
| Application framework | Nuxt 4 | Provides Vue-based routing, static generation, metadata support, and an established module ecosystem without requiring a custom application shell. |
| UI framework | Vue 3 | Matches Leonardo's professional experience and supports a clear component and Composition API model. |
| Language | TypeScript | Improves the reliability of content models, component contracts, and configuration. |
| Package manager | pnpm | Provides deterministic installation with a single committed lockfile and efficient dependency storage. |
| Rendering | Static site generation and prerendering | Produces complete HTML for the entire public route set, improving resilience, crawlability, performance, and hosting simplicity. |
| Styling | Custom CSS, CSS custom properties, and component-scoped styles | Preserves the bespoke visual direction without adopting a utility or component framework that adds little value to this small design system. |
| Internationalization | Nuxt i18n | Centralizes messages, locale routing, language metadata, and switching behavior. |
| Unit and component testing | Vitest and Nuxt Test Utils | Integrates with the application stack and supports composable and component-level validation. |
| End-to-end testing | Playwright | Covers localized routes, navigation, themes, responsive states, keyboard behavior, and deployed-style browser interactions. |
| Automated accessibility checks | axe integrated with browser tests | Detects a useful class of accessibility regressions while complementing manual review. |
| Continuous integration | GitHub Actions | Runs validation in the repository's native collaboration environment. |
| Hosting | Cloudflare Pages | Fits a static application, provides preview deployments, and avoids a server maintenance requirement. |

Stable, mutually compatible dependency versions should be fixed when the application is initialized. The lockfile is the reproducibility boundary and only one package manager and lockfile should be used.

## 4. Rendering and Routing

### 4.1 Static generation

All V1 pages are statically generated. Each localized URL must return meaningful, complete HTML without depending on client-side rendering to create primary content.

Static generation is appropriate because:

- the content changes through repository updates rather than at request time;
- no authenticated or user-specific content exists;
- no server-side business operation is required;
- the route set is small and known in advance;
- search engines and link previews benefit from route-specific HTML and metadata;
- Cloudflare Pages can serve the result directly from its edge network.

Client-side hydration remains available for language switching, theme selection, the mobile menu, and restrained interaction. It is not used as a substitute for delivering initial content.

### 4.2 Public route matrix

PT-BR is the default locale and uses URLs without a locale prefix. English uses the `/en` prefix.

| Locale | Home | `movune` case study |
| --- | --- | --- |
| PT-BR | `/` | `/projetos/movune` |
| English | `/en` | `/en/projects/movune` |

The Nuxt i18n strategy is `prefix_except_default`. Route names and locale paths should be explicit enough to keep language switching deterministic between equivalent pages.

Every route must be included in prerender output and validated directly, including deep-link navigation and browser refreshes. A deployment must not rely on an SPA fallback to make known static routes work.

### 4.3 Error handling

The application includes a localized not-found experience consistent with the portfolio identity. Invalid paths should return the appropriate HTTP outcome when supported by the hosting configuration rather than silently resolving to Home.

## 5. Application Structure

The exact folder layout may follow current Nuxt conventions, but responsibilities should remain explicit:

- pages compose route-level content and metadata;
- layout components provide shared Header, navigation, Footer, and global decorative layers;
- section components represent meaningful Home and case-study regions;
- small UI components are extracted when they have a clear responsibility or reuse case;
- composables own focused client behavior such as theme preference or locale-aware navigation;
- typed data modules represent repeatable structured content;
- locale files contain translatable editorial content and interface labels;
- assets are separated according to whether they require build processing or direct public delivery;
- global styles define reset, typography, tokens, and shared utilities;
- component styles remain close to the component when their scope is local.

Components should not be created solely to reduce line count. A component boundary is justified by semantic responsibility, repeated behavior, testability, or real reuse. Conversely, large route files should not absorb independent interactive or structural concerns.

## 6. Content Architecture

### 6.1 Repository-managed content

V1 content is stored with the application. A CMS is intentionally excluded because the portfolio has one owner, a small route set, infrequent editorial changes, and no requirement for nontechnical publishing.

Repository-managed content provides:

- reviewable content changes;
- version history alongside the interface;
- no external content service or credential surface;
- predictable static builds;
- direct typing for repeated structures.

A CMS should be reconsidered only if editing frequency, contributor needs, or content volume creates a demonstrated maintenance problem.

### 6.2 Localized messages and typed data

Content is divided by responsibility:

- localized messages contain headings, paragraphs, labels, alternative text, accessible names, and metadata;
- typed TypeScript modules contain stable structured facts such as links, technology identifiers, project identifiers, and display ordering;
- locale-specific slugs and route metadata remain centralized rather than scattered through components.

The model should avoid both extremes: duplicating complete page structures for each language and forcing every content fragment into a deeply nested translation file. Shared structure remains in components, while language-dependent meaning remains in locale resources.

The two language versions must remain semantically equivalent. Product copy may be idiomatic rather than mechanically literal, but neither locale should introduce unsupported facts, claims, or features.

### 6.3 Public facts

The content model preserves these approved facts:

- Leonardo Blauth is a Full Stack Developer based in Brazil;
- professional web development experience begins in 2021;
- the current professional period is `2021 — present`;
- Software Engineering at Universidade Positivo is in progress, with expected completion in 2027;
- `movune` is a lowercase personal-project identity;
- `movune` is evolving and currently in prototyping;
- prototype representations and their data are demonstrative;
- no carousel is included in V1.

The public documentation makes no claims about users, customers, revenue, commercial validation, production integrations, or a completed production architecture for `movune`.

## 7. Internationalization

### 7.1 Locale behavior

- PT-BR is the default locale.
- English is available through `/en` routes.
- The site does not automatically redirect based on browser language.
- A visitor can switch language explicitly from every page.
- Manual preference may be persisted for subsequent navigation.
- A language switch keeps the visitor on the equivalent localized route whenever one exists.
- The document `lang` attribute and localized metadata update correctly.

Avoiding an automatic browser-language redirect keeps URLs predictable, prevents surprising navigation, and ensures that a shared link opens exactly as published.

### 7.2 SEO relationship between locales

Every localized route defines:

- its own title and description;
- a self-referencing canonical URL;
- `hreflang` links to the PT-BR and English equivalents;
- an appropriate `x-default` relationship;
- localized Open Graph fields where relevant.

The locale strategy must not create duplicate canonical claims or allow one language to inherit inaccurate metadata from another.

### 7.3 Layout tolerance

Components must tolerate different copy lengths without truncation, forced line breaks, or language-specific positioning hacks. Both locales are included in responsive, visual, accessibility, and end-to-end validation.

## 8. Styling and Design Tokens

### 8.1 Styling strategy

The initial implementation uses custom CSS with CSS custom properties and scoped component styles. Tailwind CSS and a general-purpose component library are deliberately excluded from V1 because the interface is small, bespoke, and not based on a repeated utility-heavy product system.

SCSS is not required initially. It may be introduced only if nesting, reusable compilation logic, or another concrete need provides value beyond native CSS.

This approach keeps the generated styles understandable and allows the visual system to be represented directly without translating it through an unrelated design framework.

### 8.2 Token layers

Tokens are organized by meaning rather than by individual component:

1. foundational values: type families, type scale, spacing, radii, borders, shadows, and motion durations;
2. semantic colors: canvas, surface, elevated surface, primary text, muted text, border, accent, focus, and interactive states;
3. theme mappings: dark and light values assigned to the same semantic roles;
4. limited component-specific values when a visual element cannot be expressed cleanly through the shared layers.

The cobalt identity color is `#2563EB`. Theme-specific supporting blues, violets, neutral surfaces, and glow values remain contextual tokens. The green `movune` identity is scoped to project representations and does not enter the portfolio's global accent system.

Hardcoded colors and spacing values should not be repeated across components when a semantic token describes the intention. Tokenization should remain practical; one-off measurements do not require artificial abstraction.

### 8.3 Typography

Instrument Sans is used for interface and editorial content. Font delivery should:

- use only necessary weights and styles;
- prefer an efficient self-hosted or otherwise privacy-conscious strategy;
- define appropriate fallbacks;
- avoid blocking primary content longer than necessary;
- minimize layout shifts through correct metrics and loading behavior.

Monospace is reserved for content with technical meaning and is not a general visual accent.

## 9. Theme Architecture

Both dark and light themes are first-class experiences.

Theme resolution follows this order:

1. an explicitly saved visitor preference;
2. the operating-system preference when no explicit choice exists;
3. the documented default when system preference cannot be determined.

The resolved theme is applied before the application becomes visible whenever possible, preventing an avoidable flash of the wrong theme. Preference storage is local to the browser and does not require an account or server.

The theme composable should expose a small, testable contract for the resolved value, explicit selection, system changes when relevant, persistence, and document attribute updates. Components consume semantic CSS tokens rather than branching on theme names.

Theme controls require visible focus, localized accessible names, sufficient touch targets, and a state that is not communicated only through color or icon appearance.

## 10. State and Client Behavior

V1 does not require Pinia or another global state library. State is limited to focused UI concerns:

- theme preference;
- language preference and navigation;
- mobile-menu state;
- temporary interaction state local to a component.

Vue state and focused composables are sufficient. A shared store should be considered only if state begins to span unrelated routes or components in a way that creates duplicated orchestration or unclear ownership.

The mobile menu must manage expanded state, focus containment, `Escape`, destination selection, scroll interaction, and focus restoration. Same-page navigation keeps semantic anchors and URL fragments while accounting for the fixed Header and reduced-motion preference.

## 11. Motion and Decorative Systems

Motion uses CSS transitions, CSS animations, and native browser APIs. GSAP and other animation libraries are excluded initially because the approved experience requires restrained transitions and orbit movement rather than timeline-heavy choreography.

Implementation requirements:

- animations do not carry essential meaning;
- the orbit and glow system does not block interaction or reading;
- decorative layers are excluded from the accessibility tree;
- continuous animation is efficient and limited;
- same-page scrolling remains native and interruptible;
- `prefers-reduced-motion` removes or shortens nonessential movement;
- no scroll hijacking, custom cursor, or cinematic transition system is introduced.

A heavier animation dependency would require a concrete interaction that cannot be implemented maintainably with the selected platform capabilities.

## 12. Assets and Image Strategy

Identity assets use the approved SVG sources. SVGs must be reviewed for unnecessary metadata, embedded data, inaccessible text duplication, and unsafe or irrelevant content before publication.

Raster project representations should use dimensions and formats appropriate to their rendered size. The implementation should:

- reserve intrinsic space to reduce layout shift;
- provide meaningful alternative text when an image communicates content;
- use empty alternatives for genuinely decorative images;
- avoid loading below-the-fold media eagerly without benefit;
- retain enough visual fidelity for interface details to remain legible;
- identify demonstrative `movune` data as prototype content.

The temporary representations may be replaced by approved real screenshots later without changing the surrounding architecture. V1 does not need a carousel or generalized media-gallery subsystem.

## 13. Accessibility Strategy

The target is an accessible implementation aligned with WCAG 2.2 AA principles where applicable to the product.

### 13.1 Structural requirements

- semantic `header`, `nav`, `main`, sectioning, and `footer` structure;
- one coherent page heading hierarchy;
- native links and buttons selected according to behavior;
- skip navigation when it materially improves keyboard use;
- localized accessible names and page language;
- no duplicated accessible text from decorative symbols;
- correct alternatives for visual content.

### 13.2 Interaction requirements

- all controls and links are keyboard operable;
- focus order follows the visual and semantic sequence;
- `focus-visible` treatment is clearly perceivable in both themes;
- the mobile menu manages focus and restores it to the trigger;
- external-link behavior is communicated accessibly;
- touch targets are comfortable at narrow viewports;
- hover-only information has a keyboard and touch equivalent;
- state is never communicated by color alone.

### 13.3 Visual and motion requirements

- foreground and interactive-state contrast is validated in both themes;
- the experience remains usable at 200% zoom;
- content reflows without avoidable horizontal scrolling;
- reduced motion provides an equivalent experience;
- decorative orbit and glow layers never obscure focus, text, or controls.

Automated axe checks are included in browser testing, but they do not replace keyboard navigation, zoom, contrast, screen-reader spot checks, or visual review.

## 14. SEO and Social Metadata

Nuxt route metadata is generated per locale and page. The implementation includes:

- localized titles and descriptions;
- canonical URLs based on the final production origin;
- language alternates and `hreflang`;
- Open Graph metadata and preview images;
- Twitter/X cards when useful;
- favicon and application icons from approved assets;
- sitemap and robots configuration;
- appropriate indexability for production and non-indexability for preview environments;
- structured data only where the data is accurate and the schema adds clear value.

The `movune` case metadata must describe a personal project in prototyping and must not imply a launched commercial product. Preview environments should not compete with the production site in search results.

Metadata is tested from generated HTML, not only from client-side state.

## 15. Performance Strategy

The static architecture provides a strong baseline, but visual effects and hydration still require explicit control.

### 15.1 Priorities

- ship complete HTML with minimal client JavaScript;
- avoid dependencies for behavior that CSS or small composables can provide;
- optimize and correctly size images;
- load only required font files;
- reserve layout space for media and decorative compositions;
- avoid expensive continuous scroll listeners;
- keep blur, shadow, and animated layers within a reasonable paint budget;
- lazy-load only content for which deferred loading improves the result;
- prevent hydration warnings and layout instability.

### 15.2 Validation

Production output is evaluated using Core Web Vitals and representative mobile conditions. Lighthouse may provide diagnostic evidence, but it is not treated as a substitute for field-oriented metrics, browser profiling, or visual inspection.

Performance budgets should remain proportional to the site. The principal architectural constraint is that a small static portfolio should not ship application-scale runtime complexity.

## 16. Testing Strategy

Testing focuses on behavior and risks rather than maximizing test count.

### 16.1 Unit and component tests

Vitest and Nuxt Test Utils cover focused logic such as:

- theme preference resolution and persistence;
- locale-aware route mapping;
- content-model invariants;
- rendering of important conditional states;
- accessible labels and state attributes for interactive controls.

### 16.2 End-to-end tests

Playwright covers representative journeys in both locales and themes:

- loading every localized route directly;
- switching locale while preserving the equivalent page;
- selecting and persisting a theme;
- desktop and mobile navigation;
- keyboard operation and visible focus;
- opening and closing the mobile menu;
- navigating to fixed-Header anchors;
- external contact destinations;
- not-found behavior;
- absence of horizontal overflow at reference viewports.

Axe checks run against important route and state combinations. Manual checks remain necessary for semantics, screen-reader output, focus quality, motion, contrast, and visual fidelity.

### 16.3 Build-output checks

Validation should confirm:

- all four localized routes are generated;
- required metadata is present in generated HTML;
- canonical and alternate links are correct;
- internal links resolve;
- public assets exist and load;
- no preview-only or local URL enters production output;
- there are no relevant build, hydration, or browser-console errors.

## 17. Continuous Integration

GitHub Actions provides automated validation for reviewable changes. The pipeline should use the committed pnpm lockfile and run the checks appropriate to the change, including:

1. deterministic dependency installation;
2. formatting validation;
3. linting;
4. TypeScript checking;
5. unit and component tests;
6. production static build;
7. end-to-end and automated accessibility checks where the execution environment supports them.

Checks should fail clearly and avoid hidden mutation of tracked files. Dependency caching may improve execution time but must not weaken lockfile reproducibility.

Changes remain isolated and reviewable, and required automated validation succeeds before integration.

## 18. Deployment Architecture

Cloudflare Pages hosts the generated static output.

### 18.1 Environments

- review changes may receive isolated preview deployments;
- the production branch publishes the canonical public site;
- preview environments use non-production indexing rules;
- production configuration supplies the canonical origin used by metadata and sitemap generation.

### 18.2 Build and delivery

The deployment should rely on the framework's static output and Cloudflare Pages' native build-and-publish capability unless a demonstrated limitation requires another mechanism. A custom deployment server or pipeline adds operational surface without improving the approved V1 product.

Deployment configuration must document the runtime version, package-manager command, build command, and output directory. Configuration values that are safe and environment-specific may be supplied through the hosting platform. Secrets must never be committed.

### 18.3 Post-deployment validation

Production validation includes:

- direct requests to every localized route;
- correct HTTP and not-found behavior;
- working assets and fonts;
- canonical, language-alternate, robots, and sitemap output;
- no indexing of preview deployments;
- no broken internal or external links;
- representative responsive, theme, accessibility, and performance checks.

## 19. Security and Privacy

The V1 attack surface is intentionally small because there is no backend, account system, database, contact form, or analytics integration.

Requirements include:

- no credentials, API keys, access tokens, account identifiers, or private endpoints in tracked files or generated assets;
- no private DealerUp information, customer data, proprietary implementation detail, or confidential metric;
- safe external-link attributes for new-tab navigation;
- dependency review and automated update awareness;
- minimal third-party runtime code;
- no undefined tracking, cookies, or data collection;
- review of SVG and image metadata before publication;
- environment-specific values supplied through deployment configuration when required;
- security headers appropriate to a static site, configured without breaking required assets.

A Content Security Policy can provide meaningful protection but should be introduced from the application's actual resource requirements. It should not be copied from a generic template or weakened broadly to accommodate unnecessary third-party scripts.

The public email, GitHub URL, and LinkedIn URL are intentional contact information. They do not authorize publishing unrelated profile-management guidance or private account configuration.

## 20. Deliberate Exclusions and Trade-offs

### 20.1 No backend, API, database, or authentication

The approved portfolio has no server-owned workflow. Adding these systems would increase hosting, security, testing, and maintenance costs without supporting a V1 requirement.

### 20.2 No CMS

Content volume and update frequency do not justify an external editorial system. Versioned repository content is simpler and more auditable for a single-owner portfolio.

### 20.3 No global state library

The current state surface is small and cohesive. Composables and local state avoid an unnecessary application-wide abstraction.

### 20.4 No utility CSS or component framework

The approved interface has a distinct, limited visual language. Custom CSS expresses it directly without importing a larger design vocabulary or runtime.

### 20.5 No heavy animation library

CSS and native APIs cover the approved motion. A larger dependency is not justified by the current interaction model.

### 20.6 No analytics in V1

No measurement objective, retention policy, or consent requirement has been approved. Excluding analytics avoids collecting visitor data without a defined purpose.

### 20.7 No speculative project carousel

V1 has one real project. A carousel and generalized multi-project architecture should be considered only when multiple real projects create that need.

### 20.8 No reuse of prototype architecture by default

Prototype code demonstrates an outcome but may contain generated dependencies, brittle positioning, or mechanisms unsuitable for production. Reuse is acceptable only when an individual implementation is understandable, maintainable, accessible, and consistent with this architecture.

## 21. Evolution Criteria

The architecture can evolve when evidence changes the constraints:

- introduce a CMS when content operations require nontechnical editing or materially greater scale;
- introduce global state when cross-route state ownership becomes genuinely complex;
- introduce a richer media component when multiple real projects require it;
- introduce analytics only with a defined question, privacy approach, and minimal data strategy;
- introduce a backend only for an approved server-owned capability;
- introduce an animation library only for interactions that native capabilities cannot express maintainably.

These are decision triggers, not planned V1 work.

## 22. Technical Acceptance Criteria

### 22.1 Architecture and build

- [ ] Nuxt 4, Vue 3, and TypeScript form the application baseline.
- [ ] pnpm is used with one committed lockfile.
- [ ] The production build generates complete static HTML.
- [ ] All four localized routes are generated and directly reachable.
- [ ] No backend, database, authentication, CMS, or unapproved runtime service is introduced.
- [ ] Components and composables have clear responsibilities without speculative abstraction.

### 22.2 Content and localization

- [ ] PT-BR is served without a locale prefix and English under `/en`.
- [ ] Language switching preserves equivalent routes.
- [ ] No automatic browser-language redirect overrides a requested URL.
- [ ] Copy, metadata, alternative text, and accessible names are localized.
- [ ] Structured public facts are typed or centralized appropriately.
- [ ] Professional experience is documented from 2021.
- [ ] `movune` remains lowercase and is presented as an evolving personal project in prototyping.

### 22.3 Visual system and interaction

- [ ] Custom CSS and semantic tokens reproduce both approved themes.
- [ ] Theme selection uses saved preference, system fallback, and pre-visibility application.
- [ ] Responsive layouts work continuously rather than only at reference screenshots.
- [ ] Native, restrained motion respects reduced-motion preference.
- [ ] The mobile menu and anchor navigation work with keyboard, touch, and mouse.
- [ ] Temporary project representations are optimized and accurately labeled.

### 22.4 Accessibility, SEO, and performance

- [ ] Semantic structure, heading hierarchy, focus, contrast, zoom, and touch targets are validated.
- [ ] Automated axe checks and applicable manual accessibility checks pass.
- [ ] Every localized page has correct title, description, canonical, and language alternates.
- [ ] Preview deployments are not indexed as production pages.
- [ ] Images, fonts, JavaScript, visual effects, and layout stability are reviewed.
- [ ] Production Core Web Vitals are evaluated under representative conditions.

### 22.5 Delivery, security, and privacy

- [ ] Formatting, linting, type checking, tests, and static build succeed in continuous integration.
- [ ] Cloudflare Pages publishes the expected static output.
- [ ] Direct routes, assets, metadata, sitemap, robots, and not-found behavior pass post-deployment checks.
- [ ] No secret, private endpoint, internal business data, or unintended personal data is present.
- [ ] External links are safe and accessibly communicated.
- [ ] No undefined analytics, tracking, or data collection is introduced.

## 23. Conclusion

The selected architecture matches the portfolio's actual scale: a four-route localized static site with a bespoke interface and a small amount of client behavior. Nuxt, Vue, TypeScript, repository-managed content, semantic CSS tokens, focused composables, automated testing, and Cloudflare Pages provide a maintainable path without adding systems the product does not need.

The implementation remains production-quality through explicit accessibility, SEO, performance, testing, security, and deployment criteria—not through architectural size. Future complexity should enter only when a real product requirement justifies it.
