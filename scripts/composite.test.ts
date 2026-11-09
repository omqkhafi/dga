// Phase 6 (0.6.0): Header, Second Nav, Footer, Date Picker, Carousel and Filtration. Logic that
// needs no browser lives here; keyboard behaviour, the Drawer and RTL are checked in
// scripts/e2e.mjs (compositeChecks).
import { describe, expect, test } from "bun:test";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { getSwipeStep } from "../registry/bases/base/ui/carousel";
import {
  addDays,
  addMonths,
  daysInMonth,
  formatDateInput,
  fromParts,
  getMonthGrid,
  getParts,
  parseDateInput,
} from "../registry/bases/base/ui/date-picker";
import { getAppliedFilters } from "../registry/bases/base/ui/filtration";
import { buildModel } from "./tokens/model";
import { ROOT } from "./tokens/source";

const COMPOSITE = [
  "header",
  "nav-drawer",
  "second-nav",
  "footer",
  "date-picker",
  "carousel",
  "filtration",
];

describe("Hijri (Umm al-Qura) calendar", () => {
  test("known dates match the official calendar", () => {
    // 1 Ramadan 1446 and 1447.
    expect(getParts("2025-03-01", "hijri")).toEqual({ year: 1446, month: 9, day: 1 });
    expect(getParts("2026-02-18", "hijri")).toEqual({ year: 1447, month: 9, day: 1 });
    expect(fromParts("hijri", 1447, 9, 1)).toBe("2026-02-18");
  });
  test("every month from 1350 to 1550 AH round-trips, and has 29 or 30 days", () => {
    for (let year = 1350; year <= 1550; year++) {
      for (let month = 1; month <= 12; month++) {
        const first = fromParts("hijri", year, month, 1);
        expect(getParts(first, "hijri")).toEqual({ year, month, day: 1 });
        const length = daysInMonth("hijri", year, month);
        expect([29, 30]).toContain(length);
        const last = fromParts("hijri", year, month, length);
        expect(getParts(last, "hijri")).toEqual({ year, month, day: length });
        expect(getParts(addDays(last, 1), "hijri").day).toBe(1);
      }
    }
  });
  test("a day past the end of the month is limited to its length", () => {
    const length = daysInMonth("hijri", 1447, 10);
    expect(getParts(fromParts("hijri", 1447, 10, 31), "hijri").day).toBe(length);
  });
  test("months roll over the year", () => {
    expect(getParts(addMonths("2026-06-17", "hijri", 12), "hijri").year).toBe(
      getParts("2026-06-17", "hijri").year + 1,
    );
  });
});

describe("Gregorian calendar", () => {
  test("month length and clamping", () => {
    expect(daysInMonth("gregorian", 2028, 2)).toBe(29);
    expect(daysInMonth("gregorian", 2026, 2)).toBe(28);
    expect(addMonths("2026-01-31", "gregorian", 1)).toBe("2026-02-28");
    expect(addMonths("2026-12-15", "gregorian", 1)).toBe("2027-01-15");
    expect(addMonths("2026-01-15", "gregorian", -1)).toBe("2025-12-15");
  });
  test("a grid is six weeks of seven days starting on the chosen weekday", () => {
    const sunday = getMonthGrid("gregorian", 2026, 11, 0);
    expect(sunday).toHaveLength(6);
    expect(sunday.every((week) => week.length === 7)).toBe(true);
    expect(sunday[0]?.[0]?.iso).toBe("2026-11-01"); // a Sunday
    expect(sunday.flat().filter((c) => c.inMonth)).toHaveLength(30);
    const saturday = getMonthGrid("gregorian", 2026, 11, 6);
    expect(saturday[0]?.[0]?.iso).toBe("2026-10-31");
    expect(saturday[0]?.[1]?.iso).toBe("2026-11-01");
  });
  test("a Hijri grid holds every day of the month once", () => {
    const grid = getMonthGrid("hijri", 1448, 5, 0).flat();
    const days = grid.filter((c) => c.inMonth).map((c) => getParts(c.iso, "hijri").day);
    expect(days).toEqual(Array.from({ length: days.length }, (_, i) => i + 1));
    expect(days.length).toBe(daysInMonth("hijri", 1448, 5));
  });
});

