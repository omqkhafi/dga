# List (web)

Source: Figma web file `trJvYAeN2wdayn2VdSUR2N`, page "List". All values below are read from Figma component variants (LTR variants; RTL variants mirror them). Token names are Figma variable names (last segment); see `tokens.css`.

## Usage (plain language)

Lists are used to organize a set of items into a single, cohesive unit, typically displayed as a series of options or links. List items begin with either a number or a bullet.

## Component: List  (18 variants)

| Prop | Values / default |
|---|---|
| RTL | yes \| no |
| Style | Primary \| Neutral \| On-color |
| Type | Ordered List \| Unordered \| With Icon |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| Ordered List | 110x96 V p0/0/0/0 g0 pad-y=spacing-none pad-x=spacing-none gap=spacing-none |
| Unordered | 101x96 V p0/0/0/0 g0 pad-y=spacing-none pad-x=spacing-none gap=spacing-none |
| With Icon | 110x96 V p0/0/0/0 g0 pad-y=spacing-none pad-x=spacing-none gap=spacing-none |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| Primary/Ordered List | fg:text-primary ts:Text md/Regular |
| Primary/Unordered | fg:text-primary ts:Text md/Regular |
| Primary/With Icon | fg:text-primary ic:icon-primary ts:Text md/Regular |
| Neutral/Ordered List | fg:text-default ts:Text md/Regular |
| Neutral/Unordered | fg:text-default ts:Text md/Regular |
| Neutral/With Icon | fg:text-default ic:icon-default ts:Text md/Regular |
| On-color/Ordered List | fg:text-oncolor-primary ts:Text md/Regular |
| On-color/Unordered | fg:text-oncolor-primary ts:Text md/Regular |
| On-color/With Icon | fg:text-oncolor-primary ic:icon-oncolor ts:Text md/Regular |

## Component: List item  (36 variants)

Ordered List: Used when item sequence matters, ensuring a specific viewing or processing order.
Unordered List: Used for items without a required order or hierarchy.
List with Icons: Like an unordered list but with icons instead of bullets for visual emphasis.

| Prop | Values / default |
|---|---|
| Item text - EN | T:List item |
| Item Number | T:1- |
| Item Letter - EN | T:a- |
| Item Letter - AR | T:أ- |
| Item text - AR | T:عنصر قائمة |
| Icon | I:13758:241927 |
| RTL | no \| yes |
| Type | Ordered \| Unordered \| With Icon |
| Level | One \| Two |
| Style | Primary \| Neutral \| On-Color |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| Ordered | 86x24 H p0/0/0/0 g8 pad-y=spacing-none pad-x=spacing-none gap=spacing-md |
| With Icon | 86x24 H p0/0/0/0 g8 pad-y=spacing-none pad-x=spacing-none gap=spacing-md |
| Unordered | 77x24 H p0/0/0/0 g8 pad-y=spacing-none pad-x=spacing-none gap=spacing-md |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| Ordered/One/Primary | fg:text-primary ts:Text md/Regular |
| Ordered/One/Neutral | fg:text-default ts:Text md/Regular |
| Ordered/One/On-Color | fg:text-oncolor-primary ts:Text md/Regular |
| With Icon/One/Primary | fg:text-primary ic:icon-primary ts:Text md/Regular |
| With Icon/One/Neutral | fg:text-default ic:icon-default ts:Text md/Regular |
| With Icon/One/On-Color | fg:text-oncolor-primary ic:icon-oncolor ts:Text md/Regular |
| Unordered/One/Primary | fg:text-primary ts:Text md/Regular |
| Unordered/One/Neutral | fg:text-default ts:Text md/Regular |
| Unordered/One/On-Color | fg:text-oncolor-primary ts:Text md/Regular |
| Ordered/Two/Primary | fg:text-primary ts:Text md/Regular |
| Ordered/Two/Neutral | fg:text-default ts:Text md/Regular |
| Ordered/Two/On-Color | fg:text-oncolor-primary ts:Text md/Regular |
| With Icon/Two/Primary | fg:text-primary ic:icon-primary ts:Text md/Regular |
| With Icon/Two/Neutral | fg:text-default ic:icon-default ts:Text md/Regular |
| With Icon/Two/On-Color | fg:text-oncolor-primary ic:icon-oncolor ts:Text md/Regular |
| Unordered/Two/Primary | fg:text-primary ts:Text md/Regular |
| Unordered/Two/Neutral | fg:text-default ts:Text md/Regular |
| Unordered/Two/On-Color | fg:text-oncolor-primary ts:Text md/Regular |

