# Badge
CSS block(s): `.badge` — extracted verbatim from https://design.dga.gov.sa/ compiled CSS (2026-11-04). Not cross-checked against Figma (community files not readable via connector). rem duplicates (62.5% root) omitted.

## Variants / modifiers (`--`)
destruct, destruct-outlined, gray, gray-outlined, icon, info, info-outlined, lg, md, on-color, on-color-outlined, orange, orange-outlined, pink, pink-outlined, purple, purple-outlined, rounded, sm, success, success-outlined, warning, warning-outlined

## Elements / anatomy (`__`)
—

## Heights used
32px (3), 24px (2), 20px (2), 48px (1)

## Tokens referenced (count)
`--colors-base-white` (5), `--colors-alpha-white` (3), `--colors-gray-neutral-700` (2), `--colors-brand-700` (2), `--colors-error-700` (2), `--colors-warning-700` (2), `--colors-info-700` (2), `--colors-purple-700` (2), `--colors-pink-700` (2), `--colors-orange-700` (2), `--spacing-none` (1), `--spacing-lg` (1), `--spacing-xs` (1), `--radius-xs` (1), `--radius-full` (1), `--colors-gray-neutral-50` (1), `--colors-gray-neutral-200` (1), `--colors-gray-neutral-500` (1), `--colors-brand-50` (1), `--colors-brand-200` (1), `--colors-brand-500` (1), `--colors-error-50` (1), `--colors-error-200` (1), `--colors-error-500` (1), `--colors-warning-50` (1), `--colors-warning-200` (1), `--colors-warning-500` (1), `--colors-info-50` (1), `--colors-info-200` (1), `--colors-info-500` (1), `--colors-purple-50` (1), `--colors-purple-200` (1), `--colors-purple-500` (1), `--colors-pink-50` (1), `--colors-pink-200` (1), `--colors-pink-500` (1), `--colors-orange-50` (1), `--colors-orange-200` (1), `--colors-orange-500` (1)

## Rules (selector → declarations; covers sizes, states :hover/:focus/:active/:disabled, colors, spacing, radius)

- `.card>.badge--icon.badge--lg` → `width: 48px; height: 48px`
- `.badge` → `height: 32px; padding: var(--spacing-none) var(--spacing-lg); gap: var(--spacing-xs); border-radius: var(--radius-xs)`
- `.badge--lg` → `height: 32px`
- `.badge--lg span.badge-icon` → `font-size: 18px`
- `.badge--md` → `height: 24px`
- `.badge--md span.badge-icon` → `font-size: 14px`
- `.badge--sm` → `height: 20px`
- `.badge--sm span.badge-icon` → `font-size: 10px`
- `.badge--rounded` → `border-radius: var(--radius-full)`
- `.badge--icon` → `padding: 0`
- `.badge--icon.badge--lg` → `width: 32px; height: 32px`
- `.badge--icon.badge--md` → `width: 24px; height: 24px`
- `.badge--icon.badge--sm` → `width: 20px; height: 20px`
- `.badge--gray` → `color: var(--colors-gray-neutral-700); background: var(--colors-gray-neutral-50); border: 1px solid var(--colors-gray-neutral-200)`
- `.badge--gray-outlined` → `border: 1px solid var(--colors-gray-neutral-500); background-color: var(--colors-base-white); color: var(--colors-gray-neutral-700)`
- `.badge--success` → `color: var(--colors-brand-700); background-color: var(--colors-brand-50); border: 1px solid var(--colors-brand-200)`
- `.badge--success-outlined` → `border: 1px solid var(--colors-brand-500); background-color: var(--colors-base-white); color: var(--colors-brand-700)`
- `.badge--destruct` → `color: var(--colors-error-700); background-color: var(--colors-error-50); border: 1px solid var(--colors-error-200)`
- `.badge--destruct-outlined` → `border: 1px solid var(--colors-error-500); background-color: var(--colors-base-white); color: var(--colors-error-700)`
- `.badge--warning` → `color: var(--colors-warning-700); background-color: var(--colors-warning-50); border: 1px solid var(--colors-warning-200)`
- `.badge--warning-outlined` → `border: 1px solid var(--colors-warning-500); background-color: var(--colors-base-white); color: var(--colors-warning-700)`
- `.badge--info` → `color: var(--colors-info-700); background-color: var(--colors-info-50); border: 1px solid var(--colors-info-200)`
- `.badge--info-outlined` → `border: 1px solid var(--colors-info-500); background-color: transparent; color: var(--colors-info-700)`
- `.badge--purple` → `color: var(--colors-purple-700); background-color: var(--colors-purple-50); border: 1px solid var(--colors-purple-200)`
- `.badge--purple-outlined` → `border: 1px solid var(--colors-purple-500); background-color: transparent; color: var(--colors-purple-700)`
- `.badge--pink` → `color: var(--colors-pink-700); background-color: var(--colors-pink-50); border: 1px solid var(--colors-pink-200)`
- `.badge--pink-outlined` → `border: 1px solid var(--colors-pink-500); background-color: transparent; color: var(--colors-pink-700)`
- `.badge--orange` → `color: var(--colors-orange-700); background-color: var(--colors-orange-50); border: 1px solid var(--colors-orange-200)`
- `.badge--orange-outlined` → `border: 1px solid var(--colors-orange-500); background-color: transparent; color: var(--colors-orange-700)`
- `.badge--on-color` → `color: var(--colors-base-white); background-color: hsl(var(--colors-alpha-white)/30%)`
- `.badge--on-color-outlined` → `border: 1px solid hsl(var(--colors-alpha-white)/90%); background-color: transparent; color: hsl(var(--colors-alpha-white)/90%)`
