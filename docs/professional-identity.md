# 04 — Professional Identity

**Project:** Leonardo Blauth's professional identity  
**Version:** 1.0  
**Status:** approved as the source of truth for identity, visual signature, and application of assets  
**Document relationship:** complements `01 — Portfolio Definition`, `02 — Visual Direction and Architecture`, and `03 — Prototype Handoff`

## 1. Purpose of identity

The professional identity establishes a consistent visual signature for Leonardo Blauth throughout the portfolio and its related assets.

Its role is to support recognition and visual consistency across portfolio touchpoints. It complements the existing content and visual direction; it does not replace positioning, professional evidence, photography, or editorial clarity.

The system must operate discreetly. Name, professional title, experience, and projects continue to be the elements responsible for communicating the professional profile. The monogram acts as a secondary signature and element of recognition.

## 2. Professional positioning

Leonardo Blauth must be introduced as:

> **Product-oriented Full Stack Developer**

The identity should convey:

- clarity;
- technical capacity;
- reliability;
- product reasoning;
- development of end-to-end solutions;
- professionalism without seniority inflation.

The main public descriptor remains `Full Stack Developer`. Product orientation must appear in the message, content and evidence, without turning the title into a list of specialties.

## 3. Identity attributes

### 3.1 Clear

Shapes, typography and composition must be understood quickly. Identity does not use excessive abstraction nor does it require explanation to recognize initials.

### 3.2 Technical

Geometric construction, consistent weight, and visual precision communicate structured reasoning without resorting to terminals, code, or literal programming symbols.

### 3.3 Reliable

The restrained palette, contrast and absence of superfluous effects support a professional and stable presence.

### 3.4 Product-oriented

The continuity of forms and the support line represent the connection between problem, decision, interface, systems and product evolution.

### 3.5 Personal

The system starts from Leonardo Blauth's initials and coexists with his professional photography. It is not intended to appear like a company, agency or creative studio.

## 4. Identity hierarchy

The official hierarchy is:

1. **Leonardo Blauth** — main identity;
2. **Full Stack Developer** — professional descriptor;
3. **LB monogram** — secondary visual signature;
4. **professional photography** — personal representation where identification is necessary within the portfolio.

Practical consequences:

- the full name should never be hidden in contexts that need to identify the person;
- photography and monogram have different functions and can coexist when they do not compete;
- the monogram should not be more prominent than the full name;
- in the portfolio header, where the name is already dominant in Hero, the monogram can work alone as a link to the Home;
- lockups with name and title are appropriate for portfolio assets where the signature needs to be self-contained.

## 5. Conceptual construction of the monogram

The approved direction is called **Open Loop LB**.

The symbol combines the initials `L` and `B` in a continuous geometric construction:

- `L` uses soft white in the main version;
- the `B` uses cobalt and remains visually open;
- initials must be read immediately;
- rounded terminals reduce rigidity without reducing precision;
- stroke weight remains consistent;
- the lower join creates continuity between the letters;
- the shape was designed to remain readable at reduced sizes;
- there is no external frame.

The symbol must remain flat and vector. Its technical appearance comes from construction, not effects.

## 6. Available versions

### 6.1 Color monogram

`lb-monogram-color.svg` is the main version for dark backgrounds. Uses `L` in soft white and `B` in cobalt.

### 6.2 White monogram

`lb-monogram-white.svg` is the monochrome version for dark backgrounds, photographs or compositions where the two-color version would lose clarity.

### 6.3 Cobalt monogram

`lb-monogram-cobalt.svg` is the monochromatic version suitable for light backgrounds and applications with a single brand color.

### 6.4 Lockup for dark background

`lb-lockup-dark.svg` brings together monogram, `Leonardo Blauth` and `Full Stack Developer` for dark surfaces.

### 6.5 Lockup for light background

`lb-lockup-light.svg` brings together the same elements with suitable contrast for light surfaces.

### 6.6 Favicon

`favicon.svg` is the reduced version intended for tabs, favorites and other favicon contexts. It does not replace the textual title of the page.

## 7. Palette

| Role | Color | Main use |
| --- | --- | --- |
| Cobalt | `#2563EB` | Monogram `B`, backing line, details and brand signature. |
| Main fund | `#0B0F14` | Dark institutional funds and favicon. |
| Dark Neutral | `#0F172A` | Text on light backgrounds and secondary dark surfaces. |
| Secondary text | `#94A3B8` | Descriptor and supporting information on dark backgrounds. |
| Soft white | `#F8FAFC` | `L`, main text and clear monochrome version. |

This is the palette of identity, not an obligation to replace all functional neutrals in the interface. The portfolio can maintain canvas, surface, border and text variations already defined in the `02` document, as long as cobalt `#2563EB` is the official brand color and the visual relationship remains coherent.

The cobalt direction definitely replaces any previous amber or copper alternative.

## 8. Typography

The main family is **Instrument Sans**.

Guidelines:

- use Instrument Sans in the name, descriptor, titles, body and applications of the identity;
- prioritize weights and hierarchy before introducing another family;
- preserve good reading in Portuguese and English;
- use monospace only in technical metadata, codes, tags or small details when there is real meaning;
- do not use monospace as the dominant identity;
- when an SVG with editable text cannot load Instrument Sans, use compatible fallbacks only as a technical contingency. The final rendered version must be visually checked.

## 9. Supporting graphic element

The system uses a **fluid and controlled cobalt line**.

It represents:

- connection;
- flow;
- evolution;
- product construction;
- integration between systems.

Allowed applications:

- portfolio backgrounds;
- professional covers;
- Open Graph images;
- documentation headers;
- discrete editorial transitions or dividers.

