# Buttons (mobile)

Source: Figma mobile file `Ci0aNw48DSdp7MsRw0U1nA`, page "Buttons". All values below are read from Figma component variants (LTR variants; RTL variants mirror them). Token names are Figma variable names (last segment); see `tokens.css`.

## Usage (plain language)

_No description is given in Figma for this component; usage guidance not stated in source._

## Component: Button  (960 variants)

| Prop | Values / default |
|---|---|
| 🔁 Lead icon | I:10909:60605 |
| 🔁 Trail icon | I:10750:63767 |
| Trail icon | B:false |
| Lead icon | B:true |
| Text EN | T:Button |
| Text AR | T:إجراء |
| RTL | False \| True |
| Size | Large \| Medium \| Small |
| State | Default \| Pressed \| Selected \| Focused \| Disabled |
| Style | Primary-Neutral \| Primary-Brand \| Secondary-Solid \| Secondary-Outline \| Subtle \| Transparent |
| Icon only | False \| True |
| On-color | False \| True |
| Destructive | NO \| YES |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| Large/False | 110x44 H p0/16/0/16 g4 pad-x=buttons-lg-padding gap=buttons-lg-gap r4=radius-sm |
| Medium/False | 92x40 H p0/12/0/12 g4 pad-x=buttons-md-padding gap=buttons-lg-gap r4=radius-sm |
| Small/False | 74x32 H p0/8/0/8 g4 pad-x=buttons-sm-padding gap=buttons-lg-gap r4=radius-sm |
| Large/True | 44x44 H p0/0/0/0 g4 pad-y=spacing-none pad-x=spacing-none gap=buttons-lg-gap r4=radius-sm |
| Medium/True | 32x32 H p0/0/0/0 g4 pad-y=spacing-none pad-x=spacing-none gap=buttons-lg-gap r4=radius-sm |
| Small/True | 24x24 H p0/0/0/0 g4 pad-y=spacing-none pad-x=spacing-none gap=buttons-lg-gap r4=radius-sm |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| Default/Primary-Brand/False/False/NO | bg:button-background-primary-default fg:text-oncolor-primary ic:icon-oncolor ts:Text md/Medium |
| Default/Primary-Neutral/False/True/NO | bg:button-background-oncolor-default fg:text-default ic:icon-default ts:Text md/Medium |
| Default/Primary-Brand/False/True/NO | bg:button-background-oncolor-default fg:text-default ic:icon-default ts:Text md/Medium |
| Default/Primary-Neutral/False/False/NO | bg:button-background-black-default fg:text-oncolor-primary ic:icon-oncolor ts:Text md/Medium |
| Default/Secondary-Solid/False/False/NO | bg:button-background-neutral-default fg:text-default ic:icon-default |
| Default/Secondary-Solid/False/True/NO | bg:button-background-transparent-hovered fg:text-primary_on-color ic:icon-oncolor ts:Text md/Medium |
| Default/Secondary-Outline/False/False/NO | bd:border-neutral-primary fg:text-default ic:icon-default ts:Text md/Medium |
| Default/Secondary-Outline/False/True/NO | bd:border-white-40 fg:text-primary_on-color ic:icon-oncolor ts:Text md/Medium |
| Default/Subtle/False/False/NO | fg:text-default ic:icon-default ts:Text md/Medium |
| Default/Subtle/False/True/NO | fg:text-primary_on-color ic:icon-oncolor ts:Text md/Medium |
| Default/Transparent/False/False/NO | fg:text-default ic:icon-default ts:Text md/Medium |
| Default/Transparent/False/True/NO | fg:text-primary_on-color ic:icon-oncolor ts:Text md/Medium |
| Default/Primary-Brand/True/False/NO | bg:button-background-primary-default ic:icon-oncolor |
| Default/Primary-Neutral/True/True/NO | bg:button-background-oncolor-default ic:icon-default |
| Default/Primary-Brand/True/True/NO | bg:button-background-oncolor-default ic:icon-default |
| Default/Primary-Neutral/True/False/NO | bg:button-background-black-default ic:icon-oncolor |
| Default/Secondary-Solid/True/False/NO | bg:button-background-neutral-default ic:icon-default |
| Default/Secondary-Solid/True/True/NO | bg:button-background-transparent-hovered ic:icon-oncolor |
| Default/Secondary-Outline/True/False/NO | bd:border-neutral-primary ic:icon-default |
| Default/Secondary-Outline/True/True/NO | bd:border-white-40 ic:icon-oncolor |
| Default/Subtle/True/False/NO | ic:icon-default |
| Default/Subtle/True/True/NO | ic:icon-oncolor |
| Default/Transparent/True/False/NO | ic:icon-default |
| Default/Transparent/True/True/NO | ic:icon-oncolor |
| Pressed/Primary-Brand/False/False/NO | bg:button-background-primary-pressed fg:text-oncolor-primary ic:icon-oncolor ts:Text md/Medium |
| Pressed/Primary-Neutral/False/True/NO | bg:button-background-oncolor-pressed fg:text-default ic:icon-default ts:Text md/Medium |
| Pressed/Primary-Brand/False/True/NO | bg:button-background-oncolor-pressed fg:text-default ic:icon-default ts:Text md/Medium |
| Pressed/Primary-Neutral/False/False/NO | bg:button-background-black-pressed fg:text-oncolor-primary ic:icon-oncolor ts:Text md/Medium |
| Pressed/Secondary-Solid/False/False/NO | bg:button-background-neutral-pressed fg:text-default ic:icon-default ts:Text md/Medium |
| Pressed/Secondary-Solid/False/True/NO | bg:button-background-transparent-pressed fg:text-primary_on-color ic:icon-oncolor ts:Text md/Medium |
| Pressed/Secondary-Outline/False/False/NO | bg:button-background-neutral-pressed bd:border-neutral-primary fg:text-default ic:icon-default ts:Text md/Medium |
| Pressed/Secondary-Outline/False/True/NO | bg:button-background-transparent-pressed bd:border-white-40 fg:text-primary_on-color ic:icon-oncolor ts:Text md/Medium |
| Pressed/Subtle/False/False/NO | bg:button-background-neutral-pressed fg:text-default ic:icon-default ts:Text md/Medium |
| Pressed/Subtle/False/True/NO | bg:button-background-transparent-hovered fg:text-primary_on-color ic:icon-oncolor ts:Text md/Medium |
| Pressed/Transparent/False/False/NO | fg:button-background-primary-pressed ic:icon-default ts:Text md/Medium |
| Pressed/Transparent/False/True/NO | fg:link-primary-pressed ic:icon-primary-400 ts:Text md/Medium |
| Pressed/Primary-Brand/True/False/NO | bg:button-background-primary-pressed ic:icon-oncolor |
| Pressed/Primary-Neutral/True/True/NO | bg:button-background-oncolor-pressed ic:icon-default |
| Pressed/Primary-Brand/True/True/NO | bg:button-background-oncolor-pressed ic:icon-default |
| Pressed/Primary-Neutral/True/False/NO | bg:button-background-black-pressed ic:icon-oncolor |
| Pressed/Secondary-Solid/True/False/NO | bg:button-background-neutral-pressed ic:icon-default |
| Pressed/Secondary-Solid/True/True/NO | bg:button-background-transparent-pressed ic:icon-oncolor |
| Pressed/Secondary-Outline/True/False/NO | bg:button-background-neutral-pressed bd:border-neutral-primary ic:icon-default |
| Pressed/Secondary-Outline/True/True/NO | bg:button-background-transparent-pressed bd:border-white-40 ic:icon-oncolor |
| Pressed/Subtle/True/False/NO | bg:button-background-neutral-pressed ic:icon-default |
| Pressed/Subtle/True/True/NO | bg:button-background-transparent-hovered ic:icon-oncolor |
| Pressed/Transparent/True/False/NO | ic:icon-default |
| Pressed/Transparent/True/True/NO | ic:icon-oncolor |
| Selected/Primary-Brand/False/False/NO | bg:button-background-primary-selected fg:text-oncolor-primary ic:icon-oncolor ts:Text md/Medium |
| Selected/Primary-Neutral/False/True/NO | bg:button-background-oncolor-selected fg:text-default ic:icon-default ts:Text md/Medium |
| Selected/Primary-Brand/False/True/NO | bg:button-background-oncolor-hovered fg:text-default ic:icon-default ts:Text md/Medium |
| Selected/Primary-Neutral/False/False/NO | bg:button-background-black-selected fg:text-oncolor-primary ic:icon-oncolor ts:Text md/Medium |
| Selected/Secondary-Solid/False/False/NO | bg:button-background-neutral-selected fg:text-default ic:icon-default ts:Text md/Medium |
| Selected/Secondary-Solid/False/True/NO | bg:button-background-transparent-selected fg:text-primary_on-color ic:icon-oncolor ts:Text md/Medium |
| Selected/Secondary-Outline/False/False/NO | bg:button-background-neutral-selected bd:border-neutral-primary fg:text-default ic:icon-default ts:Text md/Medium |
| Selected/Secondary-Outline/False/True/NO | bg:button-background-transparent-selected bd:border-white-40 fg:text-primary_on-color ic:icon-oncolor ts:Text md/Medium |
| Selected/Subtle/False/False/NO | bg:button-background-neutral-selected fg:text-default ic:icon-default ts:Text md/Medium |
| Selected/Subtle/False/True/NO | bg:button-background-transparent-selected fg:text-primary_on-color ic:icon-oncolor ts:Text md/Medium |
| Selected/Transparent/False/False/NO | fg:button-background-primary-selected ic:icon-default ts:Text md/Medium |
| Selected/Transparent/False/True/NO | fg:link-primary-hovered ic:icon-primary-400 ts:Text md/Medium |
| Selected/Primary-Brand/True/False/NO | bg:button-background-primary-selected ic:icon-oncolor |
| Selected/Primary-Neutral/True/True/NO | bg:button-background-oncolor-selected ic:icon-default |
| Selected/Primary-Brand/True/True/NO | bg:button-background-oncolor-hovered ic:icon-default |
| Selected/Primary-Neutral/True/False/NO | bg:button-background-black-selected ic:icon-oncolor |
| Selected/Secondary-Solid/True/False/NO | bg:button-background-neutral-selected ic:icon-default |
| Selected/Secondary-Solid/True/True/NO | bg:button-background-transparent-selected ic:icon-oncolor |
| Selected/Secondary-Outline/True/False/NO | bg:button-background-neutral-selected bd:border-neutral-primary ic:icon-default |
| Selected/Secondary-Outline/True/True/NO | bg:button-background-transparent-selected bd:border-white-40 ic:icon-oncolor |
| Selected/Subtle/True/False/NO | bg:button-background-neutral-selected ic:icon-default |
| Selected/Subtle/True/True/NO | bg:button-background-transparent-selected ic:icon-oncolor |
| Selected/Transparent/True/False/NO | ic:icon-default |
| Selected/Transparent/True/True/NO | ic:icon-primary-400 |
| Focused/Primary-Brand/False/False/NO | bg:button-background-primary-focused bd:border-black fg:text-oncolor-primary ic:icon-oncolor ts:Text md/Medium |
| Focused/Primary-Neutral/False/True/NO | bg:button-background-oncolor-focused bd:border-white fg:text-default ic:icon-default ts:Text md/Medium |
| Focused/Primary-Brand/False/True/NO | bg:button-background-oncolor-focused bd:border-white fg:text-default ic:icon-default ts:Text md/Medium |
| Focused/Primary-Neutral/False/False/NO | bg:button-background-black-focused bd:border-black fg:text-oncolor-primary ic:icon-oncolor ts:Text md/Medium |
| Focused/Secondary-Solid/False/False/NO | bg:button-background-neutral-focused bd:border-black fg:text-default ic:icon-default ts:Text md/Medium |
| Focused/Secondary-Solid/False/True/NO | bg:button-background-transparent-selected bd:border-white fg:text-primary_on-color ic:icon-oncolor ts:Text md/Medium |
| Focused/Secondary-Outline/False/False/NO | bd:border-black fg:text-default ic:icon-default ts:Text md/Medium |
| Focused/Secondary-Outline/False/True/NO | bd:icon-oncolor fg:text-primary_on-color ic:icon-oncolor ts:Text md/Medium |
| Focused/Subtle/False/False/NO | bd:border-black fg:text-default ic:icon-default ts:Text md/Medium |
| Focused/Subtle/False/True/NO | bd:icon-oncolor fg:text-primary_on-color ic:icon-oncolor ts:Text md/Medium |
| Focused/Transparent/False/False/NO | bd:border-black fg:text-default ic:icon-default ts:Text md/Medium |
| Focused/Transparent/False/True/NO | bd:icon-oncolor fg:text-primary_on-color ic:icon-oncolor ts:Text md/Medium |
| Focused/Primary-Brand/True/False/NO | bg:button-background-primary-focused bd:border-black ic:icon-oncolor |
| Focused/Primary-Neutral/True/True/NO | bg:button-background-oncolor-focused bd:border-white ic:icon-default |
| Focused/Primary-Brand/True/True/NO | bg:button-background-oncolor-focused bd:border-white ic:icon-default |
| Focused/Primary-Neutral/True/False/NO | bg:button-background-black-focused bd:border-black ic:icon-oncolor |
| Focused/Secondary-Solid/True/False/NO | bg:button-background-neutral-focused bd:border-black ic:icon-default |
| Focused/Secondary-Solid/True/True/NO | bg:button-background-transparent-selected bd:border-white ic:icon-oncolor |
| Focused/Secondary-Outline/True/False/NO | bd:border-black ic:icon-default |
| Focused/Secondary-Outline/True/True/NO | bd:icon-oncolor ic:icon-oncolor |
| Focused/Subtle/True/False/NO | bd:border-black ic:icon-default |
| Focused/Subtle/True/True/NO | bd:icon-oncolor ic:icon-oncolor |
| Focused/Transparent/True/False/NO | bd:border-black ic:icon-default |
| Focused/Transparent/True/True/NO | bd:icon-oncolor ic:icon-oncolor |
| Disabled/Primary-Brand/False/False/NO | bg:background-disabled fg:text-default-disabled ic:icon-default-disabled ts:Text md/Medium |
| Disabled/Primary-Neutral/False/True/NO | bg:button-background-disabled-on-color fg:text-default-oncolor-disabled ic:icon-default-oncolor-disabled ts:Text md/Medium |
| Disabled/Primary-Brand/False/True/NO | bg:button-background-disabled-on-color fg:text-default-oncolor-disabled ic:icon-default-oncolor-disabled ts:Text md/Medium |
| Disabled/Primary-Neutral/False/False/NO | bg:background-disabled fg:text-default-disabled ic:icon-default-disabled ts:Text md/Medium |
| Disabled/Secondary-Solid/False/False/NO | bg:background-disabled fg:text-default-disabled ic:icon-default-disabled ts:Text md/Medium |
| Disabled/Secondary-Solid/False/True/NO | bg:button-background-disabled-on-color fg:text-default-oncolor-disabled ic:icon-default-oncolor-disabled ts:Text md/Medium |
| Disabled/Secondary-Outline/False/False/NO | bd:border-neutral-secondary fg:text-default-disabled ic:icon-default-disabled ts:Text md/Medium |
| Disabled/Secondary-Outline/False/True/NO | bd:icon-default-oncolor-disabled fg:text-default-oncolor-disabled ic:icon-default-oncolor-disabled ts:Text md/Medium |
| Disabled/Subtle/False/False/NO | fg:text-default-disabled ic:icon-default-disabled ts:Text md/Medium |
| Disabled/Subtle/False/True/NO | fg:text-default-oncolor-disabled ic:icon-default-oncolor-disabled ts:Text md/Medium |
| Disabled/Transparent/False/False/NO | fg:text-default-disabled ic:icon-default-disabled ts:Text md/Medium |
| Disabled/Transparent/False/True/NO | fg:text-default-oncolor-disabled ic:icon-default-oncolor-disabled ts:Text md/Medium |
| Disabled/Primary-Brand/True/False/NO | bg:background-disabled ic:icon-default-disabled |
| Disabled/Primary-Neutral/True/True/NO | bg:button-background-disabled-on-color ic:icon-default-oncolor-disabled |
| Disabled/Primary-Brand/True/True/NO | bg:button-background-disabled-on-color ic:icon-default-oncolor-disabled |
| Disabled/Primary-Neutral/True/False/NO | bg:background-disabled ic:icon-default-disabled |
| Disabled/Secondary-Solid/True/False/NO | bg:background-disabled ic:icon-default-disabled |
| Disabled/Secondary-Solid/True/True/NO | bg:button-background-disabled-on-color ic:icon-default-oncolor-disabled |
| Disabled/Secondary-Outline/True/False/NO | bd:border-neutral-secondary ic:icon-default-disabled |
| Disabled/Secondary-Outline/True/True/NO | bd:icon-default-oncolor-disabled ic:icon-default-oncolor-disabled |
| Disabled/Subtle/True/False/NO | ic:icon-default-disabled |
| Disabled/Subtle/True/True/NO | ic:icon-default-oncolor-disabled |
| Disabled/Transparent/True/False/NO | ic:icon-default-disabled |
| Disabled/Transparent/True/True/NO | ic:icon-default-oncolor-disabled |
| Default/Primary-Brand/False/False/YES | bg:button-background-danger-primary-default fg:text-oncolor-primary ic:icon-oncolor ts:Text md/Medium |
| Default/Primary-Brand/True/False/YES | bg:button-background-danger-primary-default ic:icon-oncolor |
| Pressed/Primary-Brand/False/False/YES | bg:900 fg:text-oncolor-primary ic:icon-oncolor ts:Text md/Medium |
| Pressed/Primary-Brand/True/False/YES | bg:900 ic:icon-oncolor |
| Focused/Primary-Brand/False/False/YES | bg:600 bd:black fg:text-oncolor-primary ic:icon-oncolor ts:Text md/Medium |
| Focused/Primary-Brand/True/False/YES | bg:600 bd:black ic:icon-oncolor |
| Disabled/Primary-Brand/False/False/YES | bg:background-disabled fg:text-default-disabled ic:icon-default-disabled ts:Text md/Medium |
| Disabled/Primary-Brand/True/False/YES | bg:background-disabled ic:icon-default-disabled |
| Default/Secondary-Solid/False/False/YES | bg:50 fg:text-error ic:icon-error ts:Text md/Medium |
| Default/Secondary-Solid/True/False/YES | bg:50 ic:icon-error |
| Pressed/Secondary-Solid/False/False/YES | bg:200 fg:text-error ic:icon-error ts:Text md/Medium |
| Pressed/Secondary-Solid/True/False/YES | bg:200 ic:icon-error |
| Focused/Secondary-Solid/False/False/YES | bg:button-background-danger-secondary-focused bd:border-black fg:text-error ic:icon-error ts:Text md/Medium |
| Focused/Secondary-Solid/True/False/YES | bg:button-background-danger-secondary-focused bd:border-black ic:icon-error |
| Disabled/Secondary-Solid/False/False/YES | bg:background-disabled fg:text-default-disabled ic:icon-default-disabled ts:Text md/Medium |
| Disabled/Secondary-Solid/True/False/YES | bg:background-disabled ic:icon-default-disabled |
| Default/Secondary-Outline/False/False/YES | bd:400 fg:text-error ic:icon-error ts:Text md/Medium |
| Default/Secondary-Outline/True/False/YES | bd:400 ic:icon-error |
| Pressed/Secondary-Outline/False/False/YES | bg:200 bd:400 fg:text-error ic:icon-error ts:Text md/Medium |
| Pressed/Secondary-Outline/True/False/YES | bg:200 bd:400 ic:icon-error |
| Focused/Secondary-Outline/False/False/YES | bd:border-black fg:text-error ic:icon-error ts:Text md/Medium |
| Focused/Secondary-Outline/True/False/YES | bd:border-black ic:icon-error |
| Disabled/Secondary-Outline/False/False/YES | bd:border-disabled fg:text-default-disabled ic:icon-default-disabled ts:Text md/Medium |
| Disabled/Secondary-Outline/True/False/YES | bd:border-disabled ic:icon-default-disabled |
| Default/Subtle/False/False/YES | fg:text-error ic:icon-error ts:Text md/Medium |
| Default/Subtle/True/False/YES | ic:icon-error |
| Pressed/Subtle/False/False/YES | bg:200 fg:text-error ic:icon-error ts:Text md/Medium |
| Pressed/Subtle/True/False/YES | bg:200 ic:icon-error |
| Focused/Subtle/False/False/YES | bd:border-black fg:text-error ic:icon-error ts:Text md/Medium |
| Focused/Subtle/True/False/YES | bd:border-black ic:icon-error |
| Disabled/Subtle/False/False/YES | fg:text-default-disabled ic:icon-default-disabled ts:Text md/Medium |
| Disabled/Subtle/True/False/YES | ic:icon-default-disabled |
| Default/Transparent/False/False/YES | fg:text-error ic:icon-error ts:Text md/Medium |
| Default/Transparent/True/False/YES | ic:icon-error |
| Pressed/Transparent/False/False/YES | fg:text-error ic:icon-error ts:Text md/Medium |
| Pressed/Transparent/True/False/YES | ic:icon-error |
| Focused/Transparent/False/False/YES | bd:border-black fg:text-error ic:icon-error ts:Text md/Medium |
| Focused/Transparent/True/False/YES | bd:border-black ic:icon-error |
| Disabled/Transparent/False/False/YES | fg:text-default-disabled ic:icon-default-disabled ts:Text md/Medium |
| Disabled/Transparent/True/False/YES | ic:icon-default-disabled |

