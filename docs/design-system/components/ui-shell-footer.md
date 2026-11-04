# UI Shell - Footer (web)

Source: Figma web file `trJvYAeN2wdayn2VdSUR2N`, page "UI Shell - Footer". All values below are read from Figma component variants (LTR variants; RTL variants mirror them). Token names are Figma variable names (last segment); see `tokens.css`.

## Usage (plain language)

A footer is serve several functions, including providing navigation, housing links to important information, offering contact information, and sometimes integrating social media icons and subscription forms.

## Component: Footer  (8 variants)

| Prop | Values / default |
|---|---|
| Nav links | B:true |
| RTL | True \| False |
| Background Color | Default \| Dark green |
| Breakpoint | <600 \| 600+ |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| - | 1327x484 H p0/32/0/32 g0 pad-x=spacing-4xl |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| Default/600+ | bg:background-neutral-100 fg:text-default ic:icon-default ts:Text md/Medium |
| Dark green/600+ | bg:background-SA-Flag fg:text-oncolor-primary ic:icon-oncolor ts:Text md/Medium |
| Default/<600 | bg:background-neutral-100 fg:text-default ic:icon-default ts:Text md/Semibold |
| Dark green/<600 | bg:background-SA-Flag fg:text-oncolor-primary ic:icon-oncolor ts:Text md/Semibold |

## CSS implementation notes (from design.dga.gov.sa CSS, phase 2)
Where these differ from Figma above, Figma is the source of truth.
CSS block(s): `.footer` — extracted verbatim from https://design.dga.gov.sa/ compiled CSS (2026-11-04). Not cross-checked against Figma (community files not readable via connector). rem duplicates (62.5% root) omitted.

### Variants / modifiers (`--`)
bg-brand, bg-default

### Elements / anatomy (`__`)
copyright, nav-links-column-title

### Heights used
—

### Tokens referenced (count)
`--colors-gray-neutral-100` (2), `--colors-text-primary_on-brand` (2), `--spacing-none` (1), `--spacing-4xl` (1), `--width-2xl` (1), `--spacing-7xl` (1), `--colors-brand-900` (1), `--colors-alpha-white` (1)

### Rules (selector → declarations; covers sizes, states :hover/:focus/:active/:disabled, colors, spacing, radius)

- `.footer` → `padding: var(--spacing-none) var(--spacing-4xl); background-color: var(--colors-gray-neutral-100)`
- `.footer-icon-section` → `width: 100%`
- `.footer-icon-section a` → `font-size: 20px; font-weight: 400; line-height: 30px`
- `.footer-title-description` → `max-width: var(--width-2xl); margin-block: var(--spacing-7xl)`
- `.footer-title-description h3` → `font-size: 72px; font-weight: 700; line-height: 90px`
- `.footer-title-description p` → `font-size: 24px; font-weight: 400; line-height: 32px`
- `.footer-content` → `padding: var(--spacing-3xl, 24px) var(--spacing-none, 0px)`
- `.footer-content` → `max-width: 1280px; padding: var(--spacing-3xl, 24px) var(--spacing-none, 0px)`
- `.footer--bg-default` → `background-color: var(--colors-gray-neutral-100)`
- `.footer--bg-brand` → `background-color: var(--colors-brand-900)`
- `.footer--bg-brand .footer__nav-links-column-title` → `color: var(--colors-text-primary_on-brand); border-color: hsla(var(--colors-alpha-white)/30%)`
- `.footer--bg-brand .footer__copyright` → `color: var(--colors-text-primary_on-brand)`
