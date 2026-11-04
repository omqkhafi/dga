# Tabs (web)

Source: Figma web file `trJvYAeN2wdayn2VdSUR2N`, page "Tabs". All values below are read from Figma component variants (LTR variants; RTL variants mirror them). Token names are Figma variable names (last segment); see `tokens.css`.

## Usage (plain language)

A vertical tab is a navigation element where tabs are stacked vertically, allowing users to switch between different sections of content.

## Component: Vertical Tab  (60 variants)

| Prop | Values / default |
|---|---|
| Icon | B:true |
| Text AR | T:تبويب |
| Text EN | T:Text |
| 🔁 Swap Icon | I:13758:241572 |
| RTL | True \| False |
| State | Default \| Hovered \| Pressed \| Focused \| Disabled |
| Size | Small \| Medium \| Large |
| Selected | True \| False |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| Medium | 72x32 H p6/12/6/12 g4 pad-y=vertical-tab-md-button-v-padding pad-x=vertical-tab-md-button-h-padding gap=tab-button-gap r4=radius-sm |
| Large | 72x40 H p8/12/8/12 g4 pad-y=horizontal-tab-sm-button-v-padding pad-x=vertical-tab-md-button-h-padding gap=tab-button-gap r4=radius-sm |
| Small | 60x24 H p2/6/2/6 g4 pad-y=vertical-tab-sm-button-v-padding pad-x=vertical-tab-sm-button-h-padding gap=tab-button-gap r4=radius-sm |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| Default/True | fg:text-default ic:icon-default ts:Text sm/Semibold |
| Default/False | fg:text-primary-paragraph ic:unselected-tab-icon ts:Text sm/Regular |
| Disabled/True | fg:text-default-disabled ic:icon-default-disabled ts:Text sm/Medium |
| Disabled/False | fg:text-default-disabled ic:icon-default-disabled ts:Text sm/Regular |
| Focused/True | bd:border-black fg:text-default ic:icon-default ts:Text sm/Semibold |
| Focused/False | bd:border-black fg:text-default ic:icon-default ts:Text sm/Regular |
| Hovered/True | fg:text-default ic:icon-default ts:Text sm/Semibold |
| Hovered/False | bg:button-background-neutral-hovered fg:text-default ic:icon-default ts:Text sm/Regular |
| Pressed/False | bg:button-background-neutral-pressed fg:text-default ic:icon-default ts:Text sm/Regular |
| Pressed/True | fg:text-default ic:icon-default ts:Text sm/Semibold |

## Component: Vertical Tab List  (12 variants)

A tab list is a set of tabs that allows for easy navigation between related information categories, removing the need to switch between different pages.

| Prop | Values / default |
|---|---|
| RTL | True \| False |
| Size | Small \| Medium \| Large |
| Tab Icons | False \| True |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| Medium | 150x160 V p0/0/0/0 g0 |
| Large | 150x200 V p0/0/0/0 g0 |
| Small | 150x120 V p0/0/0/0 g0 |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| True | fg:text-default ic:icon-default ts:Text sm/Semibold |
| False | fg:text-default ts:Text sm/Semibold |

## Component: Horizontal Tab  (64 variants)

A Horizontal Tab is an individual tab within a horizontal tab list, allowing users to switch between different content sections seamlessly.

| Prop | Values / default |
|---|---|
| Icon | B:true |
| Text AR | T:تبويب |
| Text EN | T:Text |
| 🔁 Swap Icon | I:13758:241572 |
| RTL | True \| False |
| State | Default \| Hovered \| Pressed \| Focused \| Disabled \| Closed \| Open |
| Size | Small \| Medium \| Large |
| Selected | False \| True |
| More Tab | Yes \| No |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| Medium | 81x44 H p12/16/12/16 g4 pad-y=horizontal-tab-md-button-v-padding pad-x=horizontal-tab-md-button-h-padding gap=tab-button-gap r4=radius-sm |
| Large | 81x52 H p16/16/16/16 g4 pad-y=horizontal-tab-md-button-h-padding pad-x=horizontal-tab-md-button-h-padding gap=tab-button-gap r4=radius-sm |
| Small | 73x36 H p8/12/8/12 g4 pad-y=horizontal-tab-sm-button-v-padding pad-x=horizontal-tab-sm-button-h-padding gap=tab-button-gap r4=radius-sm |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| Default/True/No | fg:text-default ic:icon-default ts:Text sm/Bold |
| Default/False/No | fg:text-primary-paragraph ic:icon-default ts:Text sm/Medium |
| Disabled/True/No | fg:text-default-disabled ic:icon-default-disabled ts:Text sm/Bold |
| Disabled/False/No | fg:text-default-disabled ic:icon-default-disabled ts:Text sm/Medium |
| Focused/True/No | bd:border-black fg:text-default ic:icon-default ts:Text sm/Bold |
| Focused/False/No | bd:border-black fg:text-default ic:icon-default ts:Text sm/Medium |
| Hovered/True/No | fg:text-default ic:icon-default ts:Text sm/Bold |
| Hovered/False/No | bg:button-background-neutral-hovered fg:text-default ic:icon-default ts:Text sm/Medium |
| Pressed/False/No | bg:button-background-neutral-pressed fg:text-default ic:icon-default ts:Text sm/Medium |
| Pressed/True/No | fg:text-default ic:icon-default ts:Text sm/Bold |
| Closed/False/Yes | ic:icon-default |
| Open/True/Yes | ic:icon-default |

