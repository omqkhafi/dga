# Notification (web)

Source: Figma web file `trJvYAeN2wdayn2VdSUR2N`, page "Notification". All values below are read from Figma component variants (LTR variants; RTL variants mirror them). Token names are Figma variable names (last segment); see `tokens.css`.

## Usage (plain language)

Notifications are prominent UI elements used to convey important information or alerts to users. They typically appear at the top of a webpage or application screen, drawing immediate attention to their content.

## Component: Notification  (10 variants)

| Prop | Values / default |
|---|---|
| Lead Text | B:true |
| Link | B:false |
| Dismissible | B:true |
| Icon | B:true |
| Button | B:false |
| Helper Text EN | T:This is a very important |
| Lead Text EN | T:Important: |
| Lead Text AR | T:مهم: |
| Helper Text AR | T:هذه رسالة تنبيهية مهمة ل |
| RTL | False \| True |
| Style | Neutral \| Critical \| Warning \| Success \| Info |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| - | 1280x56 V p8/24/8/24 g16 pad-y=notification-alert-v-padding pad-x=notification-h-padding gap=notification-gap r2=radius-xs |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| Critical | bg:background-error-50 fg:text-error ic:icon-oncolor ts:Text md/Bold |
| Warning | bg:background-warning-50 fg:text-warning ic:icon-oncolor ts:Text md/Bold |
| Success | bg:background-success-50 fg:text-success ic:icon-oncolor ts:Text md/Bold |
| Info | bg:background-info-50 fg:text-info ic:icon-oncolor ts:Text md/Bold |
| Neutral | bg:background-neutral-50 fg:text-primary-paragraph ic:icon-oncolor ts:Text md/Bold |

## CSS implementation notes (from design.dga.gov.sa CSS, phase 2)
Where these differ from Figma above, Figma is the source of truth.
CSS block(s): `.notification` — extracted verbatim from https://design.dga.gov.sa/ compiled CSS (2026-11-04). Not cross-checked against Figma (community files not readable via connector). rem duplicates (62.5% root) omitted.

### Variants / modifiers (`--`)
critical, info, neutral, success, warning

### Elements / anatomy (`__`)
content, icon, lead-text

### Heights used
8px (1)

### Tokens referenced (count)
`--spacing-xl` (4), `--colors-error-400` (3), `--spacing-3xl` (2), `--colors-base-white` (2), `--spacing-md` (2), `--colors-warning-400` (2), `--colors-info-400` (2), `--shadow-3xl` (2), `--colors-error-50` (1), `--colors-text-error-primary` (1), `--colors-warning-50` (1), `--colors-warning-600` (1), `--colors-brand-400` (1), `--colors-brand-50` (1), `--colors-text-brand-primary` (1), `--colors-info-50` (1), `--colors-info-600` (1), `--colors-gray-neutral-400` (1), `--colors-gray-neutral-50` (1), `--colors-text-secondary` (1), `--spacing-none` (1), `--spacing-lg` (1), `--spacing-xs` (1), `--colors-success-400` (1)

### Rules (selector → declarations; covers sizes, states :hover/:focus/:active/:disabled, colors, spacing, radius)

- `.notification-toast` → `width: 484px; padding: var(--spacing-xl) var(--spacing-3xl); gap: var(--spacing-xl); border-radius: var(--radius-md, 8px); background: var(--colors-base-white)`
- `.notification` → `width: 100%; padding: var(--spacing-md) var(--spacing-3xl); border-bottom: 2px solid`
- `.notification--critical` → `border-color: var(--colors-error-400); background-color: var(--colors-error-50)`
- `.notification--critical .notification__content,.notification--critical .notification__icon,.notification--critical .notification__lead-text` → `color: var(--colors-text-error-primary)`
- `.notification--warning` → `border-color: var(--colors-warning-400); background-color: var(--colors-warning-50)`
- `.notification--warning .notification__content,.notification--warning .notification__icon,.notification--warning .notification__lead-text` → `color: var(--colors-warning-600)`
- `.notification--success` → `border-color: var(--colors-brand-400); background-color: var(--colors-brand-50)`
- `.notification--success .notification__content,.notification--success .notification__icon,.notification--success .notification__lead-text` → `color: var(--colors-text-brand-primary)`
- `.notification--info` → `border-color: var(--colors-info-400); background-color: var(--colors-info-50)`
- `.notification--info .notification__content,.notification--info .notification__icon,.notification--info .notification__lead-text` → `color: var(--colors-info-600)`
- `.notification--neutral` → `border-color: var(--colors-gray-neutral-400); background-color: var(--colors-gray-neutral-50)`
- `.notification--neutral .notification__content,.notification--neutral .notification__icon,.notification--neutral .notification__lead-text` → `color: var(--colors-text-secondary)`
- `.shadow-3xl,.notification-toast,dialog .modal` → `box-shadow: var(--shadow-3xl)`
- `.notification-toast:after` → `height: 100%; width: 8px; background-color: var(--colors-error-400)`
- `.notification-toast__header` → `padding: var(--spacing-none); gap: var(--spacing-lg)`
- `.notification-toast__title` → `margin-bottom: var(--spacing-xs)`
- `.notification-toast__action` → `padding: var(--spacing-none, 0px) var(--spacing-5xl, 40px); gap: var(--spacing-md)`
- `.notification-toast__action-mobile` → `width: 100%`
- `.notification-toast` → `width: 100%; padding: var(--spacing-xl)`
- `.notification-toast:after` → `width: 100%; height: 8px`
- `.notification-toast__header` → `gap: var(--spacing-xl)`
- `.notification-toast--neutral:after` → `background-color: var(--colors-base-white)`
- `.notification-toast--info:after` → `background-color: var(--colors-info-400)`
- `.notification-toast--error:after` → `background-color: var(--colors-error-400)`
- `.notification-toast--warning:after` → `background-color: var(--colors-warning-400)`
- `.notification-toast--success:after` → `background-color: var(--colors-success-400)`
- `.shadow-3xl,.notification-toast,.modal` → `box-shadow: var(--shadow-3xl)`
