# Card (web)

Source: Figma web file `trJvYAeN2wdayn2VdSUR2N`, page "Card". All values below are read from Figma component variants (LTR variants; RTL variants mirror them). Token names are Figma variable names (last segment); see `tokens.css`.

## Usage (plain language)

A card serves as a container for information and actions related to a specific concept or object. It typically resembles a rectangular box that combines images, text, and potentially some interactive elements.
Cards enhance the visibility of information and facilitate predictable patterns.

## Component: Card  (102 variants)

| Prop | Values / default |
|---|---|
| Secondary Action | B:true |
| Show Tags | B:false |
| Show Rating | B:false |
| Description AR | T:نص إضافي لمحتوى البطاقة |
| Title AR | T:عنوان البطاقة |
| Featured icon | B:true |
| Show Title | B:true |
| Title EN | T:Card Title |
| Primary Action | B:true |
| Show Description  | B:true |
| 🔁 Swap Icon | I:31864:190028 |
| Image | B:false |
| Custom Component | B:false |
| Description EN | T:Card content placeholder |
| 🔁 Content Swap | I:30150:55097 |
| RTL | no \| yes |
| Type | Default \| Expandable \| Selectable |
| State | Default \| Hover \| Focused \| Disabled |
| Effect | With Sahdow \| No Shadow \| Stroke |
| Expanded | False \| True |
| Selected | False \| True |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| Default | 360x228 V p16/16/16/16 g24 pad-y=spacing-xl pad-x=spacing-xl gap=card-lg-gap r16=radius-lg |
| Expandable | 360x228 V p16/16/16/16 g24 pad-y=spacing-xl pad-x=spacing-xl gap=card-lg-gap r16=radius-lg |
| Selectable | 360x164 V p16/16/16/16 g24 pad-y=spacing-xl pad-x=spacing-xl gap=card-lg-gap r16=radius-lg |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| Default/Default/With Sahdow/False/False | bg:background-card fg:text-display ic:icon-success ts:Text lg/Bold fx:shadow-md |
| Default/Default/No Shadow/False/False | bg:background-card fg:text-display ic:icon-success ts:Text lg/Bold |
| Default/Default/Stroke/False/False | bg:background-card bd:border-neutral-primary fg:text-display ic:icon-success ts:Text lg/Bold |
| Expandable/Default/With Sahdow/False/False | bg:background-card fg:text-display ic:icon-success ts:Text lg/Bold fx:shadow-md |
| Expandable/Default/No Shadow/False/False | bg:background-card fg:text-display ic:icon-success ts:Text lg/Bold |
| Expandable/Default/Stroke/False/False | bg:background-card bd:border-neutral-primary fg:text-display ic:icon-success ts:Text lg/Bold |
| Expandable/Default/With Sahdow/True/False | bg:background-card fg:text-display ic:icon-success ts:Text lg/Bold fx:shadow-md |
| Expandable/Default/No Shadow/True/False | bg:background-card fg:text-display ic:icon-success ts:Text lg/Bold |
| Expandable/Default/Stroke/True/False | bg:background-card bd:border-neutral-primary fg:text-display ic:icon-success ts:Text lg/Bold |
| Expandable/Focused/With Sahdow/False/False | bg:background-card bd:border-black fg:text-display ic:icon-success ts:Text lg/Bold fx:shadow-md |
| Expandable/Focused/No Shadow/False/False | bg:background-card bd:border-black fg:text-display ic:icon-success ts:Text lg/Bold |
| Expandable/Focused/Stroke/False/False | bg:background-card bd:border-black fg:text-display ic:icon-success ts:Text lg/Bold |
| Expandable/Focused/With Sahdow/True/False | bg:background-card bd:border-black fg:text-display ic:icon-success ts:Text lg/Bold fx:shadow-md |
| Expandable/Focused/No Shadow/True/False | bg:background-card bd:border-black fg:text-display ic:icon-success ts:Text lg/Bold |
| Expandable/Focused/Stroke/True/False | bg:background-card bd:border-black fg:text-display ic:icon-success ts:Text lg/Bold |
| Expandable/Disabled/With Sahdow/False/False | bg:background-disabled fg:text-default-disabled ic:icon-default-400 ts:Text lg/Bold |
| Expandable/Disabled/No Shadow/False/False | bg:background-disabled fg:text-default-disabled ic:icon-default-400 ts:Text lg/Bold |
| Expandable/Disabled/Stroke/False/False | bg:background-disabled bd:border-disabled fg:text-default-disabled ic:icon-default-400 ts:Text lg/Bold |
| Expandable/Disabled/With Sahdow/True/False | bg:background-disabled fg:text-default-disabled ic:icon-default-400 ts:Text lg/Bold |
| Expandable/Disabled/No Shadow/True/False | bg:background-disabled fg:text-default-disabled ic:icon-default-400 ts:Text lg/Bold |
| Expandable/Disabled/Stroke/True/False | bg:background-disabled bd:border-disabled fg:text-default-disabled ic:icon-default-400 ts:Text lg/Bold |
| Expandable/Hover/With Sahdow/False/False | bg:background-neutral-50 fg:text-display ic:icon-success ts:Text lg/Bold fx:shadow-md |
| Expandable/Hover/No Shadow/False/False | bg:background-neutral-50 fg:text-display ic:icon-success ts:Text lg/Bold |
| Expandable/Hover/Stroke/False/False | bg:background-neutral-50 bd:border-neutral-primary fg:text-display ic:icon-success ts:Text lg/Bold |
| Expandable/Hover/With Sahdow/True/False | bg:background-neutral-50 fg:text-display ic:icon-success ts:Text lg/Bold fx:shadow-md |
| Expandable/Hover/No Shadow/True/False | bg:background-neutral-50 fg:text-display ic:icon-success ts:Text lg/Bold |
| Expandable/Hover/Stroke/True/False | bg:background-neutral-50 bd:border-neutral-primary fg:text-display ic:icon-success ts:Text lg/Bold |
| Selectable/Default/With Sahdow/False/False | bg:background-card fg:text-display ic:icon-success ts:Text lg/Bold fx:shadow-md |
| Selectable/Default/No Shadow/False/False | bg:background-card fg:text-display ic:icon-success ts:Text lg/Bold |
| Selectable/Default/Stroke/False/False | bg:background-card bd:border-neutral-primary fg:text-display ic:icon-success ts:Text lg/Bold |
| Selectable/Default/With Sahdow/False/True | bg:background-card fg:text-display ic:icon-success ts:Text lg/Bold fx:shadow-md |
| Selectable/Default/No Shadow/False/True | bg:background-card fg:text-display ic:icon-success ts:Text lg/Bold |
| Selectable/Default/Stroke/False/True | bg:background-card bd:border-neutral-primary fg:text-display ic:icon-success ts:Text lg/Bold |
| Selectable/Hover/With Sahdow/False/False | bg:background-neutral-50 fg:text-display ic:icon-success ts:Text lg/Bold fx:shadow-md |
| Selectable/Hover/No Shadow/False/False | bg:background-neutral-50 fg:text-display ic:icon-success ts:Text lg/Bold |
| Selectable/Hover/Stroke/False/False | bg:background-neutral-50 bd:border-neutral-primary fg:text-display ic:icon-success ts:Text lg/Bold |
| Selectable/Hover/With Sahdow/False/True | bg:background-neutral-50 fg:text-display ic:icon-success ts:Text lg/Bold fx:shadow-md |
| Selectable/Hover/No Shadow/False/True | bg:background-neutral-50 fg:text-display ic:icon-success ts:Text lg/Bold |
| Selectable/Hover/Stroke/False/True | bg:background-neutral-50 bd:border-neutral-primary fg:text-display ic:icon-success ts:Text lg/Bold |
| Selectable/Focused/With Sahdow/False/False | bg:background-neutral-50 bd:border-black fg:text-display ic:icon-success ts:Text lg/Bold fx:shadow-md |
| Selectable/Focused/No Shadow/False/False | bg:background-neutral-50 bd:border-black fg:text-display ic:icon-success ts:Text lg/Bold |
| Selectable/Focused/Stroke/False/False | bg:background-neutral-50 bd:border-black fg:text-display ic:icon-success ts:Text lg/Bold |
| Selectable/Focused/With Sahdow/False/True | bg:background-neutral-50 bd:border-black fg:text-display ic:icon-success ts:Text lg/Bold fx:shadow-md |
| Selectable/Focused/No Shadow/False/True | bg:background-neutral-50 bd:border-black fg:text-display ic:icon-success ts:Text lg/Bold |
| Selectable/Focused/Stroke/False/True | bg:background-neutral-50 bd:border-black fg:text-display ic:icon-success ts:Text lg/Bold |
| Selectable/Disabled/With Sahdow/False/False | bg:background-disabled fg:text-default-disabled ic:icon-default-400 ts:Text lg/Bold |
| Selectable/Disabled/No Shadow/False/False | bg:background-disabled fg:text-default-disabled ic:icon-default-400 ts:Text lg/Bold |
| Selectable/Disabled/Stroke/False/False | bg:background-disabled bd:border-disabled fg:text-default-disabled ic:icon-default-400 ts:Text lg/Bold |
| Selectable/Disabled/With Sahdow/False/True | bg:background-disabled fg:text-default-disabled ic:icon-default-400 ts:Text lg/Bold |
| Selectable/Disabled/No Shadow/False/True | bg:background-disabled fg:text-default-disabled ic:icon-default-400 ts:Text lg/Bold |
| Selectable/Disabled/Stroke/False/True | bg:background-disabled bd:border-disabled fg:text-default-disabled ic:icon-default-400 ts:Text lg/Bold |

