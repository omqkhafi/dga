# Modals (mobile)

Source: Figma mobile file `Ci0aNw48DSdp7MsRw0U1nA`, page "Modals". All values below are read from Figma component variants (LTR variants; RTL variants mirror them). Token names are Figma variable names (last segment); see `tokens.css`.

## Usage (plain language)

_No description is given in Figma for this component; usage guidance not stated in source._

## Component: Modal  (2 variants)

| Prop | Values / default |
|---|---|
| RTL | False \| True |
| Mobile | False |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| - | 375x430 V p8/16/8/16 g8 pad-y=modal-content-bottom-padding pad-x=modal-padding gap=modal-gap |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| False | bg:background-menu fg:text-form-title ic:icon-default ts:Text sm/Medium |

## Component: Modal Header  (4 variants)

| Prop | Values / default |
|---|---|
| Title EN | T:Title goes here |
| Title AR | T:عنوان الرسالة يُكتب هنا |
| RTL | False \| True |
| Actions | False \| True |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| - | 480x52 V p0/0/0/0 g8 gap=modal-gap |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| False | fg:text-form-title ic:icon-default ts:Text sm/Medium |
| True | fg:text-default ic:icon-default ts:Text xs/Medium |

## Component: Modal Actions  (4 variants)

| Prop | Values / default |
|---|---|
| Secondary Action | B:true |
| Tertiary Action | B:true |
| RTL | True \| False |
| Stack | False \| True |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| - | 480x64 V p0/0/0/0 g0 |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| False | fg:text-default ts:Text sm/Medium |
| True | fg:text-oncolor-primary ts:Text sm/Medium |

## Component: Modal Body  (6 variants)

| Prop | Values / default |
|---|---|
| 🔁 Content Swap | I:1823:28658 |
| RTL | False \| True |
| Center Align | False \| True |
| Content | Text \| Placeholder |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| - | 480x36 V p0/0/16/0 g8 |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| False/Text | fg:text-secondary-paragraph ts:Text sm/Regular |
| True/Text | fg:text-secondary-paragraph ts:Text sm/Regular |
| False/Placeholder | fg:text-brand-primary ts:Text sm/Semibold |

## Component: Swap Placeholder  (1 variants)

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| - | 269x52 H p16/16/16/16 g8 pad-y=spacing-xl pad-x=spacing-xl gap=spacing-md r4=radius-sm sw1 |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| - | bg:50 bd:600 fg:text-brand-primary ts:Text sm/Semibold |
