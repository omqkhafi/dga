# Changelog

All notable changes to Platform Code are documented here.
The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and the project uses [Semantic Versioning](https://semver.org/).

## [Unreleased]

## [0.7.7] - 2026-11-09

Patch: the Header Nav Drawer Item follows the Figma and DGA site states, and the Nav Drawer takes your own header and footer parts.

### Added

- **Header, Nav Drawer header and footer:** `HeaderDrawerHeader` and `HeaderDrawerFooter`, parts you put inside the Header, take any content for the top (in place of the visible title) and the bottom edge of the Nav Drawer. `HeaderLogo` is a ready-made logo link (`src` and `alt`, or your own `children`) for the bar's `logo` and the drawer header. The drawer keeps `drawerTitle` as its hidden accessible name. New example "Nav Drawer header and footer".
- **Header, Nav Drawer Item:** a link or sub-link takes `badge` (for example "+99"), shown at the end of the item in the Nav Drawer (the DGA Nav Drawer Item badge); a nav item takes `divider`, which draws a line above it in the Nav Drawer (the DGA Divider item). Neither shows in the bar. The Header now installs the Badge with it.

### Changed

- **Header, Nav Drawer Item:** the item follows the Figma Nav Drawer Item states. Hovered, pressed and selected show a 6px by 24px rounded bar at the start edge (mirrored in RTL): `icon-default-500` hovered, `icon-default` pressed and `icon-primary` selected; focused shows only the 2px outline. The selected item has a brand icon as well as the brand label, and keeps its fill when hovered or pressed. A selected, disabled item drops the fill and shows a muted bar. Disabled icons and chevrons are greyed.
- **Header, Nav Drawer Item:** a 16px icon (was 20px); the divider is inset 16px on each side; Level 2 labels and sub-headings now line up with the Level 1 label (40px from the start edge instead of 32px).

### Tests

- The composite browser group checks the Nav Drawer Item: 36px high, the Level 1 and Level 2 labels on the same line, the divider inset 16px, the 6px by 24px state bar, the badge, and the Drawer header and footer (`HeaderDrawerHeader`, `HeaderDrawerFooter`) with the drawer still named, in both directions.

## [0.7.6] - 2026-11-09

Patch: the Header sub-menu gets the With Tag item, label states and a full-width panel.

### Added

- **Header:** `submenuWidth` (`"content"`, the default, or `"full"`). `"full"` makes the sub-menu a panel as wide as the header, directly under the bar, with its columns lined up with the bar's content (the 1280px width, or the whole bar with `fullWidth`). A nav item can override it with its own `submenuWidth`. New examples "Full-width sub-menu" (white and dark green).
- **Header:** a sub-menu link takes `tag` (for example "New"): the DGA Header Sub-menu Item With Tag, drawn with the Tag component (success on white, on-colour on dark green). Level 2 links in the Nav Drawer show it too. The Header now installs the Tag with it.

### Changed

- **Header:** the sub-menu link label is underlined when hovered, pressed or focused, as in the Figma Header Sub-menu Item states.

## [0.7.5] - 2026-11-09

Patch: Second Nav follows the Figma strip more closely, and the Header navigation can be centred.

### Added

- **Header:** `navPosition`: `"start"` (the default, next to the logo, as in DGA) or `"center"`, which puts the navigation in the middle of the bar from `lg` with the logo at the start and the actions at the end. Below `lg` the navigation is in the Drawer either way. Logged in Deviations; new example "Navigation in the centre".

### Changed

- **Second Nav:** the vertical "|" divider between the items and the actions is gone (Figma has none; its "divider" is the line under the Gray strip, which the Gray strip now has). The strip is two parts, the items at the start and the actions at the end, spread apart.
- **Second Nav:** items are smaller and centred: Text sm (14px) instead of Text md, with 16px icons, 24px high and centred on the 40px strip in every language (an Arabic line-height no longer pushes them off-centre).
- **Docs:** the Second Nav previews no longer leave empty space under the strip.

### Removed

- **Second Nav:** the `divider` prop. Remove it from your code; the divider no longer exists.

### Tests

- The composite browser group checks that the Second Nav has no divider, 14px text, items centred on the strip and the two parts at the two ends, and that the Header navigation is in the centre with `navPosition="center"` and next to the logo by default, in both directions.

## [0.7.4] - 2026-11-08

Patch: two Header fixes found by looking at the published 0.7.3 previews.

### Fixed

- **Header, phone layout:** the overflow (…) button is on the start side and the menu button on the end side, mirrored in RTL, as in the Figma Nav Header frames (0.7.3 had them the other way round); the overflow menu opens aligned to its button.
- **Header, indicator bar:** the bar under the selected item now matches the DGA header: 6px high, inset 8px from each side, fully rounded (it was a 4px square full-width bar). The selected bar stays `primary-sa-flag-200` (3:1 or more on the block in every state and mode; DGA's `primary-400` is 2.10:1, so the colour is a logged contrast correction). An unselected item shows the bar on hover (`icon-default-500`) and when pressed or open (`icon-default`), and only the outline when focused (Figma); DGA's `neutral-400` and `neutral-800` bars were 2.28:1 and 1.00:1 (dark pressed). A selected, disabled item shows a muted bar (`neutral-100`). All bar pairs are in the Contrast audit.
- **Header:** a selected item that is also disabled (`aria-current="page"` with `disabled` or `aria-disabled`) drops the brand block but kept its white label, so the label was invisible on the white bar and only the muted bottom bar showed. It now uses the disabled text and icon colours, in `Header` items and `HeaderAction`. This showed in the "Selected, disabled" examples of Menu items and Action states.

### Tests

- The composite browser group checks that a selected, disabled Header item has a label that is not white, the bar's height, inset and radius, the sides of the phone buttons, and the Menu item behaviour in both directions (no bar at rest, a bar on hover, a darker one when pressed, outline only when focused, disabled items skipped by Tab). Contrast: the bar pairs are in the audit.

## [0.7.3] - 2026-11-08

Patch: DGA conformance fixes from a side-by-side review of Figma, the DGA docs and the site. What was and was not checked against Figma is in [docs/conformance/0.7.3.md](docs/conformance/0.7.3.md); the Figma connector was unavailable, so the values listed there as unverified follow the findings and the earlier Figma dumps.

### Added

- **Header:** Selected is a full-height brand block with a lighter bottom bar; five states (default, hovered, pressed, focused, disabled with a muted bar); optional leading icon and chevron. `HeaderAction` has Inline, Top, Text only and Icon only layouts. On phones the menu opens the Nav Drawer, the logo is centred and an overflow (...) menu takes the actions, mirrored in RTL (`moreLabel`).
- **Second Nav:** `SecondNavItem` (default and on-colour), ready-made `kind` items (weather, date, time, location) and icon-only actions.
- **Footer:** Social Media and Accessibility Tools blocks (`social`, `accessibilityTools`), a bottom row of underlined links (`bottomLinks`), white platform-logo tile.
- **Accordion:** `variant="white" | "filled"`; closed heights of 56, 48 and 40px.
- **Digital Stamp:** DGA banner wording, a Saudi flag mark, circular green-outlined domain and HTTPS items, a registration card (`registrationNumber`, `registrationHref`) and a text for each of the six domains.
- **Rating:** `allowHalf`, half-star keyboard and fractional read-only values, pressed and selected states.
- **Slider:** `showMinMax`, `minLabel`, `maxLabel`; Value and Min/Max are documented as DGA parts.
- **Breadcrumb:** `compact`, the back link to the previous level.
- **Tabs:** `TabsList overflow="menu"` with a More menu (Tabs now depends on Menu).
- **Date Picker:** a year dropdown in the calendar header (`yearDropdown`).
- **Filtration:** searchable options, Show more, date, rating and custom groups, and `placement` (inline, start, end, center).
- **Docs:** `docs/conformance/0.7.3.md`; separate titled previews for Divider, Avatar and Spinner variants.

### Changed

- **Footer:** the accordion on small screens is the optional `collapsible` prop (off by default); the default preview shows DGA parts only, and the description, contact and app badges stay optional (`footer-optional`).
- **Header:** the default preview shows only the logo, the navigation links and the actions; search, bell and help are one labelled optional example.
- **Second Nav:** the links row is kept as an optional, labelled example, not a DGA part.
- **Chart:** DGA defines charts, so Chart is no longer an Extension: the label, badge and "derived from" note are gone and its colour corrections are logged under Components. A donut (hole) pie was added.
- **Digital Stamp:** `registrationTitle` and `registrationText` are replaced by the registration card props.
- **Docs, all component pages:** the separate RTL section is removed in English and Arabic (the preview already has the LTR/RTL toggle); each page keeps its directional note as one line in Usage or Anatomy. Previews are centred at their natural width instead of sitting at one side.
- **Textarea:** the Anatomy text now agrees with Accessibility about the state wrapper.

### Fixed

- **Second Nav:** the screen-reader labels of icon-only items no longer widen the page when the strip scrolls (the strip is now the containing block of its hidden labels).
- Docs claims that contradicted DGA ("whole stars only", Slider Value and Min/Max "not in the specification", Digital Stamp "no DGA source") are gone, and the Deviations entries are rewritten.

### Tests

- New `scripts/docs-structure.test.ts` fails if a component page gets an RTL section again. The checks that expected the RTL section and the direction comparison were removed.

## [0.7.2] - 2026-11-08

Patch: extensions move into the sidebar sections of the DGA components, and the ROADMAP is restructured. No component changes.

### Changed

- **Sidebar:** the five "Extension: ..." groups are gone, in English and Arabic. Every extension now sits in its natural section, right after the DGA component it is closest to, and keeps its Extension badge at the end of the item and the badge and "derived from" note in its page header:
  - **Components** (ungrouped): Button Group after Button.
  - **Forms:** Input Group and Input OTP after Input, Combobox after Select, Toggle and Toggle Group after Switch (Slider was already here).
  - **Interactive:** Alert Dialog after Dialog, Popover and Hover Card after Tooltip, Context Menu after Menu, Command after Context Menu.
  - **Navigation and data display:** Menubar, Navigation Menu and Sidebar after Table of Contents, Item after List, Chart and Empty after Data Table, Kbd at the end.
  - **Layout** (new section, Arabic التخطيط): Collapsible, Scroll Area, Resizable and Aspect Ratio. No existing section holds layout primitives (Composite is the page-level Header, Footer and Date Picker group), so one was added.
  - **Composite:** unchanged.
- Search breadcrumbs, `llms.txt` and the sitemap follow the same grouping through one `componentSection()` helper; the five `search.crumb.ext*` strings are replaced by `search.crumb.layout`. The Extensions page stays as a reference list, not a sidebar section.
- **ROADMAP:** 0.7.2 is marked done; the Section blocks phase is split into one minor version per group (0.8.0 Overlays, 0.9.0 Heroes and headers, 0.10.0 Content sections, 0.11.0 Service and life journey, 0.12.0 Forms and contact, 0.13.0 Search and errors), Mobile components move to 0.14.0, and the intro, phase numbering and README cross-references are updated.

### Tests

- New `scripts/sidebar-sections.test.ts` checks both `meta` files against `nav.ts` and that no Extension section remains. No browser test relied on the old grouping.

## [0.7.1] - 2026-11-08

Phase 7, part 2: navigation, layout and display. Eleven more Platform Code extensions (components DGA does not define), each with the Extension badge and the "derived from" note, English and Arabic pages with previews of every variant and state, API references with Arabic descriptions, contrast tables, registry items that declare the `@dga` items they use, and install and collision tests.

### Added

- **Navigation:** **Menubar** (Base UI Menubar; the Menu look; submenus open on the end side), **Navigation Menu** (Base UI Navigation Menu; Menu and Header navigation look; links with `aria-current`) and **Sidebar** (collapsible to an icon-only rail with tooltips, the mobile form in the Drawer, nested groups on the Collapsible, an active state, an open state persisted in a cookie, `side` that mirrors in RTL, Ctrl/Cmd+B).
- **Layout:** **Collapsible** (its own item; Card's Expandable now depends on it), **Scroll Area** (focusable viewport, scrollbar on the end side), **Resizable** (keyboard resize, mirrored in RTL) and **Aspect Ratio**.
- **Display:** **Kbd**, **Empty**, **Item** and **Chart** (bar, line, area and pie on Recharts with tooltip, legend, a data-table fallback, and the X axis reversed with the Y axis on the right in RTL).
- **Docs and tests:** the new groups in the sidebar, search, `llms.txt`, the sitemap, Open Graph images, the agent skill and the Extensions page; `scripts/ci/e2e-map.json` covers the new items; the install test installs them and checks the pinned versions; the collision fixture keeps stock shadcn `menubar`, `navigation-menu`, `sidebar`, `collapsible`, `scroll-area`, `resizable`, `aspect-ratio`, `kbd`, `empty`, `item` and `chart` byte-identical; browser tests cover keyboard and RTL for Menubar, Navigation Menu, Sidebar, Resizable and Chart.

### Scope decisions

Each candidate was checked against the shadcn registry and the existing `@dga` items.

- **Merged:** Collapsible is exposed as its own item and Card's Expandable is built on it, so the code is not duplicated. Kbd is the one key-cap element; `InputGroupKbd` now wraps it with identical styling.
- **Kept separate:** `CommandShortcut` (plain trailing text, not a cap); Navigation Menu beside the Header (standalone primitive versus site composite); Sidebar beside the Header Nav Drawer and Second Nav (app navigation); Empty beside Data Table's empty state (Data Table unchanged); Item beside List and Card.
- **Dropped:** none of the eleven. shadcn's Sidebar rail handle is not built (the icon rail is `collapsible="icon"`).

### Dependencies

- `recharts@3.8.0`, the version shadcn's chart item pins, and its peer `react-is@19.3.1`, only with Chart.
- `react-resizable-panels@4.14.8`, only with Resizable: the newest stable release at least two weeks old, with the Group, Panel and Separator API shadcn uses (4.20.0 is two days old). It has no RTL support, so Resizable lays out left to right and mirrors the panel order and keys itself; the page documents the reading order.

### Deviations

New entries under Extensions, all "new, no DGA source": Menubar, Navigation Menu, Sidebar, Collapsible, Scroll Area (thumb in `text-secondary-paragraph`), Resizable (and its right-to-left layout), Aspect Ratio, Kbd, Empty, Item, Chart, and four new tokens `chart-series-1` to `chart-series-4` (no pair of existing semantic colours is 3:1 from its neighbour). The Chart tooltip uses `background-card`, not `background-menu`, which fails 3:1 for two series in dark mode.

### Changed

- **CI:** when a newer push cancels a pull request run, the browser checks report and the `CI result` job are skipped instead of reporting red on the superseded commit. A failed job still fails `CI result`.
- CI runs only what a pull request can affect and runs the browser checks in parallel shards; the full suite still runs on every push to main. See CONTRIBUTING.md.

## [0.7.0] - 2026-11-08

Phase 7, part 1: overlays, inputs and the official-site strip. No visual change to existing components, and no new dependency (no `cmdk`, no `input-otp`: Base UI covers both).

### Added

- **Platform Code extensions** (components DGA does not define), each marked with an "Extension" badge in the sidebar and the page header and a note at the top of its page that says it is not part of DGA and which DGA components and tokens its look comes from. English and Arabic pages with previews of every variant and state, API references with Arabic descriptions, contrast tables, registry items that declare the `@dga` items they use, and install and collision tests.
  - **Overlays:** **Popover** (the Menu surface with the Tooltip beak, start and end sides that mirror), **Hover Card** (opens on hover and on keyboard focus, hoverable and dismissible), **Alert Dialog** (role `alertdialog`, focus on Cancel, no outside dismissal, destructive action) and **Context Menu** (right click, Shift+F10, the Menu key and long press; submenus open on the end side).
  - **Inputs:** **Toggle** and **Toggle Group** (Button styles, single or multiple, roving focus that follows the direction), **Combobox** (single, multiple with removable chips, creatable, groups, async, Arabic-aware search, inside Field), **Command** (a palette of actions on the Base UI Autocomplete, with a dialog form), **Input OTP** (digits stay left to right in RTL, Arabic-Indic digits normalised, paste), **Input Group** (text, icon, button and key addons) and **Button Group**.
- **Components DGA does define**, built from its specs (no Extension badge): **Slider** (single and range, sm and md, label, helper text and error, fill and keys mirror in RTL; listed under Forms) and **Digital Stamp**, the Saudi government "official website" strip with its domain Extension panel (listed under Composite). The Header takes it in a new `stamp` slot above `top`.
- **Extensions page** (`/docs/extensions`) and an **Extensions** area on the Deviations page.
- **Docs:** two sidebar groups, "Extension: overlays" and "Extension: inputs", in search, `llms.txt`, the sitemap, Open Graph images and the agent skill.
- **Tests:** unit tests for each stream; the install test installs the new items on their own and checks that no `cmdk` or `input-otp` package arrives; the collision fixture puts the stock shadcn `popover`, `hover-card`, `alert-dialog`, `context-menu`, `toggle`, `toggle-group`, `combobox`, `command`, `input-otp`, `input-group`, `button-group` and `slider` in `components/ui` and checks they stay byte-identical; browser tests cover keyboard and RTL for Slider, Input OTP, Combobox, Command, Context Menu and Toggle Group, and every new page at 375 and 1280px.

### Scope decisions

Each candidate was checked against the shadcn registry and the existing `@dga` items before building.

- **Slider and the official-site strip are not extensions.** DGA specifies both (`slider.md`, `digital-stamp.md`), so they follow the specs. The earlier Deviations entry that said DGA had no official site strip is corrected.
- **Alert Dialog stays separate from Dialog** (different role, no outside dismissal, focus on the safe action); it reuses the Dialog classes and Button.
- **Command is not merged into Combobox** (Combobox stores a value, Command runs actions); they share the matching function and the list look. **Creatable** is a Combobox mode, our addition: shadcn has none.
- **Input Group and Button Group stay**: Input has only icon adornments, and Content Switcher and Toggle Group are different jobs.
- **Dropped:** none of the eleven candidates; no `cmdk` or `input-otp` dependency.

### Deviations

New entries under Extensions or Components, all "new, no DGA source": Popover, Hover Card, Alert Dialog, Context Menu, Combobox (and its creatable mode), Command and the Toggle pressed border (a 1px `--border-black`, an existing token, because the selected fill is 1.2:1 against the page), plus the Slider track and thumb (derived from the Switch tokens, the spec has none) and the Digital Stamp wording and flag icon. No new colour tokens.

### Changed

- **ROADMAP.md:** Phase 7 is split into 0.7.0 (done) and 0.7.1 (navigation, layout and display, planned).
- **Locale allowlist:** adds the words the new Arabic pages need.

## [0.6.0] - 2026-11-08

The composite components (Phase 6): Header, Second Nav, Footer, Date Picker, Carousel and Filtration. No visual change to existing components, and no new dependency.

### Added

- **Composite components (Phase 6):** six components in `components/dga`, each with English and Arabic pages, previews of every variant and state, an API reference with Arabic descriptions, contrast tables, registry items that declare the `@dga` items they use, and install tests. Every visible string is a prop with an English default, and the docs show Arabic examples.
  - **Header:** the DGA Nav Header. A logo slot, the main navigation as `items` (a link, or a button that opens a sub-menu when it has `sections`), actions (`HeaderAction`: inline or icon above, icon-only), and `search`, `language`, `user` and `top` slots. The sub-menu is the DGA Menu, with one to four columns, a white or dark green panel (`submenuTone`) and text, icon or boxed-icon links (`linkStyle`). A skip link is the first tab stop; Left and Right (swapped in RTL), Home and End move between items; the current page has `aria-current="page"`. Below `lg` the navigation moves into the DGA Drawer with expandable parents. The bar is centred at 1280px or full width.
  - **Second Nav:** the DGA Second Nav Header strip, 40px, gray or primary, with items, actions and a divider. An entry is text, a link or a button and can be the current page. On narrow screens it scrolls sideways instead of wrapping.
  - **Footer:** gray or dark green. Logos and partner logos, a description, social links, link columns, contact details, app badges, and a row with the legal links and the copyright. Below `sm` the columns fold into the DGA Accordion.
  - **Date Picker:** a standalone `Calendar` and a `DatePicker` field with a popup calendar. Gregorian and Hijri (Umm al-Qura) with a switch, from `Intl` (`islamic-umalqura`, years 1300 to 1600 AH): no date library is added. Dates are Gregorian ISO strings, so a value does not depend on the time zone. Single date and range, `min`, `max` and `isDateDisabled`, a dual-month view, quick options, a Cancel and Apply step, the secondary date (the day of the other calendar), typing `YYYY-MM-DD` with any digits, `numerals="arab"` for Arabic-Indic digits, and a Field label, helper text and error. Each month is a `role="grid"`; arrow keys (Left and Right swap in RTL), Page Up and Down, Shift with them for the year, Home and End, and Enter or Space.
  - **Carousel:** slides with previous and next, dots (8, 12 or 16px in a 24px target), arrows (32, 40 or 48px, primary or subtle), autoplay with a pause button that stops while the pointer or focus is inside and never starts under `prefers-reduced-motion`, swipe on touch, arrow keys, and the slide order, arrow mirroring and swipe direction of the page direction. Slides that are not visible are `aria-hidden` and `inert`.
  - **Filtration:** a panel of checkbox, radio, select, input and range groups, applied filters as removable Tags, clear all, and a result count. Controlled (`value`) and uncontrolled (`defaultValue`). From `lg` the panel sits beside the results; below it a button opens the same panel in the DGA Drawer.
- **Docs:** a "Composite" group in the sidebar, search, `llms.txt` and the index page, in both languages. The Header and Footer previews render at the frame's width, so the viewport toggle shows the desktop bar, the mobile Drawer and the Accordion. The sitemap, the Open Graph images and `llms.json` include the new pages, and the `platform-code` agent skill describes the new components.
- **Tests:** `bun run test` covers the Hijri calendar (every month from 1350 to 1550 AH round-trips and has 29 or 30 days, known Ramadan dates), the month grids, typed dates, the swipe direction, the applied filters, the registry items and their declared `@dga` dependencies, that no component has Arabic or a date library, the pages and previews, and the audit and Deviations for each component. `bun run test:install` installs every item, installs the Header, Filtration, Date Picker and Footer together on their own, and adds stock shadcn `carousel` and `calendar` beside the `@dga` ones in the collision fixture. `bun run test:e2e` checks, in `/en` and `/ar`, the Header (skip link, arrows that follow the direction, the Menu sub-menu, the Drawer at 375px, `aria-current`, the start side), Second Nav (sideways scroll), Footer (the Accordion at 375px), Calendar and Date Picker (grid semantics, every key, mirrored arrows, the Hijri month checked against `Intl`, the popup, typing, ranges, limits, Apply), Carousel (slide order, keys, swipe, autoplay, pause and reduced motion) and Filtration (checkbox, tags, clear all, the Drawer at 375px), and that every new page fits at 375 and 1280px.

### Changed

- **Date Picker tokens:** `datecell-background-600` (today's ring and number) is brand 800 in light mode and brand 300 in dark mode, and `datecell-background-100` (the range band) is brand 950 in dark mode. Listed in Deviations under Contrast and Dark theme.
- **Locale allowlist:** `scripts/locale-allowlist.json` gains the component names Header, Footer, Carousel, Filtration, Date, Picker, Second, Nav, and the key and standard words Page, Up, Down, Left, Right, ISO and Intl, for the new Arabic pages.
- **ROADMAP.md:** Phase 6 is marked done in 0.6.0, and the intro and the README say so.

### Deviations

New entries (Deviations page, `scripts/tokens/fixes.ts`): Figma and CSS naming typos (Mideum, Nex/Prev, 2ndry Date, quarterary); Header skip link, current page and keyboard, its breakpoint for the Drawer (1024px, not 960px), the missing official site strip and the composed Header Menu and Nav Drawer, and the Nav Drawer selected label that used a background token at 3.84:1; Second Nav as a contextual strip with links, buttons and scrolling; Footer hard-coded colours, the 72px heading and the missing mobile form, and its link and on-colour states; Date Picker's two conflicting hover rule sets and opacity for disabled days, the RTL range band and fixed widths, the calendars, grid semantics and typing, and the days of neighbouring months; Carousel autoplay, pause and reduced motion, the dot size and its colour-only state, and the physical left and right arrows; and the Filtration panel and mobile form. Generated entries cover today's number in the Date Picker (3.84:1 and 3.25:1 in light) and the dark range band and today colour.

## [0.5.0] - 2026-11-08

OKLCH colour output, the navigation and data display components (Phase 5), and roadmap fixes. No visual change to existing components. **Token names changed in two places** (see Changed).

### Added

- **OKLCH colour output.** The Figma hex values in `scripts/tokens` stay the source of truth. The generated CSS (`tokens.css`, the `dga-tokens` registry item and the docs) now writes every colour as `oklch()`: the primitives, the semantic tokens, the shadcn variable mapping and the shadow colours, in light and dark. The same colours in another notation, so nothing looks different and there are no Deviations entries for it.
  - **Round-trip check in `bun run tokens:check`.** Every emitted `oklch()` value is converted back to 8-bit sRGB and compared with its source hex (270 values, 6 and 8 digit). Any mismatch, any hex or `rgb()` left in the CSS, or a changed opacity fails the build. Alpha keeps its exact opacity (`#ffffff1a` is `oklch(1 0 0 / 0.102)`, which reads back as `1a`). The conversion uses the CSS Color 4 matrices and is covered by unit tests, including a deliberately wrong value.
  - **The contrast audit is unchanged.** It still runs on the hex source values, so its results do not move.
  - **Hex next to OKLCH** on the Colors page (palettes, semantic tokens, the dark neutral ramp), the Deviations page (every hex in a row's original and ours) and the Contrast page (the foreground and background of each state, per mode).
- **Navigation and data display (Phase 5):** ten components in `components/dga`, each with English and Arabic pages, previews of every variant and state, an API reference with Arabic descriptions, contrast tables, registry items and install tests.
  - **Breadcrumb:** the path to the current page. The middle levels fold behind an ellipsis button above five levels (DGA's ">5" variant) and below the `sm` width; the separator mirrors in RTL.
  - **Pagination:** page numbers with an ellipsis (a fixed number of slots, so the row does not jump), previous and next that mirror in RTL, sm, md and lg, buttons or links (`getHref`), and a compact "page of count" on narrow screens.
  - **Table of Contents:** three levels, active-section tracking from the scroll position (or controlled), `aria-current="location"`, and Up, Down, Home and End between links.
  - **Card:** shadow, stroke or no effect, three sizes, media, icon, tags, rating and actions; a clickable card as a real link in the title with a stretched hit area, so the card keeps link semantics; `CardExpandable` on Base UI Collapsible; `SelectableCard` on a checkbox; disabled.
  - **List:** ordered (1-, then a-, or Arabic-Indic digits and letters with `markers="arabic"`), unordered and icon lists in primary, neutral and on-colour, two levels, and the Structured List with compact, contained, dividers and selectable rows (a radio group).
  - **Table:** a plain semantic table with header, striped rows, row and column dividers, compact and contained, sort and filter heading buttons, and sideways scrolling in a keyboard-reachable region.
  - **Data Table:** TanStack Table on the DGA Table and `@dga/pagination`: sorting, a global filter, row selection, pagination, loading rows, an empty state and sideways scrolling; columns run right to left in RTL; every string is a label. DGA has no spec for it; it adds no colour.
  - **Rating:** five whole stars (DGA has no half stars), sm, md and lg, gold or brand; interactive as a radio group with arrow keys that follow the direction, or read-only as an image with a text alternative.
  - **Progress:** linear (sm, md, lg; primary and neutral) and circular (64 to 200px), determinate and indeterminate, with a label, a value, helper text and success and error states.
  - **Stepper:** DGA's Progress Indicator and Radial Stepper in one component: horizontal and vertical, completed, current, upcoming and error steps that also say their state in words, interactive steps, and a compact radial form on narrow screens.
- **Docs:** a "Navigation and data display" group in the sidebar, search, `llms.txt` and the index page, in both languages; thumbnails are not added. The sitemap, the Open Graph images and `llms.json` include the new pages, and the `platform-code` agent skill describes the new components and OKLCH.
- **Tests:** `bun run test` covers the pagination range, the registry items, the pages and previews, the audit and Deviations for every component, the OKLCH round trip and the renamed tokens. `bun run test:install` installs every item, installs `@dga/data-table` on its own (with Table, Pagination, Checkbox, Skeleton and `@tanstack/react-table`), and adds stock shadcn `table`, `card`, `pagination`, `breadcrumb` and `progress` beside the `@dga` ones in the collision fixture. `bun run test:e2e` checks, in `/en` and `/ar`, the keyboard behaviour and RTL of Pagination (Tab order, Enter, disabled ends, mirrored arrows, the compact form), Stepper (Tab and Enter, state words, order, the compact ring), Rating (arrow keys that follow the direction, the first star on the start side, read-only), Data Table (sort, select, filter and page by keyboard, `aria-sort`, column order, scrolling region, loading), Breadcrumb (fold, mirror) and Table of Contents (arrow keys, the current section), and that every new page fits at 375 and 1280px.

### Changed

- **Token names:** `--stepper-button-upcomming*` and `--stepper-line-upcomming*` are now `--stepper-button-upcoming*` and `--stepper-line-upcoming*`, and `--table-boarder-row-selected-hovered` is now `--table-border-row-selected-hovered` (Figma typos, listed under Naming in Deviations). No component used them before this release.
- **Table and Progress tokens (light and dark):** the Table row is white in light mode and the hovered row a faint brand tint; in dark mode the alternate row, the hovered row, the neutral Progress fill and the Stepper completed and current fills are changed. All are listed in Deviations with their reasons.
- **Style map:** quoted strings are matched within one line (only template literals may span lines), so an apostrophe in a comment can no longer swallow the code below it.
- **ROADMAP.md:** "Second nav" is added to Phase 6 (Composite), matching the Phase 8 note that Header, Footer and Second nav stay in Phase 6. Patch 0.4.4 is removed as a separate entry; OKLCH colour output and Phase 5 are recorded as done in 0.5.0, and the intro, the README and the 0.4.3 entry point to them.

### Deviations

New entries (Deviations page, `scripts/tokens/fixes.ts`): Figma variant-name typos (Meduim, Sahdow, Upcomming, Lable); Stepper upcoming at 1.48:1, and its error state and radial form; Progress bar height, status icon and indeterminate state; Rating gold fill (2.30:1) and the hard-coded `#faaf00`; List physical margins and hex colours; Card border fallback, disabled overlay and link pattern, and the selected state; Pagination states and small-screen form; Breadcrumb separator, current page and fold; Table of Content width and `100vh` rule; Table compact sizes and the sort and filter buttons; Structured List selectable rows; and Data Table as a Platform Code component. Generated entries cover the Table row fills, the dark Table, Progress and Stepper values, and the two token renames.

## [0.4.3] - 2026-11-08

Patch: preview content follows the direction toggle, and the roadmap is updated. No registry component changes.

### Changed

- **Preview content follows the direction toggle.** On `/en/docs/components/field` with the preview set to RTL, the preview showed English sample text in an RTL layout ("Noura Al-Qahtani", and "As it appears on your national ID." with the period at the start of the line). Inside a preview, the content language now follows the LTR/RTL toggle: RTL renders the Arabic sample content (`lang="ar"`) and LTR the English one (`lang="en"`), on `/en` and `/ar` pages alike. This replaces the 0.4.1 rule that preview content follows the page language and the toggle only changes the layout.
  - The default direction stays tied to the page (English pages open in LTR, Arabic pages in RTL), so the default view of every preview is unchanged.
  - Everything outside the preview frame stays in the page language: prose, headings, code blocks, installation and usage text, the table of contents, the preview toolbar labels and the example titles. Code samples are unchanged.
  - **One mechanism:** `contentLang(dir)` in `apps/docs/lib/preview.ts` sets the frame's `lang` from the direction (in the frame URL, the fullscreen link, the reset reload and the live toggle message), and every example reads it through `Bi`, `useBi` and `useUi`. The RTL comparison panels on English pages now show Arabic content too.
  - **No mixed previews:** Arabic versions added for the Drawer navigation label, the avatar initials and overflow count, the mobile number prefix and placeholders (`+٩٦٦`, `٥٠ ١٢٣ ٤٥٦٧`), and two Arabic sentences that contained English code words (the controlled Dialog description and the Toast `timeout` note). Counts and the National ID length in Arabic sample content use Arabic-Indic digits.
- **Locale purity per direction.** Preview content is exempt from the page-language check but must be pure in each direction, with the same allowlist: no English words in RTL, no Arabic in LTR. `scripts/locale-allowlist.json` is now an object (`words` plus a note on what it applies to), shared by both checks.
  - `bun run test` checks the rule (both directions, from an English and an Arabic page), that the frame never takes the page locale, that the English side of every preview string pair has no Arabic, that every Arabic preview string has no English words, and that Arabic sample content uses one digit system.
  - `bun run test:e2e` checks each preview frame against the language of its direction (the polish pass), toggles Field, Input, Select, Dialog, Toast and Tabs to RTL and LTR on `/en` and `/ar` (frame `lang` and `dir`, purity, and the page, headings and example title unchanged around it), and loads every preview in both directions.
- **CONTRIBUTING.md:** the locale purity section states the new rule and replaces "previews follow the page language".

### Docs

- **ROADMAP.md:** records 0.4.3 as done and adds the OKLCH colour output plan (with a hex round-trip check in `tokens:check`; done in 0.5.0), Phase 7 (shadcn extension: only the shadcn components with no DGA equivalent, derived from DGA tokens and marked as extensions), Phase 8 (Section blocks: reusable `registry:block` sections, replacing "Page templates as blocks") and Phase 9 (Mobile components, renumbered from Phase 8). The intro, the rules and the README point to the new numbering.

## [0.4.2] - 2026-11-06

Patch: `@dga` components get their own install path so they never collide with stock shadcn, `/ar/*` 404s are in Arabic, and the Arabic exception is written down. No component API or visual changes. **Breaking: the install path moved.**

### Changed

- **Breaking: components install to `components/dga/<name>.tsx`, not `components/ui/<name>.tsx`.** A project can already have stock shadcn, or a library derived from it, in `components/ui`, and `@dga/button` would have overwritten `ui/button.tsx` (or been skipped, leaving the wrong component). Now every `@dga` UI item writes to `components/dga` (`src/components/dga` when the project has `src/`), and `components/ui` is never touched. Import as `import { Button } from "@/components/dga/button"`.
  - **Migration:** move the `@dga` files from `components/ui` to `components/dga` (or delete them and run `npx shadcn@latest add @dga/<name> --overwrite`), then change `@/components/ui/<name>` to `@/components/dga/<name>` in your imports. If you had replaced a stock shadcn file with a `@dga` one, restore the stock file.
  - **How:** each registry file declares `files[].target` (`components/dga/button.tsx`), which the shadcn CLI honours for every item type, so nothing needs to change in `components.json` (no alias to edit). A `registry:ui` file without `target` goes to the `ui` alias, and an alias change would make every user edit `components.json`. The registry sources import each other as `@/components/dga/*`: the CLI rewrites `@/registry/…/ui/input` to the `ui` alias, and keeps that import when `components/ui/input.tsx` already exists, so Field, Search Box and Number Input would have imported the stock Input.
  - **Shared on purpose:** `lib/utils.ts` (`cn`), which every shadcn project has. The CLI asks before replacing an existing one; either answer works. The `direction` helper moved from `lib/direction.tsx` to `lib/dga/direction.tsx` (import `@/lib/dga/direction`) so it cannot collide with a helper of that name.
  - **Theme:** unchanged and documented. Installing `dga-style` or `dga-tokens` redefines the shadcn variables (`--background`, `--primary` …) to DGA tokens, so stock components in `components/ui` take DGA colours; installing components alone does not touch your theme.
  - **Docs:** the Installation page (a "Where components are installed" section, English and Arabic), every component page's import snippet, the AI Resources skill and `AGENTS.md` block, and the README.
- **Tests:** `bun run test:install` has a collision fixture: a project with stock shadcn `button`, `input` and `dialog` in `components/ui`, then `@dga/button`, `@dga/field` and `@dga/dialog`. It checks that the stock files are byte-identical, the `@dga` files are in `components/dga`, none of them import `components/ui`, and the project typechecks and builds. `bun test` checks that every `registry:ui` item has a `components/dga` target and that no source imports `components/ui`.

### Fixed

- **`/ar/nope` and `/ar/docs/nope` served the English 404** with `lang="en" dir="ltr"`. A URL that matches no route is served by `app/global-not-found.tsx`, which sits outside the layouts and was written in English. (The locale layout cannot render its own `not-found`: with a root layout on a dynamic `[lang]` segment, Next.js returns an empty error shell for `notFound()`, reproduced in a bare app.) The proxy now sends the language of the URL in the `x-dga-lang` header, and the page reads it: `lang`, `dir`, the title and the copy follow it, and links stay in the language. A URL with no language (`/r/nope`) is English. `bun run test:e2e` checks `/en/nope`, `/en/docs/nope`, `/ar/nope`, `/ar/docs/nope` and a nested docs URL in both languages: 404 status, `lang`, `dir`, copy, and links, in the raw HTML and in the browser.

### Policy

- **Arabic locale exception, documented.** On Arabic pages, the generated Deviation reasons and the Contrast state labels stay in English: their source data is English, and a full translation would be unclear. They stay marked `lang="en"` and are covered by the purity audit, which skips text marked with another language. It is now stated in CONTRIBUTING.md, the `platform-code` skill and the comments of the locale tests, so an audit treats it as accepted, and `bun run test:e2e` checks that they are marked and `dir="ltr"`. Nothing was translated.

## [0.4.1] - 2026-11-05

Polish and AI Resources. The docs get a section for coding agents, and the home page, the preview chrome and the Phase 4 pages are tidied from the owner's review notes. No registry component changes.

### Added

- **AI Resources** in the sidebar, after Components, in English and Arabic:
  - **Set up your agent** (`/docs/ai/skills`): the `platform-code` skill, published at `/.well-known/agent-skills/platform-code/SKILL.md` and listed in `/.well-known/agent-skills/index.json` with its `sha256` digest (discovery schema 0.2.0). It teaches the install commands, reading `llms.txt` and the Markdown twins, RTL with logical properties, DGA tokens only, the digit rules, reading Deviations before changing a colour, using only registry components and wrapping controls in Field. It documents the install into `.claude/skills/platform-code/` and `.agents/skills/platform-code/`, and offers `AGENTS.md` and a `CLAUDE.md` `@AGENTS.md` block as downloads, each between `BEGIN` and `END` markers.
  - **Docs for agents** (`/docs/ai/llm`): every endpoint per language.
  - **MCP server** (`/docs/ai/mcp`): the official shadcn MCP server over the `@dga` registry, `shadcn mcp init --client claude|cursor|vscode`, and manual `.mcp.json`, `.cursor/mcp.json` and `.vscode/mcp.json` configs.
  - Linked from Installation and the docs index in both languages.
- **Machine endpoints:**
  - `/{lang}/llms.json` and `/llms.json` (slug, title, description, HTML and Markdown URLs); the AI pages are grouped under their own localised heading in `llms.txt`, and the preamble of each `llms.txt` is in its language.
  - Every Markdown twin, `llms-full.txt` included, ends with a link to the `llms.txt` of its language.
  - `Accept: text/markdown` on a docs HTML URL returns the Markdown twin, with `Vary: Accept`.
  - An HTTP `Link` header (`describedby` for `llms.txt`, `sitemap`, `agent-skills`, and `alternate` for the page's Markdown) and the same relations as `<link>` tags.
  - Both `llms.txt` files and the skills index are in the sitemap.
  - `/webmcp.js` registers `search_docs`, `get_page` and `list_pages` in browsers that support WebMCP; an inline guard downloads it only when they do.
- **Copy page menu** now has Copy Markdown, View Markdown, Open in ChatGPT, Open in Codex, Open in Claude, Open in Claude Code and Open in Cursor, in both languages, built on the registry Menu. The prompt points at the page's absolute Markdown URL.
- **Self-contained state coverage** for Dialog (must be answered, controlled), Drawer (controlled, no corner button), Tooltip (no arrow, title, disabled), Menu (stay open, controlled), Tabs (manual activation, no divider, flush, controlled), Content Switcher (disabled, icons, controlled), Toast (timeout, priority, action, queue), Notification and Inline Alert (no icon, dismissed): a live preview and a section on each page, in both languages.
- **Tests:** `bun test` covers the skill digest, the discovery relations, the Copy menu strings, the AI pages and locale purity (dictionaries and every docs page). `bun run test:e2e` covers the AI pages, the skills index and digest, `llms.json`, `llms.txt`, `Accept: text/markdown`, the `Link` header, WebMCP, the Copy menu, locale purity of 18 pages in both languages (previews included), the hero, the RTL comparison layout, the preview toolbar and centred previews.

### Changed

- **Home hero on real components:** the hero card is built from Field, Input, Select, Switch, Tag, Status Tag, Inline Alert, Button and Content Switcher, with no plain markup, and the "plain markup" note is gone. Its status text, labels and calls to action follow the page language and the language switch on the card, so a view is never a mix of English and Arabic.
- **Locale purity:** English pages, shell, previews and hero contain no Arabic, and Arabic ones no English words, apart from code, package, prop and component names, URLs and product names. The home eyebrow is one language (the product name in that language), the 404 page shows one language, the code samples on English pages use English text, and the preview content follows the page language while the LTR/RTL toggle only changes the direction.
- **RTL comparisons:** the LTR and RTL panels are laid out at their own width and fill the available width with no trailing dead space, and stack on narrow screens. This applies to every component page.
- **Preview toolbar** is built from the registry Content Switcher and Button at one height (32px); the small icon buttons of the header and the area filter on the Deviations page use the registry Button, and the area names are in the page language.
- **Single-trigger previews** (Dialog, Drawer, Menu) are centred in the preview.
- **Outbound links as references only:** Base UI docs, DGA Figma and Source moved from the top of each component page to a References block at the end, which says that every state is documented on the page.
## [0.4.0] - 2026-11-05

Phase 4: Interactive. Ten components on Base UI, each in English and Arabic, and a fix for how Input, Textarea, Select, Number Input and Search Box behave on hover, press and focus.

### Added

- **Dialog** (DGA Modal): `sm` 400, `md` 600 (DGA) and `lg` 800px, a close button, header, body and footer. Focus moves in and is trapped, the page behind is inert, Escape closes it and focus returns to the trigger. `disablePointerDismissal` for a decision that must be answered.
- **Drawer** (DGA Slideout Menu): slides in from the start, end, top or bottom; `start` and `end` flip with the page direction and the swipe that closes it follows. White or gray. A modal panel with the same focus handling as Dialog.
- **Tooltip** and **Help Icon**: light and dark, optional title and beak, placement `top`, `bottom`, `start` and `end` (the last two swap in Arabic). Opens on hover and on keyboard focus. The Help Icon (`TooltipHelp`) is a popover that also opens on hover, so touch and screen reader users can read it.
- **Menu**: items with icons and trailing text, checkbox and radio items, groups, separators and submenus. Roving focus, typeahead, Home and End; submenus open on the end side and mirror in Arabic.
- **Tabs**: horizontal and vertical, `sm`, `md` and `lg`, icons, divider and flush. Arrow keys follow the page direction, and a tab opens its panel on focus.
- **Accordion**: `sm`, `md` and `lg`, leading or trailing chevron, flush, single or multiple open, with logical padding (no RTL overrides).
- **Content Switcher** on Base UI Toggle Group: two to four options, three sizes, an on-colour version, one option always chosen.
- **Toast** (DGA Notification Toast): one `Toaster` and a `toast.add()` manager that works outside React. Five kinds, an action, a close button, a polite live region (assertive for errors and warnings), pause on hover and focus, swipe to dismiss, bottom end of the screen.
- **Notification**: a full-width banner in five kinds, with a bold lead-in, an action and a close button, as a live region.
- **Inline Alert**: five kinds on a white or tinted fill, a title, text, up to two actions and a close button, as a live region.
- **`AutoDirection` and `useDocumentDirection`** (a new `direction` registry item): Base UI only knows the direction from a `DirectionProvider`; the components read it from `<html dir>` themselves, so arrow keys, submenus and tooltips follow RTL with no setup.
- **Docs:** a page per component in English and Arabic under a new "Interactive" sidebar group (preview toolbar, installation, usage, anatomy, examples, RTL, accessibility, API reference, deviations, contrast, related components, previous and next), the Arabic description of every prop, "Interactive" in the components table, search results and `llms.txt` (both languages), and 20 live previews.
- **Registry:** eleven new items (`dialog`, `drawer`, `tooltip`, `menu`, `tabs`, `accordion`, `content-switcher`, `toast`, `notification`, `inline-alert` and the `direction` library file). `bun run test:install` installs every one.
- **Contrast audit for every new state:** 490 more checks (text 4.5:1; icons, focus rings, bars and chosen fills 3:1), light and dark.
- **Tests:** `bun run test:e2e` now has a keyboard-only pass for Dialog, Menu and Tabs in `/en` and `/ar` (focus trap and return, the submenu on the end side, arrow keys that follow the direction), checks that the start Drawer flips and that Toast is a live region, runs the layout checks on every new page at 375 and 1280px, and checks the Input, Textarea, Select and Number Input underline in LTR and RTL. Lighthouse in CI also runs on the Arabic Dialog page.

### Changed

- **Textarea** is now a box around a `<textarea>` (a `<div data-slot="textarea">` with the border, fill and underline), because a `<textarea>` cannot draw an underline. `className` styles the box and the new `inputClassName` styles the `<textarea>`; before, `className` styled the `<textarea>`.
- The previews take the components' own labels (optional, clear, decrease, increase, remove, loading, close) from the locale dictionary, and every label, placeholder and `aria-label` in the Arabic previews is Arabic.

### Fixed

- **Input, Textarea, Select, Number Input and Search Box state behaviour** now follows the DGA CSS:
  - The 2px underline grows from the centre out to both sides (it is a full-width bar scaled with `scaleX`, 0 at rest, 0.5 pressed, 1 focused or open, 200ms ease-in-out), the same in LTR and RTL. Before, it grew from the start edge.
  - There is no outline on focus, with the mouse or the keyboard. Focus is the pressed border colour, the full underline and `shadow-md` (no shadow in dark mode). Before, a click drew a 2px solid outline.
  - Pressed is visible: `:active` shows the pressed fill, the pressed border and the half underline before the focus styles take over. Before, `has-[input:focus]` overrode it on mousedown.
  - Textarea has the underline.
  - Colours follow DGA: error border and underline `error-600` (was `error-700`), the placeholder `neutral-500` (was `neutral-600`), read-only a solid `neutral-300` border (was dashed), and filled lighter and darker with no border at rest (it appears on hover, focus and press).
- **Font weights were all rendered as 400.** The Figma font weight variables hold the style name ("Semibold"), which CSS ignores; `--font-weight-*` are now 400, 500, 600 and 700, so `font-medium`, `font-semibold` and `font-bold` work in every component.
- The Arabic Field page used Western digits (10, 1, 2) in a citizen sample; it uses ١٠, ١ and ٢.
- Defaults such as "Optional", "Clear search" and "Remove" no longer show in English in the Arabic previews.

### Deviations

Logged on the Deviations page and on each component page (the Arabic pages summarise them in Arabic).

- **Added for Phase 4:** the `Dialog`, `Drawer`, `Tooltip`, `Menu`, `Tabs`, `Accordion`, `Content Switcher`, `Toast`, `Notification` and `Inline Alert` entries (names, focus and keyboard behaviour, logical placement, live regions, the Notification icon colour, the neutral bars, the on-colour Content Switcher track, the Tabs More tab that is not built) and `--font-weight-*`.
- **Added for the field states:** `field-text-placeholder-tinted` (neutral-600) for the pressed and darker fills only, where the DGA placeholder is 4.34:1; `field-border-error` is `error-600` as in the live DGA CSS; a focused read-only field shows the underline; and two known gaps kept as DGA draws them and marked unresolved: the read-only border (1.5:1) and the lighter and darker fills at rest (1.0 to 1.1:1).
- **Removed:** the "outline replaces shadow" entry, the dashed read-only border, "lighter and darker keep their border in every state", and the global `field-text-placeholder` remap. `field-border-default` stays neutral-500, now logged only for its 1.4.11 reason (2.58:1 on white at rest).

## [0.3.0] - 2026-11-05

Phase 3: Forms. Ten components, each in English and Arabic, all built on Base UI with the DGA tokens in light and dark.

### Added

- **Field** wraps every control: a label with a required (`*`) or optional marker, helper text, and an error message with an icon. The label names the control and the helper and error text are linked through `aria-describedby` (Base UI Field). Vertical and horizontal layouts, groups with a legend, and `invalid` plus `match` to drive errors from your own state.
- **Input** (text input): `md` 32px and `lg` 40px, default, lighter and darker fills, prefix and suffix, and hover, focus, filled, read-only, disabled and error states.
- **Textarea**: the same fills and states, resizable in height.
- **Select** (DGA Dropdown Input) on Base UI Select: sizes, fills, groups and separators, a check mark on the chosen option, and a popup that is as wide as the trigger.
- **Number Input** on Base UI Number Field: digits stay left to right and isolated (`dir="ltr"` with `unicode-bidi: isolate`), Arabic-Indic and Persian digits typed or pasted become Western digits, and the − and + buttons sit on the logical start and end.
- **Search Box**: a search icon on the start side and a real clear button on the end side (`type="search"`, Escape clears, focus returns to the field).
- **Checkbox** (primary and neutral, 16, 20 and 24px, indeterminate), **Radio** and **Radio Group**, and **Switch** (48 by 24px, optional check icon, thumb moves on the logical axis).
- **File Upload**: a drop zone that is a real file input (keyboard, screen reader and drag and drop), a file list with remove, progress and error states, validation of type, size and count (`validateFiles`), and Arabic file names that keep their own direction.
- **Docs:** a page per component in English and Arabic under a new "Forms" sidebar group (preview with direction, theme and viewport toolbar, installation, usage, anatomy, examples, RTL, accessibility, API reference, deviations, contrast, related components, previous and next), a citizen service request form built only from Field-based controls, the Arabic description of every prop, and "Forms" in the components table, search results and `llms.txt` (both languages).
- **Registry:** ten new `registry:ui` items (`field`, `input`, `textarea`, `select`, `number-input`, `search-box`, `checkbox`, `radio`, `switch`, `file-upload`). `number-input` and `search-box` depend on `input`, and every control depends on `field`.
- **Contrast audit for the form tokens:** every state of the `field-*`, `control-*` and `textarea-*` tokens, light and dark, 4,060 checks in all (text 4.5:1; input boundaries, check marks, radio dots, switch tracks and thumbs and focus rings 3:1).
- **Tests:** unit tests for digit normalisation and file validation; `bun run test:e2e` now also checks the sitemap index, `robots.txt`, the bare manifest redirect, layout of every form page at 375 and 1280px in both languages, and a keyboard-only pass through the service request form in `/en` and `/ar`; `bun run test:install` installs a control on its own to check that its registry dependencies resolve; Lighthouse in CI also runs on the Arabic Input page.
- New tokens: `control-thumb` (the white Switch thumb) and `control-icon-neutral` (the check mark on a neutral checkbox).

### Changed

- The token source label `dga-ui` is now `platform-code`, and the root package is named `platform-code`.
- `bun run api` reports every missing Arabic description at once instead of stopping at the first.

### Fixed

- **`/sitemap.xml` returned 404.** It is now a sitemap index listing `/sitemap/en.xml` and `/sitemap/ar.xml`, and `robots.txt` lists it.
- **`/manifest.webmanifest` returned 404.** It now redirects to the manifest of the visitor's language (the `dga_locale` cookie, then `Accept-Language`, then English), the same way every other URL without a language does.
- **Leftover naming:** "DGA UI" in the first line of this file is "Platform Code", and the package and the internal token source label no longer say `dga-ui`.

### Deviations

Logged on the Deviations page and on each component page (the Arabic pages summarise them in Arabic).

- `field-border-default` (neutral-400, 2.6:1 on white) is neutral-500 in light mode so input boundaries reach 3:1 (WCAG 1.4.11).
- `field-text-placeholder` is neutral-600 in light mode: neutral-500 is 4.34:1 on the filled darker fill.
- Filled lighter and darker keep a border in every state (Figma has none until hover, and the fills are 1.0:1 and 1.1:1 against the page).
- Read-only fields have a dashed border at 3:1 instead of the pale grey (1.5:1); checkbox, radio and switch read-only use `control-border`.
- Focus is a 2px outline outside the border instead of a shadow and underline, so it also works in dark mode.
- Checked checkbox, radio and switch keep green-600 on hover and press in dark mode (Figma's lighter greens give the white mark 1.4–2.1:1).
- The Switch off track is `control-border` (4.8:1) instead of #ccc (1.6:1).
- The highlighted Select option has a 2px bar as well as a tint (the tint alone is 1.1:1).
- Dropdown Input is named Select; Figma's Single and Multiple File Upload are one component; Search Box's trailing icon is a real clear button; Textarea grows and resizes.

## [0.2.0] - 2026-11-05

The docs are now in Arabic and English. This reverses the earlier English-only decision.

### Added

- **Arabic locale.** The site lives at `/en` and `/ar` (English is the default). A request without a language is sent to the one the visitor chose with the switcher (the `dga_locale` cookie, SameSite=Lax, path `/`, one year), then to the one in `Accept-Language`, then to English. The header has an `EN | العربية` switcher that keeps you on the same page; `<html lang dir>` follows the locale; every page has `hreflang` alternates and a per-locale sitemap (`/sitemap/en.xml`, `/sitemap/ar.xml`). Old URLs without a language redirect.
- **Arabic pages for the whole site:** home, Introduction, Installation, Deviations, all Foundations, Contrast, the changelog page and the nine component pages, written in Modern Standard Arabic. Code, prop names, token names, CLI commands and component names stay in English, and code blocks stay left-to-right with bidi isolation. The API reference has an Arabic description for every prop.
- **UI strings in both languages** for the whole shell: sidebar groups, table of contents, search, Copy page menu, previous and next, footer, 404, the preview toolbar, code block labels and the theme toggle. The two dictionaries are typed against each other, so a missing key fails the build.
- **Search per locale.** One index per language; results never cross languages. Arabic text is normalised before matching (diacritics and tatweel removed, alef variants, taa marbuta, yaa and alef maqsura folded, Arabic-Indic digits to Western), and a leading "ال" is ignored in the query, so "الوان" finds "ألوان".
- **Open Graph images in Arabic.** IBM Plex Sans Arabic is loaded into the OG renderer. The renderer has no bidi support, so Arabic lines are laid out word by word, right to left.
- **`llms.txt`, `llms-full.txt` and every page as Markdown per locale** (`/ar/llms.txt`, `/ar/docs/components/button.md`); the English ones keep their old URLs.
- **Translation drift check.** Each Arabic page records the hash of the English source it was translated from (`sourceHash`). `bun run translations:check` fails when an English page changes without its Arabic page, when an Arabic page is missing, or when the two differ in components, headings or code fences; `bun run translations:stamp` records a reviewed translation. CI runs it. If an outdated page is ever published, it shows a "Translation outdated" banner.
- **Typography > Arabic text** on the Typography page, with the CSS to copy: IBM Plex Sans Arabic, line height 1.8 for body and 1.5 for headings, no letter spacing, and the numerals rule (Western digits in prose and every technical value; Arabic-Indic digits only in sample content that imitates a citizen-facing service; never both in one view). Logged under Typography on the Deviations page.
- `CONTRIBUTING.md` and a `README.md`, and `bun run test:e2e` (browser checks for the locale cookie, the header, and layout at 375, 768, 1024 and 1280px in LTR and RTL, light and dark; runs in CI).

### Changed

- **Product name: Platform Code (كود المنصات).** "DGA UI" is gone from the UI, metadata, Open Graph images, web app manifest, `llms.txt`, README, registry titles and docs; "DGA" now appears only where it means the DGA design system. The page title template is "… | Platform Code" in English and "… | كود المنصات" in Arabic, and the web app manifest is per language (`/en/manifest.webmanifest`, `/ar/manifest.webmanifest`). Earlier changelog entries keep the old name because they record what shipped then.
- **Lockup.** The DGA logo icon followed by the wordmark ("Platform Code" in English, "كود المنصات" in Arabic), mirrored in RTL so the icon is on the start side, in the header, footer, 404 and Open Graph images. Favicons and app icons are the icon alone.
- **Header matches the shared omqkhafi docs layout** (okm, oke): a bar 44px high (48px from 1024px) under a 1px border; from 1024px the lockup sits in a pane as wide as the docs sidebar, followed by three equal tabs (README, DOCS, CHANGELOG; الرئيسية، التوثيق، سجل التغييرات) with a 2px bar under the current one, then the theme toggle, the language link and a solid GitHub block. Below 1024px it is the lockup with search, language, theme and menu buttons. Search sits at the top of the sidebar on desktop. The sidebar and the table of contents use the same header height and sidebar width.
- **Logo.** The header, footer, 404, favicon set, web app manifest icons and Open Graph images now use the DGA logo icon instead of the placeholder star.
- **Arabic terminology:** "destructive" is المدمّر everywhere (not الحاذف), "on colour" is للخلفيات الملونة, and the source code is الشيفرة المصدرية.
- The Arabic citizen demo on the home page uses Arabic-Indic digits throughout (٤ نوفمبر ٢٠٢٦، ١٤ يومًا، الطلب ٢٤٨١٠).
- Sitemap alternates include `x-default` (the English URL).
- Every new component phase ships its English and Arabic docs together (see `ROADMAP.md` and `CONTRIBUTING.md`).
- Lighthouse in CI also runs on the Arabic home page and the Arabic Button page.

## [0.1.2] - 2026-11-05

A site that reads as a design-systems product, a second pass on the dark theme, and a stricter bidi setup for Arabic in code.

### Changed

- **Dark theme, soft tints.** Badge, Tag, Status Tag, Featured Icon and alert surfaces no longer use solid saturated fills in dark mode. Every hue uses one rule: the hue of its own base step (the 400 step for amber and purple) at one fixed OKLCH lightness and chroma, with text and icons at step 300 and borders at 700 to 800. Red reads red, warning and orange stay amber and orange (no brown), purple is a visible tint, and all hues look like one family. The strongest dark fill (`hard` Featured Icon, `inverted` Status Tag) is the same tint at a higher strength, still under a white label. Contrast audit: 2,320 pairs, all passing. Every changed token is listed under **Dark theme** on the Deviations page (now 409 entries); button fills are still unchanged and logged as such.
- **Arabic in code blocks.** Every code line is its own left-to-right isolate (`dir="ltr"`, `unicode-bidi: isolate`) and the per-token isolation is gone, so an Arabic string split over several tokens keeps its reading order.
- **Home page rewritten.** A split hero with the headline "The Saudi government design system, as copy-paste React components", the init command, and a live government service card ("Renew national address") that switches between English and Arabic, and light and dark, in place, with the other script shown next to it. Under it: four facts from the repository, each linking to its proof (components, 2,320 contrast pairs, 409 deviations, RTL and LTR), a bento of component compositions, the three install commands, and "Built in the open" with the GitHub repository, the latest version and the licence.
- **Identity.** A DGA UI mark (an eight-point star with a star at its centre; it is not the DGA logo), the eight-point star lattice as a low-opacity background in the hero and as section dividers in both themes, and the brand green as the only accent in the header, hero and footer.
- **Type scale.** `display`, `h1`, `h2`, `h3`, `body` and `small`, with tighter tracking on headings and one line-height per step. Tracking is switched off in Arabic and in any RTL subtree, because negative letter-spacing breaks the joins between Arabic letters.
- **Shell.** A 56px header with the tabs as underlined links, no separators between them, a 2px bar on the inline-start edge of the current sidebar item, 150ms transitions on links, tabs and cards (none under `prefers-reduced-motion`), and one icon style (Hugeicons stroke, 1.5 weight, 18px) in the shell.
- Docs pages show the version and, when the git history is available, the date of the last change, and component pages have a small preview thumbnail next to the title.
- All site copy rewritten to be specific and plain.

### Added

- Footer on every page: product, docs and project links, the MIT licence, "not an official DGA product", and a credit to design.dga.gov.sa.
- A DGA-style 404 page (also for URLs that match no route), the full favicon set (SVG, ICO, Apple touch icon, 192 and 512px) with a web app manifest, and Open Graph images with the pattern and the page title.
- One `Callout` for notes and warnings in the docs, built from the tokens an Alert component will use. (There is no Alert component yet; it is on the roadmap with Phase 4.)

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

[Unreleased]: https://github.com/omqkhafi/dga/compare/v0.1.2...HEAD
[0.1.2]: https://github.com/omqkhafi/dga/compare/v0.1.1...v0.1.2
[0.1.1]: https://github.com/omqkhafi/dga/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/omqkhafi/dga/releases/tag/v0.1.0