## CSS implementation notes (from design.dga.gov.sa CSS, phase 2)
Where these differ from Figma above, Figma is the source of truth.
CSS block(s): `.card` — extracted verbatim from https://design.dga.gov.sa/ compiled CSS (2026-11-04). Not cross-checked against Figma (community files not readable via connector). rem duplicates (62.5% root) omitted.

### Variants / modifiers (`--`)
—

### Elements / anatomy (`__`)
—

### Heights used
48px (1)

### Tokens referenced (count)
`--colors-gray-neutral-300` (1), `--colors-gray-neutral-100` (1), `--shadow-md` (1)

### Rules (selector → declarations; covers sizes, states :hover/:focus/:active/:disabled, colors, spacing, radius)

- `.card` → `max-width: 350px; padding: var(--spacing-xl, 16px); gap: var(--spacing-3xl, 24px); border-radius: var(--radius-lg, 16px); background: var(--Colors-Base-white, #fff); border: 2px solid var(--Colors-Base-black, #fff); cursor: pointer`
- `.card>.badge--icon.badge--lg` → `width: 48px; height: 48px`
- `.card.disabled` → `color: var(--colors-gray-neutral-300); background-color: transparent; border-color: transparent`
- `.card.disabled:after` → `width: 100%; height: 100%; background-color: var(--colors-gray-neutral-100); opacity: .3`
- `.card.focused` → `border-radius: var(--radius-lg, 16px); border: 2px solid var(--Colors-Base-black, #000)`
- `.shadow-md,.input.focus,.dropdown__btn.open,.textarea.focus,.card,.card.focused` → `box-shadow: var(--shadow-md)`
- `.custom_Creation_card .card,.custom_feedBack_card .card` → `width: 100%; max-width: 100%`
