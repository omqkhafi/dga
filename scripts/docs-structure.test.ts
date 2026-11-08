import { describe, expect, test } from "bun:test";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const dir = "apps/docs/content/docs/components";
const pages = readdirSync(dir).filter((f) => f.endsWith(".mdx"));

describe("component pages", () => {
  test("none has a separate RTL section (the preview toggle covers it)", () => {
    expect(pages.length).toBeGreaterThan(70);
    for (const file of pages) {
      const text = readFileSync(join(dir, file), "utf8");
      expect({ file, rtl: /^## (RTL|.*\[#rtl\])/m.test(text) }).toEqual({ file, rtl: false });
    }
  });
});
