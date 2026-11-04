# Banner (mobile)

Source: Figma mobile file `Ci0aNw48DSdp7MsRw0U1nA`, page "Banner". All values below are read from Figma component variants (LTR variants; RTL variants mirror them). Token names are Figma variable names (last segment); see `tokens.css`.

## Usage (plain language)

_No description is given in Figma for this component; usage guidance not stated in source._

## Component: Banner  (10 variants)

| Prop | Values / default |
|---|---|
| Lead Text | B:true |
| Link | B:false |
| Dismissible | B:true |
| Icon | B:true |
| Helper Text EN | T:This is a very important |
| Helper Text AR | T:رسالة لائحة رئيسية مهمة  |
| Lead Text AR | T:مهم: |
| Lead Text EN | T:Important: |
| Button | B:false |
| RTL | False \| True |
| Style | Neutral \| Critical \| Warning \| Success \| Info |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| - | 343x128 V p8/16/8/16 g8 pad-y=notification-alert-v-padding pad-x=notification-toast-mobile-h-padding gap=notification-gap |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| Critical | bg:background-error-50 fg:text-error ic:icon-oncolor ts:Text md/Bold |
| Warning | bg:background-warning-50 fg:text-warning ic:icon-oncolor ts:Text md/Bold |
| Success | bg:background-success-50 fg:text-success ic:icon-oncolor ts:Text md/Bold |
| Info | bg:background-info-50 fg:text-info ic:icon-oncolor ts:Text md/Bold |
| Neutral | bg:background-neutral-50 fg:text-primary-paragraph ic:icon-oncolor ts:Text md/Bold |