describe("typed dates", () => {
  test("parses Western and Arabic-Indic digits in the shown calendar", () => {
    expect(parseDateInput("2026-11-08", "gregorian")).toBe("2026-11-08");
    expect(parseDateInput("٢٠٢٦/١١/٠٨", "gregorian")).toBe("2026-11-08");
    expect(parseDateInput("1448-05-28", "hijri")).toBe("2026-11-08");
  });
  test("rejects impossible dates", () => {
    expect(parseDateInput("2026-02-30", "gregorian")).toBeNull();
    expect(parseDateInput("2026-13-01", "gregorian")).toBeNull();
    expect(parseDateInput("tomorrow", "gregorian")).toBeNull();
    expect(parseDateInput("1448-05-31", "hijri")).toBeNull();
  });
  test("formats with the digits asked for", () => {
    expect(formatDateInput("2026-11-08", "gregorian", String)).toBe("2026-11-08");
    expect(formatDateInput("2026-11-08", "hijri", String)).toBe("1448-05-28");
  });
});

describe("Carousel swipe", () => {
  test("content follows the finger: left is next in LTR, right is next in RTL", () => {
    expect(getSwipeStep(-80, false)).toBe(1);
    expect(getSwipeStep(80, false)).toBe(-1);
    expect(getSwipeStep(80, true)).toBe(1);
    expect(getSwipeStep(-80, true)).toBe(-1);
  });
  test("a small movement is not a swipe", () => {
    expect(getSwipeStep(10, false)).toBe(0);
    expect(getSwipeStep(-39, true)).toBe(0);
  });
});

describe("Filtration applied filters", () => {
  const groups = [
    {
      id: "city",
      type: "checkbox" as const,
      label: "City",
      options: [
        { value: "riyadh", label: "Riyadh" },
        { value: "jeddah", label: "Jeddah" },
      ],
    },
    {
      id: "kind",
      type: "radio" as const,
      label: "Type",
      options: [{ value: "licence", label: "Licence" }],
    },
    { id: "fee", type: "range" as const, label: "Fee", minLabel: "From", maxLabel: "To" },
  ];
  test("one tag per chosen option, text and range", () => {
    const applied = getAppliedFilters(
      groups,
      { city: ["riyadh", "jeddah"], kind: "licence", fee: ["100", "500"] },
      () => {},
    );
    expect(applied.map((a) => a.text)).toEqual(["Riyadh", "Jeddah", "Licence", "From 100 To 500"]);
  });
  test("removing a tag changes only its group", () => {
    const calls: [string, unknown][] = [];
    const applied = getAppliedFilters(
      groups,
      { city: ["riyadh", "jeddah"], kind: "licence" },
      (id, next) => calls.push([id, next]),
    );
    applied[0]?.clear();
    applied[2]?.clear();
    expect(calls).toEqual([
      ["city", ["jeddah"]],
      ["kind", undefined],
    ]);
  });
  test("empty entries are not applied", () => {
    expect(getAppliedFilters(groups, { city: [], kind: "", fee: ["", ""] }, () => {})).toEqual([]);
  });
});

