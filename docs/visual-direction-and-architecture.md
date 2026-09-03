# 02 — Visual Direction and Architecture

**Project:** Leonardo Blauth's professional portfolio  
**Version:** 1.1  
**Status:** approved; updated with the professional identity defined in document `04`; reconciled September 3, 2026 against the approved V1 implementation on `master`

**Sources:** `01 — Portfolio Definition`, curated references, decisions approved in this Work, and `04 — Professional Identity`

Where this document conflicts with later approved implementation on `master`, `master` prevails. The prototype and this direction remain references only for outcomes that have not been subsequently replaced. Confirmed supersessions include the Home multi-project carousel and the Hero decorative treatment (light rays rather than the earlier orbit/glow and portrait-led composition).

## 1. Purpose of this document

This document transforms the professional positioning and selected references into a concrete visual and architectural direction for the future prototype.

It defines the experience, content organization, visual language and expected behavior of interactions. It does not define implementation stack, animation library, code or infrastructure details.

## 2. Visual concept

### 2.1 Core direction

> **Dark minimalism with depth and controlled movement.**

The portfolio should look like a product-oriented Full Stack Developer's professional website, not a generic technology landing page or a creative studio's experimental website.

The identity will be made up of three layers:

1. **Calm base:** typography, grid, content, surfaces and plenty of space.
2. **Ambient depth:** discreet cursor lighting, lines and small differences between planes.
3. **Focal moment:** presentation and transition of highlighted projects.

### 2.2 Personality

The interface must transmit:

- professionalism without corporate rigidity;
- technical capacity without programming clichés;
- proximity to the construction of digital products;
- pay attention to details;
- clarity and security in decisions;
- personality expressed through composition and interaction, not through decorative excess.

### 2.3 Principles

- **Content before effect:** movement should never delay or hide information.
- **Calm by default:** approximately 80% of the experience remains static or uses only basic feedback.
- **Concentrated movement:** the most expressive 20% are on Hero, background, projects and relevant transitions.
- **Depth without spectacle:** lines, light and parallax must be perceived gradually.
- **Evidence before statement:** projects and experience support the positioning.
- **A single language:** references resolve specific functions; will not be played as independent styles.
- **Two intentional themes:** dark and light share structure, but have their own treatment of surfaces and depth.

### 2.4 Density and space

- low to moderate overall density;
- strong titles, without taking up the entire viewport;
- controlled reading width for long texts;
- wide separation between large sections;
- most compact grouping within each block;
- few elevated surfaces; most of the content should exist directly on the canvas.

### 2.5 What to avoid

- terminal, code editor or hacker aesthetic as identity;
- neon green, RGB, excessive glow or lots of gradients;
- glassmorphism applied in a generalized way;
- 3D or WebGL as a visual foundation;
- cinematographic loaders;
- scroll hijacking;
- permanent animations;
- experimental typography that impairs reading;
- custom cursor;
- composition with the appearance of a known template;
- creative agency or awards language;
- decorative elements without noticeable function.

### 2.6 Approved professional identity

The interface incorporates the **Open Loop LB** professional identity as a signature layer, without replacing the direction of **dark minimalism with depth and controlled movement**.

Its presence on the interface must occur in a concentrated manner:

- monogram `LB` as link to Home in the header;
- favicon;
- discreet signature on the footer;
- Open Graph images and covers produced for the portfolio;
- cobalt line as a supporting graphic element in backgrounds and editorial compositions.

`Leonardo Blauth` remains the main identity, `Full Stack Developer` the descriptor and the photograph the personal representation. The monogram remains secondary and should not be repeated as decoration.

Complete specifications for construction, variants, palette, clear space, applications, and restrictions are in `04 — Professional Identity`.

## 3. Information architecture

### 3.1 Definitive Home

1. **Hero**
2. **Featured Projects**
3. **Professional Experience**
4. **Skills and Tech Stack**
5. **About / How I Work** — subject to content validation in the prototype
6. **Contact**
7. **Footer**

### 3.2 Narrative progression

#### Hero — immediate identification

It must quickly answer:

