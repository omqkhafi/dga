# Number Input (web)

Source: Figma web file `trJvYAeN2wdayn2VdSUR2N`, page "Number Input". All values below are read from Figma component variants (LTR variants; RTL variants mirror them). Token names are Figma variable names (last segment); see `tokens.css`.

## Usage (plain language)

_No description is given in Figma for this component; usage guidance not stated in source._

## Component: Input Prefix-Suffix  (48 variants)

| Prop | Values / default |
|---|---|
| Type | Plus \| Minus |
| State | Default \| Hovered \| Pressed \| Selected \| Focused \| Disabled |
| Style | Solid \| Subtle |
| Size | Large \| Medium |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| Plus/Large | 56x40 H p2/16/2/16 g4 pad-y=spacing-xxs pad-x=spacing-xl gap=spacing-xs |
| Minus/Large | 56x40 H p2/16/2/16 g4 pad-y=spacing-xxs pad-x=spacing-xl gap=spacing-xs |
| Plus/Medium | 44x32 H p2/12/2/12 g4 pad-y=spacing-xxs pad-x=spacing-lg gap=spacing-xs |
| Minus/Medium | 44x32 H p2/12/2/12 g4 pad-y=spacing-xxs pad-x=spacing-lg gap=spacing-xs |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| Plus/Default/Solid | bg:button-background-neutral-default ic:icon-default |
| Minus/Default/Solid | bg:button-background-neutral-default ic:icon-default |
| Plus/Default/Subtle | ic:icon-default |
| Minus/Default/Subtle | ic:icon-default |
| Plus/Hovered/Solid | bg:button-background-neutral-hovered ic:icon-default |
| Minus/Hovered/Solid | bg:button-background-neutral-hovered ic:icon-default |
| Plus/Hovered/Subtle | bg:button-background-neutral-hovered ic:icon-default |
| Minus/Hovered/Subtle | bg:button-background-neutral-hovered ic:icon-default |
| Plus/Pressed/Solid | bg:button-background-neutral-pressed ic:icon-default |
| Minus/Pressed/Solid | bg:button-background-neutral-pressed ic:icon-default |
| Plus/Pressed/Subtle | bg:button-background-neutral-pressed ic:icon-default |
| Minus/Pressed/Subtle | bg:button-background-neutral-pressed ic:icon-default |
| Plus/Selected/Solid | bg:button-background-black-selected ic:icon-oncolor |
| Minus/Selected/Solid | bg:button-background-black-selected ic:icon-oncolor |
| Plus/Selected/Subtle | bg:button-background-black-selected ic:icon-oncolor |
| Minus/Selected/Subtle | bg:button-background-black-selected ic:icon-oncolor |
| Plus/Focused/Solid | bg:button-background-neutral-focused bd:border-black ic:icon-default |
| Minus/Focused/Solid | bg:button-background-neutral-focused bd:border-black ic:icon-default |
| Plus/Focused/Subtle | bd:border-black ic:icon-default |
| Minus/Focused/Subtle | bd:border-black ic:icon-default |
| Plus/Disabled/Solid | bg:background-disabled ic:icon-default-disabled |
| Minus/Disabled/Solid | bg:background-disabled ic:icon-default-disabled |
| Plus/Disabled/Subtle | ic:icon-default-disabled |
| Minus/Disabled/Subtle | ic:icon-default-disabled |

## Component: Number Input  (288 variants)

