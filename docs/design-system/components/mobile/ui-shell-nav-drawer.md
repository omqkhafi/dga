# UI Shell - Nav Drawer (mobile)

Source: Figma mobile file `Ci0aNw48DSdp7MsRw0U1nA`, page "UI Shell - Nav Drawer". All values below are read from Figma component variants (LTR variants; RTL variants mirror them). Token names are Figma variable names (last segment); see `tokens.css`.

## Usage (plain language)

_No description is given in Figma for this component; usage guidance not stated in source._

## Component: Nav Drawer Item  (74 variants)

| Prop | Values / default |
|---|---|
| Icon | B:true |
| External Link | B:false |
| Text EN | T:Link |
| 🔁 Icon swap | I:10750:75655 |
| Text AR | T:رابط |
| Tag | B:true |
| RTL | False \| True |
| On Color | False \| True |
| Type | Link \| Parent (Sub-menu) \| Divider |
| Level | Level 2 \| Level 1 |
| State | Default \| Pressed \| Focused \| Selected \| Disabled |
| Expanded | False \| True |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| Link | 224x44 H p12/16/12/16 g8 pad-y=spacing-lg pad-x=spacing-xl gap=spacing-md r4=radius-sm |
| Parent (Sub-menu) | 224x44 H p12/16/12/16 g8 pad-y=spacing-lg pad-x=spacing-xl gap=spacing-md r4=radius-sm |
| Divider | 464x25 H p12/16/12/16 g8 pad-y=spacing-lg pad-x=spacing-xl gap=spacing-md r4=radius-sm |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| False/Link/Level 1/Default/False | fg:text-default ic:icon-default ts:Text sm/Semibold |
| True/Link/Level 1/Default/False | fg:text-oncolor-primary ic:icon-oncolor ts:Text sm/Semibold |
| False/Link/Level 1/Pressed/False | bg:button-background-neutral-pressed fg:text-default ic:icon-default ts:Text sm/Semibold |
| True/Link/Level 1/Pressed/False | bg:button-background-transparent-pressed fg:text-primary_on-color ic:icon-oncolor ts:Text sm/Semibold |
| False/Link/Level 1/Focused/False | bd:border-black fg:text-default ic:icon-default ts:Text sm/Semibold |
| True/Link/Level 1/Focused/False | bd:border-white-40 fg:text-secondary_on-color ic:icon-oncolor ts:Text sm/Semibold |
| False/Link/Level 1/Selected/False | bg:button-background-neutral-selected fg:text-primary ic:icon-primary ts:Text sm/Semibold |
| True/Link/Level 1/Selected/False | bg:button-background-transparent-selected fg:text-oncolor-primary ic:icon-oncolor ts:Text sm/Semibold |
| False/Link/Level 1/Disabled/False | fg:text-default-disabled ic:icon-default-disabled ts:Text sm/Semibold |
| True/Link/Level 1/Disabled/False | fg:text-default-oncolor-disabled ic:icon-default-oncolor-disabled ts:Text sm/Semibold |
| False/Parent (Sub-menu)/Level 1/Default/False | fg:text-default ic:icon-default ts:Text sm/Semibold |
| True/Parent (Sub-menu)/Level 1/Default/False | fg:text-oncolor-primary ic:icon-oncolor ts:Text sm/Semibold |
| False/Parent (Sub-menu)/Level 1/Pressed/False | bg:button-background-neutral-pressed fg:text-default ic:icon-default ts:Text sm/Semibold |
| True/Parent (Sub-menu)/Level 1/Pressed/False | bg:alpha-white-30 fg:text-primary_on-color ic:icon-oncolor ts:Text sm/Semibold |
| False/Parent (Sub-menu)/Level 1/Focused/False | bd:border-black fg:text-default ic:icon-default ts:Text sm/Semibold |
| True/Parent (Sub-menu)/Level 1/Focused/False | bd:white fg:text-secondary_on-color ic:icon-oncolor ts:Text sm/Semibold |
| False/Parent (Sub-menu)/Level 1/Disabled/False | fg:text-default-disabled ic:icon-default-disabled ts:Text sm/Semibold |
| True/Parent (Sub-menu)/Level 1/Disabled/False | fg:text-default-oncolor-disabled ic:icon-default-oncolor-disabled ts:Text sm/Semibold |
| False/Parent (Sub-menu)/Level 1/Default/True | fg:text-default ic:icon-default ts:Text sm/Semibold |
| True/Parent (Sub-menu)/Level 1/Default/True | fg:text-secondary_on-color ic:icon-oncolor ts:Text sm/Semibold |
| False/Parent (Sub-menu)/Level 1/Pressed/True | bg:button-background-neutral-pressed fg:text-default ic:icon-default ts:Text sm/Semibold |
| True/Parent (Sub-menu)/Level 1/Pressed/True | bg:button-background-transparent-pressed fg:text-primary_on-color ic:icon-oncolor ts:Text sm/Semibold |
| False/Parent (Sub-menu)/Level 1/Focused/True | bd:border-black fg:text-default ic:icon-default ts:Text sm/Semibold |
| True/Parent (Sub-menu)/Level 1/Focused/True | bd:border-white fg:text-oncolor-primary ic:icon-oncolor ts:Text sm/Semibold |
| False/Parent (Sub-menu)/Level 1/Disabled/True | fg:text-default-disabled ic:icon-default-disabled ts:Text sm/Semibold |
| True/Parent (Sub-menu)/Level 1/Disabled/True | fg:text-default-oncolor-disabled ic:icon-default-oncolor-disabled ts:Text sm/Semibold |
| False/Link/Level 2/Default/False | fg:text-default ts:Text sm/Regular |
| True/Link/Level 2/Default/False | fg:text-secondary_on-color ts:Text sm/Regular |
| False/Link/Level 2/Pressed/False | bg:button-background-neutral-pressed fg:text-default ts:Text sm/Regular |
| True/Link/Level 2/Pressed/False | bg:button-background-transparent-pressed fg:text-oncolor-primary ts:Text sm/Regular |
| False/Link/Level 2/Focused/False | bd:border-black fg:text-default ts:Text sm/Regular |
| True/Link/Level 2/Focused/False | bd:border-white fg:text-oncolor-primary ts:Text sm/Regular |
| False/Link/Level 2/Selected/False | bg:button-background-neutral-selected fg:text-primary ts:Text sm/Semibold |
| True/Link/Level 2/Selected/False | bg:button-background-transparent-selected fg:text-oncolor-primary ts:Text sm/Semibold |
| False/Link/Level 2/Disabled/False | fg:text-default-disabled ts:Text sm/Regular |
| True/Link/Level 2/Disabled/False | fg:text-default-oncolor-disabled ts:Text sm/Regular |
| False/Divider/Level 1/Default/False |  |
| True/Divider/Level 1/Default/False |  |

