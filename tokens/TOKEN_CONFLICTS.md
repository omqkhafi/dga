# Figma ↔ CSS token reconciliation

Figma = Foundations file `eJy7ExFwQM8mBZPvz9fmXr`, read on 2026-11-04 (UTC+3). CSS = design.dga.gov.sa compiled CSS. **Figma is the source of truth**; the CSS value is kept here for reference.

- Figma variables: 784 in 7 collections (Primitives, Themes Light/Dark, Spacing/Radius/Typography Desktop/Tablet/Mobile, Containers, Widths)
- Conflicts: **39 material**, 87 rounding-only (±1 per channel, e.g. alpha 0x19 vs 0x1a)
- In Figma but not on the site CSS: 414 (component-level tokens: Charts, Chip, Controls, Form, Table, Tag, Stepper, Tooltip, Progress Bar…)
- On the site CSS but not in Figma: 93 (kept in tokens.css under "CSS-only")

## Material conflicts
| Token | Mode | Figma (used) | CSS (site) |
|---|---|---|---|
| `--text-primary` | Dark | `#54c08a` | `#1b8354` |
| `--background-success-50` | Dark | `#06764733` | `#1f2a37` |
| `--background-info-50` | Dark | `#175cd333` | `#1f2a37` |
| `--background-warning-50` | Dark | `#b5470833` | `#1f2a37` |
| `--background-error-50` | Dark | `#b4231833` | `#1f2a37` |
| `--text-success` | Dark | `#47cd89` | `#069454` |
| `--text-info` | Dark | `#53b1fd` | `#156fee` |
| `--text-warning` | Dark | `#fdb022` | `#dc6803` |
| `--text-error` | Dark | `#f97066` | `#b42318` |
| `--icon-primary` | Dark | `#54c08a` | `#1b8354` |
| `--icon-neutral` | Dark | `#9da4ae` | `#6c727e` |
| `--border-primary` | Dark | `#88d8ad` | `#1b8354` |
| `--icon-success` | Dark | `#47cd89` | `#069454` |
| `--icon-info` | Dark | `#53b1fd` | `#175cd3` |
| `--icon-warning` | Dark | `#fdb022` | `#b54707` |
| `--icon-error` | Dark | `#f97066` | `#b42318` |
| `--background-success-25` | Dark | `#0676471a` | `#111927` |
| `--background-info-25` | Dark | `#175cd31a` | `#111927` |
| `--background-warning-25` | Dark | `#b547081a` | `#111927` |
| `--background-error-25` | Dark | `#b423181a` | `#111927` |
| `--text-primary-light` | Dark | `#54c08a` | `#88d8ad` |
| `--icon-primary-400` | Dark | `#b8eacb` | `#54c08a` |
| `--text-content-gap` | Light | `8px` | `4px` |
| `--icon-text-gap` | Light | `8px` | `4px` |
| `--background-warning-light` | Dark | `#b547081a` | `#fffaeb` |
| `--background-error-light` | Dark | `#b423181a` | `#fef3f2` |
| `--alpha-warning-10` | Dark | `#b547081a` | `#fec84b19` |
| `--alpha-warning-20` | Dark | `#b5470833` | `#fec84b33` |
| `--background-brand-light` | Dark | `#166a451a` | `#f3fcf6` |
| `--alpha-info-10` | Dark | `#175cd31a` | `#156fee19` |
| `--alpha-info-20` | Dark | `#175cd333` | `#156fee33` |
| `--background-info-light` | Dark | `#175cd31a` | `#eff8ff` |
| `--background-success-light` | Dark | `#0676471a` | `#ecfdf3` |
| `--alpha-success-10` | Dark | `#0676471a` | `#06945419` |
| `--alpha-success-20` | Dark | `#06764733` | `#06945433` |
| `--colors-alpha-alpha-green-10` | Light | `#0794551a` | `#1b835419` |
| `--colors-alpha-alpha-green-20` | Light | `#07945533` | `#1b835433` |
| `--border-disabled` | Light | `#d2d6db` | `#9da4ae` |
| `--border-disabled` | Dark | `#6c737f` | `#9da4ae` |

## Effect style conflicts
| Style | Figma (used) | CSS |
|---|---|---|
| shadow-sm | `0 1 2 0 #1018280d` + `0 1 3 0 #1018280d` (both 5%) | `0 1px 2px rgba(16,24,40,.06), 0 1px 3px rgba(16,24,40,.1)` |

All other shadows (xs, md, lg, xl, 2xl, 3xl) match.

