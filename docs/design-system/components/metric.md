# Metric (web)

Source: Figma web file `trJvYAeN2wdayn2VdSUR2N`, page "Metric". All values below are read from Figma component variants (LTR variants; RTL variants mirror them). Token names are Figma variable names (last segment); see `tokens.css`.

## Usage (plain language)

A metric component is often used in dashboards or reports to highlight trends, comparisons, and numerical values that are critical to monitoring performance over time.

Internal sub-parts (not used directly): `_Small Chart`, `_Large Chart`, `_Change`

## Component: Metric  (4 variants)

| Prop | Values / default |
|---|---|
| Swap Featured Icon | I:31864:190026 |
| Show Featured icon | B:true |
| Percentage | T:50% |
| Show Text | B:true |
| Show Actions | B:true |
| Show Secondary Action | B:true |
| Show Chart | B:true |
| Show More Button | B:true |
| Label EN | T:24h Views |
| Label AR | T:المشاهدات خلال 24س |
| Show _Change | B:true |
| Show Info | B:true |
| Text AR | T:مقارنة بالشهر الماضي |
| Text EN | T:vs last month |
| RTL | False \| True |
| Style | Small Chart \| Large Chart |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| - | 360x241 V p16/16/16/16 g24 pad-y=spacing-xl pad-x=spacing-xl gap=card-lg-gap r16=radius-lg |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| Small Chart | bg:background-card fg:text-primary-paragraph ic:icon-success ts:Text sm/Medium fx:shadow-md |
| Large Chart | bg:background-card fg:text-primary-paragraph ic:icon-success ts:Text sm/Medium fx:shadow-md |