- who is Leonardo;
- what is its function;
- how it works;
- when Leonardo's professional experience began;
- what his main stack is;
- how to get in touch or learn more about his work.

#### Projects — evidence and main visual moment

Right after the presentation, the visitor finds real work. movune must explicitly appear as an evolving project, without suggesting an implementation that does not yet exist.

#### Experience — professional credibility

It presents continuous professional experience since 2021, responsibilities, and selected public deliverables, without replicating LinkedIn.

#### Skills and Stack — organized technical capacity

Distinguishes professional expertise, additional experience, and current areas of exploration.

#### About / How I work — human and professional synthesis

It should explain the way of working, decision-making, learning and training. It won't be a long biography.

During prototyping, this section should be removed or merged into another if it does not have content distinct from Hero, Experience, and Stack.

#### Contact — conversion

The narrative ends by inviting the visitor to get in touch for professional opportunities.

### 3.3 Quick reading

Even without going through the entire Home, the visitor should find on Hero and at the beginning of Projects:

- name;
- professional title;
- experience since 2021;
- Brazil localization;
- main stack;
- availability, when active;
- Contact CTA;
- first featured project.

## 4. Navigation and Header

### 4.1 Desktop

The header will be compact, fixed and integrated into the canvas.

- only the monogram `LB` on the left, as a visual link to the Home and the beginning of the page;
- central or right links: Projects, Experience, Stack and Contact;
- PT/EN selector and theme grouped as utilities;
- GitHub and LinkedIn remain in Hero, Contact and Footer to avoid excessive controls;
- at the top, the header can be transparent;
- after the start of the scroll, it receives an almost opaque surface and a discreet lower edge;
- blur can be used at low intensity, without turning the header into a pane of glass.

The header should not simultaneously display the monogram and `Leonardo Blauth`, as the name already appears dominantly in Hero. The monogram maintains a discreet scale, visible focus and accessible label. It should not use glow, rotation, or ornamental animation.

The current section may be indicated by a subtle color change or small dash. This indication will only be maintained if it remains stable in long sections and during horizontal gallery.

### 4.2 Behavior during scrolling

- the header remains available;
- must not disappear completely nor require reverse movement to reappear;
- height can be reduced discreetly after leaving the Hero;
- anchors must position titles without hiding them under the header;
- no changes should cause layout jumping.

### 4.3 Mobile

- `LB` monogram on the left, maintaining the same link function to the Home;
- theme and language can remain visible as a single compact group;
- other links are in a menu activated by a clearly labeled button;
- menu opens as a simple panel, not as an animated fullscreen experience;
- GitHub, LinkedIn and contact can appear in the panel without cluttering the closed header;
- focus must remain contained and return to trigger on close.

## 5. Hero

### 5.1 Approved composition

Hero will be **asymmetrical and dominated by text**, with a secondary professional portrait.

On desktop:

- text occupies approximately two thirds of the usable area;
- photo occupies the remaining lateral region without creating a rigid 50/50 split;
- the composition uses a lot of space and few elements;
- the background provides depth through light and discreet lines.

The photo does not need to appear on a conventional rectangular card. It can be integrated by a gently rounded vertical cut, simple mask or framing partially crossed by a background line. It should not have an ornamental frame, strong glow or interface chrome.

### 5.2 Content hierarchy

1. configurable availability, when active;
2. name: **Leonardo Blauth**;
3. title: **Full Stack Developer**;
4. main message;
5. Main and secondary CTA;
6. links to GitHub and LinkedIn;
7. Quick information.

### 5.3 Working Message

Base text in Portuguese:

> I develop end-to-end web solutions, connecting product needs to clear technical decisions.

Editorial equivalent in English:

> I build end-to-end web solutions, connecting product needs with clear technical decisions.

The wording can be refined in document `03`, keeping the same promise and without artificially increasing seniority.

### 5.4 Actions

- Main CTA: **Get in touch**;
- Secondary CTA: **View projects**;
- GitHub and LinkedIn as tertiary links, with recognizable labels;
- resume is not included as the main CTA.

### 5.5 Quick information

- Brazil;
- web development since 2021;
- Vue.js, TypeScript, Laravel and MySQL as a synthesis of the main stack.

