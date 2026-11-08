# Roadmap

Phases 0, 1 and 2 are done (0.1.0), the Phase 2.5 docs polish is in 0.1.1 and 0.1.2, the Arabic locale (Phase 2.6) is in 0.2.0, the forms (Phase 3) are in 0.3.0, the interactive components (Phase 4) are in 0.4.0, the AI Resources docs and the docs polish are in 0.4.1, 0.4.2 moves component installs to `components/dga` and fixes the Arabic 404, and 0.4.3 makes preview content follow the direction toggle, and 0.5.0 emits every colour as OKLCH and adds the navigation and data display components (Phase 5), and 0.6.0 adds the composite components (Phase 6), and 0.7.0 adds the first half of Phase 7 (overlays, inputs and the official-site strip); see [CHANGELOG.md](CHANGELOG.md).
Next: Phase 7 part 2 (0.7.1: navigation, layout and display), Phase 8 (Section blocks) and Phase 9 (Mobile components, as needed), then the Release.
Component specs for each phase are in `docs/design-system/components/`.

## Rules for every phase

These apply to every component, so they are not repeated in each phase.

- Built on Base UI. Stable `cn-*` classes in `registry/bases/base/ui`, mapped to DGA tokens in `registry/styles/style-dga.css`.
- Logical properties only. RTL and LTR are both checked in the docs previews.
- **Preview content follows the direction toggle** (0.4.3, replacing the 0.4.1 rule that previews follow the page language): RTL renders the Arabic sample content and LTR the English one, on `/en` and `/ar` pages alike. The default direction is the page's. Everything outside the preview frame (prose, headings, code, the toolbar and the example titles) stays in the page language. Every new example has both languages, and each direction is pure.
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

## Phase 3: Forms (done, 0.3.0)

- [x] **Field** (label with required or optional marker, helper text, error with icon), wrapping every control. No Figma spec, so it is derived from the label, helper and error parts of the input pages.
- [x] **Input**, **Textarea**, **Select** (DGA Dropdown Input), **Number Input**, **Search Box**, **Checkbox** (with indeterminate), **Radio** and Radio Group, **Switch**, **File Upload**.
- [x] Every state from the specs: default, hover, focus-visible, filled, read-only, disabled and error (success where the spec has it), all sizes, light and dark, RTL and LTR.
- [x] Number Input keeps digits left to right and isolated and normalises Arabic-Indic input to Western digits; File Upload has a keyboard-accessible drop zone, a file list with remove, progress and error states, and Arabic file names; Search Box has a clear button.
- [x] Audit for the `field-*`, `control-*` and `textarea-*` tokens, including non-text contrast of 3:1 for input boundaries (WCAG 1.4.11). Failures fixed and logged in Deviations.
- [x] A docs page per component in English and Arabic under "Forms", with a citizen service request form built from Field-based controls.

## Phase 4: Interactive on Base UI (done, 0.4.0)

- [x] **Dialog** (DGA Modal), **Drawer** (Slideout Menu), **Tooltip** (with the Help Icon), **Menu**, **Tabs**, **Accordion**, **Content Switcher**, **Toast** (Notification Toast), **Notification** and **Inline Alert**, each on a Base UI primitive with stable `cn-*` classes and DGA tokens, in light and dark.
- [x] Every state from the specs, focus-visible, and keyboard and ARIA behaviour per the WAI-ARIA patterns: focus trap and return in Dialog and Drawer, roving focus in Tabs, Menu and Content Switcher, live regions in Toast, Notification and Inline Alert.
- [x] RTL: the Drawer side flips with the direction, Menu submenus and Tooltip placement mirror, Tabs and Content Switcher arrow keys follow the direction (`AutoDirection`), and motion mirrors.
- [x] The contrast audit covers every new state; docs pages in English and Arabic under "Interactive"; registry items and install test; keyboard e2e for Dialog, Menu and Tabs in `/en` and `/ar`; Lighthouse on `/ar/docs/components/dialog`.
- [x] Also fixed in this phase: the Input, Textarea, Select, Number Input and Search Box state behaviour (underline from the centre, no outline, a visible pressed state, DGA colours) and the font weight tokens.

