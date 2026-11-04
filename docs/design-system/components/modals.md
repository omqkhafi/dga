# Modals (web)

Source: Figma web file `trJvYAeN2wdayn2VdSUR2N`, page "Modals". All values below are read from Figma component variants (LTR variants; RTL variants mirror them). Token names are Figma variable names (last segment); see `tokens.css`.

## Usage (plain language)

Modal is a popup window that appears on top of the main screen to grab user attention for immediate actions or input. It often contains focused content like forms or alerts and blocks interaction with the background until dismissed. Modals are useful for tasks needing user confirmation, feedback, or

Internal sub-parts (not used directly): `_Modal Header`, `_Modal Actions`, `_Modal Body`, `_Swap Placeholder`

## Component: Modal  (4 variants)

| Prop | Values / default |
|---|---|
| RTL | False \| True |
| Mobile | False \| True |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| - | 600x208 V p24/24/24/24 g8 pad-y=modal-padding pad-x=modal-padding gap=modal-gap r8=radius-md |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| False | bg:background-white fg:text-display ic:icon-default ts:Text lg/Semibold fx:shadow-3xl |
| True | bg:background-white fg:text-display ic:icon-default ts:Text lg/Semibold fx:shadow-3xl |

## CSS implementation notes (from design.dga.gov.sa CSS, phase 2)
Where these differ from Figma above, Figma is the source of truth.
CSS block(s): `.modal` — extracted verbatim from https://design.dga.gov.sa/ compiled CSS (2026-11-04). Not cross-checked against Figma (community files not readable via connector). rem duplicates (62.5% root) omitted.

### Variants / modifiers (`--`)
—

### Elements / anatomy (`__`)
—

### Heights used
—

### Tokens referenced (count)
`--spacing-md` (2), `--spacing-3xl` (2), `--colors-base-white` (2), `--radius-md` (2), `--shadow-3xl` (2)

### Rules (selector → declarations; covers sizes, states :hover/:focus/:active/:disabled, colors, spacing, radius)

- `dialog .modal` → `gap: var(--spacing-md); width: 600px; padding: var(--spacing-3xl); background-color: var(--colors-base-white); border-radius: var(--radius-md)`
- `dialog .modal` → `width: 100%`
- `.shadow-3xl,.notification-toast,dialog .modal` → `box-shadow: var(--shadow-3xl)`
- `.modal` → `gap: var(--spacing-md); width: 600px; padding: var(--spacing-3xl); background-color: var(--colors-base-white); border-radius: var(--radius-md)`
- `.modal` → `width: 100%`
- `.shadow-3xl,.notification-toast,.modal` → `box-shadow: var(--shadow-3xl)`
