import { execFileSync } from "node:child_process";
import { join } from "node:path";

const git = (...args: string[]) =>
  execFileSync("git", args, { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();

let shallow: boolean | undefined;

/**
 * ISO date of the last commit that touched a docs page, read from git at build time. Returns
 * null when the history is not there (a shallow clone would stamp every page with the date of
 * the newest commit, which is wrong), so the page shows no date instead of a false one.
 */
export function lastUpdated(pagePath: string): string | null {
  try {
    shallow ??= git("rev-parse", "--is-shallow-repository") === "true";
    if (shallow) return null;
    const file = join(process.cwd(), "content", "docs", pagePath);
    const date = git("log", "-1", "--format=%cI", "--", file);
    return date || null;
  } catch {
    return null;
  }
}
