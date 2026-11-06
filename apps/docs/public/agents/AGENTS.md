<!-- BEGIN PLATFORM-CODE -->
## Platform Code (@dga)

This project uses Platform Code, the Saudi DGA design system as a shadcn registry on Base UI.

- Install: `npx shadcn@latest init https://dga.omqkhafi.dev/r/dga.json`, then `npx shadcn@latest add @dga/<name>`.
- Components install to `components/dga/<name>.tsx` (never `components/ui`): `import { Button } from "@/components/dga/button"`. Keep any stock shadcn in `components/ui` untouched.
- Docs for agents: `https://dga.omqkhafi.dev/en/llms.txt` (Arabic: `/ar/llms.txt`). Every docs page has a Markdown twin at `/{lang}/docs/<slug>.md`.
- Use only components that exist in the registry. Never invent a component, a prop or a token.
- Layout is RTL-ready: use CSS logical properties (`ps-*`, `pe-*`, `ms-*`, `me-*`, `start-*`, `end-*`), never `left` or `right`.
- Colours, spacing, radius and type come from DGA tokens only.
- Digits: Western digits in technical content, Arabic-Indic digits only in Arabic citizen sample content, never mixed in one view.
- Wrap every form control in `Field`.
- Read `/{lang}/docs/deviations` before changing a colour to fix contrast.
- The full skill is at `.claude/skills/platform-code/SKILL.md` and `.agents/skills/platform-code/SKILL.md`.
<!-- END PLATFORM-CODE -->
