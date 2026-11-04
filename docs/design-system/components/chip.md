# Chip (web)

Source: Figma web file `trJvYAeN2wdayn2VdSUR2N`, page "Chip". All values below are read from Figma component variants (LTR variants; RTL variants mirror them). Token names are Figma variable names (last segment); see `tokens.css`.

## Usage (plain language)

A chip component is a small, interactive element used to display information, trigger actions, or allow selections.

## Component: Chip  (288 variants)

| Prop | Values / default |
|---|---|
| Text EN | T:Item |
| 🔁 Swap Lead Icon | I:13758:242431 |
| 🔁 Swap Trail Icon | I:13758:242431 |
| Show Lead Icon | B:false |
| Show Trail Icon | B:false |
| Text AR | T:اختيار |
| RTL | False \| True |
| State | Default \| Hovered \| Pressed \| Selected \| Focused \| Disabled |
| Style | Primary \| Neutral |
| Size | Large \| Medium \| Small |
| Rounded | True \| False |
| On-color | False \| True |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| Small | 47x20 H p0/12/0/12 g4 pad-y=spacing-none pad-x=spacing-lg gap=spacing-xs r4 |
| Medium | 51x24 H p0/12/0/12 g4 pad-y=spacing-none pad-x=spacing-lg gap=spacing-xs r4 |
| Large | 60x32 H p0/12/0/12 g4 pad-y=spacing-none pad-x=spacing-lg gap=spacing-xs r4 |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| Default/Primary/False/False | bg:background-primary-50 fg:text-primary-sa-flag ts:Text 2xs/SemiBold |
| Focused/Primary/False/False | bg:background-primary-50 fg:text-primary-sa-flag ts:Text 2xs/SemiBold |
| Default/Neutral/False/False | bg:chip-background-neutral-default fg:text-default ts:Text 2xs/SemiBold |
| Hovered/Neutral/False/False | bg:chip-background-neutral-hovered fg:text-default ts:Text 2xs/SemiBold |
| Hovered/Primary/False/False | bg:background-primary-200 fg:text-primary-sa-flag ts:Text 2xs/SemiBold |
| Pressed/Neutral/False/False | bg:background-neutral-300 fg:text-default ts:Text 2xs/SemiBold |
| Pressed/Primary/False/False | bg:background-primary-400 fg:button-background-primary-pressed ts:Text 2xs/SemiBold |
| Selected/Neutral/False/False | bg:chip-background-neutral-selected fg:text-oncolor-primary ts:Text 2xs/SemiBold |
| Selected/Primary/False/False | bg:background-primary fg:text-oncolor-primary ts:Text 2xs/SemiBold |
| Focused/Neutral/False/False | bg:chip-background-neutral-focused fg:text-default ts:Text 2xs/SemiBold |
| Default/Primary/True/False | bg:background-primary-50 fg:text-primary-sa-flag ts:Text 2xs/SemiBold |
| Focused/Primary/True/False | bg:background-primary-50 fg:text-primary-sa-flag ts:Text 2xs/SemiBold |
| Default/Neutral/True/False | bg:chip-background-neutral-default fg:text-default ts:Text 2xs/SemiBold |
| Hovered/Neutral/True/False | bg:chip-background-neutral-hovered fg:text-default ts:Text 2xs/SemiBold |
| Hovered/Primary/True/False | bg:background-primary-200 fg:text-primary-sa-flag ts:Text 2xs/SemiBold |
| Pressed/Neutral/True/False | bg:background-neutral-300 fg:text-default ts:Text 2xs/SemiBold |
| Pressed/Primary/True/False | bg:background-primary-400 fg:button-background-primary-pressed ts:Text 2xs/SemiBold |
| Selected/Neutral/True/False | bg:chip-background-neutral-selected fg:text-oncolor-primary ts:Text 2xs/SemiBold |
| Selected/Primary/True/False | bg:background-primary fg:text-oncolor-primary ts:Text 2xs/SemiBold |
| Focused/Neutral/True/False | bg:chip-background-neutral-focused fg:text-default ts:Text 2xs/SemiBold |
| Disabled/Primary/False/False | bg:background-disabled fg:text-default-disabled ts:Text 2xs/SemiBold |
| Disabled/Neutral/False/False | bg:background-disabled fg:text-default-disabled ts:Text 2xs/SemiBold |
| Disabled/Primary/True/False | bg:background-disabled fg:text-default-disabled ts:Text 2xs/SemiBold |
| Disabled/Neutral/True/False | bg:background-disabled fg:text-default-disabled ts:Text 2xs/SemiBold |
| Default/Primary/False/True | bg:chip-background-on-color-default fg:text-default ts:Text 2xs/SemiBold |
| Default/Neutral/False/True | bg:chip-background-on-color-default fg:text-default ts:Text 2xs/SemiBold |
| Hovered/Primary/False/True | bg:chip-background-on-color-hovered fg:text-default ts:Text 2xs/SemiBold |
| Hovered/Neutral/False/True | bg:chip-background-on-color-hovered fg:text-default ts:Text 2xs/SemiBold |
| Pressed/Primary/False/True | bg:chip-background-on-color-pressed fg:text-default ts:Text 2xs/SemiBold |
| Pressed/Neutral/False/True | bg:chip-background-on-color-pressed fg:text-default ts:Text 2xs/SemiBold |
| Selected/Primary/False/True | bg:chip-background-on-color-selected fg:text-default ts:Text 2xs/SemiBold |
| Selected/Neutral/False/True | bg:chip-background-on-color-selected fg:text-default ts:Text 2xs/SemiBold |
| Disabled/Primary/False/True | bg:chip-background-on-color-diabled fg:text-default-oncolor-disabled ts:Text 2xs/SemiBold |
| Disabled/Neutral/False/True | bg:chip-background-on-color-diabled fg:text-default-oncolor-disabled ts:Text 2xs/SemiBold |
| Focused/Primary/False/True | bg:chip-background-on-color-focused fg:text-default ts:Text 2xs/SemiBold |
| Focused/Neutral/False/True | bg:chip-background-on-color-focused fg:text-default ts:Text 2xs/SemiBold |
| Default/Primary/True/True | bg:chip-background-on-color-default fg:text-default ts:Text 2xs/SemiBold |
| Default/Neutral/True/True | bg:chip-background-on-color-default fg:text-default ts:Text 2xs/SemiBold |
| Hovered/Primary/True/True | bg:chip-background-on-color-hovered fg:text-default ts:Text 2xs/SemiBold |
| Hovered/Neutral/True/True | bg:chip-background-on-color-hovered fg:text-default ts:Text 2xs/SemiBold |
| Pressed/Primary/True/True | bg:chip-background-on-color-pressed fg:text-default ts:Text 2xs/SemiBold |
| Pressed/Neutral/True/True | bg:chip-background-on-color-pressed fg:text-default ts:Text 2xs/SemiBold |
| Selected/Primary/True/True | bg:chip-background-on-color-selected fg:text-default ts:Text 2xs/SemiBold |
| Selected/Neutral/True/True | bg:chip-background-on-color-selected fg:text-default ts:Text 2xs/SemiBold |
| Disabled/Primary/True/True | bg:chip-background-on-color-diabled fg:text-default-oncolor-disabled ts:Text 2xs/SemiBold |
| Disabled/Neutral/True/True | bg:chip-background-on-color-diabled fg:text-default-oncolor-disabled ts:Text 2xs/SemiBold |
| Focused/Primary/True/True | bg:chip-background-on-color-focused fg:text-default ts:Text 2xs/SemiBold |
| Focused/Neutral/True/True | bg:chip-background-on-color-focused fg:text-default ts:Text 2xs/SemiBold |
