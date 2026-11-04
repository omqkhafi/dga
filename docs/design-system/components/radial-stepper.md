# Radial Stepper (web)

Source: Figma web file `trJvYAeN2wdayn2VdSUR2N`, page "Radial Stepper". All values below are read from Figma component variants (LTR variants; RTL variants mirror them). Token names are Figma variable names (last segment); see `tokens.css`.

## Usage (plain language)

_No description is given in Figma for this component; usage guidance not stated in source._

## Component: Radial Stepper  (30 variants)

| Prop | Values / default |
|---|---|
| Show Step Name | B:true |
| Show Description | B:true |
| Step Description EN | T:this is step description |
| Step Description AR | T:وصف الخطوة |
| Step Name EN | T:Step One |
| Step Name AR | T:الخطوة الأولى |
| Show Pre Step | B:false |
| Show Next Step | B:true |
| Pre Step Name EN | T:Previous: |
| Next Step Name EN | T:Next: |
| Pre Step Name AR | T:السابق: |
| Next Step Name AR | T:التالي: |
| RTL | False \| True |
| Size | 120px \| 40px \| 48px \| 64px \| 80px |
| Style | Primary \| Neutral |
| On-Color | True \| False |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| 64px | 210x64 H p0/0/0/0 g8 gap=spacing-md |
| 48px | 194x64 H p0/0/0/0 g8 gap=spacing-md |
| 40px | 165x54 H p0/0/0/0 g8 gap=spacing-md |
| 80px | 246x80 H p0/0/0/0 g8 gap=spacing-md |
| 120px | 286x120 H p0/0/0/0 g8 gap=spacing-md |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| Primary/False | fg:text-primary-paragraph ts:Text sm/Bold |
| Primary/True | fg:text-oncolor-primary ts:Text sm/Bold |
| Neutral/False | fg:text-primary-paragraph ts:Text sm/Bold |

## Component: Circular Stepper  (120 variants)

| Prop | Values / default |
|---|---|
|  Text Step 4 EN | T:4 of 4 |
| Show Text | B:true |
| Text Step 1 EN | T:1 of 4 |
| Text Step 2 EN | T:2 of 4 |
| Text Step 3 EN | T:3 of 4 |
| Text Step 1 AR | T:1 من 4 |
| Text Step 2 AR | T:2 من 4 |
| Text Step 3 AR | T:3 من 4 |
| Text Step 4 AR | T:4 من 4 |
| RTL | No \| Yes |
| Style | Primary \| Neutral \| On-Color |
| Indicator | 1 of 4 \| 2 of 4 \| 3 of 4 \| 4 of 4 |
| Size | 40px \| 48px \| 64px \| 80px \| 120px |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| 40px | 40x40  |
| 48px | 48x48  |
| 64px | 64x64  |
| 80px | 80x80  |
| 120px | 120x120  |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| Primary/1 of 4 | fg:text-primary-paragraph |
| On-Color/1 of 4 | fg:text-oncolor-primary |
| Neutral/1 of 4 | fg:text-primary-paragraph |
| Primary/2 of 4 | fg:text-primary-paragraph |
| On-Color/2 of 4 | fg:text-oncolor-primary |
| Neutral/2 of 4 | fg:text-primary-paragraph |
| Primary/3 of 4 | fg:text-primary-paragraph |
| On-Color/3 of 4 | fg:text-oncolor-primary |
| Neutral/3 of 4 | fg:text-primary-paragraph |
| Primary/4 of 4 | fg:text-primary-paragraph |
| On-Color/4 of 4 | fg:text-oncolor-primary |
| Neutral/4 of 4 | fg:text-primary-paragraph |