## Component: Fab_Button  (120 variants)

| Prop | Values / default |
|---|---|
| 🔁 Lead icon | I:11214:99622 |
| Lead icon | B:true |
| Text EN | T:Button |
| Text AR | T:إجراء |
| RTL | False \| True |
| State | Default \| Pressed \| Selected \| Focused \| Disabled |
| Style | Primary-Neutral \| Primary-Brand \| Secondary-Solid |
| Icon only | False \| True |
| On-color | False \| True |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| False | 102x44 H p0/12/0/12 g4 pad-x=spacing-lg gap=tab-button-gap r9999=radius-full |
| True | 44x44 H p0/0/0/0 g4 pad-y=spacing-none pad-x=spacing-none gap=tab-button-gap r9999=radius-full |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| Default/Primary-Brand/False/False | bg:button-background-primary-default fg:text-oncolor-primary ic:icon-oncolor ts:Text md/Medium |
| Default/Primary-Neutral/False/True | bg:button-background-oncolor-default fg:text-primary ic:icon-default ts:Text md/Medium |
| Default/Primary-Brand/False/True | bg:button-background-primary-default fg:text-primary_on-color ic:icon-oncolor ts:Text md/Medium |
| Default/Primary-Neutral/False/False | bg:button-background-black-default fg:text-oncolor-primary ic:icon-oncolor ts:Text md/Medium |
| Default/Secondary-Solid/False/False | bg:button-background-neutral-default fg:text-default ic:icon-default ts:Text md/Medium |
| Default/Secondary-Solid/False/True | bg:button-background-transparent-hovered fg:text-primary_on-color ic:icon-oncolor ts:Text md/Medium |
| Default/Primary-Brand/True/False | bg:button-background-primary-default ic:icon-oncolor |
| Default/Primary-Neutral/True/True | bg:button-background-oncolor-default ic:icon-default |
| Default/Primary-Brand/True/True | bg:button-background-primary-default ic:icon-oncolor |
| Default/Primary-Neutral/True/False | bg:button-background-black-default ic:icon-oncolor |
| Default/Secondary-Solid/True/False | bg:button-background-neutral-default ic:icon-default |
| Default/Secondary-Solid/True/True | bg:button-background-transparent-hovered ic:icon-oncolor |
| Pressed/Primary-Brand/False/False | bg:button-background-primary-pressed fg:text-oncolor-primary ic:icon-oncolor ts:Text md/Medium |
| Pressed/Primary-Neutral/False/True | bg:button-background-oncolor-pressed fg:text-primary ic:icon-default ts:Text md/Medium |
| Pressed/Primary-Brand/False/True | bg:button-background-primary-pressed fg:text-oncolor-primary ic:icon-oncolor ts:Text md/Medium |
| Pressed/Primary-Neutral/False/False | bg:button-background-black-pressed fg:text-oncolor-primary ic:icon-oncolor ts:Text md/Medium |
| Pressed/Secondary-Solid/False/False | bg:button-background-neutral-pressed fg:text-default ic:icon-default ts:Text md/Medium |
| Pressed/Secondary-Solid/False/True | bg:button-background-transparent-pressed fg:text-primary_on-color ic:icon-oncolor ts:Text md/Medium |
| Pressed/Primary-Brand/True/False | bg:button-background-primary-pressed ic:icon-oncolor |
| Pressed/Primary-Neutral/True/True | bg:button-background-oncolor-pressed ic:icon-default |
| Pressed/Primary-Brand/True/True | bg:button-background-primary-pressed ic:icon-oncolor |
| Pressed/Primary-Neutral/True/False | bg:button-background-black-pressed ic:icon-oncolor |
| Pressed/Secondary-Solid/True/False | bg:button-background-neutral-pressed ic:icon-default |
| Pressed/Secondary-Solid/True/True | bg:button-background-transparent-pressed ic:icon-oncolor |
| Selected/Primary-Brand/False/False | bg:button-background-primary-selected fg:text-oncolor-primary ic:icon-oncolor ts:Text md/Medium |
| Selected/Primary-Neutral/False/True | bg:button-background-oncolor-selected fg:text-primary ic:icon-default ts:Text md/Medium |
| Selected/Primary-Brand/False/True | bg:button-background-primary-hovered fg:text-primary_on-color ic:icon-oncolor ts:Text md/Medium |
| Selected/Primary-Neutral/False/False | bg:button-background-black-selected fg:text-oncolor-primary ic:icon-oncolor ts:Text md/Medium |
| Selected/Secondary-Solid/False/False | bg:button-background-neutral-selected fg:text-default ic:icon-default ts:Text md/Medium |
| Selected/Secondary-Solid/False/True | bg:button-background-transparent-selected fg:text-primary_on-color ic:icon-oncolor ts:Text md/Medium |
| Selected/Primary-Brand/True/False | bg:button-background-primary-selected ic:icon-oncolor |
| Selected/Primary-Neutral/True/True | bg:button-background-oncolor-selected ic:icon-default |
| Selected/Primary-Brand/True/True | bg:button-background-primary-hovered ic:icon-oncolor |
| Selected/Primary-Neutral/True/False | bg:button-background-black-selected ic:icon-oncolor |
| Selected/Secondary-Solid/True/False | bg:button-background-neutral-selected ic:icon-default |
| Selected/Secondary-Solid/True/True | bg:button-background-transparent-selected ic:icon-oncolor |
| Focused/Primary-Brand/False/False | bg:button-background-primary-focused bd:border-black fg:text-oncolor-primary ic:icon-oncolor ts:Text md/Medium |
| Focused/Primary-Neutral/False/True | bg:button-background-oncolor-focused bd:white fg:text-primary ic:icon-default ts:Text md/Medium |
| Focused/Primary-Brand/False/True | bg:button-background-primary-focused bd:border-white fg:text-primary_on-color ic:icon-oncolor ts:Text md/Medium |
| Focused/Primary-Neutral/False/False | bg:button-background-black-default bd:border-black fg:text-oncolor-primary ic:icon-oncolor ts:Text md/Medium |
| Focused/Secondary-Solid/False/False | bg:button-background-neutral-focused bd:border-black fg:text-default ic:icon-default ts:Text md/Medium |
| Focused/Secondary-Solid/False/True | bg:button-background-transparent-focused bd:border-white fg:text-primary_on-color ic:icon-oncolor ts:Text md/Medium |
| Focused/Primary-Brand/True/False | bg:button-background-primary-focused bd:border-black ic:icon-oncolor |
| Focused/Primary-Neutral/True/True | bg:button-background-oncolor-focused bd:white ic:icon-default |
| Focused/Primary-Brand/True/True | bg:button-background-primary-focused bd:border-white ic:icon-oncolor |
| Focused/Primary-Neutral/True/False | bg:button-background-black-default bd:border-black ic:icon-oncolor |
| Focused/Secondary-Solid/True/False | bg:button-background-neutral-focused bd:border-black ic:icon-default |
| Focused/Secondary-Solid/True/True | bg:button-background-transparent-focused bd:border-white ic:icon-oncolor |
| Disabled/Primary-Brand/False/False | bg:background-disabled fg:text-default-disabled ic:icon-default-disabled ts:Text md/Medium |
| Disabled/Primary-Neutral/False/True | bg:button-background-disabled-on-color fg:text-default-oncolor-disabled ic:icon-default-oncolor-disabled ts:Text md/Medium |
| Disabled/Primary-Brand/False/True | bg:button-background-disabled-on-color fg:text-default-oncolor-disabled ic:icon-default-oncolor-disabled ts:Text md/Medium |
| Disabled/Primary-Neutral/False/False | bg:background-disabled fg:text-default-disabled ic:icon-default-disabled ts:Text md/Medium |
| Disabled/Secondary-Solid/False/False | bg:background-disabled fg:text-default-disabled ic:icon-default-disabled ts:Text md/Medium |
| Disabled/Secondary-Solid/False/True | bg:button-background-disabled-on-color fg:text-default-oncolor-disabled ic:icon-default-oncolor-disabled ts:Text md/Medium |
| Disabled/Primary-Brand/True/False | bg:background-disabled ic:icon-default-disabled |
| Disabled/Primary-Neutral/True/True | bg:button-background-disabled-on-color ic:icon-default-oncolor-disabled |
| Disabled/Primary-Brand/True/True | bg:button-background-disabled-on-color ic:icon-default-oncolor-disabled |
| Disabled/Primary-Neutral/True/False | bg:background-disabled ic:icon-default-disabled |
| Disabled/Secondary-Solid/True/False | bg:background-disabled ic:icon-default-disabled |
| Disabled/Secondary-Solid/True/True | bg:button-background-disabled-on-color ic:icon-default-oncolor-disabled |

