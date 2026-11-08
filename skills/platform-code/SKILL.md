---
name: platform-code
description: Use when building or editing UI with Platform Code (@dga), the Saudi DGA design system as a shadcn registry of Base UI components. Covers install, adding components, bilingual RTL layout, DGA tokens, digits, forms and where the docs are.
---

# Platform Code (@dga)

Platform Code is the Saudi Digital Government Authority (DGA) design system as copy-paste React components. It is a shadcn registry on Base UI, with Arabic and English shipped together. The source lands in the project; the project owns it.

## Install

```sh
npx shadcn@latest init https://dga.omqkhafi.dev/r/dga.json
npx shadcn@latest add @dga/<name>
```

`init` writes `components.json` (Hugeicons, `rtl: true`, the `@dga` registry), the DGA tokens, the dark theme and the Arabic font. Then add components by name, for example `@dga/button @dga/field @dga/input`.

Components install to `components/dga/<name>.tsx`, never `components/ui`, so they can sit beside stock shadcn. Import them as `import { Button } from "@/components/dga/button"`. Do not move them to `components/ui` and do not import `@/components/ui/*` for a `@dga` component. Only `@/lib/utils` (`cn`) is shared.

## Read the docs, not memory

1. `https://dga.omqkhafi.dev/{lang}/llms.txt` lists every page; `{lang}` is `en` or `ar`.
2. Every docs page has a Markdown twin: `https://dga.omqkhafi.dev/{lang}/docs/<slug>.md`, for example `/en/docs/components/button.md`.
3. `https://dga.omqkhafi.dev/{lang}/llms-full.txt` is every page in one file; `/{lang}/llms.json` is the same list as JSON.
4. Component props are in each page's API reference. Do not guess a prop that is not listed.

## Rules

- **Only registry components.** Use what `@dga/*` ships. Never invent a component, a prop or a `cn-*` class that is not in the registry or the docs. If a part is missing, compose existing parts or say so.
- **Forms use Field.** Wrap every control in `Field` (label, helper, error), and set the error state on the Field, not on the control alone.
- **RTL first.** Pages set `lang` and `dir` on `<html>` (`ar` + `rtl`, `en` + `ltr`). Use CSS logical properties and Tailwind logical utilities (`ps-*`, `pe-*`, `ms-*`, `me-*`, `start-*`, `end-*`, `text-start`, `rounded-s-*`). Never `left`, `right`, `pl-*`, `pr-*`, `ml-*`, `mr-*`, `text-left`. Mirror directional icons with `rtl:-scale-x-100`.
- **DGA tokens only.** Colours, spacing, radius, type and shadows come from DGA tokens (`text-text-default`, `bg-background-card`, `border-border-neutral-secondary`). No raw hex, no arbitrary palette values, no invented tokens.
- **Icons are Hugeicons** (`@hugeicons/core-free-icons`).
- **Digits.** Western digits (0 to 9) in technical content: code, props, versions, ids, numeric inputs. Arabic-Indic digits only inside Arabic citizen-facing sample content. Never mix both in one view.
- **One language per view.** Arabic views contain no English words and English views contain no Arabic, except code identifiers, package names, URLs and proper nouns. One accepted exception: on Arabic pages the generated Deviation reasons and Contrast state labels stay English (marked `lang="en"`), because their source data is English; do not translate them.
- **Navigation and data display.** Breadcrumb (`aria-label`, last item a `BreadcrumbPage`), Pagination (controlled `page` and `pageCount`; pass `previousLabel`, `nextLabel`, `pageLabel`, `compactLabel` and `formatNumber` on Arabic pages), Table of Contents (items need matching element ids), Card (make a card clickable with a `CardLink` in the title, never an `onClick` on the card), List and Structured List, Table (a plain semantic table), Data Table (TanStack Table columns with string headers; installs Table, Pagination, Checkbox and Skeleton; translate `labels`), Rating (`readOnly` to display, whole stars only), Progress (`value={null}` when the length is unknown) and Stepper (`value` is the current step). Components with built-in strings take translated labels on Arabic pages.
- **Colours are OKLCH.** The token CSS emits every colour as `oklch()`; the Figma hex values stay the source and are listed next to the OKLCH values on the Colors page. Use the token utilities, not raw colours.
- **Deviations before contrast fixes.** DGA values that fail WCAG AA are already logged with a reason at `/{lang}/docs/deviations`. Read it before "fixing" a colour; do not silently change a token.

## Never

- Do not edit generated token files by hand.
- Do not replace a registry component with plain HTML to avoid reading its page.
- Do not add physical (left/right) properties to make a layout "work" in one direction.
