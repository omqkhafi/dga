# Menu (mobile)

Source: Figma mobile file `Ci0aNw48DSdp7MsRw0U1nA`, page "Menu". All values below are read from Figma component variants (LTR variants; RTL variants mirror them). Token names are Figma variable names (last segment); see `tokens.css`.

## Usage (plain language)

_No description is given in Figma for this component; usage guidance not stated in source._

## Component: Menu list item  (48 variants)

| Prop | Values / default |
|---|---|
| Lead Icon | B:true |
| 🔁 Lead icon | I:10750:73533 |
| Trail text | B:true |
| Label EN | T:Item Lebel |
| trail text | T:+99 |
| 🔁 Trail Icon | I:3463:404964 |
| Label AR | T:نص العنصر |
| RTL | False \| True |
| Trail element | None \| Text \| Button \| Tag \| Switch \| Icon |
| State | Default \| Pressed \| Focused \| Disabled |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| - | 225x40 H p8/8/8/8 g8 pad-y=spacing-md pad-x=spacing-md gap=spacing-md r4=radius-sm |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| None/Default | fg:text-default ic:icon-default ts:Text md/Regular |
| Text/Default | fg:text-default ic:icon-default ts:Text md/Regular |
| Icon/Default | fg:text-default ic:icon-default ts:Text md/Regular |
| Button/Default | fg:text-default ic:icon-default ts:Text md/Regular |
| Tag/Default | fg:text-default ic:icon-default ts:Text md/Regular |
| Switch/Default | fg:text-default ic:icon-default ts:Text md/Regular |
| None/Pressed | bg:button-background-neutral-pressed fg:text-default ic:icon-default ts:Text md/Regular |
| Text/Pressed | bg:button-background-neutral-pressed fg:text-default ic:icon-default ts:Text md/Regular |
| Icon/Pressed | bg:button-background-neutral-pressed fg:text-default ic:icon-default ts:Text md/Regular |
| Button/Pressed | fg:text-default ic:icon-default ts:Text md/Regular |
| Tag/Pressed | bg:button-background-neutral-pressed fg:text-default ic:icon-default ts:Text md/Regular |
| Switch/Pressed | bg:button-background-neutral-pressed fg:text-default ic:icon-default ts:Text md/Regular |
| None/Focused | bd:border-black fg:text-default ic:icon-default ts:Text md/Regular |
| Text/Focused | bd:border-black fg:text-default ic:icon-default ts:Text md/Regular |
| Icon/Focused | bd:border-black fg:text-default ic:icon-default ts:Text md/Regular |
| Button/Focused | fg:text-default ic:icon-default ts:Text md/Regular |
| Tag/Focused | bd:border-black fg:text-default ic:icon-default ts:Text md/Regular |
| Switch/Focused | bd:border-black fg:text-default ic:icon-default ts:Text md/Regular |
| None/Disabled | fg:text-default-disabled ic:icon-default-disabled ts:Text md/Regular |
| Text/Disabled | fg:text-default-disabled ic:icon-default-disabled ts:Text md/Regular |
| Icon/Disabled | fg:text-default-disabled ic:icon-default-disabled ts:Text md/Regular |
| Button/Disabled | fg:text-default-disabled ic:icon-default-disabled ts:Text md/Regular |
| Tag/Disabled | fg:text-default-disabled ic:icon-default-disabled ts:Text md/Regular |
| Switch/Disabled | fg:text-default-disabled ic:icon-default-disabled ts:Text md/Regular |

## Component: Menu  (2 variants)

| Prop | Values / default |
|---|---|
| RTL | False \| True |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| - | 241x596 V p0/0/0/0 g0 r8=8 sw1 |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| - | bg:white bd:border-default fg:text-quarterary ic:icon-default |

## Component: Toggle  (4 variants)

| Prop | Values / default |
|---|---|
| State | Off \| On |
| Mode | Dark \| Light |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| - | 51x31 r100 |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| Off/Dark | bg:#787880@0.32 |
| On/Dark | bg:#30d158 |
| Off/Light | bg:#787880@0.16 |
| On/Light | bg:#34c759 |