describe("registry", () => {
  const registry = JSON.parse(readFileSync(join(ROOT, "registry", "registry.json"), "utf8")) as {
    items: {
      name: string;
      type: string;
      dependencies?: string[];
      registryDependencies?: string[];
      files: { path: string; target: string }[];
    }[];
  };
  const need = (name: string) =>
    (registry.items.find((i) => i.name === name)?.registryDependencies ?? []).map((d) =>
      d.replace("{{REGISTRY_URL}}/r/", "").replace(".json", ""),
    );
  test("every composite item is a registry:ui item installed to components/dga", () => {
    for (const name of COMPOSITE) {
      const item = registry.items.find((i) => i.name === name);
      expect(item?.type).toBe("registry:ui");
      expect(item?.files[0]?.target).toBe(`components/dga/${name}.tsx`);
    }
  });
  test("each item declares the @dga items it imports", () => {
    for (const name of COMPOSITE) {
      const source = readFileSync(join(ROOT, `registry/bases/base/ui/${name}.tsx`), "utf8");
      const used = [...source.matchAll(/"@\/components\/dga\/([a-z-]+)"/g)].map((m) => m[1]);
      for (const dep of used) expect(need(name)).toContain(dep as string);
      if (source.includes("@/lib/dga/direction")) expect(need(name)).toContain("direction");
    }
  });
  test("the composition the roadmap asks for is declared", () => {
    expect(need("header")).toEqual(expect.arrayContaining(["menu", "nav-drawer"]));
    expect(need("footer")).toContain("accordion");
    expect(need("filtration")).toEqual(
      expect.arrayContaining(["checkbox", "radio", "select", "input", "tag", "drawer", "button"]),
    );
    expect(need("date-picker")).toEqual(expect.arrayContaining(["input", "button"]));
  });
  test("no date library: the Date Picker declares no extra package", () => {
    const deps = registry.items.find((i) => i.name === "date-picker")?.dependencies ?? [];
    expect(deps.every((d) => /^@(base-ui|hugeicons)\//.test(d))).toBe(true);
  });
});

describe("no hard-coded text", () => {
  test("components contain no Arabic: every visible string is a prop with an English default", () => {
    const arabic = /[؀-ۿ]/;
    for (const name of COMPOSITE) {
      const source = readFileSync(join(ROOT, `registry/bases/base/ui/${name}.tsx`), "utf8");
      expect(arabic.test(source)).toBe(false);
    }
  });
});

const previewNames = [
  ...readFileSync(join(ROOT, "apps/docs/components/previews/index.tsx"), "utf8").matchAll(
    /^\s*"?([a-z0-9-]+)"?:\s+[A-Z]\w+,$/gm,
  ),
].map((m) => m[1] as string);

describe("docs", () => {
  test("every component has an English and an Arabic page and previews for its examples", () => {
    for (const name of COMPOSITE) {
      for (const file of [`${name}.mdx`, `${name}.ar.mdx`]) {
        expect(existsSync(join(ROOT, "apps/docs/content/docs/components", file))).toBe(true);
      }
      const page = readFileSync(
        join(ROOT, `apps/docs/content/docs/components/${name}.mdx`),
        "utf8",
      );
      for (const preview of page.matchAll(/<(?:Preview|DirectionCompare)[^>]*\bname="([^"]+)"/g)) {
        expect(previewNames).toContain(preview[1] as string);
      }
    }
  });
  test("the components are in the sidebar in both languages", () => {
    for (const file of ["meta.json", "meta.ar.json"]) {
      const pages = (
        JSON.parse(readFileSync(join(ROOT, "apps/docs/content/docs/components", file), "utf8")) as {
          pages: string[];
        }
      ).pages;
      for (const name of COMPOSITE) expect(pages).toContain(name);
    }
  });
  test("llms.txt, search and the agent skill know the new components", () => {
    const llms = readFileSync(join(ROOT, "apps/docs/lib/llms.ts"), "utf8");
    expect(llms).toContain("componentSection");
    const skill = readFileSync(join(ROOT, "skills/platform-code/SKILL.md"), "utf8");
    for (const word of [
      "Header",
      "Footer",
      "Second Nav",
      "Date Picker",
      "Carousel",
      "Filtration",
    ]) {
      expect(skill).toContain(word);
    }
  });
});

describe("audit and deviations", () => {
  const model = buildModel();
  test("every component has audited states in light and dark", async () => {
    const { auditContrast } = await import("./tokens/model");
    const audit = auditContrast(model);
    for (const name of COMPOSITE) {
      const checks = audit.filter((c) => c.component === name);
      expect(checks.length).toBeGreaterThan(3);
      expect(new Set(checks.map((c) => c.mode))).toEqual(new Set(["light", "dark"]));
      expect(checks.filter((c) => c.ratio < c.min)).toEqual([]);
    }
  });
  test("Deviations lists the DGA problems found, one entry per component at least", () => {
    for (const name of COMPOSITE) {
      expect(model.deviations.some((d) => d.component === name)).toBe(true);
    }
  });
  test("Deviation texts are English: no Arabic letters", () => {
    const arabic = /[؀-ٟ٭-ۯۺ-ۿݐ-ݿﭐ-﷿ﹰ-﻿]/;
    const bad = model.deviations
      .filter((d) => arabic.test(`${d.item} ${d.original} ${d.ours} ${d.reason}`))
      .map((d) => d.item);
    expect(bad).toEqual([]);
  });
  test("the Date Picker today colour and dark band are fixed and logged", () => {
    const css = readFileSync(join(ROOT, "registry/styles/dga/tokens.css"), "utf8");
    const [light, dark] = css.split('[data-theme="dark"] {');
    const value = (block: string | undefined, name: string) =>
      new RegExp(`--${name}: ([^;]+);`).exec(block ?? "")?.[1];
    expect(value(light, "datecell-background-600")).not.toBe(
      value(light, "datecell-background-default"),
    );
    expect(value(dark, "datecell-background-100")).not.toBe(
      value(light, "datecell-background-100"),
    );
    expect(
      model.deviations.some(
        (d) => d.component === "date-picker" && /datecell-background-600/.test(d.item),
      ),
    ).toBe(true);
  });
});
