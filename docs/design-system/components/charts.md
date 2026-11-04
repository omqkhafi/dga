# Charts (web)

Source: Figma web file `trJvYAeN2wdayn2VdSUR2N`, page "Charts". All values below are read from Figma component variants (LTR variants; RTL variants mirror them). Token names are Figma variable names (last segment); see `tokens.css`.

## Usage (plain language)

_No description is given in Figma for this component; usage guidance not stated in source._

Internal sub-parts (not used directly): `_Y-axis line`, `_Y-axis`, `_Line Chart`, `_Legend`, `_Mark`, `_X-axis label`, `_Y-axis label`, `_Bar Chart`, `_X-axis`

## Component: Pie Chart  (48 variants)

| Prop | Values / default |
|---|---|
| Show Data | B:true |
| RTL | No \| Yes |
| Pie Chart | Series 1 \| Series 2 \| Series3 \| Series 4 \| Series 5 \| Series 6 |
| Hole | False \| True |
| Style Color | Brand \| Color |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| - | 500x284 V p0/0/0/0 g24 gap=spacing-3xl |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| Series 2/True/Brand | fg:text-primary-paragraph ts:Text sm/Regular |
| Series 2/True/Color | fg:text-primary-paragraph ts:Text sm/Regular |
| Series 2/False/Brand | fg:text-primary-paragraph ts:Text sm/Regular |
| Series 2/False/Color | fg:text-primary-paragraph ts:Text sm/Regular |
| Series 5/True/Brand | fg:text-primary-paragraph ts:Text sm/Regular |
| Series 5/True/Color | fg:text-primary-paragraph ts:Text sm/Regular |
| Series 5/False/Brand | fg:text-primary-paragraph ts:Text sm/Regular |
| Series 5/False/Color | fg:text-primary-paragraph ts:Text sm/Regular |
| Series3/True/Brand | fg:text-primary-paragraph ts:Text sm/Regular |
| Series3/True/Color | fg:text-primary-paragraph ts:Text sm/Regular |
| Series3/False/Brand | fg:text-primary-paragraph ts:Text sm/Regular |
| Series3/False/Color | fg:text-primary-paragraph ts:Text sm/Regular |
| Series 6/True/Brand | fg:text-primary-paragraph ts:Text sm/Regular |
| Series 6/True/Color | fg:text-primary-paragraph ts:Text sm/Regular |
| Series 6/False/Brand | fg:text-primary-paragraph ts:Text sm/Regular |
| Series 6/False/Color | fg:text-primary-paragraph ts:Text sm/Regular |
| Series 1/True/Brand | fg:text-primary-paragraph ts:Text sm/Regular |
| Series 1/True/Color | fg:text-primary-paragraph ts:Text sm/Regular |
| Series 1/False/Brand | fg:text-primary-paragraph ts:Text sm/Regular |
| Series 1/False/Color | fg:text-primary-paragraph ts:Text sm/Regular |
| Series 4/True/Brand | fg:text-primary-paragraph ts:Text sm/Regular |
| Series 4/True/Color | fg:text-primary-paragraph ts:Text sm/Regular |
| Series 4/False/Brand | fg:text-primary-paragraph ts:Text sm/Regular |
| Series 4/False/Color | fg:text-primary-paragraph ts:Text sm/Regular |

## Component: Line Chart  (2 variants)

| Prop | Values / default |
|---|---|
| Show _X-axis label | B:true |
| Show _Y-axis label | B:true |
| Show _Legend | B:true |
| Show Content | B:true |
| RTL | False \| True |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| - | 512x277 V p0/0/0/0 g0 |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| - | fg:text-primary-paragraph ic:background-SA-Flag ts:Text sm/Regular |

## Component: Bar Chart  (2 variants)

| Prop | Values / default |
|---|---|
| Show _Legend | B:true |
| Show _X-axis label | B:true |
| Show _Y-axis label | B:true |
| RTL | True \| False |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| - | 515x239 V p0/0/0/0 g0 |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| - | fg:text-primary-paragraph ic:background-neutral-200 ts:Text sm/Regular |
