# Platform Code registry

Source for the `@dga` shadcn registry, served at `https://dga.omqkhafi.dev/r/{name}.json`.

| Path                                 | What it is                                                                                                      |
| ------------------------------------ | --------------------------------------------------------------------------------------------------------------- |
| `registry.json`                      | Item metadata: `dga` (base), `dga-style`, `dga-tokens` (filled at build time from the token model), components. |
| `bases/base/`                        | Base UI components, written with stable `cn-*` classes.                                                         |
| `styles/style-dga.css`               | Maps `cn-*` classes to DGA token utilities with `@apply`.                                                       |
| `styles/dga/tokens.css`, `theme.css` | Generated from `tokens/tokens.json` by `bun run tokens`. Do not edit.                                           |

`bun run registry:build` inlines the style map into each component (the same transform shadcn uses for its own base styles) and runs `shadcn build` into `apps/docs/public/r`.

## Install path

Every `registry:ui` file declares `files[].target: "components/dga/<name>.tsx"` (the `direction` helper: `lib/dga/direction.tsx`), so `@dga` components never land in `components/ui` and never need an alias change in the user's `components.json`. Sources import each other as `@/components/dga/*` and `@/lib/dga/*` (not `@/registry/...`): the CLI rewrites `@/registry/.../ui/x` to the `ui` alias, and leaves it pointing at a stock `components/ui/x.tsx` if one exists. `@/registry/bases/base/lib/utils` stays, and resolves to the project's `cn` helper. `tsconfig` paths in the repo root, `registry/` and `apps/docs/` map `@/components/dga/*` and `@/lib/dga/*` to the sources. `bun run test:install` covers a project that already has stock shadcn `button`, `input` and `dialog`.

Set `REGISTRY_URL=http://localhost:3000` to build items that point at a local server.
