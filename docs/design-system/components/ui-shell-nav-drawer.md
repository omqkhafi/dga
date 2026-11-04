# UI Shell - Nav Drawer (web)

Source: Figma web file `trJvYAeN2wdayn2VdSUR2N`, page "UI Shell - Nav Drawer". All values below are read from Figma component variants (LTR variants; RTL variants mirror them). Token names are Figma variable names (last segment); see `tokens.css`.

## Usage (plain language)

Parent (Link with Dropdown):&nbsp;This is a parent link that has a dropdown indicator. When clicked or tapped, this would likely expand to show additional links, known as child links.
Link:&nbsp;This is a simple link without any dropdown functionality. It is usually used for single-level navigation 

## Component: Nav Drawer Item  (90 variants)

| Prop | Values / default |
|---|---|
| Icon | B:true |
| External Link | B:false |
| Text EN | T:Link |
| 🔁 Swap Icon | I:13758:241572 |
| Text AR | T:رابط |
| Badge | B:true |
| RTL | True \| False |
| State | Default \| Hovered \| Pressed \| Focused \| Selected \| Disabled |
| Type | Link \| Parent (Sub-menu) \| Divider |
| On Color | True \| False |
| Level | Level 2 \| Level 1 |
| Expanded | True \| False |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| Link | 224x36 H p8/16/8/16 g8 pad-y=spacing-md pad-x=spacing-xl gap=spacing-md r4=radius-sm |
| Parent (Sub-menu) | 224x36 H p8/16/8/16 g8 pad-y=spacing-md pad-x=spacing-xl gap=spacing-md r4=radius-sm |
| Divider | 464x17 H p8/16/8/16 g8 pad-y=spacing-md pad-x=spacing-xl gap=spacing-md r4=radius-sm |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| Default/Link/False/Level 1/False | fg:text-default ic:icon-default ts:Text sm/Semibold |
| Default/Link/True/Level 1/False | fg:text-oncolor-primary ic:icon-oncolor ts:Text sm/Semibold |
| Hovered/Link/False/Level 1/False | bg:button-background-neutral-hovered fg:text-default ic:icon-default ts:Text sm/Semibold |
| Hovered/Link/True/Level 1/False | bg:button-background-transparent-hovered fg:text-oncolor-primary ic:icon-oncolor ts:Text sm/Semibold |
| Pressed/Link/False/Level 1/False | bg:button-background-neutral-pressed fg:text-default ic:icon-default ts:Text sm/Semibold |
| Pressed/Link/True/Level 1/False | bg:button-background-transparent-pressed fg:text-oncolor-primary ic:icon-oncolor ts:Text sm/Semibold |
| Focused/Link/False/Level 1/False | bd:border-black fg:text-default ic:icon-default ts:Text sm/Semibold |
| Focused/Link/True/Level 1/False | bd:border-white fg:text-oncolor-primary ic:icon-oncolor ts:Text sm/Semibold |
| Selected/Link/False/Level 1/False | bg:button-background-neutral-selected fg:background-primary ic:icon-default ts:Text sm/Semibold |
| Selected/Link/True/Level 1/False | bg:button-background-transparent-selected fg:text-oncolor-primary ic:icon-oncolor ts:Text sm/Semibold |
| Disabled/Link/False/Level 1/False | fg:text-default-disabled ic:icon-default-disabled ts:Text sm/Semibold |
| Disabled/Link/True/Level 1/False | fg:text-default-oncolor-disabled ic:icon-default-oncolor-disabled ts:Text sm/Semibold |
| Default/Parent (Sub-menu)/False/Level 1/False | fg:text-default ic:icon-default ts:Text sm/Semibold |
| Default/Parent (Sub-menu)/True/Level 1/False | fg:text-oncolor-primary ic:icon-oncolor ts:Text sm/Semibold |
| Hovered/Parent (Sub-menu)/False/Level 1/False | bg:button-background-neutral-hovered fg:text-default ic:icon-default ts:Text sm/Semibold |
| Hovered/Parent (Sub-menu)/True/Level 1/False | bg:button-background-transparent-hovered fg:text-oncolor-primary ic:icon-oncolor ts:Text sm/Semibold |
| Pressed/Parent (Sub-menu)/False/Level 1/False | bg:button-background-neutral-pressed fg:text-default ic:icon-default ts:Text sm/Semibold |
| Pressed/Parent (Sub-menu)/True/Level 1/False | bg:button-background-transparent-pressed fg:text-oncolor-primary ic:icon-oncolor ts:Text sm/Semibold |
| Focused/Parent (Sub-menu)/False/Level 1/False | bd:border-black fg:text-default ic:icon-default ts:Text sm/Semibold |
| Focused/Parent (Sub-menu)/True/Level 1/False | fg:text-oncolor-primary ic:icon-oncolor ts:Text sm/Semibold |
| Disabled/Parent (Sub-menu)/False/Level 1/False | fg:text-default-disabled ic:icon-default-disabled ts:Text sm/Semibold |
| Disabled/Parent (Sub-menu)/True/Level 1/False | fg:text-default-oncolor-disabled ic:icon-default-oncolor-disabled ts:Text sm/Semibold |
| Default/Parent (Sub-menu)/False/Level 1/True | fg:text-default ic:icon-default ts:Text sm/Semibold |
| Default/Parent (Sub-menu)/True/Level 1/True | fg:text-oncolor-primary ic:icon-oncolor ts:Text sm/Semibold |
| Hovered/Parent (Sub-menu)/False/Level 1/True | bg:button-background-neutral-hovered fg:text-default ic:icon-default ts:Text sm/Semibold |
| Hovered/Parent (Sub-menu)/True/Level 1/True | bg:button-background-transparent-hovered fg:text-oncolor-primary ic:icon-oncolor ts:Text sm/Semibold |
| Pressed/Parent (Sub-menu)/False/Level 1/True | bg:button-background-neutral-pressed fg:text-default ic:icon-default ts:Text sm/Semibold |
| Pressed/Parent (Sub-menu)/True/Level 1/True | bg:button-background-transparent-pressed fg:text-oncolor-primary ic:icon-oncolor ts:Text sm/Semibold |
| Focused/Parent (Sub-menu)/False/Level 1/True | bd:border-black fg:text-default ic:icon-default ts:Text sm/Semibold |
| Focused/Parent (Sub-menu)/True/Level 1/True | fg:text-oncolor-primary ic:icon-oncolor ts:Text sm/Semibold |
| Disabled/Parent (Sub-menu)/False/Level 1/True | fg:text-default-disabled ic:icon-default-disabled ts:Text sm/Semibold |
| Disabled/Parent (Sub-menu)/True/Level 1/True | fg:text-default-oncolor-disabled ic:icon-default-oncolor-disabled ts:Text sm/Semibold |
| Default/Link/False/Level 2/False | fg:text-default ts:Text sm/Regular |
| Default/Link/True/Level 2/False | fg:text-oncolor-primary ts:Text sm/Regular |
| Hovered/Link/False/Level 2/False | bg:button-background-neutral-hovered fg:text-default ts:Text sm/Regular |
| Hovered/Link/True/Level 2/False | bg:button-background-transparent-hovered fg:text-oncolor-primary ts:Text sm/Regular |
| Pressed/Link/False/Level 2/False | bg:button-background-neutral-pressed fg:text-default ts:Text sm/Regular |
| Pressed/Link/True/Level 2/False | bg:button-background-transparent-pressed fg:text-oncolor-primary ts:Text sm/Regular |
| Focused/Link/False/Level 2/False | bd:border-black fg:text-default ts:Text sm/Regular |
| Focused/Link/True/Level 2/False | bd:border-white fg:text-oncolor-primary ts:Text sm/Regular |
| Selected/Link/False/Level 2/False | bg:button-background-neutral-selected fg:background-primary ts:Text sm/Semibold |
| Selected/Link/True/Level 2/False | bg:button-background-transparent-selected fg:text-oncolor-primary ts:Text sm/Semibold |
| Disabled/Link/False/Level 2/False | fg:text-default-disabled ts:Text sm/Regular |
| Disabled/Link/True/Level 2/False | fg:text-default-oncolor-disabled ts:Text sm/Regular |
| Default/Divider/False/Level 1/False |  |
| Default/Divider/True/Level 1/False |  |

