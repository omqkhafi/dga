// Browser checks for the Phase 7 part 2 work stream "display": Kbd, Empty, Item (extensions) and Chart (DGA Charts, no Extension label).
// Called from scripts/e2e.mjs with the shared helpers.
//   1. Every page fits at 375 and 1280 px in /en and /ar, shows the Extension badge and the
//      extension note, and logs nothing to the console.
//   2. Chart: it is a named image with a description; the first category is on the start side
//      (left in LTR, right in RTL), the vertical axis and the legend follow; the tooltip keeps
//      Western digits left to right; the table button toggles a real table; the interactive chart
//      takes focus and the arrow keys move the tooltip; series fills differ.
//   3. Item as a link takes focus with an outline; Kbd reads left to right in both directions;
//      Empty shows its parts.
//   4. Their previews are pure in both directions.
import { readFileSync } from "node:fs";

const allowlist = JSON.parse(
  readFileSync(new URL("../locale-allowlist.json", import.meta.url), "utf8"),
).words.map((w) => w.toLowerCase());
const ARABIC = /[؀-ٟ٭-ۯۺ-ۿݐ-ݿﭐ-﷿ﹰ-﻿]/;

const PAGES = ["kbd", "empty", "item", "chart"];
// Chart is defined by DGA, so it has no Extension badge or note.
const isExtension = (slug) => slug !== "chart";
const BADGE = { en: "Extension", ar: "امتداد" };
const NOTE = {
  en: "Platform Code extension, not part of DGA",
  ar: "امتداد من كود المنصات وليس جزءًا من DGA",
};
const TABLE_BUTTON = { en: "View as table", ar: "عرض كجدول" };