Rules:

- use few lines and ample negative space;
- maintain low intensity and hierarchy lower than content;
- avoid mechanical repetition;
- do not transform the line into a futuristic grid, neon wave or constant animation;
- in movement, use slow and small displacement, with a static alternative in reducing movement;
- do not mix the personal identity's supporting line with movune's own graphic system.

## 10. Application rules

### 10.1 Clear space and scale

- preserve a minimum clear space around the monogram equivalent to the thickness of its line;
- do not reduce to a size where `L` and `B` can no longer be distinguished;
- in interfaces, maintain an appropriate touch target without visually increasing the symbol beyond what is necessary;
- always scale proportionally.

### 10.2 Backgrounds

- on a simple dark background, prefer `lb-monogram-color.svg`;
- on a simple light background, prefer `lb-monogram-cobalt.svg`;
- in photography or complex backgrounds, prefer the white or cobalt version depending on the contrast;
- use the lockup corresponding to the theme when name and professional title needs to accompany the symbol;
- do not apply outlines, improvised backgrounds or effects to compensate for inadequate contrast.

### 10.3 Composition

- use the monogram as a signature point, not as a decorative pattern;
- do not repeat the symbol on all cards, sections or previews;
- do not simultaneously display monogram and name in the portfolio header when Hero already presents the name in a dominant way;
- do not change proportions, junctions, thickness or terminals;
- do not animate parts of the symbol separately.

## 11. Portfolio Applications

### 11.1 Use in the Portfolio

Use the identity in:

- favicon;
- visual link to Home in the header;
- Open Graph images;
- footer;
- discreet visual signature;
- content covers produced for the portfolio itself.

In the header, use only the monogram. The full name remains dominant in Hero. The symbol leads to the beginning of the Home, has an accessible label and should not use excessive glow or animation.

## 12. Accessibility

- purely decorative symbols must use `alt=""` or be hidden from the accessibility tree;
- the monogram used as a link must have `aria-label`, for example `Go to homepage`;
- link hover state must be visible in both light and dark themes;
- contrast must be checked for each version on its real background;
- no information can depend solely on the monogram or color;
- the favicon does not replace the textual title of the page;
- Informative inline SVGs must have an accessible name; SVGs within already named links can be decorative;
- the supporting line must be decorative and not interfere with reading or semantic order.

## 13. Restrictions

Do not use:

- strong glow;
- gradients in the monogram;
- 3D effects;
- decorative shadows;
- hacker or cyberpunk aesthetic;
- Matrix code;
- brackets as main symbol;
- frames, shields or hexagons;
- rotations or deformations;
- colors different from the palette approved in the symbol;
- monogram repeated on all cards or sections;
- permanent symbol animation;
- rasterized versions when SVG can be used;
- movune's identity mixed with personal identity;
- photograph replaced by monogram in personal identification channels.

## 14. Asset inventory

| Archive | Purpose | Publication |
| --- | --- | --- |
| `favicon.svg` | Favicon on dark background. | Public. |
| `lb-monogram-color.svg` | Major version for dark backgrounds. | Public. |
| `lb-monogram-white.svg` | White monochrome version. | Public. |
| `lb-monogram-cobalt.svg` | Cobalt monochrome version. | Public. |
| `lb-lockup-dark.svg` | Horizontal signature for dark background. | Public when necessary. |
| `lb-lockup-light.svg` | Horizontal signature for light background. | Public when necessary. |
| `identity-preview.svg` | Reference vector board. | Internal; do not publish to the interface. |
| `identity-preview.png` | Rasterized preview of the board. | Internal; do not publish to the interface. |

Recommended organization in the project:

```text
public/
└── brand/
    ├── favicon.svg
    ├── lb-monogram-color.svg
    ├── lb-monogram-white.svg
    ├── lb-monogram-cobalt.svg
    ├── lb-lockup-dark.svg
    └── lb-lockup-light.svg
```

`identity-preview` boards must remain with the identity documentation or source files, outside of the assets published by the interface.

## 15. Implementation checklist

- [ ] Copy only the six public assets to `public/brand/` with the approved names.
- [ ] Keep `identity-preview.svg` and `identity-preview.png` out of the public interface.
- [ ] Configure `favicon.svg` without removing the textual title of the pages.
- [ ] Use only the monogram in the header as a link to the Home.
- [ ] Add `aria-label` located to monogram link.
- [ ] Ensure visible focus and adequate touch target in the header.
- [ ] Use the colored version on a dark background and the cobalt version on a light background, validating real contrast.
- [ ] Select light or dark lockup according to the background, only when name and position are required.
- [ ] Apply the monogram discreetly on the footer, without duplicating information.
- [ ] Create a dedicated Open Graph image with name, descriptor, monogram and supporting line, without depending on SVG as a social preview.
- [ ] Keep cobalt `#2563EB` as the official color and remove copper alternatives.
- [ ] Use Instrument Sans as main family.
- [ ] Preserve proportions, strokes, terminals and clear space of ​​the symbol.
- [ ] Do not add glow, gradient, decorative shadow, 3D or excessive animation.
- [ ] Mark the support line as decorative and offer a static version with reduced movement.
- [ ] Check monogram readability in favicon, header and footer sizes.
- [ ] Check dark mode, light mode, desktop, mobile, PT and EN.
- [ ] Confirm that the photograph, full name and descriptor maintain their hierarchy in the relevant channels.
- [ ] Keep personal identity separate from movune's identity.

---

**Closure:** this document registers the professional identity system. Future applications should preserve this hierarchy and refer to documents `02` and `03` for their specific integration into the portfolio.
