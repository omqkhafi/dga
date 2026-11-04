# Notification Toast (web)

Source: Figma web file `trJvYAeN2wdayn2VdSUR2N`, page "Notification Toast". All values below are read from Figma component variants (LTR variants; RTL variants mirror them). Token names are Figma variable names (last segment); see `tokens.css`.

## Usage (plain language)

These are transient, non-modal messages that appear at the top of the screen to provide brief alerts, disappearing after a set duration.

## Component: Notification Toast  (20 variants)

| Prop | Values / default |
|---|---|
| Actions | B:true |
| Helper Text | B:true |
| Close Button | B:true |
| Lead Text EN | T:Notification/Alert messa |
| Helper Text EN | T:When a Notification/Aler |
| Lead Text AR | T:عنوان رسالة الاشعار أو ا |
| Helper Text AR | T:يكتب المحتوى الإضافي هنا |
| Secondary Action | B:true |
| RTL | True \| False |
| Type | Neutral \| Info \| Critical/Error \| Warning \| Success |
| Mobile | False \| True |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| Neutral | 484x148 V p16/24/16/24 g16 pad-y=notification-toast-v-padding pad-x=notification-toast-desktop-h-padding gap=notification-gap r8=radius-md |
| Info | 484x148 V p16/24/16/24 g16 pad-y=notification-toast-v-padding pad-x=notification-toast-desktop-h-padding gap=notification-gap r8=radius-md |
| Critical/Error | 484x148 V p16/24/16/24 g16 pad-y=notification-toast-v-padding pad-x=notification-toast-desktop-h-padding gap=notification-gap r8=radius-md |
| Warning | 484x148 V p16/24/16/24 g16 pad-y=notification-toast-v-padding pad-x=notification-toast-desktop-h-padding gap=notification-gap r8=radius-md |
| Success | 484x148 V p16/24/16/24 g16 pad-y=notification-toast-v-padding pad-x=notification-toast-desktop-h-padding gap=notification-gap r8=radius-md |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| Neutral/False | bg:background-notification-white fg:text-display ic:icon-default ts:Text md/Semibold fx:shadow-3xl |
| Info/False | bg:background-notification-white fg:text-display ic:icon-info ts:Text md/Semibold fx:shadow-3xl |
| Critical/Error/False | bg:background-notification-white fg:text-display ic:background-error ts:Text md/Semibold fx:shadow-3xl |
| Warning/False | bg:background-notification-white fg:text-display ic:icon-warning ts:Text md/Semibold fx:shadow-3xl |
| Success/False | bg:background-notification-white fg:text-display ic:icon-success ts:Text md/Semibold fx:shadow-3xl |
| Neutral/True | bg:background-notification-white fg:text-display ic:icon-default ts:Text md/Semibold fx:shadow-3xl |
| Info/True | bg:background-notification-white fg:text-display ic:icon-info ts:Text md/Semibold fx:shadow-3xl |
| Critical/Error/True | bg:background-notification-white fg:text-display ic:background-error ts:Text md/Semibold fx:shadow-3xl |
| Warning/True | bg:background-notification-white fg:text-display ic:icon-warning ts:Text md/Semibold fx:shadow-3xl |
| Success/True | bg:background-notification-white fg:text-display ic:icon-success ts:Text md/Semibold fx:shadow-3xl |

## CSS implementation notes (from design.dga.gov.sa CSS, phase 2)
Where these differ from Figma above, Figma is the source of truth.
CSS block(s): `.notification-toast` — extracted verbatim from https://design.dga.gov.sa/ compiled CSS (2026-11-04). Not cross-checked against Figma (community files not readable via connector). rem duplicates (62.5% root) omitted.

### Variants / modifiers (`--`)
error, info, neutral, success, warning

### Elements / anatomy (`__`)
—

### Heights used
8px (1)

### Tokens referenced (count)
`--spacing-xl` (3), `--colors-base-white` (2), `--shadow-3xl` (2), `--colors-error-400` (2), `--spacing-3xl` (1), `--colors-info-400` (1), `--colors-warning-400` (1), `--colors-success-400` (1)

### Rules (selector → declarations; covers sizes, states :hover/:focus/:active/:disabled, colors, spacing, radius)

- `.notification-toast` → `width: 484px; padding: var(--spacing-xl) var(--spacing-3xl); gap: var(--spacing-xl); border-radius: var(--radius-md, 8px); background: var(--colors-base-white)`
- `.shadow-3xl,.notification-toast,dialog .modal` → `box-shadow: var(--shadow-3xl)`
- `.notification-toast:after` → `height: 100%; width: 8px; background-color: var(--colors-error-400)`
- `.notification-toast` → `width: 100%; padding: var(--spacing-xl)`
- `.notification-toast:after` → `width: 100%; height: 8px`
- `.notification-toast--neutral:after` → `background-color: var(--colors-base-white)`
- `.notification-toast--info:after` → `background-color: var(--colors-info-400)`
- `.notification-toast--error:after` → `background-color: var(--colors-error-400)`
- `.notification-toast--warning:after` → `background-color: var(--colors-warning-400)`
- `.notification-toast--success:after` → `background-color: var(--colors-success-400)`
- `.shadow-3xl,.notification-toast,.modal` → `box-shadow: var(--shadow-3xl)`