## CSS implementation notes (from design.dga.gov.sa CSS, phase 2)
Where these differ from Figma above, Figma is the source of truth.
CSS block(s): `.list` — extracted verbatim from https://design.dga.gov.sa/ compiled CSS (2026-11-04). Not cross-checked against Figma (community files not readable via connector). rem duplicates (62.5% root) omitted.

### Variants / modifiers (`--`)
brand, neutral, on-color, ordered, primary, unordered, with-icon

### Elements / anatomy (`__`)
item, item-icon

### Heights used
4px (2), 16px (2), 24px (1)

### Tokens referenced (count)
—

### Rules (selector → declarations; covers sizes, states :hover/:focus/:active/:disabled, colors, spacing, radius)

- `.list--brand .list__item` → `color: #1b8354`
- `.list--brand>ul .list__item:before` → `background-color: #1b8354`
- `.list--neutral .list__item` → `color: #0d121c`
- `.list--neutral>ul .list__item:before` → `background-color: #0d121c`
- `.list--on-color .list__item` → `color: var(--Link-2-link-default_on-color, #fff)`
- `.list--on-color>ul .list__item:before` → `background-color: #fff`
- `.list--unordered .list__item` → `gap: 8px`
- `.list--unordered>ul .list__item` → `gap: 8px`
- `.list--unordered>ul .list__item:before` → `width: 4px; height: 4px; border-radius: 50%`
- `.list--with-icon .list__item` → `gap: 8px`
- `.list--with-icon .list__item-icon` → `width: 16px; height: 16px`
- `.text-md-regular,.dga-label--lg,.list-title,.list-item,.content-switcher__item--sm,div.table-wrapper .azm-table tbody td,.menu-item__trail-element,.menu-item__label,.date-cell__label,.input--lg .input__prefix-label,.inpu…` → `font: 400 16px/24px IBMPlexSansArabic`
- `.list` → `margin-left: 24px`
- `.list-title,.list-item` → `height: 24px`
- `.list--primary .list-title,.list--primary .list-item` → `color: #1b8354`
- `.list--primary>ul .list-item:before` → `background-color: #1b8354`
- `.list--neutral .list-title,.list--neutral .list-item` → `color: #0d121c`
- `.list--neutral>ul .list-item:before` → `background-color: #0d121c`
- `.list--on-color .list-title,.list--on-color .list-item` → `color: var(--link-default_on-color, #fff)`
- `.list--on-color>ul .list-item:before` → `background-color: #fff`
- `.list--ordered>ol` → `margin-left: 24px`
- `.list--unordered .list-item` → `gap: 8px`
- `.list--unordered>ul` → `margin-left: 18px`
- `.list--unordered>ul .list-item` → `gap: 8px`
- `.list--unordered>ul .list-item:before` → `width: 4px; height: 4px; border-radius: 50%`
- `.list--with-icon .list-item` → `gap: 8px`
- `.list--with-icon .list-item-icon` → `width: 16px; height: 16px`
- `.list--with-icon>ul` → `margin-left: 24px`
- `.text-md-regular,.input__field,.input__field::placeholder,.input__prefix-label,.input__prefix-icon,.input__prefix-chevron,.input__suffix-label,.input__suffix-icon,.input__suffix-chevron,.input--lg .input__prefix-label,.i…` → `font: 400 16px/24px IBMPlexSansArabic`
