// End-to-end install test. Builds the registry, serves it locally, and installs it into fresh
// Next.js apps three ways:
//   1. `shadcn init <url>/r/dga.json`          the registry:base item (recommended path)
//   2. `shadcn init <url>/r/dga-style.json`    the style item on its own (Phase 1 path)
//   3. `shadcn add  <url>/r/dga-tokens.json`   tokens only, no components
//   4. `shadcn init <url>/r/dga.json`, then `shadcn add @dga/number-input`: one form control on
//      its own, to check that its registry dependencies (input, field, utils) are pulled in
// Path 1 also adds every registry:ui component and renders them on a page. Every app must build.
//
//   bun run test:install                                   local registry (needs network for npm)
//   DGA_REGISTRY_URL=https://dga.omqkhafi.dev bun run test:install   test the production registry
//   KEEP=1 bun run test:install                            keep the temp apps for inspection

import { cpSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { $ } from "bun";
import { ROOT } from "./tokens/source";

const NEXT_VERSION = "16.4.5";
const SHADCN_VERSION = (
  JSON.parse(readFileSync(join(ROOT, "package.json"), "utf8")) as {
    devDependencies: Record<string, string>;
  }
).devDependencies.shadcn;
/** dga-style must stay small; the tokens live in dga-tokens. */
const STYLE_MAX_BYTES = 10_000;

type Item = { name: string; type: string };
const registryItems = (
  JSON.parse(readFileSync(join(ROOT, "registry", "registry.json"), "utf8")) as { items: Item[] }
).items;
const components = registryItems.filter((i) => i.type === "registry:ui").map((i) => i.name);
/** The Phase 3 form items. Each must be in the registry and installable. */
const FORM_ITEMS = [
  "field",
  "input",
  "textarea",
  "select",
  "number-input",
  "search-box",
  "checkbox",
  "radio",
  "switch",
  "file-upload",
];

/** The Phase 4 interactive items, plus the direction library file they share. */
const INTERACTIVE_ITEMS = [
  "dialog",
  "drawer",
  "tooltip",
  "menu",
  "tabs",
  "accordion",
  "content-switcher",
  "toast",
  "notification",
  "inline-alert",
];

const work = mkdtempSync(join(tmpdir(), "dga-install-"));
const registryDir = join(work, "serve");
const failures: string[] = [];
const check = (ok: boolean, message: string) => {
  console.log(`${ok ? "✓" : "✗"} ${message}`);
  if (!ok) failures.push(message);
};

// Not REGISTRY_URL: the shadcn CLI reads that as its own default registry.
const remote = process.env.DGA_REGISTRY_URL;
const server = remote
  ? undefined
  : Bun.serve({
      port: 0,
      async fetch(req) {
        const file = Bun.file(join(registryDir, new URL(req.url).pathname));
        return (await file.exists())
          ? new Response(file)
          : new Response("Not found", { status: 404 });
      },
    });
const url = (remote ?? `http://localhost:${server?.port}`).replace(/\/$/, "");
const shadcn = `shadcn@${SHADCN_VERSION}`;

type Pkg = { dependencies: Record<string, string>; devDependencies: Record<string, string> };
const reader = (app: string) => ({
  text: (path: string) => readFileSync(join(app, path), "utf8"),
  json: <T>(path: string) => JSON.parse(readFileSync(join(app, path), "utf8")) as T,
});

function checkTokens(label: string, css: string) {
  check(css.includes("--background-body:"), `${label}: globals.css has DGA semantic tokens`);
  check(css.includes('[data-theme="dark"]'), `${label}: globals.css has the dark scope`);
  check(css.includes("@media (width >= 48rem)"), `${label}: globals.css has the tablet mode`);
  check(css.includes("--text-color-primary:"), `${label}: globals.css has the short aliases`);
  check(!css.includes("--color-colors-"), `${label}: no junk --color-colors-* entries`);
}

function checkStyle(label: string, app: string) {
  const r = reader(app);
  const utils = r.text("src/lib/utils.ts");
  const pkg = r.json<Pkg>("package.json");
  check(/from\s+["']cn["']/.test(utils), `${label}: lib/utils.ts imports cn from "cn"`);
  const ours = readFileSync(join(ROOT, "registry", "bases", "base", "lib", "utils.ts"), "utf8");
  check(utils.trim() === ours.trim(), `${label}: lib/utils.ts is the @dga utils item`);
  for (const dep of [
    "cn",
    "@base-ui/react",
    "@hugeicons/react",
    "@hugeicons/core-free-icons",
    "class-variance-authority",
  ]) {
    check(dep in pkg.dependencies, `${label}: dependency ${dep} installed`);
  }
  for (const dep of ["clsx", "tailwind-merge"]) {
    check(!(dep in pkg.dependencies), `${label}: dependency ${dep} not installed`);
  }
  const css = r.text("src/app/globals.css");
  check(css.includes('@import "tw-animate-css"'), `${label}: globals.css imports tw-animate-css`);
  checkTokens(label, css);
  check(
    r.text("src/app/layout.tsx").includes("IBM_Plex_Sans_Arabic"),
    `${label}: layout.tsx loads IBM Plex Sans Arabic`,
  );
}

async function build(label: string, app: string) {
  const result = await $`bun run build`.cwd(app).nothrow().quiet();
  check(result.exitCode === 0, `${label}: the app builds`);
  if (result.exitCode !== 0) console.error(result.stderr.toString() || result.stdout.toString());
}

/** A page that renders every component, so the build type-checks their public API. */
function smokePage(names: string[]) {
  const pascal = (n: string) => n.replace(/(^|-)(\w)/g, (_, __, c: string) => c.toUpperCase());
  const imports = names.map((n) => `import * as ${pascal(n)}Module from "@/components/ui/${n}";`);
  const uses = names.map((n) => `  ${pascal(n)}Module,`);
  return `${imports.join("\n")}

const modules = [
${uses.join("\n")}
];

export default function Page() {
  return <main>{modules.length} DGA components installed</main>;
}
`;
}

try {
  if (!remote) {
    console.log(`→ building registry for ${url}`);
    await $`bun ${join(ROOT, "scripts", "build-registry.ts")}`
      .env({ ...process.env, REGISTRY_URL: url, REGISTRY_OUTPUT: join(registryDir, "r") })
      .quiet();
  }
  console.log(`→ registry at ${url}, apps in ${work}`);

  const styleSize = (await (await fetch(`${url}/r/dga-style.json`)).text()).length;
  check(styleSize < STYLE_MAX_BYTES, `dga-style.json is small (${styleSize} bytes)`);

  // One create-next-app, copied for each path.
  const template = join(work, "template");
  await $`bunx create-next-app@${NEXT_VERSION} ${template} --ts --tailwind --app --src-dir --import-alias ${"@/*"} --use-bun --no-eslint --yes --disable-git`.quiet();
  // Copy without node_modules: its .bin links point at the template and would load a second React.
  const fresh = async (name: string) => {
    const app = join(work, name);
    cpSync(template, app, { recursive: true, filter: (src) => !src.includes("/node_modules") });
    await $`bun install`.cwd(app).quiet();
    return app;
  };

  // 1. registry:base
  {
    const label = "dga";
    const app = await fresh(label);
    await $`bunx ${shadcn} init ${url}/r/dga.json --yes --no-monorepo < /dev/null`.cwd(app).quiet();
    const config = reader(app).json<{
      style: string;
      iconLibrary: string;
      rtl: boolean;
      registries: Record<string, string>;
    }>("components.json");
    check(config.iconLibrary === "hugeicons", `${label}: components.json iconLibrary is hugeicons`);
    check(config.rtl === true, `${label}: components.json rtl is true`);
    check(config.style === "base-nova", `${label}: components.json style is base-nova`);
    check(
      config.registries?.["@dga"] === `${url}/r/{name}.json`,
      `${label}: components.json has the @dga registry`,
    );
    checkStyle(label, app);
    if (components.length > 0) {
      const add =
        await $`bunx ${shadcn} add ${components.map((c) => `@dga/${c}`)} --yes --overwrite < /dev/null`
          .cwd(app)
          .nothrow()
          .quiet();
      check(add.exitCode === 0, `${label}: shadcn add @dga/{${components.join(",")}}`);
      for (const item of FORM_ITEMS) {
        check(components.includes(item), `${label}: the registry has the form item ${item}`);
      }
      for (const item of INTERACTIVE_ITEMS) {
        check(components.includes(item), `${label}: the registry has the interactive item ${item}`);
      }
      if (add.exitCode !== 0) console.error(add.stderr.toString() || add.stdout.toString());
      for (const c of components) {
        const source = reader(app).text(`src/components/ui/${c}.tsx`);
        check(!/\bcn-[a-z]/.test(source.replace(/data-slot=|"cn"/g, "")), `${c}: cn-* inlined`);
        check(!/clsx|tailwind-merge/.test(source), `${c}: no clsx or tailwind-merge`);
      }
      writeFileSync(join(app, "src/app/page.tsx"), smokePage(components));
    }
    await build(label, app);
  }

  // 4. one form control on its own: its dependencies come with it
  {
    const label = "dga-form-control";
    const app = await fresh(label);
    await $`bunx ${shadcn} init ${url}/r/dga.json --yes --no-monorepo < /dev/null`.cwd(app).quiet();
    const add = await $`bunx ${shadcn} add @dga/number-input --yes < /dev/null`
      .cwd(app)
      .nothrow()
      .quiet();
    check(add.exitCode === 0, `${label}: shadcn add @dga/number-input`);
    if (add.exitCode !== 0) console.error(add.stderr.toString() || add.stdout.toString());
    const r = reader(app);
    for (const file of ["number-input", "input", "field"]) {
      let found = true;
      try {
        r.text(`src/components/ui/${file}.tsx`);
      } catch {
        found = false;
      }
      check(found, `${label}: ${file}.tsx was installed with number-input`);
    }
    const source = r.text("src/components/ui/number-input.tsx");
    check(source.startsWith('"use client"'), `${label}: number-input.tsx is a client component`);
    check(!/\bcn-[a-z]/.test(source.replace(/data-slot=|"cn"/g, "")), `${label}: cn-* inlined`);
    check(
      source.includes("normalizeDigits"),
      `${label}: number-input.tsx has the digit normaliser`,
    );
    writeFileSync(
      join(app, "src/app/page.tsx"),
      `import { Field, FieldLabel } from "@/components/ui/field";
import { NumberInput } from "@/components/ui/number-input";

export default function Page() {
  return (
    <Field>
      <FieldLabel>Quantity</FieldLabel>
      <NumberInput defaultValue={1} />
    </Field>
  );
}
`,
    );
    await build(label, app);
  }

  // 4b. one interactive control on its own: the direction helper it needs comes with it
  {
    const label = "dga-interactive-control";
    const app = await fresh(label);
    await $`bunx ${shadcn} init ${url}/r/dga.json --yes --no-monorepo < /dev/null`.cwd(app).quiet();
    const add = await $`bunx ${shadcn} add @dga/tabs --yes < /dev/null`.cwd(app).nothrow().quiet();
    check(add.exitCode === 0, `${label}: shadcn add @dga/tabs`);
    if (add.exitCode !== 0) console.error(add.stderr.toString() || add.stdout.toString());
    const r = reader(app);
    let direction = "";
    try {
      direction = r.text("src/lib/direction.tsx");
    } catch {}
    check(
      direction.includes("AutoDirection"),
      `${label}: lib/direction.tsx was installed with tabs`,
    );
    const tabs = r.text("src/components/ui/tabs.tsx");
    check(tabs.startsWith('"use client"'), `${label}: tabs.tsx is a client component`);
    check(tabs.includes("@/lib/direction"), `${label}: tabs.tsx imports the direction helper`);
    check(!/\bcn-[a-z]/.test(tabs.replace(/data-slot=|"cn"/g, "")), `${label}: cn-* inlined`);
    writeFileSync(
      join(app, "src/app/page.tsx"),
      `import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Page() {
  return (
    <Tabs defaultValue="a">
      <TabsList aria-label="Sections">
        <TabsTrigger value="a">A</TabsTrigger>
        <TabsTrigger value="b">B</TabsTrigger>
      </TabsList>
      <TabsContent value="a">One</TabsContent>
      <TabsContent value="b">Two</TabsContent>
    </Tabs>
  );
}
`,
    );
    await build(label, app);
  }

  // 2. registry:style on its own
  {
    const label = "dga-style";
    const app = await fresh(label);
    await $`bunx ${shadcn} init ${url}/r/dga-style.json --base base --rtl --yes --no-monorepo < /dev/null`
      .cwd(app)
      .quiet();
    checkStyle(label, app);
    await build(label, app);
  }

  // 3. tokens only
  {
    const label = "dga-tokens";
    const app = await fresh(label);
    writeFileSync(
      join(app, "components.json"),
      JSON.stringify({
        $schema: "https://ui.shadcn.com/schema.json",
        style: "base-nova",
        rsc: true,
        tsx: true,
        tailwind: {
          config: "",
          css: "src/app/globals.css",
          baseColor: "neutral",
          cssVariables: true,
        },
        aliases: { components: "@/components", utils: "@/lib/utils" },
      }),
    );
    await $`bunx ${shadcn} add ${url}/r/dga-tokens.json --yes < /dev/null`.cwd(app).quiet();
    checkTokens(label, reader(app).text("src/app/globals.css"));
    const pkg = reader(app).json<Pkg>("package.json");
    check(!("@base-ui/react" in pkg.dependencies), `${label}: no component dependencies`);
    await build(label, app);
  }
} finally {
  server?.stop(true);
  if (!process.env.KEEP) rmSync(work, { recursive: true, force: true });
}

if (failures.length > 0) {
  console.error(`\n${failures.length} install check(s) failed.`);
  process.exit(1);
}
console.log("\nInstall test passed.");