Follow-ups, not blocking Phase 4:

- [ ] **Tabs: the More tab** (an overflow menu on horizontal tabs). Tabs scroll sideways for now; the roadmap item is a built-in overflow menu composed from Menu.
- [ ] **Known gaps from DGA** (Deviations, unresolved): the read-only border and the lighter and darker fills at rest are below 3:1 (WCAG 1.4.11), kept as DGA draws them.

## Patch 0.4.3: Preview content follows the direction toggle (done, 0.4.3)

- [x] Inside a preview, the content language follows the direction toggle: RTL renders the Arabic sample content (`lang="ar"`) and LTR the English one (`lang="en"`), on `/en` and `/ar` pages. This replaces the 0.4.1 rule that previews follow the page language, under which an English page in RTL showed English text in an RTL layout.
- [x] The default direction stays tied to the page (English pages open in LTR, Arabic pages in RTL), so the default view does not change. Prose, headings, code, installation and usage text, the table of contents, the toolbar labels and the example titles stay in the page language.
- [x] One mechanism for every preview and example: the preview sets the frame's language from its direction (`contentLang`), and every example reads it. Missing Arabic strings added, and names, IDs and dates use natural Arabic forms in RTL.
- [x] Locale purity per direction: preview content is checked against its toggled language (no English words in RTL, no Arabic in LTR, same allowlist), in `bun run test` and `bun run test:e2e`, on an English and an Arabic page.

## OKLCH colour output (done, 0.5.0)

- [x] The source of truth stays the DGA Figma hex values in `scripts/tokens`. The token build emits every colour in the CSS output as `oklch()`: primitives, semantic tokens, the shadcn variable mapping and the shadow colours, in light and dark.
- [x] Round-trip check in `tokens:check`: every emitted `oklch()` value converts back to the exact source hex (8-bit sRGB). Any mismatch fails the build. Alpha values keep their exact opacity.
- [x] The contrast audit keeps working from the source values, so its results do not change.
- [x] The Colors, Deviations and Contrast pages show hex next to OKLCH, because designers and Figma work in hex.
- [x] This matches the `oklch()` format shadcn and Tailwind v4 use by default.
- [x] No visual change and no Deviations entries: the same colours in a different notation.

## Phase 5: Navigation and data display (done, 0.5.0)

- [x] **Breadcrumb**, **Pagination**, **Table of Content**, **Card**, **List** (with Structured List), **Table**, **Data Table** (TanStack Table on the DGA Table and Pagination, no DGA spec), **Rating**, **Progress** (linear and circular) and **Stepper** (DGA Progress Indicator and Radial Stepper), each on Base UI where a primitive exists, with stable `cn-*` classes and DGA tokens only.
- [x] Every state from the specs, RTL and LTR, light and dark, responsive: Breadcrumb and Stepper fold on narrow screens, Pagination has a compact form, Table and Data Table scroll sideways, and arrows, separators and fills mirror in RTL.
- [x] The contrast audit covers every state of every component. DGA's own bugs are fixed and logged in `scripts/tokens/fixes.ts` (the Deviations page): the upcoming step at 1.48:1, the gold Rating, the Table alternate row equal to the row, the Table hover that put the link below 4.5:1, a dark neutral Progress fill that was its own track, physical margins and hex colours in the List CSS, the Card border fallback, and the `upcomming` and `boarder` token typos.
- [x] Docs pages in English and Arabic under "Navigation and data display", registry items on the `components/dga` path, the install and collision tests, keyboard and RTL browser tests for Pagination, Stepper, Rating, Data Table, Breadcrumb and Table of Contents.

## Phase 6: Composite (done, 0.6.0)

