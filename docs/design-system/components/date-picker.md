# Date Picker (web)

Source: Figma web file `trJvYAeN2wdayn2VdSUR2N`, page "Date Picker". All values below are read from Figma component variants (LTR variants; RTL variants mirror them). Token names are Figma variable names (last segment); see `tokens.css`.

## Usage (plain language)

Depending on the state, the circular indicator highlights the date cell.

Internal sub-parts (not used directly): `_Date field`, `_Year Dropdown`

## Component: Date cell  (41 variants)

| Prop | Values / default |
|---|---|
| Range-left | B:false |
| Range-right | B:false |
| Extra-left | B:false |
| Extra-right | B:false |
| Mid-Range | B:false |
| Date | T:21 |
| Secondary Date | T:1/9 |
| 2ndry Date | B:false |
| Selected | False \| True |
| Today | False \| True |
| Nex/Prev | False \| True |
| State | Default \| Hovered \| Pressed \| Focused \| Disabled |
| Null | False \| True |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| - | 56x56 H p0/0/0/0 g0 |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| False/False/False/Default/False | fg:text-default ts:Text md/Regular |
| False/True/False/Default/False | fg:button-background-primary-default ts:Text md/Bold |
| True/False/False/Default/False | fg:text-oncolor-primary ts:Text md/Regular |
| True/True/False/Default/False | fg:text-oncolor-primary ts:Text md/Bold |
| False/False/False/Hovered/False | fg:text-default ts:Text md/Regular |
| False/True/False/Hovered/False | fg:datecell-background-600 ts:Text md/Bold |
| True/False/False/Hovered/False | fg:text-oncolor-primary ts:Text md/Regular |
| True/True/False/Hovered/False | fg:text-oncolor-primary ts:Text md/Bold |
| False/False/False/Pressed/False | fg:text-default ts:Text md/Regular |
| False/True/False/Pressed/False | fg:datecell-background-600 ts:Text md/Bold |
| True/False/False/Pressed/False | fg:text-oncolor-primary ts:Text md/Regular |
| True/True/False/Pressed/False | fg:text-oncolor-primary ts:Text md/Bold |
| False/False/False/Focused/False | fg:text-default ts:Text md/Regular |
| False/True/False/Focused/False | fg:datecell-background-600 ts:Text md/Bold |
| True/False/False/Focused/False | fg:text-oncolor-primary ts:Text md/Regular |
| True/True/False/Focused/False | fg:text-oncolor-primary ts:Text md/Bold |
| False/False/False/Disabled/False | fg:text-default-disabled ts:Text md/Regular |
| False/True/False/Disabled/False | fg:text-default-disabled ts:Text md/Bold |
| True/False/False/Disabled/False | fg:text-oncolor-primary ts:Text md/Regular |
| True/True/False/Disabled/False | fg:text-oncolor-primary ts:Text md/Bold |
| False/False/True/Default/False | fg:text-secondary-paragraph ts:Text md/Regular |
| False/True/True/Default/False | fg:datecell-background-600 ts:Text md/Bold |
| True/False/True/Default/False | fg:text-primary-sa-flag ts:Text md/Regular |
| True/True/True/Default/False | fg:text-primary-sa-flag ts:Text md/Bold |
| False/False/True/Hovered/False | fg:text-secondary-paragraph ts:Text md/Regular |
| False/True/True/Hovered/False | fg:datecell-background-600 ts:Text md/Bold |
| True/False/True/Hovered/False | fg:text-primary-sa-flag ts:Text md/Regular |
| True/True/True/Hovered/False | fg:text-primary-sa-flag ts:Text md/Bold |
| False/False/True/Pressed/False | fg:text-secondary-paragraph ts:Text md/Regular |
| False/True/True/Pressed/False | fg:datecell-background-600 ts:Text md/Bold |
| True/False/True/Pressed/False | fg:text-primary-sa-flag ts:Text md/Regular |
| True/True/True/Pressed/False | fg:text-primary-sa-flag ts:Text md/Bold |
| False/False/True/Focused/False | fg:text-secondary-paragraph ts:Text md/Regular |
| False/True/True/Focused/False | fg:datecell-background-600 ts:Text md/Bold |
| True/False/True/Focused/False | fg:text-primary-sa-flag ts:Text md/Regular |
| True/True/True/Focused/False | fg:text-primary-sa-flag ts:Text md/Bold |
| False/False/True/Disabled/False | fg:text-default-disabled ts:Text md/Regular |
| False/True/True/Disabled/False | fg:text-default-disabled ts:Text md/Bold |
| True/False/True/Disabled/False | fg:text-oncolor-primary ts:Text md/Regular |
| True/True/True/Disabled/False | fg:text-oncolor-primary ts:Text md/Bold |
| False/False/False/Default/True |  |