## Component: Nav Drawer  (12 variants)

A navigation drawer typically appears as a panel from the side of the screen, revealing a set of navigation options such as links to different sections.

| Prop | Values / default |
|---|---|
| Nav Header | B:true |
| Scroll Bar | B:false |
| Border | B:true |
| Swap Custom Content | I:15249:99491 |
| Custom Content | B:false |
| RTL | True \| False |
| Background Color | Green \| White \| Gray |
| Overlay | True \| False |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| - | 256x903 V p0/0/0/0 g0 |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| Gray/False | bg:alpha-white-50 fg:text-secondary-paragraph ic:background-neutral-400 ts:Text xs/Medium |
| Green/False | bg:background-SA-Flag fg:text-secondary-paragraph ic:background-neutral-400 ts:Text xs/Medium |
| White/True | bg:alpha-white-80 fg:text-secondary-paragraph ic:background-neutral-400 ts:Text xs/Medium |
| Gray/True | bg:alpha-white-80 fg:text-secondary-paragraph ic:background-neutral-400 ts:Text xs/Medium |
| Green/True | bg:background-SA-Flag fg:text-secondary-paragraph ic:background-neutral-400 ts:Text xs/Medium fx:shadow-2xl |
| White/False | bg:alpha-white-80 fg:text-secondary-paragraph ic:background-neutral-400 ts:Text xs/Medium |

## Component: Nav Drawer Header  (4 variants)

The Nav Drawer Header includes a placeholder for replacing the logo.

| Prop | Values / default |
|---|---|
| Logo | B:true |
| Divider | B:false |
| RTL | yes \| no |
| Background | Green \| Gray |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| - | 256x72 V p0/32/0/32 g0 pad-x=spacing-4xl |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| Green | bg:background-nav header fg:text-secondary-paragraph ic:background-neutral-400 ts:Text xs/Medium |
| Gray | bg:background-neutral-50 fg:text-secondary-paragraph ic:background-neutral-400 ts:Text xs/Medium |