## Rounding-only differences
| Token | Mode | Figma | CSS |
|---|---|---|---|
| `--colors-neutral-500` | Light | `#6c737f` | `#6c727e` |
| `--colors-neutral-950` | Light | `#0d121c` | `#0c111b` |
| `--colors-red-300` | Light | `#fda29b` | `#fca19b` |
| `--colors-red-500` | Light | `#f04438` | `#f04437` |
| `--colors-red-600` | Light | `#d92d20` | `#d92c20` |
| `--colors-red-900` | Light | `#7a271a` | `#7a2619` |
| `--colors-red-950` | Light | `#55160c` | `#54150c` |
| `--colors-yellow-700` | Light | `#b54708` | `#b54707` |
| `--colors-yellow-800` | Light | `#93370d` | `#93370c` |
| `--colors-green-300` | Light | `#75e0a7` | `#75dfa6` |
| `--colors-green-500` | Light | `#17b26a` | `#17b169` |
| `--colors-green-600` | Light | `#079455` | `#069454` |
| `--colors-green-900` | Light | `#074d31` | `#074c30` |
| `--colors-blue-400` | Light | `#53b1fd` | `#53b0fd` |
| `--colors-blue-600` | Light | `#1570ef` | `#156fee` |
| `--colors-blue-900` | Light | `#194185` | `#194084` |
| `--colors-alpha-alpha-white-10` | Light | `#ffffff1a` | `#ffffff19` |
| `--colors-alpha-alpha-white-30` | Light | `#ffffff4d` | `#ffffff4c` |
| `--colors-alpha-alpha-white-50` | Light | `#ffffff80` | `#ffffff7f` |
| `--colors-alpha-alpha-black-10` | Light | `#1616161a` | `#16161619` |
| `--colors-alpha-alpha-black-30` | Light | `#1616164d` | `#1616164c` |
| `--colors-alpha-alpha-black-50` | Light | `#16161680` | `#1616167f` |
| `--background-white` | Dark | `#0d121c` | `#0c111b` |
| `--border-neutral-primary` | Dark | `#6c737f` | `#6c727e` |
| `--background-primary-50` | Dark | `#1b83541a` | `#1b835419` |
| `--text-secondary-paragraph` | Light | `#6c737f` | `#6c727e` |
| `--text-warning` | Light | `#b54708` | `#b54707` |
| `--border-success` | Dark | `#17b26a` | `#17b169` |
| `--border-warning` | Light | `#b54708` | `#b54707` |
| `--border-warning` | Dark | `#b54708` | `#b54707` |
| `--icon-neutral-light` | Dark | `#0d121c` | `#0c111b` |
| `--alpha-white-10` | Light | `#ffffff1a` | `#ffffff19` |
| `--alpha-white-10` | Dark | `#1616161a` | `#16161619` |
| `--alpha-white-30` | Light | `#ffffff4d` | `#ffffff4c` |
| `--alpha-white-30` | Dark | `#1616164d` | `#1616164c` |
| `--alpha-white-50` | Light | `#ffffff80` | `#ffffff7f` |
| `--alpha-white-50` | Dark | `#16161680` | `#1616167f` |
| `--alpha-black-10` | Light | `#1616161a` | `#16161619` |
| `--alpha-black-10` | Dark | `#ffffff1a` | `#ffffff19` |
| `--alpha-black-30` | Light | `#1616164d` | `#1616164c` |
| `--alpha-black-30` | Dark | `#ffffff4d` | `#ffffff4c` |
| `--alpha-black-50` | Light | `#16161680` | `#1616167f` |
| `--alpha-black-50` | Dark | `#ffffff80` | `#ffffff7f` |
| `--button-background-danger-primary-default` | Light | `#d92d20` | `#d92c20` |
| `--button-background-danger-primary-default` | Dark | `#d92d20` | `#d92c20` |
| `--button-background-danger-primary-pressed` | Light | `#7a271a` | `#7a2619` |
| `--button-background-danger-primary-pressed` | Dark | `#7a271a` | `#7a2619` |
| `--button-background-danger-primary-focused` | Light | `#d92d20` | `#d92c20` |
| `--button-background-danger-primary-focused` | Dark | `#d92d20` | `#d92c20` |
| `--icon-warning` | Light | `#b54708` | `#b54707` |
| `--background-success` | Light | `#079455` | `#069454` |
| `--background-success` | Dark | `#079455` | `#069454` |
| `--background-info` | Light | `#1570ef` | `#156fee` |
| `--background-info` | Dark | `#1570ef` | `#156fee` |
| `--background-error` | Light | `#d92d20` | `#d92c20` |
| `--background-error` | Dark | `#d92d20` | `#d92c20` |
| `--background-sa-flag` | Light | `#074d31` | `#074c30` |
| `--button-background-black-default` | Light | `#0d121c` | `#0c111b` |
| `--button-background-black-default` | Dark | `#0d121c` | `#0c111b` |
| `--button-background-black-focused` | Light | `#0d121c` | `#0c111b` |
| `--button-background-black-focused` | Dark | `#0d121c` | `#0c111b` |
| `--button-background-transparent-default` | Dark | `#1616161a` | `#16161619` |
| `--button-background-transparent-selected` | Light | `#ffffff4d` | `#ffffff4c` |
| `--button-background-transparent-selected` | Dark | `#1616164d` | `#1616164c` |
| `--button-background-transparent-focused` | Dark | `#1616161a` | `#16161619` |
| `--alpha-white-0` | Dark | `#1616161a` | `#16161619` |
| `--alpha-black-0` | Dark | `#ffffff1a` | `#ffffff19` |
| `--icon-default-400` | Dark | `#6c737f` | `#6c727e` |
| `--background-neutral-300` | Dark | `#6c737f` | `#6c727e` |
| `--background-neutral-25` | Dark | `#0d121c` | `#0c111b` |
| `--icon-default-500` | Light | `#6c737f` | `#6c727e` |
| `--border-transparent-10` | Light | `#ffffff1a` | `#ffffff19` |
| `--border-transparent-10` | Dark | `#1616161a` | `#16161619` |
| `--border-oncolor-transparent-30` | Light | `#ffffff4d` | `#ffffff4c` |
| `--border-oncolor-transparent-30` | Dark | `#ffffff4d` | `#ffffff4c` |
| `--alpha-primary-10` | Light | `#1b83541a` | `#1b835419` |
| `--alpha-primary-10` | Dark | `#166a451a` | `#166a4519` |
| `--button-label-danger-primary-hovered-oncolor` | Light | `#fda29b` | `#fca19b` |
| `--button-label-danger-primary-hovered-oncolor` | Dark | `#fda29b` | `#fca19b` |
| `--alpha-warning-10` | Light | `#dc68031a` | `#dc680319` |
| `--alpha-error-10` | Light | `#d92d201a` | `#d92c2019` |
| `--alpha-error-10` | Dark | `#b423181a` | `#b4231819` |
| `--alpha-error-20` | Light | `#d92d2033` | `#d92c2033` |
| `--alpha-info-10` | Light | `#1570ef1a` | `#156fee19` |
| `--alpha-info-20` | Light | `#1570ef33` | `#156fee33` |
| `--alpha-success-10` | Light | `#0794551a` | `#06945419` |
| `--alpha-success-20` | Light | `#07945533` | `#06945433` |

