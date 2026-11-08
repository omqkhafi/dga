// Browser checks for the Phase 7 part 2 work stream "layout": Collapsible, Scroll Area, Resizable
// and Aspect Ratio. Called from scripts/e2e.mjs with the shared helpers.
//   1. Every page fits at 375 and 1280 px in /en and /ar, shows the Extension badge and the
//      extension note, and logs nothing to the console.
//   2. Collapsible: Enter and Space toggle it, aria-expanded follows, a closed panel is hidden,
//      a disabled trigger does nothing.
//   3. Scroll Area: the viewport is a named, focusable region that the arrow keys, Page Down and
//      End scroll; the vertical scrollbar is on the end side (right in LTR, left in RTL).
//   4. Resizable: the handle is a focusable separator; the arrow keys and a drag resize the panels
//      the way they look (the start panel is on the right in RTL), Home and End go to the ends,
//      Enter collapses a collapsible panel, a vertical group uses Up and Down.
//   5. Aspect Ratio: the boxes keep 16 / 9, 4 / 3 and 1, and fit sets object-fit.
//   6. Every layout preview is pure in both directions.
import { readFileSync } from "node:fs";

const allowlist = JSON.parse(
  readFileSync(new URL("../locale-allowlist.json", import.meta.url), "utf8"),
).words.map((w) => w.toLowerCase());
const ARABIC = /[؀-ٟ٭-ۯۺ-ۿݐ-ݿﭐ-﷿ﹰ-﻿]/;

const PAGES = ["collapsible", "scroll-area", "resizable", "aspect-ratio"];
const PREVIEWS = [
  "collapsible-basic",
  "collapsible-states",
  "collapsible-list",
  "scroll-area-vertical",
  "scroll-area-horizontal",
  "scroll-area-both",
  "scroll-area-visibility",
  "resizable-horizontal",
  "resizable-vertical",
  "resizable-handle",
  "resizable-collapsible",
  "resizable-saved",
  "aspect-ratio-ratios",
  "aspect-ratio-fit",
];
const BADGE = { en: "Extension", ar: "امتداد" };
const NOTE = {
  en: "Platform Code extension, not part of DGA",
  ar: "امتداد من كود المنصات وليس جزءًا من DGA",
};

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

