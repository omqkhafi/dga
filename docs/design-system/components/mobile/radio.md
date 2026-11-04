# Radio (mobile)

Source: Figma mobile file `Ci0aNw48DSdp7MsRw0U1nA`, page "Radio". All values below are read from Figma component variants (LTR variants; RTL variants mirror them). Token names are Figma variable names (last segment); see `tokens.css`.

## Usage (plain language)

_No description is given in Figma for this component; usage guidance not stated in source._

Internal sub-parts (not used directly): `_RadioBase`

## Component: Radio label  (2 variants)

| Prop | Values / default |
|---|---|
| Label EN | T:Radio Label |
| Label AR | T:عنوان اختيار مفرد |
| Helper Text EN | T:When a selection needs a |
| Helper Text AR | T:يكتب المحتوى الإضافي هنا |
| Show Alert message | B:true |
| Alert Message EN | T:Error/Warning message |
| Alert Message AR | T:رسالة خطأ أو تحذير |
| RTL | False \| True |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| - | 382x112 V p0/0/0/0 g0 r4=radius-sm |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| - | fg:text-display ic:icon-error ts:Text md/Medium |

## Component: Radio  (20 variants)

| Prop | Values / default |
|---|---|
| Selected | False \| True |
| Style | Neutral \| Brand |
| State | Default \| Pressed \| Focused \| Read-only \| Disabled |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| - | 32x32 V p0/0/0/0 g0 r4=radius-sm |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| False/Neutral/Default |  |
| False/Neutral/Pressed |  |
| False/Neutral/Focused | bd:border-black |
| False/Neutral/Read-only |  |
| False/Neutral/Disabled |  |
| False/Brand/Default |  |
| False/Brand/Pressed |  |
| False/Brand/Focused | bd:border-black |
| False/Brand/Read-only |  |
| False/Brand/Disabled |  |
| True/Neutral/Default |  |
| True/Neutral/Pressed |  |
| True/Neutral/Focused | bd:border-black |
| True/Neutral/Read-only |  |
| True/Neutral/Disabled |  |
| True/Brand/Default |  |
| True/Brand/Pressed |  |
| True/Brand/Focused | bd:border-black |
| True/Brand/Read-only |  |
| True/Brand/Disabled |  |
