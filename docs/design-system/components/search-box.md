# Search Box (web)

Source: Figma web file `trJvYAeN2wdayn2VdSUR2N`, page "Search Box". All values below are read from Figma component variants (LTR variants; RTL variants mirror them). Token names are Figma variable names (last segment); see `tokens.css`.

## Usage (plain language)

The Search Box component allows users to input queries and find relevant results within an application or website.

## Component: Search Box  (144 variants)

| Prop | Values / default |
|---|---|
| Icon | B:true |
| 🔁 Swap Helper Icon | I:31864:189863 |
| Text ENG | T:Search |
| Text AR | T:بحث |
| Show label | B:true |
| Show Helper Text | B:true |
| Helper Text Eng | T:Help Text |
| Helper text AR | T:نص مساعد |
| Show Trailing Icon | B:true |
| RTL | False \| True |
| State | Default \| Hovered \| Pressed \| Focused \| Read-only \| Disabled |
| Filled | False \| True |
| Size | Medium \| Large |
| Style | Default \| Filled lighter \| Filled darker |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| Medium | 320x104 V p0/0/0/0 g8 gap=field-label-gap |
| Large | 320x112 V p0/0/0/0 g8 gap=field-label-gap |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| Default/True/Default | fg:field-text-label ic:icon-default ts:Text sm/Regular |
| Default/False/Default | fg:field-text-label ic:icon-default ts:Text sm/Regular |
| Hovered/True/Default | fg:field-text-label ic:icon-default ts:Text sm/Regular |
| Hovered/False/Default | fg:field-text-label ic:icon-default ts:Text sm/Regular |
| Pressed/True/Default | fg:field-text-label ic:icon-default ts:Text sm/Regular |
| Pressed/False/Default | fg:field-text-label ic:icon-default ts:Text sm/Regular |
| Focused/True/Default | fg:field-text-label ic:icon-default ts:Text sm/Regular fx:shadow-md |
| Focused/False/Default | fg:field-text-label ic:icon-default ts:Text sm/Regular fx:shadow-md |
| Read-only/True/Default | fg:field-text-label ic:icon-default ts:Text sm/Regular |
| Read-only/False/Default | fg:field-text-label ic:icon-default ts:Text sm/Regular |
| Disabled/True/Default | fg:field-text-label ic:icon-default-disabled ts:Text sm/Regular |
| Disabled/False/Default | fg:field-text-label ic:icon-default-disabled ts:Text sm/Regular |
| Default/True/Filled darker | fg:field-text-label ic:icon-default ts:Text sm/Regular |
| Default/False/Filled darker | fg:field-text-label ic:icon-default ts:Text sm/Regular |
| Hovered/True/Filled darker | fg:field-text-label ic:icon-default ts:Text sm/Regular |
| Hovered/False/Filled darker | fg:field-text-label ic:icon-default ts:Text sm/Regular |
| Pressed/True/Filled darker | fg:field-text-label ic:icon-default ts:Text sm/Regular |
| Pressed/False/Filled darker | fg:field-text-label ic:icon-default ts:Text sm/Regular |
| Focused/True/Filled darker | fg:field-text-label ic:icon-default ts:Text sm/Regular fx:shadow-md |
| Focused/False/Filled darker | fg:field-text-label ic:icon-default ts:Text sm/Regular fx:shadow-md |
| Read-only/True/Filled darker | fg:field-text-label ic:icon-default ts:Text sm/Regular |
| Read-only/False/Filled darker | fg:field-text-label ic:icon-default ts:Text sm/Regular |
| Disabled/True/Filled darker | fg:field-text-label ic:icon-default-disabled ts:Text sm/Regular |
| Disabled/False/Filled darker | fg:field-text-label ic:icon-default-disabled ts:Text sm/Regular |
| Default/True/Filled lighter | fg:field-text-label ic:icon-default ts:Text sm/Regular |
| Default/False/Filled lighter | fg:field-text-label ic:icon-default ts:Text sm/Regular |
| Hovered/True/Filled lighter | fg:field-text-label ic:icon-default ts:Text sm/Regular |
| Hovered/False/Filled lighter | fg:field-text-label ic:icon-default ts:Text sm/Regular |
| Pressed/True/Filled lighter | fg:field-text-label ic:icon-default ts:Text sm/Regular |
| Pressed/False/Filled lighter | fg:field-text-label ic:icon-default ts:Text sm/Regular |
| Focused/True/Filled lighter | fg:field-text-label ic:icon-default ts:Text sm/Regular fx:shadow-md |
| Focused/False/Filled lighter | fg:field-text-label ic:icon-default ts:Text sm/Regular fx:shadow-md |
| Read-only/True/Filled lighter | fg:field-text-label ic:icon-default ts:Text sm/Regular |
| Read-only/False/Filled lighter | fg:field-text-label ic:icon-default ts:Text sm/Regular |
| Disabled/True/Filled lighter | fg:field-text-label ic:icon-default-disabled ts:Text sm/Regular |
| Disabled/False/Filled lighter | fg:field-text-label ic:icon-default-disabled ts:Text sm/Regular |

## Component: Trailing Icon  (2 variants)

Trailing icon is positioned at the end, often used for actions like clearing input or searching by voice.

| Prop | Values / default |
|---|---|
| Swap Icon | I:18738:4762 |
| Open | True \| False |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| - | 20x20 V p0/0/0/0 g8 gap=tooltip-gap |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| False | ic:icon-default |
| True | fg:tooltip-text-heading-light ic:icon-default ts:Text xs/Semibold |
