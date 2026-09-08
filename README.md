# Portfolio

Personal portfolio of Leonardo Blauth, focused on professional experience, selected projects, and product-oriented software development.

## About

This portfolio presents professional experience, technical capabilities, selected projects, and an approach to building web products. It reflects positioning as a product-oriented Full Stack Developer who connects product needs with clear technical decisions and end-to-end execution.

The primary audience is recruiters and technical leadership, with deeper project context available for developers and other technical readers.

## Current status

**V1 released**

Definition → Visual Direction → Prototyping → Implementation handoff → Technical definition → Implementation plan → **Stages 1–14 complete; V1 released**

Confirmed on the current Stage 12 implementation branch (reconciled September 7, 2026):

- V1 is the first production version. Current scope includes three published projects and the Home carousel.
- Stages 1–11 of the [implementation plan](docs/implementation-plan.md) are complete. Later approved expansions are recorded there in a non-numbered section after Stage 11.
- Stage 12 adds localized static metadata, canonical and alternate links, sitemap, environment-aware robots output, static security headers, build-output validation, and localized social-preview assets. Representative production Core Web Vitals measurement is deliberately delegated to the Stage 14/release post-deploy validation.
- Stages 13–14 (final QA and production release) are complete.
- Canonical production origin: `https://leonardoblauth.dev`, served from Cloudflare Pages.

Local development uses `pnpm` with the Node/pnpm ranges declared in `package.json`.

## Documentation

The detailed documents remain the source of truth for the project:

- [Portfolio definition](docs/portfolio-definition.md) — goals, audiences, positioning, content strategy, scope, and success criteria.
- [Visual direction and architecture](docs/visual-direction-and-architecture.md) — information architecture, interface direction, responsive behavior, accessibility, and controlled motion.
- [Professional identity](docs/professional-identity.md) — the Open Loop LB identity system, visual hierarchy, approved assets, and usage rules.
- [Final implementation handoff](docs/final-implementation-handoff.md) — approved product, visual, behavioral, responsive, and accessibility requirements for the final implementation.
- [Final implementation technical definition](docs/final-implementation-technical-definition.md) — approved stack, architecture, rendering, styling, testing, SEO, performance, CI/CD, and deployment decisions.
- [Implementation plan](docs/implementation-plan.md) — incremental implementation sequence, dependencies, validation strategy, and acceptance criteria.

## Design principles

- Put content and verifiable evidence before visual effects.
- Prefer clarity and meaningful depth over unnecessary sections or inflated claims.
- Treat accessibility, responsiveness, and performance as design requirements from the beginning.
- Use motion with a clear purpose and provide a complete reduced-motion experience.
- Maintain a restrained, consistent identity without exposing confidential or unverified information.

## Repository evolution

This repository progressed from definition and visual decisions through prototyping, implementation handoff, technical definition, implementation planning, and application implementation. Stages 1–11 are integrated on `master`. Remaining numbered work starts at Stage 12.

## Author

**Leonardo Blauth — Full Stack Developer**

[GitHub](https://github.com/LeonardoBlauth)