## CSS-only tokens
`--radius-xxs`, `--radius-2xl`, `--radius-3xl`, `--radius-4xl`, `--colors-green-light-25`, `--colors-green-light-50`, `--colors-green-light-100`, `--colors-green-light-200`, `--colors-green-light-300`, `--colors-green-light-400`, `--colors-green-light-500`, `--colors-green-light-600`, `--colors-green-light-700`, `--colors-green-light-800`, `--colors-green-light-900`, `--colors-green-light-950`, `--colors-blue-light-25`, `--colors-blue-light-50`, `--colors-blue-light-100`, `--colors-blue-light-200`, `--colors-blue-light-300`, `--colors-blue-light-400`, `--colors-blue-light-500`, `--colors-blue-light-600`, `--colors-blue-light-700`, `--colors-blue-light-800`, `--colors-blue-light-900`, `--colors-blue-light-950`, `--colors-blue-dark-25`, `--colors-blue-dark-50`, `--colors-blue-dark-100`, `--colors-blue-dark-200`, `--colors-blue-dark-300`, `--colors-blue-dark-400`, `--colors-blue-dark-500`, `--colors-blue-dark-600`, `--colors-blue-dark-700`, `--colors-blue-dark-800`, `--colors-blue-dark-900`, `--colors-blue-dark-950`, `--colors-orange-dark-25`, `--colors-orange-dark-50`, `--colors-orange-dark-100`, `--colors-orange-dark-200`, `--colors-orange-dark-300`, `--colors-orange-dark-400`, `--colors-orange-dark-500`, `--colors-orange-dark-600`, `--colors-orange-dark-700`, `--colors-orange-dark-800`, `--colors-orange-dark-900`, `--colors-orange-dark-950`, `--colors-orange-25`, `--colors-orange-50`, `--colors-orange-100`, `--colors-orange-200`, `--colors-orange-300`, `--colors-orange-400`, `--colors-orange-500`, `--colors-orange-600`, `--colors-orange-700`, `--colors-orange-800`, `--colors-orange-900`, `--colors-orange-950`, `--shadow-xs`, `--shadow-sm`, `--shadow-md`, `--shadow-lg`, `--shadow-xl`, `--shadow-2xl`, `--shadow-3xl`, `--colors-primary-sa-flag-500-alpha-10`, `--colors-alpha-alpha-green-30`, `--colors-alpha-alpha-green-40`, `--colors-alpha-alpha-green-50`, `--colors-alpha-alpha-green-60`, `--colors-alpha-alpha-green-70`, `--colors-alpha-alpha-green-80`, `--colors-alpha-alpha-green-90`, `--colors-alpha-alpha-green-100`, `--background-surface-oncolor`, `--background-secondary`, `--background-tertiary`, `--text-secondary`, `--text-tertiary`, `--text-secondary-light`, `--text-tertiary-light`, `--border-secondary`, `--border-secondary-light`, `--border-tertiary`, `--border-tertiary-light`, `--icon-secondary`, `--icon-tertiary`
