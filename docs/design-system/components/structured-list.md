# Structured List (web)

Source: Figma web file `trJvYAeN2wdayn2VdSUR2N`, page "Structured List". All values below are read from Figma component variants (LTR variants; RTL variants mirror them). Token names are Figma variable names (last segment); see `tokens.css`.

## Usage (plain language)

_No description is given in Figma for this component; usage guidance not stated in source._

## Component: Structured List Header Cell  (2 variants)

| Prop | Values / default |
|---|---|
| Column divider | B:true |
| Label EN | T:Row |
| Icon | B:false |
| Help Icon | B:false |
| Row Divider | B:true |
| Label AR | T:عمود |
| RTL | No \| Yes |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| - | 228x48 H p0/16/0/16 g8 pad-x=spacing-xl |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| - | fg:table-text-head ts:Text xs/Medium |

## Component: Structured List Row Cell  (36 variants)

| Prop | Values / default |
|---|---|
| Column Divider | B:true |
| Label EN | T:Row |
| Row Divider | B:true |
| Lable AR | T:صف |
| RTL | No \| Yes |
| State | Default \| Default (Selectable) \| Hovered (Selectable) \| Focused (Selectable) \| Disabled (Selectable) |
| Compact | No \| Yes |
| Selectable | No \| Yes |
| Selected | No \| Yes |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| - | 228x64 H p8/16/8/16 g8 pad-y=table-cell-v-padding pad-x=table-cell-h-padding gap=table-cell-gap |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| Default/No/No/No | fg:table-text-body ts:Text md/Regular |
| Default (Selectable)/No/Yes/No | fg:table-text-body ts:Text md/Regular |
| Default (Selectable)/Yes/Yes/No | fg:table-text-body ts:Text md/Regular |
| Hovered (Selectable)/No/Yes/No | bg:table-background-hover-selected fg:table-text-body ts:Text md/Regular |
| Hovered (Selectable)/No/Yes/Yes | bg:table-background-hover-selected fg:table-text-body ic:icon-oncolor ts:Text md/Regular |
| Hovered (Selectable)/Yes/Yes/Yes | bg:table-background-hover-selected fg:table-text-body ic:icon-oncolor ts:Text md/Regular |
| Hovered (Selectable)/Yes/Yes/No | bg:table-background-hover-selected fg:table-text-body ts:Text md/Regular |
| Focused (Selectable)/No/Yes/No | bd:table-cell-border-inverse fg:table-text-body ts:Text md/Regular |
| Focused (Selectable)/No/Yes/Yes | bd:table-cell-border-inverse fg:table-text-body ic:icon-oncolor ts:Text md/Regular |
| Focused (Selectable)/Yes/Yes/Yes | bd:table-cell-border-inverse fg:table-text-body ic:icon-oncolor ts:Text md/Regular |
| Focused (Selectable)/Yes/Yes/No | bd:table-cell-border-inverse fg:table-text-body ts:Text md/Regular |
| Disabled (Selectable)/No/Yes/No | bg:table-background-disabled fg:table-text-disabled ts:Text md/Regular |
| Disabled (Selectable)/No/Yes/Yes | bg:table-background-disabled fg:table-text-disabled ic:icon-oncolor ts:Text md/Regular |
| Disabled (Selectable)/Yes/Yes/Yes | bg:table-background-disabled fg:table-text-disabled ic:icon-oncolor ts:Text md/Regular |
| Disabled (Selectable)/Yes/Yes/No | bg:table-background-disabled fg:table-text-disabled ts:Text md/Regular |
| Default (Selectable)/No/Yes/Yes | fg:table-text-body ic:icon-oncolor ts:Text md/Regular |
| Default (Selectable)/Yes/Yes/Yes | fg:table-text-body ic:icon-oncolor ts:Text md/Regular |
| Default/Yes/No/No | fg:table-text-body ts:Text md/Regular |

## Component: Structured List Header  (2 variants)

| Prop | Values / default |
|---|---|
| RTL | No \| Yes |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| - | 684x48 H p0/0/0/0 g0 |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| - | fg:table-text-head ts:Text xs/Medium |

