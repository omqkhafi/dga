# UI Shell - Nav Header (web)

Source: Figma web file `trJvYAeN2wdayn2VdSUR2N`, page "UI Shell - Nav Header". All values below are read from Figma component variants (LTR variants; RTL variants mirror them). Token names are Figma variable names (last segment); see `tokens.css`.

## Usage (plain language)

The Header Sub-Menu Item displays a list item states.

## Component: Header Sub-menu Item  (16 variants)

| Prop | Values / default |
|---|---|
| Icon | B:true |
| Helper Text | B:true |
| Lead Text EN | T:Menu Item Label |
| Helper Text EN | T:Menu item helper text |
| Lead Text AR | T:عنوان عنصر القائمة |
| Helper Text AR | T:محتوى مساند لعنصر الوصول |
| Tag | B:false |
| RTL | True \| False |
| State | Default \| Hovered \| Pressed \| Focused |
| On-color | False \| True |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| - | 320x64 H p8/16/8/16 g16 pad-y=spacing-md pad-x=spacing-xl gap=spacing-xl r8=radius-md |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| Default/False | fg:text-display ic:icon-default ts:Text md/Medium |
| Hovered/False | bg:button-background-neutral-hovered fg:text-display ic:icon-default ts:Text md/Medium underlined |
| Pressed/False | bg:button-background-neutral-pressed fg:text-display ic:icon-default ts:Text md/Medium underlined |
| Focused/False | bd:border-black fg:text-display ic:icon-default ts:Text md/Medium underlined |
| Default/True | fg:text-oncolor-primary ic:icon-oncolor ts:Text md/Medium |
| Hovered/True | bg:button-background-transparent-hovered fg:text-oncolor-primary ic:icon-oncolor ts:Text md/Medium underlined |
| Pressed/True | bg:button-background-transparent-pressed fg:text-oncolor-primary ic:icon-oncolor ts:Text md/Medium underlined |
| Focused/True | bd:border-white fg:text-oncolor-primary ic:icon-oncolor ts:Text md/Medium underlined |

## Component: Header Menu Item  (20 variants)

Navigation links are interactive text elements that allow users to navigate from one page to another within a website.

| Prop | Values / default |
|---|---|
| Icon | B:true |
| 🔁 Swap Icon | I:13758:242356 |
| Text AR | T:تبويب |
| Text EN | T:Link |
| Sub-menu | B:true |
| Chevron up/down | I:13758:241815 |
| RTL | True \| False |
| State | Default \| Hovered \| Pressed \| Focused \| Disabled |
| Selected | True \| False |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| - | 116x72 H p8/16/8/16 g4 pad-y=spacing-md pad-x=spacing-xl gap=spacing-xs r4=radius-sm |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| Default/True | bg:button-background-primary-default fg:text-oncolor-primary ic:icon-oncolor |
| Hovered/True | bg:button-background-primary-hovered fg:text-oncolor-primary ic:icon-oncolor |
| Pressed/True | bg:button-background-primary-pressed fg:text-oncolor-primary ic:icon-oncolor |
| Focused/True | bg:button-background-primary-focused bd:border-black fg:text-oncolor-primary ic:icon-oncolor |
| Disabled/True | fg:text-default-disabled ic:icon-default-disabled |
| Default/False | fg:text-default ic:icon-default ts:Text md/Medium |
| Hovered/False | bg:button-background-neutral-hovered fg:text-default ic:icon-default ts:Text md/Medium |
| Pressed/False | bg:button-background-neutral-pressed fg:text-default ic:icon-default ts:Text md/Medium |
| Focused/False | bd:border-black fg:text-default ic:icon-default ts:Text md/Medium |
| Disabled/False | fg:text-default-disabled ic:icon-default-disabled ts:Text md/Medium |

## Component: Header Action  (60 variants)

This could be indicators for user actions that can be taken or buttons for additional functions.

