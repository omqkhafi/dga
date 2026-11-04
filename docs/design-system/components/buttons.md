# Buttons (web)

Source: Figma web file `trJvYAeN2wdayn2VdSUR2N`, page "Buttons". All values below are read from Figma component variants (LTR variants; RTL variants mirror them). Token names are Figma variable names (last segment); see `tokens.css`.

## Usage (plain language)

Buttons are interactive components that trigger specific actions. The label on a button describes the action that will occur when it is clicked by the user.

## Component: Button  (1344 variants)

| Prop | Values / default |
|---|---|
| Trail icon | B:false |
| Text EN | T:Button |
| Text AR | T:إجراء |
| Lead Icon | B:true |
| 🔁 Swap Trail Icon | I:13758:238512 |
| 🔁 Swap Lead Icon | I:13758:241700 |
| RTL | False \| True |
| Size | Large \| Medium \| Small |
| State | Default \| Hovered \| Pressed \| Selected \| Focused \| Disabled |
| Style | Primary \| Neutral \| Secondary-Solid \| Secondary-Outline \| Subtle \| Transparent |
| Destructive | no \| yes |
| Icon only | False \| True |
| On-color | False \| True |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| Large/False | 110x40 H p0/16/0/16 g4 pad-y=spacing-none pad-x=buttons-lg-padding gap=buttons-lg-gap r4=radius-sm |
| Medium/False | 92x32 H p0/12/0/12 g4 pad-y=spacing-none pad-x=buttons-md-padding gap=buttons-md-gap r4=radius-sm |
| Small/False | 74x24 H p0/8/0/8 g4 pad-y=spacing-none pad-x=buttons-sm-padding gap=buttons-sm-gap r4=radius-sm |
| Large/True | 40x40 H p0/16/0/16 g4 pad-y=spacing-none pad-x=buttons-lg-padding gap=buttons-lg-gap r4=radius-sm |
| Medium/True | 32x32 H p0/12/0/12 g4 pad-y=spacing-none pad-x=buttons-md-padding gap=buttons-md-gap r4=radius-sm |
| Small/True | 24x24 H p0/8/0/8 g4 pad-y=spacing-none pad-x=buttons-sm-padding gap=buttons-sm-gap r4=radius-sm |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| Default/Primary/no/False/False | bg:button-background-primary-default fg:text-oncolor-primary ic:icon-oncolor ts:Text md/Medium |
| Default/Neutral/no/False/True | bg:button-background-oncolor-default fg:text-default ic:icon-default ts:Text md/Medium |
| Default/Primary/no/False/True | bg:button-background-oncolor-default fg:text-default ic:icon-default ts:Text md/Medium |
| Default/Neutral/no/False/False | bg:button-background-black-default fg:text-oncolor-primary ic:icon-oncolor ts:Text md/Medium |
| Default/Secondary-Solid/no/False/False | bg:button-background-neutral-default fg:text-default ic:icon-default ts:Text md/Medium |
| Default/Secondary-Solid/no/False/True | bg:button-background-transparent-hovered fg:text-oncolor-primary ic:icon-oncolor ts:Text md/Medium |
| Default/Secondary-Outline/no/False/False | bd:border-neutral-primary fg:text-default ic:icon-default ts:Text md/Medium |
| Default/Secondary-Outline/no/False/True | bd:border-white-40 fg:text-oncolor-primary ic:icon-oncolor ts:Text md/Medium |
| Default/Subtle/no/False/False | fg:text-default ic:icon-default ts:Text md/Medium |
| Default/Subtle/no/False/True | fg:text-oncolor-primary ic:icon-oncolor ts:Text md/Medium |
| Default/Transparent/no/False/False | fg:text-default ic:icon-default ts:Text md/Medium |
| Default/Transparent/no/False/True | fg:text-oncolor-primary ic:icon-oncolor ts:Text md/Medium |
| Default/Primary/no/True/False | bg:button-background-primary-default ic:icon-oncolor |
| Default/Neutral/no/True/True | bg:button-background-oncolor-default ic:icon-default |
| Default/Primary/no/True/True | bg:button-background-oncolor-default ic:icon-default |
| Default/Neutral/no/True/False | bg:button-background-black-default ic:icon-oncolor |
| Default/Secondary-Solid/no/True/False | bg:button-background-neutral-default ic:icon-default |
| Default/Secondary-Solid/no/True/True | bg:button-background-transparent-hovered ic:icon-oncolor |
| Default/Secondary-Outline/no/True/False | bd:border-neutral-primary ic:icon-default |
| Default/Secondary-Outline/no/True/True | bd:border-white-40 ic:icon-oncolor |
| Default/Subtle/no/True/False | ic:icon-default |
| Default/Subtle/no/True/True | ic:icon-oncolor |
| Default/Transparent/no/True/False | ic:icon-default |
| Default/Transparent/no/True/True | ic:icon-oncolor |
| Hovered/Primary/no/False/False | bg:button-background-primary-hovered fg:text-oncolor-primary ic:icon-oncolor ts:Text md/Medium |
| Hovered/Neutral/no/False/True | bg:button-background-oncolor-hovered fg:text-default ic:icon-default ts:Text md/Medium |
| Hovered/Primary/no/False/True | bg:button-background-oncolor-hovered fg:text-default ic:icon-default ts:Text md/Medium |
| Hovered/Neutral/no/False/False | bg:button-background-black-hovered fg:text-oncolor-primary ic:icon-oncolor ts:Text md/Medium |
| Hovered/Secondary-Solid/no/False/False | bg:button-background-neutral-pressed fg:text-default ic:icon-default ts:Text md/Medium |
| Hovered/Secondary-Solid/no/False/True | bg:button-background-transparent-hovered fg:text-oncolor-primary ic:icon-oncolor ts:Text md/Medium |
| Hovered/Secondary-Outline/no/False/False | bg:button-background-neutral-default bd:border-neutral-secondary fg:text-default ic:icon-default ts:Text md/Medium |
| Hovered/Secondary-Outline/no/False/True | bg:button-background-transparent-hovered bd:border-white-40 fg:text-oncolor-primary ic:icon-oncolor ts:Text md/Medium |
| Hovered/Subtle/no/False/False | bg:button-background-neutral-default fg:text-default ic:icon-default ts:Text md/Medium |
| Hovered/Subtle/no/False/True | bg:button-background-transparent-hovered fg:text-oncolor-primary ic:icon-oncolor ts:Text md/Medium |
| Hovered/Transparent/no/False/False | fg:button-background-primary-hovered ic:button-background-primary-hovered ts:Text md/Medium |
| Hovered/Transparent/no/False/True | fg:button-label-transparent-hovered-on-color ic:Button-icon-transparent-hovered-on-color ts:Text md/Medium |
| Hovered/Primary/no/True/False | bg:button-background-primary-hovered ic:icon-oncolor |
| Hovered/Neutral/no/True/True | bg:button-background-oncolor-hovered ic:icon-default |
| Hovered/Primary/no/True/True | bg:button-background-oncolor-hovered ic:icon-default |
| Hovered/Neutral/no/True/False | bg:button-background-black-hovered ic:icon-oncolor |
| Hovered/Secondary-Solid/no/True/False | bg:button-background-neutral-pressed ic:icon-default |
| Hovered/Secondary-Solid/no/True/True | bg:button-background-transparent-hovered ic:icon-oncolor |
| Hovered/Secondary-Outline/no/True/False | bg:button-background-neutral-default bd:border-neutral-secondary ic:icon-default |
| Hovered/Secondary-Outline/no/True/True | bg:button-background-transparent-hovered bd:border-white-40 ic:icon-oncolor |
| Hovered/Subtle/no/True/False | bg:button-background-neutral-default ic:icon-default |
| Hovered/Subtle/no/True/True | bg:button-background-transparent-hovered ic:icon-oncolor |
| Hovered/Transparent/no/True/False | ic:button-background-primary-hovered |
| Hovered/Transparent/no/True/True | ic:Button-icon-transparent-hovered-on-color |
| Pressed/Primary/no/False/False | bg:button-background-primary-pressed fg:text-oncolor-primary ic:icon-oncolor ts:Text md/Medium |
| Pressed/Neutral/no/False/True | bg:button-background-oncolor-pressed fg:text-default ic:icon-default ts:Text md/Medium |
| Pressed/Primary/no/False/True | bg:button-background-oncolor-pressed fg:text-default ic:icon-default ts:Text md/Medium |
| Pressed/Neutral/no/False/False | bg:button-background-black-pressed fg:text-oncolor-primary ic:icon-oncolor ts:Text md/Medium |
| Pressed/Secondary-Solid/no/False/False | bg:button-background-neutral-pressed fg:text-default ic:icon-default ts:Text md/Medium |
| Pressed/Secondary-Solid/no/False/True | bg:button-background-transparent-pressed fg:text-oncolor-primary ic:icon-oncolor ts:Text md/Medium |
| Pressed/Secondary-Outline/no/False/False | bg:button-background-neutral-pressed bd:border-neutral-primary fg:text-default ic:icon-default ts:Text md/Medium |
| Pressed/Secondary-Outline/no/False/True | bg:button-background-transparent-pressed bd:border-white-40 fg:text-oncolor-primary ic:icon-oncolor ts:Text md/Medium |
| Pressed/Subtle/no/False/False | bg:button-background-neutral-pressed fg:text-default ic:icon-default ts:Text md/Medium |
| Pressed/Subtle/no/False/True | bg:button-background-transparent-pressed fg:text-oncolor-primary ic:icon-oncolor ts:Text md/Medium |
| Pressed/Transparent/no/False/False | fg:button-background-primary-pressed ic:button-background-primary-pressed ts:Text md/Medium |
| Pressed/Transparent/no/False/True | fg:button-label-transparent-pressed-on-color ic:button-icon-transparent-pressed-on-color ts:Text md/Medium |
| Pressed/Primary/no/True/False | bg:button-background-primary-pressed ic:icon-oncolor |
| Pressed/Neutral/no/True/True | bg:button-background-oncolor-pressed ic:icon-default |
| Pressed/Primary/no/True/True | bg:button-background-oncolor-pressed ic:icon-default |
| Pressed/Neutral/no/True/False | bg:button-background-black-pressed ic:icon-oncolor |
| Pressed/Secondary-Solid/no/True/False | bg:button-background-neutral-pressed ic:icon-default |
| Pressed/Secondary-Solid/no/True/True | bg:button-background-transparent-pressed ic:icon-oncolor |
| Pressed/Secondary-Outline/no/True/False | bg:button-background-neutral-pressed bd:border-neutral-primary ic:icon-default |
| Pressed/Secondary-Outline/no/True/True | bg:button-background-transparent-pressed bd:border-white-40 ic:icon-oncolor |
| Pressed/Subtle/no/True/False | bg:button-background-neutral-pressed ic:icon-default |
| Pressed/Subtle/no/True/True | bg:button-background-transparent-pressed ic:icon-oncolor |
| Pressed/Transparent/no/True/False | ic:button-background-primary-pressed |
| Pressed/Transparent/no/True/True | ic:button-icon-transparent-pressed-on-color |
| Selected/Primary/no/False/False | bg:button-background-primary-selected fg:text-oncolor-primary ic:icon-oncolor ts:Text md/Medium |
| Selected/Neutral/no/False/True | bg:button-background-oncolor-selected fg:text-default ic:icon-default ts:Text md/Medium |
| Selected/Primary/no/False/True | bg:button-background-oncolor-pressed fg:text-default ic:icon-default ts:Text md/Medium |
| Selected/Neutral/no/False/False | bg:button-background-black-selected fg:text-oncolor-primary ic:icon-oncolor ts:Text md/Medium |
| Selected/Secondary-Solid/no/False/False | bg:button-background-neutral-selected fg:text-default ic:icon-default ts:Text md/Medium |
| Selected/Secondary-Solid/no/False/True | bg:button-background-transparent-selected fg:text-oncolor-primary ic:icon-oncolor ts:Text md/Medium |
| Selected/Secondary-Outline/no/False/False | bg:button-background-neutral-selected bd:border-neutral-primary fg:text-default ic:icon-default ts:Text md/Medium |
| Selected/Secondary-Outline/no/False/True | bg:button-background-transparent-selected bd:border-white-40 fg:text-oncolor-primary ic:icon-oncolor ts:Text md/Medium |
| Selected/Subtle/no/False/False | bg:button-background-neutral-selected fg:text-default ic:icon-default ts:Text md/Medium |
| Selected/Subtle/no/False/True | bg:button-background-transparent-selected fg:text-oncolor-primary ic:icon-oncolor ts:Text md/Medium |
| Selected/Transparent/no/False/False | fg:button-background-primary-selected ic:button-background-primary-selected ts:Text md/Medium |
| Selected/Transparent/no/False/True | fg:button-label-transparent-selected-on-color ic:button-icon-transparent-selected-on-color ts:Text md/Medium |
| Selected/Primary/no/True/False | bg:button-background-primary-selected ic:icon-oncolor |
| Selected/Neutral/no/True/True | bg:button-background-oncolor-selected ic:icon-default |
| Selected/Primary/no/True/True | bg:button-background-oncolor-pressed ic:icon-default |
| Selected/Neutral/no/True/False | bg:button-background-black-selected ic:icon-oncolor |
| Selected/Secondary-Solid/no/True/False | bg:button-background-neutral-selected ic:icon-default |
| Selected/Secondary-Solid/no/True/True | bg:button-background-transparent-selected ic:icon-oncolor |
| Selected/Secondary-Outline/no/True/False | bg:button-background-neutral-selected bd:border-neutral-primary ic:icon-default |
| Selected/Secondary-Outline/no/True/True | bg:button-background-transparent-selected bd:border-white-40 ic:icon-oncolor |
| Selected/Subtle/no/True/False | bg:button-background-neutral-selected ic:icon-default |
| Selected/Subtle/no/True/True | bg:button-background-transparent-selected ic:icon-oncolor |
| Selected/Transparent/no/True/False | ic:icon-default |
| Selected/Transparent/no/True/True | ic:button-icon-transparent-selected-on-color |
| Focused/Primary/no/False/False | bg:button-background-primary-default bd:border-black fg:text-oncolor-primary ic:icon-oncolor ts:Text md/Medium |
| Focused/Neutral/no/False/True | bg:button-background-oncolor-focused bd:border-white fg:text-default ic:icon-default ts:Text md/Medium |
| Focused/Primary/no/False/True | bg:button-background-oncolor-focused bd:border-white fg:text-default ic:icon-default ts:Text md/Medium |
| Focused/Neutral/no/False/False | bg:button-background-black-focused bd:border-black fg:text-oncolor-primary ic:icon-oncolor ts:Text md/Medium |
| Focused/Secondary-Solid/no/False/False | bg:button-background-neutral-focused bd:border-black fg:text-default ic:icon-default ts:Text md/Medium |
| Focused/Secondary-Solid/no/False/True | bg:button-background-transparent-hovered bd:icon-oncolor fg:text-oncolor-primary ic:icon-oncolor ts:Text md/Medium |
| Focused/Secondary-Outline/no/False/False | bd:border-black fg:text-default ic:icon-default ts:Text md/Medium |
| Focused/Secondary-Outline/no/False/True | bd:icon-oncolor fg:text-oncolor-primary ic:icon-oncolor ts:Text md/Medium |
| Focused/Subtle/no/False/False | bd:border-black fg:text-default ic:icon-default ts:Text md/Medium |
| Focused/Subtle/no/False/True | bd:icon-oncolor fg:text-oncolor-primary ic:icon-oncolor ts:Text md/Medium |
| Focused/Transparent/no/False/False | bd:border-black fg:text-default ic:icon-default ts:Text md/Medium |
| Focused/Transparent/no/False/True | bd:icon-oncolor fg:text-oncolor-primary ic:icon-oncolor ts:Text md/Medium |
| Focused/Primary/no/True/False | bg:button-background-primary-default bd:border-black ic:icon-oncolor |
| Focused/Neutral/no/True/True | bg:button-background-oncolor-focused bd:border-white ic:icon-default |
| Focused/Primary/no/True/True | bg:button-background-oncolor-focused bd:border-white ic:icon-default |
| Focused/Neutral/no/True/False | bg:button-background-black-focused bd:border-black ic:icon-oncolor |
| Focused/Secondary-Solid/no/True/False | bg:button-background-neutral-focused bd:border-black ic:icon-default |
| Focused/Secondary-Solid/no/True/True | bg:button-background-transparent-hovered bd:icon-oncolor ic:icon-oncolor |
| Focused/Secondary-Outline/no/True/False | bd:border-black ic:icon-default |
| Focused/Secondary-Outline/no/True/True | bd:icon-oncolor ic:icon-oncolor |
| Focused/Subtle/no/True/False | bd:border-black ic:icon-default |
| Focused/Subtle/no/True/True | bd:icon-oncolor ic:icon-oncolor |
| Focused/Transparent/no/True/False | bd:border-black ic:icon-default |
| Focused/Transparent/no/True/True | bd:icon-oncolor ic:icon-oncolor |
| Disabled/Primary/no/False/False | bg:background-disabled fg:text-default-disabled ic:icon-default-disabled ts:Text md/Medium |
| Disabled/Neutral/no/False/True | bg:button-background-disabled-on-color fg:text-default-oncolor-disabled ic:icon-default-oncolor-disabled ts:Text md/Medium |
| Disabled/Primary/no/False/True | bg:button-background-disabled-on-color fg:text-default-oncolor-disabled ic:icon-default-oncolor-disabled ts:Text md/Medium |
| Disabled/Neutral/no/False/False | bg:background-disabled fg:text-default-disabled ic:icon-default-disabled ts:Text md/Medium |
| Disabled/Secondary-Solid/no/False/False | bg:background-disabled fg:text-default-disabled ic:icon-default-disabled ts:Text md/Medium |
| Disabled/Secondary-Solid/no/False/True | bg:button-background-disabled-on-color fg:text-default-oncolor-disabled ic:icon-default-oncolor-disabled ts:Text md/Medium |
| Disabled/Secondary-Outline/no/False/False | bd:border-neutral-secondary fg:text-default-disabled ic:icon-default-disabled ts:Text md/Medium |
| Disabled/Secondary-Outline/no/False/True | bd:icon-default-oncolor-disabled fg:text-default-oncolor-disabled ic:icon-default-oncolor-disabled ts:Text md/Medium |
| Disabled/Subtle/no/False/False | fg:text-default-disabled ic:icon-default-disabled ts:Text md/Medium |
| Disabled/Subtle/no/False/True | fg:text-default-oncolor-disabled ic:icon-default-oncolor-disabled ts:Text md/Medium |
| Disabled/Transparent/no/False/False | fg:text-default-disabled ic:icon-default-disabled ts:Text md/Medium |
| Disabled/Transparent/no/False/True | fg:text-default-oncolor-disabled ic:icon-default-oncolor-disabled ts:Text md/Medium |
| Disabled/Primary/no/True/False | bg:background-disabled ic:icon-default-disabled |
| Disabled/Neutral/no/True/True | bg:button-background-disabled-on-color ic:icon-default-oncolor-disabled |
| Disabled/Primary/no/True/True | bg:button-background-disabled-on-color ic:icon-default-oncolor-disabled |
| Disabled/Neutral/no/True/False | bg:background-disabled ic:icon-default-disabled |
| Disabled/Secondary-Solid/no/True/False | bg:background-disabled ic:icon-default-disabled |
| Disabled/Secondary-Solid/no/True/True | bg:button-background-disabled-on-color ic:icon-default-oncolor-disabled |
| Disabled/Secondary-Outline/no/True/False | bd:border-neutral-secondary ic:icon-default-disabled |
| Disabled/Secondary-Outline/no/True/True | bd:icon-default-oncolor-disabled ic:icon-default-oncolor-disabled |
| Disabled/Subtle/no/True/False | ic:icon-default-disabled |
| Disabled/Subtle/no/True/True | ic:icon-default-oncolor-disabled |
| Disabled/Transparent/no/True/False | ic:icon-default-disabled |
| Disabled/Transparent/no/True/True | ic:icon-default-oncolor-disabled |
| Default/Primary/yes/False/False | bg:button-background-danger-primary-default fg:text-oncolor-primary ic:icon-oncolor ts:Text md/Medium |
| Default/Primary/yes/False/True | bg:button-background-danger-primary-default fg:text-oncolor-primary ic:icon-oncolor ts:Text md/Medium |
| Default/Secondary-Solid/yes/False/False | bg:button-background-danger-secondary-default fg:text-error ic:icon-error ts:Text md/Medium |
| Default/Secondary-Solid/yes/False/True | bg:button-background-danger-secondary-default fg:text-error ic:icon-error ts:Text md/Medium |
| Default/Secondary-Outline/yes/False/False | bd:border-error-light fg:text-error ic:icon-error ts:Text md/Medium |
| Default/Secondary-Outline/yes/False/True | bd:border-error-light fg:button-label-danger-primary-default-oncolor ic:button-label-danger-primary-default-oncolor ts:Text md/Medium |
| Default/Subtle/yes/False/False | fg:text-error ic:icon-error ts:Text md/Medium |
| Default/Subtle/yes/False/True | fg:button-label-danger-primary-default-oncolor ic:button-label-danger-primary-default-oncolor ts:Text md/Medium |
| Default/Transparent/yes/False/False | fg:button-background-danger-primary-default ic:button-background-danger-primary-default ts:Text md/Medium |
| Default/Transparent/yes/False/True | fg:button-label-danger-primary-default-oncolor ic:button-label-danger-primary-default-oncolor ts:Text md/Medium |
| Default/Primary/yes/True/False | bg:button-background-danger-primary-default ic:icon-oncolor |
| Default/Primary/yes/True/True | bg:button-background-danger-primary-default ic:icon-oncolor |
| Default/Secondary-Solid/yes/True/False | bg:button-background-danger-secondary-default ic:icon-error |
| Default/Secondary-Solid/yes/True/True | bg:button-background-danger-secondary-default ic:icon-error |
| Default/Secondary-Outline/yes/True/False | bd:border-error-light ic:icon-error |
| Default/Secondary-Outline/yes/True/True | bd:border-error-light ic:button-label-danger-primary-default-oncolor |

