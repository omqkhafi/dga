# Changelog

All notable changes to DGA UI are documented here.
The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and the project uses [Semantic Versioning](https://semver.org/).

## [Unreleased]

### Added

- `dga` (`registry:base`): `npx shadcn@latest init https://dga.omqkhafi.dev/r/dga.json` sets `iconLibrary: "hugeicons"`, `rtl: true`, the `base-nova` style and the `@dga` registry in `components.json`, then installs `dga-style`.
- `dga-tokens` (`registry:theme`): every DGA token on its own, for projects that want the tokens without components.
- `test:install` covers three paths (`init dga.json`, `init dga-style.json`, `add dga-tokens.json`), checks `dga-style.json` stays under 10 KB, and can target the production registry with `REGISTRY_URL`.

- **Button** (`@dga/button`): primary, neutral, secondary, outline, subtle and transparent; destructive and on-colour versions of each; sizes sm 24, md 32 and lg 40px; leading and trailing icons, icon-only, selected (`aria-pressed`), disabled and `loading`. 1,210 colour pairs audited.
- **Spinner** (`@dga/spinner`): the Figma Loading indicator in seven sizes (20 to 44px), primary, neutral, on-colour and `current`. Turns slowly with reduced motion.
- **Link** (`@dga/link`): primary, neutral and on-colour, sm and md, inline (always underlined), external (new tab, icon, screen-reader hint) and disabled. Works with Next.js `Link` through `render`. On-colour hovered, pressed and visited colours are white (contrast fix, logged in Deviations).
- Component contrast audit (`scripts/tokens/components.ts`): every state of every component is checked in light and dark mode on each surface it can sit on, and the build fails on any regression. Each component page lists its checks and its deviations.
- Component docs pages with previews, install commands, props tables, accessibility notes, contrast checks and deviations.

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
