# Text input (web)

Source: Figma web file `trJvYAeN2wdayn2VdSUR2N`, page "Text input". All values below are read from Figma component variants (LTR variants; RTL variants mirror them). Token names are Figma variable names (last segment); see `tokens.css`.

## Usage (plain language)

Text input in Platforms Code are interactive elements where users can enter or edit text, numbers, or other data. They provide a means for users to input information, such as usernames, passwords, or search queries, and are commonly found in forms or search bars. Input fields typically feature visua

Internal sub-parts (not used directly): `_Input Prefix-Suffix`

## Component: Text Input  (288 variants)

| Prop | Values / default |
|---|---|
| Icon | B:false |
| 🔁 Swap Helper Icon | I:31864:189863 |
| Prefix | B:false |
| Suffix | B:false |
| Text ENG | T:Entered text |
| Text AR | T:نص تلميحي |
| Show label | B:true |
| Show Helper Text | B:false |
| Helper Text Eng | T:Help Text |
| Helper text AR | T:نص مساعد |
| 🔁 Swap Icon | I:14313:61520 |
| RTL | False \| True |
| State | Default \| Hovered \| Pressed \| Focused \| Read-only \| Disabled |
| Filled | False \| True |
| Error | False \| True |
| Size | Large \| Medium |
| Style | Default \| Filled lighter \| Filled darker |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| Large | 320x68 V p0/0/0/0 g8 gap=field-label-gap |
| Medium | 320x60 V p0/0/0/0 g8 gap=field-label-gap |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| Default/True/False/Default | fg:field-text-label ts:Text sm/Regular |
| Default/False/False/Default | fg:field-text-label ts:Text sm/Regular |
| Default/True/True/Default | fg:field-text-label ts:Text sm/Regular |
| Default/False/True/Default | fg:field-text-label ts:Text sm/Regular |
| Hovered/True/False/Default | fg:field-text-label ts:Text sm/Regular |
| Hovered/False/False/Default | fg:field-text-label ts:Text sm/Regular |
| Hovered/True/True/Default | fg:field-text-label ts:Text sm/Regular |
| Hovered/False/True/Default | fg:field-text-label ts:Text sm/Regular |
| Pressed/True/False/Default | fg:field-text-label ts:Text sm/Regular |
| Pressed/False/False/Default | fg:field-text-label ts:Text sm/Regular |
| Pressed/True/True/Default | fg:field-text-label ts:Text sm/Regular |
| Pressed/False/True/Default | fg:field-text-label ts:Text sm/Regular |
| Focused/True/False/Default | fg:field-text-label ts:Text sm/Regular fx:shadow-md |
| Focused/False/False/Default | fg:field-text-label ts:Text sm/Regular fx:shadow-md |
| Focused/True/True/Default | fg:field-text-label ts:Text sm/Regular fx:shadow-md |
| Focused/False/True/Default | fg:field-text-label ts:Text sm/Regular fx:shadow-md |
| Read-only/True/False/Default | fg:field-text-label ts:Text sm/Regular |
| Read-only/False/False/Default | fg:field-text-label ts:Text sm/Regular |
| Read-only/True/True/Default | fg:field-text-label ts:Text sm/Regular |
| Read-only/False/True/Default | fg:field-text-label ts:Text sm/Regular |
| Disabled/True/False/Default | fg:input-text-disabled ts:Text sm/Regular |
| Disabled/False/False/Default | fg:input-text-disabled ts:Text sm/Regular |
| Disabled/True/True/Default | fg:input-text-disabled ts:Text sm/Regular |
| Disabled/False/True/Default | fg:input-text-disabled ts:Text sm/Regular |
| Default/True/False/Filled darker | fg:field-text-label ts:Text sm/Regular |
| Default/False/False/Filled darker | fg:field-text-label ts:Text sm/Regular |
| Default/True/True/Filled darker | fg:field-text-label ts:Text sm/Regular |
| Default/False/True/Filled darker | fg:field-text-label ts:Text sm/Regular |
| Hovered/True/False/Filled darker | fg:field-text-label ts:Text sm/Regular |
| Hovered/False/False/Filled darker | fg:field-text-label ts:Text sm/Regular |
| Hovered/True/True/Filled darker | fg:field-text-label ts:Text sm/Regular |
| Hovered/False/True/Filled darker | fg:field-text-label ts:Text sm/Regular |
| Pressed/True/False/Filled darker | fg:field-text-label ts:Text sm/Regular |
| Pressed/False/False/Filled darker | fg:field-text-label ts:Text sm/Regular |
| Pressed/True/True/Filled darker | fg:field-text-label ts:Text sm/Regular |
| Pressed/False/True/Filled darker | fg:field-text-label ts:Text sm/Regular |
| Focused/True/False/Filled darker | fg:field-text-label ts:Text sm/Regular fx:shadow-md |
| Focused/False/False/Filled darker | fg:field-text-label ts:Text sm/Regular fx:shadow-md |
| Focused/True/True/Filled darker | fg:field-text-label ts:Text sm/Regular fx:shadow-md |
| Focused/False/True/Filled darker | fg:field-text-label ts:Text sm/Regular fx:shadow-md |
| Read-only/True/False/Filled darker | fg:field-text-label ts:Text sm/Regular |
| Read-only/False/False/Filled darker | fg:field-text-label ts:Text sm/Regular |
| Read-only/True/True/Filled darker | fg:field-text-label ts:Text sm/Regular |
| Read-only/False/True/Filled darker | fg:field-text-label ts:Text sm/Regular |
| Disabled/True/False/Filled darker | fg:input-text-disabled ts:Text sm/Regular |
| Disabled/False/False/Filled darker | fg:input-text-disabled ts:Text sm/Regular |
| Disabled/True/True/Filled darker | fg:input-text-disabled ts:Text sm/Regular |
| Disabled/False/True/Filled darker | fg:input-text-disabled ts:Text sm/Regular |
| Default/True/False/Filled lighter | fg:field-text-label ts:Text sm/Regular |
| Default/False/False/Filled lighter | fg:field-text-label ts:Text sm/Regular |
| Default/True/True/Filled lighter | fg:field-text-label ts:Text sm/Regular |
| Default/False/True/Filled lighter | fg:field-text-label ts:Text sm/Regular |
| Hovered/True/False/Filled lighter | fg:field-text-label ts:Text sm/Regular |
| Hovered/False/False/Filled lighter | fg:field-text-label ts:Text sm/Regular |
| Hovered/True/True/Filled lighter | fg:field-text-label ts:Text sm/Regular |
| Hovered/False/True/Filled lighter | fg:field-text-label ts:Text sm/Regular |
| Pressed/True/False/Filled lighter | fg:field-text-label ts:Text sm/Regular |
| Pressed/False/False/Filled lighter | fg:field-text-label ts:Text sm/Regular |
| Pressed/True/True/Filled lighter | fg:field-text-label ts:Text sm/Regular |
| Pressed/False/True/Filled lighter | fg:field-text-label ts:Text sm/Regular |
| Focused/True/False/Filled lighter | fg:field-text-label ts:Text sm/Regular fx:shadow-md |
| Focused/False/False/Filled lighter | fg:field-text-label ts:Text sm/Regular fx:shadow-md |
| Focused/True/True/Filled lighter | fg:field-text-label ts:Text sm/Regular fx:shadow-md |
| Focused/False/True/Filled lighter | fg:field-text-label ts:Text sm/Regular fx:shadow-md |
| Read-only/True/False/Filled lighter | fg:field-text-label ts:Text sm/Regular |
| Read-only/False/False/Filled lighter | fg:field-text-label ts:Text sm/Regular |
| Read-only/True/True/Filled lighter | fg:field-text-label ts:Text sm/Regular |
| Read-only/False/True/Filled lighter | fg:field-text-label ts:Text sm/Regular |
| Disabled/True/False/Filled lighter | fg:input-text-disabled ts:Text sm/Regular |
| Disabled/False/False/Filled lighter | fg:input-text-disabled ts:Text sm/Regular |
| Disabled/True/True/Filled lighter | fg:input-text-disabled ts:Text sm/Regular |
| Disabled/False/True/Filled lighter | fg:input-text-disabled ts:Text sm/Regular |

