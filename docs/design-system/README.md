# DGA Platforms Code — extracted design system kit

Files: `tokens.json` (W3C DTCG; `light`, `dark`, `typography` groups, aliases as `{token}`), `tokens.css` (`:root` + `[data-theme="dark"]`), `tailwind.config.ts` (preset → CSS vars), `DESIGN_SYSTEM.md` (docs), `_source/` (raw site CSS/JS/HTML used for extraction).

Quick start: import `tokens.css`, load IBM Plex Sans Arabic (400–700), set `<html dir="rtl" lang="ar">`, add `presets:[dgaPreset]`.

## Official resources
- Design system site: https://design.dga.gov.sa/ (foundations, components, templates, change log)
- DGA: https://dga.gov.sa/
- Font: IBM Plex Sans Arabic — https://fonts.google.com/specimen/IBM+Plex+Sans+Arabic
- Icons: Hugeicons — https://hugeicons.com/

No official public npm package, GitHub repo, or public Figma link was found in the site bundle. Figma kit/code downloads appear to be behind the site's own UI/registration ⚠️.

## Community (NOT official — verify before use)
npm: `@dev-dga/tokens|css|react` 1.5.0, `@maldarabseh/dga-tokens|react|angular|stencil` 1.0.7 (repo github.com/dga-ksa/design-system), `@waaelg/dga-design-system`, `platformscode-new-angular`, `@a.nemreen/dga-ui`.

## Official Figma (Community profile https://www.figma.com/@sdga, support DS-DGA@dga.gov.sa)
- Components Library: https://www.figma.com/community/file/1392264328585493958/components-library-platforms-code (last changelog 3 Nov 2025)
- Mobile Components: https://www.figma.com/community/file/1392271796654597578/mobile-components-platforms-code
- Icons: https://www.figma.com/community/file/1392269191144731080/icons-platforms-code
- Home Page Template: https://www.figma.com/community/file/1412792257811427893/home-page-template-platforms-code (updated 9 Apr 2026)
- Foundations, Service Page, Contact Us, Feedback, Help & Support, FAQ, Form, Site Map: listed on the @sdga profile, but I couldn't resolve their URLs (the profile blocks automated fetching and search didn't index them). Also seen: a second "Components Library" listing (1536334258162109290, owner unverified) and a third-party "Foundations (Copy)" (1537754832766664128, not official).
- DGA open-source listing: https://oss.dga.gov.sa/en/products/dga-ac319-national-design-system

## Duplicated Figma files used for extraction (read-only)
- Foundations: https://www.figma.com/design/eJy7ExFwQM8mBZPvz9fmXr/?node-id=2-2
- Components Library: https://www.figma.com/design/trJvYAeN2wdayn2VdSUR2N/?node-id=16026-49769
- Mobile Components: https://www.figma.com/design/Ci0aNw48DSdp7MsRw0U1nA/?node-id=1030-33572
- Token conflicts Figma vs site CSS: `TOKEN_CONFLICTS.md`
