# Roadmap

Phases 0, 1 and 2 are done (0.1.0), the Phase 2.5 docs polish is in 0.1.1 and 0.1.2, and the Arabic locale (Phase 2.6) is in 0.2.0; see [CHANGELOG.md](CHANGELOG.md).
Component specs for each phase are in `docs/design-system/components/`.

## Rules for every phase

These apply to every component, so they are not repeated in each phase.

- Built on Base UI. Stable `cn-*` classes in `registry/bases/base/ui`, mapped to DGA tokens in `registry/styles/style-dga.css`.
- Logical properties only. RTL and LTR are both checked in the docs previews.
- **Contrast check extended for each component as it lands.** Every state of the component (default, hover, pressed, selected, focused) is added to the audit in `scripts/tokens/model.ts`. Failures are fixed and logged in Deviations.
- A docs page for each component: a preview (direction, theme and viewport toggles), usage, props and accessibility notes.
- **English and Arabic ship together.** A component phase is not done until its docs page exists in both languages (`name.mdx` and `name.ar.mdx`, with the English `sourceHash` recorded by `bun run translations:stamp`), its `descriptionAr` entries exist for every prop (`scripts/api-descriptions-ar.ts`), and `bun run translations:check` passes. New UI strings go into both dictionaries.
- Covered by the install test. CHANGELOG and Deviations are updated.

## Phase 2: Button, simple components and registry structure (done, 0.1.0)

Agreed scope:

- [x] **`registry:base` item**, so `shadcn init` sets `iconLibrary: "hugeicons"`, `rtl: true` and the DGA style in `components.json`.
- [x] **Split tokens out of `dga-style`** (currently about 190 KB) into a separate item, for example `dga-tokens`, so the style item stays small and tokens can be installed on their own.
- [x] **Button**: Primary, Primary-Neutral, Secondary (solid and outline, plus on-colour), Subtle and Transparent, plus Destructive Primary, Subtle and Transparent. Sizes sm 24px, md 32px and lg 40px. Icon-only, leading and trailing icons, and all six states.
- [x] Contrast audit for the `button-*` tokens.
- [x] **Also shipped:** Spinner, Link, Badge, Tag and Status Tag, Divider, Avatar, Featured Icon and Skeleton.
- [x] **`palettes.tsx` swatch text:** take the white and black (`#ffffff` / `#161616`) from tokens instead of hardcoding them.

### Docs site look and navigation

- [x] **Look:** 100% DGA identity in light and dark (colours, type, radius, focus ring).
- [x] **Navigation layout follows the owner's other sites:**
  - Top tabs: README / DOCS / CHANGELOG.
  - Numbered sidebar with ⌘K search.
  - "On this page" table of contents.
  - "Copy page" button.
  - Changelog page rendered from `CHANGELOG.md`.
  - `llms.txt`, `llms-full.txt` and every page as Markdown.
  - Sitemap and robots.
  - OG images.
- [x] Monospace for code only.

## Phase 2.5: Docs polish (done, 0.1.1)

- [x] One structure for every component page, with a generated API reference and a single collapsed contrast table (plus `/docs/contrast`).
- [x] Typography and contrast of the docs UI chrome, audited like the components.
- [x] Previews (skeleton, lazy load, fullscreen, reset, device frames), code blocks, prebuilt search, props tables.
- [x] Dark theme rebuilt on a tinted neutral ramp, with a side-by-side comparison page.
- [x] Home page, mobile shell, focus rings, reduced motion.
- [x] Lighthouse budget in CI.

## Phase 2.6: Arabic locale (done, 0.2.0)

This reverses the earlier decision to publish the docs in English only.

- [x] `/en` and `/ar` routing (English default, `hideLocale: never`), language switcher, `<html lang dir>`, `hreflang` (with `x-default`) and a sitemap per locale.
- [x] Locale persistence: the switcher writes the `dga_locale` cookie (SameSite=Lax, path `/`, one year). For a URL without a language, `proxy.ts` uses the cookie, then `Accept-Language`, then English. Covered by `bun run test:e2e`.
- [x] UI strings in both languages for the whole shell.
- [x] Arabic pages for home, Getting Started, Foundations, Contrast and the nine component pages.
- [x] Search index per locale with Arabic normalisation.
- [x] Arabic Open Graph images, `llms.txt` and Markdown export per locale.
- [x] Translation drift check in CI.
- [x] Product name: Platform Code / كود المنصات, with the DGA logo icon as the lockup in both languages.
- [x] Header and docs layout follow the shared omqkhafi docs layout (lockup pane, three equal tabs, theme, language, GitHub).
- [x] Arabic typography rules and the numerals convention, documented on the Typography page.

## Phase 3: Forms

Input, Textarea, Checkbox, Radio, Switch, Select, Number Input, Search Box, File Upload, Field (label, helper text, error).

- Audit for the `field-*`, `control-*` and `textarea-*` tokens. This includes non-text contrast of 3:1 for input boundaries, as WCAG 1.4.11 requires.

## Phase 4: Interactive on Base UI

Dialog, Drawer, Tooltip, Menu, Tabs, Accordion, Content Switcher, Toast, Notification, Inline Alert.

## Phase 5: Navigation and data display

Breadcrumbs, Pagination, Table of Content, Card, List, Table, Data Table, Rating, Progress, Stepper.

## Phase 6: Composite

Header with slide-out menu, Footer, Date Picker (Hijri and Gregorian), Carousel, Filtration.

## Phase 7: Page templates as blocks

`registry:block` items: Home, Service, Form, FAQ, Contact, 404, Cookies banner, Rating.

## Phase 8: Mobile components (as needed)

Tab Bar, Navigation Bar, Banner, from the DGA Mobile Components Figma file.

## Release

- Arabic review by a native-speaking reader of every page (the translations are written, not yet externally reviewed).
- Accessibility audit: axe in CI, plus manual screen-reader passes (VoiceOver, NVDA) in Arabic and English.
- Visual regression tests for previews in every direction, theme and viewport.
- 1.0 release.
