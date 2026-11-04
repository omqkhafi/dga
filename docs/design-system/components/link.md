# Link (web)

Source: Figma web file `trJvYAeN2wdayn2VdSUR2N`, page "Link". All values below are read from Figma component variants (LTR variants; RTL variants mirror them). Token names are Figma variable names (last segment); see `tokens.css`.

## Usage (plain language)

Links facilitate navigation by allowing users to click (or tap) and navigate users to another location, such as a different site, resource, or section within the same page.

## Component: Link  (144 variants)

| Prop | Values / default |
|---|---|
| Link Text EN | T:Link |
| Link Text AR | T:رابط |
| Icon | B:false |
| 🔁 Swap Icon | I:13758:242381 |
| RTL | False \| True |
| State | Default \| Hovered \| Pressed \| Focused \| Visited \| Disabled |
| Style | Primary \| Neutral \| On-color |
| Size | Medium \| Small |
| Inline | False \| True |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| Small | 26x20 H p0/0/0/0 g4 pad-y=spacing-none pad-x=spacing-none gap=link-sm-gap |
| Medium | 30x24 H p0/0/0/0 g8 pad-y=spacing-none pad-x=spacing-none gap=link-md-gap |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| Default/Primary/False | fg:link-primary ts:Text sm/Regular |
| Default/Neutral/False | fg:link-neutral ts:Text sm/Regular |
| Visited/Primary/False | fg:link-primary-visited ts:Text sm/Regular |
| Visited/Neutral/False | fg:link-primary-visited ts:Text sm/Regular |
| Disabled/Primary/False | fg:text-default-disabled ts:Text sm/Regular |
| Disabled/Neutral/False | fg:text-default-disabled ts:Text sm/Regular |
| Focused/Primary/False | bd:border-black fg:link-primary-focused ts:Text sm/Regular |
| Focused/Neutral/False | bd:border-black fg:link-neutral-focused ts:Text sm/Regular |
| Hovered/Primary/False | fg:link-primary-hovered ts:Text sm/Regular underlined |
| Hovered/Neutral/False | fg:link-neutral-hovered ts:Text sm/Regular underlined |
| Pressed/Primary/False | fg:link-primary-pressed ts:Text sm/Regular underlined |
| Pressed/Neutral/False | fg:link-neutral-pressed ts:Text sm/Regular underlined |
| Default/Primary/True | fg:link-primary ts:Text sm/Regular underlined |
| Default/Neutral/True | fg:link-neutral ts:Text sm/Regular underlined |
| Visited/Primary/True | fg:link-primary-visited ts:Text sm/Regular underlined |
| Visited/Neutral/True | fg:link-primary-visited ts:Text sm/Regular underlined |
| Disabled/Primary/True | fg:text-default-disabled ts:Text sm/Regular underlined |
| Disabled/Neutral/True | fg:text-default-disabled ts:Text sm/Regular underlined |
| Focused/Primary/True | bd:border-black fg:link-primary-focused ts:Text sm/Regular underlined |
| Focused/Neutral/True | bd:border-black fg:link-neutral-focused ts:Text sm/Regular underlined |
| Hovered/Primary/True | fg:link-primary-hovered ts:Text sm/Regular underlined |
| Hovered/Neutral/True | fg:link-neutral-hovered ts:Text sm/Regular underlined |
| Pressed/Primary/True | fg:link-primary-pressed ts:Text sm/Regular underlined |
| Pressed/Neutral/True | fg:link-neutral-pressed ts:Text sm/Regular underlined |
| Default/On-color/False | fg:link-oncolor ts:Text sm/Regular |
| Visited/On-color/False | fg:link-oncolor-visited ts:Text sm/Regular |
| Disabled/On-color/False | fg:link-oncolor-disabled ts:Text sm/Regular |
| Focused/On-color/False | bd:border-white fg:link-oncolor-focused ts:Text sm/Regular |
| Hovered/On-color/False | fg:link-oncolor-hovered ts:Text sm/Regular underlined |
| Pressed/On-color/False | fg:link-oncolor-pressed ts:Text sm/Regular underlined |
| Default/On-color/True | fg:link-oncolor ts:Text sm/Regular underlined |
| Visited/On-color/True | fg:link-oncolor-visited ts:Text sm/Regular underlined |
| Disabled/On-color/True | fg:link-oncolor-disabled ts:Text sm/Regular underlined |
| Focused/On-color/True | bd:border-white fg:link-oncolor-focused ts:Text sm/Regular underlined |
| Hovered/On-color/True | fg:link-oncolor-hovered ts:Text sm/Regular underlined |
| Pressed/On-color/True | fg:link-oncolor-pressed ts:Text sm/Regular underlined |