## Component: Button-menu  (432 variants)

Menu button functions as a toggle to reveal a menu presenting various options.

| Prop | Values / default |
|---|---|
| 🔁 Swap Lead icon | I:13758:241591 |
| Lead icon | B:false |
| Text EN | T:Button |
| Text AR | T:إجراء |
| RTL | False \| True |
| Size | Large \| Medium \| Small |
| State | Default \| Hovered \| Pressed \| Selected \| Focused \| Disabled |
| Style | Primary \| Neutral \| Secondary-Solid \| Secondary-Outline \| Subtle \| Transparent |
| Icon only | False \| True |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| Large/False | 106x40 H p0/16/0/16 g4 pad-x=buttons-lg-padding gap=buttons-lg-gap r4=radius-sm |
| Medium/False | 88x32 H p0/12/0/12 g4 pad-x=buttons-md-padding gap=buttons-md-gap r4=radius-sm |
| Small/False | 70x24 H p0/8/0/8 g4 pad-x=buttons-sm-padding gap=buttons-sm-gap r4=radius-sm |
| Large/True | 80x40 H p0/16/0/16 g4 pad-y=spacing-none pad-x=buttons-lg-padding gap=buttons-lg-gap r4=radius-sm |
| Medium/True | 64x32 H p0/12/0/12 g4 pad-y=spacing-none pad-x=buttons-md-padding gap=buttons-md-gap r4=radius-sm |
| Small/True | 48x24 H p0/8/0/8 g4 pad-y=spacing-none pad-x=buttons-sm-padding gap=buttons-sm-gap r4=radius-sm |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| Default/Primary/False | bg:button-background-primary-default fg:text-oncolor-primary ic:icon-oncolor ts:Text md/Medium |
| Default/Neutral/False | bg:button-background-black-default fg:text-oncolor-primary ic:icon-oncolor ts:Text md/Medium |
| Default/Secondary-Solid/False | bg:button-background-neutral-default fg:text-default ic:icon-default ts:Text md/Medium |
| Default/Secondary-Outline/False | bd:border-neutral-primary fg:text-default ic:icon-default ts:Text md/Medium |
| Default/Subtle/False | fg:text-default ic:icon-default ts:Text md/Medium |
| Default/Transparent/False | fg:text-default ic:icon-default ts:Text md/Medium |
| Default/Primary/True | bg:button-background-primary-default ic:icon-oncolor |
| Default/Neutral/True | bg:button-background-black-default ic:icon-oncolor |
| Default/Secondary-Solid/True | bg:button-background-neutral-default ic:icon-default |
| Default/Secondary-Outline/True | bd:border-neutral-primary ic:icon-default |
| Default/Subtle/True | ic:icon-default |
| Default/Transparent/True | ic:icon-default |
| Hovered/Primary/False | bg:button-background-primary-hovered fg:text-oncolor-primary ic:icon-oncolor ts:Text md/Medium |
| Hovered/Neutral/False | bg:button-background-black-hovered fg:text-oncolor-primary ic:icon-oncolor ts:Text md/Medium |
| Hovered/Secondary-Solid/False | bg:button-background-neutral-hovered fg:text-default ic:icon-default ts:Text md/Medium |
| Hovered/Secondary-Outline/False | bg:button-background-neutral-hovered bd:border-neutral-primary fg:text-default ic:icon-default ts:Text md/Medium |
| Hovered/Subtle/False | bg:button-background-neutral-hovered fg:text-default ic:icon-default ts:Text md/Medium |
| Hovered/Transparent/False | fg:button-background-primary-hovered ic:button-background-primary-hovered ts:Text md/Medium |
| Hovered/Primary/True | bg:button-background-primary-hovered ic:icon-oncolor |
| Hovered/Neutral/True | bg:button-background-black-hovered ic:icon-oncolor |
| Hovered/Secondary-Solid/True | bg:button-background-neutral-hovered ic:icon-default |
| Hovered/Secondary-Outline/True | bg:button-background-neutral-hovered bd:border-neutral-primary ic:icon-default |
| Hovered/Subtle/True | bg:button-background-neutral-hovered ic:icon-default |
| Hovered/Transparent/True | ic:button-background-primary-hovered |
| Pressed/Primary/False | bg:button-background-primary-pressed fg:text-oncolor-primary ic:icon-oncolor ts:Text md/Medium |
| Pressed/Neutral/False | bg:button-background-black-pressed fg:text-oncolor-primary ic:icon-oncolor ts:Text md/Medium |
| Pressed/Secondary-Solid/False | bg:button-background-neutral-pressed fg:text-default ic:icon-default ts:Text md/Medium |
| Pressed/Secondary-Outline/False | bg:button-background-neutral-pressed bd:border-neutral-primary fg:text-default ic:icon-default ts:Text md/Medium |
| Pressed/Subtle/False | bg:button-background-neutral-pressed fg:text-default ic:icon-default ts:Text md/Medium |
| Pressed/Transparent/False | fg:button-background-primary-pressed ic:button-background-primary-pressed ts:Text md/Medium |
| Pressed/Primary/True | bg:button-background-primary-pressed ic:icon-oncolor |
| Pressed/Neutral/True | bg:button-background-black-pressed ic:icon-oncolor |
| Pressed/Secondary-Solid/True | bg:button-background-neutral-pressed ic:icon-default |
| Pressed/Secondary-Outline/True | bg:button-background-neutral-pressed bd:border-neutral-primary ic:icon-default |
| Pressed/Subtle/True | bg:button-background-neutral-pressed ic:icon-default |
| Pressed/Transparent/True | ic:button-background-primary-pressed |
| Selected/Primary/False | bg:button-background-primary-selected fg:text-oncolor-primary ic:icon-oncolor ts:Text md/Medium |
| Selected/Neutral/False | bg:button-background-black-selected fg:text-oncolor-primary ic:icon-oncolor ts:Text md/Medium |
| Selected/Secondary-Solid/False | bg:button-background-neutral-selected fg:text-default ic:icon-default ts:Text md/Medium |
| Selected/Secondary-Outline/False | bg:button-background-neutral-selected bd:border-neutral-primary fg:text-default ic:icon-default ts:Text md/Medium |
| Selected/Subtle/False | bg:button-background-neutral-selected fg:text-default ic:icon-default ts:Text md/Medium |
| Selected/Transparent/False | fg:button-background-primary-selected ic:button-background-primary-selected ts:Text md/Medium |
| Selected/Primary/True | bg:button-background-primary-selected ic:icon-oncolor |
| Selected/Neutral/True | bg:button-background-black-selected ic:icon-oncolor |
| Selected/Secondary-Solid/True | bg:button-background-neutral-selected ic:icon-default |
| Selected/Secondary-Outline/True | bg:button-background-neutral-selected bd:border-neutral-primary ic:icon-default |
| Selected/Subtle/True | bg:button-background-neutral-selected ic:icon-default |
| Selected/Transparent/True | ic:button-background-primary-selected |
| Focused/Primary/False | bg:button-background-primary-focused bd:border-black fg:text-oncolor-primary ic:icon-oncolor ts:Text md/Medium |
| Focused/Neutral/False | bg:button-background-black-focused bd:border-black fg:text-oncolor-primary ic:icon-oncolor ts:Text md/Medium |
| Focused/Secondary-Solid/False | bg:button-background-neutral-focused bd:border-black fg:text-default ic:icon-default ts:Text md/Medium |
| Focused/Secondary-Outline/False | bd:border-black fg:text-default ic:icon-default ts:Text md/Medium |
| Focused/Subtle/False | bd:border-black fg:text-default ic:icon-default ts:Text md/Medium |
| Focused/Transparent/False | bd:border-black fg:text-default ic:icon-default ts:Text md/Medium |
| Focused/Primary/True | bg:button-background-primary-focused bd:border-black ic:icon-oncolor |
| Focused/Neutral/True | bg:button-background-black-focused bd:border-black ic:icon-oncolor |
| Focused/Secondary-Solid/True | bg:button-background-neutral-focused bd:border-black ic:icon-default |
| Focused/Secondary-Outline/True | bd:border-black ic:icon-default |
| Focused/Subtle/True | bd:border-black ic:icon-default |
| Focused/Transparent/True | bd:border-black ic:icon-default |
| Disabled/Primary/False | bg:background-disabled fg:text-default-disabled ic:icon-default-disabled ts:Text md/Medium |
| Disabled/Neutral/False | bg:background-disabled fg:text-default-disabled ic:icon-default-disabled ts:Text md/Medium |
| Disabled/Secondary-Solid/False | bg:background-disabled fg:text-default-disabled ic:icon-default-disabled ts:Text md/Medium |
| Disabled/Secondary-Outline/False | bd:border-neutral-secondary fg:text-default-disabled ic:icon-default-disabled ts:Text md/Medium |
| Disabled/Subtle/False | fg:text-default-disabled ic:icon-default-disabled ts:Text md/Medium |
| Disabled/Transparent/False | fg:text-default-disabled ic:icon-default-disabled ts:Text md/Medium |
| Disabled/Primary/True | bg:background-disabled ic:icon-default-disabled |
| Disabled/Neutral/True | bg:background-disabled ic:icon-default-disabled |
| Disabled/Secondary-Solid/True | bg:background-disabled ic:icon-default-disabled |
| Disabled/Secondary-Outline/True | bd:border-neutral-secondary ic:icon-default-disabled |
| Disabled/Subtle/True | ic:icon-default-disabled |
| Disabled/Transparent/True | ic:icon-default-disabled |

