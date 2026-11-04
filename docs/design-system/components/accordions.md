# Accordions (web)

Source: Figma web file `trJvYAeN2wdayn2VdSUR2N`, page "Accordions". All values below are read from Figma component variants (LTR variants; RTL variants mirror them). Token names are Figma variable names (last segment); see `tokens.css`.

## Usage (plain language)

The accordion is used to collapse and expand content to organize it more efficiently. It allows for hiding and displaying content as needed. It reduces clutter and helps maintain the user’s focus by showing only the relevant content at a time.

## Component: Accordion  (240 variants)

| Prop | Values / default |
|---|---|
| Title EN | T:Accordion Title |
| Title AR | T:عنوان الأكورديون |
| RTL | False \| True |
| Size | Large \| Medium \| Small |
| Icon alignment | Leading \| Trailing |
| State | Default \| Hovered \| Pressed \| Focused \| Disabled |
| Expanded | False \| True |
| Flush | False \| True |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| Large | 366x56 V p0/0/0/0 g0 swmixed |
| Medium | 366x48 V p0/0/0/0 g0 swmixed |
| Small | 366x40 V p0/0/0/0 g0 swmixed |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| Trailing/Default/False/False | bd:border-neutral-primary fg:text-default ic:icon-default ts:Text md/Semibold |
| Trailing/Hovered/False/False | bd:border-neutral-primary fg:text-default ic:icon-default ts:Text md/Semibold |
| Trailing/Pressed/False/False | bd:border-neutral-primary fg:text-default ic:icon-default ts:Text md/Semibold |
| Trailing/Focused/False/False | bd:border-neutral-primary fg:text-default ic:icon-default ts:Text md/Semibold |
| Trailing/Disabled/False/False | bd:border-neutral-primary fg:text-default-disabled ic:icon-default-disabled ts:Text md/Semibold |
| Trailing/Default/True/False | bd:border-neutral-primary fg:text-default ic:icon-default ts:Text md/Semibold |
| Trailing/Hovered/True/False | bd:border-neutral-primary fg:text-default ic:icon-default ts:Text md/Semibold |
| Trailing/Pressed/True/False | bd:border-neutral-primary fg:text-default ic:icon-default ts:Text md/Semibold |
| Trailing/Focused/True/False | bd:border-neutral-primary fg:text-default ic:icon-default ts:Text md/Semibold |
| Trailing/Disabled/True/False | bd:border-neutral-primary fg:text-default-disabled ic:icon-default-disabled ts:Text md/Semibold |
| Trailing/Default/False/True | bd:border-neutral-primary fg:text-default ic:icon-default ts:Text md/Semibold |
| Trailing/Hovered/False/True | bd:border-neutral-primary fg:text-default ic:icon-default ts:Text md/Semibold |
| Trailing/Pressed/False/True | bd:border-neutral-primary fg:text-default ic:icon-default ts:Text md/Semibold |
| Trailing/Focused/False/True | bd:border-neutral-primary fg:text-default ic:icon-default ts:Text md/Semibold |
| Trailing/Disabled/False/True | bd:border-neutral-primary fg:text-default-disabled ic:icon-default-disabled ts:Text md/Semibold |
| Trailing/Default/True/True | bd:border-neutral-primary fg:text-default ic:icon-default ts:Text md/Semibold |
| Trailing/Hovered/True/True | bd:border-neutral-primary fg:text-default ic:icon-default ts:Text md/Semibold |
| Trailing/Pressed/True/True | bd:border-neutral-primary fg:text-default ic:icon-default ts:Text md/Semibold |
| Trailing/Focused/True/True | bd:border-neutral-primary fg:text-default ic:icon-default ts:Text md/Semibold |
| Trailing/Disabled/True/True | bd:border-neutral-primary fg:text-default-disabled ic:icon-default-disabled ts:Text md/Semibold |
| Leading/Default/False/False | bd:border-neutral-primary fg:text-default ic:icon-default ts:Text md/Semibold |
| Leading/Hovered/False/False | bd:border-neutral-primary fg:text-default ic:icon-default ts:Text md/Semibold |
| Leading/Pressed/False/False | bd:border-neutral-primary fg:text-default ic:icon-default ts:Text md/Semibold |
| Leading/Focused/False/False | bd:border-neutral-primary fg:text-default ic:icon-default ts:Text md/Semibold |
| Leading/Disabled/False/False | bd:border-neutral-primary fg:text-default-disabled ic:icon-default-disabled ts:Text md/Semibold |
| Leading/Default/True/False | bd:border-neutral-primary fg:text-default ic:icon-default ts:Text md/Semibold |
| Leading/Hovered/True/False | bd:border-neutral-primary fg:text-default ic:icon-default ts:Text md/Semibold |
| Leading/Pressed/True/False | bd:border-neutral-primary fg:text-default ic:icon-default ts:Text md/Semibold |
| Leading/Focused/True/False | bd:border-neutral-primary fg:text-default ic:icon-default ts:Text md/Semibold |
| Leading/Disabled/True/False | bd:border-neutral-primary fg:text-default-disabled ic:icon-default-disabled ts:Text md/Semibold |
| Leading/Default/False/True | bd:border-neutral-primary fg:text-default ic:icon-default ts:Text md/Semibold |
| Leading/Hovered/False/True | bd:border-neutral-primary fg:text-default ic:icon-default ts:Text md/Semibold |
| Leading/Pressed/False/True | bd:border-neutral-primary fg:text-default ic:icon-default ts:Text md/Semibold |
| Leading/Focused/False/True | bd:border-neutral-primary fg:text-default ic:icon-default ts:Text md/Semibold |
| Leading/Disabled/False/True | bd:border-neutral-primary fg:text-default-disabled ic:icon-default-disabled ts:Text md/Semibold |
| Leading/Default/True/True | bd:border-neutral-primary fg:text-default ic:icon-default ts:Text md/Semibold |
| Leading/Hovered/True/True | bd:border-neutral-primary fg:text-default ic:icon-default ts:Text md/Semibold |
| Leading/Pressed/True/True | bd:border-neutral-primary fg:text-default ic:icon-default ts:Text md/Semibold |
| Leading/Focused/True/True | bd:border-neutral-primary fg:text-default ic:icon-default ts:Text md/Semibold |
| Leading/Disabled/True/True | bd:border-neutral-primary fg:text-default-disabled ic:icon-default-disabled ts:Text md/Semibold |