### 5.6 Background and cursor

- broad, low-opacity radial lighting follows the cursor;
- the effect exists behind the content and never changes the contrast of the text;
- movement must be direct and discrete, without customized cursor or evident trail;
- available only on devices with a precise pointer;
- in light mode, the lighting must be more contained than in dark mode;
- with movement reduction, the effect remains static or is removed.

### 5.7 Mobile

- text and CTAs appear before the photo;
- reduced and integrated portrait below the main block;
- quick information breaks into readable lines;
- lighting linked to the cursor is removed;
- lines can remain static or move minimally with the scroll;
- Hero should not require exaggerated height to be understood.

## 6. About / How I work

### 6.1 Function

This section will not repeat the role, stack, or career history. Its purpose is to explain how Leonardo works and evolves professionally.

Maximum recommended content:

- a title;
- two short paragraphs;
- up to three concrete principles;
- additional mention of Software Engineering, when relevant.

Possible axes:

- understand the context before implementing;
- make explainable technical decisions;
- build incrementally and sustainably;
- using AI as a tool without replacing technical understanding.

### 6.2 Photo

There will be no second big photo. If the Hero already uses the portrait, this section will be exclusively textual or may reuse just a very discreet detail if necessary.

### 6.3 Retention Criteria

If the final content doesn't add anything that Experience and Hero don't communicate, the section will be:

- incorporated at the end of Competencies; or
- removed, keeping only a brief education note.

## 7. Professional experience

### 7.1 Structure

As there is a continuous main trajectory, the section will not use an artificial timeline with multiple points.

It will consist of a broad editorial line:

- period in a narrow column;
- company and function highlighted;
- summary of responsibilities;
- selected deliverables in short groups;
- stack in discrete tags;
- link to full LinkedIn experience.

### 7.2 Content

It must include:

- DealerUp;
- professional experience since 2021;
- development and evolution of web products;
- frontend, backend, database, integrations, bots and automations;
- public deliverables related to sales processes, surveys, customer service, or initial contact, dashboards and interfaces.

### 7.3 Confidentiality

Will not be included:

- internal architecture;
- proprietary code;
- unconfirmed internal names;
- customers or data;
- internal metrics;
- sensitive business rules;
- details whose authorization is uncertain.

### 7.4 Visual and movement

- predominantly static section;
- movement restricted to discrete input and link states;
- no floating cards, carousel or parallax effects;
- typography and alignment should produce interest without additional decoration.

## 8. Skills and Tech Stack

### 8.1 Organization

Three visual groups:

1. **Main professional stack:** Vue.js, JavaScript/TypeScript, Laravel, PHP and MySQL.
2. **Experience or contact:** Node.js, Python, Git, Linux and Docker.
3. **Under exploration:** AI applied to development, agents, modern architectures, PostgreSQL, Redis, queues, asynchronous processing and real-time applications.

### 8.2 Presentation

- textual names have priority;
- each group has a label and short explanation;
- column layout on desktop and stacked blocks on mobile;
- icons, if used, will be small, monochromatic and secondary;
- main technologies can have greater typographic weight, without using color as the only distinction;
- skills such as frontend, backend, data, integrations and automations can function as contextual subheadings.

### 8.3 What to avoid

- logo wall as the sole presentation of skill;
- dominant colored logos without textual names;
- skill bars or percentages;
- vague classifications as “advanced” without evidence;
- mixing technologies under study with a professional stack.

A restrained tech logo loop is part of the approved Skills implementation on `master` and coexists with the textual category groups; it must remain secondary to the named categories and respect reduced motion.

## 9. Featured Projects

### 9.1 Role in the experience

This will be the main visual and interactive area of ​​the Home. The composition must convey product quality and allow for in-depth analysis without looking like an agency showcase.

### 9.2 Current state: multiple published projects

The approved Home publishes `movune`, `rigset`, and overtime automation through a multi-project carousel:

- the active project has large preview prominence;
- surrounding projects can remain partially visible according to the approved carousel treatment;
- contextual information changes along with the active project;
- navigation works by pointer, keyboard, and touch/drag where implemented;
- there is no autoplay;
- empty placeholder slides are not used.

