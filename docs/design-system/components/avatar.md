# Avatar (web)

Source: Figma web file `trJvYAeN2wdayn2VdSUR2N`, page "Avatar". All values below are read from Figma component variants (LTR variants; RTL variants mirror them). Token names are Figma variable names (last segment); see `tokens.css`.

## Usage (plain language)

The avatar is a visual representation of a user, commonly displayed in profiles, comments, or messaging apps, enhancing user engagement and recognition.

## Component: Avatar  (42 variants)

| Prop | Values / default |
|---|---|
| Border | B:false |
| Text EN | T:AB |
| 🔁 Swap Icon | I:13758:241877 |
| Type | Image \| Initials \| Icon |
| Square | False \| True |
| Size | 24px \| 32px \| 40px \| 48px \| 64px \| 80px \| 120px |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| Icon/32px | 32x32  |
| Initials/32px | 32x32  |
| Icon/40px | 40x40  |
| Initials/40px | 40x40  |
| Icon/48px | 48x48  |
| Initials/48px | 48x48  |
| Icon/64px | 64x64  |
| Initials/64px | 64x64  |
| Icon/80px | 80x80  |
| Initials/80px | 80x80  |
| Icon/120px | 120x120  |
| Initials/120px | 120x120  |
| Icon/24px | 24x24  |
| Initials/24px | 24x24  |
| Image/32px | 32x32  |
| Image/40px | 40x40  |
| Image/48px | 48x48  |
| Image/64px | 64x64  |
| Image/80px | 80x80  |
| Image/120px | 120x120  |
| Image/24px | 24x24  |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| Icon/False | ic:icon-default |
| Initials/False | fg:text-default ts:Text xs/Semibold |
| Icon/True | ic:icon-default |
| Initials/True | fg:text-default ts:Text xs/Semibold |
| Image/False |  |
| Image/True |  |

## Component: Avatar Group  (2 variants)

Avatar groups come in two forms: the stacked version, where avatars are positioned one on top of the other without gaps, and the unstacked version, where there is space between each avatar.

| Prop | Values / default |
|---|---|
| Stacked | True \| False |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| - | 172x32 H p0/0/0/0 g-4 |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| True | fg:text-default ts:Text xs/Semibold |
| False | fg:text-default ts:Text xs/Semibold |

## CSS implementation notes (from design.dga.gov.sa CSS, phase 2)
Where these differ from Figma above, Figma is the source of truth.
CSS block(s): `.avatar` — extracted verbatim from https://design.dga.gov.sa/ compiled CSS (2026-11-04). Not cross-checked against Figma (community files not readable via connector). rem duplicates (62.5% root) omitted.

### Variants / modifiers (`--`)
120, 24, 32, 40, 48, 68, 80, image, square

### Elements / anatomy (`__`)
icon, text

### Heights used
32px (3), 80px (2), 40px (2), 24px (2), 120px (1), 56px (1), 68px (1), 48px (1), 16px (1)

### Tokens referenced (count)
`--radius-full` (1), `--radius-8` (1)

### Rules (selector → declarations; covers sizes, states :hover/:focus/:active/:disabled, colors, spacing, radius)

- `.avatar` → `border-radius: var(--radius-full); border: 2px solid var(--colors-border-white, #FFF); background: var(--colors-button-background-neutral-default, #F3F4F6)`
- `.avatar--image img` → `width: 100%; height: 100%`
- `.avatar--square` → `border-radius: var(--radius-8)`
- `.avatar--120` → `width: 120px; height: 120px; border-width: 4px`
- `.avatar--120 .avatar__icon` → `width: 80px; height: 80px`
- `.avatar--120 .avatar__icon>*` → `width: 100%; height: 100%`
- `.avatar--80` → `width: 80px; height: 80px`
- `.avatar--80 .avatar__icon` → `width: 56px; height: 56px`
- `.avatar--80 .avatar__icon>*` → `width: 100%; height: 100%`
- `.avatar--68` → `width: 68px; height: 68px`
- `.avatar--68 .avatar__icon` → `width: 40px; height: 40px`
- `.avatar--68 .avatar__icon>*` → `width: 100%; height: 100%`
- `.avatar--48` → `width: 48px; height: 48px`
- `.avatar--48 .avatar__icon` → `width: 32px; height: 32px`
- `.avatar--48 .avatar__icon>*` → `width: 100%; height: 100%`
- `.avatar--40` → `width: 40px; height: 40px`
- `.avatar--40 .avatar__icon` → `width: 32px; height: 32px`
- `.avatar--40 .avatar__icon>*` → `width: 100%; height: 100%`
- `.avatar--32` → `width: 32px; height: 32px`
- `.avatar--32 .avatar__icon` → `width: 24px; height: 24px`
- `.avatar--32 .avatar__icon>*` → `width: 100%; height: 100%`
- `.avatar--24` → `width: 24px; height: 24px`
- `.avatar--24 .avatar__icon` → `width: 16px; height: 16px`
- `.avatar--24 .avatar__icon>*` → `width: 100%; height: 100%`
- `.display-md-regular,.avatar--120 .avatar__text` → `font: 400 36px/44px IBMPlexSansArabic`
- `.display-sm-regular,.avatar--80 .avatar__text` → `font: 400 30px/38px IBMPlexSansArabic`
- `.text-xl-medium,.avatar--68 .avatar__text` → `font: 500 20px/30px IBMPlexSansArabic`
- `.text-md-medium,.btn--lg,.tag,.tag--lg,.checkbox__label,.switch__label,.radio__label,.date-picker__navigator-label,.progress-indicator__step-content>.step-icon,.progress-indicator__step-content>.step-label .step-label--c…` → `font: 500 16px/24px IBMPlexSansArabic`
- `.text-sm-semibold,.dropdown__list-group-label,.avatar--40 .avatar__text,.sidepanel__menu-tab-label,.sidepanel__submenu-tab-label,.table-of-content__tab.selected .table-of-content__tab-label,.table-of-content__tab.active …` → `font: 600 14px/20px IBMPlexSansArabic`
- `.text-xs-semibold,.tooltip-main__content__title,.avatar--32 .avatar__text` → `font: 600 12px/18px IBMPlexSansArabic`
- `.text-2xs-bold,.avatar--24 .avatar__text` → `font: 700 10px/14px IBMPlexSansArabic`
