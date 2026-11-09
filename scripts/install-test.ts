// End-to-end install test. Builds the registry, serves it locally, and installs it into fresh
// Next.js apps three ways:
//   1. `shadcn init <url>/r/dga.json`          the registry:base item (recommended path)
//   2. `shadcn init <url>/r/dga-style.json`    the style item on its own (Phase 1 path)
//   3. `shadcn add  <url>/r/dga-tokens.json`   tokens only, no components
//   6. a project with stock shadcn button, input, dialog, carousel and calendar in components/ui: @dga items land in
//      components/dga and leave components/ui byte-identical
//   4. `shadcn init <url>/r/dga.json`, then `shadcn add @dga/number-input`: one form control on
//      its own, to check that its registry dependencies (input, field, utils) are pulled in
// Path 1 also adds every registry:ui component and renders them on a page. Every app must build.
//
//   bun run test:install                                   local registry (needs network for npm)
//   DGA_REGISTRY_URL=https://dga.omqkhafi.dev bun run test:install   test the production registry
//   KEEP=1 bun run test:install                            keep the temp apps for inspection
//   INSTALL_ITEMS=button,dialog bun run test:install       only those items and the scenarios that
//                                                           involve them (pull requests; CI passes the
//                                                           changed items plus their dependants).
//                                                           Unset or "all": everything.