### 9.3 Earlier single-project guidance

While only one project was published, the interface used a single featured presentation without inactive carousel chrome. That constraint is superseded by the multi-project state above and remains historical context only.

### 9.4 Hybrid movement

When the section enters the viewport:

- the track may perform a small initial horizontal displacement, sufficient to indicate continuity;
- the active preview receives smooth expansion within the frame itself;
- the background and lines can move at a slightly different speed;
- after this introduction, navigation remains under the explicit control of the visitor.

The effect should not freeze the viewport or prevent vertical continuation. There will be no mandatory sequence in which all projects need to be completed to exit the section.

### 9.5 Preview and expansion

- consistent proportion between projects, prioritizing readable screenshots;
- discrete edge and surface;
- small visual expansion, without covering text or controls;
- can reveal a slightly larger area of ​​the image or reduce cropping;
- hover and focus produce equivalent result;
- clicking or activating the CTA opens the case; it should not be necessary to click once to expand and another to access;
- transition to case can temporarily preserve the preview as an element of continuity.

### 9.6 Metadata

Each project can display:

- name;
- category;
- short description;
- current state;
- stack actually used;
- access to the case;
- GitHub and demo, where available.

Metadata is outside the image and does not depend on hover.

### 9.7 Mobile

- gallery uses native horizontal scrolling with snap;
- one main preview at a time;
- part of the next item may remain visible to indicate continuity;
- controls have adequate touch area;
- drag is not necessary; swipe, arrows and links are enough;
- spatial expansion is removed or reduced to a minimal change in scale/crop;
- text remains below the preview, never over complex screenshots;
- vertical scrolling remains natural.

### 9.8 Reduced Motion

- no initial track displacement;
- no spatial expansion;
- immediate project change or by short fade;
- information remains complete and accessible;
- transition to case does not depend on shared element.

## 10. Case studies

### 10.1 Modular structure

Each case can only use modules supported by real content.

#### Mandatory opening

- name of the project;
- short description;
- category and current status;
- Leonardo's role;
- period, when relevant;
- technologies actually used;
- available links;
- main preview.

#### Mandatory Overview

- context;
- problem;
- objective;
- existing scope;
- summary of the solution or approach.

#### Optional modules

- project evolution;
- process and discovery;
- features;
- flows or UX;
- screenshots;
- implemented architecture;
- technical challenges;
- decisions and alternatives;
- trade-offs;
- testing and quality;
- learnings;
- proven results;
- next steps.

### 10.2 movune

In its current state, the case must prioritize:

- problem and public;
- product definition;
- role and responsibilities;
- evolution of name and positioning when adding to the narrative;
- relevant UX decisions;
- evolution of the prototype;
- existing screenshots;
- current status and next steps;
- learnings.

Production architecture, integrations, code, tests or results will only enter when they actually exist.

### 10.3 Visual composition

- wide opening, but with easily scannable metadata;
- editorial board with comfortable width;
- large screenshots alternated with textual context;
- captions explain what to look for;
- technical blocks can use a different surface without simulating a terminal;
- local navigation or discrete index can be used in long cases;
- next project appears only when there is another case published;
- return for Projects remains available.

### 10.4 Movement

- short transition between preview and opening;
- images can fade and shift slightly;
- no narrative section depends on cinematic scrolling;
- diagrams and screenshots remain static for easier analysis.

## 11. Background, depth and parallax

### 11.1 Decision

Parallax will be used in a **light, localized and non-essential** way. It adds to the direction by differentiating plans, but it will not be a language applied to all sections.

### 11.2 Applications

#### Hero

- few thin lines, curves or abstract trajectories;
- two or three planes with small differences in displacement;
- discrete radial lighting associated with the cursor;
- slow movement related to scrolling;
- no element should suggest a literal futuristic circuit, matrix, terminal or grid.

#### Projects

- line or environmental layer visually connects the previews;
- minimum speed difference between background, frame and image;
- preview expansion reinforces current focus.

#### Transitions

