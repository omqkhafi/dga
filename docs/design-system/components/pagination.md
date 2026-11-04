# Pagination (web)

Source: Figma web file `trJvYAeN2wdayn2VdSUR2N`, page "Pagination". All values below are read from Figma component variants (LTR variants; RTL variants mirror them). Token names are Figma variable names (last segment); see `tokens.css`.

## Usage (plain language)

Pagination is used to divide large sets of content into multiple pages, allowing users to navigate through them sequentially.

Internal sub-parts (not used directly): `_PaginationItem`

## Component: Pagination  (6 variants)

| Prop | Values / default |
|---|---|
| RTL | False \| True |
| Size | Small \| Meduim \| Large |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| Large | 291x40 H p0/0/0/0 g8 pad-y=spacing-none pad-x=spacing-none gap=pagination-Items-padding |
| Small | 226x24 H p0/0/0/0 g8 pad-y=spacing-none pad-x=spacing-none gap=pagination-Items-padding |
| Meduim | 272x32 H p0/0/0/0 g8 pad-y=spacing-none pad-x=spacing-none gap=pagination-Items-padding |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| - | fg:text-default ic:icon-default ts:Text md/Regular |

## CSS implementation notes (from design.dga.gov.sa CSS, phase 2)
Where these differ from Figma above, Figma is the source of truth.
CSS block(s): `.pagination` — extracted verbatim from https://design.dga.gov.sa/ compiled CSS (2026-11-04). Not cross-checked against Figma (community files not readable via connector). rem duplicates (62.5% root) omitted.

### Variants / modifiers (`--`)
large, meduim, small

### Elements / anatomy (`__`)
item

### Heights used
24px (1), 32px (1), 40px (1)

### Tokens referenced (count)
—

### Rules (selector → declarations; covers sizes, states :hover/:focus/:active/:disabled, colors, spacing, radius)

- `.pagination` → `gap: 8px`
- `.pagination--small .pagination__item button` → `width: 24px; height: 24px`
- `.pagination--meduim .pagination__item button` → `width: 32px; height: 32px`
- `.pagination--large .pagination__item button` → `width: 40px; height: 40px`