## Component: Nav Drawer  (8 variants)

| Prop | Values / default |
|---|---|
| Scroll bar | B:false |
| Border | B:true |
| Header | B:true |
| RTL | False \| True |
| Background | Green \| White |
| Overlay | False \| True |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| - | 327x840 V p0/0/0/0 g0 |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| White/False | bg:background-menu fg:text-default ic:icon-default ts:Text sm/Semibold |
| Green/False | bg:800 fg:text-default ic:icon-oncolor ts:Text sm/Semibold |
| White/True | bg:alpha-white-80 fg:text-default ic:icon-default ts:Text sm/Semibold |
| Green/True | bg:800 fg:text-default ic:icon-oncolor ts:Text sm/Semibold |

## Component: User section  (4 variants)

| Prop | Values / default |
|---|---|
| Title EN | T:Username |
| Description EN | T:phone number or status e |
| Title AR | T:الاسم |
| Description AR | T:رقم الهاتف، الحالة الخ |
| RTL | True \| False |
| OnColor | False \| True |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| - | 362x92 V p16/16/16/16 g0 pad-y=spacing-xl pad-x=spacing-xl |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| False | bg:background-neutral-50 fg:text-default ic:icon-default ts:Text sm/Semibold |
| True | bg:alpha-white-10 fg:text-default ic:icon-oncolor ts:Text sm/Semibold |