## Component: Date Picker  (6 variants)

A Date Picker is a UI component that enables users to select dates via a pop-up or dropdown calendar. This tool is often triggered by clicking a calendar icon or input field. It is widely used in forms and applications for tasks like scheduling events, booking appointments, or entering birthdates.

| Prop | Values / default |
|---|---|
| Quick options | B:false |
| Submit button | B:false |
| Dual-month view | B:false |
| Input field | B:false |
| Show hint | B:true |
| RTL | False \| True |
| Range | True \| False |
| Picker | True \| False |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| - | 424x456 V p0/0/0/0 g0 r8=radius-md |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| False/True | bg:field-background-default fg:text-quarterary ic:icon-default ts:Text xs/Bold fx:shadow-2xl |
| True/True | bg:field-background-default fg:text-quarterary ic:icon-default ts:Text xs/Bold fx:shadow-2xl |
| False/False | fg:field-text-label ts:Text sm/Regular |

## CSS implementation notes (from design.dga.gov.sa CSS, phase 2)
Where these differ from Figma above, Figma is the source of truth.
CSS block(s): `.date-cell`, `.date-picker`, `.date-picker-root` — extracted verbatim from https://design.dga.gov.sa/ compiled CSS (2026-11-04). Not cross-checked against Figma (community files not readable via connector). rem duplicates (62.5% root) omitted.

### Variants / modifiers (`--`)
disabled, mid-range, mid-range--first-child, mid-range--last-child, selected, today

### Elements / anatomy (`__`)
label, main__buttons, main__content-wrapper, main__inputs, quick-options

### Heights used
48px (4), 40px (1), 56px (1)

### Tokens referenced (count)
`--colors-brand-100` (4), `--form-datecell-background-100` (4), `--colors-base-white` (3), `--colors-brand-600` (3), `--shadow-2xl` (3), `--text-success` (3), `--radius-full` (2), `--colors-gray-neutral-200` (1), `--colors-gray-neutral-300` (1), `--form-datecell-today-background-hovered` (1), `--form-datecell-today-background-pressed` (1), `--form-datecell-background-hovered` (1), `--form-datecell-background-pressed` (1), `--colors-brand-200` (1)

### Rules (selector → declarations; covers sizes, states :hover/:focus/:active/:disabled, colors, spacing, radius)

