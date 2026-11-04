# Dropdown Input (web)

Source: Figma web file `trJvYAeN2wdayn2VdSUR2N`, page "Dropdown Input". All values below are read from Figma component variants (LTR variants; RTL variants mirror them). Token names are Figma variable names (last segment); see `tokens.css`.

## Usage (plain language)

A list of options to choose from, displayed as an open state.

## Component: Dropdown List Item  (22 variants)

| Prop | Values / default |
|---|---|
| Selected | B:true |
| Text EN | T:Option |
| Divider | B:false |
| Text AR | T:إختيار |
| RTL | True \| False |
| State | Default \| Hovered \| Pressed \| Focused \| Disabled |
| Type | Single Select \| Multi Select \| Group label |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| Single Select | 320x37 H p8/8/8/8 g8 pad-y=spacing-md pad-x=spacing-md gap=spacing-md r4=radius-sm |
| Group label | 320x28 H p8/8/0/8 g8 pad-y=spacing-md pad-x=spacing-md gap=spacing-md |
| Multi Select | 320x37 H p8/8/8/8 g8 pad-y=spacing-md pad-x=spacing-md gap=spacing-md r4=radius-sm |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| Default/Single Select | fg:text-default ic:icon-default ts:Text sm/Regular |
| Default/Group label | fg:text-primary-paragraph ts:Text sm/Semibold |
| Default/Multi Select | fg:text-default ic:icon-oncolor ts:Text sm/Regular |
| Hovered/Single Select | bg:option-background-hover fg:text-default ic:icon-default ts:Text sm/Regular |
| Hovered/Multi Select | bg:option-background-hover fg:text-default ic:icon-oncolor ts:Text sm/Regular |
| Pressed/Single Select | bg:option-background-pressed fg:text-default ic:icon-default ts:Text sm/Regular |
| Pressed/Multi Select | bg:option-background-pressed fg:text-default ic:icon-oncolor ts:Text sm/Regular |
| Focused/Single Select | bd:border-black fg:text-default ic:icon-default ts:Text sm/Regular |
| Focused/Multi Select | bd:border-black fg:text-default ic:icon-oncolor ts:Text sm/Regular |
| Disabled/Single Select | fg:text-default-disabled ic:icon-default-disabled ts:Text sm/Regular |
| Disabled/Multi Select | fg:text-default-disabled ic:icon-oncolor ts:Text sm/Regular |

## Component: Dropdown Input  (288 variants)

Dropdowns present a list of options from which a user can select one option, or several.