## Component: Button-Close  (32 variants)

The Close Button component is a small, interactive element used to dismiss modals, dialogs, or popups. It typically features an "X" icon and supports accessibility features like keyboard navigation and ARIA labels.

| Prop | Values / default |
|---|---|
| Size | Small \| Medium \| Large \| x Small |
| State | Default \| Hovered \| Pressed \| Focused |
| On-color | False \| True |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| x Small | 20x20 H p0/0/0/0 g0 r4=radius-sm |
| Small | 24x24 H p0/0/0/0 g0 r4=radius-sm |
| Medium | 32x32 H p0/0/0/0 g0 r4=radius-sm |
| Large | 40x40 H p0/0/0/0 g0 r4=radius-sm |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| Default/False | ic:icon-default |
| Hovered/False | bg:button-background-neutral-hovered ic:icon-default |
| Pressed/False | bg:button-background-neutral-pressed ic:icon-default |
| Focused/False | bd:border-black ic:icon-default |
| Default/True | ic:icon-oncolor |
| Hovered/True | bg:button-background-transparent-hovered ic:icon-oncolor |
| Pressed/True | bg:button-background-transparent-pressed ic:icon-oncolor |
| Focused/True | bd:border-white ic:icon-oncolor |

## CSS implementation notes (from design.dga.gov.sa CSS, phase 2)
Where these differ from Figma above, Figma is the source of truth.
CSS block(s): `.btn`, `.dga-btn` — extracted verbatim from https://design.dga.gov.sa/ compiled CSS (2026-11-04). Not cross-checked against Figma (community files not readable via connector). rem duplicates (62.5% root) omitted.

