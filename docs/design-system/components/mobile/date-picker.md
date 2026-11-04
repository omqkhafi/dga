# Date Picker (mobile)

Source: Figma mobile file `Ci0aNw48DSdp7MsRw0U1nA`, page "Date Picker". All values below are read from Figma component variants (LTR variants; RTL variants mirror them). Token names are Figma variable names (last segment); see `tokens.css`.

## Usage (plain language)

_No description is given in Figma for this component; usage guidance not stated in source._

Internal sub-parts (not used directly): `_Date field`

## Component: Date cell  (26 variants)

| Prop | Values / default |
|---|---|
| Range-left | B:false |
| Range-right | B:true |
| Extra-left | B:true |
| Extra-right | B:true |
| Mid-Range | B:true |
| Date | T:21 |
| Secondary Date | T:1/9 |
| 2ndry Date | B:false |
| Selected | False \| True |
| Today | False \| True |
| Nex/Prev | False \| True \| End \| Start |
| State | Default \| Pressed \| Disabled |
| Null | False \| True |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| - | 44x44 H p0/0/0/0 g0 |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| False/False/False/Default/False | fg:text-default ts:Text md/Regular |
| False/True/False/Default/False | fg:datecell-background-600 ts:Text md/Bold |
| True/False/Start/Default/False | fg:text-oncolor-primary ts:Text md/Regular |
| True/False/End/Default/False | fg:text-oncolor-primary ts:Text md/Regular |
| True/True/False/Default/False | fg:text-oncolor-primary ts:Text md/Bold |
| False/False/False/Pressed/False | fg:text-default ts:Text md/Regular |
| False/True/False/Pressed/False | fg:datecell-background-600 ts:Text md/Bold |
| True/False/False/Pressed/False | fg:text-oncolor-primary ts:Text md/Regular |
| True/True/False/Pressed/False | fg:text-oncolor-primary ts:Text md/Bold |
| False/False/False/Disabled/False | fg:text-default-disabled ts:Text md/Regular |
| False/True/False/Disabled/False | fg:text-default-disabled ts:Text md/Bold |
| True/False/False/Disabled/False | fg:text-oncolor-primary ts:Text md/Regular |
| True/True/False/Disabled/False | fg:text-oncolor-primary ts:Text md/Bold |
| False/False/True/Default/False | fg:text-default ts:Text md/Regular |
| False/True/True/Default/False | fg:datecell-background-600 ts:Text md/Bold |
| True/False/True/Default/False | fg:text-brand-primary ts:Text md/Regular |
| True/True/True/Default/False | fg:text-brand-primary ts:Text md/Bold |
| False/False/True/Pressed/False | fg:text-default ts:Text md/Regular |
| False/True/True/Pressed/False | fg:datecell-background-600 ts:Text md/Bold |
| True/False/True/Pressed/False | fg:text-brand-primary ts:Text md/Regular |
| True/True/True/Pressed/False | fg:text-brand-primary ts:Text md/Bold |
| False/False/True/Disabled/False | fg:text-default-disabled |
| False/True/True/Disabled/False | fg:text-default-disabled |
| True/False/True/Disabled/False | fg:text-oncolor-primary ts:Text md/Regular |
| True/True/True/Disabled/False | fg:text-oncolor-primary ts:Text md/Bold |
| False/False/False/Default/True |  |

## Component: Date Picker   (4 variants)

| Prop | Values / default |
|---|---|
| RTL | False \| True |
| Type | Range \| Select date |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| Range | 375x696 V p0/0/0/0 g0 |
| Select date | 375x234 H p0/32/0/32 g72 |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| Range | bg:field-background-default fg:text-default |
| Select date | bg:field-background-default fg:alpha-black-20 |
