# UI Shell - Table of Content (web)

Source: Figma web file `trJvYAeN2wdayn2VdSUR2N`, page "UI Shell - Table of Content". All values below are read from Figma component variants (LTR variants; RTL variants mirror them). Token names are Figma variable names (last segment); see `tokens.css`.

## Usage (plain language)

The TOC Item represents a navigational entry in a structured content list. It supports hierarchy, active states, and click interaction for seamless navigation.

## Component: TOC Item  (48 variants)

| Prop | Values / default |
|---|---|
| Text AR | T:قسم صفحة |
| Text EN | T:Page Section |
| RTL | True \| False |
| State | Default \| Hovered \| Pressed \| Focused |
| Selected | True \| False |
| Level | Level 1 (H2) \| Level 2 (H3) \| Level 3 (H4) |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| - | 200x32 H p0/8/0/16 g0 pad-x=spacing-xl r2=radius-xs |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| Default/True/Level 1 (H2) | fg:text-default ts:Text sm/Semibold |
| Hovered/True/Level 1 (H2) | fg:text-default ts:Text sm/Semibold |
| Pressed/True/Level 1 (H2) | fg:text-default ts:Text sm/Semibold |
| Focused/True/Level 1 (H2) | bd:border-black fg:text-default ts:Text sm/Semibold |
| Default/True/Level 2 (H3) | fg:text-default ts:Text sm/Semibold |
| Hovered/True/Level 2 (H3) | fg:text-default ts:Text sm/Semibold |
| Pressed/True/Level 2 (H3) | fg:text-default ts:Text sm/Semibold |
| Focused/True/Level 2 (H3) | bd:border-black fg:text-default ts:Text sm/Semibold |
| Default/True/Level 3 (H4) | fg:text-default ts:Text sm/Semibold |
| Hovered/True/Level 3 (H4) | fg:text-default ts:Text sm/Semibold |
| Pressed/True/Level 3 (H4) | fg:text-default ts:Text sm/Semibold |
| Focused/True/Level 3 (H4) | bd:border-black fg:text-default ts:Text sm/Semibold |
| Default/False/Level 1 (H2) | fg:text-primary-paragraph ts:Text sm/Regular |
| Hovered/False/Level 1 (H2) | bg:button-background-neutral-hovered fg:text-default ts:Text sm/Regular |
| Pressed/False/Level 1 (H2) | bg:button-background-neutral-pressed fg:text-default ts:Text sm/Regular |
| Focused/False/Level 1 (H2) | bd:border-black fg:text-primary-paragraph ts:Text sm/Regular |
| Default/False/Level 2 (H3) | fg:text-primary-paragraph ts:Text sm/Regular |
| Hovered/False/Level 2 (H3) | bg:button-background-neutral-hovered fg:text-default ts:Text sm/Regular |
| Pressed/False/Level 2 (H3) | bg:button-background-neutral-pressed fg:text-default ts:Text sm/Regular |
| Focused/False/Level 2 (H3) | bd:border-black fg:text-primary-paragraph ts:Text sm/Regular |
| Default/False/Level 3 (H4) | fg:text-primary-paragraph ts:Text sm/Regular |
| Hovered/False/Level 3 (H4) | bg:button-background-neutral-hovered fg:text-default ts:Text sm/Regular |
| Pressed/False/Level 3 (H4) | bg:button-background-neutral-pressed fg:text-default ts:Text sm/Regular |
| Focused/False/Level 3 (H4) | bd:border-black fg:text-primary-paragraph ts:Text sm/Regular |

## Component: TOC  (2 variants)

The Table of Contents is used to provide a navigable outline or summary of content, allowing users to quickly understand and jump to specific sections

| Prop | Values / default |
|---|---|
| RTL | False \| True |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| - | 222x706 V p0/0/0/0 g8 |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| - | fg:text-primary-paragraph ts:Text sm/Medium |

## CSS implementation notes (from design.dga.gov.sa CSS, phase 2)
Where these differ from Figma above, Figma is the source of truth.
CSS block(s): `.table-of-content` — extracted verbatim from https://design.dga.gov.sa/ compiled CSS (2026-11-04). Not cross-checked against Figma (community files not readable via connector). rem duplicates (62.5% root) omitted.

### Variants / modifiers (`--`)
—

### Elements / anatomy (`__`)
—

### Heights used
—

### Tokens referenced (count)
`--container-padding-desktop` (2), `--spacing-none` (2), `--spacing-md` (2)

### Rules (selector → declarations; covers sizes, states :hover/:focus/:active/:disabled, colors, spacing, radius)

- `.table-of-content` → `width: 228px; padding: var(--container-padding-desktop) var(--spacing-none); gap: var(--spacing-md)`
- `.table-of-content` → `width: 100%; padding: var(--container-padding-desktop) var(--spacing-none); gap: var(--spacing-md); height: 100vh`