## Component: Structured List Row  (4 variants)

| Prop | Values / default |
|---|---|
| RTL | No \| Yes |
| Compact | No \| Yes |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| - | 684x64 H p0/0/0/0 g0 |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| No | fg:table-text-body ts:Text md/Regular |
| Yes | fg:table-text-body ts:Text md/Regular |

## Component: Structured List  (64 variants)

| Prop | Values / default |
|---|---|
| RTL | Yes \| No |
| Compact | No \| Yes |
| Contained | No \| Yes |
| Row divider | Yes \| No |
| Col divider | Yes \| No |
| Selectable | No \| Yes |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| - | 684x304 V p0/0/0/0 g0 |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| No/No/Yes/Yes/No | fg:table-text-head ts:Text xs/Medium |
| No/No/Yes/Yes/Yes | fg:table-text-head ts:Text xs/Medium |
| No/No/Yes/No/No | fg:table-text-head ts:Text xs/Medium |
| No/No/Yes/No/Yes | fg:table-text-head ts:Text xs/Medium |
| No/No/No/Yes/No | fg:table-text-head ts:Text xs/Medium |
| No/No/No/Yes/Yes | fg:table-text-head ts:Text xs/Medium |
| No/No/No/No/No | fg:table-text-head ts:Text xs/Medium |
| No/No/No/No/Yes | fg:table-text-head ts:Text xs/Medium |
| No/Yes/Yes/Yes/No | bd:table-cell-border fg:table-text-head ts:Text xs/Medium |
| No/Yes/Yes/Yes/Yes | bd:table-cell-border fg:table-text-head ts:Text xs/Medium |
| No/Yes/Yes/No/No | bd:table-cell-border fg:table-text-head ts:Text xs/Medium |
| No/Yes/Yes/No/Yes | bd:table-cell-border fg:table-text-head ts:Text xs/Medium |
| No/Yes/No/Yes/No | bd:table-cell-border fg:table-text-head ts:Text xs/Medium |
| No/Yes/No/Yes/Yes | bd:table-cell-border fg:table-text-head ts:Text xs/Medium |
| No/Yes/No/No/No | bd:table-cell-border fg:table-text-head ts:Text xs/Medium |
| No/Yes/No/No/Yes | bd:table-cell-border fg:table-text-head ts:Text xs/Medium |
| Yes/No/Yes/Yes/No | fg:table-text-head ts:Text xs/Medium |
| Yes/No/Yes/Yes/Yes | fg:table-text-head ts:Text xs/Medium |
| Yes/No/Yes/No/No | fg:table-text-head ts:Text xs/Medium |
| Yes/No/Yes/No/Yes | fg:table-text-head ts:Text xs/Medium |
| Yes/No/No/Yes/No | fg:table-text-head ts:Text xs/Medium |
| Yes/No/No/Yes/Yes | fg:table-text-head ts:Text xs/Medium |
| Yes/No/No/No/No | fg:table-text-head ts:Text xs/Medium |
| Yes/No/No/No/Yes | fg:table-text-head ts:Text xs/Medium |
| Yes/Yes/Yes/Yes/No | bd:table-cell-border fg:table-text-head ts:Text xs/Medium |
| Yes/Yes/Yes/Yes/Yes | bd:table-cell-border fg:table-text-head ts:Text xs/Medium |
| Yes/Yes/Yes/No/No | bd:table-cell-border fg:table-text-head ts:Text xs/Medium |
| Yes/Yes/Yes/No/Yes | bd:table-cell-border fg:table-text-head ts:Text xs/Medium |
| Yes/Yes/No/Yes/No | bd:table-cell-border fg:table-text-head ts:Text xs/Medium |
| Yes/Yes/No/Yes/Yes | bd:table-cell-border fg:table-text-head ts:Text xs/Medium |
| Yes/Yes/No/No/No | bd:table-cell-border fg:table-text-head ts:Text xs/Medium |
| Yes/Yes/No/No/Yes | bd:table-cell-border fg:table-text-head ts:Text xs/Medium |
