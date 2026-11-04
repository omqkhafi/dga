# Tooltip (web)

Source: Figma web file `trJvYAeN2wdayn2VdSUR2N`, page "Tooltip". All values below are read from Figma component variants (LTR variants; RTL variants mirror them). Token names are Figma variable names (last segment); see `tokens.css`.

## Usage (plain language)

A tooltip is to provide additional information about a particular element when the user hovers their cursor over it. It typically appears as a small box or pop-up near the element and may contain text, images, or other media to provide context or guidance to the user. Tooltips are commonly used to e

## Component: Tooltip  (52 variants)

| Prop | Values / default |
|---|---|
| Title EN | T:Tooltip title |
| Content EN | T:Max width of tooltips is |
| Title | B:true |
| Icon | B:true |
| Title AR | T:عنوان التلميح |
| Content AR | T:أقصى عرض للتلميحات هو 24 |
| RTL | False \| True |
| Inverted | True \| False |
| Beak placement | None \| Top \| Bottom \| Left \| Right |
| Beak Alignment | Start \| Center \| End |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| - | 240x78 V p0/0/0/0 g8 gap=tooltip-gap |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| False/None/Start | fg:tooltip-text-heading-light ic:icon-oncolor ts:Text xs/Semibold fx:shadow-lg |
| True/None/Start | fg:tooltip-text-heading-dark ic:icon-oncolor ts:Text xs/Semibold fx:shadow-lg |
| False/Top/Start | fg:tooltip-text-heading-light ic:tooltip-background-light ts:Text xs/Semibold fx:shadow-lg |
| True/Top/Start | fg:tooltip-text-heading-dark ic:tooltip-background-dark ts:Text xs/Semibold fx:shadow-lg |
| False/Top/Center | fg:tooltip-text-heading-light ic:tooltip-background-light ts:Text xs/Semibold fx:shadow-lg |
| True/Top/Center | fg:tooltip-text-heading-dark ic:tooltip-background-dark ts:Text xs/Semibold fx:shadow-lg |
| False/Top/End | fg:tooltip-text-heading-light ic:tooltip-background-light ts:Text xs/Semibold fx:shadow-lg |
| True/Top/End | fg:tooltip-text-heading-dark ic:tooltip-background-dark ts:Text xs/Semibold fx:shadow-lg |
| False/Bottom/Start | fg:tooltip-text-heading-light ic:icon-oncolor ts:Text xs/Semibold fx:shadow-lg |
| True/Bottom/Start | fg:tooltip-text-heading-dark ic:icon-oncolor ts:Text xs/Semibold fx:shadow-lg |
| False/Bottom/Center | fg:tooltip-text-heading-light ic:icon-oncolor ts:Text xs/Semibold fx:shadow-lg |
| True/Bottom/Center | fg:tooltip-text-heading-dark ic:icon-oncolor ts:Text xs/Semibold fx:shadow-lg |
| False/Bottom/End | fg:tooltip-text-heading-light ic:icon-oncolor ts:Text xs/Semibold fx:shadow-lg |
| True/Bottom/End | fg:tooltip-text-heading-dark ic:icon-oncolor ts:Text xs/Semibold fx:shadow-lg |
| False/Left/Start | fg:tooltip-text-heading-light ic:tooltip-background-light ts:Text xs/Semibold fx:shadow-lg |
| True/Left/Start | fg:tooltip-text-heading-dark ic:tooltip-background-dark ts:Text xs/Semibold fx:shadow-lg |
| False/Left/Center | fg:tooltip-text-heading-light ic:tooltip-background-light ts:Text xs/Semibold fx:shadow-lg |
| True/Left/Center | fg:tooltip-text-heading-dark ic:tooltip-background-dark ts:Text xs/Semibold fx:shadow-lg |
| False/Left/End | fg:tooltip-text-heading-light ic:tooltip-background-light ts:Text xs/Semibold fx:shadow-lg |
| True/Left/End | fg:tooltip-text-heading-dark ic:tooltip-background-dark ts:Text xs/Semibold fx:shadow-lg |
| False/Right/Start | fg:tooltip-text-heading-light ic:icon-oncolor ts:Text xs/Semibold fx:shadow-lg |
| True/Right/Start | fg:tooltip-text-heading-dark ic:icon-oncolor ts:Text xs/Semibold fx:shadow-lg |
| False/Right/Center | fg:tooltip-text-heading-light ic:icon-oncolor ts:Text xs/Semibold fx:shadow-lg |
| True/Right/Center | fg:tooltip-text-heading-dark ic:icon-oncolor ts:Text xs/Semibold fx:shadow-lg |
| False/Right/End | fg:tooltip-text-heading-light ic:icon-oncolor ts:Text xs/Semibold fx:shadow-lg |
| True/Right/End | fg:tooltip-text-heading-dark ic:icon-oncolor ts:Text xs/Semibold fx:shadow-lg |

