# Notification Toast (mobile)

Source: Figma mobile file `Ci0aNw48DSdp7MsRw0U1nA`, page "Notification Toast". All values below are read from Figma component variants (LTR variants; RTL variants mirror them). Token names are Figma variable names (last segment); see `tokens.css`.

## Usage (plain language)

_No description is given in Figma for this component; usage guidance not stated in source._

## Component: Notification Toast  (10 variants)

| Prop | Values / default |
|---|---|
| Actions | B:true |
| Helper Text | B:true |
| Close Button | B:true |
| Lead Text EN | T:Alert message title  |
| Helper Text EN | T:When a Notification/Aler |
| Lead Text AR | T:عنوان رسالة الاشعار أو ا |
| Helper Text AR | T:يكتب المحتوى الإضافي هنا |
| RTL | True \| False |
| Type | Neutral \| Info \| Critical/Error \| Warning \| Success |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| Neutral | 343x148 V p16/24/16/24 g16 pad-y=notification-toast-v-padding pad-x=notification-alert-h-padding gap=notification-gap r8=radius-md |
| Info | 343x148 V p16/24/16/24 g16 pad-y=notification-toast-v-padding pad-x=notification-alert-h-padding gap=notification-gap r8=radius-md |
| Critical/Error | 343x148 V p16/24/16/24 g16 pad-y=notification-toast-v-padding pad-x=notification-alert-h-padding gap=notification-gap r8=radius-md |
| Warning | 343x148 V p16/24/16/24 g16 pad-y=notification-toast-v-padding pad-x=notification-alert-h-padding gap=notification-gap r8=radius-md |
| Success | 343x148 V p16/24/16/24 g16 pad-y=notification-toast-v-padding pad-x=notification-alert-h-padding gap=notification-gap r8=radius-md |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| Neutral | bg:background-card fg:text-default ic:icon-default-400 ts:Text md/Semibold |
| Info | bg:background-card fg:text-default ic:icon-info ts:Text md/Semibold |
| Critical/Error | bg:background-card fg:text-default ic:icon-error ts:Text md/Semibold |
| Warning | bg:background-card fg:text-default ic:icon-warning ts:Text md/Semibold |
| Success | bg:background-card fg:text-default ic:icon-success ts:Text md/Semibold |
