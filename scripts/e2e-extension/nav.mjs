// Browser checks for the Phase 7 part 2 work stream "nav": Menubar, Navigation Menu and Sidebar.
// Called from scripts/e2e.mjs with the shared helpers.
//   1. Every page fits at 375 and 1280 px in /en and /ar, shows the Extension badge and the
//      extension note, and logs nothing to the console.
//   2. Menubar: keys open, move and close, the arrows follow the direction, moving along an open
//      bar opens the next menu, the submenu opens on the end side, checkbox items toggle.
//   3. Navigation Menu: the arrows follow the direction, Enter opens the panel, Escape closes it
//      and returns focus, the current page has aria-current.
//   4. Sidebar: the side follows the direction, the trigger and Ctrl+B toggle it, the icon rail
//      keeps the labels for screen readers and shows tooltips, the hidden sidebar is inert,
//      nested groups open with the keyboard, the open state survives a reload, and below 768px
//      it is a Drawer that traps focus and closes with Escape.
//   5. The previews are pure in both directions.
import { readFileSync } from "node:fs";

const allowlist = JSON.parse(
  readFileSync(new URL("../locale-allowlist.json", import.meta.url), "utf8"),
).words.map((w) => w.toLowerCase());
const ARABIC = /[؀-ٟ٭-ۯۺ-ۿݐ-ݿﭐ-﷿ﹰ-﻿]/;

const PAGES = ["menubar", "navigation-menu", "sidebar"];
const BADGE = { en: "Extension", ar: "امتداد" };
const NOTE = {
  en: "Platform Code extension, not part of DGA",
  ar: "امتداد من كود المنصات وليس جزءًا من DGA",
};
const TOGGLE = { en: "Toggle sidebar", ar: "تبديل الشريط الجانبي" };
const OPEN_NAV = { en: "Open navigation", ar: "فتح التنقل" };

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