- [x] **Header** (DGA Nav Header, Header Menu Item, Header Action, Nav Drawer): logo, main navigation with sub-menus on the DGA Menu (white or dark green panel, text, icon or boxed-icon links, one to four columns), actions, and search, language and user slots. A skip link, arrow keys that follow the direction, `aria-current`, and the navigation in the DGA Drawer below `lg`.
- [x] **Second Nav** (Second Nav Header): the 40px strip above the header with items, actions and a divider, gray or primary, with links and a current state added, and sideways scrolling on narrow screens.
- [x] **Footer**: gray or dark green, logos, description, social links, link columns that fold into the DGA Accordion below `sm`, contact, app badges, and the legal and copyright row.
- [x] **Date Picker**: a standalone Calendar and a field with a popup calendar. Gregorian and Hijri (Umm al-Qura, from `Intl`, with no date library), single date and range, min, max and disabled dates, dual-month view, quick options, a confirm step, typing, the secondary date, and a Field label, helper text and error. Grid semantics, arrow keys, Page Up and Down, Home and End, mirrored in RTL.
- [x] **Carousel**: slides, previous and next, dots (8, 12, 16px), autoplay with a pause button that respects reduced motion, swipe, arrow keys, the slide order of the page direction and accessible names.
- [x] **Filtration**: a panel of Checkbox, Radio, Select, Input and range groups, applied filters as removable Tags, clear all, a result count, controlled and uncontrolled, and the DGA Drawer below `lg`.
- [x] Each one reuses the existing `@dga` components (Button, Link, Menu, Drawer, Input, Select, Checkbox, Radio, Tag, Accordion, Content Switcher) and declares them as `registryDependencies`; every visible string is a prop with an English default.
- [x] The contrast audit covers every state in light and dark. DGA's own bugs are fixed and logged in `scripts/tokens/fixes.ts` (the Deviations page): the Nav Drawer selected label at 3.84:1, today's number in the Date Picker at 3.84 and 3.25:1, the dark range band at 1.53:1, two sets of conflicting date cell rules, opacity for disabled days, the Footer's hard-coded colours and 72px heading, and Carousel autoplay, dot size and left and right arrows.
- [x] Docs pages in English and Arabic under "Composite", registry items on the `components/dga` path, the install and collision tests (beside stock shadcn `carousel` and `calendar`), and keyboard and RTL browser tests for the Header (skip link, arrows, Menu, Drawer), Footer, Second Nav, Date Picker (both calendars checked against `Intl`), Carousel and Filtration.

## Phase 7: shadcn extension (components DGA does not define)

Covers only the shadcn components that have no DGA equivalent. Depends on Phases 3 to 6. Split in two releases: 0.7.0 (overlays, inputs and the official-site strip) and 0.7.1 (navigation, layout and display).

Rules for both parts:

- Each one is built like every other `@dga` item: Base UI where a primitive exists, the stable `cn-*` classes, DGA tokens only, RTL and LTR, light and dark, the contrast audit, docs in English and Arabic, the `components/dga` install path and the install test (with the collision fixture).
- **No new colours.** Derive from the existing DGA semantic tokens, and log any new token in Deviations as "new, no DGA source".
- **DGA wins where it has a component.** No shadcn duplicate ships for Dialog, Drawer (Sheet), Toast (Sonner), Tabs, Accordion, Tooltip, Menu (Dropdown Menu), Select, Checkbox, Radio, Switch, Input, Textarea, Field/Label, Badge, Avatar, Skeleton, Spinner, Divider (Separator), Inline Alert (Alert), Breadcrumbs, Pagination, Card, Table, Progress, Date Picker/Calendar and Carousel.
- **Marked as an extension.** Each page states clearly that the component is a Platform Code extension and not part of DGA, and how its look is derived from DGA tokens. The sidebar and the page header carry an "Extension" badge, and the [Extensions](apps/docs/content/docs/extensions.mdx) page lists every one.
- **The look follows the nearest DGA component:** popovers follow Menu and Tooltip, inputs follow the Input field states, toggles follow Button, command and combobox lists follow Menu and Select.