### Variants / modifiers (`--`)
close, close-on-color, des-primary, des-secondary, des-secondary-outline, des-subtle, des-transparent, icon, icon-menu, lg, md, primary-brand, primary-brand--on-color, primary-brand-on-color, primary-neutral, primary-neutral--on-color, primary-neutral-on-color, secondary, secondary--on-color, secondary-on-color, secondary-outline, secondary-outline--on-color, secondary-outline-on-color, sm, sort, subtle, subtle-on-color, transparent, transparent-on-color

### Elements / anatomy (`__`)
—

### Heights used
24px (9), 40px (6), 32px (4), 20px (2), 16px (2)

### Tokens referenced (count)
`--colors-alpha-white` (25), `--colors-base-black` (16), `--colors-gray-neutral-400` (16), `--radius-sm` (14), `--text-default-disabled` (11), `--colors-gray-neutral-100` (10), `--colors-gray-neutral-200` (9), `--text-oncolor-primary` (9), `--colors-text-primary` (8), `--colors-error-600` (7), `--colors-base-white` (7), `--colors-brand-600` (6), `--text-default-oncolor-disabled` (6), `--colors-brand-700` (5), `--colors-text-primary_on-brand` (5), `--background-disabled` (5), `--colors-gray-neutral-50` (4), `--spacing-md` (4), `--colors-error-50` (4), `--colors-text-brand-primary` (4), `--text-default` (4), `--button-background-transparent-hovered` (4), `--colors-text-white` (3), `--colors-error-700` (3), `--colors-error-100` (3), `--colors-error-200` (3), `--colors-brand-500` (3), `--colors-brand-300` (3), `--button-background-disabled-on-color` (3), `--button-background-neutral-default` (3), `--border-neutral-secondary` (3), `--button-background-neutral-pressed` (3), `--text-error` (3), `--button-background-danger-secondary-hovered` (3), `--button-background-danger-secondary-pressed` (3), `--button-background-danger-secondary-selected` (3), `--spacing-xs` (2), `--spacing-xl` (2), `--spacing-lg` (2), `--colors-gray-neutral-950` (2)

