# Checkbox (web)

Source: Figma web file `trJvYAeN2wdayn2VdSUR2N`, page "Checkbox". All values below are read from Figma component variants (LTR variants; RTL variants mirror them). Token names are Figma variable names (last segment); see `tokens.css`.

## Usage (plain language)

A checkbox allows users to make a single selection or indicate a binary choice.

Checkboxes enable users to interact with options within an interface. They can be toggled individually for specific selections or grouped together to allow multiple choices. Additionally, checkboxes can serve as trigger

Internal sub-parts (not used directly): `_CheckboxBase1`

## Component: Checkbox  (108 variants)

| Prop | Values / default |
|---|---|
| Checked | True \| False |
| Indeterminate | False \| True |
| State | Default \| Hovered \| Pressed \| Focused \| Read-only \| Disabled |
| Size | Medium \| Small \| x Small |
| Style | Primary \| Neutral |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| Medium | 24x24  |
| Small | 20x20  |
| x Small | 16x16  |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| False/False/Default/Primary |  |
| False/False/Default/Neutral |  |
| True/False/Default/Primary | ic:icon-oncolor |
| True/False/Default/Neutral | ic:icon-oncolor |
| True/True/Default/Primary | ic:icon-oncolor |
| True/True/Default/Neutral | ic:icon-oncolor |
| False/False/Hovered/Primary |  |
| False/False/Hovered/Neutral |  |
| True/False/Hovered/Primary | ic:Control-icon-hovered |
| True/False/Hovered/Neutral | ic:icon-oncolor |
| True/True/Hovered/Primary | ic:Control-icon-hovered |
| True/True/Hovered/Neutral | ic:icon-oncolor |
| False/False/Pressed/Primary |  |
| False/False/Pressed/Neutral |  |
| True/False/Pressed/Primary | ic:Control-icon-pressed |
| True/False/Pressed/Neutral | ic:icon-oncolor |
| True/True/Pressed/Primary | ic:Control-icon-pressed |
| True/True/Pressed/Neutral | ic:icon-oncolor |
| False/False/Focused/Primary |  |
| False/False/Focused/Neutral |  |
| True/False/Focused/Primary | ic:icon-oncolor |
| True/False/Focused/Neutral | ic:icon-oncolor |
| True/True/Focused/Primary | ic:icon-oncolor |
| True/True/Focused/Neutral | ic:icon-oncolor |
| False/False/Read-only/Primary |  |
| False/False/Read-only/Neutral |  |
| True/False/Read-only/Primary | ic:control-primary-checked |
| True/False/Read-only/Neutral | ic:control-neutral-checked |
| True/True/Read-only/Primary | ic:control-primary-checked |
| True/True/Read-only/Neutral | ic:control-neutral-checked |
| False/False/Disabled/Primary |  |
| False/False/Disabled/Neutral |  |
| True/False/Disabled/Primary | ic:icon-oncolor |
| True/False/Disabled/Neutral | ic:icon-oncolor |
| True/True/Disabled/Primary | ic:icon-oncolor |
| True/True/Disabled/Neutral | ic:icon-oncolor |

## Component: Checkbox Label  (2 variants)

| Prop | Values / default |
|---|---|
| Helper Text | B:true |
| Alert message | B:true |
| Label EN | T:Checkbox Label |
| Helper Text EN | T:When a selection needs a |
| Alert Message EN | T:Error/Warning message |
| Label AR | T:عنوان اختيار متعدد |
| Helper Text AR | T:يكتب المحتوى الإضافي هنا |
| Alert Message AR | T:رسالة خطأ أو تحذير |
| Hitbox focus ring | B:false |
| RTL | True \| False |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| - | 382x100 V p0/0/0/0 g0 r4=radius-sm |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| - | fg:text-display ic:icon-error ts:Text md/Medium |

## CSS implementation notes (from design.dga.gov.sa CSS, phase 2)
Where these differ from Figma above, Figma is the source of truth.
CSS block(s): `.checkbox` — extracted verbatim from https://design.dga.gov.sa/ compiled CSS (2026-11-04). Not cross-checked against Figma (community files not readable via connector). rem duplicates (62.5% root) omitted.

