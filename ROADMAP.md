# Roadmap

Phases 0 and 1 (infrastructure and foundations) are done; see [CHANGELOG.md](CHANGELOG.md).
Phase 2 is agreed. Phases 3–8 are a **proposal**, grouped from the DGA component specs in
`docs/design-system/components/`, and may change.

## Rules for every phase

These apply to every component, so they are not repeated in each phase.

- Built on Base UI. Stable `cn-*` classes in `registry/bases/base/ui`, mapped to DGA tokens in `registry/styles/style-dga.css`.
- Logical properties only. RTL and LTR are both checked in the docs previews.
- **Contrast check extended for each component as it lands.** Every state of the component (default, hover, pressed, selected, focused) is added to the audit in `scripts/tokens/model.ts`. Failures are fixed and logged in Deviations.
- A docs page for each component: a preview (direction, theme and viewport toggles), usage, props and accessibility notes.
- Covered by the install test. CHANGELOG and Deviations are updated.

## Phase 2: Button and registry structure

Agreed scope:

- [ ] **`registry:base` item**, so `shadcn init` sets `iconLibrary: "hugeicons"`, `rtl: true` and the DGA style in `components.json`.
- [ ] **Split tokens out of `dga-style`** (currently about 190 KB) into a separate item, for example `dga-tokens`, so the style item stays small and tokens can be installed on their own.
- [ ] **Button**: Primary, Primary-Neutral, Secondary (solid and outline, plus on-colour), Subtle and Transparent, plus Destructive Primary, Subtle and Transparent. Sizes sm 24px, md 32px and lg 40px. Icon-only, leading and trailing icons, and all six states.
- [ ] Contrast audit for the `button-*` tokens.
- [ ] **`palettes.tsx` swatch text:** take the white and black (`#ffffff` / `#161616`) from tokens instead of hardcoding them.

### Docs site look and navigation

- [ ] **Look:** 100% DGA identity in light and dark (colours, type, radius, focus ring).
- [ ] **Navigation layout follows the owner's other sites:**
  - Top tabs: README / DOCS / CHANGELOG.
  - Numbered sidebar with ⌘K search.
  - "On this page" table of contents.
  - "Copy page" button.
  - Changelog page rendered from `CHANGELOG.md`.
  - `llms.txt`.
  - OG images.
- [ ] Monospace for code only.

## Phase 3: Forms and inputs (proposed)

Text input, Textarea, Number input, Dropdown input (select and combobox), Search box, Checkbox, Radio, Switch, Slider, Date picker (Gregorian and Hijri), File upload, and a Field wrapper for label, helper and error text.

- Audit for the `field-*`, `control-*` and `textarea-*` tokens. This includes non-text contrast of 3:1 for input boundaries, as WCAG 1.4.11 requires.

## Phase 4: Feedback and status (proposed)

Inline alert, Notification, Notification toast, Tooltip, Modal, Progress bar (linear and circular), Progress indicator, Loading and Spinner, Skeleton, Rating.

## Phase 5: Content and data display (proposed)

Card, Accordion, Tabs, Content switcher, Tags, Chip, Badge, Avatar (and group), Featured icon, Divider, List, Structured list, Table and Data table, Quote, Code snippet, Metric, Carousel, Charts (tokens and colour palette).

## Phase 6: Navigation and UI shell (proposed)

Link, Breadcrumb, Pagination, Menu, Slide-out menu, Filtration, Radial stepper, Floating button, and the UI shell: Nav header, Second-level nav header, Nav drawer, Footer, Table of content. Also the Digital stamp (the unified-platform verification mark).

## Phase 7: Templates and blocks (proposed)

`registry:block` items for the DGA templates: Home, Service page, Form page, Content page, Search, FAQ, Help, Contact us, About, Sitemap, 404, Feedback and rating section ("Was this page helpful?"), Cookies banner. Mobile variants come from the Mobile Components Figma file.

## Phase 8: Hardening and 1.0 (proposed)

- Accessibility audit: axe in CI, plus manual screen-reader passes (VoiceOver, NVDA) in Arabic and English.
- Visual regression tests for previews in every direction, theme and viewport.
- Registry extras: MCP and "Open in v0", and the registry index and search.
- Versioning and release process, and the production deployment of dga.omqkhafi.dev.
- 1.0 release.