### Phase 7, part 1: overlays, inputs and the official-site strip (done, 0.7.0)

- [x] **Overlays:** Popover, Hover Card, Alert Dialog and Context Menu.
- [x] **Inputs:** Toggle, Toggle Group, Combobox (single, multiple and creatable), Command, Input OTP, Input Group and Button Group.
- [x] **DGA-defined, so not extensions:** the **Slider** (single and range) has a DGA specification (`docs/design-system/components/slider.md`) that Phases 3 to 6 had not built, and the **Digital Stamp** is the DGA specification of the Saudi government "official website" strip (`digital-stamp.md`: the expandable strip above the Header and its domain Extension panel). Both follow the DGA specs, are listed under Forms and Composite, and carry no Extension badge. The Header takes the stamp in a `stamp` slot.
- [x] **Checked against the shadcn registry and the existing `@dga` items before building**, with these decisions (every drop or merge is also recorded in the CHANGELOG):
  - **Alert Dialog** stays a separate item, not a Dialog variant: it has a different role (`alertdialog`), cannot be dismissed by clicking outside, and puts focus on the safe action. It reuses the Dialog classes and Button.
  - **Command** is not merged into Combobox: Combobox stores a form value, Command runs actions (a palette with groups and shortcuts). They share the list look (Menu and Select), and Command is built on the Base UI Autocomplete, so there is no `cmdk` dependency.
  - **Input OTP** is built on the Base UI OTP Field, so there is no `input-otp` dependency.
  - **Input Group** and **Button Group** stay: Input already has icon slots, but not text, button and key addons in one field; Button Group joins actions, which Content Switcher (choose a view) and Toggle Group (keep a state) do not.
  - **Dropped, because the DGA or an existing item already covers it:** none of the eleven extensions was dropped; Slider and the stamp moved out of "extension" because DGA defines them.
- [x] Each page in English and Arabic with previews of every variant and state, contrast pairs for every state, install and collision tests, and keyboard and RTL browser tests for Slider, Input OTP, Combobox, Command, Context Menu and Toggle Group.

### Phase 7, part 2: navigation, layout and display (planned, 0.7.1)

Candidates (confirm against the current shadcn registry at the start of the part, and drop anything the DGA components already cover):

- Navigation: Menubar, Navigation Menu, Sidebar.
- Layout: Collapsible, Scroll Area, Resizable, Aspect Ratio.
- Display: Kbd, Empty, Item, Chart (using the DGA chart tokens).

## Phase 8: Section blocks

Reusable `registry:block` section items only. Users compose their own pages: no full-page templates and no example or composed pages. Depends on Phases 3 to 7. Header, Footer and Second nav stay in Phase 6.

- **Overlays:** `cookies-banner`, `page-feedback`, `service-rating`, `chatbot-panel`, `announcement-banner`.
- **Heroes and headers:** `hero` (image, colour, with search and chips, multi-slide, seasonal) and `page-header`.
- **Content sections:** `cards-grid`, `stats-section`, `faq-section`, `content-section`, `sitemap-section`, `org-structure`, `policy-list`, `budget-table`.
- **Service and life journey:** `service-header`, `service-steps`, `service-meta-card`, `journey-overview`, `journey-steps`.
- **Forms and contact:** `multi-step-form`, `contact-form`, `contact-info`.
- **Search and errors:** `search-results`, `error-state`.
- **Out of scope:** full page templates, composed example pages, Header and Footer, login and auth (DGA has no template), and seasonal pages as separate products (use the `hero` and `cards-grid` variants instead).

## Phase 9: Mobile components (as needed)

Tab Bar, Navigation Bar, Banner, from the DGA Mobile Components Figma file.

## Release

- Arabic review by a native-speaking reader of every page (the translations are written, not yet externally reviewed).
- Accessibility audit: axe in CI, plus manual screen-reader passes (VoiceOver, NVDA) in Arabic and English.
- Visual regression tests for previews in every direction, theme and viewport.
- 1.0 release.

<!-- ci timing test -->