## Component: Button-menu  (360 variants)

| Prop | Values / default |
|---|---|
| 🔁 Lead icon | I:10750:63767 |
| Lead icon | B:false |
| Text EN | T:Button |
| Text AR | T:إجراء |
| RTL | False \| True |
| Size | Large \| Medium \| Small |
| State | Default \| Pressed \| Selected \| Focused \| Disabled |
| Style | Primary-Neutral \| Primary-Brand \| Secondary-Solid \| Secondary-Outline \| Subtle \| Transparent |
| Icon only | False \| True |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| Large/False | 106x40 H p2/16/2/16 g4 pad-y=spacing-xxs pad-x=buttons-lg-padding gap=buttons-lg-gap r4=radius-sm |
| Medium/False | 88x32 H p2/12/2/12 g4 pad-y=spacing-xxs pad-x=buttons-md-padding gap=buttons-md-gap r4=radius-sm |
| Small/False | 70x24 H p2/8/2/8 g4 pad-y=spacing-xxs pad-x=buttons-sm-padding gap=buttons-sm-gap r4=radius-sm |
| Large/True | 52x40 H p0/16/0/16 g4 pad-y=spacing-none pad-x=buttons-lg-padding gap=buttons-lg-gap r4=radius-sm |
| Medium/True | 40x32 H p0/12/0/12 g4 pad-y=spacing-none pad-x=buttons-md-padding gap=buttons-md-gap r4=radius-sm |
| Small/True | 28x24 H p0/8/0/8 g4 pad-y=spacing-none pad-x=buttons-sm-padding gap=buttons-sm-gap r4=radius-sm |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| Default/Primary-Brand/False | bg:button-background-primary-default fg:text-oncolor-primary ic:icon-oncolor |
| Default/Primary-Neutral/False | bg:button-background-black-default fg:text-oncolor-primary ic:icon-oncolor |
| Default/Secondary-Solid/False | bg:button-background-neutral-default fg:text-default ic:icon-default |
| Default/Secondary-Outline/False | bd:400 fg:text-default ic:icon-default |
| Default/Subtle/False | fg:text-default ic:icon-default |
| Default/Transparent/False | fg:text-default ic:icon-default |
| Default/Primary-Brand/True | bg:button-background-primary-default ic:icon-oncolor |
| Default/Primary-Neutral/True | bg:button-background-black-default ic:icon-oncolor |
| Default/Secondary-Solid/True | bg:button-background-neutral-default ic:icon-default |
| Default/Secondary-Outline/True | bd:400 ic:icon-default |
| Default/Subtle/True | ic:icon-default |
| Default/Transparent/True | ic:icon-default |
| Pressed/Primary-Brand/False | bg:button-background-primary-pressed fg:text-oncolor-primary ic:icon-oncolor |
| Pressed/Primary-Neutral/False | bg:button-background-black-pressed fg:text-oncolor-primary ic:icon-oncolor |
| Pressed/Secondary-Solid/False | bg:button-background-neutral-pressed fg:text-default ic:icon-default |
| Pressed/Secondary-Outline/False | bg:button-background-neutral-pressed bd:border-neutral-primary fg:text-default ic:icon-default |
| Pressed/Subtle/False | bg:button-background-neutral-pressed fg:text-default ic:icon-default |
| Pressed/Transparent/False | fg:button-background-primary-pressed ic:icon-default |
| Pressed/Primary-Brand/True | bg:button-background-primary-pressed ic:icon-oncolor |
| Pressed/Primary-Neutral/True | bg:button-background-black-pressed ic:icon-oncolor |
| Pressed/Secondary-Solid/True | bg:button-background-neutral-pressed ic:icon-default |
| Pressed/Secondary-Outline/True | bg:button-background-neutral-pressed bd:border-neutral-primary ic:icon-default |
| Pressed/Subtle/True | bg:button-background-neutral-pressed ic:icon-default |
| Pressed/Transparent/True | ic:icon-default |
| Selected/Primary-Brand/False | bg:button-background-primary-selected fg:text-oncolor-primary ic:icon-oncolor |
| Selected/Primary-Neutral/False | bg:button-background-black-selected fg:text-oncolor-primary ic:icon-oncolor |
| Selected/Secondary-Solid/False | bg:button-background-neutral-selected fg:text-default ic:icon-default |
| Selected/Secondary-Outline/False | bg:button-background-neutral-selected bd:border-neutral-primary fg:text-default ic:icon-default |
| Selected/Subtle/False | bg:button-background-neutral-selected fg:text-default ic:icon-default |
| Selected/Transparent/False | fg:button-background-primary-selected ic:icon-default |
| Selected/Primary-Brand/True | bg:button-background-primary-selected ic:icon-oncolor |
| Selected/Primary-Neutral/True | bg:button-background-black-selected ic:icon-oncolor |
| Selected/Secondary-Solid/True | bg:button-background-neutral-selected ic:icon-default |
| Selected/Secondary-Outline/True | bg:button-background-neutral-selected bd:border-neutral-primary ic:icon-default |
| Selected/Subtle/True | bg:button-background-neutral-selected ic:icon-default |
| Selected/Transparent/True | ic:icon-default |
| Focused/Primary-Brand/False | bg:button-background-primary-focused bd:border-black fg:text-oncolor-primary ic:icon-oncolor |
| Focused/Primary-Neutral/False | bg:button-background-black-default bd:border-black fg:text-oncolor-primary ic:icon-oncolor |
| Focused/Secondary-Solid/False | bg:button-background-neutral-focused bd:black fg:text-default ic:icon-default |
| Focused/Secondary-Outline/False | bd:border-black fg:text-default ic:icon-default |
| Focused/Subtle/False | bd:border-black fg:text-default ic:icon-default |
| Focused/Transparent/False | bd:border-black fg:text-default ic:icon-default |
| Focused/Primary-Brand/True | bg:button-background-primary-focused bd:border-black ic:icon-oncolor |
| Focused/Primary-Neutral/True | bg:button-background-black-default bd:border-black ic:icon-oncolor |
| Focused/Secondary-Solid/True | bg:button-background-neutral-focused bd:black ic:icon-default |
| Focused/Secondary-Outline/True | bd:border-black ic:icon-default |
| Focused/Subtle/True | bd:border-black ic:icon-default |
| Focused/Transparent/True | bd:border-black ic:icon-default |
| Disabled/Primary-Brand/False | bg:background-disabled fg:text-default-disabled ic:icon-default-disabled |
| Disabled/Primary-Neutral/False | bg:background-disabled fg:text-default-disabled ic:icon-default-disabled |
| Disabled/Secondary-Solid/False | bg:background-disabled fg:text-default-disabled ic:icon-default-disabled |
| Disabled/Secondary-Outline/False | bd:border-disabled fg:text-default-disabled ic:icon-default-disabled |
| Disabled/Subtle/False | fg:text-default-disabled ic:icon-default-disabled |
| Disabled/Transparent/False | fg:text-default-disabled ic:icon-default-disabled |
| Disabled/Primary-Brand/True | bg:background-disabled ic:icon-default-disabled |
| Disabled/Primary-Neutral/True | bg:background-disabled ic:icon-default-disabled |
| Disabled/Secondary-Solid/True | bg:background-disabled ic:icon-default-disabled |
| Disabled/Secondary-Outline/True | bd:border-disabled ic:icon-default-disabled |
| Disabled/Subtle/True | ic:icon-default-disabled |
| Disabled/Transparent/True | ic:icon-default-disabled |

## Component: Button-Close  (24 variants)

| Prop | Values / default |
|---|---|
| Size | Small \| Medium \| Large \| x Small |
| State | Default \| Pressed \| Focused |
| On-color | False \| True |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| x Small | 20x20 H p8/8/8/8 g0 pad-y=spacing-md pad-x=spacing-md r9999=radius-full |
| Small | 24x24 H p8/8/8/8 g0 pad-y=spacing-md pad-x=spacing-md r9999=radius-full |
| Medium | 32x32 H p8/8/8/8 g0 pad-y=spacing-md pad-x=spacing-md r9999=radius-full |
| Large | 40x40 H p8/8/8/8 g0 pad-y=spacing-md pad-x=spacing-md r9999=radius-full |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| Default/False | bg:button-background-neutral-default ic:icon-default |
| Pressed/False | bg:button-background-neutral-pressed ic:icon-default |
| Focused/False | bd:border-black ic:icon-default |
| Default/True | bg:button-background-transparent-default ic:icon-oncolor |
| Pressed/True | bg:button-background-transparent-pressed ic:icon-oncolor |
| Focused/True | bd:border-white ic:icon-oncolor |
