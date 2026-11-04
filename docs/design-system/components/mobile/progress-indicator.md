# Progress indicator (mobile)

Source: Figma mobile file `Ci0aNw48DSdp7MsRw0U1nA`, page "Progress indicator". All values below are read from Figma component variants (LTR variants; RTL variants mirror them). Token names are Figma variable names (last segment); see `tokens.css`.

## Usage (plain language)

_No description is given in Figma for this component; usage guidance not stated in source._

Internal sub-parts (not used directly): `_StepperBase`

## Component: Stepper  (20 variants)

| Prop | Values / default |
|---|---|
| Next Step | B:true |
| Step Name | T:Step One |
| Show Step Name | B:true |
| Step Description | T:this is step description |
| Show Description | B:true |
| RTL | no \| yes |
| Alignment | Horizontal \| Vertical |
| State | Current \| Completed \| Upcomming |
| Focused | no \| yes |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| - | 158x88 V p0/0/0/0 g8 gap=progress-indicator-gap |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| Horizontal/Completed/no | fg:stepper-text-primary ic:icon-oncolor ts:Text md/Regular |
| Horizontal/Completed/yes | fg:stepper-text-primary ic:icon-oncolor ts:Text md/Regular |
| Horizontal/Upcomming/no | fg:stepper-button-upcomming |
| Horizontal/Current/no | fg:stepper-button-current |
| Horizontal/Current/yes | fg:stepper-button-current |
| Vertical/Completed/no | fg:stepper-text-primary ic:icon-oncolor ts:Text md/Regular |
| Vertical/Current/no | fg:stepper-button-current |
| Vertical/Upcomming/no | fg:stepper-line-upcomming |
| Vertical/Current/yes | fg:stepper-button-current |
| Vertical/Completed/yes | fg:stepper-text-primary ic:icon-oncolor |
