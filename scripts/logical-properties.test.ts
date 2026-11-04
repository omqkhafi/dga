// RTL rule: logical properties only. Fails on physical left/right utilities or CSS.
import { expect, test } from "bun:test";
import { Glob } from "bun";

const PHYSICAL = [
  /(?<![\w-])-?(ml|mr|pl|pr|left|right|border-l|border-r|rounded-l|rounded-r|rounded-tl|rounded-tr|rounded-bl|rounded-br|scroll-ml|scroll-mr|scroll-pl|scroll-pr)-[\w[]/,
  /(?<![\w-])text-(left|right)(?![\w-])/,
  /(?<![\w-])(float|clear)-(left|right)(?![\w-])/,
  /\b(margin|padding|border)-(left|right)\s*:/,
  /(?<![\w-])(left|right)\s*:\s*[^;]+;/,
];

const roots = ["registry/**/*.{ts,tsx,css}", "apps/docs/{app,components,lib}/**/*.{ts,tsx,css}"];

test("no physical left/right properties in registry or docs source", async () => {
  const offenders: string[] = [];
  for (const pattern of roots) {
    for await (const file of new Glob(pattern).scan({ cwd: process.cwd() })) {
      if (file.includes("node_modules") || file.includes("/generated/")) continue;
      const lines = (await Bun.file(file).text()).split("\n");
      lines.forEach((line, i) => {
        if (line.includes("logical-ok")) return;
        if (PHYSICAL.some((re) => re.test(line)))
          offenders.push(`${file}:${i + 1}: ${line.trim()}`);
      });
    }
  }
  expect(offenders).toEqual([]);
});