import { cpSync, existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
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

/** The Phase 5 navigation and data display items. Stock shadcn has its own breadcrumb, card,
 *  pagination, progress and table, so the collision fixture installs both side by side. */
const NAVIGATION_ITEMS = [
  "breadcrumb",
  "pagination",
  "table-of-contents",
  "card",
  "list",
  "table",
  "data-table",
  "rating",
  "progress",
  "stepper",
];

/** The Phase 6 composite items. Stock shadcn has its own calendar and carousel, so the collision
 *  fixture installs both side by side. */
const COMPOSITE_ITEMS = [
  "header",
  "nav-drawer",
  "second-nav",
  "footer",
  "date-picker",
  "carousel",
  "filtration",
];

/** The Phase 7 items (0.7.0): the Platform Code extensions, and the Slider and Digital Stamp that
 *  DGA does define. Stock shadcn has its own version of every name here except digital-stamp, so
 *  the collision fixture installs both side by side. */
const EXTENSION_ITEMS = [
  "popover",
  "hover-card",
  "alert-dialog",
  "context-menu",
  "toggle",
  "toggle-group",
  "combobox",
  "command",
  "input-otp",
  "input-group",
  "button-group",
];
const PHASE7_DGA_ITEMS = ["slider", "digital-stamp"];
/** The Phase 7 part 2 items (0.7.1), all extensions. Stock shadcn has its own version of every
 *  name here, so the collision fixture installs both side by side. Recharts and
 *  react-resizable-panels arrive only with chart and resizable, at their pinned versions. */
const EXTENSION_ITEMS_2 = [
  "menubar",
  "navigation-menu",
  "sidebar",
  "collapsible",
  "scroll-area",
  "resizable",
  "aspect-ratio",
  "kbd",
  "empty",
  "item",
  "chart",
];
const PINNED_LIBS = { recharts: "3.8.0", "react-resizable-panels": "4.14.8" };
const PHASE7_ITEMS = [...EXTENSION_ITEMS, ...PHASE7_DGA_ITEMS];
const STOCK_PHASE7 = EXTENSION_ITEMS.concat("slider");

/** INSTALL_ITEMS narrows the run to the changed items; unset or "all" runs everything. */
const only = process.env.INSTALL_ITEMS;
const selected = !only || only === "all" ? undefined : new Set(only.split(",").filter(Boolean));
const wants = (names: string[]) => !selected || names.some((n) => selected.has(n));
const installable = selected ? components.filter((c) => selected.has(c)) : components;

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
  const imports = names.map((n) => `import * as ${pascal(n)}Module from "@/components/dga/${n}";`);
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
    if (installable.length > 0) {
      const add =
        await $`bunx ${shadcn} add ${installable.map((c) => `@dga/${c}`)} --yes --overwrite < /dev/null`
          .cwd(app)
          .nothrow()
          .quiet();
      check(add.exitCode === 0, `${label}: shadcn add @dga/{${installable.join(",")}}`);
      for (const item of FORM_ITEMS) {
        check(components.includes(item), `${label}: the registry has the form item ${item}`);
      }
      for (const item of INTERACTIVE_ITEMS) {
        check(components.includes(item), `${label}: the registry has the interactive item ${item}`);
      }
      for (const item of NAVIGATION_ITEMS) {
        check(components.includes(item), `${label}: the registry has the navigation item ${item}`);
      }
      for (const item of COMPOSITE_ITEMS) {
        check(components.includes(item), `${label}: the registry has the composite item ${item}`);
      }
      for (const item of PHASE7_ITEMS) {
        check(components.includes(item), `${label}: the registry has the Phase 7 item ${item}`);
      }
      if (add.exitCode !== 0) console.error(add.stderr.toString() || add.stdout.toString());
      for (const c of installable) {
        const source = reader(app).text(`src/components/dga/${c}.tsx`);
        check(!/\bcn-[a-z]/.test(source.replace(/data-slot=|"cn"/g, "")), `${c}: cn-* inlined`);
        check(!/clsx|tailwind-merge/.test(source), `${c}: no clsx or tailwind-merge`);
      }
      writeFileSync(join(app, "src/app/page.tsx"), smokePage(installable));
    }
    await build(label, app);
  }

  // 4. one form control on its own: its dependencies come with it
  if (wants(["number-input", "input", "field"])) {
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
        r.text(`src/components/dga/${file}.tsx`);
      } catch {
        found = false;
      }
      check(found, `${label}: ${file}.tsx was installed with number-input`);
    }
    const source = r.text("src/components/dga/number-input.tsx");
    check(source.startsWith('"use client"'), `${label}: number-input.tsx is a client component`);
    check(!/\bcn-[a-z]/.test(source.replace(/data-slot=|"cn"/g, "")), `${label}: cn-* inlined`);
    check(
      source.includes("normalizeDigits"),
      `${label}: number-input.tsx has the digit normaliser`,
    );
    writeFileSync(
      join(app, "src/app/page.tsx"),
      `import { Field, FieldLabel } from "@/components/dga/field";
import { NumberInput } from "@/components/dga/number-input";

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
  if (wants(["tabs"])) {
    const label = "dga-interactive-control";
    const app = await fresh(label);
    await $`bunx ${shadcn} init ${url}/r/dga.json --yes --no-monorepo < /dev/null`.cwd(app).quiet();
    const add = await $`bunx ${shadcn} add @dga/tabs --yes < /dev/null`.cwd(app).nothrow().quiet();
    check(add.exitCode === 0, `${label}: shadcn add @dga/tabs`);
    if (add.exitCode !== 0) console.error(add.stderr.toString() || add.stdout.toString());
    const r = reader(app);
    let direction = "";
    try {
      direction = r.text("src/lib/dga/direction.tsx");
    } catch {}
    check(
      direction.includes("AutoDirection"),
      `${label}: lib/dga/direction.tsx was installed with tabs`,
    );
    const tabs = r.text("src/components/dga/tabs.tsx");
    check(tabs.startsWith('"use client"'), `${label}: tabs.tsx is a client component`);
    check(tabs.includes("@/lib/dga/direction"), `${label}: tabs.tsx imports the direction helper`);
    check(!/\bcn-[a-z]/.test(tabs.replace(/data-slot=|"cn"/g, "")), `${label}: cn-* inlined`);
    writeFileSync(
      join(app, "src/app/page.tsx"),
      `import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/dga/tabs";

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

  // 4c. the Data Table on its own: Table, Pagination, Checkbox and Skeleton come with it, and so
  //     does the @tanstack/react-table dependency
  if (wants(["data-table", "table", "pagination", "checkbox", "skeleton"])) {
    const label = "dga-data-table";
    const app = await fresh(label);
    await $`bunx ${shadcn} init ${url}/r/dga.json --yes --no-monorepo < /dev/null`.cwd(app).quiet();
    const add = await $`bunx ${shadcn} add @dga/data-table --yes < /dev/null`
      .cwd(app)
      .nothrow()
      .quiet();
    check(add.exitCode === 0, `${label}: shadcn add @dga/data-table`);
    if (add.exitCode !== 0) console.error(add.stderr.toString() || add.stdout.toString());
    const r = reader(app);
    for (const file of ["data-table", "table", "pagination", "checkbox", "skeleton"]) {
      check(
        existsSync(join(app, `src/components/dga/${file}.tsx`)),
        `${label}: ${file}.tsx was installed with data-table`,
      );
    }
    const pkg = r.json<Pkg>("package.json");
    check("@tanstack/react-table" in pkg.dependencies, `${label}: @tanstack/react-table installed`);
    const source = r.text("src/components/dga/data-table.tsx");
    check(
      source.includes('"@/components/dga/pagination"'),
      `${label}: data-table imports @dga/pagination`,
    );
    check(!/\bcn-[a-z]/.test(source.replace(/data-slot=|"cn"/g, "")), `${label}: cn-* inlined`);
    writeFileSync(
      join(app, "src/app/page.tsx"),
      `"use client";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/dga/data-table";

type Row = { id: string; name: string };
const columns: ColumnDef<Row>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "name", header: "Name" },
];

export default function Page() {
  return <DataTable aria-label="Rows" columns={columns} data={[{ id: "1", name: "A" }]} selectable />;
}
`,
    );
    const tsc = await $`bunx tsc --noEmit -p .`.cwd(app).nothrow().quiet();
    check(tsc.exitCode === 0, `${label}: the project typechecks`);
    if (tsc.exitCode !== 0) console.error(tsc.stdout.toString());
    await build(label, app);
  }

  // 4d. composite items on their own: the @dga items each one uses come with it, and the Date
  //     Picker adds no date library
  if (wants(COMPOSITE_ITEMS)) {
    const label = "dga-composite";
    const app = await fresh(label);
    await $`bunx ${shadcn} init ${url}/r/dga.json --yes --no-monorepo < /dev/null`.cwd(app).quiet();
    const add =
      await $`bunx ${shadcn} add @dga/header @dga/filtration @dga/date-picker @dga/footer --yes < /dev/null`
        .cwd(app)
        .nothrow()
        .quiet();
    check(
      add.exitCode === 0,
      `${label}: shadcn add @dga/header @dga/filtration @dga/date-picker @dga/footer`,
    );
    if (add.exitCode !== 0) console.error(add.stderr.toString() || add.stdout.toString());
    const r = reader(app);
    for (const file of [
      "header",
      "menu",
      "drawer",
      "filtration",
      "checkbox",
      "radio",
      "select",
      "input",
      "tag",
      "button",
      "date-picker",
      "content-switcher",
      "footer",
      "accordion",
    ]) {
      check(
        existsSync(join(app, `src/components/dga/${file}.tsx`)),
        `${label}: ${file}.tsx was installed with the composite items`,
      );
    }
    check(
      existsSync(join(app, "src/lib/dga/direction.tsx")),
      `${label}: lib/dga/direction.tsx was installed`,
    );
    const pkg = r.json<Pkg>("package.json");
    for (const lib of ["date-fns", "dayjs", "moment", "react-day-picker", "luxon"]) {
      check(!(lib in pkg.dependencies), `${label}: no date library (${lib}) installed`);
    }
    for (const n of ["header", "filtration", "date-picker", "footer"]) {
      const source = r.text(`src/components/dga/${n}.tsx`);
      check(
        !/\bcn-[a-z]/.test(source.replace(/data-slot=|"cn"/g, "")),
        `${label}: ${n} cn-* inlined`,
      );
      check(!source.includes("components/ui"), `${label}: ${n}.tsx never imports components/ui`);
    }
    writeFileSync(
      join(app, "src/app/page.tsx"),
      `"use client";
import { DatePicker } from "@/components/dga/date-picker";
import { Filtration } from "@/components/dga/filtration";
import { Footer } from "@/components/dga/footer";
import { Header } from "@/components/dga/header";

export default function Page() {
  return (
    <>
      <Header items={[{ label: "Home", href: "/", current: true }]} />
      <DatePicker mode="range" calendars={["gregorian", "hijri"]} />
      <Filtration groups={[{ id: "q", type: "input", label: "Keyword" }]} resultCount={0} />
      <Footer columns={[{ title: "Services", links: [{ label: "Pay", href: "/pay" }] }]} />
    </>
  );
}
`,
    );
    const tsc = await $`bunx tsc --noEmit -p .`.cwd(app).nothrow().quiet();
    check(tsc.exitCode === 0, `${label}: the project typechecks`);
    if (tsc.exitCode !== 0) console.error(tsc.stdout.toString());
    await build(label, app);
  }

  // 4e. Phase 7 items on their own: no cmdk or input-otp package comes with them, and the @dga
  //     items they use (dialog, button, menu, field, input, select) come along
  if (wants(PHASE7_ITEMS)) {
    const label = "dga-extensions";
    const app = await fresh(label);
    await $`bunx ${shadcn} init ${url}/r/dga.json --yes --no-monorepo < /dev/null`.cwd(app).quiet();
    const add =
      await $`bunx ${shadcn} add ${PHASE7_ITEMS.map((n) => `@dga/${n}`)} --yes < /dev/null`
        .cwd(app)
        .nothrow()
        .quiet();
    check(add.exitCode === 0, `${label}: shadcn add @dga/{${PHASE7_ITEMS.join(",")}}`);
    if (add.exitCode !== 0) console.error(add.stderr.toString() || add.stdout.toString());
    const r = reader(app);
    for (const n of [...PHASE7_ITEMS, "dialog", "button", "menu", "input", "field"]) {
      check(
        existsSync(join(app, `src/components/dga/${n}.tsx`)),
        `${label}: components/dga/${n}.tsx`,
      );
    }
    const pkg = r.json<Pkg>("package.json");
    for (const lib of ["cmdk", "input-otp", "@radix-ui/react-popover", "radix-ui"]) {
      check(!(lib in pkg.dependencies), `${label}: no extra package (${lib}) installed`);
    }
    for (const n of PHASE7_ITEMS) {
      const source = r.text(`src/components/dga/${n}.tsx`);
      check(
        !/\bcn-[a-z]/.test(source.replace(/data-slot=|"cn"/g, "")),
        `${label}: ${n} cn-* inlined`,
      );
      check(!source.includes("components/ui"), `${label}: ${n}.tsx never imports components/ui`);
    }
    await build(label, app);
  }

  // 4f. Phase 7 part 2 items (0.7.1) on their own: the @dga items they use come along, Card
  //     installs the Collapsible, and Recharts and react-resizable-panels arrive only with chart and
  //     resizable, at the versions the registry pins.
  if (wants([...EXTENSION_ITEMS_2, "card"])) {
    const label = "dga-extensions-2";
    const app = await fresh(label);
    await $`bunx ${shadcn} init ${url}/r/dga.json --yes --no-monorepo < /dev/null`.cwd(app).quiet();
    const add =
      await $`bunx ${shadcn} add ${[...EXTENSION_ITEMS_2, "card"].map((n) => `@dga/${n}`)} --yes < /dev/null`
        .cwd(app)
        .nothrow()
        .quiet();
    check(add.exitCode === 0, `${label}: shadcn add @dga/{${EXTENSION_ITEMS_2.join(",")},card}`);
    if (add.exitCode !== 0) console.error(add.stderr.toString() || add.stdout.toString());
    const r = reader(app);
    for (const n of [...EXTENSION_ITEMS_2, "card", "drawer", "tooltip", "menu", "button"]) {
      check(
        existsSync(join(app, `src/components/dga/${n}.tsx`)),
        `${label}: components/dga/${n}.tsx`,
      );
    }
    const pkg = r.json<Pkg>("package.json");
    for (const [lib, version] of Object.entries(PINNED_LIBS)) {
      const installed = r.json<{ version: string }>(`node_modules/${lib}/package.json`).version;
      check(installed === version, `${label}: ${lib} resolves to the pinned ${version}`);
    }
    for (const lib of ["@radix-ui/react-menubar", "@radix-ui/react-collapsible", "radix-ui"]) {
      check(!(lib in pkg.dependencies), `${label}: no extra package (${lib}) installed`);
    }
    check(
      r.text("src/components/dga/card.tsx").includes('"@/components/dga/collapsible"'),
      `${label}: card imports the Collapsible instead of repeating it`,
    );
    for (const n of EXTENSION_ITEMS_2) {
      const source = r.text(`src/components/dga/${n}.tsx`);
      check(
        !/\bcn-[a-z]/.test(source.replace(/data-slot=|"cn"/g, "")),
        `${label}: ${n} cn-* inlined`,
      );
      check(!source.includes("components/ui"), `${label}: ${n}.tsx never imports components/ui`);
    }
    await build(label, app);
  }

  // 5. a project that already has stock shadcn button, input and dialog in components/ui:
  //    installing @dga items must not touch them, and must not import them.
  if (
    wants([
      "button",
      "field",
      "dialog",
      "table",
      "card",
      "pagination",
      "breadcrumb",
      "progress",
      "carousel",
      "date-picker",
    ])
  ) {
    const label = "dga-collision";
    const app = await fresh(label);
    await $`bunx ${shadcn} init --defaults --yes --no-monorepo < /dev/null`.cwd(app).quiet();
    const stock =
      await $`bunx ${shadcn} add button input dialog table card pagination breadcrumb progress carousel calendar --yes < /dev/null`
        .cwd(app)
        .nothrow()
        .quiet();
    check(
      stock.exitCode === 0,
      `${label}: stock shadcn add button input dialog table card pagination breadcrumb progress carousel calendar`,
    );
    const r = reader(app);
    const stockFiles = [
      "button",
      "input",
      "dialog",
      "table",
      "card",
      "pagination",
      "breadcrumb",
      "progress",
      "carousel",
      "calendar",
    ].map((n) => `src/components/ui/${n}.tsx`);
    const before = stockFiles.map((f) => r.text(f));
    // Register @dga by hand, as a user with an existing shadcn project would.
    const config = r.json<{ registries: Record<string, string> }>("components.json");
    config.registries["@dga"] = `${url}/r/{name}.json`;
    writeFileSync(join(app, "components.json"), JSON.stringify(config, null, 2));
    // --overwrite answers the one prompt left: lib/utils.ts (both export cn). With the old
    // components/ui path it would also have replaced the stock files.
    const add =
      await $`bunx ${shadcn} add @dga/button @dga/field @dga/dialog @dga/table @dga/card @dga/pagination @dga/breadcrumb @dga/progress @dga/carousel @dga/date-picker --yes --overwrite < /dev/null`
        .cwd(app)
        .nothrow()
        .quiet();
    check(
      add.exitCode === 0,
      `${label}: shadcn add @dga/button @dga/field @dga/dialog @dga/table @dga/card @dga/pagination @dga/breadcrumb @dga/progress @dga/carousel @dga/date-picker`,
    );
    if (add.exitCode !== 0) console.error(add.stderr.toString() || add.stdout.toString());
    stockFiles.forEach((f, i) => {
      check(r.text(f) === before[i], `${label}: ${f} is byte-identical after installing @dga`);
    });
    const dgaFiles = [
      "button",
      "field",
      "dialog",
      "spinner",
      "table",
      "card",
      "pagination",
      "breadcrumb",
      "progress",
      "checkbox",
      "carousel",
      "date-picker",
      "content-switcher",
    ];
    for (const n of dgaFiles) {
      check(
        existsSync(join(app, `src/components/dga/${n}.tsx`)),
        `${label}: components/dga/${n}.tsx`,
      );
    }
    check(
      !existsSync(join(app, "src/components/ui/field.tsx")),
      `${label}: no @dga file in components/ui`,
    );
    for (const n of dgaFiles) {
      const source = r.text(`src/components/dga/${n}.tsx`);
      check(!source.includes("components/ui"), `${label}: ${n}.tsx never imports components/ui`);
    }
    check(
      r.text("src/components/dga/button.tsx").includes('"@/components/dga/spinner"'),
      `${label}: button imports @/components/dga/spinner`,
    );
    writeFileSync(
      join(app, "src/app/page.tsx"),
      `import { Button as DgaButton } from "@/components/dga/button";
import { Dialog } from "@/components/dga/dialog";
import { Field, FieldLabel } from "@/components/dga/field";
import { Button } from "@/components/ui/button";
import { Dialog as StockDialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export default function Page() {
  return (
    <main>
      <Button>Stock</Button>
      <DgaButton>DGA</DgaButton>
      <Field>
        <FieldLabel>Name</FieldLabel>
        <Input />
      </Field>
      <Dialog />
      <StockDialog />
    </main>
  );
}
`,
    );
    const tsc = await $`bunx tsc --noEmit -p .`.cwd(app).nothrow().quiet();
    check(tsc.exitCode === 0, `${label}: the project typechecks`);
    if (tsc.exitCode !== 0) console.error(tsc.stdout.toString());
    await build(label, app);
  }

  // 5b. the same for the Phase 7 names: stock shadcn popover, hover-card, alert-dialog,
  //     context-menu, toggle, toggle-group, combobox, command, input-otp, input-group,
  //     button-group and slider sit in components/ui and must come out byte-identical.
  if (wants(STOCK_PHASE7)) {
    const label = "dga-collision-extensions";
    const app = await fresh(label);
    await $`bunx ${shadcn} init --defaults --yes --no-monorepo < /dev/null`.cwd(app).quiet();
    const stock = await $`bunx ${shadcn} add ${STOCK_PHASE7} --yes < /dev/null`
      .cwd(app)
      .nothrow()
      .quiet();
    check(stock.exitCode === 0, `${label}: stock shadcn add ${STOCK_PHASE7.join(" ")}`);
    if (stock.exitCode !== 0) console.error(stock.stderr.toString() || stock.stdout.toString());
    const r = reader(app);
    const stockFiles = STOCK_PHASE7.map((n) => `src/components/ui/${n}.tsx`);
    for (const f of stockFiles) {
      check(existsSync(join(app, f)), `${label}: stock ${f} exists before installing @dga`);
    }
    const before = stockFiles.map((f) => (existsSync(join(app, f)) ? r.text(f) : ""));
    const config = r.json<{ registries: Record<string, string> }>("components.json");
    config.registries["@dga"] = `${url}/r/{name}.json`;
    writeFileSync(join(app, "components.json"), JSON.stringify(config, null, 2));
    const add =
      await $`bunx ${shadcn} add ${PHASE7_ITEMS.map((n) => `@dga/${n}`)} --yes --overwrite < /dev/null`
        .cwd(app)
        .nothrow()
        .quiet();
    check(add.exitCode === 0, `${label}: shadcn add @dga/{${PHASE7_ITEMS.join(",")}}`);
    if (add.exitCode !== 0) console.error(add.stderr.toString() || add.stdout.toString());
    stockFiles.forEach((f, i) => {
      check(r.text(f) === before[i], `${label}: ${f} is byte-identical after installing @dga`);
    });
    for (const n of PHASE7_ITEMS) {
      check(
        existsSync(join(app, `src/components/dga/${n}.tsx`)),
        `${label}: components/dga/${n}.tsx`,
      );
      check(
        !r.text(`src/components/dga/${n}.tsx`).includes("components/ui"),
        `${label}: ${n}.tsx never imports components/ui`,
      );
    }
    check(
      !existsSync(join(app, "src/components/ui/digital-stamp.tsx")),
      `${label}: no @dga file in components/ui`,
    );
    await build(label, app);
  }

  // 5c. the same for the Phase 7 part 2 names: stock shadcn menubar, navigation-menu, sidebar,
  //     collapsible, scroll-area, resizable, aspect-ratio, kbd, empty, item and chart sit in
  //     components/ui and must come out byte-identical.
  if (wants(EXTENSION_ITEMS_2)) {
    const label = "dga-collision-extensions-2";
    const app = await fresh(label);
    await $`bunx ${shadcn} init --defaults --yes --no-monorepo < /dev/null`.cwd(app).quiet();
    const stock = await $`bunx ${shadcn} add ${EXTENSION_ITEMS_2} --yes < /dev/null`
      .cwd(app)
      .nothrow()
      .quiet();
    check(stock.exitCode === 0, `${label}: stock shadcn add ${EXTENSION_ITEMS_2.join(" ")}`);
    if (stock.exitCode !== 0) console.error(stock.stderr.toString() || stock.stdout.toString());
    const r = reader(app);
    const stockFiles = EXTENSION_ITEMS_2.map((n) => `src/components/ui/${n}.tsx`);
    for (const f of stockFiles) {
      check(existsSync(join(app, f)), `${label}: stock ${f} exists before installing @dga`);
    }
    const before = stockFiles.map((f) => (existsSync(join(app, f)) ? r.text(f) : ""));
    const config = r.json<{ registries: Record<string, string> }>("components.json");
    config.registries["@dga"] = `${url}/r/{name}.json`;
    writeFileSync(join(app, "components.json"), JSON.stringify(config, null, 2));
    const add =
      await $`bunx ${shadcn} add ${EXTENSION_ITEMS_2.map((n) => `@dga/${n}`)} --yes --overwrite < /dev/null`
        .cwd(app)
        .nothrow()
        .quiet();
    check(add.exitCode === 0, `${label}: shadcn add @dga/{${EXTENSION_ITEMS_2.join(",")}}`);
    if (add.exitCode !== 0) console.error(add.stderr.toString() || add.stdout.toString());
    stockFiles.forEach((f, i) => {
      check(r.text(f) === before[i], `${label}: ${f} is byte-identical after installing @dga`);
    });
    for (const n of EXTENSION_ITEMS_2) {
      check(
        existsSync(join(app, `src/components/dga/${n}.tsx`)),
        `${label}: components/dga/${n}.tsx`,
      );
      check(
        !r.text(`src/components/dga/${n}.tsx`).includes("components/ui"),
        `${label}: ${n}.tsx never imports components/ui`,
      );
    }
    await build(label, app);
  }

  // 2. registry:style on its own
  if (!selected) {
    const label = "dga-style";
    const app = await fresh(label);
    await $`bunx ${shadcn} init ${url}/r/dga-style.json --base base --rtl --yes --no-monorepo < /dev/null`
      .cwd(app)
      .quiet();
    checkStyle(label, app);
    await build(label, app);
  }

  // 3. tokens only
  if (!selected) {
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
