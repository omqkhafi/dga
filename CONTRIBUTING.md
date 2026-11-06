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

One language per view. English pages, previews and strings contain no Arabic, and Arabic ones contain no English words, apart from code, package, prop and component names, URLs and product names (`scripts/locale-allowlist.json`). `bun run test` checks the dictionaries and every docs page, and `bun run test:e2e` checks 18 rendered pages in both languages.

**Accepted exception.** On Arabic pages, the generated **Deviation reasons** and the **Contrast state labels** stay in English. Their source data (the logged reasons, the Figma variant and state names) is English, and a full translation would be unclear. They are marked `lang="en"` (with `dir="ltr"`), and the audit skips anything marked with a language other than the page's, so they are covered by the allowlist rule rather than reported. This is a decision, not a gap: do not translate them, and do not use `lang="en"` to excuse any other English text on an Arabic page.

### Arabic writing and typography

- Modern Standard Arabic, plain and specific, the same register as the English. Use the same Arabic term for the same thing everywhere; look it up in existing pages first.
- Arabic text uses IBM Plex Sans Arabic, line height 1.8 for body text (1.5 for headings) and no letter spacing. The docs site applies this for `:lang(ar)`; see Foundations > Typography.
- **Numerals.** Western digits (0 to 9) in prose and in every technical value (versions, ratios, sizes, counts, dates). Arabic-Indic digits (٠ to ٩) only in sample content that imitates a citizen-facing service. Never mix the two in one view.
- **Digits in demos.** A sample that imitates a citizen-facing service uses Arabic-Indic digits for all of it (dates, counts, reference numbers); do not mix in Western digits.
- Use logical properties (`ms-*`, `ps-*`, `start-*`) everywhere, and check every change in RTL and LTR, light and dark, at 375, 768 and 1280px.

## Components

A component phase follows the rules at the top of [ROADMAP.md](ROADMAP.md): Base UI, logical properties, every state in the contrast audit, a docs page in both languages, the install test, and CHANGELOG and Deviations updated.

## Commits

Describe what changed and why. Update `CHANGELOG.md` under `[Unreleased]`; `package.json` must match the latest released version.