- lines can change direction, intensity or position between Hero and Projects;
- they must not cross all sections nor remain in continuous movement.

### 11.3 Sections without parallax

- Experience;
- Stack;
- About / How I work;
- Contact;
- main body of case studies.

### 11.4 Intensity

- small displacements;
- low opacity;
- low density;
- movement perceptible only when observing, never necessary to understand the page;
- absence of artificial inertia in the scroll.

## 12. Typography

### 12.1 Approved family

**Instrument Sans** will be the main family.

It should be used in titles, body, navigation, buttons and labels, exploring weight, scale and spacing to create hierarchy without depending on several families.

### 12.2 Direction of use

- titles: 600 or 700, with controlled spacing;
- body: 400 or 500;
- labels and navigation: 500 or 600;
- technical information: smaller size, but never below the minimum readability;
- italics reserved for specific editorial emphasis;
- line width of approximately 60 to 75 characters in long texts;
- more open leading in the body than in the titles.

### 12.3 Monospace

It will not be carried as a dominant family. It may appear occasionally in:

- small technical metadata;
- version identifiers;
- short code snippets in case studies.

If it does not add meaning, Instrument Sans will be maintained on these elements as well.

### 12.4 Portuguese, English and performance

- check accents and diacritics in both languages;
- predict text expansion in labels and navigation;
- use the minimum necessary weights;
- prioritize variable format and efficient loading;
- avoid noticeable font switching when opening the page.

## 13. Color system

### 13.1 Base dark

Initial direction for prototype:

| Paper | Reference value | Intention |
| --- | --- | --- |
| Canvas | `#08090B` | Almost black, with no evident navy blue. |
| Surface 1 | `#0E1013` | Minimal canvas separation. |
| Surface 2 | `#15181D` | Elevated or selected elements. |
| Main text | `#F2F3F5` | Softened white. |
| Secondary text | `#A4A9B1` | Hierarchy without low contrast. |
| Discreet text | `#747A84` | Non-essential metadata. |
| Edge | `#252A32` | Subtle structure. |

Absolute black may appear in very specific areas, but it should not eliminate the distinction between planes.

### 13.2 Base light

| Paper | Reference value | Intention |
| --- | --- | --- |
| Canvas | `#F6F6F3` | Neutral off-white. |
| Surface 1 | `#FFFFFF` | Controlled elevation. |
| Surface 2 | `#EEEFEA` | Secondary grouping. |
| Main text | `#17191D` | Graphite, not absolute black. |
| Secondary text | `#626770` | Readable hierarchy. |
| Discreet text | `#7D828A` | Metadata. |
| Edge | `#D9DCE1` | Weightless visible structure. |

Light mode should feel editorial and airy. Soft shadows can contribute more than in the dark, while lines and lighting will be less intense.

### 13.3 Approved accent color

Cobalt `#2563EB` is the official color of the identity and the definitive accent of the portfolio. The previous amber/copper alternative was discarded.

Main applications:

- Primary CTA;
- links and active status;
- focus;
- small Project details;
- discreet ambient lighting;
- monogram and supporting graphic line.

Variations in hover, tonal surface and contrast can be derived visually for each theme, but must remain clearly within the cobalt family. The functional neutrals of dark and light remain valid; the identity palette does not require a literal replacement of all interface tokens.

### 13.4 Usage rules

- use only the cobalt family as the brand accent;
- accent should not color large areas of the layout;
- main use: CTA, links, focus, active state, small details and ambient lighting;
- success, warning and error states do not depend on the mark color;
- contrast must be validated in both themes;
- lighting cannot reduce readability;
- gradients, if used, will be tonal and very discreet.

### 13.5 Theme and preference

- dark and light are equivalent in quality;
- system preference can set first access;
- manual choice is remembered;
- theme transition should not produce flash or long animation;
- images and screenshots must remain readable in both themes.

## 14. Components and visual language

### 14.1 Buttons

- solid primer in the accent color;
- transparent secondary with border;
- tertiary in link format;
- comfortable height and direct labels;
- moderate radius, without excessively rounded appearance;
- hover changes tone, edge or slight displacement; It doesn’t just depend on scale;
- focus always visible.

