# UI Shell - Second Level Nav Header (web)

Source: Figma web file `trJvYAeN2wdayn2VdSUR2N`, page "UI Shell - Second Level Nav Header". All values below are read from Figma component variants (LTR variants; RTL variants mirror them). Token names are Figma variable names (last segment); see `tokens.css`.

## Usage (plain language)

The Second Nav Header component is a secondary navigation bar that appears above the primary navigation and offers additional controls or context-based information.

## Component: Second Nav Header  (4 variants)

| Prop | Values / default |
|---|---|
| Show Action 3 | B:true |
| Show Divider | B:true |
| Show Item 3 | B:true |
| Show Item 2 | B:true |
| Show Content | B:true |
| Show Actions | B:true |
| Show Action 2 | B:true |
| Show Action 4 | B:true |
| Show Item 4 | B:true |
| RTL | No \| Yes |
| Style | Gray \| Primary |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| - | 1440x40 V p0/32/0/32 g0 pad-x=spacing-4xl |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| Gray | bg:background-neutral-100 fg:text-primary-paragraph ic:icon-neutral ts:Text md/Regular |
| Primary | bg:background-primary fg:text-oncolor-primary ic:icon-oncolor ts:Text md/Regular |

## Component: sub-header-Item  (4 variants)

The Sub-Header Item is used to display contextual details like date, time, and location.

| Prop | Values / default |
|---|---|
| Swap icon  | I:18738:4314 |
| Text EN | T:Cloudy |
| Text AR | T:غائم |
| RTL | Yes \| No |
| Style | Default \| On-color |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| - | 78x24 H p0/0/0/0 g4 gap=spacing-xs |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| Default | fg:text-primary-paragraph ic:icon-neutral ts:Text md/Regular |
| On-color | fg:text-oncolor-primary ic:icon-oncolor ts:Text md/Regular |
