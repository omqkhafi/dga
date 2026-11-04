# File upload (mobile)

Source: Figma mobile file `Ci0aNw48DSdp7MsRw0U1nA`, page "File upload". All values below are read from Figma component variants (LTR variants; RTL variants mirror them). Token names are Figma variable names (last segment); see `tokens.css`.

## Usage (plain language)

_No description is given in Figma for this component; usage guidance not stated in source._

Internal sub-parts (not used directly): `_Drop Zone`, `_File`

## Component: File Upload / Multiple  (2 variants)

| Prop | Values / default |
|---|---|
| File 2 | B:true |
| File 3 | B:true |
| Uploaded | B:true |
| RTL | False \| True |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| - | 328x376 V p0/0/0/0 g16 gap=spacing-xl |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| - | fg:text-display ic:icon-default ts:Text md/Regular |

## Component: File Upload / Single  (6 variants)

| Prop | Values / default |
|---|---|
| Show Helper Text | B:true |
| Helper Text  | T:Maximum file size allowe |
| RTL | True \| False |
| State | Default \| Disabled \| Uploaded |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| - | 326x116 V p0/0/0/0 g16 gap=spacing-xl |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| Default | fg:field-text-label ts:Text md/Regular |
| Disabled | fg:text-default-disabled ts:Text md/Regular |
| Uploaded | fg:field-text-label ic:background-white ts:Text md/Regular |
