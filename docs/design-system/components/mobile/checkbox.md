# Checkbox (mobile)

Source: Figma mobile file `Ci0aNw48DSdp7MsRw0U1nA`, page "Checkbox". All values below are read from Figma component variants (LTR variants; RTL variants mirror them). Token names are Figma variable names (last segment); see `tokens.css`.

## Usage (plain language)

_No description is given in Figma for this component; usage guidance not stated in source._

Internal sub-parts (not used directly): `_CheckboxBase1`

## Component: Checkbox  (90 variants)

| Prop | Values / default |
|---|---|
| Checked | True \| False |
| Indeterminate | False \| True |
| State | Default \| Pressed \| Focused \| Read-only \| Disabled |
| Size | Medium \| Small \| x Small |
| Style | Brand \| Neutral |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| Medium | 24x24  |
| Small | 20x20  |
| x Small | 16x16  |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| False/False/Default/Brand |  |
| False/False/Default/Neutral |  |
| True/False/Default/Brand | ic:icon-oncolor |
| True/False/Default/Neutral | ic:icon-oncolor |
| True/True/Default/Brand | ic:icon-oncolor |
| True/True/Default/Neutral | ic:icon-oncolor |
| False/False/Pressed/Brand |  |
| False/False/Pressed/Neutral |  |
| True/False/Pressed/Brand | ic:icon-oncolor |
| True/False/Pressed/Neutral | ic:icon-oncolor |
| True/True/Pressed/Brand | ic:icon-oncolor |
| True/True/Pressed/Neutral | ic:icon-oncolor |
| False/False/Focused/Brand |  |
| False/False/Focused/Neutral |  |
| True/False/Focused/Brand | ic:icon-oncolor |
| True/False/Focused/Neutral | ic:icon-oncolor |
| True/True/Focused/Brand | ic:icon-oncolor |
| True/True/Focused/Neutral | ic:icon-oncolor |
| False/False/Read-only/Brand |  |
| False/False/Read-only/Neutral |  |
| True/False/Read-only/Brand | ic:control-primary-checked |
| True/False/Read-only/Neutral | ic:control-neutral-checked |
| True/True/Read-only/Brand | ic:control-primary-checked |
| True/True/Read-only/Neutral | ic:control-neutral-checked |
| False/False/Disabled/Brand |  |
| False/False/Disabled/Neutral |  |
| True/False/Disabled/Brand | ic:icon-oncolor |
| True/False/Disabled/Neutral | ic:icon-oncolor |
| True/True/Disabled/Brand | ic:icon-oncolor |
| True/True/Disabled/Neutral | ic:icon-oncolor |

## Component: Checkbox Label  (2 variants)

| Prop | Values / default |
|---|---|
| Helper Text | B:true |
| Alert message | B:true |
| Label EN | T:Checkbox Label |
| Helper Text EN | T:When a selection needs a |
| Alert Message EN | T:Error/Warning message |
| Label AR | T:عنوان اختيار متعدد |
| Helper Text AR | T:يكتب المحتوى الإضافي هنا |
| Alert Message AR | T:رسالة خطأ أو تحذير |
| Hitbox focus ring | B:false |
| RTL | True \| False |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| - | 382x96 V p0/0/0/0 g0 r4=radius-sm |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| - | fg:text-primary ic:icon-error ts:Text md/Medium |
