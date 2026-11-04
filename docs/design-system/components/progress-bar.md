# Progress Bar (web)

Source: Figma web file `trJvYAeN2wdayn2VdSUR2N`, page "Progress Bar". All values below are read from Figma component variants (LTR variants; RTL variants mirror them). Token names are Figma variable names (last segment); see `tokens.css`.

## Usage (plain language)

A Circular Progress Bar is a circular visual element that represents progress as a circle.

## Component: Circular Progress Bar  (40 variants)

| Prop | Values / default |
|---|---|
| Text EN | T:Active users  |
| Percentage | T:50% |
| Show Text | B:true |
| Text AR | T:مستخدم نشط |
| RTL | No \| Yes |
| Size | 200px \| 160px \| 120px \| 80px \| 64px |
| Style | Primary \| Neutral \| Success \| Error |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| 64px | 64x64  |
| 80px | 80x80  |
| 120px | 120x120  |
| 160px | 160x160  |
| 200px | 200x200  |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| Primary | fg:text-primary-paragraph ts:Text sm/Bold |
| Neutral | fg:text-primary-paragraph ts:Text sm/Bold |
| Success | ic:icon-oncolor |
| Error | ic:icon-oncolor |

## Component: Progress Bar  (48 variants)

A progress bar is a visual representation used to indicate the progress of a task or process, such as a file download, data processing, or form submission.

| Prop | Values / default |
|---|---|
| Helper Text | B:true |
| Show label | B:true |
| RTL | No \| Yes |
| Size | Small \| Medium \| Large |
| Style | Primary \| Neutral |
| Percentage | 20% \| 50% \| 100% - Success \| 0% - Error |
| Error | Yes \| No |
| Success | Yes \| No |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| Small | 320x50 V p0/0/0/0 g4 gap=spacing-xs |
| Medium | 320x56 V p0/0/0/0 g4 gap=spacing-xs |
| Large | 320x68 V p0/0/0/0 g4 gap=spacing-xs |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| Primary/100% - Success/No/Yes | fg:field-text-label ic:icon-oncolor ts:Text sm/Regular |
| Neutral/100% - Success/No/Yes | fg:field-text-label ic:icon-oncolor ts:Text sm/Regular |
| Neutral/0% - Error/Yes/No | fg:field-text-label ic:icon-oncolor ts:Text sm/Regular |
| Primary/0% - Error/Yes/No | fg:field-text-label ic:icon-oncolor ts:Text sm/Regular |
| Primary/20%/No/No | fg:field-text-label ic:icon-neutral ts:Text sm/Regular |
| Primary/50%/No/No | fg:field-text-label ic:icon-neutral ts:Text sm/Regular |
| Neutral/20%/No/No | fg:field-text-label ic:icon-neutral ts:Text sm/Regular |
| Neutral/50%/No/No | fg:field-text-label ic:icon-neutral ts:Text sm/Regular |
