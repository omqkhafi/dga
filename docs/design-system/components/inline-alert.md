# Inline Alert (web)

Source: Figma web file `trJvYAeN2wdayn2VdSUR2N`, page "Inline Alert". All values below are read from Figma component variants (LTR variants; RTL variants mirror them). Token names are Figma variable names (last segment); see `tokens.css`.

## Usage (plain language)

Positioned within task flows, these notifications inform users about the status of an ongoing action, typically displayed at the top of the main content area.

## Component: Inline Alert  (40 variants)

| Prop | Values / default |
|---|---|
| Actions | B:true |
| Helper text | B:true |
| Close Button | B:true |
| Lead Text EN | T:Notification/Alert messa |
| Helper Text EN | T:When a Notification/Aler |
| Lead Text AR | T:عنوان رسالة الاشعار أو ا |
| Helper Text AR | T:يكتب المحتوى الإضافي هنا |
| Secondary Action | B:true |
| RTL | False \| True |
| Type | Neutral \| Info \| Destructive \| Warning \| Success |
| Background Color | White \| Color |
| Mobile | False \| True |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| Neutral | 1024x132 V p16/24/16/24 g16 pad-y=notification-padding pad-x=notification-h-padding gap=notification-gap r8=radius-md sw1 |
| Info | 1024x132 V p16/24/16/24 g16 pad-y=notification-padding pad-x=notification-h-padding gap=notification-gap r8=radius-md sw1 |
| Destructive | 1024x132 V p16/24/16/24 g16 pad-y=notification-padding pad-x=notification-h-padding gap=notification-gap r8=radius-md sw1 |
| Warning | 1024x132 V p16/24/16/24 g16 pad-y=notification-padding pad-x=notification-h-padding gap=notification-gap r8=radius-md sw1 |
| Success | 1024x132 V p16/24/16/24 g16 pad-y=notification-padding pad-x=notification-h-padding gap=notification-gap r8=radius-md sw1 |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| Neutral/White/False | bg:background-notification-white bd:border-neutral-primary fg:text-display ic:icon-default ts:Text md/Semibold |
| Info/White/False | bg:background-notification-white bd:border-neutral-primary fg:text-display ic:icon-info ts:Text md/Semibold |
| Destructive/White/False | bg:background-notification-white bd:border-neutral-primary fg:text-display ic:icon-error ts:Text md/Semibold |
| Warning/White/False | bg:background-notification-white bd:border-neutral-primary fg:text-display ic:icon-warning ts:Text md/Semibold |
| Success/White/False | bg:background-notification-white bd:border-neutral-primary fg:text-display ic:icon-success ts:Text md/Semibold |
| Neutral/Color/False | bg:background-neutral-25 bd:border-neutral-primary fg:text-display ic:icon-default ts:Text md/Semibold |
| Info/Color/False | bg:background-info-25 bd:border-info-light fg:text-info ic:icon-info ts:Text md/Semibold |
| Destructive/Color/False | bg:background-error-25 bd:border-error-light fg:text-error ic:icon-error ts:Text md/Semibold |
| Warning/Color/False | bg:background-warning-25 bd:border-warning-light fg:text-warning ic:icon-warning ts:Text md/Semibold |
| Success/Color/False | bg:background-success-25 bd:border-success-light fg:text-success ic:icon-success ts:Text md/Semibold |
| Neutral/White/True | bg:background-white bd:border-neutral-primary fg:text-display ic:icon-default ts:Text md/Semibold |
| Info/White/True | bg:background-notification-white bd:border-neutral-primary fg:text-display ic:icon-info ts:Text md/Semibold |
| Destructive/White/True | bg:background-notification-white bd:border-neutral-primary fg:text-display ic:icon-error ts:Text md/Semibold |
| Warning/White/True | bg:background-notification-white bd:border-neutral-primary fg:text-display ic:icon-default ts:Text md/Semibold |
| Success/White/True | bg:background-notification-white bd:border-neutral-primary fg:text-display ic:icon-default ts:Text md/Semibold |
| Neutral/Color/True | bg:background-neutral-25 bd:border-neutral-primary fg:text-display ic:icon-default ts:Text md/Semibold |
| Info/Color/True | bg:background-info-25 bd:border-info-light fg:text-info ic:icon-default ts:Text md/Semibold |
| Destructive/Color/True | bg:background-error-25 bd:border-error-light fg:text-error ic:icon-error ts:Text md/Semibold |
| Warning/Color/True | bg:background-warning-25 bd:border-warning-light fg:text-warning ic:icon-default ts:Text md/Semibold |
| Success/Color/True | bg:background-success-25 bd:border-success-light fg:text-success ic:icon-success ts:Text md/Semibold |

