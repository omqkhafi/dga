# Floating Button (web)

Source: Figma web file `trJvYAeN2wdayn2VdSUR2N`, page "Floating Button". All values below are read from Figma component variants (LTR variants; RTL variants mirror them). Token names are Figma variable names (last segment); see `tokens.css`.

## Usage (plain language)

A Floating Button is a circular button that “floats” above the user interface and is typically used to represent a primary or most important action on a screen. It is designed to grab attention and encourage user interaction.

## Component: Floating Button  (288 variants)

| Prop | Values / default |
|---|---|
| 🔁 Lead Icon | I:19478:124492 |
| Text AR | T:إجراء |
| Text EN | T:Button |
| RTL | False \| True |
| State | Default \| Pressed \| Selected \| Disabled \| Foucsed \| Hovered |
| Style | Primary-Brand \| Primary- Neutral \| Secondary-Solid |
| Icon only | False \| True |
| Size | Large \| Small |
| On color | Yes \| No |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| True/Small | 56x56 H p16/16/16/16 g10 pad-y=spacing-xl pad-x=spacing-xl r9999=radius-full |
| True/Large | 64x64 H p20/20/20/20 g10 pad-y=spacing-2xl pad-x=spacing-2xl r9999=radius-full |
| False/Small | 116x56 H p16/16/16/16 g8 pad-y=spacing-xl pad-x=spacing-xl gap=spacing-md r9999=radius-full |
| False/Large | 116x64 H p20/20/20/20 g8 pad-y=spacing-2xl pad-x=spacing-2xl gap=spacing-md r9999=radius-full |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| Default/Primary- Neutral/True/No | bg:button-background-black-default ic:icon-oncolor |
| Hovered/Primary- Neutral/True/No | bg:button-background-black-hovered ic:icon-oncolor |
| Default/Primary- Neutral/True/Yes | bg:button-background-oncolor-default ic:icon-default |
| Hovered/Primary- Neutral/True/Yes | bg:button-background-oncolor-hovered ic:icon-default |
| Default/Primary- Neutral/False/No | bg:button-background-black-default fg:text-oncolor-primary ic:icon-oncolor ts:Text md/Medium |
| Hovered/Primary- Neutral/False/No | bg:button-background-black-hovered fg:text-oncolor-primary ic:icon-oncolor ts:Text md/Medium |
| Default/Primary- Neutral/False/Yes | bg:button-background-oncolor-default fg:text-default ic:icon-default ts:Text md/Medium |
| Hovered/Primary- Neutral/False/Yes | bg:button-background-oncolor-hovered fg:text-default ic:icon-default ts:Text md/Medium |
| Default/Primary-Brand/True/No | bg:button-background-primary-default ic:icon-oncolor |
| Hovered/Primary-Brand/True/No | bg:button-background-primary-hovered ic:icon-oncolor |
| Default/Primary-Brand/True/Yes | bg:button-background-primary-default ic:icon-oncolor |
| Hovered/Primary-Brand/True/Yes | bg:button-background-primary-hovered ic:icon-oncolor |
| Default/Primary-Brand/False/No | bg:button-background-primary-default fg:text-oncolor-primary ic:icon-oncolor ts:Text md/Medium |
| Hovered/Primary-Brand/False/No | bg:button-background-primary-hovered fg:text-oncolor-primary ic:icon-oncolor ts:Text md/Medium |
| Default/Primary-Brand/False/Yes | bg:button-background-primary-default fg:text-oncolor-primary ic:icon-oncolor ts:Text md/Medium |
| Hovered/Primary-Brand/False/Yes | bg:button-background-primary-hovered fg:text-oncolor-primary ic:icon-oncolor ts:Text md/Medium |
| Default/Secondary-Solid/True/No | bg:button-background-neutral-default ic:icon-default |
| Hovered/Secondary-Solid/True/No | bg:button-background-neutral-pressed ic:icon-default |
| Default/Secondary-Solid/True/Yes | bg:button-background-transparent-hovered ic:icon-oncolor |
| Hovered/Secondary-Solid/True/Yes | bg:button-background-transparent-hovered ic:icon-oncolor |
| Default/Secondary-Solid/False/No | bg:button-background-neutral-default fg:text-default ic:icon-default ts:Text md/Medium |
| Hovered/Secondary-Solid/False/No | bg:button-background-neutral-pressed fg:text-default ic:icon-default ts:Text md/Medium |
| Default/Secondary-Solid/False/Yes | bg:button-background-transparent-hovered fg:text-oncolor-primary ic:icon-oncolor ts:Text md/Medium |
| Hovered/Secondary-Solid/False/Yes | bg:button-background-transparent-hovered fg:text-oncolor-primary ic:icon-oncolor ts:Text md/Medium |
| Pressed/Primary- Neutral/True/No | bg:button-background-black-pressed ic:icon-oncolor |
| Pressed/Primary- Neutral/True/Yes | bg:button-background-oncolor-pressed ic:icon-default |
| Selected/Primary- Neutral/True/No | bg:button-background-black-selected ic:icon-oncolor |
| Selected/Primary- Neutral/True/Yes | bg:button-background-oncolor-selected ic:icon-default |
| Foucsed/Primary- Neutral/True/No | bg:button-background-black-default ic:icon-oncolor |
| Foucsed/Primary- Neutral/True/Yes | bg:button-background-oncolor-focused ic:icon-default |
| Disabled/Primary- Neutral/True/No | bg:background-disabled ic:icon-default-disabled |
| Disabled/Primary- Neutral/True/Yes | bg:button-background-disabled-on-color ic:icon-default-oncolor-disabled |
| Pressed/Primary- Neutral/False/No | bg:button-background-black-pressed fg:text-oncolor-primary ic:icon-oncolor ts:Text md/Medium |
| Pressed/Primary- Neutral/False/Yes | bg:button-background-oncolor-pressed fg:text-default ic:icon-default ts:Text md/Medium |
| Selected/Primary- Neutral/False/No | bg:button-background-black-selected fg:text-oncolor-primary ic:icon-oncolor ts:Text md/Medium |
| Selected/Primary- Neutral/False/Yes | bg:button-background-oncolor-selected fg:text-default ic:icon-default ts:Text md/Medium |
| Foucsed/Primary- Neutral/False/No | bg:button-background-black-default fg:text-oncolor-primary ic:icon-oncolor ts:Text md/Medium |
| Foucsed/Primary- Neutral/False/Yes | bg:button-background-oncolor-focused fg:text-default ic:icon-default ts:Text md/Medium |
| Disabled/Primary- Neutral/False/No | bg:background-disabled fg:text-default-disabled ic:icon-default-disabled ts:Text md/Medium |
| Disabled/Primary- Neutral/False/Yes | bg:button-background-disabled-on-color fg:text-default-oncolor-disabled ic:icon-default-oncolor-disabled ts:Text md/Medium |
| Pressed/Primary-Brand/True/No | bg:button-background-primary-pressed ic:icon-oncolor |
| Pressed/Primary-Brand/True/Yes | bg:button-background-primary-pressed ic:icon-oncolor |
| Selected/Primary-Brand/True/No | bg:button-background-primary-selected ic:icon-oncolor |
| Selected/Primary-Brand/True/Yes | bg:button-background-primary-hovered ic:icon-oncolor |
| Foucsed/Primary-Brand/True/No | bg:button-background-primary-focused ic:icon-oncolor |
| Foucsed/Primary-Brand/True/Yes | bg:button-background-primary-focused ic:icon-oncolor |
| Disabled/Primary-Brand/True/No | bg:background-disabled ic:icon-default-disabled |
| Disabled/Primary-Brand/True/Yes | bg:button-background-disabled-on-color ic:icon-default-oncolor-disabled |
| Pressed/Primary-Brand/False/No | bg:button-background-primary-pressed fg:text-oncolor-primary ic:icon-oncolor ts:Text md/Medium |
| Pressed/Primary-Brand/False/Yes | bg:button-background-primary-pressed fg:text-oncolor-primary ic:icon-oncolor ts:Text md/Medium |
| Selected/Primary-Brand/False/No | bg:button-background-primary-selected fg:text-oncolor-primary ic:icon-oncolor ts:Text md/Medium |
| Selected/Primary-Brand/False/Yes | bg:button-background-primary-hovered fg:text-oncolor-primary ic:icon-oncolor ts:Text md/Medium |
| Foucsed/Primary-Brand/False/No | bg:button-background-primary-focused fg:text-oncolor-primary ic:icon-oncolor ts:Text md/Medium |
| Foucsed/Primary-Brand/False/Yes | bg:button-background-primary-focused fg:text-oncolor-primary ic:icon-oncolor ts:Text md/Medium |
| Disabled/Primary-Brand/False/No | bg:background-disabled fg:text-default-disabled ic:icon-default-disabled ts:Text md/Medium |
| Disabled/Primary-Brand/False/Yes | bg:button-background-disabled-on-color fg:text-default-oncolor-disabled ic:icon-default-oncolor-disabled ts:Text md/Medium |
| Pressed/Secondary-Solid/True/No | bg:button-background-neutral-pressed ic:icon-default |
| Pressed/Secondary-Solid/True/Yes | bg:button-background-transparent-pressed ic:icon-oncolor |
| Selected/Secondary-Solid/True/No | bg:button-background-neutral-selected ic:icon-default |
| Selected/Secondary-Solid/True/Yes | bg:button-background-transparent-selected ic:icon-oncolor |
| Foucsed/Secondary-Solid/True/No | bg:button-background-neutral-focused ic:icon-default |
| Foucsed/Secondary-Solid/True/Yes | bg:button-background-transparent-focused ic:icon-oncolor |
| Pressed/Secondary-Solid/False/No | bg:button-background-neutral-pressed fg:text-default ic:icon-default ts:Text md/Medium |
| Pressed/Secondary-Solid/False/Yes | bg:button-background-transparent-pressed fg:text-oncolor-primary ic:icon-oncolor ts:Text md/Medium |
| Selected/Secondary-Solid/False/No | bg:button-background-neutral-selected fg:text-default ic:icon-default ts:Text md/Medium |
| Selected/Secondary-Solid/False/Yes | bg:button-background-transparent-selected fg:text-oncolor-primary ic:icon-oncolor ts:Text md/Medium |
| Foucsed/Secondary-Solid/False/No | bg:button-background-neutral-focused fg:text-default ic:icon-default ts:Text md/Medium |
| Foucsed/Secondary-Solid/False/Yes | bg:button-background-transparent-focused fg:text-oncolor-primary ic:icon-oncolor ts:Text md/Medium |
| Disabled/Secondary-Solid/True/No | bg:background-disabled ic:icon-default-disabled |
| Disabled/Secondary-Solid/True/Yes | bg:button-background-disabled-on-color ic:icon-default-oncolor-disabled |
| Disabled/Secondary-Solid/False/No | bg:background-disabled fg:text-default-disabled ic:icon-default-disabled ts:Text md/Medium |
| Disabled/Secondary-Solid/False/Yes | bg:button-background-disabled-on-color fg:text-default-oncolor-disabled ic:icon-default-oncolor-disabled ts:Text md/Medium |
