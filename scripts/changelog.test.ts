import { expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { parseChangelog } from "../apps/docs/lib/changelog";
import { ROOT } from "./tokens/source";

const releases = parseChangelog(readFileSync(join(ROOT, "CHANGELOG.md"), "utf8"));
const pkg = JSON.parse(readFileSync(join(ROOT, "package.json"), "utf8")) as { version?: string };

test("CHANGELOG.md parses into releases with dated versions", () => {
  expect(releases.length).toBeGreaterThan(0);
  for (const r of releases.filter((r) => r.version !== "Unreleased")) {
    expect(r.version).toMatch(/^\d+\.\d+\.\d+$/);
    expect(r.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(r.body.length).toBeGreaterThan(0);
  }
});

test("package.json version matches the latest CHANGELOG release", () => {
  const latest = releases.find((r) => r.version !== "Unreleased")?.version;
  expect(pkg.version).toBe(latest);
});

test("parser splits headings and keeps bodies", () => {
  const parsed = parseChangelog("# T\n\n## [Unreleased]\n\n- a\n\n## [1.2.0] - 2026-01-02\n\n### Added\n\n- b\n");
  expect(parsed.map((r) => r.version)).toEqual(["Unreleased", "1.2.0"]);
  expect(parsed[1]?.date).toBe("2026-01-02");
  expect(parsed[1]?.body).toContain("- b");
});
