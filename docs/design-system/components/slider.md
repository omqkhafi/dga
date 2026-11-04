# Slider (web)

Source: Figma web file `trJvYAeN2wdayn2VdSUR2N`, page "Slider". All values below are read from Figma component variants (LTR variants; RTL variants mirror them). Token names are Figma variable names (last segment); see `tokens.css`.

## Usage (plain language)

A slider allows users to select a value or range of values by dragging a handle along a track.

## Component: Slider  (24 variants)

| Prop | Values / default |
|---|---|
| Show Lable | B:true |
| Show Helper Text | B:true |
| Helper Text | B:true |
| Size | Small \| Medium |
| Persentage | 0 \| 20 \| 50 \| 100 \| 0 - 50 \| 20 - 70 |
| Range | No \| Yes |
| RTL | No \| Yes |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| Small | 341x64 V p0/0/0/0 g4 gap=spacing-xs |
| Medium | 341x70 V p0/0/0/0 g4 gap=spacing-xs |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| 20/No | fg:field-text-label ic:icon-neutral ts:Text sm/Regular |
| 0 - 50/Yes | fg:field-text-label ic:icon-neutral ts:Text sm/Regular |
| 20 - 70/Yes | fg:field-text-label ic:icon-neutral ts:Text sm/Regular |
| 0/No | fg:field-text-label ic:icon-neutral ts:Text sm/Regular |
| 50/No | fg:field-text-label ic:icon-neutral ts:Text sm/Regular |
| 100/No | fg:field-text-label ic:icon-neutral ts:Text sm/Regular |