| Prop | Values / default |
|---|---|
| 🔁 Swap Helper Icon | I:31864:189863 |
| Prefix | B:true |
| Suffix | B:true |
| Text | T:00000 |
| Show label | B:true |
| Show Helper Text | B:false |
| Helper Text Eng | T:Help Text |
| Helper text AR | T:نص مساعد |
| RTL | False \| True |
| State | Default \| Hovered \| Pressed \| Focused \| Read-only \| Disabled |
| Filled | False \| True |
| Error | False \| True |
| Size | Large \| Medium |
| Style | Default \| Filled lighter \| Filled darker |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| Large | 183x68 V p0/0/0/0 g8 gap=field-label-gap |
| Medium | 183x60 V p0/0/0/0 g8 gap=field-label-gap |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| Default/True/False/Default | fg:field-text-label ic:icon-default ts:Text sm/Regular |
| Default/False/False/Default | fg:field-text-label ic:icon-default ts:Text sm/Regular |
| Default/True/True/Default | fg:field-text-label ic:icon-default ts:Text sm/Regular |
| Default/False/True/Default | fg:field-text-label ic:icon-default ts:Text sm/Regular |
| Hovered/True/False/Default | fg:field-text-label ic:icon-default ts:Text sm/Regular |
| Hovered/False/False/Default | fg:field-text-label ic:icon-default ts:Text sm/Regular |
| Hovered/True/True/Default | fg:field-text-label ic:icon-default ts:Text sm/Regular |
| Hovered/False/True/Default | fg:field-text-label ic:icon-default ts:Text sm/Regular |
| Pressed/True/False/Default | fg:field-text-label ic:icon-default ts:Text sm/Regular |
| Pressed/False/False/Default | fg:field-text-label ic:icon-default ts:Text sm/Regular |
| Pressed/True/True/Default | fg:field-text-label ic:icon-default ts:Text sm/Regular |
| Pressed/False/True/Default | fg:field-text-label ic:icon-default ts:Text sm/Regular |
| Focused/True/False/Default | fg:field-text-label ic:icon-default ts:Text sm/Regular fx:shadow-md |
| Focused/False/False/Default | fg:field-text-label ic:icon-default ts:Text sm/Regular fx:shadow-md |
| Focused/True/True/Default | fg:field-text-label ic:icon-default ts:Text sm/Regular fx:shadow-md |
| Focused/False/True/Default | fg:field-text-label ic:icon-default ts:Text sm/Regular fx:shadow-md |
| Read-only/True/False/Default | fg:field-text-label ic:icon-default ts:Text sm/Regular |
| Read-only/False/False/Default | fg:field-text-label ic:icon-default ts:Text sm/Regular |
| Read-only/True/True/Default | fg:field-text-label ic:icon-default ts:Text sm/Regular |
| Read-only/False/True/Default | fg:field-text-label ic:icon-default ts:Text sm/Regular |
| Disabled/True/False/Default | fg:input-text-disabled ic:icon-default-disabled ts:Text sm/Regular |
| Disabled/False/False/Default | fg:input-text-disabled ic:icon-default-disabled ts:Text sm/Regular |
| Disabled/True/True/Default | fg:input-text-disabled ic:icon-default-disabled ts:Text sm/Regular |
| Disabled/False/True/Default | fg:input-text-disabled ic:icon-default-disabled ts:Text sm/Regular |
| Default/True/False/Filled darker | fg:field-text-label ic:icon-default ts:Text sm/Regular |
| Default/False/False/Filled darker | fg:field-text-label ic:icon-default ts:Text sm/Regular |
| Default/True/True/Filled darker | fg:field-text-label ic:icon-default ts:Text sm/Regular |
| Default/False/True/Filled darker | fg:field-text-label ic:icon-default ts:Text sm/Regular |
| Hovered/True/False/Filled darker | fg:field-text-label ic:icon-default ts:Text sm/Regular |
| Hovered/False/False/Filled darker | fg:field-text-label ic:icon-default ts:Text sm/Regular |
| Hovered/True/True/Filled darker | fg:field-text-label ic:icon-default ts:Text sm/Regular |
| Hovered/False/True/Filled darker | fg:field-text-label ic:icon-default ts:Text sm/Regular |
| Pressed/True/False/Filled darker | fg:field-text-label ic:icon-default ts:Text sm/Regular |
| Pressed/False/False/Filled darker | fg:field-text-label ic:icon-default ts:Text sm/Regular |
| Pressed/True/True/Filled darker | fg:field-text-label ic:icon-default ts:Text sm/Regular |
| Pressed/False/True/Filled darker | fg:field-text-label ic:icon-default ts:Text sm/Regular |
| Focused/True/False/Filled darker | fg:field-text-label ic:icon-default ts:Text sm/Regular fx:shadow-md |
| Focused/False/False/Filled darker | fg:field-text-label ic:icon-default ts:Text sm/Regular fx:shadow-md |
| Focused/True/True/Filled darker | fg:field-text-label ic:icon-default ts:Text sm/Regular fx:shadow-md |
| Focused/False/True/Filled darker | fg:field-text-label ic:icon-default ts:Text sm/Regular fx:shadow-md |
| Read-only/True/False/Filled darker | fg:field-text-label ic:icon-default ts:Text sm/Regular |
| Read-only/False/False/Filled darker | fg:field-text-label ic:icon-default ts:Text sm/Regular |
| Read-only/True/True/Filled darker | fg:field-text-label ic:icon-default ts:Text sm/Regular |
| Read-only/False/True/Filled darker | fg:field-text-label ic:icon-default ts:Text sm/Regular |
| Disabled/True/False/Filled darker | fg:input-text-disabled ic:icon-default ts:Text sm/Regular |
| Disabled/False/False/Filled darker | fg:input-text-disabled ic:icon-default ts:Text sm/Regular |
| Disabled/True/True/Filled darker | fg:input-text-disabled ic:icon-default ts:Text sm/Regular |
| Disabled/False/True/Filled darker | fg:input-text-disabled ic:icon-default ts:Text sm/Regular |
| Default/True/False/Filled lighter | fg:field-text-label ic:icon-default ts:Text sm/Regular |
| Default/False/False/Filled lighter | fg:field-text-label ic:icon-default ts:Text sm/Regular |
| Default/True/True/Filled lighter | fg:field-text-label ic:icon-default ts:Text sm/Regular |
| Default/False/True/Filled lighter | fg:field-text-label ic:icon-default ts:Text sm/Regular |
| Hovered/True/False/Filled lighter | fg:field-text-label ic:icon-default ts:Text sm/Regular |
| Hovered/False/False/Filled lighter | fg:field-text-label ic:icon-default ts:Text sm/Regular |
| Hovered/True/True/Filled lighter | fg:field-text-label ic:icon-default ts:Text sm/Regular |
| Hovered/False/True/Filled lighter | fg:field-text-label ic:icon-default ts:Text sm/Regular |
| Pressed/True/False/Filled lighter | fg:field-text-label ic:icon-default ts:Text sm/Regular |
| Pressed/False/False/Filled lighter | fg:field-text-label ic:icon-default ts:Text sm/Regular |
| Pressed/True/True/Filled lighter | fg:field-text-label ic:icon-default ts:Text sm/Regular |
| Pressed/False/True/Filled lighter | fg:field-text-label ic:icon-default ts:Text sm/Regular |
| Focused/True/False/Filled lighter | fg:field-text-label ic:icon-default ts:Text sm/Regular fx:shadow-md |
| Focused/False/False/Filled lighter | fg:field-text-label ic:icon-default ts:Text sm/Regular fx:shadow-md |
| Focused/True/True/Filled lighter | fg:field-text-label ic:icon-default ts:Text sm/Regular fx:shadow-md |
| Focused/False/True/Filled lighter | fg:field-text-label ic:icon-default ts:Text sm/Regular fx:shadow-md |
| Read-only/True/False/Filled lighter | fg:field-text-label ic:icon-default ts:Text sm/Regular |
| Read-only/False/False/Filled lighter | fg:field-text-label ic:icon-default ts:Text sm/Regular |
| Read-only/True/True/Filled lighter | fg:field-text-label ic:icon-default ts:Text sm/Regular |
| Read-only/False/True/Filled lighter | fg:field-text-label ic:icon-default ts:Text sm/Regular |
| Disabled/True/False/Filled lighter | fg:input-text-disabled ic:icon-default-disabled ts:Text sm/Regular |
| Disabled/False/False/Filled lighter | fg:input-text-disabled ic:icon-default-disabled ts:Text sm/Regular |
| Disabled/True/True/Filled lighter | fg:input-text-disabled ic:icon-default-disabled ts:Text sm/Regular |
| Disabled/False/True/Filled lighter | fg:input-text-disabled ic:icon-default-disabled ts:Text sm/Regular |
