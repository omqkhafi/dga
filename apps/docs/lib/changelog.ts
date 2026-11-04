import { readFileSync } from "node:fs";
import { join } from "node:path";

export type Release = {
  /** "0.1.0", or "Unreleased". */
  version: string;
  date: string | null;
  /** Markdown body under the release heading. */
  body: string;
  slug: string;
};

const HEADING = /^## \[([^\]]+)\](?:\s+-\s+(\d{4}-\d{2}-\d{2}))?\s*$/;

/** Splits a Keep a Changelog file into releases, newest first (file order). */
export function parseChangelog(markdown: string): Release[] {
  const releases: Release[] = [];
  let current: Release | null = null;
  const lines: string[] = [];
  const flush = () => {
    if (current) releases.push({ ...current, body: lines.join("\n").trim() });
    lines.length = 0;
  };
  for (const line of markdown.split("\n")) {
    const match = HEADING.exec(line);
    if (match) {
      flush();
      const version = match[1] ?? "";
      current = {
        version,
        date: match[2] ?? null,
        body: "",
        slug: version.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      };
    } else if (current) {
      lines.push(line);
    }
  }
  flush();
  return releases;
}

export const changelogPath = join(process.cwd(), "..", "..", "CHANGELOG.md");

export function getReleases() {
  return parseChangelog(readFileSync(changelogPath, "utf8"));
}

/** The latest released version (not "Unreleased"), shown in the sidebar badge. */
export function latestVersion() {
  return getReleases().find((r) => r.version !== "Unreleased")?.version ?? null;
}