### 14.2 Links

- text links must be identifiable without depending exclusively on color;
- underline can appear by default in long content and on hover in navigation areas;
- external links have understandable indication, without excessive icons.

### 14.3 Cards and surfaces

- cards only when grouping or interaction justifies;
- most sections use grids and dividers, not boxes;
- surfaces close to the canvas;
- thin border as the main delimiter;
- small shadows in the dark and soft in the light;
- no generalized glassmorphism.

### 14.4 Previews

- radius larger than controls, but still contained;
- consistent proportion;
- neutral background for framing screenshots;
- metadata external to the image;
- border and shadow must not compete with the presented product.

### 14.5 Tags and badges

- discreet technical tags, with a neutral tonal surface;
- availability can use point and text, never just color;
- project states must be expressed by words like “In prototyping”.

### 14.6 Icons

- linear and consistent style;
- size secondary to the label;
- icon-only buttons need an accessible name and tooltip when necessary;
- technology logos do not form the main identity.

### 14.7 Dividers, borders and radius

- thin, low-contrast dividers;
- small to moderate radius in controls;
- moderate radius in previews;
- avoid arbitrary mixing of many formats;
- structure must be perceived without excess boxes.

## 15. Motion and microinteractions

### 15.1 Strategy

Movement is classified by purpose:

| Purpose | Usage |
| --- | --- |
| Feedback | Hover, focus, click, selection and email copy. |
| Guidance | Change of section, gallery and transition to case. |
| Depth | Cursor, lines and localized parallax. |
| Featured | Active project and preview expansion. |
| Transition | Theme and pages. |

### 15.2 Intensity and duration

- feedback: fast and almost immediate;
- orientation: short to moderate;
- projects: more noticeable but controlled movement;
- depth: slow and low amplitude;
- do not stack multiple animations on the same element;
- use natural easing, without exaggerated elasticity.

As a reference for the prototype:

- feedback: approximately 120–180 ms;
- common transitions: 220–360 ms;
- design and page change: 350–600 ms;
- environmental movement: linked to the scroll, without autonomous loop.

These ranges are language limits, not implementation requirements.

### 15.3 Main interactions

#### Cursor/background

- radial light accompanies the pointer on the Hero;
- low opacity and high diffusion;
- no trail, cursor customization or abrupt response;
- removed in touch and motion reduction.

#### Section entry

- title and content may appear with fade and small vertical displacement;
- apply once per section, not on each individual item;
- Experience, Stack, About and Contact remain visually calm.

#### Scroll and lines

- lines change a few pixels between planes;
- Hero and Projects only;
- without artificial inertia and without modifying the page physics;
- static in motion reduction.

#### Projects

- small initial displacement indicates horizontality;
- active expands within the frame;
- exchange updates metadata in sync;
- arrows, keyboard and swipe produce the same final state;
- no autoplay.

#### Hover and focus

- buttons and links change color, border or underlining;
- previews receive equivalent expansion;
- hover will not be styled as weak version of hover; must be clearly visible.

#### Page transition

- preview can continue visually up to the Hero of the case;
- content does not wait for animation to become available;
- return navigation is immediate;
- with reduced movement, use direct switching or short fade.

#### Dark/light mode

- short transition of colors and surfaces;
- no rotation, radial explosion or screen wipe;
- respect movement reduction;
- avoid flashing incorrect theme on load.

### 15.4 Explicitly avoided movement

- decorative loops;
- constant marquee;
- elements following the cursor;
- animated entry of each word;
- exaggerated elastic physics;
- globally enforced smooth scrolling;
- cards floating without interaction;
- long transition before each page.

## 16. Responsiveness

### 16.1 Wide desktop

- Hero's asymmetrical composition;
- gallery with adjacent previews visible;
- full header navigation;
- lines and cursor with approved total depth;
- cases can alternate text and media in wide layouts.

### 16.2 Notebook and horizontal tablet

- reduce spaces without excessively increasing density;
- portrait remains secondary;
- gallery shows smaller part of adjacent projects;
- header can reduce links before resorting to the menu;
- parallax uses smaller amplitude.