## Component: Accordion list  (2 variants)

| Prop | Values / default |
|---|---|
| RTL | False \| True |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| - | 378x280 V p0/0/0/0 g0 swmixed |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| - | bd:border-neutral-primary fg:text-default ic:icon-default ts:Text md/Semibold |

## CSS implementation notes (from design.dga.gov.sa CSS, phase 2)
Where these differ from Figma above, Figma is the source of truth.
CSS block(s): `.accordion-item` — extracted verbatim from https://design.dga.gov.sa/ compiled CSS (2026-11-04). Not cross-checked against Figma (community files not readable via connector). rem duplicates (62.5% root) omitted.

### Variants / modifiers (`--`)
flush, icon-leading, lg, md, sm

### Elements / anatomy (`__`)
arrow, body, header, title

### Heights used
—

### Tokens referenced (count)
`--spacing-6xl` (11), `--spacing-xl` (8), `--spacing-md` (7), `--spacing-none` (6), `--spacing-3xl` (6), `--colors-border-primary` (4), `--colors-gray-neutral-300` (2), `--colors-base-black` (1), `--spacing-lg` (1)

### Rules (selector → declarations; covers sizes, states :hover/:focus/:active/:disabled, colors, spacing, radius)

- `.accordion-item` → `border-top: 1px solid var(--colors-border-primary); width: 100%`
- `.accordion-item--flush` → `width: 100%; border-image: linear-gradient(to right,transparent 0 16px,var(--colors-border-primary) 16px 382px,transparent 382px 100%) 100% 1`
- `:is(html[lang=ar],html[dir=rtl]) .accordion-item .accordion-item__body` → `padding: 0 var(--spacing-xl) 0 var(--spacing-6xl)`
- `:is(html[lang=ar],html[dir=rtl]) .accordion-item--icon-leading .accordion-item__body` → `padding: 0 var(--spacing-6xl) 0 var(--spacing-none)`
- `:is(html[lang=ar],html[dir=rtl]) .accordion-item.active .accordion-item__body` → `padding: var(--spacing-md) var(--spacing-xl) var(--spacing-3xl) var(--spacing-6xl)`
- `:is(html[lang=ar],html[dir=rtl]) .accordion-item--icon-leading.active .accordion-item__body` → `padding: var(--spacing-md) var(--spacing-6xl) var(--spacing-3xl) var(--spacing-none)`
- `.accordion-item` → `border-top: 1px solid var(--colors-border-primary)`
- `.accordion-item.active .accordion-item__body` → `padding: var(--spacing-md) var(--spacing-6xl) var(--spacing-3xl) var(--spacing-xl); opacity: 1`
- `.accordion-item.focused .accordion-item__header,.accordion-item__header:focus` → `background-color: transparent; outline: 2px solid var(--colors-base-black)`
- `.accordion-item.disabled .accordion-item__header:active,.accordion-item.disabled .accordion-item__header:focus,.accordion-item.disabled .accordion-item__header:hover` → `background-color: transparent; outline: none`
- `.accordion-item.disabled .accordion-item__title,.accordion-item.disabled .accordion-item__arrow,.accordion-item.disabled .accordion-item__arrow path,.accordion-item.disabled .accordion-item__body` → `color: var(--colors-gray-neutral-300)!important; stroke: var(--colors-gray-neutral-300)!important`
- `.accordion-item--lg .accordion-item__header` → `padding: var(--spacing-xl)`
- `.accordion-item--md .accordion-item__header` → `padding: var(--spacing-lg) var(--spacing-xl)`
- `.accordion-item--sm .accordion-item__header` → `padding: var(--spacing-md) var(--spacing-xl)`
- `.accordion-item--flush` → `width: 398px; border-image: linear-gradient(to right,transparent 0 16px,var(--colors-border-primary) 16px 382px,transparent 382px 100%) 100% 1`
- `.accordion-item--icon-leading .accordion-item__body` → `padding: 0 var(--spacing-none) 0 var(--spacing-6xl)`
- `.accordion-item--icon-leading.active .accordion-item__body` → `padding: var(--spacing-md) var(--spacing-none) var(--spacing-3xl) var(--spacing-6xl)`
- `[dir=rtl] .accordion-item .accordion-item__body` → `padding: 0 var(--spacing-xl) 0 var(--spacing-6xl)`
- `[dir=rtl] .accordion-item--icon-leading .accordion-item__body` → `padding: 0 var(--spacing-6xl) 0 var(--spacing-none)`
- `[dir=rtl] .accordion-item.active .accordion-item__body` → `padding: var(--spacing-md) var(--spacing-xl) var(--spacing-3xl) var(--spacing-6xl)`
- `[dir=rtl] .accordion-item--icon-leading.active .accordion-item__body` → `padding: var(--spacing-md) var(--spacing-6xl) var(--spacing-3xl) var(--spacing-none)`
