import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = join(process.cwd(), "content", "docs");

/** `components/button.ar.mdx` → `components/button.mdx`, or null if the path is English. */
export const englishSourceOf = (path: string) =>
  /\.ar\.(mdx|json)$/.test(path) ? path.replace(/\.ar\.(mdx|json)$/, ".$1") : null;

/** Short hash of an English page, the same everywhere (Windows line endings and trailing blank lines do not count). */
export function hashSource(text: string) {
  const normal = `${text.replace(/\r\n/g, "\n").trimEnd()}\n`;
  return createHash("sha256").update(normal).digest("hex").slice(0, 12);
}

/** The `sourceHash` an Arabic page records in its frontmatter: the hash of the English page it translates. */
export function recordedHash(arText: string) {
  const frontmatter = /^---\n([\s\S]*?)\n---/.exec(arText)?.[1] ?? "";
  return /^sourceHash:\s*["']?([0-9a-f]{6,64})["']?\s*$/m.exec(frontmatter)?.[1] ?? null;
}

export type TranslationStatus = "current" | "outdated" | "unrecorded";

/** Whether an Arabic page still matches the English page it was translated from. */
export function translationStatus(arPath: string): TranslationStatus | null {
  const en = englishSourceOf(arPath);
  if (!en) return null;
  const arFile = join(root, arPath);
  const enFile = join(root, en);
  if (!existsSync(arFile) || !existsSync(enFile)) return null;
  const recorded = recordedHash(readFileSync(arFile, "utf8"));
  if (!recorded) return "unrecorded";
  return recorded === hashSource(readFileSync(enFile, "utf8")) ? "current" : "outdated";
}