## Component: Help Icon  (48 variants)

| Prop | Values / default |
|---|---|
| RTL | False \| True |
| Open | False \| True |
| Placement | Top \| Bottom \| Left \| Right |
| Alignment | Start \| Center \| End |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| - | 20x20 V p0/0/0/0 g8 gap=tooltip-gap |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| False/Top/Start | ic:icon-oncolor |
| True/Top/Start | fg:tooltip-text-heading-light ic:icon-oncolor ts:Text xs/Semibold |
| False/Top/Center | ic:icon-oncolor |
| True/Top/Center | fg:tooltip-text-heading-light ic:icon-oncolor ts:Text xs/Semibold |
| False/Top/End | ic:icon-oncolor |
| True/Top/End | fg:tooltip-text-heading-light ic:icon-oncolor ts:Text xs/Semibold |
| False/Bottom/Start | ic:icon-oncolor |
| True/Bottom/Start | fg:tooltip-text-heading-light ic:icon-oncolor ts:Text xs/Semibold |
| False/Bottom/Center | ic:icon-oncolor |
| True/Bottom/Center | fg:tooltip-text-heading-light ic:icon-oncolor ts:Text xs/Semibold |
| False/Bottom/End | ic:icon-oncolor |
| True/Bottom/End | fg:tooltip-text-heading-light ic:icon-oncolor ts:Text xs/Semibold |
| False/Left/Start | ic:icon-oncolor |
| True/Left/Start | fg:tooltip-text-heading-light ic:icon-oncolor ts:Text xs/Semibold |
| False/Left/Center | ic:icon-oncolor |
| True/Left/Center | fg:tooltip-text-heading-light ic:icon-oncolor ts:Text xs/Semibold |
| False/Left/End | ic:icon-oncolor |
| True/Left/End | fg:tooltip-text-heading-light ic:icon-oncolor ts:Text xs/Semibold |
| False/Right/Start | ic:icon-oncolor |
| True/Right/Start | fg:tooltip-text-heading-light ic:icon-oncolor ts:Text xs/Semibold |
| False/Right/Center | ic:icon-oncolor |
| True/Right/Center | fg:tooltip-text-heading-light ic:icon-oncolor ts:Text xs/Semibold |
| False/Right/End | ic:icon-oncolor |
| True/Right/End | fg:tooltip-text-heading-light ic:icon-oncolor ts:Text xs/Semibold |

## CSS implementation notes (from design.dga.gov.sa CSS, phase 2)
Where these differ from Figma above, Figma is the source of truth.
CSS block(s): `.tooltip-main` — extracted verbatim from https://design.dga.gov.sa/ compiled CSS (2026-11-04). Not cross-checked against Figma (community files not readable via connector). rem duplicates (62.5% root) omitted.

### Variants / modifiers (`--`)
—

### Elements / anatomy (`__`)
—

### Heights used
—

### Tokens referenced (count)
`--colors-base-white` (2), `--radius-xs` (1), `--colors-gray-neutral-800` (1), `--shadow-lg` (1)

### Rules (selector → declarations; covers sizes, states :hover/:focus/:active/:disabled, colors, spacing, radius)

- `.tooltip-main` → `width: 240px; min-width: 160px; border-radius: var(--radius-xs); background: var(--colors-base-white)`
- `.tooltip-main .flex-column` → `gap: 4px`
- `.tooltip-main[data-direction=top]` → `margin-bottom: 14px`
- `.tooltip-main[data-direction=left]` → `margin-right: 14px`
- `.tooltip-main[data-direction=bottom]` → `margin-top: 14px`
- `.tooltip-main[data-direction=right]` → `margin-left: 14px`
- `.tooltip--light .tooltip-main` → `background: var(--colors-base-white)`
- `.tooltip[data-theme=dark] .tooltip-main` → `background: var(--colors-gray-neutral-800)`
- `.shadow-lg,.tooltip-main,.header__sub-menu,.sidepanel` → `box-shadow: var(--shadow-lg)`
