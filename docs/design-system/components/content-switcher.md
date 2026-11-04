# Content Switcher (web)

Source: Figma web file `trJvYAeN2wdayn2VdSUR2N`, page "Content Switcher". All values below are read from Figma component variants (LTR variants; RTL variants mirror them). Token names are Figma variable names (last segment); see `tokens.css`.

## Usage (plain language)

Content switchers in the platforms code allow users to navigate between related views efficiently. They display one section at a time, ensuring a focused and user-friendly experience.

Internal sub-parts (not used directly): `_Content Switcher Item`

## Component: Content Switcher  (12 variants)

| Prop | Values / default |
|---|---|
| 3rd Item | B:true |
| 2nd item | B:true |
| RTL | False \| True |
| OnColor | False \| True |
| Size | Small \| Medium \| Large |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| Small | 304x32 H p0/0/0/0 g0 pad-y=spacing-none pad-x=spacing-none gap=spacing-none |
| Medium | 304x40 H p0/0/0/0 g0 |
| Large | 304x48 H p0/0/0/0 g0 |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| False | fg:text-oncolor-primary ts:Text md/Regular |
| True | fg:text-oncolor-primary ts:Text md/Regular |

## CSS implementation notes (from design.dga.gov.sa CSS, phase 2)
Where these differ from Figma above, Figma is the source of truth.
CSS block(s): `.content-switcher` — extracted verbatim from https://design.dga.gov.sa/ compiled CSS (2026-11-04). Not cross-checked against Figma (community files not readable via connector). rem duplicates (62.5% root) omitted.

### Variants / modifiers (`--`)
—

### Elements / anatomy (`__`)
—

### Heights used
—

### Tokens referenced (count)
—

### Rules (selector → declarations; covers sizes, states :hover/:focus/:active/:disabled, colors, spacing, radius)

- `.content-switcher` → `margin: 10px`
