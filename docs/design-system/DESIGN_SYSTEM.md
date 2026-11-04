# DGA Platforms Code (منصات الكود الموحد) — Design System Reference

Source: https://design.dga.gov.sa/ (Digital Government Authority, KSA). All values below were extracted on 2026-11-04 (UTC+3) from the live compiled bundles `/assets/index-CYyqM6kT.css` and `/assets/index-BO_6JOKP.js` (raw copies in `_source/`). ✅ = verified in CSS, ⚠️ = inferred / unverified.

## 1. Foundations

### 1.1 Color (✅) — `/guidelines/foundations/color-system`
| Role | Token | Hex |
|---|---|---|
| **Primary – "SA Flag" green** (brand) | `--colors-primary-sa-flag-600-primary` | **#1B8354** |
| Secondary – Gold | `--colors-secondary-gold-600-primary` | **#DBA102** |
| Tertiary – Lavender | `--colors-tertiary-lavendar-500-primary` | **#80519F** |
| Base black / white | `--colors-base-black` / `-white` | #161616 / #FFFFFF |

Primary scale 25→950: F7FDF9, F3FCF6, DFF6E7, B8EACB, 88D8AD, 54C08A, 25935F, **1B8354**, 166A45, 14573A, 104631, 092A1E
Gold 25→950: FFFEF7, FFFEF2, FFFCE6, FCF3BD, FAE996, F7D54D, F5BD02, **DBA102**, B87B02, 945C01, 6E3C00, 472400
Lavender 25→950: FEFCFF, F9F5FA, F2E9F5, E1CCE8, CCADD9, A57BBA, **80519F**, 6D428F, 532D75, 3D1D5E, 281047, 16072E
Neutral 25→950: FCFCFD, F9FAFB, F3F4F6, E5E7EB, D2D6DB, 9DA4AE, 6C727E, 4D5761, 384250, 1F2A37, 111927, 0C111B
Status: Success = `green` (600 #069454 / 700 #067647), Error = `red` (600 #D92C20 / 700 #B42318), Warning = `yellow` (600 #CA8504 / 700 #A15C07), Info = `blue` (600 #156FEE / 700 #175CD3). Full 25–950 scales in `tokens.css`. Alpha scales: black (#161616), white, green (#1B8354) at 10–90 %.

⚠️ The CSS also ships Untitled-UI-style legacy palettes (`gray`, `brand`, `cyan`, `fuchsia`, `error`…) and a second, slightly different `green`/`yellow` set; the deliverables use the `:root` values that win in the cascade.

**Semantic tokens** (light → dark), examples: `--background-body` #F9FAFB → #111927; `--text-default` #161616 → #FFFFFF; `--text-primary-paragraph` neutral-700 → neutral-100; `--text-secondary-paragraph` neutral-500 → neutral-200; `--border-neutral-primary` neutral-300 → neutral-500; `--background-primary` / `--border-primary` / `--text-primary` = primary-600. 463 light + 101 dark overrides in `tokens.css`.

**Dark mode** ✅: attribute `[data-theme="dark"]` (site selector `[data-theme=dark] :root`).

### 1.2 Typography (✅) — `/guidelines/foundations/typography`
- Font: **IBM Plex Sans Arabic** (weights 400 Regular, 500 Medium, 600 SemiBold, 700 Bold) for Arabic and Latin. A "Saudi" display font (SaudiWeb Regular/Bold) is also loaded on the site, used for brand/hero only ⚠️ (licensing not public).
- Scale (size/line-height px), each in regular/medium/semibold/bold:

| Style | Size / LH | Style | Size / LH |
|---|---|---|---|
| display-2xl | 72/90 | text-xl | 20/30 |
| display-xl | 60/72 | text-lg | 18/28 |
| display-lg | 48/60 | text-md | 16/24 |
| display-md | 36/44 | text-sm | 14/20 |
| display-sm | 30/38 | text-xs | 12/18 |
| display-xs | 24/32 | | |
Class names: `.display-lg-bold`, `.text-md-semibold` etc. The site also has a rem version (html at 62.5 %: 1.6rem = 16px).

### 1.3 Spacing & layout (✅) — `/guidelines/foundations/layout-and-spacing`
4-px base: `--spacing-0-5` 2, `-1` 4, `-1-5` 6, `-2` 8, `-3` 12, `-4` 16, `-5` 20, `-6` 24, `-8` 32, `-10` 40, `-12` 48, `-16` 64, `-20` 80, `-24` 96, `-32` 128, `-40` 160, `-48` 192, `-56` 224, `-64` 256, `-80` 320 … up to `-480` 1920. T-shirt aliases `2xl`…`11xl` map to these.
Container: max-width **1280px** (`--container-max-width-desktop`), padding 32px desktop / 16px mobile. Grid component `dga-grid-container` (`--fluid`, `--no-gutters`) + `dga-grid-item`. ⚠️ Column count/gutter values not exposed as tokens (assumed 12-col).
Breakpoints seen in CSS: 640, 768, 1024, 1280, 1536 (Tailwind-like) plus 600px (37.5em), 900px (56.25em), 1200px (75em).

### 1.4 Radius (✅)
none 0, xs 2, sm 4, md 8, lg 16, xl 24, full 9999 (`--radius-*`). Buttons use `--radius-sm` (4px). ⚠️ A legacy set (sm 6, lg 10, xl 12, 2xl 16, 3xl 20, 4xl 24) also exists.

### 1.5 Elevation / shadows (✅) — `/guidelines/foundations/elevation`
xs `0 1px 2px rgba(16,24,40,.05)`; sm `0 1px 2px rgba(16,24,40,.06), 0 1px 3px rgba(16,24,40,.1)`; md `0 2px 4px -2px …06, 0 4px 8px -2px …1`; lg `0 4px 6px -2px …03, 0 12px 16px -4px …08`; xl `0 8px 8px -4px …03, 0 20px 24px -4px …08`; 2xl `0 24px 48px -12px …18`; 3xl `0 32px 64px -12px …14`.

### 1.6 Iconography — `/guidelines/foundations/iconography`
Icons are **Hugeicons** (font families `hgi-stroke-rounded`, `hgi-stroke-standard`, `hgi-stroke-sharp`, `hgi-solid-standard`, `hgi-twotone-rounded`); stroke-rounded is the default style ⚠️. Icon sizes inside buttons: 16/20/24px.

### 1.7 Motion ⚠️
No motion tokens. Observed: `transition: all .2s|.3s|.4s ease-in-out`.

### 1.8 Focus / accessibility ✅
Focus ring `outline: 2px solid var(--colors-base-black)` (white on dark/on-color, brand-600 in places). Arabic RTL first; WCAG 2.1 AA is the stated target ⚠️ (per DGA guidance, not in CSS).

## 2. Components (`/guidelines/components/*`, web components prefixed `dga-`)
Categories: Actions, Content display, Data display, Feedback, Forms & inputs, Loading & status, Navigational, Search & filters, UI shell.

### Button (✅ detailed)
- Variants: Primary (brand), Primary‑Neutral (black), Secondary‑Solid, Secondary‑Outline (+ on‑color), Subtle, Transparent, and Destructive versions of Primary/Subtle/Transparent; icon-only `dga-btn--icon`; leading/trailing icons.
- Sizes: **sm** 24px high, 12/18 medium, padding-inline 8; **md** 32px, 14/20, padding 12; **lg** 40px, 16/24, padding 16; gap 4px; radius 4px.
- States: default, hovered, pressed, selected, focused, disabled. Primary: default/focused #1B8354, hovered 700 #166A45, selected 800 #14573A, pressed 900 #104631; disabled bg `--background-disabled` (neutral-200). Danger: red-600 / 700 / 800 / 900.

### Full component inventory (from bundle)
Accordion (flush, leading icon), Avatar (+ group stacked, square, border), Breadcrumbs (+ dropdown), Button, Floating button, Card (image, title, content, actions, expandable), Carousel, Chart / Apex chart, Metric (+ chart), Checkbox, Chip, Tag, Code snippet, Collapse, Content switcher, Data table, Table, Structured list, List, Date field, Datepicker, Digital signature, Divider, Drawer, Slide-out menu, Dropdown, Menu (groups/items), Featured icon (circle), Feedback icon, File upload, Filteration (filters), Search box, Footer, Header (menu, sub-menu, actions, mobile), Second nav header, Grid, Huge icon, Inline alert, Notification, Notification toast, Link (inline, disabled), Loading, Skeleton (line/circle), Linear progress bar, Circular progress bar, Progress indicator, Radial/circular stepper, Modal (header/title/body/actions), Number input, Text input, Textarea, Radio button, Switch, Slider, Rating, Pagination, Quote, Tabs, Table of content, Tooltip.
⚠️ Per-component state/size specs other than Button are rendered client-side from Figma-sourced docs and were not exhaustively transcribed; use `_source/site.css` (search `.dga-<name>`) for exact values.

## 3. Templates / patterns (`/guidelines/templates/*`)
Home, About, Contact us, Content, FAQs, Help, Search, Service, Sitemap, Form page, Page not found (404), E-participation, Life journeys, Chatbot, Cookies banner, Feedback section, Rating section ("Was this page helpful?"), Hajj template, Founding Day theme.

## 4. RTL / Arabic notes
- Arabic is primary (`dir="rtl"`, `lang="ar"`); English mirrors in LTR. CSS uses logical props (`padding-inline`, `padding-block`) — do the same (`ms-/me-` in Tailwind).
- Mirror directional icons (arrows, chevrons, breadcrumb separators); don't mirror logos, media controls, checkmarks.
- Use IBM Plex Sans Arabic for both scripts; keep line-heights from the scale (Arabic diacritics need them). Use Western Arabic numerals or Arabic-Indic consistently per platform.
- Mandatory gov elements (header with official logo, footer with DGA/registration links, "Digital Stamp"/unified-platform verification) — see Templates ⚠️.

## 5. Source links
Home https://design.dga.gov.sa/ · Foundations https://design.dga.gov.sa/guidelines/foundations · Components https://design.dga.gov.sa/guidelines/components · Templates https://design.dga.gov.sa/guidelines/templates · Change log https://design.dga.gov.sa/updates/change-log · Contributing case studies https://design.dga.gov.sa/contributing/icons-case-study

## 1b. Foundations from Figma (source of truth)

- 784 variables, 69 text styles, 11 effect, 12 gradient, 8 grid styles (raw: `_source/figma/foundations.json`).
- Responsive typography (IBM Plex Sans Arabic), Desktop/Tablet/Mobile modes, e.g. display-2xl 72/90 → 56/72 → 48/64; new text-2xs 10/14; letter-spacing -2 on display md+. In `tokens.css` Tablet/Mobile are emitted under `@media (max-width:1024px)` / `(max-width:640px)` — **breakpoints unverified** (Figma has modes, not pixel breakpoints).
- Grids: Desktop 12 col / 24 gutter / 112 margin / 1216 content; Tablet 6/32/32/704; Mobile 4/16/16/343.
- Backdrop blurs 8/16/24/40px; Gray & Brand gradients; widths xxs 320 … 6xl 1920; paragraph-max-width 720.
- Conflicts with site CSS: see `TOKEN_CONFLICTS.md` (39 material, 87 rounding-only, shadow-sm). CSS values kept as `/* css: X */` comments and in `$extensions.dga`.

## 2b. Component specs (Figma-derived, CSS notes appended)

Per-page files in `components/` (web) and `components/mobile/`. Each lists props/variants, sizes with token bindings, state colour tokens, Figma description as usage note, and (web) phase-2 CSS rules.

## 6. Figma reconciliation status

Read (read-only) from user-duplicated files: Foundations `eJy7ExFwQM8mBZPvz9fmXr`, Components `trJvYAeN2wdayn2VdSUR2N`, Mobile `Ci0aNw48DSdp7MsRw0U1nA`. Raw dumps in `_source/figma/`.

## 7. Coverage

| Figma page | File | Public sets | Variants | Web | Mobile | CSS notes |
|---|---|---|---|---|---|---|
| Accordions | `accordions.md` | 2/2 | 242/194 | ✅ | ✅ | ✅ |
| Avatar | `avatar.md` | 2/2 | 44/44 | ✅ | ✅ | ✅ |
| Banner | `banner.md` | 0/1 | 0/10 | — | ✅ | — |
| Breadcrumb | `breadcrumb.md` | 1/0 | 20/0 | ✅ | — | — |
| Buttons | `buttons.md` | 3/4 | 1808/1464 | ✅ | ✅ | ✅ |
| Card | `card.md` | 1/1 | 102/102 | ✅ | ✅ | ✅ |
| Carousel | `carousel.md` | 3/0 | 69/0 | ✅ | — | — |
| Charts | `charts.md` | 3/0 | 72/0 | ✅ | — | — |
| Checkbox | `checkbox.md` | 2/2 | 113/95 | ✅ | ✅ | ✅ |
| Chip | `chip.md` | 1/0 | 288/0 | ✅ | — | — |
| Code Snippet | `code-snippet.md` | 1/0 | 2/0 | ✅ | — | — |
| Content Switcher | `content-switcher.md` | 1/1 | 156/40 | ✅ | ✅ | ✅ |
| Date Picker | `date-picker.md` | 2/2 | 195/70 | ✅ | ✅ | ✅ |
| Digital Stamp | `digital-stamp.md` | 2/0 | 32/0 | ✅ | — | — |
| Divider | `divider.md` | 1/0 | 8/0 | ✅ | — | — |
| Dropdown Input | `dropdown-input.md` | 2/2 | 310/138 | ✅ | ✅ | ✅ |
| File upload | `file-upload.md` | 2/2 | 20/20 | ✅ | ✅ | ✅ |
| Filtration | `filtration.md` | 1/0 | 30/0 | ✅ | — | — |
| Floating Button | `floating-button.md` | 1/0 | 288/0 | ✅ | — | — |
| Inline Alert | `inline-alert.md` | 1/1 | 40/20 | ✅ | ✅ | ✅ |
| Link | `link.md` | 1/1 | 144/120 | ✅ | ✅ | ✅ |
| List | `list.md` | 2/1 | 54/10 | ✅ | ✅ | ✅ |
| Loading | `loading.md` | 1/0 | 84/0 | ✅ | — | ✅ |
| Menu | `menu.md` | 2/3 | 74/54 | ✅ | ✅ | ✅ |
| Metric | `metric.md` | 1/0 | 24/0 | ✅ | — | — |
| Modals | `modals.md` | 1/5 | 24/17 | ✅ | ✅ | ✅ |
| Notification | `notification.md` | 1/0 | 10/0 | ✅ | — | ✅ |
| Notification Toast | `notification-toast.md` | 1/1 | 20/10 | ✅ | ✅ | ✅ |
| Number Input | `number-input.md` | 2/0 | 336/0 | ✅ | — | — |
| Pagination | `pagination.md` | 1/1 | 30/21 | ✅ | ✅ | ✅ |
| Progress Bar | `progress-bar.md` | 2/0 | 88/0 | ✅ | — | — |
| Progress indicator | `progress-indicator.md` | 1/1 | 56/28 | ✅ | ✅ | ✅ |
| Quote | `quote.md` | 1/0 | 8/0 | ✅ | — | — |
| Radial Stepper | `radial-stepper.md` | 2/0 | 150/0 | ✅ | — | — |
| Radio | `radio.md` | 2/2 | 28/24 | ✅ | ✅ | ✅ |
| Rating | `rating.md` | 1/1 | 30/30 | ✅ | ✅ | ✅ |
| Search Box | `search-box.md` | 2/0 | 146/0 | ✅ | — | — |
| Skeleton | `skeleton.md` | 5/0 | 71/0 | ✅ | — | — |
| Slideout Menu | `slideout-menu.md` | 2/0 | 10/0 | ✅ | — | ✅ |
| Slider | `slider.md` | 1/0 | 24/0 | ✅ | — | — |
| Spinner | `spinner.md` | 0/1 | 0/84 | — | ✅ | — |
| Structured List | `structured-list.md` | 5/0 | 108/0 | ✅ | — | — |
| Switch | `switch.md` | 2/2 | 24/16 | ✅ | ✅ | ✅ |
| Table | `table.md` | 7/0 | 104/0 | ✅ | — | — |
| Tabs | `tabs.md` | 4/4 | 146/118 | ✅ | ✅ | ✅ |
| Tags | `tags.md` | 2/2 | 378/378 | ✅ | ✅ | ✅ |
| Text input | `text-input.md` | 2/3 | 368/112 | ✅ | ✅ | ✅ |
| Textarea | `textarea.md` | 1/1 | 146/121 | ✅ | ✅ | ✅ |
| Tooltip | `tooltip.md` | 2/2 | 100/76 | ✅ | ✅ | ✅ |
| UI Shell - Footer | `ui-shell-footer.md` | 1/0 | 8/0 | ✅ | — | ✅ |
| UI Shell - Nav Drawer | `ui-shell-nav-drawer.md` | 3/3 | 106/86 | ✅ | ✅ | — |
| UI Shell - Nav Header | `ui-shell-nav-header.md` | 8/0 | 152/0 | ✅ | — | ✅ |
| UI Shell - Navigation Bar | `ui-shell-navigation-bar.md` | 0/1 | 0/10 | — | ✅ | — |
| UI Shell - Second Level Nav Header | `ui-shell-second-level-nav-header.md` | 2/0 | 8/0 | ✅ | — | — |
| UI Shell - Tab Bar | `ui-shell-tab-bar.md` | 0/3 | 0/39 | — | ✅ | — |
| UI Shell - Table of Content | `ui-shell-table-of-content.md` | 2/0 | 50/0 | ✅ | — | ✅ |
| Badge, Featured icon | `badge.md`, `featured-icon.md` | — | — | CSS only (no Figma page) | — | ✅ |

Counts as web/mobile. Remaining gaps: breakpoint px values unverified; some text styles had mixed/null font names; Figma typos (`Ig`, `Hight`, `Wieght`) normalised; colour tables capped at 160 variant combos per set; usage notes only where Figma has a description.
