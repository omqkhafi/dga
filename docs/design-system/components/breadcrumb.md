# Breadcrumb (web)

Source: Figma web file `trJvYAeN2wdayn2VdSUR2N`, page "Breadcrumb". All values below are read from Figma component variants (LTR variants; RTL variants mirror them). Token names are Figma variable names (last segment); see `tokens.css`.

## Usage (plain language)

Breadcrumb navigation is a user interface element that enhances user orientation within a website or application. It outlines a pathway, showing how the current page fits into the overall site hierarchy. This feature improves usability by enabling users to backtrack to more general pages seamlessly.

Internal sub-parts (not used directly): `_Breadcrumb Item`

## Component: Breadcrumb  (10 variants)

| Prop | Values / default |
|---|---|
| RTL | False \| True |
| Levels | 2 \| 3 \| 4 \| 5 \| >5 |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| - | 80x20 H p0/0/0/0 g0 pad-y=spacing-none pad-x=spacing-none gap=spacing-none |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| 2 | fg:link-neutral ic:icon-default-400 ts:Text sm/Regular |
| 3 | fg:link-neutral ic:icon-default-400 ts:Text sm/Regular |
| 4 | fg:link-neutral ic:icon-default-400 ts:Text sm/Regular |
| 5 | fg:link-neutral ic:icon-default-400 ts:Text sm/Regular |
| >5 | fg:link-neutral ic:icon-default-400 ts:Text sm/Regular |
