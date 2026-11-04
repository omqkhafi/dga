# Carousel (web)

Source: Figma web file `trJvYAeN2wdayn2VdSUR2N`, page "Carousel". All values below are read from Figma component variants (LTR variants; RTL variants mirror them). Token names are Figma variable names (last segment); see `tokens.css`.

## Usage (plain language)

A Carousel allows users to browse through a collection of content (like images, text, or other types of media) by sliding or scrolling between items.

## Component: Carousel  (3 variants)

| Prop | Values / default |
|---|---|
| 🔁 Content Swap | I:30150:55097 |
| Style | Arrows \| Dots \| Dots Only |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| - | 1296x210 V p32/24/32/24 g24 pad-y=spacing-4xl pad-x=spacing-3xl gap=spacing-3xl |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| Dots | fg:text-primary ts:Text sm/Semibold |
| Arrows | fg:text-primary ic:icon-oncolor ts:Text sm/Semibold |
| Dots Only |  |

## Component: Carousel Controls  (6 variants)

&nbsp;It typically refers to the navigation elements used to indicate the current position within the carousel and to provide direct access to any slide/item. These controls are located usually below the carousel content.

| Prop | Values / default |
|---|---|
| Selected | False \| True |
| Size | Large \| Mideum \| Small |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| Large | 16x16 H p0/0/0/0 g0 |
| Mideum | 12x12 H p0/0/0/0 g0 |
| Small | 8x8 H p0/0/0/0 g0 |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| True |  |
| False |  |

## Component: Carousel Arrows  (60 variants)

It consists of left and right directional arrows placed on either side of the carousel content. These arrows allow users to manually cycle through the carousel items by clicking or tapping on them.

| Prop | Values / default |
|---|---|
| Direction | Right \| Left |
| State | Hovered \| Pressed \| Focused \| Disabled \| Default |
| Style | Primary \| Subtle |
| Size | Large \| Medium \| Small |
| Icon only | False \| True |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| Medium/False | 40x40 H p0/0/0/0 g0 |
| Medium/True | 40x40 H p0/0/0/0 g0 |
| Large/False | 48x48 H p0/0/0/0 g0 |
| Large/True | 48x48 H p0/0/0/0 g0 |
| Small/False | 32x32 H p0/0/0/0 g0 |
| Small/True | 32x32 H p0/0/0/0 g0 |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| Default/Primary/False | ic:icon-oncolor |
| Hovered/Primary/False | ic:icon-oncolor |
| Pressed/Primary/False | ic:icon-oncolor |
| Focused/Primary/False | ic:icon-oncolor |
| Disabled/Primary/False | ic:icon-default-disabled |
| Default/Subtle/True | ic:icon-default |
| Hovered/Subtle/True | ic:icon-default |
| Pressed/Subtle/True | ic:icon-default |
| Focused/Subtle/True | ic:icon-default |
| Disabled/Subtle/True | ic:icon-default-disabled |