## Component: Label  (16 variants)

Displays the title of the input.

| Prop | Values / default |
|---|---|
| Text AR | T:عنوان |
| Required | B:true |
| Text | T:Label |
| RTL | False \| True |
| Type | Regular (Default) \| Semibold |
| Size | Medium \| Large |
| Disabled | False \| True |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| Regular (Default)/Medium | 46x20 H p0/0/0/0 g4 gap=label-gap |
| Semibold/Medium | 48x20 H p0/0/0/0 g4 gap=label-gap |
| Regular (Default)/Large | 51x24 H p0/0/0/0 g4 gap=label-gap |
| Semibold/Large | 54x24 H p0/0/0/0 g4 gap=label-gap |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| Regular (Default)/False | fg:field-border-error ts:Text sm/Regular |
| Regular (Default)/True | fg:input-text-disabled ts:Text sm/Regular |
| Semibold/False | fg:field-border-error ts:Text sm/Semibold |
| Semibold/True | fg:input-text-disabled ts:Text sm/Semibold |

## CSS implementation notes (from design.dga.gov.sa CSS, phase 2)
Where these differ from Figma above, Figma is the source of truth.
CSS block(s): `.input` — extracted verbatim from https://design.dga.gov.sa/ compiled CSS (2026-11-04). Not cross-checked against Figma (community files not readable via connector). rem duplicates (62.5% root) omitted.