## Component: Horizontal Tab List  (10 variants)

A tab list is a set of tabs that allows for easy navigation between related information categories, removing the need to switch between different pages.

| Prop | Values / default |
|---|---|
| Divider | B:true |
| RTL | True \| False |
| Size | Small \| Medium \| Large |
| Tab Icons | True \| False |
| Flush | True \| False |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| Medium | 634x44 H p0/0/0/0 g0 |
| Large | 650x52 H p0/0/0/0 g0 |
| Small | 634x44 H p0/0/0/0 g0 |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| True/False | fg:text-default ic:icon-default ts:Text sm/Bold |
| True/True | fg:text-default ic:icon-default ts:Text sm/Bold |
| False/False | fg:text-default ic:icon-default ts:Text sm/Bold |
| False/True | fg:text-default ic:icon-default ts:Text sm/Bold |

## CSS implementation notes (from design.dga.gov.sa CSS, phase 2)
Where these differ from Figma above, Figma is the source of truth.
CSS block(s): `.tabs-list` — extracted verbatim from https://design.dga.gov.sa/ compiled CSS (2026-11-04). Not cross-checked against Figma (community files not readable via connector). rem duplicates (62.5% root) omitted.

### Variants / modifiers (`--`)
divider, horizontal, vertical

### Elements / anatomy (`__`)
item, item--active, item--md, item--sm

### Heights used
5px (2), 3px (2)

### Tokens referenced (count)
`--radius-full` (2), `--colors-gray-neutral-300` (2), `--spacing-sm` (2), `--spacing-md` (1), `--spacing-lg` (1), `--spacing-xxs` (1)

### Rules (selector → declarations; covers sizes, states :hover/:focus/:active/:disabled, colors, spacing, radius)

- `.tabs-list--horizontal` → `gap: 3px; width: 100%`
- `.tabs-list--horizontal::-webkit-scrollbar` → `height: 5px`
- `.tabs-list--horizontal::-webkit-scrollbar-track` → `background-color: transparent; padding: 1px`
- `.tabs-list--horizontal::-webkit-scrollbar-thumb` → `height: 5px; border-radius: 10px; border: 1px solid transparent; background-color: #ccc; background-clip: content-box`
- `.tabs-list--horizontal.tabs-list--divider:after` → `height: 3px; width: 100%; border-radius: var(--radius-full); background-color: var(--colors-gray-neutral-300)`
- `.tabs-list--vertical li` → `width: 100%`
- `.tabs-list` → `padding: 0; margin: 0`
- `.tabs-list--horizontal` → `gap: 3px`
- `.tabs-list--horizontal.divider:after` → `height: 3px; width: 100%; border-radius: var(--radius-full); background-color: var(--colors-gray-neutral-300)`
- `.tabs-list--vertical` → `gap: 3px`
- `.tabs-list--vertical .tabs-list__item:hover:after,.tabs-list--vertical .tabs-list__item:active:after,.tabs-list--vertical .tabs-list__item--active:after` → `height: calc(100% - var(--spacing-md) * 2); min-height: 16px; width: 3px`
- `.tabs-list--vertical .tabs-list__item--md` → `padding: var(--spacing-sm) var(--spacing-lg)`
- `.tabs-list--vertical .tabs-list__item--sm` → `padding: var(--spacing-xxs) var(--spacing-sm)`
