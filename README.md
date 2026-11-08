# Platform Code (كود المنصات)

The Saudi Digital Government Authority (DGA) design system as copy-paste React components, installed with the shadcn CLI. Built on Base UI and Tailwind CSS v4, in Arabic and English (RTL and LTR), light and dark, to WCAG 2.1 AA.

This is not an official DGA product. Its tokens come from the DGA Figma file and design.dga.gov.sa; every place where this project differs from them is listed on the Deviations page.

**Docs:** <https://dga.omqkhafi.dev> — [English](https://dga.omqkhafi.dev/en) · [العربية](https://dga.omqkhafi.dev/ar)

## Install

```bash
npx shadcn@latest init https://dga.omqkhafi.dev/r/dga.json
npx shadcn@latest add @dga/button
```

```tsx
import { Button } from "@/components/dga/button";
```

Components are installed to `components/dga/<name>.tsx`, never `components/ui`, so they sit beside stock shadcn (or a shadcn-derived library) without overwriting it. Only `lib/utils.ts` (`cn`) is shared. See [Installation](https://dga.omqkhafi.dev/en/docs/installation#where-components-are-installed).

## Languages

The documentation is published in English (`/en`) and Arabic (`/ar`). A URL without a language goes to the language the visitor chose with the switcher in the header (the `dga_locale` cookie: SameSite=Lax, path `/`, one year), then to the language in `Accept-Language`, then to English. Both are first-class: every page, every UI string and every Open Graph image exists in both, and a new component is not done until both are written (see [ROADMAP.md](ROADMAP.md)). Arabic follows its own typography rules (line height 1.8, no letter spacing, Western digits in technical values); they are documented under Foundations > Typography.

Inside a component preview, the sample content follows the LTR/RTL toggle rather than the page: RTL shows the Arabic content and LTR the English one, on both `/en` and `/ar`. Previews open in the page's direction, so the default view is in the page language, and everything outside the preview stays in the page language.

## Roadmap

OKLCH colour output and Phase 5 (Navigation and data display) are done in 0.5.0, Phase 6 (Composite: Header, Second Nav, Footer, Date Picker, Carousel and Filtration) in 0.6.0, the first half of Phase 7 (overlays, inputs and the Digital Stamp) in 0.7.0 and the second half (navigation, layout and display) in 0.7.1. 0.7.2 puts the extensions in the sidebar sections of the DGA components. Next are the Section blocks, one minor version per group (0.8.0 Overlays, 0.9.0 Heroes and headers, 0.10.0 Content sections, 0.11.0 Service and life journey, 0.12.0 Forms and contact, 0.13.0 Search and errors) and the Mobile components (0.14.0 and later, as needed). See [ROADMAP.md](ROADMAP.md).

## Repository

| Path                         | What is in it                                                                                     |
| ---------------------------- | ------------------------------------------------------------------------------------------------- |
| `registry/`                  | Component source and the DGA shadcn style.                                                        |
| `tokens/`, `scripts/tokens/` | Figma tokens and the generator that turns them into CSS, with the contrast audit.                 |
| `apps/docs/`                 | The documentation site (Next.js, Fumadocs). Arabic pages are `*.ar.mdx` next to the English ones. |
| `docs/design-system/`        | Component specs from the DGA Figma file.                                                          |

## Develop

```bash
bun install
bun run dev                 # docs site on http://localhost:3000
bun run lint && bun run typecheck && bun run test
bun run translations:check  # English and Arabic pages are in sync
bun run test:e2e            # browser checks against a running site (E2E_BASE_URL)
bun run build
```

See [CONTRIBUTING.md](CONTRIBUTING.md) and [CHANGELOG.md](CHANGELOG.md). Licence: MIT.