## CSS implementation notes (from design.dga.gov.sa CSS, phase 2)
Where these differ from Figma above, Figma is the source of truth.
CSS block(s): `.alert` — extracted verbatim from https://design.dga.gov.sa/ compiled CSS (2026-11-04). Not cross-checked against Figma (community files not readable via connector). rem duplicates (62.5% root) omitted.

### Variants / modifiers (`--`)
error, error-bg, info, info-bg, neutral, neutral-bg, success, success-bg, warning, warning-bg

### Elements / anatomy (`__`)
—

### Heights used
8px (1)

### Tokens referenced (count)
`--spacing-xl` (3), `--colors-error-400` (3), `--colors-base-white` (2), `--colors-gray-neutral-300` (2), `--colors-info-400` (2), `--colors-warning-400` (2), `--colors-success-400` (2), `--colors-gray-neutral-25` (2), `--spacing-3xl` (1), `--radius-md` (1), `--colors-info-25` (1), `--colors-info-300` (1), `--colors-error-25` (1), `--colors-error-300` (1), `--colors-warning-25` (1), `--colors-warning-300` (1), `--colors-success-25` (1), `--colors-success-300` (1)

### Rules (selector → declarations; covers sizes, states :hover/:focus/:active/:disabled, colors, spacing, radius)

- `.alert` → `width: 100%; padding: var(--spacing-xl) var(--spacing-3xl); gap: var(--spacing-xl); border-radius: var(--radius-md); background: var(--colors-base-white); border: 1px solid var(--colors-gray-neutral-300)`
- `.alert:after` → `height: 100%; width: 8px; background-color: var(--colors-error-400)`
- `.alert` → `width: 100%; padding: var(--spacing-xl)`
- `.alert:after` → `width: 100%; height: 8px`
- `.alert--neutral:after` → `background-color: var(--colors-base-white)`
- `.alert--info:after` → `background-color: var(--colors-info-400)`
- `.alert--error:after` → `background-color: var(--colors-error-400)`
- `.alert--warning:after` → `background-color: var(--colors-warning-400)`
- `.alert--success:after` → `background-color: var(--colors-success-400)`
- `.alert--neutral-bg` → `background-color: var(--colors-gray-neutral-25); border-color: var(--colors-gray-neutral-300)`
- `.alert--neutral-bg:after` → `background-color: var(--colors-gray-neutral-25)`
- `.alert--info-bg` → `background-color: var(--colors-info-25); border-color: var(--colors-info-300)`
- `.alert--info-bg:after` → `background-color: var(--colors-info-400)`
- `.alert--error-bg` → `background-color: var(--colors-error-25); border-color: var(--colors-error-300)`
- `.alert--error-bg:after` → `background-color: var(--colors-error-400)`
- `.alert--warning-bg` → `background-color: var(--colors-warning-25); border-color: var(--colors-warning-300)`
- `.alert--warning-bg:after` → `background-color: var(--colors-warning-400)`
- `.alert--success-bg` → `background-color: var(--colors-success-25); border-color: var(--colors-success-300)`
- `.alert--success-bg:after` → `background-color: var(--colors-success-400)`
