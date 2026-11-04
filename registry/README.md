# DGA UI registry

Source for the `@dga` shadcn registry, served at `https://dga.omqkhafi.dev/r/{name}.json`.

| Path                                 | What it is                                                                                  |
| ------------------------------------ | ------------------------------------------------------------------------------------------- |
| `registry.json`                      | Item metadata. `dga-style`'s `cssVars`/`css` are filled at build time from the token model. |
| `bases/base/`                        | Base UI components, written with stable `cn-*` classes.                                     |
| `styles/style-dga.css`               | Maps `cn-*` classes to DGA token utilities with `@apply`.                                   |
| `styles/dga/tokens.css`, `theme.css` | Generated from `tokens/tokens.json` by `bun run tokens`. Do not edit.                       |

`bun run registry:build` inlines the style map into each component (the same transform shadcn uses for its own base styles) and runs `shadcn build` into `apps/docs/public/r`.

Set `REGISTRY_URL=http://localhost:3000` to build items that point at a local server.