- `.date-picker-root__main__inputs` → `width: 100%; gap: 32px`
- `.date-picker-root__main__inputs .input` → `width: 50px; max-width: unset; min-width: unset`
- `[data-dual-view=true] .date-picker-root__main__inputs .input` → `width: 200px`
- `.date-cell:hover .date-cell__label span` → `background: var(--colors-gray-neutral-200)`
- `.date-cell:active .date-cell__label span,.date-cell.pressed .date-cell__label span` → `background: var(--colors-gray-neutral-300)`
- `.date-cell--selected .date-cell__label span` → `color: var(--colors-base-white)!important; border-radius: var(--radius-full); background-color: var(--colors-brand-600)`
- `.date-cell--today .date-cell__label span` → `border: 2px solid var(--colors-brand-600); color: var(--colors-brand-600)`
- `.date-cell--today:hover .date-cell__label span` → `background: var(--colors-brand-100)`
- `.date-cell--mid-range .date-cell__label` → `background-color: var(--colors-brand-100)`
- `.date-cell--mid-range--first-child .date-cell__label:before` → `width: 52px; height: 48px; border-radius: 50% 0 0 50%; background-color: var(--colors-brand-100)`
- `.date-cell--mid-range--last-child .date-cell__label:before` → `width: 52px; height: 48px; border-radius: 0 50% 50% 0; background-color: var(--colors-brand-100)`
- `.text-md-bold,.notification__lead-text,.date-cell--today .date-cell__label span` → `font: 700 16px/24px IBMPlexSansArabic`
- `.shadow-2xl,.date-picker-root,.menu` → `box-shadow: var(--shadow-2xl)`
- `.dga-shadow-2xl,.menu,.date-picker-root` → `box-shadow: var(--shadow-2xl)`
- `.date-picker-root` → `border-radius: var(--radius-8, 8px); background: var(--colors-base-white); width: -moz-fit-content; width: fit-content; gap: 15px; padding: 16px`
- `.date-picker-root__quick-options .options-list` → `gap: 10px; margin-top: 20px; min-width: 120px`
- `.date-picker-root__quick-options .options-list button` → `background: none; outline: none; border: 0; cursor: pointer`
- `.date-picker-root__main__inputs` → `width: 100%; max-width: 392px; gap: 32px`
- `.date-picker-root__main__inputs dga-text-input` → `height: -moz-fit-content; height: fit-content; max-width: unset; min-width: unset`
- `.date-picker-root__main__inputs dga-text-input .input` → `height: 40px; width: 100%`
- `.date-picker-root__main__buttons` → `margin-top: 16px; border-top: 1px solid gray; padding-top: 16px`
- `.date-picker-root__main__content-wrapper` → `gap: 32px`
- `.date-picker` → `max-width: 392px`
- `.date-picker>month-navigator` → `width: 100%`
- `.date-cell` → `width: 56px; height: 56px; cursor: pointer; border: 0; background-color: transparent`
- `.date-cell:hover .date-cell__label span` → `background: var(--form-datecell-today-background-hovered)`
- `.date-cell:active .date-cell__label span,.date-cell.pressed .date-cell__label span` → `background: var(--form-datecell-today-background-pressed)`
- `.date-cell--selected .date-cell__label span` → `color: var(--colors-base-white)!important; border-radius: var(--radius-full); background-color: var(--text-success)`
- `.date-cell--selected:hover .date-cell__label span` → `background: var(--form-datecell-background-hovered)`
- `.date-cell--selected:active .date-cell__label span,.date-cell--selected.pressed .date-cell__label span` → `background: var(--form-datecell-background-pressed)`
- `.date-cell--today .date-cell__label span` → `border: 2px solid var(--text-success); color: var(--text-success)`
- `.date-cell--today:hover .date-cell__label span` → `background: var(--form-datecell-background-100)`
- `.date-cell--today:active .date-cell__label span,.date-cell--today.pressed .date-cell__label span` → `background: var(--colors-brand-200)`
- `.date-cell--disabled` → `opacity: .5`
- `.date-cell[disabled]` → `opacity: .3`
- `.date-cell--mid-range .date-cell__label` → `background-color: var(--form-datecell-background-100)`
- `.date-cell--mid-range--first-child .date-cell__label:before` → `width: 52px; height: 48px; border-radius: 50% 0 0 50%; background-color: var(--form-datecell-background-100)`
- `[dir=rtl] .date-cell--mid-range--first-child .date-cell__label:before` → `border-radius: 0 50% 50% 0`
- `.date-cell--mid-range--last-child .date-cell__label:before` → `width: 52px; height: 48px; border-radius: 0 50% 50% 0; background-color: var(--form-datecell-background-100)`
- `[dir=rtl] .date-cell--mid-range--last-child .date-cell__label:before` → `border-radius: 50% 0 0 50%`
- `.text-md-bold,.date-cell--today .date-cell__label span` → `font: 700 16px/24px IBMPlexSansArabic`
- `.dga-shadow-2xl,.date-picker-root,.menu` → `box-shadow: var(--shadow-2xl)`
