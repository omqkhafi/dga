# Contributing

## Before you open a pull request

```bash
bun run lint
bun run typecheck
bun run test
bun run tokens:check && bun run api:check && bun run translations:check
bun run build
bun run test:e2e   # with the site running; set E2E_BASE_URL if it is not on :3000
```

If you change tokens, run `bun run tokens`; if you change a component's props, run `bun run api`; commit the generated files (`apps/docs/lib/generated`, `apps/docs/public/r`).

## English and Arabic ship together

Every docs page and every UI string exists in English and Arabic. A pull request that adds or changes English content is not complete until the Arabic is updated in the same pull request.

- **Pages.** `name.mdx` is the English source; `name.ar.mdx` is its translation, and its sidebar titles are in `meta.ar.json` next to `meta.json`. A new component page needs both.
- **Same structure.** The Arabic page uses the same components, the same headings in the same order (with the English slug as the explicit id, for example `## الاستخدام [#usage]`, so links and the table of contents match) and the same code fences. Only prose, headings, notes and preview titles are translated.
- **What stays in English:** code, prop names, token names, CLI commands, component names and file names. Code blocks stay left-to-right.
- **Drift check.** Each Arabic page has `sourceHash` in its front matter: the hash of the English page it was translated from. When you change an English page, update the Arabic page, then run `bun run translations:stamp` to record the new hash. `bun run translations:check` (and CI) fails when a page is missing, outdated, or differs from the English one in components, headings or code fences.
- **UI strings.** Add each key to `apps/docs/lib/dictionary/en.ts` and `ar.ts`. The Arabic dictionary is typed against the English keys, so a missing one fails the typecheck.
- **API reference.** Every prop and part needs a `descriptionAr` in `scripts/api-descriptions-ar.ts`; `bun run api` fails without it.

### Locale purity

One language per view. English pages and strings contain no Arabic, and Arabic ones contain no English words, apart from code, package, prop and component names, URLs and product names (`scripts/locale-allowlist.json`). `bun run test` checks the dictionaries, every docs page and the preview strings, and `bun run test:e2e` checks 22 rendered pages in both languages and every preview in both directions.

**Preview content follows the direction toggle (0.4.3).** Inside a preview the content language follows the LTR/RTL toggle, not the page: RTL renders the Arabic sample content (`lang="ar"`) and LTR the English one (`lang="en"`), on `/en` and `/ar` pages alike. This replaces the 0.4.1 rule that previews follow the page language. The default direction is still the page's (English pages open in LTR, Arabic pages in RTL), so the default view is in the page language. Everything outside the frame stays in the page language: prose, headings, code blocks, installation and usage text, the table of contents, the preview toolbar labels and the example titles. Code samples do not change.

- **One mechanism.** The preview sets the frame's `lang` from its direction (`contentLang` in `apps/docs/lib/preview.ts`), and every example reads it with `Bi`, `useBi` or `useUi` from `apps/docs/components/previews/bi.tsx`. Do not read the page locale or the direction inside an example to pick its text.
- **Both languages for every string.** Every visible string, placeholder and accessible name in an example has an English and an Arabic version, so neither direction mixes languages. Names, IDs and dates use natural Arabic forms in RTL (نورة القحطاني, Arabic-Indic digits for reference numbers, dates and counts); technical values such as sizes in px keep Western digits.
- **Purity per direction.** Preview content is exempt from the page-language check, but each direction must be pure, with the same allowlist: RTL previews have no English words and LTR previews have no Arabic. `scripts/locale-purity.test.ts` checks the source strings, and `scripts/e2e.mjs` checks every rendered preview in both directions and toggles Field, Input, Select, Dialog, Toast and Tabs on an English and an Arabic page.

**Accepted exception.** On Arabic pages, the generated **Deviation reasons** and the **Contrast state labels** stay in English. Their source data (the logged reasons, the Figma variant and state names) is English, and a full translation would be unclear. They are marked `lang="en"` (with `dir="ltr"`), and the audit skips anything marked with a language other than the page's, so they are covered by the allowlist rule rather than reported. This is a decision, not a gap: do not translate them, and do not use `lang="en"` to excuse any other English text on an Arabic page.

### Arabic writing and typography

- Modern Standard Arabic, plain and specific, the same register as the English. Use the same Arabic term for the same thing everywhere; look it up in existing pages first.
- Arabic text uses IBM Plex Sans Arabic, line height 1.8 for body text (1.5 for headings) and no letter spacing. The docs site applies this for `:lang(ar)`; see Foundations > Typography.
- **Numerals.** Western digits (0 to 9) in prose and in every technical value (versions, ratios, sizes, counts, dates). Arabic-Indic digits (٠ to ٩) only in sample content that imitates a citizen-facing service. Never mix the two in one view.
- **Digits in demos.** A sample that imitates a citizen-facing service uses Arabic-Indic digits for all of it (dates, counts, reference numbers); do not mix in Western digits.
- Use logical properties (`ms-*`, `ps-*`, `start-*`) everywhere, and check every change in RTL and LTR, light and dark, at 375, 768 and 1280px.

## Components

A component phase follows the rules at the top of [ROADMAP.md](ROADMAP.md): Base UI, logical properties, every state in the contrast audit, a docs page in both languages, the install test, and CHANGELOG and Deviations updated.

## What CI runs

`scripts/ci/affected.ts` reads the changed files and tells `.github/workflows/ci.yml` which jobs to run. A push to main, a manual run, and any change it cannot classify run everything.

| Change | Runs |
| --- | --- |
| Markdown (README, ROADMAP, CONTRIBUTING, `docs/`), CHANGELOG | Lint. CHANGELOG also runs its unit test, which is also what keeps the version in `package.json` in step. |
| `tokens/`, `scripts/tokens/`, `scripts/generate-tokens.ts`, `registry/styles/`, `.github/`, dependencies | The full suite: tokens check with the contrast audit, install of every item, every browser group, Lighthouse. |
| A registry component | The install test for that item and everything that depends on it through `registryDependencies`, and the browser groups mapped to them in `scripts/ci/e2e-map.json`. |
| Preview, layout, locale, global CSS, the browser harness | Every browser group. |
| The shell (header, footer, sidebar), layout or global CSS | The shell groups, and Lighthouse. Lighthouse otherwise runs only on push to main. |

The browser checks are the groups in `scripts/e2e.mjs`. A pull request runs the shell groups plus the groups mapped to the changed components, split over up to four shards, with one merged report. When you add a component, add it to `scripts/ci/e2e-map.json` (a test fails until you do). Run a group yourself with `E2E_GROUPS=navigation E2E_COMPONENTS=rating bun run test:e2e` and one item's install with `INSTALL_ITEMS=rating bun run test:install`.

Agents: after opening a pull request, subscribe to its events and stop. Do not poll or wait through a run. Before pushing, run only the tests for what you changed; the full suite runs on main.

## Commits

Describe what changed and why. Update `CHANGELOG.md` under `[Unreleased]`; `package.json` must match the latest released version.
