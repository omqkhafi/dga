// Merges the per-shard reports written by scripts/e2e.mjs (E2E_REPORT) into one: a table in the
// job summary, e2e-report.json, and a non-zero exit if a shard failed or wrote no report.
//   bun scripts/ci/merge-e2e-report.ts e2e-report-1.json e2e-report-2.json ...
import { appendFileSync, existsSync, readFileSync, writeFileSync } from "node:fs";

type Report = {
  shard: string;
  passed: number;
  failures: string[];
  groups: Record<string, { seconds: number; passed: number; failed: number }>;
};

const files = process.argv.slice(2).filter((f) => existsSync(f));
const reports = files.map((f) => JSON.parse(readFileSync(f, "utf8")) as Report);
const expected = Number(process.env.E2E_SHARDS ?? 4);
const failures = reports.flatMap((r) => r.failures.map((f) => `[${r.shard}] ${f}`));
const passed = reports.reduce((n, r) => n + r.passed, 0);

const rows = reports.flatMap((r) =>
  Object.entries(r.groups).map(
    ([name, g]) => `| ${r.shard} | ${name} | ${g.seconds}s | ${g.passed} | ${g.failed} |`,
  ),
);
const summary = [
  "### Browser checks",
  "",
  `${passed} checks passed, ${failures.length} failed, ${reports.length} of ${expected} shards reported.`,
  "",
  "| Shard | Group | Time | Passed | Failed |",
  "| --- | --- | --- | --- | --- |",
  ...rows,
  ...(failures.length ? ["", "```", ...failures, "```"] : []),
].join("\n");
console.log(summary);
if (process.env.GITHUB_STEP_SUMMARY)
  appendFileSync(process.env.GITHUB_STEP_SUMMARY, `${summary}\n`);
writeFileSync("e2e-report.json", JSON.stringify({ passed, failures, shards: reports }, null, 2));
process.exit(failures.length > 0 || reports.length < expected ? 1 : 0);