export async function extNavChecks({ browser, BASE, check }) {
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
        `${lang} ${width}px: navigation pages log nothing: ${issues.join(" | ")}`,
      );
      await context.close();
    }
  }

  // 2 to 4. Behaviour, per direction.
  for (const lang of ["en", "ar"]) {
    const rtl = lang === "ar";
    const context = await browser.newContext({ viewport: { width: 1000, height: 800 } });
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
    const box = async (locator) => {
      const b = await locator.boundingBox();
      return b ? { left: b.x, right: b.x + b.width, width: b.width } : null;
    };
    const next = rtl ? "ArrowLeft" : "ArrowRight";
    const previous = rtl ? "ArrowRight" : "ArrowLeft";

    // Menubar.
    await open("menubar-basic");
    const bar = page.getByRole("menubar");
    check((await bar.count()) === 1, `${lang}: the menubar has role=menubar`);
    const triggers = bar.getByRole("menuitem");
    check((await triggers.count()) === 3, `${lang}: the menubar has three triggers`);
    await triggers.first().focus();
    check(
      (await triggers.first().getAttribute("aria-expanded")) === "false",
      `${lang}: a menubar trigger starts collapsed`,
    );
    const first = await activeText();
    await page.keyboard.press(next);
    const second = await activeText();
    check(second !== first && Boolean(second), `${lang}: ${next} moves to the next trigger`);
    await page.keyboard.press(previous);
    check((await activeText()) === first, `${lang}: ${previous} moves back`);
    await page.keyboard.press("End");
    check((await activeText()) !== first, `${lang}: End moves to the last trigger`);
    await page.keyboard.press("Home");
    check((await activeText()) === first, `${lang}: Home moves to the first trigger`);
    await page.keyboard.press("ArrowDown");
    const menu = page.getByRole("menu").first();
    await menu.waitFor({ state: "visible", timeout: 3000 });
    check(
      (await triggers.first().getAttribute("aria-expanded")) === "true",
      `${lang}: ArrowDown opens the menu and the trigger is expanded`,
    );
    const triggerBox = await box(triggers.first());
    const menuBox = await box(menu);
    check(
      rtl
        ? Math.abs(menuBox.right - triggerBox.right) <= 12
        : Math.abs(menuBox.left - triggerBox.left) <= 12,
      `${lang}: the menu aligns to the start edge of its trigger`,
    );
    // Submenu: opening focuses New request; Open, then Share (the third item).
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("ArrowDown");
    check(
      /Share|مشاركة/.test((await activeText()) ?? ""),
      `${lang}: arrow keys reach the submenu item`,
    );
    await page.keyboard.press(next);
    const menus = page.getByRole("menu");
    await page.waitForFunction(() => document.querySelectorAll('[role="menu"]').length >= 2, null, {
      timeout: 3000,
    });
    const sub = menus.nth(1);
    const parentBox = await box(menus.first());
    const subBox = await box(sub);
    check(
      rtl ? subBox.right <= parentBox.left + 8 : subBox.left >= parentBox.right - 8,
      `${lang}: the submenu opens on the end side`,
    );
    await page.keyboard.press(previous);
    await page.waitForFunction(
      () => document.querySelectorAll('[role="menu"]').length === 1,
      null,
      {
        timeout: 3000,
      },
    );
    check(true, `${lang}: ${previous} closes the submenu`);
    // Moving along an open bar opens the next menu.
    await page.keyboard.press("Escape");
    await menu.waitFor({ state: "hidden", timeout: 3000 });
    check((await activeText()) === first, `${lang}: Escape closes the menu, focus returns`);
    await page.keyboard.press("Enter");
    await page.getByRole("menu").first().waitFor({ state: "visible", timeout: 3000 });
    await page.keyboard.press("Escape");
    await triggers.first().focus();
    await page.keyboard.press("ArrowDown");
    await page.getByRole("menu").first().waitFor({ state: "visible", timeout: 3000 });
    await page.keyboard.press("ArrowUp");
    await page.keyboard.press(next);
    await page.waitForTimeout(300);
    check(
      (await triggers.nth(1).getAttribute("aria-expanded")) === "true",
      `${lang}: ${next} in an open menu opens the next menu`,
    );
    await page.keyboard.press("Escape");

    // Menubar checkbox and radio items.
    await open("menubar-groups");
    await page.getByRole("menubar").getByRole("menuitem").first().focus();
    await page.keyboard.press("ArrowDown");
    const checkbox = page.getByRole("menuitemcheckbox");
    await checkbox.waitFor({ state: "visible", timeout: 3000 });
    check(
      (await checkbox.getAttribute("aria-checked")) === "true",
      `${lang}: the checkbox item starts checked`,
    );
    await page.keyboard.press("Enter");
    await page.waitForTimeout(250);
    await page.getByRole("menubar").getByRole("menuitem").first().focus();
    await page.keyboard.press("ArrowDown");
    await checkbox.waitFor({ state: "visible", timeout: 3000 });
    check(
      (await checkbox.getAttribute("aria-checked")) === "false",
      `${lang}: Enter toggles the checkbox item`,
    );
    check(
      (await page.getByRole("menuitemradio").count()) === 2,
      `${lang}: the radio group has two options`,
    );
    await page.keyboard.press("Escape");

    // Navigation Menu.
    await open("navigation-menu-basic");
    const nav = page.getByRole("navigation");
    check((await nav.count()) >= 1, `${lang}: the navigation menu is a nav landmark`);
    const current = nav.locator('a[aria-current="page"]');
    check((await current.count()) === 1, `${lang}: the current page has aria-current`);
    const navTriggers = nav.locator("button[aria-expanded]");
    check((await navTriggers.count()) === 2, `${lang}: two items open a panel`);
    await current.first().focus();
    await page.keyboard.press(next);
    const services = await activeText();
    check(
      /Services|الخدمات/.test(services ?? ""),
      `${lang}: ${next} moves from the first item to the next`,
    );
    await page.keyboard.press("Enter");
    const panelLink = page.getByRole("link", { name: /Civil affairs|الأحوال المدنية/ });
    await panelLink.waitFor({ state: "visible", timeout: 3000 });
    check(
      (await navTriggers.first().getAttribute("aria-expanded")) === "true",
      `${lang}: Enter opens the panel and the trigger is expanded`,
    );
    const trigBox = await box(navTriggers.first());
    const panelBox = await box(page.locator('[data-slot="navigation-menu-popup"]'));
    check(
      rtl
        ? Math.abs(panelBox.right - trigBox.right) <= 40
        : Math.abs(panelBox.left - trigBox.left) <= 40,
      `${lang}: the panel aligns to the start edge of its trigger`,
    );
    check(
      (await page.getByRole("link", { name: /Traffic|المرور/ }).getAttribute("aria-current")) ===
        "page",
      `${lang}: the current page in the panel has aria-current`,
    );
    await page.keyboard.press("Escape");
    await panelLink.waitFor({ state: "hidden", timeout: 3000 });
    check((await activeText()) === services, `${lang}: Escape closes the panel, focus returns`);

    // Sidebar: the icon rail.
    const aside = () => page.locator('aside[data-slot="sidebar"]');
    const toggle = () => page.getByRole("button", { name: TOGGLE[lang] });
    await open("sidebar-icon");
    check(
      (await aside().getAttribute("data-state")) === "expanded",
      `${lang}: sidebar starts open`,
    );
    const asideBox = await box(aside());
    const insetBox = await box(page.locator('[data-slot="sidebar-inset"]'));
    check(
      rtl ? asideBox.left > insetBox.left : asideBox.left < insetBox.left,
      `${lang}: the sidebar is on the start side`,
    );
    check(
      (await page.locator('aside a[aria-current="page"]').count()) === 1,
      `${lang}: the current page has aria-current in the sidebar`,
    );
    check(
      (await toggle().getAttribute("aria-expanded")) === "true",
      `${lang}: the trigger is expanded while the sidebar is open`,
    );
    await toggle().focus();
    await page.keyboard.press("Enter");
    await page.waitForTimeout(400);
    check(
      (await aside().getAttribute("data-state")) === "collapsed",
      `${lang}: the trigger closes it`,
    );
    check(
      (await aside().getAttribute("data-collapsible")) === "icon",
      `${lang}: it collapses to the icon rail`,
    );
    const railWidth = (await box(aside())).width;
    check(railWidth > 40 && railWidth < 80, `${lang}: the rail is about 56px wide (${railWidth})`);
    check(
      (await page.getByRole("link", { name: /Requests|الطلبات/ }).count()) === 1,
      `${lang}: the rail keeps the label for screen readers`,
    );
    const requests = page.getByRole("link", { name: /Requests|الطلبات/ });
    check(
      !(await requests
        .locator("span")
        .first()
        .evaluate((el) => el.offsetWidth > 10)),
      `${lang}: the label is hidden visually on the rail`,
    );
    await requests.focus();
    await page.waitForTimeout(500);
    check(
      (await page
        .locator('[data-slot="tooltip-content"]')
        .filter({ hasText: /Requests|الطلبات/ })
        .count()) >= 1,
      `${lang}: focusing a rail icon shows its tooltip`,
    );
    await page.keyboard.press("Control+b");
    await page.waitForTimeout(400);
    check((await aside().getAttribute("data-state")) === "expanded", `${lang}: Ctrl+B opens it`);
    await page.keyboard.press("Control+b");
    await page.waitForTimeout(400);
    check((await aside().getAttribute("data-state")) === "collapsed", `${lang}: Ctrl+B closes it`);

    // Hidden sidebar is inert.
    await open("sidebar-offcanvas");
    await toggle().focus();
    await page.keyboard.press("Enter");
    await page.waitForTimeout(400);
    check(
      (await aside().getAttribute("data-collapsible")) === "offcanvas",
      `${lang}: the hidden sidebar is offcanvas`,
    );
    check(
      (await aside().locator('[data-sidebar="sidebar"]').getAttribute("inert")) !== null,
      `${lang}: the hidden sidebar is inert`,
    );
    check((await box(aside())).width < 2, `${lang}: the hidden sidebar takes no room`);

    // End side.
    await open("sidebar-end");
    const endBox = await box(aside());
    const endInset = await box(page.locator('[data-slot="sidebar-inset"]'));
    check(
      rtl ? endBox.left < endInset.left : endBox.left > endInset.left,
      `${lang}: side="end" puts the sidebar on the end side`,
    );

    // Nested groups.
    await open("sidebar-nested");
    const settings = page.getByRole("button", { name: /Settings|الإعدادات/ });
    check(
      (await settings.getAttribute("aria-expanded")) === "false",
      `${lang}: a nested group starts closed`,
    );
    await settings.focus();
    await page.keyboard.press("Enter");
    await page.waitForTimeout(400);
    check(
      (await settings.getAttribute("aria-expanded")) === "true",
      `${lang}: Enter opens a nested group`,
    );
    check(
      await page.getByRole("link", { name: /Privacy|الخصوصية/ }).isVisible(),
      `${lang}: the nested links are visible`,
    );
    await page.keyboard.press("Space");
    await page.waitForTimeout(400);
    check(
      (await settings.getAttribute("aria-expanded")) === "false",
      `${lang}: Space closes it again`,
    );

    // The open state survives a reload.
    await open("sidebar-persisted");
    await context.clearCookies();
    await page.reload({ waitUntil: "networkidle" });
    check(
      (await aside().getAttribute("data-state")) === "expanded",
      `${lang}: persisted sidebar starts open`,
    );
    await toggle().focus();
    await page.keyboard.press("Enter");
    await page.waitForTimeout(300);
    const cookies = await context.cookies();
    check(
      cookies.some((c) => c.name === "dga_docs_sidebar" && c.value === "false"),
      `${lang}: closing the sidebar writes the cookie`,
    );
    await page.reload({ waitUntil: "networkidle" });
    await page.waitForTimeout(300);
    check(
      (await aside().getAttribute("data-state")) === "collapsed",
      `${lang}: the closed state is restored after a reload`,
    );
    await context.clearCookies();

    // Phone: a Drawer.
    await page.setViewportSize({ width: 375, height: 700 });
    await open("sidebar-icon");
    check((await aside().count()) === 0, `${lang}: below 768px the sidebar is not in the page`);
    await toggle().focus();
    await page.keyboard.press("Enter");
    const drawer = page.getByRole("dialog");
    await drawer.waitFor({ state: "visible", timeout: 3000 });
    check(
      (await drawer.getAttribute("aria-labelledby")) !== null,
      `${lang}: the phone sidebar is a named dialog`,
    );
    check(
      (await drawer.locator('a[aria-current="page"]').count()) === 1,
      `${lang}: the phone sidebar shows the current page`,
    );
    const dBox = await box(drawer);
    check(
      rtl ? dBox.right > 375 - 40 : dBox.left < 40,
      `${lang}: the phone Drawer slides in from the start side`,
    );
    await page.keyboard.press("Tab");
    check(
      await page.evaluate(() => Boolean(document.activeElement?.closest('[role="dialog"]'))),
      `${lang}: focus stays in the Drawer`,
    );
    await page.keyboard.press("Escape");
    await drawer.waitFor({ state: "hidden", timeout: 3000 });
    check((await activeText()) !== undefined, `${lang}: Escape closes the Drawer`);
    await page.setViewportSize({ width: 1000, height: 800 });
    check(issues.length === 0, `${lang}: navigation previews log nothing: ${issues.join(" | ")}`);
    await context.close();
  }

  // 5. Preview purity, per direction, with the popups open.
  const purity = await browser.newContext({ viewport: { width: 900, height: 700 } });
  const page = await purity.newPage();
  for (const name of [
    "menubar-basic",
    "menubar-groups",
    "menubar-states",
    "navigation-menu-basic",
    "navigation-menu-links",
    "navigation-menu-open",
    "sidebar-basic",
    "sidebar-nested",
    "sidebar-icon",
    "sidebar-rail",
    "sidebar-offcanvas",
    "sidebar-end",
    "sidebar-persisted",
    "sidebar-mobile",
  ]) {
    for (const dir of ["ltr", "rtl"]) {
      await page.goto(`${BASE}/preview/${name}?dir=${dir}`, { waitUntil: "networkidle" });
      await page.waitForTimeout(250);
      if (name === "menubar-basic" || name === "menubar-groups" || name === "sidebar-mobile") {
        await page.keyboard.press("Tab");
        await page.keyboard.press(name === "sidebar-mobile" ? "Enter" : "ArrowDown");
        await page.waitForTimeout(500);
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
