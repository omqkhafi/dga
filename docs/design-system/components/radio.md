# Radio (web)

Source: Figma web file `trJvYAeN2wdayn2VdSUR2N`, page "Radio". All values below are read from Figma component variants (LTR variants; RTL variants mirror them). Token names are Figma variable names (last segment); see `tokens.css`.

## Usage (plain language)

A Radio Button allows users to select a single option from a group, supporting different states for interaction.

Internal sub-parts (not used directly): `_RadioBase`

## Component: Radio  (24 variants)

| Prop | Values / default |
|---|---|
| State | Default \| Hovered \| Pressed \| Focused \| Read-only \| Disabled |
| Style | Primary \| Neutral |
| Selected | False \| True |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| - | 32x32 V p0/0/0/0 g0 pad-y=spacing-none pad-x=spacing-none gap=spacing-none |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| Default/Neutral/False |  |
| Hovered/Neutral/False |  |
| Pressed/Neutral/False |  |
| Focused/Neutral/False | bd:border-black |
| Read-only/Neutral/False |  |
| Disabled/Neutral/False |  |
| Default/Primary/False |  |
| Hovered/Primary/False |  |
| Pressed/Primary/False |  |
| Focused/Primary/False | bd:border-black |
| Read-only/Primary/False |  |
| Disabled/Primary/False |  |
| Default/Neutral/True |  |
| Hovered/Neutral/True |  |
| Pressed/Neutral/True |  |
| Focused/Neutral/True | bd:border-black |
| Read-only/Neutral/True |  |
| Disabled/Neutral/True |  |
| Default/Primary/True |  |
| Hovered/Primary/True |  |
| Pressed/Primary/True |  |
| Focused/Primary/True | bd:border-black |
| Read-only/Primary/True |  |
| Disabled/Primary/True |  |

## Component: Radio Label  (2 variants)

A radio button lets users choose one option from a group of options. When they pick one, any previously selected option is deselected. This way, users can only select one option at a time.
 
Radio buttons are commonly used in forms and surveys when users need to pick just one choice from a list.

| Prop | Values / default |
|---|---|
| Helper Text | B:true |
| Alert Message | B:true |
| Label EN | T:Radio Label |
| Helper Text EN | T:When a selection needs a |
| Alert Message EN | T:Error/Warning message |
| Label AR | T:عنوان اختيار مفرد  |
| Helper Text AR | T:يكتب المحتوى الإضافي هنا |
| Alert Message AR | T:رسالة خطأ أو تحذير |
| Hitbox Focus Ring | B:false |
| RTL | True \| False |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| - | 382x108 V p0/0/0/0 g0 pad-y=spacing-none pad-x=spacing-none gap=spacing-none r4=radius-sm |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| - | fg:text-display ic:icon-error ts:Text md/Medium |

## CSS implementation notes (from design.dga.gov.sa CSS, phase 2)
Where these differ from Figma above, Figma is the source of truth.
CSS block(s): `.radio` — extracted verbatim from https://design.dga.gov.sa/ compiled CSS (2026-11-04). Not cross-checked against Figma (community files not readable via connector). rem duplicates (62.5% root) omitted.

### Variants / modifiers (`--`)
brand

### Elements / anatomy (`__`)
helper-text, label

### Heights used
24px (1), 48px (1), 15px (1)

### Tokens referenced (count)
`--colors-border-disabled` (6), `--spacing-md` (2), `--radius-full` (2), `--colors-brand-600` (2), `--spacing-xl` (1), `--radius-sm` (1), `--colors-base-black` (1), `--spacing-xs` (1), `--colors-gray-neutral-300` (1), `--colors-gray-neutral-500` (1), `--colors-gray-neutral-100` (1), `--colors-gray-neutral-950` (1), `--colors-text-brand-secondary` (1), `--colors-brand-700` (1)

### Rules (selector → declarations; covers sizes, states :hover/:focus/:active/:disabled, colors, spacing, radius)

- `.radio` → `margin: var(--spacing-md); gap: var(--spacing-xl); padding: var(--spacing-md); cursor: pointer`
- `.radio.focus` → `border-radius: var(--radius-sm); outline: 2px solid var(--colors-base-black)`
- `.radio-main` → `gap: var(--spacing-xs); max-width: 382px`
- `.radio input` → `opacity: 0; cursor: pointer; height: 0; width: 0`
- `.radio.active input:not(:checked)~.radio-container` → `background-color: var(--colors-gray-neutral-300)`
- `.radio-container` → `width: 24px; height: 24px; min-width: 24px; border-radius: var(--radius-full); border: 1px solid var(--colors-gray-neutral-500); cursor: pointer`
- `.radio-container:after,.radio-container:before` → `border-radius: var(--radius-full); background: var(--colors-gray-neutral-100); width: 48px; height: 48px; transition: all .3s ease-in-out`
- `.radio-container:before` → `background-color: var(--colors-gray-neutral-950); width: 15px; height: 15px; transition: all .1s ease-in-out`
- `.radio input:disabled~.radio-container` → `border-color: var(--colors-border-disabled)`
- `.radio input:disabled~.radio-container:before` → `background-color: var(--colors-border-disabled)`
- `.radio input:disabled~.radio__label,.radio input:disabled~div>.radio__label,.radio input:disabled~div>.radio__helper-text` → `color: var(--colors-border-disabled)`
- `.radio--brand input:checked~.radio-container` → `border-color: var(--colors-brand-600)`
- `.radio--brand input:checked~.radio-container:before` → `background-color: var(--colors-brand-600)`
- `.radio--brand input:checked~.radio__label,.radio--brand input:checked~div>.radio__label` → `color: var(--colors-text-brand-secondary)`
- `.radio--brand.active input:checked~.radio-container:before` → `background-color: var(--colors-brand-700)`
- `.radio--brand input:disabled~.radio-container` → `border-color: var(--colors-border-disabled)`
- `.radio--brand input:disabled~.radio-container:before` → `background-color: var(--colors-border-disabled)`
- `.radio--brand input:disabled~.radio__label,.radio--brand input:disabled~div>.radio__label,.radio--brand input:disabled~div>.radio__helper-text` → `color: var(--colors-border-disabled)`
