# Changelog

All notable changes to DGA UI are documented here.
The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and the project uses [Semantic Versioning](https://semver.org/).

## [Unreleased]

## [0.1.1] - 2026-11-04

Docs polish after the 0.1.0 visual audit, and a rebuilt dark theme.

### Changed

- **Dark theme rebuilt from scratch.** One green-tinted neutral ramp (`colors-neutral-dark-25 … 950`) replaces the cool blue-grey; page 950, surface 900, raised 850, border 800, border-strong 700, text 50, secondary 300, muted 400. Text, icons and borders use step 300 and 500 of each colour's own ramp, subtle backgrounds are the 500 step at 9–15% opacity, and solid fills keep their light value (white labels need it). Figma Dark bugs fixed (light surfaces darker than the page, hardcoded hex, light tints on dark). No shadows in dark mode. Every change is listed under **Dark theme** on the Deviations page (190+ entries). New page: Dark mode, with Button, Badge, Tag, Link and status surfaces in light and dark side by side.
- **Component pages share one structure**: preview, Installation (bun, npm, pnpm, yarn or Manual), Usage, Anatomy, Examples, RTL (LTR and RTL side by side), Accessibility, API Reference (generated from the TypeScript types), Deviations (key rows and a link to all of them for that component), one collapsed Contrast table, then related components, Previous and Next, and Edit on GitHub.
- **Docs typography**: 16px body, sidebar, table of contents and toolbar at 13–14px, nothing under 12px in the docs shell. Sidebar section labels, inactive tabs and toggles, table columns and code line numbers all pass AA, and the docs UI chrome is now in the contrast audit (`ui-chrome`, 60+ pairs in both modes).
- Previews: a skeleton holds the frame's height until the iframe has loaded, below-the-fold previews load lazily, desktop previews run at the column's own width instead of a scaled-down tablet, and mobile and tablet frames sit centred in a device outline. New Fullscreen (new tab) and Reset (also replays animations) buttons.
- Code blocks: line numbers, a language pill, collapse past 16 lines with "Expand code", and `dir="ltr"` with `unicode-bidi: isolate` so Arabic strings inside JSX render in the right order. Code now uses the high-contrast GitHub themes.
- Search (⌘K / Ctrl+K) is prebuilt: one `search-index.json`, filtered in memory. Results are grouped by page, show a breadcrumb, a title and one highlighted line (up to 120 characters), at most 8 per search. Arrow keys and Enter work.
- Props tables: each row opens to show the full type, default and description, by click or with Enter and Space on the prop name.
- Home page: hero with the init command, Get started and Components buttons, a grid of live component previews that link to their pages, and a row of features.
- Mobile docs shell: the navigation is a bottom sheet, the sticky header keeps a search icon, and the table of contents is a dropdown under the header.
- Visible focus rings (the DGA focus token) on every interactive element in the docs shell, hover and pressed states on the sidebar, tabs and table of contents, and `prefers-reduced-motion` is respected.
- "Copy page" is a menu: copy as Markdown, view the Markdown, open in ChatGPT or Claude.
- shadcn `--muted` is now `background-neutral-50`. `text-secondary-paragraph` on `background-neutral-100` is 4.34:1 in light mode, which fails AA for muted text on muted fills (logged in Deviations).

### Added

- `button-border-neutral` token and class on the neutral and secondary buttons: the fills sit 1.1–1.4:1 from the page in dark mode, so their edge was not visible. A 1px border shows it; it is transparent in light mode (logged in Deviations).
- `/docs/contrast`: every audited pair for each component and for the docs UI chrome, in light and dark.
- `bun run api` generates `apps/docs/lib/generated/api.json` (props, types, defaults, JSDoc) from the registry sources; CI fails if it is stale.
- Lighthouse in CI on the home and Button pages: performance, accessibility, best practices and SEO must all be at least 95 on desktop (median of three runs); mobile accessibility, best practices and SEO are enforced too and mobile performance is reported as a warning.
- Favicon.

### Fixed

- `test:install` takes the production registry from `DGA_REGISTRY_URL` instead of `REGISTRY_URL`, which the shadcn CLI also reads as its own default registry. The 0.1.0 entry now says `DGA_REGISTRY_URL` too.
- Props table rows did not reveal their description or default.
- Preview iframes flashed blank before loading.

## [0.1.0] - 2026-11-04

### Added

- `dga` (`registry:base`): `npx shadcn@latest init https://dga.omqkhafi.dev/r/dga.json` sets `iconLibrary: "hugeicons"`, `rtl: true`, the `base-nova` style and the `@dga` registry in `components.json`, then installs `dga-style`.
- `dga-tokens` (`registry:theme`): every DGA token on its own, for projects that want the tokens without components.
- `test:install` covers three paths (`init dga.json`, `init dga-style.json`, `add dga-tokens.json`), checks `dga-style.json` stays under 10 KB, and can target the production registry with `DGA_REGISTRY_URL`.

- **Button** (`@dga/button`): primary, neutral, secondary, outline, subtle and transparent; destructive and on-colour versions of each; sizes sm 24, md 32 and lg 40px; leading and trailing icons, icon-only, selected (`aria-pressed`), disabled and `loading`. 1,210 colour pairs audited.
- **Spinner** (`@dga/spinner`): the Figma Loading indicator in seven sizes (20 to 44px), primary, neutral, on-colour and `current`. Turns slowly with reduced motion.
- **Link** (`@dga/link`): primary, neutral and on-colour, sm and md, inline (always underlined), external (new tab, icon, screen-reader hint) and disabled. Works with Next.js `Link` through `render`. On-colour hovered, pressed and visited colours are white (contrast fix, logged in Deviations).
- **Badge** (`@dga/badge`): from the design.dga.gov.sa CSS (not in Figma). Neutral, success, error, warning, info, purple, orange and on-colour; filled or outlined; sm 20, md 24 and lg 32px; rounded and icon-only. New `badge-*` tokens, logged in Deviations as added from site CSS.
- **Tag** and **Status Tag** (`@dga/tag`): Tag in neutral, success, info, warning, error and on-colour; filled or outlined; xs 20, sm 24 and md 32px; rounded, icon-only and dismissible (`onDismiss`, 24px hit area). Status Tag in subtle, inverted and ghost with a coloured dot. `tag-background-on-color` darkens instead of lightens (contrast fix).
- **Divider** (`@dga/divider`): Base UI Separator in neutral, primary, alpha-white and white; horizontal or vertical.
- **Avatar** and **Avatar Group** (`@dga/avatar`): Base UI Avatar with image, initials or icon fallback; 24, 32, 40, 48, 64, 80 and 120px; circle or square; optional ring; stacked or spaced groups.
- **Featured Icon** (`@dga/featured-icon`): from the design.dga.gov.sa CSS (not in Figma). Light, hard and outlined; brand, neutral, success, error, warning and info; sm 32 to xl 56px; square or circle. New `featured-icon-*` tokens, logged as added from site CSS.
- **Skeleton** (`@dga/skeleton`): rectangle, square, circle and line in the Figma sizes, with the five Figma layouts as examples. New `skeleton-background` token. Static with reduced motion.
- Component contrast audit (`scripts/tokens/components.ts`): every state of every component is checked in light and dark mode on each surface it can sit on, and the build fails on any regression. Each component page lists its checks and its deviations.
- Component docs pages with previews, install commands, props tables, accessibility notes, contrast checks and deviations.

- Docs site shell in the DGA identity (colours, IBM Plex Sans Arabic, radius, focus rings), light and dark, built with the registry's own components: top tabs README / DOCS / CHANGELOG, a numbered docs sidebar with the latest-release badge and ⌘K search, "On this page" table of contents, "Copy page" (and every page as Markdown at its URL plus `.md`), code blocks with file headers, and a mobile drawer.
- `/changelog`, generated from `CHANGELOG.md`.
- `llms.txt`, `llms-full.txt`, `sitemap.xml`, `robots.txt` and OG images for the home page and every docs page, all on `https://dga.omqkhafi.dev`.
- Test that `package.json` `version` matches the latest CHANGELOG release.

### Changed

- Button token fixes for contrast (all logged on the Deviations page): on-colour secondary, outline and subtle fills darken instead of lighten; on-colour transparent and destructive labels stay white; dark-mode destructive secondary uses a red tint; new `button-label-transparent-*`, `button-label-danger-*` and on-colour destructive secondary tokens.
- The registry build inlines `cn-*` classes with its own transform, which also covers `compoundVariants` and `cn()` arguments and fails on unknown classes. The docs site renders the transformed components from `apps/docs/registry`, the same code users install.
- `dga-style` no longer carries the tokens (169 KB → 1 KB); it depends on `dga-tokens`, so existing `init …/dga-style.json` installs get the same result.
- Colour swatches take their white and black text from `text-oncolor-primary` and `text-default` instead of hardcoded hex values.

- Bun workspaces monorepo: `apps/docs` (Next.js 16 + Fumadocs) and `registry` (shadcn registry source).
- Biome for lint and format, TypeScript 5.9 strict, GitHub Actions CI (lint, tests, token check, registry build and diff, typecheck, docs build).
- Token generator (`bun run tokens`): builds `registry/styles/dga/tokens.css` and `theme.css` from `tokens/tokens.json` (Figma). It includes light and dark themes (`.dark` and `[data-theme="dark"]`, also on any subtree) and mobile-first responsive modes.
- Tailwind v4 theme: every DGA token in `@theme`, Figma-identical utilities (`text-text-primary`), short aliases (`text-primary`, `bg-body`, `border-primary`) and the shadcn variable mapping.
- Contrast audit: 466 foundation pairs are checked against WCAG 2.1 AA in both modes, and the build fails on any regression.
- Breakpoints sm 640, md 768, lg 1024, xl 1280, 2xl 1536 (px).
- `@dga` registry with `dga-style` (`registry:style`) and `font-ibm-plex-sans-arabic` (`registry:font`). Install with `npx shadcn@latest init https://dga.omqkhafi.dev/r/dga-style.json`.
- `utils` (`registry:lib`): `lib/utils.ts` re-exports `cn` from the `cn` package. `dga-style` depends on it by URL instead of shadcn's bare `utils`.
- `bun run test:install`: creates a fresh Next.js app, installs `dga-style` from a local registry, checks the result (including that `lib/utils.ts` is ours and imports from `cn`) and builds it. It also runs in CI.
- Registry build that inlines the `cn-*` style map into components (the shadcn base-style pipeline), ready for Phase 2.
- Docs: Introduction, Installation, Deviations from DGA, and foundation pages for Colors, Typography, Spacing, Radius, Shadows and Icons. Every preview has direction, theme and viewport toggles.
- Test that fails on physical left/right utilities or CSS anywhere in the registry or docs source.

### Changed (from DGA Figma; full list on the Deviations page)

- Fixed Figma naming typos: `line-hight` → `line-height`, `lavendar` → `lavender`, `diabled` → `disabled`, `lable` → `label`, `iable-container` → `label-container`. Physical names are now logical (`padding-left` → `padding-start`, `padding-left-right` → `padding-inline`).
- Fixed contrast failures across 31 tokens (39 light/dark value changes). These cover status fills, gold and lavender text, link hover/pressed/visited states, dark-mode links, icon colours and on-colour text. Added `--text-on-gold`.
- Body text sizes no longer shrink on mobile; display sizes follow the Figma modes.
- Dropped the legacy site-CSS radius set; `rounded-2xl` and above clamp to `radius-xl`. Dropped italic weight tokens (IBM Plex Sans Arabic has no italic).

[Unreleased]: https://github.com/omqkhafi/dga/compare/v0.1.1...HEAD
[0.1.1]: https://github.com/omqkhafi/dga/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/omqkhafi/dga/releases/tag/v0.1.0
