# Rating (web)

Source: Figma web file `trJvYAeN2wdayn2VdSUR2N`, page "Rating". All values below are read from Figma component variants (LTR variants; RTL variants mirror them). Token names are Figma variable names (last segment); see `tokens.css`.

## Usage (plain language)

Rating is a method used to express user satisfaction or opinion. It involves selecting symbols like stars, and is used in product reviews, and feedback forms, helping users make decisions and provide feedback.

Internal sub-parts (not used directly): `_RatingStar`

## Component: Rating  (6 variants)

| Prop | Values / default |
|---|---|
| Size | Large \| Meduim \| Small |
| Brand | yes \| No |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| Large | 256x48 H p0/0/0/0 g4 gap=spacing-xs |
| Meduim | 176x32 H p0/0/0/0 g4 gap=spacing-xs |
| Small | 136x24 H p0/0/0/0 g4 gap=spacing-xs |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| No | ic:background-secondary |
| yes | ic:background-primary |

## CSS implementation notes (from design.dga.gov.sa CSS, phase 2)
Where these differ from Figma above, Figma is the source of truth.
CSS block(s): `.rating` — extracted verbatim from https://design.dga.gov.sa/ compiled CSS (2026-11-04). Not cross-checked against Figma (community files not readable via connector). rem duplicates (62.5% root) omitted.

### Variants / modifiers (`--`)
large, medium, small

### Elements / anatomy (`__`)
—

### Heights used
—

### Tokens referenced (count)
—

### Rules (selector → declarations; covers sizes, states :hover/:focus/:active/:disabled, colors, spacing, radius)

- `.rating` → `color: #faaf00; cursor: pointer; width: -moz-min-content; width: min-content`
- `.rating--small` → `font-size: 24px`
- `.rating--medium` → `font-size: 32px`
- `.rating--large` → `font-size: 48px`