## CSS implementation notes (from design.dga.gov.sa CSS, phase 2)
Where these differ from Figma above, Figma is the source of truth.
CSS block(s): `.link` — extracted verbatim from https://design.dga.gov.sa/ compiled CSS (2026-11-04). Not cross-checked against Figma (community files not readable via connector). rem duplicates (62.5% root) omitted.

### Variants / modifiers (`--`)
brand, disabled, inline, md, neutral, on-color, sm

### Elements / anatomy (`__`)
icon, label

### Heights used
20px (1), 16px (1)

### Tokens referenced (count)
`--radius-xs` (5), `--colors-base-white` (3), `--spacing-none` (2), `--colors-brand-600` (2), `--colors-base-black` (2), `--colors-gray-neutral-950` (2), `--colors-alpha-white` (2), `--colors-brand-700` (1), `--colors-brand-800` (1), `--colors-gray-neutral-600` (1), `--colors-gray-neutral-800` (1), `--colors-purple-500` (1), `--colors-purple-300` (1), `--colors-gray-neutral-400` (1)

### Rules (selector → declarations; covers sizes, states :hover/:focus/:active/:disabled, colors, spacing, radius)

- `.link` → `padding: var(--spacing-none); gap: 8px; border-radius: var(--radius-xs); cursor: pointer`
- `.link--md .link__icon` → `width: 20px; height: 20px`
- `.link--sm .link__icon` → `width: 16px; height: 16px`
- `.text-md-regular,.accordion-item__body,.input__field,.input__field::placeholder,.input__prefix-label,.input__prefix-icon,.input__prefix-chevron,.input__suffix-label,.input__suffix-icon,.input__suffix-chevron,.input--lg .…` → `font: 400 16px/24px IBMPlexSansArabic`
- `.text-sm-regular,.checkbox__helper-text,.switch__helper-text,.radio__helper-text,.input__prefix .dropdown__label--selection,.input__suffix .dropdown__label--selection,.input--lg .input__field,.input--lg .input__field::pl…` → `font: 400 14px/20px IBMPlexSansArabic`
- `.link` → `padding: var(--spacing-none); gap: 8px; border-radius: var(--radius-xs)`
- `.link,.link--brand` → `color: var(--colors-brand-600)`
- `.link:hover,.link--brand:hover` → `color: var(--colors-brand-700)`
- `.link.active,.link--brand.active` → `color: var(--colors-brand-800)`
- `.link:focus,.link--brand:focus` → `color: var(--colors-brand-600); outline: 2px solid var(--colors-base-black); border-radius: var(--radius-xs)`
- `.link--neutral` → `color: var(--colors-gray-neutral-950)`
- `.link--neutral:hover` → `color: var(--colors-gray-neutral-600)`
- `.link--neutral.active` → `color: var(--colors-gray-neutral-800)`
- `.link--neutral:focus` → `color: var(--colors-gray-neutral-950); outline: 2px solid var(--colors-base-black); border-radius: var(--radius-xs)`
- `.link:visited` → `color: var(--colors-purple-500)!important`
- `.link--on-color` → `color: var(--colors-base-white)`
- `.link--on-color:hover` → `color: hsl(var(--colors-alpha-white)/80%)`
- `.link--on-color.active` → `color: hsl(var(--colors-alpha-white)/60%)`
- `.link--on-color:visited` → `color: var(--colors-purple-300)!important`
- `.link--on-color:focus` → `color: var(--colors-base-white); outline: 2px solid var(--colors-base-white); border-radius: var(--radius-xs)`
- `.link--disabled,.link--disabled:hover` → `color: var(--colors-gray-neutral-400)`
- `.link--md .link__icon` → `font-size: 20px!important`
- `.link--sm .link__icon` → `font-size: 16px!important`
- `.breadcrumb-item>.link--disabled` → `color: var(--text-default-disabled, #9da4ae)!important`
- `.\[\&_a\.link--neutral\:hover\]\:\!text-\[\#384250\] a.link--neutral:hover,.\[\&_a\.link--neutral\:visited\]\:\!text-\[\#384250\] a.link--neutral:visited,.\[\&_a\.link--neutral\]\:\!text-\[\#384250\] a.link--neutral` → `--tw-text-opacity: 1 !important; color: rgb(56 66 80 / var(--tw-text-opacity, 1))!important`