/** Latin words in a string that the Arabic allowlist does not cover. */
function englishWords(text) {
  const prose = text.replace(/https?:\/\/\S+/g, " ").replace(/`[^`]*`/g, " ");
  return (prose.match(/[A-Za-z][\w.+-]*/g) ?? []).filter((w) => {
    const word = w.replace(/[.-]+$/, "");
    if (allowlist.includes(word.toLowerCase())) return false;
    if (word.length < 2) return false;
    if (/^[A-Z][a-z0-9]+([A-Z][a-z0-9]*)+$/.test(word)) return false;
    if (/^[a-z]+[A-Z]\w*$/.test(word)) return false;
    return true;
  });
}

export async function extDisplayChecks({ browser, BASE, check }) {
  // 1. Pages.
  for (const lang of ["en", "ar"]) {
    for (const width of [375, 1280]) {
      const context = await browser.newContext({ viewport: { width, height: 900 } });
      const page = await context.newPage();
      const issues = [];
      page.on("console", (m) => {
        if (["error", "warning"].includes(m.type())) issues.push(m.text().slice(0, 160));
      });
      page.on("pageerror", (e) => issues.push(e.message.slice(0, 160)));
      for (const slug of PAGES) {
        await page.goto(`${BASE}/${lang}/docs/components/${slug}`, { waitUntil: "networkidle" });
        const overflow = await page.evaluate(
          () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
        );
        check(overflow <= 0, `${lang} ${width}px: ${slug} has no sideways scroll (${overflow}px)`);
        const badges = await page
          .locator("article header")
          .getByText(BADGE[lang], { exact: true })
          .count();
        const notes = await page.getByText(NOTE[lang], { exact: true }).count();
        check(
          badges === (isExtension(slug) ? 1 : 0),
          `${lang} ${width}px: ${slug} ${isExtension(slug) ? "shows" : "has no"} Extension badge in the page header`,
        );
        check(
          isExtension(slug) ? notes >= 1 : notes === 0,
          `${lang} ${width}px: ${slug} ${isExtension(slug) ? "says it is an extension, not part of DGA" : "has no extension note"}`,
        );
        if (width === 1280) {
          const sidebar = await page
            .locator(`nav a[href$="/docs/components/${slug}"]`)
            .getByText(BADGE[lang], { exact: true })
            .count();
          check(
            isExtension(slug) ? sidebar >= 1 : sidebar === 0,
            `${lang}: ${slug} ${isExtension(slug) ? "has" : "has no"} Extension badge in the sidebar`,
          );
        }
      }
      check(
        issues.length === 0,
        `${lang} ${width}px: display pages log nothing: ${issues.join(" | ")}`,
      );
      await context.close();
    }
  }

  // 2 and 3. Behaviour, per direction.
  for (const lang of ["en", "ar"]) {
    const rtl = lang === "ar";
    const context = await browser.newContext({ viewport: { width: 900, height: 800 } });
    const page = await context.newPage();
    const issues = [];
    page.on("console", (m) => {
      if (["error", "warning"].includes(m.type())) issues.push(m.text().slice(0, 160));
    });
    page.on("pageerror", (e) => issues.push(e.message.slice(0, 160)));
    const open = async (name) => {
      await page.goto(`${BASE}/preview/${name}?dir=${rtl ? "rtl" : "ltr"}`, {
        waitUntil: "networkidle",
      });
      await page.waitForSelector("svg.recharts-surface, [data-slot]", { timeout: 15000 });
      await page.waitForTimeout(1500);
    };
    const boxes = (selector) =>
      page.evaluate((s) => {
        return [...document.querySelectorAll(s)].map((el) => {
          const r = el.getBoundingClientRect();
          return { x: r.x, right: r.right, width: r.width, text: el.textContent?.trim() ?? "" };
        });
      }, selector);

    // Chart: bar, named image, description, table alternative.
    await open("chart-bar");
    const figure = page.locator('[data-slot="chart"]').first();
    check((await figure.getAttribute("role")) === "img", `${lang}: the chart is role="img"`);
    check(
      ((await figure.getAttribute("aria-label")) ?? "").length > 3,
      `${lang}: the chart has an accessible name`,
    );
    const describedBy = await figure.getAttribute("aria-describedby");
    check(
      Boolean(describedBy) &&
        ((await page.locator(`#${describedBy}`).textContent()) ?? "").length > 10,
      `${lang}: the chart is described by a sentence`,
    );
    check(
      (await page.locator('[data-slot="chart"] svg[tabindex="0"]').count()) === 0,
      `${lang}: a picture-only chart is not a focus stop`,
    );

    // Axis order: the first category sits on the start side.
    const ticks = await boxes(".recharts-xAxis-tick-labels text");
    check(ticks.length === 6, `${lang}: six categories on the X axis (${ticks.length})`);
    if (ticks.length === 6) {
      const first = ticks[0];
      const last = ticks[5];
      check(
        rtl ? first.x > last.x : first.x < last.x,
        `${lang}: the first category (${first.text}) is on the ${rtl ? "right" : "left"}`,
      );
    }
    // The vertical axis sits on the start side... in RTL on the right, in LTR on the left.
    const chartBox = await boxes('[data-slot="chart"]');
    const yTicks = await boxes(".recharts-yAxis-tick-labels text");
    check(yTicks.length > 2, `${lang}: the Y axis has ticks`);
    if (yTicks.length > 2 && chartBox[0]) {
      const mid = chartBox[0].x + chartBox[0].width / 2;
      const centre = yTicks[0].x + yTicks[0].width / 2;
      check(
        rtl ? centre > mid : centre < mid,
        `${lang}: the Y axis is on the ${rtl ? "right" : "left"}`,
      );
    }
    // The legend runs with the reading direction.
    const legend = await boxes(
      '[data-slot="chart-legend"] .cn-chart-legend-item, [data-slot="chart-legend"] > div',
    );
    check(legend.length >= 2, `${lang}: the legend lists the series`);
    if (legend.length >= 2) {
      check(
        rtl ? legend[0].x > legend[1].x : legend[0].x < legend[1].x,
        `${lang}: the first legend entry is on the ${rtl ? "right" : "left"}`,
      );
    }
    // Series fills differ.
    const fills = await page.evaluate(() => {
      const paths = [...document.querySelectorAll(".recharts-bar")].map(
        (g) => g.querySelector("path")?.getAttribute("fill") ?? "",
      );
      return paths;
    });
    check(
      fills.length === 2 && fills[0] !== fills[1] && fills.every(Boolean),
      `${lang}: the two bar series use two series colours (${fills.join(" / ")})`,
    );
    // Tooltip on hover: Western digits, left to right.
    const bar = page.locator(".recharts-bar-rectangle").first();
    await bar.hover({ force: true });
    await page.waitForTimeout(400);
    const tip = page.locator('[data-slot="chart-tooltip"]').first();
    check(await tip.isVisible().catch(() => false), `${lang}: hovering a bar shows the tooltip`);
    if (await tip.isVisible().catch(() => false)) {
      check(
        (await tip.getAttribute("dir")) === (rtl ? "rtl" : "ltr"),
        `${lang}: the tooltip follows the page direction`,
      );
      const value = await tip.locator("bdi").first().textContent();
      check(
        /^[0-9,]+$/.test(value ?? ""),
        `${lang}: the tooltip value keeps Western digits (${value})`,
      );
      check(
        (await tip.locator("bdi").first().getAttribute("dir")) === "ltr",
        `${lang}: the tooltip value reads left to right`,
      );
    }

    // The table: a toggle that shows a real table.
    const toggle = page.locator('[data-slot="chart-table-toggle"]');
    check(
      ((await toggle.textContent()) ?? "").trim() === TABLE_BUTTON[lang],
      `${lang}: the table button is labelled in the content language`,
    );
    check(
      (await toggle.getAttribute("aria-expanded")) === "false",
      `${lang}: the table starts hidden`,
    );
    check(
      (await page
        .locator('[data-slot="chart-table"] table')
        .isVisible()
        .catch(() => false)) === false,
      `${lang}: the table is not visible until asked for`,
    );
    await toggle.focus();
    await page.keyboard.press("Enter");
    await page.waitForTimeout(200);
    const table = page.locator('[data-slot="chart-table"] table');
    check(await table.isVisible(), `${lang}: Enter on the button shows the table`);
    check(
      (await toggle.getAttribute("aria-expanded")) === "true",
      `${lang}: the button is expanded while the table shows`,
    );
    check((await table.locator("tbody tr").count()) === 6, `${lang}: one row per category`);
    check(
      (await table.locator("caption").count()) === 1 &&
        (await table.locator('th[scope="col"]').count()) === 3,
      `${lang}: the table has a caption and three column headings`,
    );
    check(
      (await table.locator("tbody tr").first().locator("td bdi").first().getAttribute("dir")) ===
        "ltr",
      `${lang}: table numbers read left to right`,
    );
    await page.keyboard.press("Enter");
    await page.waitForTimeout(200);
    check(!(await table.isVisible()), `${lang}: a second Enter hides the table`);

    // Interactive chart: focus and arrow keys.
    await open("chart-interactive");
    const live = page.locator('[data-slot="chart"]').first();
    check(
      (await live.getAttribute("role")) === "group",
      `${lang}: the interactive chart is a group`,
    );
    const surface = page.locator('[data-slot="chart"] svg[tabindex="0"]');
    check((await surface.count()) >= 1, `${lang}: the interactive chart takes focus`);
    await surface.first().focus();
    // The arrow keys follow the picture: toward the end of the axis on screen.
    const forward = rtl ? "ArrowLeft" : "ArrowRight";
    const backward = rtl ? "ArrowRight" : "ArrowLeft";
    const labelOf = async () =>
      page
        .locator('[data-slot="chart-tooltip"] > div:first-child')
        .first()
        .textContent({ timeout: 1500 })
        .catch(() => null);
    await page.keyboard.press(forward);
    await page.waitForTimeout(300);
    const one = await labelOf();
    await page.keyboard.press(forward);
    await page.waitForTimeout(300);
    const two = await labelOf();
    check(
      Boolean(one) && Boolean(two) && one !== two,
      `${lang}: an arrow key moves the tooltip (${one} → ${two})`,
    );
    await page.keyboard.press(backward);
    await page.waitForTimeout(300);
    check((await labelOf()) === one, `${lang}: the opposite arrow moves back`);

    // Pie and line: markers and the slice order.
    await open("chart-line");
    const dots = await page.evaluate(
      () =>
        new Set(
          [...document.querySelectorAll(".recharts-line-dots > *")].map(
            (d) => d.querySelector("circle,rect,path")?.tagName,
          ),
        ).size,
    );
    check(dots >= 3, `${lang}: lines use different marker shapes (${dots} kinds)`);
    await open("chart-pie");
    const slices = await page.locator(".recharts-pie-sector").count();
    check(slices === 4, `${lang}: the pie has four slices (${slices})`);

    // Item as a link.
    await open("item-link");
    await page.keyboard.press("Tab");
    const link = page.locator('a[data-slot="item"]');
    check(
      await link.evaluate((el) => el === document.activeElement),
      `${lang}: the link Item takes focus`,
    );
    const outline = await link.evaluate((el) => getComputedStyle(el).outlineStyle);
    check(outline !== "none", `${lang}: the focused Item shows an outline (${outline})`);
    // Kbd reads left to right.
    await open("kbd-basic");
    const dirs = await page.evaluate(() =>
      [...document.querySelectorAll("kbd")].map((k) => k.closest("[dir]")?.getAttribute("dir")),
    );
    check(
      dirs.length >= 8 && dirs.every((d) => d === "ltr"),
      `${lang}: every Kbd reads left to right`,
    );
    // Empty shows its parts.
    await open("empty-basic");
    check(
      (await page.locator('[data-slot="empty-title"]').count()) === 1 &&
        (await page.locator('[data-slot="empty-description"]').count()) === 1 &&
        (await page.locator('[data-slot="empty-media"][data-variant="icon"]').count()) === 1,
      `${lang}: Empty shows its icon, title and description`,
    );
    check(issues.length === 0, `${lang}: display previews log nothing: ${issues.join(" | ")}`);
    await context.close();
  }

  // 4. Preview purity, per direction.
  const purity = await browser.newContext({ viewport: { width: 900, height: 700 } });
  const page = await purity.newPage();
  for (const name of [
    "kbd-basic",
    "kbd-context",
    "empty-basic",
    "empty-bordered",
    "empty-search",
    "empty-error",
    "item-variants",
    "item-sizes",
    "item-media",
    "item-link",
    "item-group",
    "item-header-footer",
    "chart-bar",
    "chart-line",
    "chart-area",
    "chart-pie",
    "chart-donut",
    "chart-interactive",
    "chart-table",
    "chart-palette",
  ]) {
    for (const dir of ["ltr", "rtl"]) {
      await page.goto(`${BASE}/preview/${name}?dir=${dir}`, { waitUntil: "networkidle" });
      await page.waitForTimeout(700);
      // The table behind the button is part of the preview, so open it for the check.
      const button = page.locator('[data-slot="chart-table-toggle"]');
      if ((await button.count()) > 0) await button.first().click();
      // biome-ignore lint/performance/useDomNodeTextContent: only the visible text counts here, not scripts
      const text = await page.evaluate(() => document.body.innerText);
      if (dir === "ltr") {
        check(!ARABIC.test(text), `${name} (ltr): no Arabic in the English preview`);
      } else {
        const bad = englishWords(text);
        check(
          bad.length === 0,
          `${name} (rtl): no English words in the Arabic preview: ${bad.join(", ")}`,
        );
      }
    }
  }
  await purity.close();
}
