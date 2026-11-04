# Text input (mobile)

Source: Figma mobile file `Ci0aNw48DSdp7MsRw0U1nA`, page "Text input". All values below are read from Figma component variants (LTR variants; RTL variants mirror them). Token names are Figma variable names (last segment); see `tokens.css`.

## Usage (plain language)

_No description is given in Figma for this component; usage guidance not stated in source._

## Component: Text Input  (40 variants)

| Prop | Values / default |
|---|---|
| Icon | B:false |
| 🔁 Icon Swap | I:10750:71181 |
| Feedback icon | B:false |
| Prefix | B:false |
| Suffix | B:false |
| Show Helper Text | B:true |
| Show label | B:true |
| Text AR | T:نص تلميحي |
| Text ENG | T:Entered text |
| Helper Text EN | T:Help Text |
| Helper text AR | T:نص مساعد |
| Swap Helper text | I:11089:90351 |
| RTL | False \| True |
| State | Default \| Pressed \| Focused \| Read-only \| Disabled |
| Filled | False \| True |
| Error | False \| True |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| - | 320x112 V p0/0/0/0 g8 gap=spacing-md r4=radius-sm |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| Default/True/False | fg:field-border-error ic:icon-neutral ts:Text sm/Regular |
| Default/False/False | fg:field-border-error ic:icon-neutral ts:Text sm/Regular |
| Default/True/True | fg:field-border-error ic:icon-error ts:Text sm/Regular |
| Default/False/True | fg:field-border-error ic:icon-error ts:Text sm/Regular |
| Pressed/True/False | fg:field-border-error ic:icon-neutral ts:Text sm/Regular |
| Pressed/False/False | fg:field-border-error ic:icon-neutral ts:Text sm/Regular |
| Pressed/True/True | fg:field-border-error ic:icon-error ts:Text sm/Regular |
| Pressed/False/True | fg:field-border-error ic:icon-error ts:Text sm/Regular |
| Focused/True/False | fg:field-border-error ic:icon-neutral ts:Text sm/Regular |
| Focused/False/False | fg:field-border-error ic:icon-neutral ts:Text sm/Regular |
| Focused/True/True | fg:field-border-error ic:icon-error ts:Text sm/Regular |
| Focused/False/True | fg:field-border-error ic:icon-error ts:Text sm/Regular |
| Read-only/True/False | fg:field-border-error ic:icon-neutral ts:Text sm/Regular |
| Read-only/False/False | fg:field-border-error ic:icon-neutral ts:Text sm/Regular |
| Read-only/True/True | fg:field-border-error ic:icon-error ts:Text sm/Regular |
| Read-only/False/True | fg:field-border-error ic:icon-error ts:Text sm/Regular |
| Disabled/True/False | fg:field-border-error ic:icon-neutral ts:Text sm/Regular |
| Disabled/False/False | fg:field-border-error ic:icon-neutral ts:Text sm/Regular |
| Disabled/True/True | fg:field-border-error ic:icon-error ts:Text sm/Regular |
| Disabled/False/True | fg:field-border-error ic:icon-error ts:Text sm/Regular |

## Component: Label  (16 variants)

| Prop | Values / default |
|---|---|
| Text AR | T:عنوان |
| Required | B:true |
| Text | T:Label |
| RTL | False \| True |
| Type | Regular (Default) \| Semibold |
| Size | Medium \| Large |
| Disabled | False \| True |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| Regular (Default)/Medium | 46x20 H p0/0/0/0 g4 gap=label-gap |
| Semibold/Medium | 48x20 H p0/0/0/0 g4 gap=label-gap |
| Regular (Default)/Large | 51x24 H p0/0/0/0 g4 gap=label-gap |
| Semibold/Large | 54x24 H p0/0/0/0 g4 gap=label-gap |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| Regular (Default)/False | fg:field-border-error ts:Text sm/Regular |
| Regular (Default)/True | fg:input-text-disabled ts:Text sm/Regular |
| Semibold/False | fg:field-border-error ts:Text sm/Semibold |
| Semibold/True | fg:input-text-disabled ts:Text sm/Semibold |

## Component: Input Prefix-Suffix  (56 variants)

| Prop | Values / default |
|---|---|
| 🔁 Icon | I:10750:73533 |
| Icon | B:true |
| Text EN | T:Text |
| Text AR | T:نص |
| RTL | False \| True |
| Type | Dropdown \| Text |
| State | Default \| Pressed \| Selected \| Focused \| Disabled |
| Style | Solid \| Subtle |
| Size | Large \| Medium |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| Dropdown/Large | 115x40 H p2/16/2/16 g4 pad-y=Prefix-Suffix-padding-Top&Bottom pad-x=Prefix-Suffix-padding-left gap=spacing-xs |
| Text/Large | 63x40 H p2/16/2/16 g4 pad-y=Prefix-Suffix-padding-Top&Bottom pad-x=spacing-xl gap=spacing-xs |
| Dropdown/Medium | 95x32 H p2/12/2/12 g4 pad-y=Prefix-Suffix-padding-Top&Bottom pad-x=spacing-lg gap=spacing-xs |
| Text/Medium | 51x32 H p2/12/2/12 g4 pad-y=Prefix-Suffix-padding-Top&Bottom pad-x=spacing-lg gap=spacing-xs |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| Dropdown/Default/Solid | bg:button-background-neutral-default fg:text-default ic:icon-default ts:Text md/Regular |
| Text/Default/Solid | bg:button-background-neutral-default fg:text-secondary-paragraph ts:Text md/Regular |
| Dropdown/Default/Subtle | fg:text-default ic:icon-default ts:Text md/Regular |
| Text/Default/Subtle | fg:text-secondary-paragraph ts:Text md/Regular |
| Dropdown/Pressed/Solid | bg:button-background-neutral-pressed fg:text-default ic:icon-default ts:Text md/Regular |
| Dropdown/Pressed/Subtle | bg:button-background-neutral-pressed fg:text-default ic:icon-default ts:Text md/Regular |
| Dropdown/Selected/Solid | bg:button-background-black-selected fg:text-oncolor-primary ic:icon-oncolor ts:Text md/Regular |
| Dropdown/Selected/Subtle | bg:button-background-black-selected fg:text-oncolor-primary ic:icon-oncolor ts:Text md/Regular |
| Dropdown/Focused/Solid | bg:button-background-neutral-focused bd:border-black fg:text-default ic:icon-default ts:Text md/Regular |
| Dropdown/Focused/Subtle | bd:border-black fg:text-default ic:icon-default ts:Text md/Regular |
| Dropdown/Disabled/Solid | bg:background-disabled fg:text-default-disabled ic:icon-default-disabled ts:Text md/Regular |
| Text/Disabled/Solid | bg:background-disabled fg:text-default-disabled ts:Text md/Regular |
| Dropdown/Disabled/Subtle | fg:text-default-disabled ic:icon-default-disabled ts:Text md/Regular |
| Text/Disabled/Subtle | fg:text-default-disabled ts:Text md/Regular |
