# Changelog

All notable changes to DGA UI are documented here.
The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and the project uses [Semantic Versioning](https://semver.org/).

## [Unreleased]

### Added

- Bun workspaces monorepo: `apps/docs` (Next.js 16 + Fumadocs) and `registry` (shadcn registry source).
- Biome for lint and format, TypeScript 5.9 strict, GitHub Actions CI (lint, tests, token check, registry build and diff, typecheck, docs build).
- Token generator (`bun run tokens`): builds `registry/styles/dga/tokens.css` and `theme.css` from `tokens/tokens.json` (Figma). It includes light and dark themes (`.dark` and `[data-theme="dark"]`, also on any subtree) and mobile-first responsive modes.
- Tailwind v4 theme: every DGA token in `@theme`, Figma-identical utilities (`text-text-primary`), short aliases (`text-primary`, `bg-body`, `border-primary`) and the shadcn variable mapping.
- Contrast audit: 466 foundation pairs are checked against WCAG 2.1 AA in both modes, and the build fails on any regression.
- Breakpoints sm 640, md 768, lg 1024, xl 1280, 2xl 1536 (px).
- `@dga` registry with `dga-style` (`registry:style`) and `font-ibm-plex-sans-arabic` (`registry:font`). Install with `npx shadcn@latest init https://dga.omqkhafi.dev/r/dga-style.json`.
- Registry build that inlines the `cn-*` style map into components (the shadcn base-style pipeline), ready for Phase 2.
- Docs: Introduction, Installation, Deviations from DGA, and foundation pages for Colors, Typography, Spacing, Radius, Shadows and Icons. Every preview has direction, theme and viewport toggles.
- Test that fails on physical left/right utilities or CSS anywhere in the registry or docs source.

### Changed (from DGA Figma; full list on the Deviations page)

- Fixed Figma naming typos: `line-hight` → `line-height`, `lavendar` → `lavender`, `diabled` → `disabled`, `lable` → `label`, `iable-container` → `label-container`. Physical names are now logical (`padding-left` → `padding-start`, `padding-left-right` → `padding-inline`).
- Fixed 42 light- and dark-mode contrast failures. These cover status fills, gold and lavender text, link hover/pressed/visited states, dark-mode links, icon colours and on-colour text. Added `--text-on-gold`.
- Body text sizes no longer shrink on mobile; display sizes follow the Figma modes.
- Dropped the legacy site-CSS radius set; `rounded-2xl` and above clamp to `radius-xl`. Dropped italic weight tokens (IBM Plex Sans Arabic has no italic).
