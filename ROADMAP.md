# Roadmap

Phases 0 and 1 (infrastructure and foundations) are done; see [CHANGELOG.md](CHANGELOG.md).
Component specs for each phase are in `docs/design-system/components/`.

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

- Accessibility audit: axe in CI, plus manual screen-reader passes (VoiceOver, NVDA) in Arabic and English.
- Visual regression tests for previews in every direction, theme and viewport.
- 1.0 release.