### Variants / modifiers (`--`)
darker, disabled, error, lg, lg__feedback-icon, lighter, md, md__feedback-icon, readonly

### Elements / anatomy (`__`)
field, icon, prefix--solid-text, prefix--subtle-text, prefix-chevron, prefix-icon, prefix-label, suffix-chevron, suffix-icon, suffix-label

### Heights used
40px (5), 2px (2), 32px (1)

### Tokens referenced (count)
`--colors-gray-neutral-400` (8), `--colors-base-white` (4), `--colors-gray-neutral-300` (4), `--form-field-border-default` (4), `--text-default-disabled` (4), `--spacing-none` (3), `--radius-sm` (3), `--spacing-xs` (3), `--colors-error-600` (3), `--shadow-md` (3), `--form-field-background-default` (3), `--spacing-xl` (2), `--colors-text-primary` (2), `--colors-gray-neutral-100` (2), `--border-neutral-primary` (2), `--form-field-text-readonly` (2), `--form-field-border-error` (2), `--colors-gray-neutral-700` (1), `--colors-gray-neutral-950` (1), `--colors-gray-neutral-50` (1), `--spacing-2` (1), `--form-field-border-hovered` (1), `--form-field-border-pressed` (1), `--border-disabled` (1)

### Rules (selector → declarations; covers sizes, states :hover/:focus/:active/:disabled, colors, spacing, radius)

