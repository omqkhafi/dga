# Menu (web)

Source: Figma web file `trJvYAeN2wdayn2VdSUR2N`, page "Menu". All values below are read from Figma component variants (LTR variants; RTL variants mirror them). Token names are Figma variable names (last segment); see `tokens.css`.

## Usage (plain language)

Each menu item has a trailing elements which either present data or allow user to interact with such as tags, controllers or buttons.

## Component: Menu list item  (72 variants)

| Prop | Values / default |
|---|---|
| Lead Icon | B:true |
| 🔁 Swap Lead icon | I:13758:242480 |
| Show Trail Text | B:true |
| Label EN | T:Item Label |
| Trail Text | T:+99 |
| 🔁 Swap Trail Icon | I:13758:242505 |
| Label AR | T:نص العنصر |
| RTL | False \| True |
| Trail element | None \| Text \| Button \| Tag \| Switch \| Icon |
| State | Default \| Hovered \| Pressed \| Focused \| Disabled \| Selected |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| - | 225x40 H p8/8/8/8 g8 pad-y=button-menu-v-padding pad-x=button-menu-h-padding gap=button-menu-gap r4=radius-sm |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| None/Default | fg:text-default ic:icon-default ts:Text md/Regular |
| Text/Default | fg:text-default ic:icon-default ts:Text md/Regular |
| Icon/Default | fg:text-default ic:icon-default ts:Text md/Regular |
| Button/Default | fg:text-default ic:icon-default ts:Text md/Regular |
| Tag/Default | fg:text-default ic:icon-default ts:Text md/Regular |
| Switch/Default | fg:text-default ic:icon-default ts:Text md/Regular |
| None/Hovered | bg:button-background-neutral-hovered fg:text-default ic:icon-default ts:Text md/Regular |
| Text/Hovered | bg:button-background-neutral-hovered fg:text-default ic:icon-default ts:Text md/Regular |
| Icon/Hovered | bg:button-background-neutral-hovered fg:text-default ic:icon-default ts:Text md/Regular |
| Button/Hovered | bg:button-background-neutral-hovered fg:text-default ic:icon-default ts:Text md/Regular |
| Tag/Hovered | bg:button-background-neutral-hovered fg:text-default ic:icon-default ts:Text md/Regular |
| Switch/Hovered | bg:button-background-neutral-hovered fg:text-default ic:icon-default ts:Text md/Regular |
| None/Pressed | bg:button-background-neutral-pressed fg:text-default ic:icon-default ts:Text md/Regular |
| Text/Pressed | bg:button-background-neutral-pressed fg:text-default ic:icon-default ts:Text md/Regular |
| Icon/Pressed | bg:button-background-neutral-pressed fg:text-default ic:icon-default ts:Text md/Regular |
| Button/Pressed | bg:button-background-neutral-pressed fg:text-default ic:icon-default ts:Text md/Regular |
| Tag/Pressed | bg:button-background-neutral-pressed fg:text-default ic:icon-default ts:Text md/Regular |
| Switch/Pressed | bg:button-background-neutral-pressed fg:text-default ic:icon-default ts:Text md/Regular |
| None/Selected | bg:background-primary-50 fg:text-primary ic:icon-primary ts:Text md/Regular |
| Text/Selected | bg:background-primary-50 fg:text-primary ic:icon-primary ts:Text md/Regular |
| Icon/Selected | bg:background-primary-50 fg:text-primary ic:icon-primary ts:Text md/Regular |
| Button/Selected | bg:background-primary-50 fg:text-primary ic:icon-primary ts:Text md/Regular |
| Tag/Selected | bg:background-primary-50 fg:text-primary ic:icon-primary ts:Text md/Regular |
| Switch/Selected | bg:background-primary-50 fg:text-primary ic:icon-primary ts:Text md/Regular |
| None/Focused | bd:border-black fg:text-default ic:icon-default ts:Text md/Regular |
| Text/Focused | bd:border-black fg:text-default ic:icon-default ts:Text md/Regular |
| Icon/Focused | bd:border-black fg:text-default ic:icon-default ts:Text md/Regular |
| Button/Focused | bd:border-black fg:text-default ic:icon-default ts:Text md/Regular |
| Tag/Focused | bd:border-black fg:text-default ic:icon-default ts:Text md/Regular |
| Switch/Focused | bd:border-black fg:text-default ic:icon-default ts:Text md/Regular |
| None/Disabled | fg:text-default-disabled ic:icon-default-disabled ts:Text md/Regular |
| Text/Disabled | fg:text-default-disabled ic:icon-default-disabled ts:Text md/Regular |
| Icon/Disabled | fg:text-default-disabled ic:icon-default-disabled ts:Text md/Regular |
| Button/Disabled | fg:text-default-disabled ic:icon-default-disabled ts:Text md/Regular |
| Tag/Disabled | fg:text-default-disabled ic:icon-default-disabled ts:Text md/Regular |
| Switch/Disabled | fg:text-default-disabled ic:icon-default-disabled ts:Text md/Regular |

## Component: Menu  (2 variants)

A menu UI element shows a list of options on a temporary surface, triggered by user interactions with buttons or controls. It organizes menu items, often grouped for better structure, to enhance navigation and functionality.

| Prop | Values / default |
|---|---|
| RTL | False \| True |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| - | 241x632 V p0/0/0/0 g0 r8=8 sw1 |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| - | bg:background-menu bd:border-neutral-primary fg:text-display ic:icon-default ts:Text xs/Bold fx:shadow-2xl |

## CSS implementation notes (from design.dga.gov.sa CSS, phase 2)
Where these differ from Figma above, Figma is the source of truth.
CSS block(s): `.menu-item` — extracted verbatim from https://design.dga.gov.sa/ compiled CSS (2026-11-04). Not cross-checked against Figma (community files not readable via connector). rem duplicates (62.5% root) omitted.

### Variants / modifiers (`--`)
—

### Elements / anatomy (`__`)
—

### Heights used
—

### Tokens referenced (count)
`--radius-xs` (5), `--colors-base-black` (2), `--spacing-md` (2), `--colors-gray-neutral-100` (1), `--button-background-neutral-hovered` (1)

### Rules (selector → declarations; covers sizes, states :hover/:focus/:active/:disabled, colors, spacing, radius)

- `.menu-item:hover` → `border-radius: var(--radius-xs); background: var(--colors-gray-neutral-100)`
- `.menu-item:focus` → `border-radius: var(--radius-xs); border: 2px solid var(--colors-base-black)`
- `.menu-item:active` → `border-radius: var(--radius-xs); border: 2px solid var(--colors-base-black)`
- `.menu-item` → `padding: var(--spacing-md); gap: var(--spacing-md); cursor: pointer`
- `.menu-item:hover` → `border-radius: var(--radius-xs); background: var(--button-background-neutral-hovered)`
- `.menu-item:active` → `border-radius: var(--radius-xs); background: var(--button-background-neutral-pressed, #E5E7EB)`
- `.menu-item.disabled` → `opacity: .5`
