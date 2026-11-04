# Progress indicator (web)

Source: Figma web file `trJvYAeN2wdayn2VdSUR2N`, page "Progress indicator". All values below are read from Figma component variants (LTR variants; RTL variants mirror them). Token names are Figma variable names (last segment); see `tokens.css`.

## Usage (plain language)

The Steps UI element facilitates step-by-step navigation through a process or sequence, commonly used in forms or multi-step processes to guide users systematically. It provides clear visual cues, indicating the current step, to help users understand their progress and the steps they've completed.

Internal sub-parts (not used directly): `_StepperBase`

## Component: Progress Indicator  (40 variants)

| Prop | Values / default |
|---|---|
| Next Step | B:true |
| Show Step Name | B:true |
| Show Description | B:true |
| Step Name AR | T:الخطوة الأولى |
| Step Name EN | T:Step One |
| Step Description Eng | T:this is step description |
| Step description AR | T:وصف الخطوة |
| RTL | no \| yes |
| Alignment | Horizontal \| Vertical |
| State | Current \| Completed \| Upcomming |
| Hover | no \| yes |
| Focused | no \| yes |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| - | 158x88 V p0/0/0/0 g8 gap=progress-indicator-gap |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| Horizontal/Completed/no/no | fg:stepper-text-primary ic:icon-default ts:Text md/Regular |
| Horizontal/Completed/no/yes | fg:stepper-text-primary ic:icon-default ts:Text md/Regular |
| Horizontal/Completed/yes/no | fg:stepper-text-primary ic:icon-default ts:Text md/Regular |
| Horizontal/Completed/yes/yes | fg:stepper-text-primary ic:icon-default ts:Text md/Regular |
| Horizontal/Upcomming/no/no | fg:stepper-button-upcomming ts:Text md/Medium |
| Horizontal/Upcomming/yes/no | fg:stepper-line-upcomming-hovered ts:Text md/Medium |
| Horizontal/Current/no/no | fg:stepper-button-current ts:Text md/Medium |
| Horizontal/Current/no/yes | fg:stepper-button-current ts:Text md/Medium |
| Horizontal/Current/yes/no | fg:stepper-button-current ts:Text md/Medium |
| Horizontal/Current/yes/yes | fg:stepper-button-current ts:Text md/Medium |
| Vertical/Completed/no/no | fg:stepper-text-primary ic:icon-default ts:Text md/Regular |
| Vertical/Completed/yes/no | fg:stepper-text-primary ic:icon-default ts:Text md/Regular |
| Vertical/Current/no/no | fg:stepper-button-current ts:Text md/Medium |
| Vertical/Current/yes/no | fg:stepper-button-current ts:Text md/Medium |
| Vertical/Upcomming/no/no | fg:stepper-line-upcomming ts:Text md/Medium |
| Vertical/Upcomming/yes/no | fg:stepper-line-upcomming-hovered ts:Text md/Medium |
| Vertical/Completed/yes/yes | fg:stepper-text-primary ic:icon-default ts:Text md/Regular |
| Vertical/Current/no/yes | fg:stepper-button-current ts:Text md/Medium |
| Vertical/Current/yes/yes | fg:stepper-button-current ts:Text md/Medium |
| Vertical/Completed/no/yes | fg:stepper-text-primary ic:icon-default ts:Text md/Regular |

## CSS implementation notes (from design.dga.gov.sa CSS, phase 2)
Where these differ from Figma above, Figma is the source of truth.
CSS block(s): `.progress-indicator`, `.step-label` — extracted verbatim from https://design.dga.gov.sa/ compiled CSS (2026-11-04). Not cross-checked against Figma (community files not readable via connector). rem duplicates (62.5% root) omitted.

### Variants / modifiers (`--`)
brand-border, circle, dot

### Elements / anatomy (`__`)
step-content

### Heights used
32px (2), 8px (2), 62px (2)

### Tokens referenced (count)
`--colors-brand-600` (14), `--colors-gray-neutral-300` (12)

### Rules (selector → declarations; covers sizes, states :hover/:focus/:active/:disabled, colors, spacing, radius)

- `.progress-indicator__step-content>.step-label` → `height: 32px; width: 32px`
- `.progress-indicator__step-content>.step-label .step-label--circle` → `height: 100%; width: 100%; border-radius: 50%; border: 2px solid var(--colors-gray-neutral-300); color: var(--colors-gray-neutral-300)`
- `.progress-indicator__step-content>.step-label .step-label--dot` → `width: 8px; height: 8px; border-radius: 50%; background-color: var(--colors-gray-neutral-300)`
- `.progress-indicator__step-content>.step-label[data-state=current] .step-label--circle` → `border: 2px solid var(--colors-brand-600); color: var(--colors-brand-600)`
- `.progress-indicator__step-content>.step-label[data-state=current] .step-label--dot` → `border: 2px solid var(--colors-brand-600)`
- `.progress-indicator__step-content>.step-label[data-state=completed] .step-label--circle` → `border: 2px solid var(--colors-brand-600); background-color: var(--colors-brand-600); color: #fff`
- `.progress-indicator__step-content>.step-label[data-state=completed] .step-label--dot` → `background-color: var(--colors-brand-600)`
- `.progress-indicator__step-content>.step-label[data-state=upcomming] .step-label--circle` → `border: 2px solid var(--colors-gray-neutral-300); color: var(--colors-gray-neutral-300)`
- `.progress-indicator__step-content>.step-label[data-state=upcomming] .step-label--dot` → `background-color: var(--colors-gray-neutral-300)`
- `.progress-indicator__step-content>.step-label--brand-border` → `color: var(--colors-brand-600); border-color: var(--colors-brand-600)`
- `.step-label` → `height: 32px; width: 32px`
- `.step-label .step-label--circle` → `height: 100%; width: 100%; border-radius: 50%; border: 2px solid var(--colors-gray-neutral-300); color: var(--colors-gray-neutral-300)`
- `.step-label .step-label--dot` → `width: 8px; height: 8px; border-radius: 50%; background-color: var(--colors-gray-neutral-300)`
- `.step-label[data-state=current] .step-label--circle` → `border: 2px solid var(--colors-brand-600); color: var(--colors-brand-600)`
- `.step-label[data-state=current] .step-label--dot` → `border: 2px solid var(--colors-brand-600)`
- `.step-label[data-state=completed] .step-label--circle` → `border: 2px solid var(--colors-brand-600); background-color: var(--colors-brand-600); color: #fff`
- `.step-label[data-state=completed] .step-label--dot` → `background-color: var(--colors-brand-600)`
- `.step-label[data-state=upcomming] .step-label--circle` → `border: 2px solid var(--colors-gray-neutral-300); color: var(--colors-gray-neutral-300)`
- `.step-label[data-state=upcomming] .step-label--dot` → `background-color: var(--colors-gray-neutral-300)`
- `.text-md-medium,.btn--lg,.tag,.tag--lg,.checkbox__label,.switch__label,.radio__label,.date-picker__navigator-label,.progress-indicator__step-content>.step-icon,.progress-indicator__step-content>.step-label .step-label--c…` → `font: 500 16px/24px IBMPlexSansArabic`
- `.contribution-stepper [data-alignment=vertical] .step-label` → `width: 62px; height: 62px`
- `.contribution-stepper [data-alignment=vertical] .step-label .step-label--circle` → `width: 62px; height: 62px; background-color: #f3fcf6; color: #1b8354; border: none`