- `.input` → `height: 40px; width: 100%; min-width: 200px; padding: var(--spacing-none) var(--spacing-xl); border-radius: var(--radius-sm); gap: var(--spacing-xs); border: 1px solid var(--colors-gray-neutral-400); background: var(--colors-base-white)`
- `.input--error,.input--error:hover` → `border-color: var(--colors-error-600)`
- `.date-picker-root__main__inputs .input` → `width: 50px; max-width: unset; min-width: unset`
- `[data-dual-view=true] .date-picker-root__main__inputs .input` → `width: 200px`
- `.text-md-regular,.accordion-item__body,.input__field,.input__field::placeholder,.input__prefix-label,.input__prefix-icon,.input__prefix-chevron,.input__suffix-label,.input__suffix-icon,.input__suffix-chevron,.input--lg .…` → `font: 400 16px/24px IBMPlexSansArabic`
- `.input--lg .input__field::-moz-placeholder,.input--md .input__field::-moz-placeholder,.textarea--lg .textarea__field::-moz-placeholder` → `font: 400 14px/20px IBMPlexSansArabic`
- `.text-sm-regular,.checkbox__helper-text,.switch__helper-text,.radio__helper-text,.input__prefix .dropdown__label--selection,.input__suffix .dropdown__label--selection,.input--lg .input__field,.input--lg .input__field::pl…` → `font: 400 14px/20px IBMPlexSansArabic`
- `.shadow-md,.input.focus,.dropdown__btn.open,.textarea.focus,.card,.card.focused` → `box-shadow: var(--shadow-md)`
- `.input` → `height: 40px; min-width: 200px; padding: var(--spacing-none) var(--spacing-xl); border-radius: var(--radius-sm); gap: var(--spacing-xs); border: 1px solid var(--colors-gray-neutral-400); background: var(--colors-base-white)`
- `.input:hover` → `border-color: var(--colors-gray-neutral-700)`
- `.input:after` → `width: 0%; height: 2px; background-color: var(--colors-gray-neutral-950); transition: width .2s ease-in-out`
- `.input--readonly,.input--readonly:hover,.input--disabled,.input--disabled:hover` → `border-color: var(--colors-gray-neutral-300); box-shadow: none!important`
- `.input--readonly .input__field::-moz-placeholder,.input--disabled .input__field::-moz-placeholder` → `color: var(--colors-text-primary)`
- `.input--readonly .input__field,.input--readonly .input__field::placeholder,.input--disabled .input__field,.input--disabled .input__field::placeholder` → `color: var(--colors-text-primary)`
- `.input--disabled .input__field::-moz-placeholder` → `color: var(--colors-gray-neutral-300)`
- `.input--disabled .input__field,.input--disabled .input__field::placeholder` → `color: var(--colors-gray-neutral-300)`
- `.input--disabled .input__icon span,.input--disabled .input__prefix--subtle-text,.input--disabled .input__prefix--solid-text` → `color: var(--colors-gray-neutral-300)`
- `.input--lighter` → `border: 0`
- `.input--lighter:hover` → `border: 1px solid var(--colors-gray-neutral-400)`
- `.input--lighter.focus` → `border: 1px solid var(--colors-gray-neutral-400); background-color: var(--colors-base-white)`
- `.input--lighter.active` → `border: 1px solid var(--colors-gray-neutral-400); background-color: var(--colors-gray-neutral-100)`
- `.input--darker` → `border: 0; background-color: var(--colors-gray-neutral-50)`
- `.input--darker:hover` → `border: 1px solid var(--colors-gray-neutral-400)`
- `.input--darker.focus` → `border: 1px solid var(--colors-gray-neutral-400); background-color: var(--colors-base-white)`
- `.input--darker.active` → `border: 1px solid var(--colors-gray-neutral-400); background-color: var(--colors-gray-neutral-100)`
- `.input--error,.input--error:hover` → `outline-color: var(--colors-error-600)`
- `.input--error:after` → `background-color: var(--colors-error-600)`
- `.shadow-md,.input.focus,.dropdown__btn.open,.textarea.focus` → `box-shadow: var(--shadow-md)`
- `.change-log-input .input` → `background: #fcfcfd!important`
- `.text-md-regular,.dga-label--lg,.list-title,.list-item,.content-switcher__item--sm,div.table-wrapper .azm-table tbody td,.menu-item__trail-element,.menu-item__label,.date-cell__label,.input--lg .input__prefix-label,.inpu…` → `font: 400 16px/24px IBMPlexSansArabic`
- `.input--md .input__field::-moz-placeholder,.input--lg .input__field::-moz-placeholder` → `font: 400 14px/20px IBMPlexSansArabic`
- `.text-sm-regular,.dga-label--md,.dga-breadcrumb-dropdown-item,.input--md .input__prefix-label,.input--md .input__suffix-label,.input--md .input__field,.input--md .input__field::placeholder,.input--lg .input__field,.input…` → `font: 400 14px/20px IBMPlexSansArabic`
- `.input` → `height: 40px; width: 100%; padding: var(--spacing-none) var(--spacing-2); border-radius: var(--radius-sm); gap: var(--spacing-xs); border: 1px solid var(--form-field-border-default); background: var(--form-field-background-default)`
- `.input:hover` → `border-color: var(--form-field-border-hovered)`
- `.input:after` → `width: 0%; height: 2px; background-color: var(--form-field-border-pressed); transition: width .2s ease-in-out`
- `.input.focus:after` → `width: 100%`
- `.input.active:after` → `width: 50%`
- `.input--readonly,.input--readonly:hover,.input--disabled,.input--disabled:hover` → `border-color: var(--border-neutral-primary); box-shadow: none!important`
- `.input--readonly .input__field::-moz-placeholder,.input--disabled .input__field::-moz-placeholder` → `color: var(--form-field-text-readonly)`
- `.input--readonly .input__field,.input--readonly .input__field::placeholder,.input--disabled .input__field,.input--disabled .input__field::placeholder` → `color: var(--form-field-text-readonly)`
- `.input--disabled` → `border-color: var(--border-disabled)`
- `.input--disabled .input__field` → `color: var(--text-default-disabled)`
- `.input--disabled .input__field::-moz-placeholder` → `color: var(--text-default-disabled)`
- `.input--disabled .input__field,.input--disabled .input__field::placeholder` → `color: var(--text-default-disabled)`
- `.input--disabled .input__icon span,.input--disabled .input__prefix--subtle-text,.input--disabled .input__prefix--solid-text` → `color: var(--text-default-disabled)`
- `.input--lighter` → `border: 0; background: var(--form-field-background-lighter, #fcfcfd)`
- `.input--lighter:hover,.input--lighter.focus,.input--lighter.active` → `border: 1px solid var(--form-field-border-default)`
- `.input--darker` → `border: 0; background-color: var(--form-field-background-darker, #f3f4f6)`
- `.input--darker:hover` → `border: 1px solid var(--form-field-border-default)`
- `.input--darker.focus,.input--darker.active` → `border: 1px solid var(--form-field-border-default); background-color: var(--form-field-background-default)!important`
- `.input.readOnly` → `border: 1px solid var(--border-neutral-primary)!important; background-color: var(--form-field-background-default)!important; box-shadow: none!important`
- `.input--error,.input--error:hover` → `border: 1px solid var(--form-field-border-error)!important`
- `.input--error:after` → `background-color: var(--form-field-border-error)`
- `.input--lg` → `height: 40px`
- `.input--lg .input__field::-moz-placeholder` → `font-size: 16px; font-weight: 400; line-height: 24px`
- `.input--lg .input__field,.input--lg .input__field::placeholder` → `font-size: 16px; font-weight: 400; line-height: 24px`
- `.input--lg__feedback-icon span` → `font-size: 20px`
- `.input--lg .input__prefix-icon,.input--lg .input__suffix-icon` → `font-size: 24px`
- `.input--lg .input__prefix-chevron,.input--lg .input__suffix-chevron` → `font-size: 20px`
- `.input--md` → `height: 32px`
- `.input--md .input__field::-moz-placeholder` → `font-size: 16px; font-weight: 400; line-height: 24px`
- `.input--md .input__field,.input--md .input__field::placeholder` → `font-size: 16px; font-weight: 400; line-height: 24px`
- `.input--md__feedback-icon span` → `font-size: 16px`
- `.input--md .input__prefix-icon,.input--md .input__suffix-icon` → `font-size: 20px`
- `.input--md .input__prefix-chevron,.input--md .input__suffix-chevron` → `font-size: 16px`
- `.date-picker-root__main__inputs dga-text-input .input` → `height: 40px; width: 100%`
- `.text-md-regular,.input__field,.input__field::placeholder,.input__prefix-label,.input__prefix-icon,.input__prefix-chevron,.input__suffix-label,.input__suffix-icon,.input__suffix-chevron,.input--lg .input__prefix-label,.i…` → `font: 400 16px/24px IBMPlexSansArabic`
- `.input--lg .input__field::-moz-placeholder,.input--md .input__field::-moz-placeholder` → `font: 400 14px/20px IBMPlexSansArabic`
- `.text-sm-regular,.dga-form-control>.dga-label,.input__prefix .dropdown__label--selection,.input__suffix .dropdown__label--selection,.input--lg .input__field,.input--lg .input__field::placeholder,.input--md .input__field,…` → `font: 400 14px/20px IBMPlexSansArabic`
- `.dga-shadow-md,.input.focus` → `box-shadow: var(--shadow-md)`
