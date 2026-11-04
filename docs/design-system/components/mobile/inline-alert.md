# Inline Alert (mobile)

Source: Figma mobile file `Ci0aNw48DSdp7MsRw0U1nA`, page "Inline Alert". All values below are read from Figma component variants (LTR variants; RTL variants mirror them). Token names are Figma variable names (last segment); see `tokens.css`.

## Usage (plain language)

_No description is given in Figma for this component; usage guidance not stated in source._

## Component: Inline Alert  (20 variants)

| Prop | Values / default |
|---|---|
| Actions | B:true |
| Helper text | B:true |
| Close Button | B:true |
| Lead Text EN | T:Alert message title  |
| Helper Text EN | T:When a Notification/Aler |
| Lead Text AR | T:عنوان رسالة الاشعار أو ا |
| Helper Text AR | T:يكتب المحتوى الإضافي هنا |
| RTL | False \| True |
| Type | Neutral \| Info \| Destructive \| Warning \| Success |
| Background | White \| Color |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| Neutral | 343x140 V p16/16/16/16 g8 pad-y=spacing-xl pad-x=spacing-xl gap=spacing-md r8=radius-md sw1 |
| Info | 343x140 V p16/16/16/16 g8 pad-y=spacing-xl pad-x=spacing-xl gap=spacing-md r8=radius-md sw1 |
| Destructive | 343x140 V p16/16/16/16 g8 pad-y=spacing-xl pad-x=spacing-xl gap=spacing-md r8=radius-md sw1 |
| Warning | 343x140 V p16/16/16/16 g8 pad-y=spacing-xl pad-x=spacing-xl gap=spacing-md r8=radius-md sw1 |
| Success | 343x140 V p16/16/16/16 g8 pad-y=spacing-xl pad-x=spacing-xl gap=spacing-md r8=radius-md sw1 |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| Neutral/White | bg:background-white bd:border-neutral-primary fg:text-display ic:icon-default-400 ts:Text md/Semibold |
| Info/White | bg:background-white bd:border-neutral-primary fg:text-display ic:tag-icon-info ts:Text md/Semibold |
| Destructive/White | bg:background-white bd:border-neutral-primary fg:text-display ic:icon-error ts:Text md/Semibold |
| Warning/White | bg:background-white bd:border-neutral-primary fg:text-display ic:tag-icon-warning ts:Text md/Semibold |
| Success/White | bg:background-white bd:border-neutral-primary fg:text-display ic:icon-success ts:Text md/Semibold |
| Neutral/Color | bg:background-neutral-25 bd:border-neutral-primary fg:text-display ic:icon-default-400 ts:Text md/Semibold |
| Info/Color | bg:background-info-25 bd:border-info-light fg:text-display ic:tag-icon-info ts:Text md/Semibold |
| Destructive/Color | bg:background-error-25 bd:border-error-light fg:text-display ic:icon-error ts:Text md/Semibold |
| Warning/Color | bg:background-warning-25 bd:border-secondary-light fg:text-display ic:tag-icon-warning ts:Text md/Semibold |
| Success/Color | bg:background-success-25 bd:border-success-light fg:text-display ic:icon-success ts:Text md/Semibold |
