// End-to-end install test: serves a locally built registry, creates a fresh Next.js app,
// runs `shadcn init <dga-style url>`, checks what landed in the project, and builds it.
//   bun run test:install          (needs network for create-next-app and npm installs)
//   KEEP=1 bun run test:install   keep the temp app for inspection

import { mkdtempSync, readFileSync, rmSync } from "node:fs";
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

const work = mkdtempSync(join(tmpdir(), "dga-install-"));
const registryDir = join(work, "serve");
const app = join(work, "app");
const failures: string[] = [];
const check = (ok: boolean, message: string) => {
  console.log(`${ok ? "✓" : "✗"} ${message}`);
  if (!ok) failures.push(message);
};

const server = Bun.serve({
  port: 0,
  async fetch(req) {
    const file = Bun.file(join(registryDir, new URL(req.url).pathname));
    return (await file.exists()) ? new Response(file) : new Response("Not found", { status: 404 });
  },
});
const url = `http://localhost:${server.port}`;

try {
  console.log(`→ registry at ${url}, app in ${app}`);
  await $`bun ${join(ROOT, "scripts", "build-registry.ts")}`
    .env({ ...process.env, REGISTRY_URL: url, REGISTRY_OUTPUT: join(registryDir, "r") })
    .quiet();

  await $`bunx create-next-app@${NEXT_VERSION} ${app} --ts --tailwind --app --src-dir --import-alias ${"@/*"} --use-bun --no-eslint --yes --disable-git`.quiet();
  await $`bunx shadcn@${SHADCN_VERSION} init ${url}/r/dga-style.json --base base --rtl --yes --no-monorepo < /dev/null`
    .cwd(app)
    .quiet();

  const read = (path: string) => readFileSync(join(app, path), "utf8");
  const utils = read("src/lib/utils.ts");
  const pkg = JSON.parse(read("package.json")) as {
    dependencies: Record<string, string>;
    devDependencies: Record<string, string>;
  };
  const css = read("src/app/globals.css");
  const layout = read("src/app/layout.tsx");

  check(/from\s+["']cn["']/.test(utils), 'lib/utils.ts imports cn from "cn"');
  check(!/clsx|tailwind-merge/.test(utils), "lib/utils.ts does not use clsx or tailwind-merge");
  const ours = readFileSync(join(ROOT, "registry", "bases", "base", "lib", "utils.ts"), "utf8");
  check(utils.trim() === ours.trim(), "lib/utils.ts is the @dga utils item, not shadcn's");
  for (const dep of [
    "cn",
    "@base-ui/react",
    "@hugeicons/react",
    "@hugeicons/core-free-icons",
    "class-variance-authority",
  ]) {
    check(dep in pkg.dependencies, `dependency ${dep} installed`);
  }
  for (const dep of ["clsx", "tailwind-merge"]) {
    check(!(dep in pkg.dependencies), `dependency ${dep} not installed`);
  }
  check(css.includes("--background-body:"), "globals.css has DGA semantic tokens");
  check(css.includes('[data-theme="dark"]'), 'globals.css has the [data-theme="dark"] scope');
  check(css.includes("@media (width >= 48rem)"), "globals.css has the tablet mode");
  check(css.includes("--text-color-primary:"), "globals.css has the short aliases");
  check(!css.includes("--color-colors-"), "globals.css has no junk --color-colors-* entries");
  check(layout.includes("IBM_Plex_Sans_Arabic"), "layout.tsx loads IBM Plex Sans Arabic");

  const build = await $`bun run build`.cwd(app).nothrow().quiet();
  check(build.exitCode === 0, "the app builds");
  if (build.exitCode !== 0) console.error(build.stderr.toString() || build.stdout.toString());
} finally {
  server.stop(true);
  if (!process.env.KEEP) rmSync(work, { recursive: true, force: true });
}

if (failures.length > 0) {
  console.error(`\n${failures.length} install check(s) failed.`);
  process.exit(1);
}
console.log("\nInstall test passed.");