| Prop | Values / default |
|---|---|
| Scroll Bar | B:false |
| Multi-section | B:false |
| Icon | B:false |
| Clear | B:false |
| Type Cursor | B:false |
| Show label | B:true |
| Leading icon | I:13682:115875 |
| Helper Text AR | T:نص مساعد |
| Show Helper text | B:false |
| 🔁 Swap Icon | I:31864:189865 |
| Helper Text Eng | T:Help Text |
| RTL | False \| True |
| Size | Large \| Medium |
| Filled | False \| True |
| State | Default \| Hovered \| Pressed \| Focused \| Read-only \| Disabled |
| Error | False \| True |
| Style | Default \| Filled lighter \| Filled darker |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| Large | 320x388 V p0/0/0/0 g8 gap=Iable-container |
| Medium | 320x380 V p0/0/0/0 g8 gap=Iable-container |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| False/Focused/False/Default | fg:field-text-label ic:icon-default ts:Text sm/Regular |
| False/Focused/False/Filled lighter | fg:field-text-label ic:icon-default ts:Text sm/Regular |
| False/Focused/False/Filled darker | fg:field-text-label ic:icon-default ts:Text sm/Regular |
| False/Focused/True/Default | fg:field-text-label ic:icon-default ts:Text sm/Regular |
| False/Focused/True/Filled lighter | fg:field-text-label ic:icon-default ts:Text sm/Regular |
| False/Focused/True/Filled darker | fg:field-text-label ic:icon-default ts:Text sm/Regular |
| False/Default/False/Default | fg:field-text-label ic:icon-default ts:Text sm/Regular |
| False/Default/False/Filled lighter | fg:field-text-label ic:icon-default ts:Text sm/Regular |
| False/Default/False/Filled darker | fg:field-text-label ic:icon-default ts:Text sm/Regular |
| False/Hovered/False/Default | fg:field-text-label ic:icon-default ts:Text sm/Regular |
| False/Hovered/False/Filled lighter | fg:field-text-label ic:icon-default ts:Text sm/Regular |
| False/Hovered/False/Filled darker | fg:field-text-label ic:icon-default ts:Text sm/Regular |
| False/Pressed/False/Default | fg:field-text-label ic:icon-default ts:Text sm/Regular |
| False/Pressed/False/Filled lighter | fg:field-text-label ic:icon-default ts:Text sm/Regular |
| False/Pressed/False/Filled darker | fg:field-text-label ic:icon-default ts:Text sm/Regular |
| False/Read-only/False/Default | fg:field-text-label ic:icon-default-400 ts:Text sm/Regular |
| False/Read-only/False/Filled lighter | fg:field-text-label ic:icon-default-400 ts:Text sm/Regular |
| False/Read-only/False/Filled darker | fg:field-text-label ic:icon-default-400 ts:Text sm/Regular |
| False/Disabled/False/Default | fg:input-text-disabled ic:icon-default-disabled ts:Text sm/Regular |
| False/Disabled/False/Filled lighter | fg:input-text-disabled ic:icon-default-disabled ts:Text sm/Regular |
| False/Disabled/False/Filled darker | fg:input-text-disabled ic:icon-default-disabled ts:Text sm/Regular |
| False/Default/True/Default | fg:field-text-label ic:icon-default ts:Text sm/Regular |
| False/Default/True/Filled lighter | fg:field-text-label ic:icon-default ts:Text sm/Regular |
| False/Default/True/Filled darker | fg:field-text-label ic:icon-default ts:Text sm/Regular |
| False/Hovered/True/Default | fg:field-text-label ic:icon-default ts:Text sm/Regular |
| False/Hovered/True/Filled lighter | fg:field-text-label ic:icon-default ts:Text sm/Regular |
| False/Hovered/True/Filled darker | fg:field-text-label ic:icon-default ts:Text sm/Regular |
| False/Pressed/True/Default | fg:field-text-label ic:icon-default ts:Text sm/Regular |
| False/Pressed/True/Filled lighter | fg:field-text-label ic:icon-default ts:Text sm/Regular |
| False/Pressed/True/Filled darker | fg:field-text-label ic:icon-default ts:Text sm/Regular |
| False/Read-only/True/Default | fg:field-text-label ic:icon-default-400 ts:Text sm/Regular |
| False/Read-only/True/Filled lighter | fg:field-text-label ic:icon-default-400 ts:Text sm/Regular |
| False/Read-only/True/Filled darker | fg:field-text-label ic:icon-default-400 ts:Text sm/Regular |
| False/Disabled/True/Default | fg:input-text-disabled ic:icon-default-disabled ts:Text sm/Regular |
| False/Disabled/True/Filled lighter | fg:input-text-disabled ic:icon-default-disabled ts:Text sm/Regular |
| False/Disabled/True/Filled darker | fg:input-text-disabled ic:icon-default-disabled ts:Text sm/Regular |
| True/Focused/False/Default | fg:field-text-label ic:icon-default ts:Text sm/Regular |
| True/Focused/False/Filled lighter | fg:field-text-label ic:icon-default ts:Text sm/Regular |
| True/Focused/False/Filled darker | fg:field-text-label ic:icon-default ts:Text sm/Regular |
| True/Focused/True/Default | fg:field-text-label ic:icon-default ts:Text sm/Regular |
| True/Focused/True/Filled lighter | fg:field-text-label ic:icon-default ts:Text sm/Regular |
| True/Focused/True/Filled darker | fg:field-text-label ic:icon-default ts:Text sm/Regular |
| True/Default/False/Default | fg:field-text-label ic:icon-default ts:Text sm/Regular |
| True/Default/False/Filled lighter | fg:field-text-label ic:icon-default ts:Text sm/Regular |
| True/Default/False/Filled darker | fg:field-text-label ic:icon-default ts:Text sm/Regular |
| True/Hovered/False/Default | fg:field-text-label ic:icon-default ts:Text sm/Regular |
| True/Hovered/False/Filled lighter | fg:field-text-label ic:icon-default ts:Text sm/Regular |
| True/Hovered/False/Filled darker | fg:field-text-label ic:icon-default ts:Text sm/Regular |
| True/Pressed/False/Default | fg:field-text-label ic:icon-default ts:Text sm/Regular |
| True/Pressed/False/Filled lighter | fg:field-text-label ic:icon-default ts:Text sm/Regular |
| True/Pressed/False/Filled darker | fg:field-text-label ic:icon-default ts:Text sm/Regular |
| True/Read-only/False/Default | fg:field-text-label ic:icon-default-400 ts:Text sm/Regular |
| True/Read-only/False/Filled lighter | fg:field-text-label ic:icon-default-400 ts:Text sm/Regular |
| True/Read-only/False/Filled darker | fg:field-text-label ic:icon-default-400 ts:Text sm/Regular |
| True/Disabled/False/Default | fg:input-text-disabled ic:icon-default-disabled ts:Text sm/Regular |
| True/Disabled/False/Filled lighter | fg:input-text-disabled ic:icon-default-disabled ts:Text sm/Regular |
| True/Disabled/False/Filled darker | fg:input-text-disabled ic:icon-default-disabled ts:Text sm/Regular |
| True/Default/True/Default | fg:field-text-label ic:icon-default ts:Text sm/Regular |
| True/Default/True/Filled lighter | fg:field-text-label ic:icon-default ts:Text sm/Regular |
| True/Default/True/Filled darker | fg:field-text-label ic:icon-default ts:Text sm/Regular |
| True/Hovered/True/Default | fg:field-text-label ic:icon-default ts:Text sm/Regular |
| True/Hovered/True/Filled lighter | fg:field-text-label ic:icon-default ts:Text sm/Regular |
| True/Hovered/True/Filled darker | fg:field-text-label ic:icon-default ts:Text sm/Regular |
| True/Pressed/True/Default | fg:field-text-label ic:icon-default ts:Text sm/Regular |
| True/Pressed/True/Filled lighter | fg:field-text-label ic:icon-default ts:Text sm/Regular |
| True/Pressed/True/Filled darker | fg:field-text-label ic:icon-default ts:Text sm/Regular |
| True/Read-only/True/Default | fg:field-text-label ic:icon-default-400 ts:Text sm/Regular |
| True/Read-only/True/Filled lighter | fg:field-text-label ic:icon-default-400 ts:Text sm/Regular |
| True/Read-only/True/Filled darker | fg:field-text-label ic:icon-default-400 ts:Text sm/Regular |
| True/Disabled/True/Default | fg:input-text-disabled ic:icon-default-disabled ts:Text sm/Regular |
| True/Disabled/True/Filled lighter | fg:input-text-disabled ic:icon-default-disabled ts:Text sm/Regular |
| True/Disabled/True/Filled darker | fg:input-text-disabled ic:icon-default-disabled ts:Text sm/Regular |

