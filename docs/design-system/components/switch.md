# Switch (web)

Source: Figma web file `trJvYAeN2wdayn2VdSUR2N`, page "Switch". All values below are read from Figma component variants (LTR variants; RTL variants mirror them). Token names are Figma variable names (last segment); see `tokens.css`.

## Usage (plain language)

A switch is a control used to alternate quickly between two possible states. Toggles are used specifically for binary actions that occur immediately when the user "flips the switch". They are most commonly used for "on/off" settings.

## Component: Switch  (20 variants)

| Prop | Values / default |
|---|---|
| Icon | B:false |
| RTL | True \| False |
| State | Default \| Hovered \| Pressed \| Focused \| Disabled |
| On | False \| True |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| - | 48x24  |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| Default/False |  |
| Default/True |  |
| Hovered/False |  |
| Hovered/True |  |
| Pressed/False |  |
| Pressed/True |  |
| Focused/False |  |
| Focused/True |  |
| Disabled/False |  |
| Disabled/True |  |

## Component: Switch Label  (4 variants)

| Prop | Values / default |
|---|---|
| Helper Text | B:true |
| Alert message | B:true |
| Label EN | T:Switch Label |
| Helper Text EN | T:When a selection needs a |
| Alert Message EN | T:Error/Warning message |
| Label AR | T:عنوان المفتاح |
| Helper Text AR | T:يكتب المحتوى الإضافي هنا |
| Alert Message AR | T:رسالة خطأ أو تحذير |
| RTL | True \| False |
| Trail switch | False \| True |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| - | 382x96 V p0/0/0/0 g4 gap=control-vertical-gap |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| False | fg:text-display ic:icon-error ts:Text md/Medium |
| True | fg:text-display ic:icon-error ts:Text md/Medium |

## CSS implementation notes (from design.dga.gov.sa CSS, phase 2)
Where these differ from Figma above, Figma is the source of truth.
CSS block(s): `.switch` — extracted verbatim from https://design.dga.gov.sa/ compiled CSS (2026-11-04). Not cross-checked against Figma (community files not readable via connector). rem duplicates (62.5% root) omitted.

### Variants / modifiers (`--`)
brand, readonly

### Elements / anatomy (`__`)
helper-text, label, warning

### Heights used
24px (1), 16px (1)

### Tokens referenced (count)
`--colors-border-disabled` (2), `--colors-brand-600` (2), `--spacing-xl` (1), `--spacing-none` (1), `--colors-base-white` (1), `--radius-sm` (1), `--colors-base-black` (1), `--spacing-xs` (1), `--colors-text-brand-secondary` (1), `--colors-brand-200` (1), `--colors-gray-neutral-600` (1), `--spacing-3xl` (1)

### Rules (selector → declarations; covers sizes, states :hover/:focus/:active/:disabled, colors, spacing, radius)

- `.switch` → `gap: var(--spacing-xl); padding: var(--spacing-none); width: -moz-fit-content; width: fit-content; padding: 3px; cursor: pointer`
- `.switch-main__content.disabled>.switch__label,.switch-main__content.disabled>div>.switch__label,.switch-main__content.disabled>div>.switch__helper-text` → `color: var(--colors-border-disabled)`
- `.switch .switch-wrapper` → `min-width: 48px; height: 24px`
- `.switch .switch-wrapper input` → `opacity: 0; width: 0; height: 0`
- `.switch .switch-wrapper .slider` → `cursor: pointer; background-color: #ccc; transition: .4s; border-radius: 34px`
- `.switch .switch-wrapper .slider:before` → `height: 16px; width: 16px; background-color: #fff; transition: .4s; border-radius: 50%`
- `.switch .switch-wrapper input:checked+.slider` → `background-color: var(--colors-brand-600)`
- `.switch .switch-wrapper input:focus+.slider` → `box-shadow: 0 0 1px var(--colors-brand-600)`
- `.switch .switch-wrapper .slider.round` → `border-radius: 34px`
- `.switch .switch-wrapper .slider.round:before` → `border-radius: 50%`
- `.switch-icon` → `color: var(--colors-base-white); font-size: 18px!important; font-weight: bolder!important`
- `.switch.focus` → `border-radius: var(--radius-sm); outline: 2px solid var(--colors-base-black)`
- `.switch-main` → `gap: var(--spacing-xs); max-width: 382px`
- `.switch input` → `opacity: 0; cursor: pointer; height: 0; width: 0`
- `.switch--brand input:checked~.switch__label,.switch--brand input:checked~div>.switch__label` → `color: var(--colors-text-brand-secondary)`
- `.switch--brand .switch-main__content.disabled .switch-wrapper>.slider--active` → `background-color: var(--colors-brand-200)`
- `.switch--brand .switch-main__content.disabled>.switch__label,.switch--brand .switch-main__content.disabled>div>.switch__label,.switch--brand .switch-main__content.disabled>div>.switch__helper-text` → `color: var(--colors-border-disabled)`
- `.switch--readonly .switch-slider` → `background-color: transparent!important`
- `.switch--readonly .switch-slider .switch-icon` → `color: var(--colors-gray-neutral-600)`
- `[dir=rtl] .switch .switch__warning` → `margin-left: 0; margin-right: var(--spacing-3xl)`
