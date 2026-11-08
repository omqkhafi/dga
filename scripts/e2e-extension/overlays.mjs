// Browser checks for the Phase 7 overlays (Popover, Hover Card, Alert Dialog, Context Menu).
// Called from scripts/e2e.mjs with the shared helpers.
//   1. Every page fits at 375 and 1280 px in /en and /ar, shows the Extension badge and the
//      extension note, and logs nothing to the console.
//   2. Popover, Hover Card, Alert Dialog and Context Menu work with the keyboard alone in LTR and
//      RTL: focus in and back, Escape, the side of the submenu, the arrow keys that follow the
//      direction, and the alert dialog that cannot be dismissed from outside.
//   3. Their previews are pure in both directions.
import { readFileSync } from "node:fs";

const allowlist = JSON.parse(
  readFileSync(new URL("../locale-allowlist.json", import.meta.url), "utf8"),
).words.map((w) => w.toLowerCase());
const ARABIC = /[؀-ٟ٭-ۯۺ-ۿݐ-ݿﭐ-﷿ﹰ-﻿]/;

const PAGES = ["popover", "hover-card", "alert-dialog", "context-menu"];
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

export async function overlaysChecks({ browser, BASE, check }) {
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
        const header = page.locator("article header");
        check(
          (await header.getByText(BADGE[lang], { exact: true }).count()) === 1,
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
        `${lang} ${width}px: overlay pages log nothing: ${issues.join(" | ")}`,
      );
      await context.close();
    }
  }

  // 2. Behaviour, per direction.
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
      await page.waitForTimeout(300);
    };
    const activeText = () => page.evaluate(() => document.activeElement?.textContent?.trim());
    const inside = (selector) =>
      page.evaluate((s) => Boolean(document.activeElement?.closest(s)), selector);
    const next = rtl ? "ArrowLeft" : "ArrowRight";
    const previous = rtl ? "ArrowRight" : "ArrowLeft";

    // Popover: Enter opens, focus moves in, it is named, Escape closes and focus returns.
    await open("popover-basic");
    await page.keyboard.press("Tab");
    const popTrigger = await activeText();
    check(Boolean(popTrigger), `${lang}: Tab reaches the popover trigger`);
    check(
      (await page.getByRole("button", { name: popTrigger }).getAttribute("aria-expanded")) ===
        "false",
      `${lang}: the popover trigger starts collapsed`,
    );
    await page.keyboard.press("Enter");
    const popover = page.getByRole("dialog");
    await popover.waitFor({ state: "visible", timeout: 3000 });
    check(
      (await popover.getAttribute("aria-labelledby")) !== null,
      `${lang}: the popover is named by its title`,
    );
    check(
      (await popover.getAttribute("aria-describedby")) !== null,
      `${lang}: the popover is described by its description`,
    );
    check(await inside('[role="dialog"]'), `${lang}: focus moves into the popover`);
    check(
      (await page.getByRole("button", { name: popTrigger }).getAttribute("aria-expanded")) ===
        "true",
      `${lang}: the popover trigger is expanded while open`,
    );
    await page.keyboard.press("Escape");
    await popover.waitFor({ state: "hidden", timeout: 3000 });
    check((await activeText()) === popTrigger, `${lang}: Escape closes the popover, focus returns`);
    // Clicking outside closes it.
    await page.keyboard.press("Enter");
    await popover.waitFor({ state: "visible", timeout: 3000 });
    await page.mouse.click(5, 5);
    await popover.waitFor({ state: "hidden", timeout: 3000 });
    check(
      !(await popover.isVisible().catch(() => false)),
      `${lang}: clicking outside closes the popover`,
    );

    // Popover sides: `start` is the left of the text (right in RTL).
    await open("popover-placements");
    const sides = await page.evaluate(() => {
      const pairs = [];
      for (const trigger of document.querySelectorAll('[data-slot="popover-trigger"]')) {
        const panelId = trigger.getAttribute("aria-controls");
        const panel = panelId ? document.getElementById(panelId) : null;
        if (panel) {
          const t = trigger.getBoundingClientRect();
          const p = panel.getBoundingClientRect();
          pairs.push({
            label: trigger.textContent.trim(),
            dx: p.x + p.width / 2 - (t.x + t.width / 2),
            dy: p.y + p.height / 2 - (t.y + t.height / 2),
          });
        }
      }
      return pairs;
    });
    check(
      sides.length === 4,
      `${lang}: four popovers are open in the placements preview (${sides.length})`,
    );
    const [top, bottom, start, end] = sides;
    check(top && top.dy < 0, `${lang}: side top opens above its trigger`);
    check(bottom && bottom.dy > 0, `${lang}: side bottom opens below its trigger`);
    check(
      start && (rtl ? start.dx > 0 : start.dx < 0),
      `${lang}: side start opens to the ${rtl ? "right" : "left"} of its trigger`,
    );
    check(
      end && (rtl ? end.dx < 0 : end.dx > 0),
      `${lang}: side end opens to the ${rtl ? "left" : "right"} of its trigger`,
    );

    // Hover Card: opens on keyboard focus, Escape closes, hover opens and stays while over it.
    await open("hover-card-basic");
    const card = page.locator('[data-slot="hover-card-content"]');
    await page.keyboard.press("Tab");
    const link = page.locator('[data-slot="hover-card-trigger"]');
    check(
      (await link.evaluate((el) => el === document.activeElement)) === true,
      `${lang}: Tab reaches the hover card link`,
    );
    await card.waitFor({ state: "visible", timeout: 3000 });
    check(await card.isVisible(), `${lang}: focusing the link opens the hover card`);
    await page.keyboard.press("Escape");
    await card.waitFor({ state: "hidden", timeout: 3000 });
    check(!(await card.isVisible().catch(() => false)), `${lang}: Escape closes the hover card`);
    await page.mouse.move(5, 5);
    await page.waitForTimeout(400);
    await link.hover();
    await card.waitFor({ state: "visible", timeout: 3000 });
    check(await card.isVisible(), `${lang}: hovering the link opens the hover card`);
    const cardBox = await card.boundingBox();
    await page.mouse.move(cardBox.x + cardBox.width / 2, cardBox.y + cardBox.height / 2, {
      steps: 8,
    });
    await page.waitForTimeout(700);
    check(
      await card.isVisible(),
      `${lang}: the hover card stays open while the pointer is over it`,
    );
    await page.mouse.move(5, 5, { steps: 4 });
    await card.waitFor({ state: "hidden", timeout: 3000 });
    check(
      !(await card.isVisible().catch(() => false)),
      `${lang}: the hover card closes when the pointer leaves`,
    );

    // Alert Dialog: alertdialog role, focus on Cancel, outside click does nothing, Escape cancels.
    await open("alert-dialog-basic");
    await page.keyboard.press("Tab");
    const adTrigger = await activeText();
    await page.keyboard.press("Enter");
    const alert = page.getByRole("alertdialog");
    await alert.waitFor({ state: "visible", timeout: 3000 });
    check(await alert.isVisible(), `${lang}: Enter opens the alert dialog (role alertdialog)`);
    check(
      (await alert.getAttribute("aria-labelledby")) !== null &&
        (await alert.getAttribute("aria-describedby")) !== null,
      `${lang}: the alert dialog has a name and a description`,
    );
    const cancelName = rtl ? "الإبقاء على الطلب" : "Keep request";
    check(
      (await activeText()) === cancelName,
      `${lang}: focus starts on Cancel (${await activeText()})`,
    );
    await page.mouse.click(5, 5);
    await page.waitForTimeout(400);
    check(await alert.isVisible(), `${lang}: clicking outside does not close the alert dialog`);
    // Focus may rest on a Base UI focus guard or leave the document (the body) and come back at
    // the start of the page; it must never go straight from the dialog to the page behind it.
    let trapped = true;
    let before = "dialog";
    for (let i = 0; i < 6; i++) {
      await page.keyboard.press("Tab");
      const where = await page.evaluate(() => {
        const el = document.activeElement;
        if (!el || el === document.body) return "body";
        if (el.hasAttribute("data-base-ui-focus-guard")) return "guard";
        return el.closest('[role="alertdialog"]') ? "dialog" : "page";
      });
      if (where === "page" && before !== "body") trapped = false;
      before = where;
    }
    check(trapped, `${lang}: Tab stays inside the alert dialog`);
    const box = await alert.boundingBox();
    const buttons = await alert.getByRole("button").all();
    check(buttons.length === 2, `${lang}: the alert dialog has two actions and no close icon`);
    const first = await buttons[0].boundingBox();
    const last = await buttons[1].boundingBox();
    check(
      rtl ? last.x < first.x : last.x > first.x,
      `${lang}: the main action is last, on the ${rtl ? "left" : "right"}`,
    );
    check(box.width <= 401, `${lang}: the alert dialog is 400px wide (${box.width})`);
    await page.keyboard.press("Escape");
    await alert.waitFor({ state: "hidden", timeout: 3000 });
    check(
      (await activeText()) === adTrigger,
      `${lang}: Escape cancels and returns focus to the trigger`,
    );

    await open("alert-dialog-controlled");
    await page.getByRole("button").first().click();
    await alert.waitFor({ state: "visible", timeout: 3000 });
    await page.keyboard.press("Tab");
    await page.keyboard.press("Enter");
    await alert.waitFor({ state: "hidden", timeout: 3000 });
    check(
      (await page.getByRole("status").count()) === 0 ||
        (await page.locator("[aria-live=polite]").first().textContent())?.length > 0,
      `${lang}: choosing an action closes the alert dialog and reports it`,
    );

    // Context Menu: Shift+F10 opens it, arrows move, submenu on the end side, Escape returns.
    await open("context-menu-submenu");
    await page.keyboard.press("Tab");
    check(
      (await page.evaluate(() => document.activeElement?.getAttribute("data-slot"))) ===
        "context-menu-trigger",
      `${lang}: Tab reaches the context menu area`,
    );
    await page.keyboard.press("Shift+F10");
    const menu = page.getByRole("menu").first();
    await menu.waitFor({ state: "visible", timeout: 3000 });
    check(await menu.isVisible(), `${lang}: Shift+F10 opens the context menu`);
    await page.keyboard.press("ArrowDown");
    check(await inside('[role="menu"]'), `${lang}: focus moves into the context menu`);
    await page.keyboard.press("ArrowDown");
    check(
      (await page.evaluate(() => document.activeElement?.getAttribute("aria-haspopup"))) === "menu",
      `${lang}: ArrowDown reaches the Share submenu item`,
    );
    await page.keyboard.press(next);
    await page.getByRole("menu").nth(1).waitFor({ state: "visible", timeout: 3000 });
    const root = await page.locator('[data-slot="context-menu-content"]').boundingBox();
    const sub = await page.locator('[data-slot="context-menu-sub-content"]').boundingBox();
    check(
      rtl ? sub.x + sub.width <= root.x + 6 : sub.x >= root.x + root.width - 6,
      `${lang}: the submenu opens on the ${rtl ? "left" : "right"} (end side)`,
    );
    await page.keyboard.press(previous);
    await page.waitForTimeout(300);
    check(
      (await page.getByRole("menu").count()) === 1,
      `${lang}: the opposite arrow closes the submenu`,
    );
    await page.keyboard.press("Escape");
    await menu.waitFor({ state: "hidden", timeout: 3000 });
    check(
      (await page.evaluate(() => document.activeElement?.getAttribute("data-slot"))) ===
        "context-menu-trigger",
      `${lang}: Escape closes the context menu and returns focus to the area`,
    );
    // The mouse: right-click opens it at the pointer.
    const areaBox = await page.locator('[data-slot="context-menu-trigger"]').boundingBox();
    await page.mouse.click(areaBox.x + 40, areaBox.y + 30, { button: "right" });
    await menu.waitFor({ state: "visible", timeout: 3000 });
    const at = await menu.boundingBox();
    check(
      Math.abs(at.x - (areaBox.x + 40)) < 160 || Math.abs(at.x + at.width - (areaBox.x + 40)) < 160,
      `${lang}: right-click opens the menu at the pointer`,
    );
    await page.keyboard.press("Escape");

    // Checkbox and radio items: chosen with Space, and the choice is kept for the next opening.
    await open("context-menu-groups");
    await page.keyboard.press("Tab");
    const reopen = async () => {
      await page.keyboard.press("Shift+F10");
      await page.getByRole("menu").waitFor({ state: "visible", timeout: 3000 });
    };
    await reopen();
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("Space");
    await page.waitForTimeout(250);
    check(
      (await page.getByRole("menuitemradio").nth(1).getAttribute("aria-checked")) === "true" &&
        (await page.getByRole("menuitemradio").nth(0).getAttribute("aria-checked")) === "false",
      `${lang}: Space chooses a radio item, and the menu stays open for more choices`,
    );
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("Space");
    await page.waitForTimeout(250);
    check(
      (await page.getByRole("menuitemcheckbox").getAttribute("aria-checked")) === "false",
      `${lang}: Space turns a checkbox item off`,
    );
    await page.keyboard.press("Escape");

    check(issues.length === 0, `${lang}: overlay previews log nothing: ${issues.join(" | ")}`);
    await context.close();
  }

  // 3. Preview purity, per direction, with the popups open.
  const purity = await browser.newContext({ viewport: { width: 900, height: 700 } });
  const page = await purity.newPage();
  for (const name of [
    "popover-basic",
    "popover-placements",
    "popover-form",
    "popover-states",
    "hover-card-basic",
    "hover-card-placements",
    "hover-card-states",
    "alert-dialog-basic",
    "alert-dialog-neutral",
    "alert-dialog-controlled",
    "context-menu-basic",
    "context-menu-groups",
    "context-menu-submenu",
  ]) {
    for (const dir of ["ltr", "rtl"]) {
      await page.goto(`${BASE}/preview/${name}?dir=${dir}`, { waitUntil: "networkidle" });
      await page.waitForTimeout(250);
      // Open whatever opens with one key press, so the popup text is checked too.
      if (
        name.startsWith("popover-basic") ||
        name.startsWith("alert-dialog") ||
        name.startsWith("context-menu")
      ) {
        await page.keyboard.press("Tab");
        await page.keyboard.press(name.startsWith("context-menu") ? "Shift+F10" : "Enter");
        await page.waitForTimeout(400);
      }
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