export async function extLayoutChecks({ browser, BASE, check }) {
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
        check(
          (await page.locator("article header").getByText(BADGE[lang], { exact: true }).count()) ===
            1,
          `${lang} ${width}px: ${slug} shows the Extension badge in the page header`,
        );
        check(
          (await page.getByText(NOTE[lang], { exact: true }).count()) >= 1,
          `${lang} ${width}px: ${slug} says it is an extension, not part of DGA`,
        );
        if (width === 1280) {
          check(
            (await page
              .locator(`nav a[href$="/docs/components/${slug}"]`)
              .getByText(BADGE[lang], { exact: true })
              .count()) >= 1,
            `${lang}: ${slug} has the Extension badge in the sidebar`,
          );
        }
      }
      check(
        issues.length === 0,
        `${lang} ${width}px: layout pages log nothing: ${issues.join(" | ")}`,
      );
      await context.close();
    }
  }

  // 2 to 5. Behaviour, per direction.
  for (const lang of ["en", "ar"]) {
    const rtl = lang === "ar";
    const context = await browser.newContext({ viewport: { width: 900, height: 700 } });
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
      await page.waitForTimeout(400);
    };

    // Collapsible.
    await open("collapsible-basic");
    const trigger = page.locator('[data-slot="collapsible-trigger"]');
    const panel = page.locator('[data-slot="collapsible-content"]');
    await page.keyboard.press("Tab");
    check(
      await trigger.evaluate((el) => el === document.activeElement),
      `${lang}: Tab reaches the collapsible trigger`,
    );
    check(
      (await trigger.getAttribute("aria-expanded")) === "false",
      `${lang}: the collapsible starts closed`,
    );
    check(!(await panel.isVisible()), `${lang}: a closed collapsible panel is hidden`);
    await page.keyboard.press("Enter");
    await panel.waitFor({ state: "visible", timeout: 3000 });
    check(
      (await trigger.getAttribute("aria-expanded")) === "true",
      `${lang}: Enter opens the collapsible (aria-expanded)`,
    );
    check(
      (await trigger.getAttribute("aria-controls")) === (await panel.getAttribute("id")),
      `${lang}: the trigger controls the panel`,
    );
    await page.keyboard.press("Space");
    await panel.waitFor({ state: "hidden", timeout: 3000 });
    check(
      (await trigger.getAttribute("aria-expanded")) === "false",
      `${lang}: Space closes the collapsible`,
    );
    await open("collapsible-states");
    const disabled = page.locator('[data-slot="collapsible-trigger"][data-disabled]');
    check(
      (await disabled.count()) === 1,
      `${lang}: the disabled collapsible trigger is marked disabled`,
    );
    await disabled.click({ force: true }).catch(() => {});
    check(
      (await disabled.getAttribute("aria-expanded")) === "false",
      `${lang}: a disabled collapsible does not open`,
    );

    // Scroll Area.
    await open("scroll-area-vertical");
    const viewport = page.locator('[data-slot="scroll-area-viewport"]');
    check(
      (await viewport.getAttribute("role")) === "region" &&
        Boolean(await viewport.getAttribute("aria-label")),
      `${lang}: the scroll area viewport is a named region`,
    );
    await page.keyboard.press("Tab");
    check(
      await viewport.evaluate((el) => el === document.activeElement),
      `${lang}: Tab focuses the scroll area viewport`,
    );
    await page.keyboard.press("ArrowDown");
    await page.waitForTimeout(150);
    const afterArrow = await viewport.evaluate((el) => el.scrollTop);
    check(afterArrow > 0, `${lang}: ArrowDown scrolls the scroll area (${afterArrow}px)`);
    await page.keyboard.press("PageDown");
    // Smooth scrolling on a busy runner can take a while: poll instead of one fixed pause.
    for (let i = 0; i < 20; i++) {
      if ((await viewport.evaluate((el) => el.scrollTop)) > afterArrow) break;
      await page.waitForTimeout(250);
    }
    check(
      (await viewport.evaluate((el) => el.scrollTop)) > afterArrow,
      `${lang}: Page Down scrolls further (after arrow ${afterArrow}px)`,
    );
    await page.keyboard.press("End");
    await page.waitForTimeout(800);
    check(
      await viewport.evaluate((el) => el.scrollTop + el.clientHeight >= el.scrollHeight - 2),
      `${lang}: End reaches the bottom`,
    );
    const bar = page.locator('[data-slot="scroll-area-scrollbar"][data-orientation="vertical"]');
    const side = await page.evaluate(() => {
      const root = document.querySelector('[data-slot="scroll-area"]').getBoundingClientRect();
      const bar = document
        .querySelector('[data-slot="scroll-area-scrollbar"]')
        .getBoundingClientRect();
      return { barCentre: bar.x + bar.width / 2, rootCentre: root.x + root.width / 2 };
    });
    check(
      rtl ? side.barCentre < side.rootCentre : side.barCentre > side.rootCentre,
      `${lang}: the vertical scrollbar is on the ${rtl ? "left" : "right"}, the end side`,
    );
    check((await bar.count()) === 1, `${lang}: the vertical scroll area has one vertical bar`);
    check(
      (await page
        .locator('[data-slot="scroll-area-thumb"]')
        .first()
        .evaluate((el) => getComputedStyle(el).backgroundColor)) !== "rgba(0, 0, 0, 0)",
      `${lang}: the scrollbar thumb has a colour`,
    );
    await open("scroll-area-horizontal");
    const hViewport = page.locator('[data-slot="scroll-area-viewport"]');
    await page.keyboard.press("Tab");
    // ArrowRight scrolls toward the right edge, which is the end in English and the start in Arabic.
    const toEnd = rtl ? "ArrowLeft" : "ArrowRight";
    const toStart = rtl ? "ArrowRight" : "ArrowLeft";
    for (let i = 0; i < 6; i++) await page.keyboard.press(toEnd);
    await page.waitForTimeout(500);
    const scrolledX = await hViewport.evaluate((el) => Math.abs(el.scrollLeft));
    check(
      scrolledX > 0,
      `${lang}: ${toEnd} scrolls the horizontal area toward its end (${scrolledX}px)`,
    );
    for (let i = 0; i < 30; i++) await page.keyboard.press(toStart);
    await page.waitForTimeout(600);
    check(
      (await hViewport.evaluate((el) => Math.abs(el.scrollLeft))) === 0,
      `${lang}: ${toStart} returns to the start`,
    );
    await open("scroll-area-both");
    check(
      (await page.locator('[data-slot="scroll-area-scrollbar"]').count()) === 2,
      `${lang}: orientation both has two scrollbars`,
    );

    // Resizable, horizontal.
    await open("resizable-horizontal");
    const handle = page.locator('[data-slot="resizable-handle"]');
    const list = page.locator("#list");
    const detail = page.locator("#detail");
    check(
      (await handle.getAttribute("role")) === "separator" &&
        (await handle.getAttribute("aria-orientation")) === "vertical",
      `${lang}: the horizontal group's handle is a vertical separator`,
    );
    check(Boolean(await handle.getAttribute("aria-label")), `${lang}: the handle is named`);
    const listBox = await list.boundingBox();
    const detailBox = await detail.boundingBox();
    check(
      rtl ? listBox.x > detailBox.x : listBox.x < detailBox.x,
      `${lang}: the first (start) panel is on the ${rtl ? "right" : "left"}`,
    );
    const group = page.locator('[data-slot="resizable-panel-group"]');
    check(
      (await list.getAttribute("dir")) === (rtl ? "rtl" : "ltr"),
      `${lang}: each panel keeps the page direction for its content`,
    );
    check(
      (await group.getAttribute("dir")) === "ltr",
      `${lang}: the group itself is laid out left to right`,
    );
    const width = async () => (await list.boundingBox()).width;
    const w0 = await width();
    await page.keyboard.press("Tab");
    check(
      await handle.evaluate((el) => el === document.activeElement),
      `${lang}: Tab focuses the resize handle`,
    );
    const grow = rtl ? "ArrowLeft" : "ArrowRight";
    const shrink = rtl ? "ArrowRight" : "ArrowLeft";
    await page.keyboard.press(grow);
    await page.waitForTimeout(150);
    const w1 = await width();
    check(w1 > w0 + 5, `${lang}: ${grow} grows the start panel (${w0} to ${w1})`);
    await page.keyboard.press(shrink);
    await page.keyboard.press(shrink);
    await page.waitForTimeout(150);
    const w2 = await width();
    check(w2 < w1 - 5, `${lang}: ${shrink} shrinks the start panel (${w1} to ${w2})`);
    await page.keyboard.press("Home");
    await page.waitForTimeout(150);
    const wMin = await width();
    check(wMin <= w2, `${lang}: Home sends the handle to the start (${wMin})`);
    await page.keyboard.press("End");
    await page.waitForTimeout(150);
    const wMax = await width();
    check(wMax > w2, `${lang}: End sends the handle to the end (${wMax})`);
    check(
      wMax <= (await group.boundingBox()).width * 0.61,
      `${lang}: maxSize (60%) holds at the end (${wMax})`,
    );
    // Drag toward the end side.
    await page.keyboard.press("Home");
    await page.waitForTimeout(150);
    const dragStart = await width();
    const hb = await handle.boundingBox();
    const hx = hb.x + hb.width / 2;
    const hy = hb.y + hb.height / 2;
    await page.mouse.move(hx, hy);
    await page.mouse.down();
    await page.mouse.move(hx + (rtl ? -60 : 60), hy, { steps: 6 });
    await page.mouse.up();
    await page.waitForTimeout(150);
    const dragged = await width();
    check(
      dragged > dragStart + 30,
      `${lang}: dragging the handle ${rtl ? "left" : "right"} grows the start panel (${dragStart} to ${dragged})`,
    );

    // Resizable, vertical.
    await open("resizable-vertical");
    const vHandle = page.locator('[data-slot="resizable-handle"]');
    check(
      (await vHandle.getAttribute("aria-orientation")) === "horizontal",
      `${lang}: the vertical group's handle is a horizontal separator`,
    );
    const top = page.locator("#top");
    const h0 = (await top.boundingBox()).height;
    await page.keyboard.press("Tab");
    await page.keyboard.press("ArrowDown");
    await page.waitForTimeout(150);
    check(
      (await top.boundingBox()).height > h0 + 5,
      `${lang}: ArrowDown grows the top panel of a vertical group`,
    );
    const before = (await top.boundingBox()).height;
    await page.keyboard.press("ArrowRight");
    await page.waitForTimeout(150);
    check(
      Math.abs((await top.boundingBox()).height - before) < 1,
      `${lang}: the left and right arrows do nothing on a horizontal handle`,
    );

    // Resizable, collapsible panel and grip.
    await open("resizable-collapsible");
    const nav = page.locator("#nav");
    const n0 = (await nav.boundingBox()).width;
    check(n0 > 50, `${lang}: the collapsible panel starts open (${n0})`);
    await page.keyboard.press("Tab");
    await page.keyboard.press("Enter");
    await page.waitForTimeout(200);
    check((await nav.boundingBox()).width < 2, `${lang}: Enter on the handle collapses the panel`);
    await page.keyboard.press("Enter");
    await page.waitForTimeout(200);
    check((await nav.boundingBox()).width > 50, `${lang}: Enter again expands the panel`);
    check(
      (await page
        .locator('[data-slot="resizable-handle"] .lucide, [data-slot="resizable-handle"] svg')
        .count()) >= 1,
      `${lang}: withHandle draws a grip`,
    );

    // Aspect Ratio.
    await open("aspect-ratio-ratios");
    for (const [id, expected] of [
      ["16/9", 16 / 9],
      ["4/3", 4 / 3],
      ["1/1", 1],
    ]) {
      const box = await page.locator(`[data-testid="ratio-${id}"]`).boundingBox();
      check(
        Math.abs(box.width / box.height - expected) < 0.02,
        `${lang}: the ${id} box keeps its ratio (${(box.width / box.height).toFixed(3)})`,
      );
    }
    await open("aspect-ratio-fit");
    const fits = await page
      .locator('[data-slot="aspect-ratio"] img')
      .evaluateAll((els) => els.map((el) => getComputedStyle(el).objectFit));
    check(fits.join() === "cover,contain", `${lang}: fit sets object-fit (${fits.join()})`);

    check(issues.length === 0, `${lang}: layout previews log nothing: ${issues.join(" | ")}`);
    await context.close();
  }

  // 6. Preview purity: one language per direction.
  const context = await browser.newContext({ viewport: { width: 900, height: 700 } });
  const page = await context.newPage();
  for (const name of PREVIEWS) {
    for (const dir of ["ltr", "rtl"]) {
      await page.goto(`${BASE}/preview/${name}?dir=${dir}`, { waitUntil: "networkidle" });
      await page.waitForTimeout(200);
      const text = await page.evaluate(() =>
        [...document.querySelectorAll("body *")]
          .filter(
            (el) =>
              el.children.length === 0 &&
              !el.closest("svg,code,kbd,script,style,noscript,[data-skip-purity]"),
          )
          .map((el) => el.textContent)
          .join(" "),
      );
      if (dir === "rtl") {
        const words = englishWords(text);
        check(words.length === 0, `${name} (rtl) has no English words: ${words.join(", ")}`);
      } else {
        check(!ARABIC.test(text), `${name} (ltr) has no Arabic`);
      }
    }
  }
  await context.close();
}