### Variants / modifiers (`--`)
brand, indeterminate, readonly

### Elements / anatomy (`__`)
checked-icon, helper-text, indeterminate-icon, label

### Heights used
16px (1), 24px (1), 48px (1)

### Tokens referenced (count)
`--colors-border-disabled` (6), `--spacing-xs` (2), `--colors-gray-neutral-950` (2), `--colors-brand-600` (2), `--spacing-md` (1), `--spacing-xl` (1), `--spacing-none` (1), `--colors-base-white` (1), `--radius-sm` (1), `--colors-base-black` (1), `--colors-gray-neutral-300` (1), `--radius-xs` (1), `--colors-gray-neutral-500` (1), `--radius-full` (1), `--colors-gray-neutral-100` (1), `--colors-text-brand-secondary` (1), `--colors-brand-700` (1), `--colors-gray-neutral-600` (1)

### Rules (selector → declarations; covers sizes, states :hover/:focus/:active/:disabled, colors, spacing, radius)

- `.checkbox` → `margin: var(--spacing-md); gap: var(--spacing-xl); padding: var(--spacing-none); cursor: pointer`
- `.checkbox-icon` → `color: var(--colors-base-white); width: 16px; height: 16px`
- `.checkbox.focus` → `border-radius: var(--radius-sm); outline: 2px solid var(--colors-base-black)`
- `.checkbox-main` → `gap: var(--spacing-xs); max-width: 382px`
- `.checkbox input` → `opacity: 0; cursor: pointer; height: 0; width: 0`
- `.checkbox input:checked~.checkbox-container` → `background-color: var(--colors-gray-neutral-950)`
- `.checkbox.active input:not(:checked)~.checkbox-container` → `background-color: var(--colors-gray-neutral-300)`
- `.checkbox-container` → `width: 24px; height: 24px; min-width: 24px; border-radius: var(--radius-xs); border: 1px solid var(--colors-gray-neutral-500); cursor: pointer; margin: var(--spacing-xs)`
- `.checkbox-container:after` → `border-radius: var(--radius-full); background: var(--colors-gray-neutral-100); width: 48px; height: 48px; transition: all .3s ease-in-out`
- `.checkbox--indeterminate .checkbox-container` → `background-color: var(--colors-gray-neutral-950)`
- `.checkbox input:disabled~.checkbox-container` → `border-color: var(--colors-border-disabled); background-color: var(--colors-border-disabled)`
- `.checkbox input:disabled~.checkbox__label,.checkbox input:disabled~div>.checkbox__label,.checkbox input:disabled~div>.checkbox__helper-text` → `color: var(--colors-border-disabled)`
- `.checkbox--brand input:checked~.checkbox-container` → `border-color: var(--colors-brand-600); background-color: var(--colors-brand-600)`
- `.checkbox--brand input:checked~.checkbox__label,.checkbox--brand input:checked~div>.checkbox__label` → `color: var(--colors-text-brand-secondary)`
- `.checkbox--brand input:checked:disabled~.checkbox-container` → `background-color: var(--colors-border-disabled)`
- `.checkbox--brand input:disabled~.checkbox-container` → `border-color: var(--colors-border-disabled); background-color: transparent`
- `.checkbox--brand input:disabled~.checkbox__label,.checkbox--brand input:disabled~div>.checkbox__label,.checkbox--brand input:disabled~div>.checkbox__helper-text` → `color: var(--colors-border-disabled)`
- `.checkbox--brand.active input:checked~.checkbox-container` → `background-color: var(--colors-brand-700)`
- `.checkbox--readonly .checkbox-container` → `background-color: transparent!important`
- `.checkbox--readonly .checkbox-container .checkbox-icon` → `color: var(--colors-gray-neutral-600)`
- `.card__checkbox-container>.checkbox .checkbox-main` → `min-width: -moz-fit-content; min-width: fit-content`
- `div.table-wrapper .azm-structured-table tbody tr td div .checkbox` → `margin-left: 0`
- `div.table-wrapper .azm-structured-table tbody tr td div .checkbox .checkbox-main` → `min-width: 5px!important`
- `.table-preview .checkbox-main,.checkbox-main__content` → `min-width: -moz-fit-content!important; min-width: fit-content!important`
