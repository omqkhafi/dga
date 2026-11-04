# Tabs (mobile)

Source: Figma mobile file `Ci0aNw48DSdp7MsRw0U1nA`, page "Tabs". All values below are read from Figma component variants (LTR variants; RTL variants mirror them). Token names are Figma variable names (last segment); see `tokens.css`.

## Usage (plain language)

_No description is given in Figma for this component; usage guidance not stated in source._

## Component: Horizontal Tab  (48 variants)

| Prop | Values / default |
|---|---|
| Icon | B:true |
| 🔁 Icon swap | I:10750:75655 |
| Text AR | T:تبويب |
| Text EN | T:Text |
| RTL | False \| True |
| Size | Small \| Medium \| Large |
| Selected | False \| True |
| State | Default \| Pressed \| Focused \| Disabled |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| Medium | 73x44 H p12/12/12/12 g4 pad-y=spacing-lg pad-x=spacing-lg gap=spacing-xs r4=radius-sm |
| Large | 72x52 H p16/12/16/12 g4 pad-y=horizontal-tab-md-button-h-padding pad-x=spacing-lg gap=spacing-xs r4=radius-sm |
| Small | 73x36 H p8/12/8/12 g4 pad-y=spacing-md pad-x=spacing-lg gap=spacing-xs r4=radius-sm |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| True/Default | fg:text-default ic:icon-primary ts:Text sm/Bold |
| False/Default | fg:text-primary-paragraph ic:icon-neutral ts:Text sm/Medium |
| True/Disabled | fg:text-default-disabled ic:icon-default-disabled ts:Text sm/Bold |
| False/Disabled | fg:text-default-disabled ic:icon-default-disabled ts:Text sm/Medium |
| True/Focused | bd:border-black fg:text-default ic:icon-default ts:Text sm/Bold |
| False/Focused | bd:border-black fg:text-default ic:icon-default ts:Text sm/Medium |
| False/Pressed | bg:button-background-neutral-pressed fg:text-default ic:icon-default ts:Text sm/Medium |
| True/Pressed | fg:text-default ic:icon-primary ts:Text sm/Bold |

## Component: Vertical Tab  (48 variants)

| Prop | Values / default |
|---|---|
| 🔁 Icon swap | I:10750:75655 |
| Text AR | T:تبويب |
| Text EN | T:Text |
| Icon | B:true |
| RTL | False \| True |
| Size | Small \| Medium \| Large |
| Selected | False \| True |
| State | Default \| Pressed \| Focused \| Disabled |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| Medium | 72x32 H p6/12/6/12 g4 pad-y=spacing-sm pad-x=spacing-lg gap=tab-button-gap r4=radius-sm |
| Large | 72x40 H p8/12/8/12 g4 pad-y=spacing-md pad-x=horizontal-tab-md-button-v-padding gap=tab-button-gap r4=radius-sm |
| Small | 60x24 H p2/6/2/6 g4 pad-y=spacing-xxs pad-x=spacing-sm gap=tab-button-gap r4=radius-sm |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| True/Default | fg:text-default ic:icon-primary ts:Text sm/Semibold |
| False/Default | fg:text-primary-paragraph ic:icon-neutral ts:Text sm/Regular |
| True/Disabled | fg:text-default-disabled ic:icon-primary ts:Text sm/Semibold |
| False/Disabled | fg:text-default-disabled ic:icon-default-disabled ts:Text sm/Regular |
| True/Focused | bd:black fg:text-default ic:icon-primary ts:Text sm/Semibold |
| False/Focused | bd:border-black fg:text-default ic:icon-default ts:Text sm/Regular |
| False/Pressed | bg:button-background-neutral-pressed fg:text-default ic:icon-default ts:Text sm/Regular |
| True/Pressed | fg:text-default ic:icon-primary ts:Text sm/Semibold |

## Component: Horizontal Tab List  (10 variants)

| Prop | Values / default |
|---|---|
| Divider | B:true |
| RTL | False \| True |
| Size | Medium \| Small \| Large |
| Tab Icons | False \| True |
| Flush | False \| True |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| Large | 562x52 H p0/0/0/0 g0 |
| Medium | 562x44 H p0/0/0/0 g0 |
| Small | 562x44 H p0/0/0/0 g0 |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| True/False | fg:text-default ic:icon-primary ts:Text sm/Semibold |
| True/True | fg:text-default ic:icon-primary ts:Text sm/Bold |
| False/False | fg:text-default ic:#000000 ts:Text sm/Bold |
| False/True | fg:text-default ic:#000000 ts:Text sm/Bold |

## Component: Vertical Tab List  (12 variants)

| Prop | Values / default |
|---|---|
| RTL | False \| True |
| Size | Medium \| Small \| Large |
| Tab icons | False \| True |

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
| True | fg:text-default ic:icon-primary ts:Text sm/Semibold |
| False | fg:text-default ts:Text sm/Semibold |
