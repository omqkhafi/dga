# Slideout Menu (web)

Source: Figma web file `trJvYAeN2wdayn2VdSUR2N`, page "Slideout Menu". All values below are read from Figma component variants (LTR variants; RTL variants mirror them). Token names are Figma variable names (last segment); see `tokens.css`.

## Usage (plain language)

_No description is given in Figma for this component; usage guidance not stated in source._

## Component: Slideout Menu  (8 variants)

| Prop | Values / default |
|---|---|
| Nav Header | B:true |
| Scroll Bar | B:true |
| Border | B:true |
| Swap Custom Content | I:30150:55097 |
| Show Divider | B:true |
| Show Actions | B:true |
| RTL | False \| True |
| Background Color | White \| Gray |
| Style | Default \| Custom Style |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| - | 346x912 V p0/0/0/0 g0 |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| Gray/Custom Style | bg:background-neutral-100 fg:text-default ic:icon-success ts:Text md/Semibold |
| White/Custom Style | bg:background-menu fg:text-default ic:icon-success ts:Text md/Semibold |
| Gray/Default | bg:background-neutral-100 fg:text-default ic:icon-success ts:Text md/Semibold |
| White/Default | bg:background-menu fg:text-default ic:icon-success ts:Text md/Semibold |

## Component: Slideout Menu Header  (2 variants)

| Prop | Values / default |
|---|---|
| Show Featured icon | B:true |
| Title Text | T:Title |
| Description Text | T:Description gose here. |
| Show Divider | B:false |
| Title AR | T:عنوان |
| Description AR | T:هنا يوضع الوصف. |
| Show Description | B:true |
| RTL | True \| False |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| - | 260x78 V p0/0/0/0 g0 pad-y=spacing-none pad-x=spacing-none |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| - | bg:background-neutral-50 fg:text-default ic:icon-success ts:Text md/Semibold |

## CSS implementation notes (from design.dga.gov.sa CSS, phase 2)
Where these differ from Figma above, Figma is the source of truth.
CSS block(s): `.sidepanel` — extracted verbatim from https://design.dga.gov.sa/ compiled CSS (2026-11-04). Not cross-checked against Figma (community files not readable via connector). rem duplicates (62.5% root) omitted.

### Variants / modifiers (`--`)
bg-brand, bg-gray, border, overlay, overlay-brand, overlay-gray

### Elements / anatomy (`__`)
menu-tab, menu-tab-label, submenu-tab, submenu-tab-label

### Heights used
100px (2)

### Tokens referenced (count)
`--colors-alpha-white` (7), `--spacing-xs` (5), `--colors-base-white` (4), `--colors-text-primary_on-brand` (3), `--colors-brand-800` (2), `--colors-text-secondary_on-brand` (2), `--shadow-lg` (1), `--radius-full` (1), `--colors-gray-neutral-300` (1), `--colors-gray-neutral-50` (1), `--colors-border-primary` (1)

### Rules (selector → declarations; covers sizes, states :hover/:focus/:active/:disabled, colors, spacing, radius)

- `.sidepanel` → `background-color: var(--colors-base-white); min-width: calc(264px + 2 * var(--spacing-xs) + 4px); width: -moz-fit-content; width: fit-content; min-height: calc(100vh - 72px); transition: all .4s ease-in-out`
- `.shadow-lg,.tooltip-main,.header__sub-menu,.sidepanel` → `box-shadow: var(--shadow-lg)`
- `.sidepanel` → `background-color: var(--colors-base-white); width: calc(264px + 2 * var(--spacing-xs) + 4px); min-height: calc(100vh - 72px); transition: all .4s ease-in-out`
- `.sidepanel::-webkit-scrollbar` → `height: 100px; width: calc(8px + 2 * var(--spacing-xs))`
- `.sidepanel::-webkit-scrollbar-track` → `background-color: transparent; padding: var(--spacing-xs)`
- `.sidepanel::-webkit-scrollbar-thumb` → `height: 100px; border-radius: var(--radius-full); border: var(--spacing-xs) solid transparent; background-color: var(--colors-gray-neutral-300); background-clip: content-box`
- `.sidepanel ul` → `padding: 0; margin: 0`
- `.sidepanel--bg-gray` → `background-color: var(--colors-gray-neutral-50)`
- `.sidepanel--bg-brand` → `background-color: var(--colors-brand-800)`
- `.sidepanel--bg-brand .sidepanel__menu-tab,.sidepanel--bg-brand .sidepanel__submenu-tab` → `color: var(--colors-text-secondary_on-brand)!important`
- `.sidepanel--bg-brand .sidepanel__menu-tab-label,.sidepanel--bg-brand .sidepanel__submenu-tab-label` → `color: var(--colors-text-secondary_on-brand)!important`
- `.sidepanel--bg-brand .sidepanel__menu-tab:hover,.sidepanel--bg-brand .sidepanel__submenu-tab:hover` → `background-color: hsla(var(--colors-alpha-white)/10%); color: var(--colors-text-primary_on-brand); border-color: transparent`
- `.sidepanel--bg-brand .sidepanel__menu-tab:hover:after,.sidepanel--bg-brand .sidepanel__submenu-tab:hover:after` → `background-color: hsla(var(--colors-alpha-white)/40%)`
- `.sidepanel--bg-brand .sidepanel__menu-tab:focus,.sidepanel--bg-brand .sidepanel__submenu-tab:focus` → `background-color: transparent; border-color: var(--colors-base-white)`
- `.sidepanel--bg-brand .sidepanel__menu-tab.selected,.sidepanel--bg-brand .sidepanel__menu-tab.active,.sidepanel--bg-brand .sidepanel__submenu-tab.selected,.sidepanel--bg-brand .sidepanel__submenu-tab.active` → `background-color: hsla(var(--colors-alpha-white)/20%); color: var(--colors-text-primary_on-brand)`
- `.sidepanel--bg-brand .sidepanel__menu-tab.selected:after,.sidepanel--bg-brand .sidepanel__menu-tab.active:after,.sidepanel--bg-brand .sidepanel__submenu-tab.selected:after,.sidepanel--bg-brand .sidepanel__submenu-tab.act…` → `background-color: var(--colors-base-white)`
- `.sidepanel--bg-brand .sidepanel__menu-tab.pressed,.sidepanel--bg-brand .sidepanel__submenu-tab.pressed` → `background-color: hsla(var(--colors-alpha-white)/30%); color: var(--colors-text-primary_on-brand); border-color: transparent`
- `.sidepanel--bg-brand .sidepanel__menu-tab.pressed:after,.sidepanel--bg-brand .sidepanel__submenu-tab.pressed:after` → `background-color: hsla(var(--colors-alpha-white)/60%)`
- `.sidepanel--border` → `border-right: 1px solid var(--colors-border-primary)`
- `.sidepanel--overlay` → `background: hsla(var(--colors-alpha-white)/80%); box-shadow: 4px 16px 24px #0000001a`
- `.sidepanel--overlay` → `box-shadow: none`
- `.sidepanel--overlay-gray` → `background: hsla(var(--colors-alpha-white)/80%); box-shadow: 4px 16px 24px #0000001a`
- `.sidepanel--overlay-brand` → `background: var(--colors-brand-800); box-shadow: 0 24px 48px -12px #1018282e`
- `.sidepanel` → `min-height: 100vh`