| Prop | Values / default |
|---|---|
| Icon | B:true |
| 🔁 Swap Icon | I:13758:242356 |
| Text AR | T:إجراء |
| Text EN | T:Action |
| RTL | True \| False |
| State | Default \| Hovered \| Pressed \| Focused \| Disabled |
| Selected | True \| False |
| Icon position | Inline \| Top |
| Icon only | False \| True |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| False | 108x72 H p8/16/8/16 g4 pad-y=spacing-md pad-x=spacing-xl gap=spacing-xs r4=radius-sm |
| True | 72x72 V p8/16/8/16 g4 pad-y=spacing-md pad-x=spacing-xl gap=spacing-xs r4=radius-sm |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| Default/True/Inline/False | bg:button-background-primary-default fg:text-oncolor-primary ic:icon-oncolor |
| Hovered/True/Inline/False | bg:button-background-primary-hovered fg:text-oncolor-primary ic:icon-oncolor |
| Pressed/True/Inline/False | bg:button-background-primary-pressed fg:text-oncolor-primary ic:icon-oncolor |
| Focused/True/Inline/False | bg:button-background-primary-selected bd:border-black fg:text-oncolor-primary ic:icon-oncolor |
| Disabled/True/Inline/False | fg:text-default-disabled ic:icon-default-disabled |
| Default/False/Inline/False | fg:text-default ic:icon-default ts:Text md/Medium |
| Hovered/False/Inline/False | bg:button-background-neutral-hovered fg:text-default ic:icon-default ts:Text md/Medium |
| Pressed/False/Inline/False | bg:button-background-neutral-pressed fg:text-default ic:icon-default ts:Text md/Medium |
| Focused/False/Inline/False | bd:border-black fg:text-default ic:icon-default ts:Text md/Medium |
| Disabled/False/Inline/False | fg:text-default-disabled ic:icon-default-disabled ts:Text md/Medium |
| Default/True/Top/False | bg:button-background-primary-default fg:text-oncolor-primary ic:icon-oncolor |
| Default/True/Top/True | bg:button-background-primary-default ic:icon-oncolor |
| Hovered/True/Top/False | bg:button-background-primary-hovered fg:text-oncolor-primary ic:icon-oncolor |
| Hovered/True/Top/True | bg:button-background-primary-hovered ic:icon-oncolor |
| Pressed/True/Top/False | bg:button-background-primary-pressed fg:text-oncolor-primary ic:icon-oncolor |
| Pressed/True/Top/True | bg:button-background-primary-pressed ic:icon-oncolor |
| Focused/True/Top/False | bg:button-background-primary-selected bd:border-black fg:text-oncolor-primary ic:icon-oncolor |
| Focused/True/Top/True | bg:button-background-primary-selected bd:border-black ic:icon-oncolor |
| Disabled/True/Top/False | fg:text-default-disabled ic:icon-default-disabled |
| Disabled/True/Top/True | ic:icon-default-disabled |
| Default/False/Top/False | fg:text-default ic:icon-default ts:Text md/Medium |
| Default/False/Top/True | ic:icon-default |
| Hovered/False/Top/False | bg:button-background-neutral-hovered fg:text-default ic:icon-default ts:Text md/Medium |
| Hovered/False/Top/True | bg:button-background-neutral-hovered ic:icon-default |
| Pressed/False/Top/False | bg:button-background-neutral-pressed fg:text-default ic:icon-default ts:Text md/Medium |
| Pressed/False/Top/True | bg:button-background-neutral-pressed ic:icon-default |
| Focused/False/Top/False | bd:border-black fg:text-default ic:icon-default ts:Text md/Medium |
| Focused/False/Top/True | bd:border-black ic:icon-default |
| Disabled/False/Top/False | fg:text-default-disabled ic:icon-default-disabled ts:Text md/Medium |
| Disabled/False/Top/True | ic:icon-default-disabled |

## Component: Item Icon  (4 variants)

The Item Icon displays a list item icons.

| Prop | Values / default |
|---|---|
| 🔁 Swap icon | I:13758:241724 |
| Contained | True \| False |
| On-color | True \| False |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| - | 48x48 H p12/12/12/12 g8 r8=radius-md |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| True/False | bg:background-primary-50 ic:icon-primary |
| False/False | ic:icon-default |
| True/True | bg:alpha-white-10 ic:icon-oncolor |
| False/True | ic:icon-oncolor |

## Component: Nav Header  (8 variants)

A Navigation Header is a critical component in design system that guides users through the structure of a website. It typically appears at the top of each page.

| Prop | Values / default |
|---|---|
| Menu items | B:true |
| Actions | B:true |
| Logo EN | I:30150:149722 |
| Logo AR | I:30150:149719 |
| RTL | True \| False |
| Breakpoint | <600 \| 600>960 \| >960 |
| Full-width | True \| False |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| - | 1728x72 V p0/32/0/32 g0 pad-x=spacing-4xl |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| >960/False | bg:background-menu fg:text-secondary-paragraph ic:background-neutral-400 ts:Text sm/Medium |
| >960/True | bg:background-menu fg:text-secondary-paragraph ic:background-neutral-400 ts:Text sm/Medium |
| 600>960/False | bg:background-menu fg:text-secondary-paragraph ic:icon-default ts:Text sm/Medium |
| <600/False | bg:background-menu fg:text-secondary-paragraph ic:icon-default ts:Text sm/Medium |

## Component: Header Menu  (8 variants)

This could be indicators for user actions that can be buttons for additional functions.