### Rules (selector → declarations; covers sizes, states :hover/:focus/:active/:disabled, colors, spacing, radius)

- `.btn-icon` → `width: 24px; height: 24px`
- `.btn--lg span.btn-icon` → `width: 24px; height: 24px`
- `.btn--md span.btn-icon` → `width: 20px; height: 20px`
- `.btn--sm span.btn-icon` → `width: 16px; height: 16px`
- `.btn--icon` → `padding: 0`
- `.btn--subtle,.btn--close,.btn--sort` → `background-color: transparent; color: var(--colors-text-primary)`
- `.btn--subtle:hover,.btn--close:hover,.btn--sort:hover` → `background: var(--colors-gray-neutral-50)`
- `.btn--subtle:visited,.btn--close:visited,.btn--sort:visited` → `background: var(--colors-gray-neutral-100)`
- `.btn--subtle:focus,.btn--close:focus,.btn--sort:focus` → `background: transparent; outline: 2px solid var(--colors-base-black)`
- `.btn--subtle:focus:after,.btn--close:focus:after,.btn--sort:focus:after` → `background-color: transparent; width: 100%; height: 100%; border: 1px solid #fff; border-radius: var(--radius-sm)`
- `.btn--subtle:active,.btn--close:active,.btn--sort:active` → `background: var(--colors-gray-neutral-200); outline: none`
- `.btn--subtle:disabled,.btn--subtle[disabled],.btn--close:disabled,.btn--close[disabled],.btn--sort:disabled,.btn--sort[disabled]` → `background: transparent; color: var(--colors-gray-neutral-400)`
- `dialog .modal__actions .btn` → `margin: 0`
- `dialog .modal__actions .btn,dialog .modal__actions-btn-group .btn` → `width: 100%`
- `.card__action--expanded .btn svg` → `width: 24px; height: 24px`
- `.text-md-medium,.btn--lg,.tag,.tag--lg,.checkbox__label,.switch__label,.radio__label,.date-picker__navigator-label,.progress-indicator__step-content>.step-icon,.progress-indicator__step-content>.step-label .step-label--c…` → `font: 500 16px/24px IBMPlexSansArabic`
- `.text-sm-medium,.btn--md,.checkbox__warning,.switch__warning,.radio__warning,.tabs-list__item--active .tabs-list__label,.file-upload__file-name` → `font: 500 14px/20px IBMPlexSansArabic`
- `.text-xs-medium,.btn--sm,.tag--md,div.table-wrapper .azm-table thead th span span.text,div.table-wrapper .azm-structured-table thead th` → `font: 500 12px/18px IBMPlexSansArabic`
- `.btn` → `border-radius: var(--radius-sm); margin: var(--spacing-xs); cursor: pointer; border: 0; outline: none; gap: var(--spacing-xs)`
- `.btn--lg` → `height: 40px; padding-inline: var(--spacing-xl)`
- `.btn--lg span.btn-icon` → `font-size: 24px`
- `.btn--md` → `height: 32px; padding-inline: var(--spacing-lg)`
- `.btn--md span.btn-icon` → `font-size: 20px`
- `.btn--sm` → `height: 24px; padding-inline: var(--spacing-md)`
- `.btn--sm span.btn-icon` → `font-size: 16px`
- `.btn--icon.btn--lg` → `width: 40px; height: 40px`
- `.btn--icon-menu.btn--lg` → `width: auto; padding-inline: var(--spacing-xl)`
- `.btn--icon.btn--md` → `width: 32px; height: 32px`
- `.btn--icon-menu.btn--md` → `width: auto; padding-inline: var(--spacing-lg)`
- `.btn--icon.btn--sm` → `width: 24px; height: 24px`
- `.btn--icon-menu.btn--sm` → `width: auto; padding-inline: var(--spacing-md)`
- `.btn--primary-neutral` → `background-color: var(--colors-gray-neutral-950); color: var(--colors-text-white)`
- `.btn--primary-neutral:hover` → `background-color: var(--colors-gray-neutral-800)`
- `.btn--primary-neutral:visited` → `background-color: var(--colors-gray-neutral-700)`
- `.btn--primary-neutral:focus` → `background-color: var(--colors-gray-neutral-950); outline: 2px solid var(--colors-base-black)`
- `.btn--primary-neutral:focus:after` → `background-color: transparent; width: 100%; height: 100%; border: 1px solid #fff; border-radius: var(--radius-sm)`
- `.btn--primary-neutral:active` → `background-color: var(--colors-gray-neutral-600); outline: none`
- `.btn--primary-neutral:disabled,.btn--primary-neutral[disabled]` → `background: var(--colors-gray-neutral-100); color: var(--colors-gray-neutral-400)`
- `.btn--primary-brand` → `background-color: var(--colors-brand-600); color: var(--colors-text-white)`
- `.btn--primary-brand:hover` → `background: var(--colors-brand-700)`
- `.btn--primary-brand:visited` → `background: var(--colors-brand-800)`
- `.btn--primary-brand:focus` → `background: var(--colors-brand-600); outline: 2px solid var(--colors-base-black)`
- `.btn--primary-brand:focus:after` → `background-color: transparent; width: 100%; height: 100%; border: 1px solid #fff; border-radius: var(--radius-sm)`
- `.btn--primary-brand:active` → `background: var(--colors-brand-900); outline: none`
- `.btn--primary-brand:disabled,.btn--primary-brand[disabled]` → `background: var(--colors-gray-neutral-100); color: var(--colors-gray-neutral-400)`
- `.btn--secondary` → `background-color: var(--colors-gray-neutral-100); color: var(--colors-text-primary)`
- `.btn--secondary:hover` → `background: var(--colors-gray-neutral-200)`
- `.btn--secondary:visited` → `background: var(--colors-gray-neutral-300)`
- `.btn--secondary:focus` → `background: var(--colors-gray-neutral-100); outline: 2px solid var(--colors-base-black)`
- `.btn--secondary:active` → `background: var(--colors-gray-neutral-400); outline: none`
- `.btn--secondary:disabled,.btn--secondary[disabled]` → `background: var(--colors-gray-neutral-100); color: var(--colors-gray-neutral-400); border: 1px solid var(--colors-gray-neutral-200)`
- `.btn--secondary-outline` → `outline: 1px solid var(--colors-gray-neutral-400); background-color: transparent; color: var(--colors-text-primary)`
- `.btn--secondary-outline:hover` → `background: var(--colors-gray-neutral-50)`
- `.btn--secondary-outline:visited` → `background: var(--colors-gray-neutral-100); outline: 1px solid var(--colors-gray-neutral-400)`
- `.btn--secondary-outline:focus` → `background: transparent; outline: 2px solid var(--colors-base-black)`
- `.btn--secondary-outline:active` → `background: var(--colors-gray-neutral-200); outline: 1px solid var(--colors-gray-neutral-400)`
- `.btn--secondary-outline:disabled,.btn--secondary-outline[disabled]` → `background: transparent; color: var(--colors-gray-neutral-400); border: 1px solid var(--colors-gray-neutral-200)`
- `.btn--subtle,.btn--close` → `background-color: transparent; color: var(--colors-text-primary)`
- `.btn--subtle:hover,.btn--close:hover` → `background: var(--colors-gray-neutral-50)`
- `.btn--subtle:visited,.btn--close:visited` → `background: var(--colors-gray-neutral-100)`
- `.btn--subtle:focus,.btn--close:focus` → `background: transparent; outline: 2px solid var(--colors-base-black)`
- `.btn--subtle:focus:after,.btn--close:focus:after` → `background-color: transparent; width: 100%; height: 100%; border: 1px solid #fff; border-radius: var(--radius-sm)`
- `.btn--subtle:active,.btn--close:active` → `background: var(--colors-gray-neutral-200); outline: none`
- `.btn--subtle:disabled,.btn--subtle[disabled],.btn--close:disabled,.btn--close[disabled]` → `background: transparent; color: var(--colors-gray-neutral-400)`
- `.btn--transparent` → `background-color: transparent; color: var(--colors-text-primary)`
- `.btn--transparent:hover` → `background: transparent; color: var(--colors-brand-600)`
- `.btn--transparent:visited` → `color: var(--colors-brand-700)`
- `.btn--transparent:focus` → `background: transparent; outline: 2px solid var(--colors-base-black)`
- `.btn--transparent:focus:after` → `background-color: transparent; width: 100%; height: 100%; border: 1px solid #fff; border-radius: var(--radius-sm)`
- `.btn--transparent:active` → `color: var(--colors-brand-800); outline: none`
- `.btn--transparent:disabled,.btn--transparent[disabled]` → `background: transparent; color: var(--colors-gray-neutral-400)`
- `.btn--close` → `width: 40px; height: 40px; padding: var(--spacing-md); border-radius: var(--radius-sm); background-color: transparent; color: var(--colors-gray-neutral-500)`
- `.btn--close:hover` → `background: var(--colors-gray-neutral-50); color: var(--colors-gray-neutral-700)`
- `.btn--close:active` → `background-color: var(--colors-gray-neutral-200)`
- `.btn--des-primary` → `background-color: var(--colors-error-600); color: var(--colors-text-white)`
- `.btn--des-primary:hover` → `background: var(--colors-error-700)`
- `.btn--des-primary:visited` → `background: var(--colors-error-800)`
- `.btn--des-primary:focus` → `background: var(--colors-error-600); outline: 2px solid var(--colors-base-black)`
- `.btn--des-primary:focus:after` → `background-color: transparent; width: 100%; height: 100%; border: 1px solid #fff; border-radius: var(--radius-sm)`
- `.btn--des-primary:active` → `background: var(--colors-error-900); outline: none`
- `.btn--des-primary:disabled,.btn--des-primary[disabled]` → `background: var(--colors-gray-neutral-100); color: var(--colors-gray-neutral-400)`
- `.btn--des-secondary` → `background-color: var(--colors-error-50); color: var(--colors-error-600)`
- `.btn--des-secondary:hover` → `background: var(--colors-error-100)`
- `.btn--des-secondary:visited` → `background: var(--colors-error-300)`
- `.btn--des-secondary:focus` → `background: var(--colors-error-50); outline: 2px solid var(--colors-base-black)`
- `.btn--des-secondary:focus:after` → `background-color: transparent; width: 100%; height: 100%; border: 1px solid #fff; border-radius: var(--radius-sm)`
- `.btn--des-secondary:active` → `background: var(--colors-error-200); outline: none`
- `.btn--des-secondary:disabled,.btn--des-secondary[disabled]` → `background: var(--colors-gray-neutral-100); color: var(--colors-gray-neutral-400); outline: 1px solid var(--colors-gray-neutral-200)`
- `.btn--des-secondary-outline` → `outline: 1px solid var(--colors-error-400); background-color: transparent; color: var(--colors-error-600)`
- `.btn--des-secondary-outline:hover` → `background: var(--colors-error-50)`
- `.btn--des-secondary-outline:visited` → `background: var(--colors-error-100)`
- `.btn--des-secondary-outline:focus` → `background: transparent; outline: 2px solid var(--colors-base-black)`
- `.btn--des-secondary-outline:focus:after` → `background-color: transparent; width: 100%; height: 100%; border: 1px solid #fff; border-radius: var(--radius-sm)`
- `.btn--des-secondary-outline:active` → `background: var(--colors-error-200); outline: 1px solid var(--colors-error-400)`
- `.btn--des-secondary-outline:disabled,.btn--des-secondary-outline[disabled]` → `background: transparent; color: var(--colors-gray-neutral-400); outline: 1px solid var(--colors-gray-neutral-200)`
- `.btn--des-subtle` → `background-color: transparent; color: var(--colors-error-600)`
- `.btn--des-subtle:hover` → `background: var(--colors-error-50)`
- `.btn--des-subtle:visited` → `background: var(--colors-error-100)`
- `.btn--des-subtle:focus` → `background: transparent; outline: 2px solid var(--colors-base-black)`
- `.btn--des-subtle:focus:after` → `background-color: transparent; width: 100%; height: 100%; border: 1px solid #fff; border-radius: var(--radius-sm)`
- `.btn--des-subtle:active` → `background: var(--colors-error-200); outline: none`
- `.btn--des-subtle:disabled,.btn--des-subtle[disabled]` → `background: transparent; color: var(--colors-gray-neutral-400)`
- `.btn--des-transparent` → `background-color: transparent; color: var(--colors-error-600)`
- `.btn--des-transparent:hover` → `background: transparent; color: var(--colors-error-700)`
- `.btn--des-transparent:visited` → `color: var(--colors-error-700)`
- `.btn--des-transparent:focus` → `background: transparent; outline: 2px solid var(--colors-base-black); color: var(--colors-error-600)`
- `.btn--des-transparent:focus:after` → `background-color: transparent; width: 100%; height: 100%; border: 1px solid #fff; border-radius: var(--radius-sm)`
- `.btn--des-transparent:active` → `color: var(--colors-error-800); outline: none`
- `.btn--des-transparent:disabled,.btn--des-transparent[disabled]` → `background: transparent; color: var(--colors-gray-neutral-400)`
- `.btn--primary-neutral-on-color` → `background-color: var(--colors-base-white); color: var(--colors-text-primary)`
- `.btn--primary-neutral-on-color:hover` → `background-color: hsla(var(--colors-alpha-white)/80%)`
- `.btn--primary-neutral-on-color:visited,.btn--primary-neutral-on-color.selected` → `background-color: hsla(var(--colors-alpha-white)/70%)`
- `.btn--primary-neutral-on-color:focus` → `outline-color: var(--colors-base-white)`
- `.btn--primary-neutral-on-color:focus:after` → `border-color: var(--colors-base-black)`
- `.btn--primary-neutral-on-color:active` → `background-color: hsla(var(--colors-alpha-white)/60%)`
- `.btn--primary-neutral-on-color:disabled,.btn--primary-neutral-on-color[disabled]` → `background-color: hsla(var(--colors-alpha-white)/30%); color: hsla(var(--colors-alpha-white)/30%)`
- `.btn--primary-brand-on-color` → `background-color: var(--colors-brand-500); color: var(--colors-text-primary_on-brand)`
- `.btn--primary-brand-on-color:hover` → `background-color: var(--colors-brand-600)`
- `.btn--primary-brand-on-color:visited,.btn--primary-brand-on-color.selected` → `background-color: var(--colors-brand-700)`
- `.btn--primary-brand-on-color:focus` → `outline-color: var(--colors-base-white)`
- `.btn--primary-brand-on-color:focus:after` → `border-color: var(--colors-base-black)`
- `.btn--primary-brand-on-color:active` → `color: var(--colors-text-brand-primary); background-color: var(--colors-brand-300)`
- `.btn--primary-brand-on-color:disabled,.btn--primary-brand-on-color[disabled]` → `background-color: hsla(var(--colors-alpha-white)/30%); color: hsla(var(--colors-alpha-white)/30%)`
- `.btn--secondary-on-color` → `background-color: hsla(var(--colors-alpha-white)/10%); color: var(--colors-text-primary_on-brand)`
- `.btn--secondary-on-color:hover` → `background-color: hsla(var(--colors-alpha-white)/20%)`
- `.btn--secondary-on-color:visited,.btn--secondary-on-color.selected` → `background-color: hsla(var(--colors-alpha-white)/30%)`
- `.btn--secondary-on-color:focus` → `outline-color: var(--colors-base-white)`
- `.btn--secondary-on-color:active` → `color: var(--colors-text-brand-primary); background-color: hsla(var(--colors-alpha-white)/40%)`
- `.btn--secondary-on-color:disabled,.btn--secondary-on-color[disabled]` → `background-color: hsla(var(--colors-alpha-white)/30%); color: hsla(var(--colors-alpha-white)/30%)`
- `.btn--secondary-outline-on-color` → `outline-color: hsla(var(--colors-alpha-white)/40%); color: var(--colors-text-primary_on-brand)`
- `.btn--secondary-outline-on-color:hover` → `background: hsla(var(--colors-alpha-white)/10%)`
- `.btn--secondary-outline-on-color:visited,.btn--secondary-outline-on-color.selected` → `background: hsla(var(--colors-alpha-white)/20%); outline-color: hsla(var(--colors-alpha-white)/40%)`
- `.btn--secondary-outline-on-color:focus` → `background: transparent; outline-color: var(--colors-base-white)`
- `.btn--secondary-outline-on-color:active` → `background: hsla(var(--colors-alpha-white)/40%); outline-color: hsla(var(--colors-alpha-white)/30%)`
- `.btn--secondary-outline-on-color:disabled,.btn--secondary-outline-on-color[disabled]` → `outline-color: hsla(var(--colors-alpha-white)/30%); color: hsla(var(--colors-alpha-white)/30%)`
- `.btn--subtle-on-color` → `background-color: var(--colors-brand-500); color: var(--colors-text-primary_on-brand)`
- `.btn--subtle-on-color:hover` → `background-color: var(--colors-brand-600)`
- `.btn--subtle-on-color:visited,.btn--subtle-on-color.selected` → `background-color: var(--colors-brand-700)`
- `.btn--subtle-on-color:focus` → `outline-color: var(--colors-base-white)`
- `.btn--subtle-on-color:focus:after` → `border-color: var(--colors-base-black)`
- `.btn--subtle-on-color:active` → `color: var(--colors-text-brand-primary); background-color: var(--colors-brand-300)`
- `.btn--subtle-on-color:disabled,.btn--subtle-on-color[disabled]` → `background-color: hsla(var(--colors-alpha-white)/30%); color: hsla(var(--colors-alpha-white)/30%)`
- `.btn--transparent-on-color` → `background-color: var(--colors-brand-500); color: var(--colors-text-primary_on-brand)`
- `.btn--transparent-on-color:hover` → `background-color: var(--colors-brand-600)`
- `.btn--transparent-on-color:visited,.btn--transparent-on-color.selected` → `background-color: var(--colors-brand-700)`
- `.btn--transparent-on-color:focus` → `outline-color: var(--colors-base-white)`
- `.btn--transparent-on-color:focus:after` → `border-color: var(--colors-base-black)`
- `.btn--transparent-on-color:active` → `color: var(--colors-text-brand-primary); background-color: var(--colors-brand-300)`
- `.btn--transparent-on-color:disabled,.btn--transparent-on-color[disabled]` → `background-color: hsla(var(--colors-alpha-white)/30%); color: hsla(var(--colors-alpha-white)/30%)`
- `.modal__actions .btn` → `margin: 0`
- `.modal__actions .btn,.modal__actions-btn-group .btn,.modal__actions-btn` → `width: 100%`
- `.btn-container--without-margins>.btn` → `padding: 0; margin: 0`
- `.custom-footer-style .btn--secondary-outline-on-color` → `outline-color: #61646c; color: #161616`
- `.text-md-medium,.dga-btn--lg,.date-picker__navigator-label` → `font: 500 16px/24px IBMPlexSansArabic`
- `.text-xs-medium,.dga-btn--sm,div.table-wrapper .azm-table thead th span span.text` → `font: 500 12px/18px IBMPlexSansArabic`
- `.dga-btn` → `border-radius: var(--radius-sm); cursor: pointer; border: 0; outline: none; gap: var(--buttons-lg-gap)`
- `.dga-btn:focus-visible` → `outline: 2px solid var(--border-black)`
- `.dga-btn-icon` → `width: 24px; height: 24px; font-size: 24px`
- `.dga-btn--lg` → `height: 40px; padding-inline: var(--buttons-lg-padding)`
- `.dga-btn--lg span.dga-btn-icon` → `width: 24px; height: 24px; font-size: 24px`
- `.dga-btn--md` → `height: 32px; padding-inline: var(--buttons-md-padding)`
- `.dga-btn--md span.dga-btn-icon` → `width: 20px; height: 20px; font-size: 20px`
- `.dga-btn--sm` → `height: 24px; padding-inline: var(--buttons-sm-padding)`
- `.dga-btn--sm span.dga-btn-icon` → `width: 16px; height: 16px; font-size: 16px`
- `.dga-btn--icon` → `padding: 0`
- `.dga-btn--icon.dga-btn--lg` → `width: 40px; height: 40px; font-size: 40px`
- `.dga-btn--icon-menu.dga-btn--lg` → `width: auto; padding-inline: var(--buttons-lg-padding)`
- `.dga-btn--icon.dga-btn--md` → `width: 32px; height: 32px; font-size: 32px`
- `.dga-btn--icon-menu.dga-btn--md` → `width: auto; padding-inline: var(--buttons-md-padding)`
- `.dga-btn--icon.dga-btn--sm` → `width: 24px; height: 24px; font-size: 24px`
- `.dga-btn--icon-menu.dga-btn--sm` → `width: auto; padding-inline: var(--buttons-sm-padding)`
- `.dga-btn--primary-neutral` → `background-color: var(--button-background-black-default); color: var(--text-oncolor-primary)`
- `.dga-btn--primary-neutral:hover` → `background-color: var(--button-background-black-hovered)`
- `.dga-btn--primary-neutral:visited` → `background-color: var(--button-background-black-pressed)`
- `.dga-btn--primary-neutral:active` → `background-color: var(--button-background-black-selected); outline: none`
- `.dga-btn--primary-neutral:disabled,.dga-btn--primary-neutral[disabled]` → `background: var(--background-disabled); color: var(--text-default-disabled)`
- `.dga-btn--primary-neutral--on-color` → `background-color: var(--button-background-oncolor-default); color: var(--text-default)`
- `.dga-btn--primary-neutral--on-color:hover` → `background-color: var(--button-background-oncolor-hovered)`
- `.dga-btn--primary-neutral--on-color:visited,.dga-btn--primary-neutral--on-color.selected` → `background-color: var(--button-background-oncolor-selected)`
- `.dga-btn--primary-neutral--on-color:active` → `background-color: var(--button-background-oncolor-pressed)`
- `.dga-btn--primary-neutral--on-color:disabled,.dga-btn--primary-neutral--on-color[disabled]` → `background-color: var(--button-background-disabled-on-color); color: var(--text-default-oncolor-disabled)`
- `.dga-btn--primary-brand` → `background-color: var(--button-background-primary-default); color: var(--text-oncolor-primary)`
- `.dga-btn--primary-brand:hover` → `background: var(--button-background-primary-hovered)`
- `.dga-btn--primary-brand:visited` → `background: var(--button-background-primary-pressed)`
- `.dga-btn--primary-brand:active` → `background: var(--button-background-primary-selected); outline: none`
- `.dga-btn--primary-brand:disabled,.dga-btn--primary-brand[disabled]` → `background: var(--background-disabled); color: var(--text-default-disabled)`
- `.dga-btn--primary-brand--on-color` → `background-color: var(--button-background-oncolor-default); color: var(--text-default)`
- `.dga-btn--primary-brand--on-color:hover` → `background-color: var(--button-background-oncolor-hovered)`
- `.dga-btn--primary-brand--on-color:visited,.dga-btn--primary-brand--on-color.selected,.dga-btn--primary-brand--on-color:active` → `background-color: var(--button-background-oncolor-pressed)`
- `.dga-btn--primary-brand--on-color:disabled,.dga-btn--primary-brand--on-color[disabled]` → `background-color: var(--button-background-disabled-on-color); color: var(--text-default-oncolor-disabled)`
- `.dga-btn--secondary` → `background-color: var(--button-background-neutral-default); color: var(--colors-text-primary)`
- `.dga-btn--secondary:hover` → `background: var(--button-background-neutral-default-hoverd)`
- `.dga-btn--secondary:visited` → `background: var(--button-background-neutral-default-pressed)`
- `.dga-btn--secondary:active` → `background: var(--button-background-neutral-default-selected); outline: none`
- `.dga-btn--secondary:disabled,.dga-btn--secondary[disabled]` → `background: var(--background-disabled); color: var(--text-default-disabled)`
- `.dga-btn--secondary--on-color` → `background-color: var(--button-background-transparent-hovered); color: var(--text-oncolor-primary)`
- `.dga-btn--secondary--on-color:hover` → `background-color: var(--button-background-transparent-hovered)`
- `.dga-btn--secondary--on-color:visited,.dga-btn--secondary--on-color.selected` → `background-color: var(--Button-button-background-transparent-selected)`
- `.dga-btn--secondary--on-color:active` → `background-color: var(--Button-button-background-transparent-pressed); color: var(--text-oncolor-primary)`
- `.dga-btn--secondary--on-color:disabled,.dga-btn--secondary--on-color[disabled]` → `background-color: var(--button-background-disabled-on-color); color: var(--text-default-oncolor-disabled)`
- `.dga-btn--secondary-outline` → `outline: 1px solid var(--border-neutral-secondary); background-color: transparent; color: var(--text-default)`
- `.dga-btn--secondary-outline:hover` → `background: var(--button-background-neutral-default)`
- `.dga-btn--secondary-outline:visited` → `background: var(--button-background-neutral-pressed); outline: 1px solid var(--border-neutral-primary)`
- `.dga-btn--secondary-outline:active` → `background: var(--button-background-neutral-selected); outline: 1px solid var(--border-neutral-primary)`
- `.dga-btn--secondary-outline:disabled,.dga-btn--secondary-outline[disabled]` → `background: transparent; color: var(--text-default-disabled); border: 1px solid var(--border-neutral-secondary)`
- `.dga-btn--secondary-outline--on-color` → `outline-color: var(--border-white-40); color: var(--text-oncolor-primary)`
- `.dga-btn--secondary-outline--on-color:hover,.dga-btn--secondary-outline--on-color:visited,.dga-btn--secondary-outline--on-color.selected,.dga-btn--secondary-outline--on-color:active` → `background: var(--button-background-transparent-hovered); outline-color: var(--border-white-40)`
- `.dga-btn--secondary-outline--on-color:disabled,.dga-btn--secondary-outline--on-color[disabled]` → `outline-color: 1px solid var(--icon-default-oncolor-disabled); color: var(--text-default-oncolor-disabled)`
- `.dga-btn--subtle,.dga-btn--close,.dga-btn--sort` → `background-color: transparent; color: var(--colors-text-primary)`
- `.dga-btn--subtle:hover,.dga-btn--close:hover,.dga-btn--sort:hover` → `background: var(--button-background-neutral-default)`
- `.dga-btn--subtle:visited,.dga-btn--close:visited,.dga-btn--sort:visited` → `background: var(--button-background-neutral-pressed)`
- `.dga-btn--subtle:active,.dga-btn--close:active,.dga-btn--sort:active` → `background: var(--button-background-neutral-selected); outline: none`
- `.dga-btn--subtle:disabled,.dga-btn--subtle[disabled],.dga-btn--close:disabled,.dga-btn--close[disabled],.dga-btn--sort:disabled,.dga-btn--sort[disabled]` → `background: transparent; color: var(--text-default-disabled)`
- `.dga-btn--transparent` → `background-color: transparent; color: var(--text-default)`
- `.dga-btn--transparent:hover` → `background: transparent; color: var(--button-background-primary-hovered)`
- `.dga-btn--transparent:visited` → `color: var(--button-background-primary-pressed)`
- `.dga-btn--transparent:active` → `color: var(--button-background-primary-selected); outline: none`
- `.dga-btn--transparent:disabled,.dga-btn--transparent[disabled]` → `background: transparent; color: var(--text-default-disabled)`
- `.dga-btn--close` → `width: 40px; height: 40px; padding: var(--spacing-md); border-radius: var(--radius-sm); background-color: transparent; color: var(--icon-default)`
- `.dga-btn--close:hover` → `background: var(--button-background-neutral-hovered); color: var(--icon-default)`
- `.dga-btn--close:active` → `background-color: var(--button-background-neutral-pressed)`
- `.dga-btn--des-primary` → `background-color: var(--button-background-danger-primary-default); color: var(--text-oncolor-primary)`
- `.dga-btn--des-primary:hover` → `background: var(--button-background-danger-primary-hovered)`
- `.dga-btn--des-primary:visited` → `background: var(--button-background-danger-primary-pressed)`
- `.dga-btn--des-primary:active` → `background: var(--button-background-danger-primary-selected); outline: none`
- `.dga-btn--des-primary:disabled,.dga-btn--des-primary[disabled]` → `background: var(--background-disabled); color: var(--text-default-disabled)`
- `.dga-btn--des-secondary` → `background-color: var(--button-background-danger-secondary-default); color: var(--text-error)`
- `.dga-btn--des-secondary:hover` → `background: var(--button-background-danger-secondary-hovered)`
- `.dga-btn--des-secondary:visited` → `background: var(--button-background-danger-secondary-pressed)`
- `.dga-btn--des-secondary:active` → `background: var(--button-background-danger-secondary-selected); outline: none`
- `.dga-btn--des-secondary:disabled,.dga-btn--des-secondary[disabled]` → `background: var(--background-disabled); color: var(--text-default-disabled)`
- `.dga-btn--des-secondary-outline` → `outline: 1px solid var(--border-error-light); background-color: transparent; color: var(--text-error)`
- `.dga-btn--des-secondary-outline:hover` → `background: var(--button-background-danger-secondary-hovered)`
- `.dga-btn--des-secondary-outline:visited` → `background: var(--button-background-danger-secondary-pressed)`
- `.dga-btn--des-secondary-outline:active` → `background: var(--button-background-danger-secondary-selected); outline: 1px solid var(--border-error-light)`
- `.dga-btn--des-secondary-outline:disabled,.dga-btn--des-secondary-outline[disabled]` → `background: transparent; color: var(--text-default-disabled); outline: 1px solid var(--border-neutral-secondary)`
- `.dga-btn--des-subtle` → `background-color: transparent; color: var(--text-error)`
- `.dga-btn--des-subtle:hover` → `background: var(--button-background-danger-secondary-hovered)`
- `.dga-btn--des-subtle:visited` → `background: var(--button-background-danger-secondary-pressed)`
- `.dga-btn--des-subtle:active` → `background: var(--button-background-danger-secondary-selected); outline: none`
- `.dga-btn--des-subtle:disabled,.dga-btn--des-subtle[disabled]` → `background: transparent; color: var(--text-default-disabled)`
- `.dga-btn--des-transparent` → `background-color: transparent; color: var(--button-background-danger-primary-default)`
- `.dga-btn--des-transparent:hover` → `background: transparent; color: var(--button-background-danger-primary-hovered)`
- `.dga-btn--des-transparent:visited` → `color: var(--button-background-danger-primary-pressed)`
- `.dga-btn--des-transparent:active` → `color: var(--button-background-danger-primary-selected); outline: none`
- `.dga-btn--des-transparent:disabled,.dga-btn--des-transparent[disabled]` → `background: transparent; color: var(--text-default-disabled)`
- `.dga-btn.dga-btn--subtle-on-color,.dga-btn.dga-btn--close-on-color` → `background-color: transparent; color: var(--text-oncolor-primary)`
- `.dga-btn.dga-btn--subtle-on-color:hover,.dga-btn.dga-btn--close-on-color:hover` → `background-color: var(--button-background-transparent-hovered)`
- `.dga-btn.dga-btn--subtle-on-color:visited,.dga-btn.dga-btn--subtle-on-color.selected,.dga-btn.dga-btn--close-on-color:visited,.dga-btn.dga-btn--close-on-color.selected` → `background-color: var(--button-background-transparent-selected)`
- `.dga-btn.dga-btn--subtle-on-color:active,.dga-btn.dga-btn--close-on-color:active` → `color: var(--text-oncolor-primary); background-color: var(--button-background-transparent-pressed)`
- `.dga-btn.dga-btn--subtle-on-color:disabled,.dga-btn.dga-btn--subtle-on-color[disabled],.dga-btn.dga-btn--close-on-color:disabled,.dga-btn.dga-btn--close-on-color[disabled]` → `background-color: transparent; color: var(--text-default-oncolor-disabled)`
- `.dga-btn--transparent-on-color` → `background-color: transparent; color: var(--text-oncolor-primary)`
- `.dga-btn--transparent-on-color:hover` → `color: var(--button-label-transparent-hovered-on-color)`
- `.dga-btn--transparent-on-color:visited,.dga-btn--transparent-on-color.selected` → `color: var(--button-label-transparent-selected-on-color)`
- `.dga-btn--transparent-on-color:active` → `color: var(--button-label-transparent-pressed-on-color)`
- `.dga-btn--transparent-on-color:disabled,.dga-btn--transparent-on-color[disabled]` → `background-color: transparent; color: var(--text-default-oncolor-disabled)`
- `.text-md-medium,.date-picker__navigator-label,.dga-btn--lg` → `font: 500 16px/24px IBMPlexSansArabic`
- `.text-sm-medium,.dga-btn--md` → `font: 500 14px/20px IBMPlexSansArabic`
- `.text-xs-medium,div.table-wrapper .azm-table thead th span span.text,.dga-btn--sm` → `font: 500 12px/18px IBMPlexSansArabic`
