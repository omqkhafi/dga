# Loading (web)

Source: Figma web file `trJvYAeN2wdayn2VdSUR2N`, page "Loading". All values below are read from Figma component variants (LTR variants; RTL variants mirror them). Token names are Figma variable names (last segment); see `tokens.css`.

## Usage (plain language)

The loading component indicates that a process is ongoing and that the user should wait for it to complete.

## Component: Loading  (84 variants)

| Prop | Values / default |
|---|---|
| Size | xx Small \| x Small \| Small \| Medium \| Large \| x Large \| xx Large |
| Style | Primary \| Neutral \| On-Color |
| Indicator | 1 \| 2 \| 3 \| 4 |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| xx Small | 20x20  |
| x Small | 24x24  |
| Small | 28x28  |
| Medium | 32x32 r1000 |
| Large | 36x36  |
| x Large | 40x40  |
| xx Large | 44x44  |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| Neutral/2 |  |
| Primary/2 |  |
| On-Color/2 |  |
| Neutral/3 |  |
| Primary/3 |  |
| On-Color/3 |  |
| Neutral/4 |  |
| Primary/4 |  |
| On-Color/4 |  |
| Neutral/1 |  |
| Primary/1 |  |
| On-Color/1 |  |

## CSS implementation notes (from design.dga.gov.sa CSS, phase 2)
Where these differ from Figma above, Figma is the source of truth.
CSS block(s): `.spinner` — extracted verbatim from https://design.dga.gov.sa/ compiled CSS (2026-11-04). Not cross-checked against Figma (community files not readable via connector). rem duplicates (62.5% root) omitted.

### Variants / modifiers (`--`)
brand, huge, lg, md, neutral, on-color, sm, tiny, xl, xs

### Elements / anatomy (`__`)
circle

### Heights used
20px (1), 24px (1), 28px (1), 32px (1), 36px (1), 40px (1), 44px (1)

### Tokens referenced (count)
`--colors-gray-neutral-200` (2), `--colors-gray-neutral-800` (2), `--colors-brand-600` (2), `--colors-base-white` (2), `--colors-alpha-white` (1)

### Rules (selector → declarations; covers sizes, states :hover/:focus/:active/:disabled, colors, spacing, radius)

- `.spinner--tiny` → `width: 20px; height: 20px`
- `.spinner--xs` → `width: 24px; height: 24px`
- `.spinner--sm` → `width: 28px; height: 28px`
- `.spinner--md` → `width: 32px; height: 32px`
- `.spinner--lg` → `width: 36px; height: 36px`
- `.spinner--xl` → `width: 40px; height: 40px`
- `.spinner--huge` → `width: 44px; height: 44px`
- `.spinner--neutral .spinner__circle` → `border-color: var(--colors-gray-neutral-200); border-top-color: var(--colors-gray-neutral-800)`
- `.spinner--neutral .spinner__circle:after,.spinner--neutral .spinner__circle:before` → `background-color: var(--colors-gray-neutral-800)`
- `.spinner--brand .spinner__circle` → `border-color: var(--colors-gray-neutral-200); border-top-color: var(--colors-brand-600)`
- `.spinner--brand .spinner__circle:after,.spinner--brand .spinner__circle:before` → `background-color: var(--colors-brand-600)`
- `.spinner--on-color .spinner__circle` → `border-color: hsla(var(--colors-alpha-white)/30%); border-top-color: var(--colors-base-white)`
- `.spinner--on-color .spinner__circle:after,.spinner--on-color .spinner__circle:before` → `background-color: var(--colors-base-white)`
