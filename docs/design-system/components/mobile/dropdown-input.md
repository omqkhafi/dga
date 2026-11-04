# Dropdown Input (mobile)

Source: Figma mobile file `Ci0aNw48DSdp7MsRw0U1nA`, page "Dropdown Input". All values below are read from Figma component variants (LTR variants; RTL variants mirror them). Token names are Figma variable names (last segment); see `tokens.css`.

## Usage (plain language)

_No description is given in Figma for this component; usage guidance not stated in source._

## Component: Dropdown List Item  (18 variants)

| Prop | Values / default |
|---|---|
| Selected | B:true |
| Text EN | T:Option |
| Divider | B:false |
| Text AR | T:إختيار |
| RTL | True \| False |
| State | Default \| Pressed \| Focused \| Disabled |
| Type | Single Select \| Multi Select \| Group label |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| Single Select | 320x36 H p8/8/8/8 g8 pad-y=spacing-md pad-x=spacing-md gap=spacing-md r4=radius-sm |
| Group label | 320x28 H p8/8/0/8 g8 pad-y=spacing-md pad-x=spacing-md gap=spacing-md r4=radius-sm |
| Multi Select | 320x36 H p8/8/8/8 g8 pad-y=spacing-md pad-x=spacing-md gap=spacing-md r4=radius-sm |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| Default/Single Select | fg:text-default ic:icon-default ts:Text sm/Regular |
| Default/Group label | fg:field-text-label |
| Default/Multi Select | fg:text-default ic:icon-oncolor ts:Text sm/Regular |
| Pressed/Single Select | bg:field-background-pressed fg:text-default ic:icon-default ts:Text sm/Regular |
| Pressed/Multi Select | bg:field-background-pressed fg:text-default ic:icon-oncolor ts:Text sm/Regular |
| Focused/Single Select | bd:field-border-pressed fg:text-default ic:icon-default ts:Text sm/Regular |
| Focused/Multi Select | bd:field-border-pressed fg:text-default ic:icon-oncolor ts:Text sm/Regular |
| Disabled/Single Select | fg:text-default-disabled ic:icon-default-disabled ts:Text sm/Regular |
| Disabled/Multi Select | fg:text-default-disabled ic:icon-oncolor ts:Text sm/Regular |

## Component: Dropdown Input  (120 variants)