### 16.3 Portrait Tablet

- Hero approaches stacked composition;
- photo moves after the text;
- Experience abandons very narrow columns;
- Stack uses two or one block per line;
- gallery prioritizes swipe and arrows;
- environmental cursor is removed when there is no precise pointer.

### 16.4 Smartphone

- compact header with menu;
- Textual hero first;
- CTAs stacked or occupying a comfortable width;
- smaller photo below the message;
- projects with single preview and snap;
- Experience in vertical block;
- Stack fully stacked;
- case studies in one column;
- screenshots can use horizontal gallery only when there is a clear alternative;
- Contact uses email and LinkedIn as large interactive areas;
- parallax and expansions are removed or simplified;
- no information depends on hover.

## 17. Accessibility and visual performance

### 17.1 Accessibility

- adequate contrast for texts, necessary borders and focus;
- visible focus on all controls;
- full keyboard navigation;
- coherent focus order in the gallery and mobile menu;
- touch areas of approximately 44 px or more;
- comfortable body text, normally from 16 px;
- information never depends only on color;
- screenshots have alternative texts or captions appropriate to the context;
- no essential text embedded in the image only;
- page language and language change clearly identified;
- gallery without autoplay and with explicit controls;
- `prefers-reduced-motion` treated as a full experience variant.

### 17.2 Visual performance

- Instrument Sans loaded with the minimum necessary variations;
- responsive, scaled and compressed photo and screenshots;
- main image above the fold prioritized; other media loaded progressively;
- reserved dimensions to avoid layout changes;
- effects limited to efficient visual properties;
- lighting and lines do not depend on WebGL;
- parallax disabled on devices where its cost is not justified;
- videos and GIFs should not replace screenshots when there is no benefit;
- active design maintains clear image without loading all heavy media from cases in advance.

## 18. Consolidated decisions and avoided items

### Decided

- dark minimalism with depth and controlled movement;
- base close to black in dark and off-white in light;
- Instrument Sans as main family;
- Dominant textual hero with secondary portrait;
- Main CTA for contact;
- projects immediately after Hero;
- hybrid and progressive gallery;
- unique design without artificial controls;
- light parallax only in Hero and Projects;
- subtle lighting linked to the cursor on appropriate devices;
- Experience, Stack, About and Contact predominantly static;
- modular architecture for case studies;
- Open Loop LB professional identity approved;
- monogram as the only visual link to the Home in the header;
- cobalt `#2563EB` as official brand color and definitive accent;
- cobalt line as a discrete supporting graphic element;
- About maintained only if it offers distinctive content.

### Avoided

- hacker, terminal, neon and RGB aesthetics;
- navy blue and green identity inspired directly by Brittany Chiang;
- literal reproduction by Dennis Snellenberg or Lusion;
- scroll hijacking and global experimental navigation;
- 3D, WebGL and cinematic loaders;
- wall of logos and artificial levels of dominance;
- artificial timeline for a single main trajectory;
- excess cards, glassmorphism, gradients or decoration;
- constant animation or indispensable for understanding;
- artificially filled case studies;
- publication of confidential professional information.
- direction in amber/copper and mixing personal palettes with movune's identity;
- repeating the monogram on cards and sections or applying effects to the symbol.

## 19. Decisions required before Handoff to Prototype

Before producing document `03 — Prototype Handoff`, the following decisions will still be required::

1. finalize the actual Hero copy in Portuguese and English, keeping the approved message;
2. select the file and framing of the professional photo that will be delivered to the prototype;
3. define the final public content of the DealerUp experience and review confidentiality;
4. select the movune screenshots and confirm how its current state will be described;
5. gather the real links available: GitHub, LinkedIn, email and possible demonstration;
6. decide whether a PDF resume will be part of the first prototype;
7. redact or discard the content of “About / How I work” according to the defined criteria;
8. define which modules in the movune case have sufficient content for the first version;
9. incorporate the assets and identity rules approved in document `04` into the handoff.

The accent color is set to cobalt `#2563EB`; no comparison with copper is necessary in the prototype.

This document does not initiate prototyping, implementation, or stack decisions.
