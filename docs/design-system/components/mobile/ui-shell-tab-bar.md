# UI Shell - Tab Bar (mobile)

Source: Figma mobile file `Ci0aNw48DSdp7MsRw0U1nA`, page "UI Shell - Tab Bar". All values below are read from Figma component variants (LTR variants; RTL variants mirror them). Token names are Figma variable names (last segment); see `tokens.css`.

## Usage (plain language)

_No description is given in Figma for this component; usage guidance not stated in source._

## Component: Tab Item  (12 variants)

| Prop | Values / default |
|---|---|
| Show Tag | B:false |
| Text EN | T:Tab 1 |
| Icon | I:10750:75655 |
| Text AR | T:تبويب 1 |
| RTL | False \| True |
| State | Normal \| Pressed \| Selected |
| Type | Tab Bar Item |
| OnColor | False \| True |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| Tab Bar Item | 46x70 V p12/8/12/8 g4 pad-y=spacing-lg pad-x=spacing-md gap=spacing-xs |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| Normal/Tab Bar Item/False | fg:text-secondary-paragraph ic:icon-default-500 ts:Text xs/Medium |
| Normal/Tab Bar Item/True | fg:alpha-white-50 ic:alpha-white-50 ts:Text xs/Medium |
| Pressed/Tab Bar Item/False | fg:text-primary ic:icon-primary ts:Text xs/Medium |
| Pressed/Tab Bar Item/True | fg:alpha-white-70 ic:alpha-white-70 ts:Text xs/Medium |
| Selected/Tab Bar Item/False | bd:border-primary fg:text-primary ic:icon-primary ts:Text xs/Medium |
| Selected/Tab Bar Item/True | bd:border-background-white fg:text-oncolor-primary ic:icon-oncolor ts:Text xs/Medium |

## Component: Tab Bar  (24 variants)

| Prop | Values / default |
|---|---|
| RTL | False \| True |
| Type | No Selected \| Tab 1 \| Tab 2 \| Tab 3 \| Tab 4 \| Tab 5 |
| OnColor | True \| False |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| Tab 1 | 375x84 H p0/4/8/4 g10 pad-x=spacing-xs swmixed |
| No Selected | 375x84 H p0/4/8/4 g10 pad-x=spacing-xs swmixed |
| Tab 2 | 375x84 H p0/4/8/4 g10 pad-x=spacing-xs swmixed |
| Tab 3 | 375x84 H p0/4/8/4 g10 pad-x=spacing-xs swmixed |
| Tab 4 | 375x84 H p0/4/8/4 g10 pad-x=spacing-xs swmixed |
| Tab 5 | 375x84 H p0/4/8/4 g10 pad-x=spacing-xs swmixed |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| Tab 1/True | bg:background-primary bd:background-primary fg:text-oncolor-primary ic:icon-oncolor ts:Text xs/Medium |
| Tab 1/False | bg:background-white bd:border-neutral-secondary fg:text-primary ic:icon-primary ts:Text xs/Medium |
| No Selected/True | bg:background-primary bd:background-primary fg:alpha-white-50 ic:alpha-white-50 ts:Text xs/Medium |
| No Selected/False | bg:background-white bd:border-neutral-secondary fg:text-secondary-paragraph ic:icon-default-500 ts:Text xs/Medium |
| Tab 2/True | bg:background-primary bd:background-primary fg:alpha-white-50 ic:alpha-white-50 ts:Text xs/Medium |
| Tab 2/False | bg:background-white bd:border-neutral-secondary fg:text-secondary-paragraph ic:icon-default-500 ts:Text xs/Medium |
| Tab 3/True | bg:background-primary bd:background-primary fg:alpha-white-50 ic:alpha-white-50 ts:Text xs/Medium |
| Tab 3/False | bg:background-white bd:border-neutral-secondary fg:text-secondary-paragraph ic:icon-default-500 ts:Text xs/Medium |
| Tab 4/True | bg:background-primary bd:background-primary fg:alpha-white-50 ic:alpha-white-50 ts:Text xs/Medium |
| Tab 4/False | bg:background-white bd:border-neutral-secondary fg:text-secondary-paragraph ic:icon-default-500 ts:Text xs/Medium |
| Tab 5/True | bg:background-primary bd:background-primary fg:alpha-white-50 ic:alpha-white-50 ts:Text xs/Medium |
| Tab 5/False | bg:background-white bd:border-neutral-secondary fg:text-secondary-paragraph ic:icon-default-500 ts:Text xs/Medium |

## Component: Positioned  (3 variants)

| Prop | Values / default |
|---|---|
| Type | Small \| Large \| Large with max digits |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| Large | 16x16  |
| Small | 12x12  |
| Large with max digits | 30x16 H p0/4/0/4 g0 pad-x=df-space-1x r8 |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| Large | fg:text-primary_on-color ts:Text xs/Semibold |
| Small |  |
| Large with max digits | bg:tag-background-error fg:text-primary_on-color ts:Text xs/Semibold |