| Prop | Values / default |
|---|---|
| Scroll Bar | B:false |
| Multi-section | B:false |
| Icon | B:false |
| Clear | B:false |
| Type Cursor | B:false |
| Leading Icon | I:10750:73533 |
| Show Helper text | B:false |
| 🔁 Swap Icon | I:11089:90351 |
| Show label | B:true |
| Helper Text AR | T:نص مساعد |
| Helper Text Eng | T:Help Text |
| RTL | False \| True |
| Filled | False \| True |
| State | Default \| Pressed \| Focused \| Read-only \| Disabled |
| Error | False \| True |
| Style | Default \| Filled lighter \| Filled darker |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| - | 320x72 V p0/0/0/0 g8 gap=spacing-md |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| False/Default/False/Default | fg:field-border-error ic:icon-default ts:Text sm/Regular |
| False/Default/True/Default | fg:field-border-error ic:icon-default ts:Text sm/Regular |
| False/Default/False/Filled lighter | fg:field-border-error ic:icon-default ts:Text sm/Regular |
| False/Default/True/Filled lighter | fg:field-border-error ic:icon-default ts:Text sm/Regular |
| False/Default/False/Filled darker | fg:field-border-error ic:icon-default ts:Text sm/Regular |
| False/Default/True/Filled darker | fg:field-border-error ic:icon-default ts:Text sm/Regular |
| True/Default/False/Default | fg:field-border-error ic:icon-default ts:Text sm/Regular |
| True/Default/True/Default | fg:field-border-error ic:icon-default ts:Text sm/Regular |
| True/Default/False/Filled lighter | fg:field-border-error ic:icon-default ts:Text sm/Regular |
| True/Default/True/Filled lighter | fg:field-border-error ic:icon-default ts:Text sm/Regular |
| True/Default/False/Filled darker | fg:field-border-error ic:icon-default ts:Text sm/Regular |
| True/Default/True/Filled darker | fg:field-border-error ic:icon-default ts:Text sm/Regular |
| False/Pressed/False/Default | fg:field-border-error ic:icon-default ts:Text sm/Regular |
| False/Pressed/True/Default | fg:field-border-error ic:icon-default ts:Text sm/Regular |
| False/Pressed/False/Filled lighter | fg:field-border-error ic:icon-default ts:Text sm/Regular |
| False/Pressed/True/Filled lighter | fg:field-border-error ic:icon-default ts:Text sm/Regular |
| False/Pressed/False/Filled darker | fg:field-border-error ic:icon-default ts:Text sm/Regular |
| False/Pressed/True/Filled darker | fg:field-border-error ic:icon-default ts:Text sm/Regular |
| True/Pressed/False/Default | fg:field-border-error ic:icon-default ts:Text sm/Regular |
| True/Pressed/True/Default | fg:field-border-error ic:icon-default ts:Text sm/Regular |
| True/Pressed/False/Filled lighter | fg:field-border-error ic:icon-default ts:Text sm/Regular |
| True/Pressed/True/Filled lighter | fg:field-border-error ic:icon-default ts:Text sm/Regular |
| True/Pressed/False/Filled darker | fg:field-border-error ic:icon-default ts:Text sm/Regular |
| True/Pressed/True/Filled darker | fg:field-border-error ic:icon-default ts:Text sm/Regular |
| False/Focused/False/Default | fg:field-border-error ic:icon-default ts:Text sm/Regular |
| False/Focused/True/Default | fg:field-border-error ic:icon-default ts:Text sm/Regular |
| False/Focused/False/Filled lighter | fg:field-border-error ic:icon-default ts:Text sm/Regular |
| False/Focused/True/Filled lighter | fg:field-border-error ic:icon-default ts:Text sm/Regular |
| False/Focused/False/Filled darker | fg:field-border-error ic:icon-default ts:Text sm/Regular |
| False/Focused/True/Filled darker | fg:field-border-error ic:icon-default ts:Text sm/Regular |
| True/Focused/False/Default | fg:field-border-error ic:icon-default ts:Text sm/Regular |
| True/Focused/True/Default | fg:field-border-error ic:icon-default ts:Text sm/Regular |
| True/Focused/False/Filled lighter | fg:field-border-error ic:icon-default ts:Text sm/Regular |
| True/Focused/True/Filled lighter | fg:field-border-error ic:icon-default ts:Text sm/Regular |
| True/Focused/False/Filled darker | fg:field-border-error ic:icon-default ts:Text sm/Regular |
| True/Focused/True/Filled darker | fg:field-border-error ic:icon-default ts:Text sm/Regular |
| False/Read-only/False/Default | fg:field-border-error ic:icon-default ts:Text sm/Regular |
| False/Read-only/True/Default | fg:field-border-error ic:icon-default ts:Text sm/Regular |
| False/Read-only/False/Filled lighter | fg:field-border-error ic:icon-default ts:Text sm/Regular |
| False/Read-only/True/Filled lighter | fg:field-border-error ic:icon-default ts:Text sm/Regular |
| False/Read-only/False/Filled darker | fg:field-border-error ic:icon-default ts:Text sm/Regular |
| False/Read-only/True/Filled darker | fg:field-border-error ic:icon-default ts:Text sm/Regular |
| True/Read-only/False/Default | fg:field-border-error ic:icon-default ts:Text sm/Regular |
| True/Read-only/True/Default | fg:field-border-error ic:icon-default ts:Text sm/Regular |
| True/Read-only/False/Filled lighter | fg:field-border-error ic:icon-default ts:Text sm/Regular |
| True/Read-only/True/Filled lighter | fg:field-border-error ic:icon-default ts:Text sm/Regular |
| True/Read-only/False/Filled darker | fg:field-border-error ic:icon-default ts:Text sm/Regular |
| True/Read-only/True/Filled darker | fg:field-border-error ic:icon-default ts:Text sm/Regular |
| False/Disabled/False/Default | fg:field-border-error ic:icon-default ts:Text sm/Regular |
| False/Disabled/True/Default | fg:field-border-error ic:icon-default ts:Text sm/Regular |
| False/Disabled/False/Filled lighter | fg:field-border-error ic:icon-default ts:Text sm/Regular |
| False/Disabled/True/Filled lighter | fg:field-border-error ic:icon-default ts:Text sm/Regular |
| False/Disabled/False/Filled darker | fg:field-border-error ic:icon-default ts:Text sm/Regular |
| False/Disabled/True/Filled darker | fg:field-border-error ic:icon-default ts:Text sm/Regular |
| True/Disabled/False/Default | fg:field-border-error ic:icon-default ts:Text sm/Regular |
| True/Disabled/True/Default | fg:field-border-error ic:icon-default ts:Text sm/Regular |
| True/Disabled/False/Filled lighter | fg:field-border-error ic:icon-default ts:Text sm/Regular |
| True/Disabled/True/Filled lighter | fg:field-border-error ic:icon-default ts:Text sm/Regular |
| True/Disabled/False/Filled darker | fg:field-border-error ic:icon-default ts:Text sm/Regular |
| True/Disabled/True/Filled darker | fg:field-border-error ic:icon-default ts:Text sm/Regular |