## CSS implementation notes (from design.dga.gov.sa CSS, phase 2)
Where these differ from Figma above, Figma is the source of truth.
CSS block(s): `.dropdown` — extracted verbatim from https://design.dga.gov.sa/ compiled CSS (2026-11-04). Not cross-checked against Figma (community files not readable via connector). rem duplicates (62.5% root) omitted.

### Variants / modifiers (`--`)
darker, disabled, error, lg, lighter, md, multi-select, readonly

### Elements / anatomy (`__`)
btn, chevron, feedback-icon, label, label-placeholder, list, option, option-icon, option-label

### Heights used
10px (1)

### Tokens referenced (count)
`--colors-gray-neutral-400` (6), `--colors-gray-neutral-300` (3), `--radius-sm` (2), `--colors-error-600` (2), `--colors-base-white` (2), `--colors-gray-neutral-100` (2), `--colors-text-primary` (1), `--colors-gray-neutral-50` (1)

### Rules (selector → declarations; covers sizes, states :hover/:focus/:active/:disabled, colors, spacing, radius)

- `.dropdown` → `width: 100%; min-width: 200px; border-radius: var(--radius-sm)`
- `.text-md-regular,.accordion-item__body,.input__field,.input__field::placeholder,.input__prefix-label,.input__prefix-icon,.input__prefix-chevron,.input__suffix-label,.input__suffix-icon,.input__suffix-chevron,.input--lg .…` → `font: 400 16px/24px IBMPlexSansArabic`
- `.text-sm-regular,.checkbox__helper-text,.switch__helper-text,.radio__helper-text,.input__prefix .dropdown__label--selection,.input__suffix .dropdown__label--selection,.input--lg .input__field,.input--lg .input__field::pl…` → `font: 400 14px/20px IBMPlexSansArabic`
- `.dropdown` → `min-width: 200px; border-radius: var(--radius-sm)`
- `.dropdown--readonly .dropdown__btn,.dropdown--disabled .dropdown__btn` → `border-color: var(--colors-gray-neutral-300)`
- `.dropdown--readonly .dropdown__btn:hover,.dropdown--disabled .dropdown__btn:hover` → `border-color: var(--colors-gray-neutral-300); box-shadow: none!important`
- `.dropdown--readonly .dropdown__btn,.dropdown--readonly .dropdown__label,.dropdown--readonly .dropdown__label-placeholder,.dropdown--disabled .dropdown__btn,.dropdown--disabled .dropdown__label,.dropdown--disabled .dropdo…` → `color: var(--colors-text-primary)`
- `.dropdown--readonly .dropdown__chevron,.dropdown--disabled .dropdown__chevron,.dropdown--disabled .dropdown__btn,.dropdown--disabled .dropdown__label,.dropdown--disabled .dropdown__label-placeholder` → `color: var(--colors-gray-neutral-300)`
- `.dropdown--multi-select` → `min-height: 40px; height: auto`
- `.dropdown--error .dropdown__btn` → `border-color: var(--colors-error-600)`
- `.dropdown--error .dropdown__btn:after` → `background-color: var(--colors-error-600)`
- `.dropdown--lighter .dropdown__btn` → `border: 0`
- `.dropdown--lighter .dropdown__btn:hover` → `border: 1px solid var(--colors-gray-neutral-400)`
- `.dropdown--lighter .dropdown__btn.open` → `border: 1px solid var(--colors-gray-neutral-400); background-color: var(--colors-base-white)`
- `.dropdown--lighter .dropdown__btn.active` → `border: 1px solid var(--colors-gray-neutral-400); background-color: var(--colors-gray-neutral-100)`
- `.dropdown--darker .dropdown__btn` → `border: 0; background-color: var(--colors-gray-neutral-50)`
- `.dropdown--darker .dropdown__btn:hover` → `border: 1px solid var(--colors-gray-neutral-400)`
- `.dropdown--darker .dropdown__btn.open` → `border: 1px solid var(--colors-gray-neutral-400); background-color: var(--colors-base-white)`
- `.dropdown--darker .dropdown__btn.active` → `border: 1px solid var(--colors-gray-neutral-400); background-color: var(--colors-gray-neutral-100)`
- `.dropdown--lg .dropdown__btn` → `height: auto; min-height: 40px`
- `.dropdown--lg .dropdown__feedback-icon span` → `font-size: 20px`
- `.dropdown--lg .dropdown__option-icon` → `font-size: 24px`
- `.dropdown--md .dropdown__btn` → `height: auto; min-height: 32px`
- `.dropdown--md .dropdown__feedback-icon span` → `font-size: 16px`
- `.dropdown--md .dropdown__option-icon` → `font-size: 20px`
- `.filter-container .dropdown` → `width: -moz-fit-content; width: fit-content; max-width: none; min-width: none`
- `.year-selector .dropdown-arrow` → `margin-left: 4px; width: 10px; height: 10px; transition: transform .2s ease`
- `[dir=rtl] .year-selector .dropdown-arrow` → `margin-left: 0; margin-right: 4px`