| Prop | Values / default |
|---|---|
| Opened | True \| False |
| State | Default \| Hovered \| Pressed \| Focused |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| - | 40x72 V p8/0/8/0 g4 pad-y=spacing-md gap=spacing-xs r4=radius-sm |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| False/Default | ic:icon-default |
| True/Default | ic:icon-default |
| False/Hovered | ic:icon-default |
| True/Hovered | ic:icon-default |
| False/Pressed | ic:icon-default |
| True/Pressed | ic:icon-default |
| False/Focused | ic:icon-default |
| True/Focused | ic:icon-default |

## Component: Nav Header Sub-Menu  (24 variants)

The Header Sub-Menu displays a list item style.

| Prop | Values / default |
|---|---|
| 2nd col | B:true |
| 3rd col | B:true |
| 4th col | B:true |
| RTL | False \| True |
| Full width | True \| False |
| Background | Default \| Dark green |
| Link style | Text only \| Simple icon \| Boxed icon |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| - | 1440x276 V p0/32/0/32 g0 pad-x=spacing-4xl |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| True/Default/Text only | bg:background-menu fg:text-primary ts:Text lg/Bold fx:shadow-lg |
| True/Dark green/Text only | bg:background-SA-Flag fg:text-oncolor-primary ts:Text lg/Bold fx:shadow-lg |
| True/Default/Simple icon | bg:background-menu fg:text-primary ic:icon-default ts:Text lg/Bold fx:shadow-lg |
| True/Dark green/Simple icon | bg:background-SA-Flag fg:text-oncolor-primary ic:icon-oncolor ts:Text lg/Bold fx:shadow-lg |
| True/Default/Boxed icon | bg:background-menu fg:text-primary ic:icon-primary ts:Text lg/Bold fx:shadow-lg |
| True/Dark green/Boxed icon | bg:background-SA-Flag fg:text-oncolor-primary ic:icon-oncolor ts:Text lg/Bold fx:shadow-lg |
| False/Default/Text only | bg:background-menu fg:text-primary ts:Text lg/Bold fx:shadow-lg |
| False/Dark green/Text only | bg:background-SA-Flag fg:text-oncolor-primary ts:Text lg/Bold fx:shadow-lg |
| False/Default/Simple icon | bg:background-menu fg:text-primary ic:icon-default ts:Text lg/Bold fx:shadow-lg |
| False/Dark green/Simple icon | bg:background-SA-Flag fg:text-oncolor-primary ic:icon-oncolor ts:Text lg/Bold fx:shadow-lg |
| False/Default/Boxed icon | bg:background-menu fg:text-primary ic:icon-primary ts:Text lg/Bold fx:shadow-lg |
| False/Dark green/Boxed icon | bg:background-SA-Flag fg:text-oncolor-primary ic:icon-oncolor ts:Text lg/Bold fx:shadow-lg |

## Component: Logo Placeholder  (12 variants)

The Logo placeholder likely represents a company or website logo that helps to establish brand identity.

| Prop | Values / default |
|---|---|
| RTL | True \| False |
| Size | Large \| Medium \| Small |
| Logo Position | Side \| Top |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| Large | 183x74 H p5/4/5/4 g8 |
| Small | 125x42 H p5/4/5/4 g8 |
| Medium | 154x58 H p5/4/5/4 g8 |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| Side | bg:background-white fg:text-secondary-paragraph ic:background-neutral-400 ts:Text md/Medium |
| Top | bg:background-white fg:text-secondary-paragraph ic:background-neutral-400 ts:Text md/Medium |

## CSS implementation notes (from design.dga.gov.sa CSS, phase 2)
Where these differ from Figma above, Figma is the source of truth.
CSS block(s): `.header-menu`, `.sub-menu`, `.header-nav` — extracted verbatim from https://design.dga.gov.sa/ compiled CSS (2026-11-04). Not cross-checked against Figma (community files not readable via connector). rem duplicates (62.5% root) omitted.

### Variants / modifiers (`--`)
fixed, full

### Elements / anatomy (`__`)
—

### Heights used
72px (1)

### Tokens referenced (count)
`--spacing-4xl` (1), `--spacing-8xl` (1)

### Rules (selector → declarations; covers sizes, states :hover/:focus/:active/:disabled, colors, spacing, radius)

- `.header-nav` → `min-height: 72px; height: 72px`
- `.header-nav--full` → `width: 100%; max-width: 100vw; padding-inline: var(--spacing-4xl)`
- `.header-nav--fixed` → `margin-inline: auto; max-width: 1280px`
- `.header-nav--fixed` → `width: 100%; max-width: 100vw; padding-inline: var(--spacing-8xl)`
