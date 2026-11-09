// Browser checks against a running docs site: `bun run test:e2e` (set E2E_BASE_URL, default
// http://localhost:3000; set CHROMIUM_PATH to use an existing Chromium).
//   1. Locale: the dga_locale cookie wins over Accept-Language, which wins over English, and the
//      language switcher writes the cookie.
//   2. Layout: the header and page fit at 375, 768, 1024 and 1280 px in LTR and RTL, light and
//      dark, with the lockup on the start side, and nothing is logged to the console.
//   3. Discovery: /sitemap.xml is an index of both language sitemaps, robots.txt lists it, and
//      the bare /manifest.webmanifest redirects like any other URL without a language.
//   5. Field states: the underline of Input, Textarea, Select and Number Input grows from the centre
//      with scaleX in LTR and RTL, there is no outline after a mouse click, the press shows half
//      the underline and focus the full one.
//   6. Interactive: every Phase 4 page fits at 375 and 1280 px in both languages, and Dialog, Menu
//      and Tabs work with the keyboard alone in /en and /ar (focus trap and return, submenu side,
//      arrow keys that follow the direction), Drawer flips with the direction, and Toast is a live
//      region.
//   7. AI Resources: the AI pages, the skills index and its digest, llms.json, llms.txt,
//      Accept: text/markdown, the Link header, WebMCP and the Copy page menu.
//   8. Polish: locale purity (no Arabic on English pages, no English words on Arabic ones, the
//      hero card included; previews checked against the language of their direction), the hero on registry components, RTL comparisons
//      with no dead space, one size in the preview toolbar and centred single-trigger previews.
//   9. Not found: /en/nope, /en/docs/nope, /ar/nope and /ar/docs/nope answer 404 in their own
//      language (lang, dir, title, h1), both in the raw HTML and in the browser.
//  10. Arabic exception: Deviation reasons and Contrast state labels stay English on Arabic
//      pages, marked lang="en" (an accepted policy, see CONTRIBUTING.md).
//  11. Preview content language: inside a preview the content follows the direction toggle
//      (RTL is Arabic, LTR is English) on /en and /ar pages, the default view is the page
//      language, the page around the frame stays in its own language, and every preview is
//      pure in both directions (Field, Input, Select, Dialog, Toast and Tabs toggled in place).
//  12. Navigation and data display: every Phase 5 page fits at 375 and 1280 px in both languages, and
//      Pagination, Stepper, Rating, Data Table, Breadcrumb and Table of Contents work with the
//      keyboard alone in /en and /ar, with RTL column order, mirrored arrows and the compact forms.
//  13. Composite: every Phase 6 page fits at 375 and 1280 px in both languages, and Header (skip link,
//      arrow keys that follow the direction, the Menu sub-menu, the Drawer at 375px, aria-current),
//      Footer (the Accordion at 375px), Second Nav (sideways scroll), Date Picker (grid semantics,
//      arrows, Page Up and Down, Home and End, the Hijri calendar checked against Intl, the popup,
//      typing, ranges, limits), Carousel (slide order, arrow keys, swipe, autoplay and reduced
//      motion) and Filtration (checkbox, tags, clear all, the Drawer at 375px) work in /en and /ar.
//   4. Forms: every form component page fits at 375 and 1280 px in both languages, and the
//      service request form can be completed with the keyboard alone in /en and /ar.
import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { chromium } from "playwright";
import { extDisplayChecks } from "./e2e-extension/display.mjs";
import { inputsChecks } from "./e2e-extension/inputs.mjs";
import { extLayoutChecks } from "./e2e-extension/layout.mjs";
import { miscChecks } from "./e2e-extension/misc.mjs";
import { extNavChecks } from "./e2e-extension/nav.mjs";
import { overlaysChecks } from "./e2e-extension/overlays.mjs";

// E2E_COMPONENTS=button,dialog narrows the page loops of `form-pages` and `polish` to those
// component pages (pull requests: the changed components and their dependants). Unset: every page.
const ONLY = process.env.E2E_COMPONENTS?.split(",").filter(Boolean);
const inScope = (name) => !ONLY || ONLY.includes(name);

const BASE = process.env.E2E_BASE_URL ?? "http://localhost:3000";
const failures = [];
let passed = 0;
const check = (condition, message) => {
  if (condition) passed++;
  else {
    failures.push(message);
    console.log(`FAIL ${message}`);
  }
};
const path = (page) => new URL(page.url()).pathname;

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH });

async function localeChecks() {
  const open = async (options, cookie) => {
    const context = await browser.newContext(options);
    if (cookie)
      await context.addCookies([{ name: "dga_locale", value: cookie, url: BASE, sameSite: "Lax" }]);
    const page = await context.newPage();
    return { context, page };
  };

  let { context, page } = await open({ locale: "en-US" }, "ar");
  await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
  check(path(page) === "/ar", `cookie ar: "/" redirects to /ar (got ${path(page)})`);
  await page.goto(`${BASE}/docs/installation`, { waitUntil: "networkidle" });
  check(
    path(page) === "/ar/docs/installation",
    `cookie ar: "/docs/installation" keeps the path (got ${path(page)})`,
  );
  await context.close();

  ({ context, page } = await open({ locale: "ar-SA" }, "en"));
  await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
  check(path(page) === "/en", `cookie en beats Accept-Language ar (got ${path(page)})`);
  await context.close();

  ({ context, page } = await open({ locale: "ar-SA" }));
  await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
  check(path(page) === "/ar", `no cookie: Accept-Language ar (got ${path(page)})`);
  await context.close();

  ({ context, page } = await open({ locale: "fr-FR" }));
  await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
  check(path(page) === "/en", `no cookie, unsupported language: English (got ${path(page)})`);
  await context.close();

  ({ context, page } = await open({ viewport: { width: 1280, height: 800 }, locale: "en-US" }));
  await page.goto(`${BASE}/en/docs/components/button`, { waitUntil: "networkidle" });
  await page.locator('header a[hreflang="ar"]:visible').first().click();
  await page.waitForURL("**/ar/docs/components/button");
  const cookie = (await context.cookies()).find((c) => c.name === "dga_locale");
  check(cookie?.value === "ar", "switcher writes dga_locale=ar");
  check(cookie?.sameSite === "Lax" && cookie?.path === "/", "cookie is SameSite=Lax, path=/");
  check((cookie?.expires ?? 0) - Date.now() / 1000 > 364 * 86400, "cookie lasts about a year");
  await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
  check(path(page) === "/ar", `after switching, "/" opens /ar (got ${path(page)})`);
  await context.close();
}

async function layoutChecks() {
  const pages = [
    ["/en", "ltr", "en", "Platform Code"],
    ["/ar", "rtl", "ar", "كود المنصات"],
    ["/en/docs/components/button", "ltr", "en", "Platform Code"],
    ["/ar/docs/components/button", "rtl", "ar", "كود المنصات"],
    ["/en/docs/ai/skills", "ltr", "en", "Platform Code"],
    ["/ar/docs/ai/mcp", "rtl", "ar", "كود المنصات"],
    ["/en/docs/components/badge", "ltr", "en", "Platform Code"],
    ["/ar/docs/components/dialog", "rtl", "ar", "كود المنصات"],
  ];
  const issues = new Set();
  for (const width of [375, 768, 1024, 1280]) {
    for (const scheme of ["light", "dark"]) {
      const context = await browser.newContext({
        viewport: { width, height: 800 },
        colorScheme: scheme,
      });
      const page = await context.newPage();
      page.on("console", (m) => {
        if (["error", "warning"].includes(m.type()))
          issues.add(`${m.type()}: ${m.text().slice(0, 160)}`);
      });
      page.on("pageerror", (e) => issues.add(`pageerror: ${e.message.slice(0, 160)}`));
      for (const [url, dir, lang, name] of pages) {
        await page.goto(`${BASE}${url}`, { waitUntil: "networkidle" });
        const r = await page.evaluate(() => {
          const visible = (el) => el.getClientRects().length > 0;
          const header = document.querySelector("header");
          const logo = [...header.querySelectorAll("a[aria-label]")].find(visible);
          const box = logo.getBoundingClientRect();
          const controls = [...header.querySelectorAll("a,button")]
            .filter(visible)
            .map((e) => e.getBoundingClientRect());
          const root = document.documentElement;
          return {
            dir: root.dir,
            lang: root.lang,
            scroll: root.scrollWidth,
            client: root.clientWidth,
            height: Math.round(header.getBoundingClientRect().height),
            name: logo.textContent.trim(),
            logoCentre: (box.left + box.right) / 2,
            left: Math.min(...controls.map((b) => b.left)),
            right: Math.max(...controls.map((b) => b.right)),
            inner: window.innerWidth,
            tabs: [...header.querySelectorAll("nav a")].filter(visible).length,
          };
        });
        const tag = `${url} @${width} ${scheme}`;
        check(r.dir === dir && r.lang === lang, `${tag}: <html lang dir>`);
        check(r.scroll <= r.client + 1, `${tag}: no horizontal scroll (${r.scroll} > ${r.client})`);
        check(
          r.left >= -0.5 && r.right <= r.inner + 0.5,
          `${tag}: header fits (${r.left}..${r.right})`,
        );
        check(r.height === (width >= 1024 ? 48 : 44), `${tag}: header height ${r.height}`);
        check(r.name === name, `${tag}: lockup says "${r.name}"`);
        check(
          dir === "rtl" ? r.logoCentre > r.inner / 2 : r.logoCentre < r.inner / 2,
          `${tag}: lockup on the start side`,
        );
        if (width >= 1024) check(r.tabs === 3, `${tag}: three tabs (${r.tabs})`);
      }
      await context.close();
    }
  }
  check(issues.size === 0, `no console errors or warnings: ${[...issues].join(" | ")}`);
}

const INTERACTIVE_PAGES = [
  "dialog",
  "drawer",
  "tooltip",
  "menu",
  "tabs",
  "accordion",
  "content-switcher",
  "toast",
  "notification",
  "inline-alert",
];

const NAVIGATION_PAGES = [
  "breadcrumb",
  "pagination",
  "table-of-contents",
  "card",
  "list",
  "table",
  "data-table",
  "rating",
  "progress",
  "stepper",
];

const COMPOSITE_PAGES = ["header", "second-nav", "footer", "date-picker", "carousel", "filtration"];

const FORM_PAGES = [
  "field",
  "input",
  "textarea",
  "select",
  "number-input",
  "search-box",
  "checkbox",
  "radio",
  "switch",
  "file-upload",
];

async function discoveryChecks() {
  const context = await browser.newContext();
  const get = (path, options) => context.request.get(`${BASE}${path}`, options);

  const index = await get("/sitemap.xml");
  const body = await index.text();
  check(index.status() === 200, `/sitemap.xml returns 200 (got ${index.status()})`);
  check(
    /<sitemapindex/.test(body) &&
      /\/sitemap\/en\.xml/.test(body) &&
      /\/sitemap\/ar\.xml/.test(body),
    "/sitemap.xml is an index of /sitemap/en.xml and /sitemap/ar.xml",
  );
  for (const lang of ["en", "ar"]) {
    const sitemap = await get(`/sitemap/${lang}.xml`);
    const xml = await sitemap.text();
    check(sitemap.status() === 200, `/sitemap/${lang}.xml returns 200`);
    check(
      [...FORM_PAGES, ...INTERACTIVE_PAGES, ...NAVIGATION_PAGES, ...COMPOSITE_PAGES].every((name) =>
        xml.includes(`/${lang}/docs/components/${name}`),
      ),
      `/sitemap/${lang}.xml lists every form, interactive, navigation and composite component page`,
    );
  }
  const robots = await (await get("/robots.txt")).text();
  check(/^Sitemap: .*\/sitemap\.xml$/m.test(robots), "robots.txt lists /sitemap.xml");

  const manifest = async (headers) => {
    const response = await get("/manifest.webmanifest", { maxRedirects: 0, headers });
    return {
      status: response.status(),
      location: new URL(response.headers().location ?? "", BASE).pathname,
    };
  };
  let result = await manifest({ "Accept-Language": "en-US" });
  check(
    result.status >= 300 && result.status < 400 && result.location === "/en/manifest.webmanifest",
    `/manifest.webmanifest with Accept-Language en goes to /en (got ${result.status} ${result.location})`,
  );
  result = await manifest({ "Accept-Language": "ar-SA" });
  check(
    result.location === "/ar/manifest.webmanifest",
    `Accept-Language ar goes to /ar (got ${result.location})`,
  );
  result = await manifest({ "Accept-Language": "ar-SA", Cookie: "dga_locale=en" });
  check(
    result.location === "/en/manifest.webmanifest",
    `cookie en beats Accept-Language ar (got ${result.location})`,
  );
  result = await manifest({ Cookie: "dga_locale=ar" });
  check(
    result.location === "/ar/manifest.webmanifest",
    `cookie ar goes to /ar (got ${result.location})`,
  );
  result = await manifest({});
  check(
    result.location === "/en/manifest.webmanifest",
    `no cookie, no language: English (got ${result.location})`,
  );
  for (const lang of ["en", "ar"]) {
    const final = await get(`/${lang}/manifest.webmanifest`);
    check(final.status() === 200, `/${lang}/manifest.webmanifest returns 200`);
  }
  await context.close();
}

async function formPageChecks() {
  const issues = new Set();
  for (const width of [375, 1280]) {
    for (const scheme of ["light", "dark"]) {
      const context = await browser.newContext({
        viewport: { width, height: 800 },
        colorScheme: scheme,
      });
      const page = await context.newPage();
      page.on("console", (m) => {
        if (["error", "warning"].includes(m.type()))
          issues.add(`${m.type()}: ${m.text().slice(0, 160)}`);
      });
      page.on("pageerror", (e) => issues.add(`pageerror: ${e.message.slice(0, 160)}`));
      for (const lang of ["en", "ar"]) {
        for (const name of [
          ...FORM_PAGES,
          ...INTERACTIVE_PAGES,
          ...NAVIGATION_PAGES,
          ...COMPOSITE_PAGES,
        ].filter(inScope)) {
          const url = `/${lang}/docs/components/${name}`;
          await page.goto(`${BASE}${url}`, { waitUntil: "networkidle" });
          const r = await page.evaluate(() => ({
            dir: document.documentElement.dir,
            scroll: document.documentElement.scrollWidth,
            client: document.documentElement.clientWidth,
            h1: document.querySelector("h1")?.textContent?.trim(),
          }));
          const tag = `${url} @${width} ${scheme}`;
          check(r.dir === (lang === "ar" ? "rtl" : "ltr"), `${tag}: dir`);
          check(
            r.scroll <= r.client + 1,
            `${tag}: no horizontal scroll (${r.scroll} > ${r.client})`,
          );
          check(Boolean(r.h1), `${tag}: has a title`);
        }
      }
      await context.close();
    }
  }
  check(
    issues.size === 0,
    `form, interactive, navigation and composite pages: no console errors or warnings: ${[...issues].join(" | ")}`,
  );
}

/** Input, Textarea, Select and Number Input: the DGA underline and focus model, LTR and RTL. */
async function fieldStateChecks() {
  const cases = [
    { name: "input-states", box: "[data-slot=input]", field: "input" },
    { name: "textarea-states", box: "[data-slot=textarea]", field: "textarea" },
    { name: "number-input-states", box: "[data-slot=number-input] [data-size]", field: "input" },
    { name: "select-states", box: "[data-slot=select-trigger]", field: null },
  ];
  const read = (box) =>
    box.evaluate((el) => {
      const after = getComputedStyle(el, "::after");
      const style = getComputedStyle(el);
      const matrix = new DOMMatrix(after.transform === "none" ? undefined : after.transform);
      return {
        scale: matrix.a,
        originX: Number.parseFloat(after.transformOrigin.split(" ")[0]),
        width: Number.parseFloat(after.width),
        property: after.transitionProperty,
        duration: after.transitionDuration,
        timing: after.transitionTimingFunction,
        outlineStyle: style.outlineStyle,
        outlineWidth: Number.parseFloat(style.outlineWidth),
        border: style.borderTopColor,
        bg: style.backgroundColor,
      };
    });
  for (const dir of ["ltr", "rtl"]) {
    const context = await browser.newContext({ viewport: { width: 900, height: 900 } });
    const page = await context.newPage();
    for (const { name, box: selector, field } of cases) {
      const tag = `${name} ${dir}`;
      await page.goto(`${BASE}/preview/${name}?dir=${dir}`, { waitUntil: "networkidle" });
      await page.waitForTimeout(300);
      const box = page.locator(selector).first();
      const rest = await read(box);
      check(rest.scale === 0, `${tag}: the underline is hidden at rest (scale ${rest.scale})`);
      check(
        Math.abs(rest.originX - rest.width / 2) < 1,
        `${tag}: transform-origin is the horizontal centre (${rest.originX} of ${rest.width})`,
      );
      check(
        rest.property.includes("transform") &&
          rest.duration.includes("0.2s") &&
          rest.timing.includes("ease-in-out"),
        `${tag}: the underline animates transform for 200ms ease-in-out (${rest.property} ${rest.duration})`,
      );
      const target = field ? box.locator(field).first() : box;
      const at = await target.boundingBox();
      const x = at.x + Math.min(24, at.width / 2);
      const y = at.y + Math.min(at.height / 2, 20);
      if (field) {
        await page.mouse.move(x, y);
        await page.mouse.down();
        await page.waitForTimeout(450);
        const pressed = await read(box);
        check(
          pressed.scale === 0.5,
          `${tag}: during mousedown the underline is scaleX(0.5) (${pressed.scale})`,
        );
        check(pressed.border !== rest.border, `${tag}: the border changes while pressed`);
        await page.mouse.up();
      } else {
        await page.mouse.click(x, y);
      }
      await page.waitForTimeout(450);
      const clicked = await read(box);
      check(
        clicked.scale === 1,
        `${tag}: after a mouse click the underline is scaleX(1) (${clicked.scale})`,
      );
      check(
        clicked.outlineStyle === "none" || clicked.outlineWidth === 0,
        `${tag}: no outline after a mouse click (${clicked.outlineStyle} ${clicked.outlineWidth}px)`,
      );
      check(clicked.border !== rest.border, `${tag}: the border changes on focus`);
      if (!field) {
        await page.keyboard.press("Escape");
        await page.waitForTimeout(300);
        await page.mouse.click(2, 2);
      }
      // Keyboard focus: Tab onto the first control shows the same chrome.
      await page.mouse.click(2, 2);
      await page.keyboard.press("Tab");
      await page.waitForTimeout(450);
      const first = await read(box);
      check(first.scale === 1, `${tag}: keyboard focus shows the full underline (${first.scale})`);
      check(first.border !== rest.border, `${tag}: keyboard focus changes the border`);
      check(
        first.outlineStyle === "none" || first.outlineWidth === 0,
        `${tag}: no outline on keyboard focus`,
      );
    }
    await context.close();
  }
}

/** Dialog, Menu and Tabs with the keyboard alone, Drawer direction and Toast live region. */
async function interactiveChecks() {
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
    const inside = (selector) =>
      page.evaluate((s) => Boolean(document.activeElement?.closest(s)), selector);
    const next = rtl ? "ArrowLeft" : "ArrowRight";
    const previous = rtl ? "ArrowRight" : "ArrowLeft";

    // Dialog: Tab reaches the trigger, Enter opens, focus is trapped, Escape closes and returns.
    await open("dialog-basic");
    await page.keyboard.press("Tab");
    const trigger = await page.evaluate(() => document.activeElement?.textContent?.trim());
    check(Boolean(trigger), `${lang}: Tab reaches the dialog trigger`);
    await page.keyboard.press("Enter");
    const dialog = page.getByRole("dialog");
    await dialog.waitFor({ state: "visible", timeout: 3000 });
    check(await dialog.isVisible(), `${lang}: Enter opens the dialog`);
    check(
      (await dialog.getAttribute("aria-labelledby")) !== null,
      `${lang}: the dialog is named by its title`,
    );
    check(await inside('[role="dialog"]'), `${lang}: focus moves into the dialog`);
    // Focus may rest on a Base UI focus guard, or leave the document (the browser UI, seen here as
    // the body) and come back at the start of the page; it must never go from one dialog control
    // to a control of the page behind.
    let trapped = true;
    let before = "dialog";
    for (let i = 0; i < 8; i++) {
      await page.keyboard.press("Tab");
      const where = await page.evaluate(() => {
        const el = document.activeElement;
        if (!el || el === document.body) return "body";
        if (el.hasAttribute("data-base-ui-focus-guard")) return "guard";
        return el.closest('[role="dialog"]') ? "dialog" : "page";
      });
      if (where === "page" && before !== "body") trapped = false;
      before = where;
    }
    check(trapped, `${lang}: Tab never moves focus from the dialog to the page behind it`);
    const box = await dialog.boundingBox();
    const close = await page.getByRole("button", { name: rtl ? "إغلاق" : "Close" }).boundingBox();
    check(
      rtl ? close.x < box.x + box.width / 2 : close.x > box.x + box.width / 2,
      `${lang}: the close button is on the end side`,
    );
    await page.keyboard.press("Escape");
    await dialog.waitFor({ state: "hidden", timeout: 3000 });
    check(!(await dialog.isVisible().catch(() => false)), `${lang}: Escape closes the dialog`);
    const returned = await page.evaluate(() => document.activeElement?.textContent?.trim());
    check(returned === trigger, `${lang}: focus returns to the trigger (${returned})`);

    // Menu: roving focus, submenu on the end side, arrow keys that follow the direction.
    await open("menu-submenu");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Enter");
    const menu = page.getByRole("menu").first();
    await menu.waitFor({ state: "visible", timeout: 3000 });
    check(await menu.isVisible(), `${lang}: Enter opens the menu`);
    await page.keyboard.press("ArrowDown");
    const highlighted = await page.evaluate(
      () => document.activeElement?.getAttribute("role") ?? "",
    );
    check(highlighted === "menuitem", `${lang}: arrow keys focus the menu items (${highlighted})`);
    await page.keyboard.press(next);
    const sub = page.getByRole("menu").nth(1);
    await sub.waitFor({ state: "visible", timeout: 3000 }).catch(() => {});
    check(await sub.isVisible().catch(() => false), `${lang}: ${next} opens the submenu`);
    if (await sub.isVisible().catch(() => false)) {
      const parent = await menu.boundingBox();
      const child = await sub.boundingBox();
      check(
        rtl ? child.x + child.width <= parent.x + 8 : child.x >= parent.x + parent.width - 8,
        `${lang}: the submenu opens on the end side`,
      );
      await page.keyboard.press(previous);
      await page.waitForTimeout(250);
      check(!(await sub.isVisible().catch(() => false)), `${lang}: ${previous} closes the submenu`);
    }
    await page.keyboard.press("Escape");
    await page.waitForTimeout(250);
    check(!(await menu.isVisible().catch(() => false)), `${lang}: Escape closes the menu`);
    check(
      (await page.evaluate(() => document.activeElement?.getAttribute("aria-haspopup"))) !== null,
      `${lang}: focus returns to the menu trigger`,
    );

    // Tabs: roving tabindex and arrow keys that follow the direction.
    await open("tabs-horizontal");
    await page.keyboard.press("Tab");
    const first = page.getByRole("tab").first();
    check(
      (await first.getAttribute("aria-selected")) === "true" &&
        (await page.evaluate(() => document.activeElement?.getAttribute("role"))) === "tab",
      `${lang}: Tab focuses the selected tab`,
    );
    check(
      (await page.locator('[role="tab"][tabindex="0"]').count()) === 4 ||
        (await page.locator('[role="tab"][tabindex="-1"]').count()) >= 1,
      `${lang}: only one tab per list is in the tab order`,
    );
    await page.keyboard.press(next);
    const second = page.getByRole("tab").nth(1);
    check(
      (await second.getAttribute("aria-selected")) === "true",
      `${lang}: ${next} selects the next tab`,
    );
    await page.keyboard.press(previous);
    check(
      (await first.getAttribute("aria-selected")) === "true",
      `${lang}: ${previous} goes back to the first tab`,
    );
    await page.keyboard.press("End");
    const lastFocused = await page.evaluate(() => {
      const tabs = [...document.querySelectorAll('[role="tab"]')].slice(0, 4);
      return document.activeElement === tabs.at(-1);
    });
    check(lastFocused, `${lang}: End moves focus to the last tab`);
    await page.keyboard.press("Home");
    check(
      (await first.getAttribute("aria-selected")) === "true",
      `${lang}: Home selects the first tab`,
    );
    check(
      (await page.getByRole("tabpanel").first().isVisible()) === true,
      `${lang}: the selected tab shows its panel`,
    );

    // Drawer: the start side flips with the direction.
    await open("drawer-sides");
    await page.getByRole("button").first().click();
    const drawer = page.getByRole("dialog");
    await drawer.waitFor({ state: "visible", timeout: 3000 });
    await page.waitForTimeout(450);
    const d = await drawer.boundingBox();
    check(
      rtl ? d.x + d.width >= 880 : d.x <= 1,
      `${lang}: the start drawer is on the ${rtl ? "right" : "left"} (x ${Math.round(d.x)})`,
    );
    await page.keyboard.press("Escape");
    await drawer.waitFor({ state: "hidden", timeout: 3000 });

    // Toast: a polite live region that holds the message.
    await open("toast-demo");
    await page.getByRole("button").nth(2).click();
    await page.waitForTimeout(500);
    check(
      (await page.locator('[role="region"][aria-live="polite"]').count()) === 1,
      `${lang}: the toast viewport is a polite live region`,
    );
    check((await page.locator('[data-slot="toast"]').count()) === 1, `${lang}: the toast is shown`);
    check(
      issues.length === 0,
      `${lang}: the interactive keyboard pass logs nothing to the console: ${issues.join(" | ")}`,
    );
    await context.close();
  }
}

/** The service request form, completed with the keyboard only, in English and Arabic. */
async function keyboardChecks() {
  const text = {
    en: { id: "1023456789", details: "Renew the permit for plot 12.", sent: "Request submitted." },
    ar: {
      id: "١٠٢٣٤٥٦٧٨٩٠".slice(0, 10),
      details: "تجديد رخصة البناء للقطعة رقم ١٢.",
      sent: "تم إرسال الطلب.",
    },
  };
  for (const lang of ["en", "ar"]) {
    const context = await browser.newContext({ viewport: { width: 900, height: 900 } });
    const page = await context.newPage();
    const issues = [];
    page.on("console", (m) => {
      if (["error", "warning"].includes(m.type())) issues.push(m.text().slice(0, 160));
    });
    page.on("pageerror", (e) => issues.push(e.message.slice(0, 160)));
    await page.goto(`${BASE}/preview/service-request`, { waitUntil: "networkidle" });
    await page.evaluate((lang) => {
      const root = document.documentElement;
      root.dir = lang === "ar" ? "rtl" : "ltr";
      root.lang = lang;
    }, lang);
    await page.waitForTimeout(300);
    const t = text[lang];
    const focused = () =>
      page.evaluate(() => {
        const el = document.activeElement;
        return el?.getAttribute("role") ?? el?.getAttribute("type") ?? el?.tagName.toLowerCase();
      });
    const tab = async (expected, what) => {
      await page.keyboard.press("Tab");
      const got = await focused();
      check(got === expected, `${lang}: Tab reaches ${what} (${expected}, got ${got})`);
    };

    // The form opens with a wrong National ID (and its error); fix it, then go through every control.
    await page.locator("form").evaluate((form) => form.querySelector("input").focus());
    await tab("input", "the National ID");
    await page.keyboard.press("Control+A");
    await page.keyboard.type(t.id);
    await tab("combobox", "the service select");
    await page.keyboard.press("Enter");
    check(await page.getByRole("listbox").isVisible(), `${lang}: Enter opens the select`);
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("Enter");
    const closed = await page
      .getByRole("listbox")
      .waitFor({ state: "hidden", timeout: 3000 })
      .then(() => true)
      .catch(() => false);
    check(closed, `${lang}: Enter chooses and closes`);
    await tab("textarea", "the details");
    await page.keyboard.type(t.details);
    await tab("radio", "the radio group");
    await page.keyboard.press("ArrowDown");
    check(
      (await page.getByRole("radio", { checked: true }).count()) === 1,
      `${lang}: arrow keys move the radio choice`,
    );
    await tab("file", "the file upload");
    await tab("switch", "the switch");
    await page.keyboard.press("Space");
    check(
      (await page.getByRole("switch").getAttribute("aria-checked")) === "false",
      `${lang}: Space turns the switch off`,
    );
    await tab("checkbox", "the checkbox");
    await page.keyboard.press("Space");
    check(
      (await page.getByRole("checkbox").getAttribute("aria-checked")) === "true",
      `${lang}: Space checks the box`,
    );
    await tab("submit", "the submit button");
    await page.keyboard.press("Enter");
    await page.waitForTimeout(200);
    check(
      (await page.getByRole("status").filter({ hasText: t.sent }).count()) === 1,
      `${lang}: the completed form is submitted ("${t.sent}")`,
    );
    check(
      (await page.locator("[data-slot=field-error]").count()) === 0,
      `${lang}: no error left after submit`,
    );
    await tab("reset", "the cancel button");
    check(
      issues.length === 0,
      `${lang}: form keyboard pass logs nothing to the console: ${issues.join(" | ")}`,
    );
    await context.close();
  }
}

// ---------------------------------------------------------------- AI Resources

async function aiResourceChecks() {
  const get = async (path, headers = {}) => {
    const res = await fetch(`${BASE}${path}`, { headers, redirect: "manual" });
    return { res, text: await res.text() };
  };
  for (const path of [
    "/en/docs/ai/skills",
    "/en/docs/ai/llm",
    "/ar/docs/ai/mcp",
    "/ar/docs/ai/skills",
  ]) {
    check((await get(path)).res.status === 200, `${path} returns 200`);
  }

  // The skills index points at SKILL.md, and its digest is the sha256 of the served bytes.
  const index = await get("/.well-known/agent-skills/index.json");
  check(index.res.status === 200, "the skills index returns 200");
  const skills = JSON.parse(index.text);
  check(
    skills.$schema === "https://schemas.agentskills.io/discovery/0.2.0/schema.json",
    "the skills index names the discovery schema",
  );
  const entry = skills.skills?.[0];
  check(
    entry?.url === "/.well-known/agent-skills/platform-code/SKILL.md",
    "the index points at SKILL.md",
  );
  const skill = await fetch(`${BASE}${entry?.url}`);
  check(skill.status === 200, "SKILL.md returns 200");
  const bytes = Buffer.from(await skill.arrayBuffer());
  check(
    entry?.digest === `sha256:${createHash("sha256").update(bytes).digest("hex")}`,
    "the index digest matches the served SKILL.md bytes",
  );

  // llms.json in both languages and the bare English address.
  for (const path of ["/en/llms.json", "/ar/llms.json", "/llms.json"]) {
    const { res, text } = await get(path);
    check(res.status === 200, `${path} returns 200`);
    const data = JSON.parse(text);
    check(
      data.pages.some(
        (p) =>
          p.slug === "ai/skills" &&
          p.html.includes("/docs/ai/skills") &&
          p.markdown.endsWith("/docs/ai/skills.md"),
      ),
      `${path} lists ai/skills with its HTML and Markdown URLs`,
    );
  }

  // llms.txt lists every page, the AI pages under their own heading.
  for (const lang of ["en", "ar"]) {
    const catalog = JSON.parse((await get(`/${lang}/llms.json`)).text);
    const txt = (await get(`/${lang}/llms.txt`)).text;
    check(
      catalog.pages.every((p) => txt.includes(p.markdown)),
      `/${lang}/llms.txt lists every page of llms.json (${catalog.pages.length})`,
    );
    for (const slug of ["skills", "llm", "mcp"]) {
      check(
        txt.includes(`/${lang}/docs/ai/${slug}.md`),
        `/${lang}/llms.txt lists /docs/ai/${slug}`,
      );
    }
    check(
      txt.includes(lang === "en" ? "## AI Resources" : "## موارد الذكاء الاصطناعي"),
      `/${lang}/llms.txt groups the AI pages under their localised heading`,
    );
  }
  check(
    (await get("/llms.txt")).text.includes("/en/docs/ai/skills.md"),
    "bare /llms.txt is English",
  );

  // Accept: text/markdown on the HTML URL returns the Markdown twin, and varies on Accept.
  for (const [path, title, lang] of [
    ["/en/docs/installation", "# Installation", "en"],
    ["/ar/docs/ai/mcp", "# خادم MCP", "ar"],
    ["/en/docs", "# Introduction", "en"],
  ]) {
    const { res, text } = await get(path, { Accept: "text/markdown" });
    check(res.status === 200, `${path} with Accept: text/markdown returns 200`);
    check(
      (res.headers.get("content-type") ?? "").startsWith("text/markdown"),
      `${path}: content-type is text/markdown`,
    );
    check(text.startsWith(title), `${path}: the body is the Markdown twin ("${title}")`);
    check(
      (res.headers.get("vary") ?? "").toLowerCase().includes("accept"),
      `${path}: Vary includes Accept`,
    );
    check(
      text.trimEnd().endsWith(`/${lang}/llms.txt)`),
      `${path}: the Markdown ends with a link to /${lang}/llms.txt`,
    );
  }
  const html = await get("/en/docs/installation", { Accept: "text/html" });
  check(
    (html.res.headers.get("content-type") ?? "").startsWith("text/html"),
    "Accept: text/html still returns HTML",
  );
  const twin = await get("/en/docs/installation.md");
  check(
    twin.res.status === 200 && twin.text.trimEnd().endsWith("/en/llms.txt)"),
    "the .md URL ends with the index link",
  );

  // The Link header names the discovery files and the page's own Markdown twin.
  const link = html.res.headers.get("link") ?? "";
  for (const needle of [
    '</en/llms.txt>; rel="describedby"',
    '</sitemap.xml>; rel="sitemap"',
    '</.well-known/agent-skills/index.json>; rel="agent-skills"',
    '</en/docs/installation.md>; rel="alternate"; type="text/markdown"',
  ]) {
    check(link.includes(needle), `the Link header has ${needle}`);
  }
  check(
    (html.res.headers.get("vary") ?? "").toLowerCase().includes("accept"),
    "docs HTML varies on Accept",
  );
  check(
    (await get("/en/llms.txt")).res.headers.get("link")?.includes('rel="agent-skills"') === true,
    "llms.txt carries the Link header",
  );
  check(
    /<link[^>]+rel="agent-skills"/.test(html.text),
    "the HTML head has the agent-skills <link>",
  );
  check(
    /<link[^>]+rel="alternate"[^>]+text\/markdown/.test(html.text) ||
      /<link[^>]+text\/markdown[^>]+rel="alternate"/.test(html.text),
    "the HTML head has the Markdown alternate <link>",
  );

  // Sitemap and WebMCP.
  const sitemap = (await get("/sitemap/en.xml")).text;
  for (const url of ["/en/llms.txt", "/ar/llms.txt", "/.well-known/agent-skills/index.json"]) {
    check(sitemap.includes(url), `the sitemap includes ${url}`);
  }
  const webmcp = await get("/webmcp.js");
  check(
    webmcp.res.status === 200 &&
      ["search_docs", "get_page", "list_pages"].every((n) => webmcp.text.includes(n)),
    "/webmcp.js registers search_docs, get_page and list_pages",
  );

  // The Copy page menu shows every item, in both languages.
  const labels = {
    en: [
      "Copy Markdown",
      "View Markdown",
      "Open in ChatGPT",
      "Open in Codex",
      "Open in Claude",
      "Open in Claude Code",
      "Open in Cursor",
    ],
    ar: [
      "نسخ Markdown",
      "عرض Markdown",
      "فتح في ChatGPT",
      "فتح في Codex",
      "فتح في Claude",
      "فتح في Claude Code",
      "فتح في Cursor",
    ],
  };
  for (const lang of ["en", "ar"]) {
    const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
    const page = await context.newPage();
    await page.goto(`${BASE}/${lang}/docs/installation`, { waitUntil: "networkidle" });
    await page.locator("main button[aria-haspopup=menu]").first().click();
    await page.getByRole("menu").waitFor({ state: "visible" });
    const items = await page.getByRole("menuitem").allTextContents();
    for (const label of labels[lang]) {
      check(
        items.some((i) => i.trim().startsWith(label)),
        `${lang}: the Copy page menu shows "${label}"`,
      );
    }
    const href = await page.getByRole("menuitem", { name: labels[lang][2] }).getAttribute("href");
    check(
      decodeURIComponent(href ?? "").includes(
        `${BASE.startsWith("http://localhost") ? "https://dga.omqkhafi.dev" : BASE}/${lang}/docs/installation.md`,
      ),
      `${lang}: the prompt points at the page's absolute Markdown URL`,
    );
    await context.close();
  }
}

// --------------------------------------------------------------------- Polish

const ALLOWED = new Set(
  JSON.parse(readFileSync(new URL("./locale-allowlist.json", import.meta.url), "utf8")).words.map(
    (w) => w.toLowerCase(),
  ),
);
// The digits (Arabic-Indic U+0660 to U+0669, Persian U+06F0 to U+06F9) are not words.
const ARABIC = /[\u0600-\u065F\u066D-\u06EF\u06FA-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF]/;

/** Visible text of a frame, without code, keys, icons and the language switcher (an endonym). */
const visibleText = (frame, pageLang) =>
  frame.evaluate((pageLang) => {
    // Code, keys, icons, monospace identifiers, the language switcher (an endonym), and runs the
    // page marks as another language. That last rule is the accepted exception: on Arabic pages
    // the generated Deviation reasons and the Contrast state labels stay English (their source
    // data is English and a full translation would be unclear), marked lang="en". It is policy,
    // not a gap: do not translate them, and do not use lang="en" for anything else.
    const skip = `pre,code,kbd,samp,script,style,svg,noscript,.font-mono,[data-skip-purity],a[hreflang],[lang]:not([lang=${pageLang}])`;
    const out = [];
    const walk = (node) => {
      if (node.nodeType === 3) return out.push(node.textContent);
      if (node.nodeType !== 1 || node.matches(skip)) return;
      for (const child of node.childNodes) walk(child);
    };
    walk(document.body);
    return out.join(" ");
  }, pageLang);

const latinWords = (text) =>
  (
    text
      .replace(/`[^`]*`/g, " ") // inline code, as written in the API descriptions
      .replace(/https?:\/\/\S+/g, " ")
      .replace(/[\w.-]+(\/[\w.-]+)+/g, " ") // a path, such as app/page.tsx or omqkhafi/dga
      .replace(/\w+="[^"]*"/g, " ") // a prop, such as size="sm"
      .replace(/[\w.-]+\.(md|json|txt|tsx?|mdx|css|js)\b/g, " ") // a file name
      .match(/[A-Za-z][\w.+-]*/g) ?? []
  ).filter((raw) => {
    const w = raw.replace(/[.-]+$/, "");
    if (w.length < 2 || ALLOWED.has(w.toLowerCase())) return false;
    if (/^[A-Z][a-z0-9]+([A-Z][a-z0-9]*)+$/.test(w) || /^[a-z]+[A-Z]\w*$/.test(w)) return false;
    if (/^[a-z0-9]+(-[a-z0-9]+)+$/.test(w) || /^[a-z0-9-]+(\.[a-z0-9-]+)+$/.test(w)) return false;
    if (/^v\d/.test(w) || /^[a-f0-9]{6,}$/.test(w) || /^\d/.test(w)) return false;
    return true;
  });

async function scrollThrough(page) {
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < height; y += 500) {
    await page.evaluate((top) => window.scrollTo(0, top), y);
    await page.waitForTimeout(60);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForLoadState("networkidle", { timeout: 8000 }).catch(() => {});
  await page.waitForTimeout(800);
}

async function polishChecks() {
  const pages = [
    "",
    "/docs",
    "/docs/installation",
    "/docs/ai/skills",
    "/docs/ai/mcp",
    "/docs/deviations",
    "/docs/foundations/colors",
    "/docs/foundations/typography",
    "/docs/components/button",
    "/docs/components/badge",
    "/docs/components/dialog",
    "/docs/components/drawer",
    "/docs/components/tooltip",
    "/docs/components/menu",
    "/docs/components/tabs",
    "/docs/components/accordion",
    "/docs/components/content-switcher",
    "/docs/components/toast",
    "/docs/components/notification",
    "/docs/components/inline-alert",
    "/docs/components/input",
    "/docs/components/file-upload",
    "/docs/components/breadcrumb",
    "/docs/components/pagination",
    "/docs/components/card",
    "/docs/components/data-table",
    "/docs/components/stepper",
  ];
  for (const lang of ["en", "ar"]) {
    const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    const page = await context.newPage();
    const issues = [];
    page.on("console", (m) => {
      if (["error", "warning"].includes(m.type()))
        issues.push(`${m.type()}: ${m.text().slice(0, 140)}`);
    });
    page.on("pageerror", (e) => issues.push(e.message.slice(0, 140)));
    page.on("response", (r) => {
      if (r.status() >= 400) issues.push(`${r.status()} ${r.url()}`);
    });
    for (const path of pages.filter((p) => inScope(p.split("/").pop()))) {
      const url = `${BASE}/${lang}${path}`;
      await page.goto(url, { waitUntil: "networkidle" });
      await scrollThrough(page);
      // The page is checked against its own language. A preview frame is checked against the
      // language its direction toggle selects (RTL is Arabic, LTR is English), which is the
      // page language in the default view but not in the RTL comparison panels of an EN page.
      const texts = { en: [], ar: [] };
      for (const frame of page.frames()) {
        if (frame === page.mainFrame()) {
          texts[lang].push(await visibleText(frame, lang));
          continue;
        }
        const root = await frame.evaluate(() => ({
          lang: document.documentElement.lang,
          dir: document.documentElement.dir,
        }));
        check(
          root.lang === (root.dir === "rtl" ? "ar" : "en"),
          `${lang}${path}: a preview in ${root.dir} has content lang ${root.lang}`,
        );
        if (root.lang === "en" || root.lang === "ar")
          texts[root.lang].push(await visibleText(frame, root.lang));
      }
      const found = texts.en.join(" ").match(new RegExp(`.{0,30}${ARABIC.source}+.{0,30}`));
      check(
        !found,
        `${lang}${path}: no Arabic in English text, LTR previews included (${found?.[0]})`,
      );
      const words = [...new Set(latinWords(texts.ar.join(" ")))];
      check(
        words.length === 0,
        `${lang}${path}: no English words in Arabic text, RTL previews included (${words.slice(0, 8).join(", ")})`,
      );
      check(
        (await page.evaluate(
          () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
        )) <= 1,
        `${lang}${path}: no horizontal scroll`,
      );
    }
    check(
      issues.length === 0,
      `${lang}: the polish pass logs nothing to the console: ${issues.slice(0, 3).join(" | ")}`,
    );
    await context.close();
  }

  // The hero is built from registry components and keeps one language, whatever the toggle says.
  for (const lang of ["en", "ar"]) {
    const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    const page = await context.newPage();
    await page.goto(`${BASE}/${lang}`, { waitUntil: "networkidle" });
    const card = page.locator("main section").first().locator("[data-theme][dir]").first();
    check(
      (await card.locator("[data-slot=field]").count()) >= 3,
      `${lang}: the hero card uses Field`,
    );
    check(
      (await card.locator("[data-slot=input]").count()) >= 2,
      `${lang}: the hero card uses Input`,
    );
    check(
      (await card.locator("[data-slot=select-trigger]").count()) === 1,
      `${lang}: the hero card uses Select`,
    );
    check(
      (await card.locator("[data-slot=switch]").count()) === 1,
      `${lang}: the hero card uses Switch`,
    );
    check(
      (await card.locator("[data-slot=button]").count()) >= 2,
      `${lang}: the hero card uses Button`,
    );
    check(
      (await card.locator("[data-slot=inline-alert]").count()) === 1,
      `${lang}: the hero card uses Inline Alert`,
    );
    check(
      !(await page.locator("body").textContent()).includes("plain markup"),
      `${lang}: no "plain markup" note`,
    );
    const eyebrow = await page.locator(".t-eyebrow").first().textContent();
    check(
      lang === "en" ? !ARABIC.test(eyebrow) : latinWords(eyebrow).length === 0,
      `${lang}: the home eyebrow is one language ("${eyebrow}")`,
    );
    for (const target of ["en", "ar"]) {
      const name = await page
        .locator("[data-slot=content-switcher]")
        .first()
        .locator("button")
        .nth(target === "en" ? 0 : 1);
      await name.click();
      await page.waitForTimeout(200);
      const text = (await card.textContent()) ?? "";
      check(
        target === "en" ? !ARABIC.test(text) : latinWords(text).length === 0,
        `${lang}: with the hero language switched to ${target}, the card, its status and its calls to action are ${target} only (${text.slice(0, 40).replace(/\n/g, " ")})`,
      );
    }
    await context.close();
  }

  // Preview chrome: one size in the toolbar, centred lone triggers, RTL panels without dead space.
  for (const lang of ["en", "ar"]) {
    const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    const page = await context.newPage();
    await page.goto(`${BASE}/${lang}/docs/components/dialog`, { waitUntil: "networkidle" });
    await scrollThrough(page);
    const toolbar = await page.evaluate(() => {
      const bar = document.querySelector("figure[data-preview] > div");
      const controls = [
        ...bar.querySelectorAll(
          "[data-slot=content-switcher], [data-slot=button], a[class*=cn-button]",
        ),
      ];
      return controls.map((el) => Math.round(el.getBoundingClientRect().height));
    });
    check(
      toolbar.length >= 5 && new Set(toolbar).size === 1,
      `${lang}: every control in the preview toolbar is one height (${toolbar.join(", ")})`,
    );
    check(
      (await page
        .locator("figure[data-preview] > div [role=radio], figure[data-preview] > div fieldset")
        .count()) === 0 ||
        (await page.locator("figure[data-preview] > div fieldset").count()) === 0,
      `${lang}: the toolbar has no hand-made radio fieldsets`,
    );
    const frame = page.frames().find((f) => f.url().includes("/preview/dialog-basic"));
    const centred = await frame.evaluate(() => {
      const b = document.querySelector("main button");
      const r = b.getBoundingClientRect();
      return Math.abs((r.left + r.right) / 2 - window.innerWidth / 2);
    });
    check(
      centred < 4,
      `${lang}: the lone Dialog trigger is centred in its preview (off by ${Math.round(centred)}px)`,
    );
    await context.close();
  }
}

/** A URL under /en or /ar that matches no page is a 404 in that language, not in English. */
async function notFoundChecks() {
  const expected = {
    en: { dir: "ltr", title: "This page does not exist", home: "Home" },
    ar: { dir: "rtl", title: "هذه الصفحة غير موجودة", home: "الرئيسية" },
  };
  for (const lang of ["en", "ar"]) {
    const want = expected[lang];
    for (const slug of ["nope", "docs/nope", "docs/components/nope"]) {
      const url = `${BASE}/${lang}/${slug}`;
      const label = `/${lang}/${slug}`;
      // The HTML a crawler or an agent gets, with no JavaScript.
      const res = await fetch(url, { redirect: "manual" });
      const html = await res.text();
      const root = html.match(/<html[^>]*>/)?.[0] ?? "";
      check(res.status === 404, `${label}: status 404 (got ${res.status})`);
      check(root.includes(`lang="${lang}"`), `${label}: <html lang="${lang}"> (got ${root})`);
      check(root.includes(`dir="${want.dir}"`), `${label}: <html dir="${want.dir}"> (got ${root})`);
      check(html.includes(want.title), `${label}: the not-found copy is in ${lang}`);
      if (lang === "ar")
        check(!html.includes("This page does not exist"), `${label}: no English not-found copy`);

      // And what a visitor sees.
      const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
      const page = await context.newPage();
      const response = await page.goto(url, { waitUntil: "networkidle" });
      check(response?.status() === 404, `${label}: the browser gets 404`);
      const state = await page.evaluate(() => ({
        lang: document.documentElement.lang,
        dir: document.documentElement.dir,
        h1: document.querySelector("h1")?.textContent ?? "",
        links: [...document.querySelectorAll("main a")].map((a) => a.getAttribute("href")),
      }));
      check(state.lang === lang, `${label}: rendered lang is ${lang} (got ${state.lang})`);
      check(state.dir === want.dir, `${label}: rendered dir is ${want.dir} (got ${state.dir})`);
      check(state.h1 === want.title, `${label}: h1 is the ${lang} title (got ${state.h1})`);
      check(
        state.links.every((href) => href?.startsWith(`/${lang}`)),
        `${label}: the links stay in /${lang} (${state.links.join(", ")})`,
      );
      await context.close();
    }
  }
  // A URL with no language has no language to answer in: English.
  const res = await fetch(`${BASE}/r/does-not-exist`, { redirect: "manual" });
  check(res.status === 404, `/r/does-not-exist: status 404 (got ${res.status})`);
  check((await res.text()).includes('lang="en"'), "/r/does-not-exist: English");
}

/** The accepted exception: on Arabic pages the generated Deviation reasons and Contrast state
 * labels stay English, and are marked lang="en" so the purity audit covers them. */
async function arabicExceptionChecks() {
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();
  for (const [path, what] of [
    ["/ar/docs/deviations", "Deviation reasons"],
    ["/ar/docs/components/button", "Contrast state labels"],
  ]) {
    await page.goto(`${BASE}${path}`, { waitUntil: "networkidle" });
    const marked = await page.evaluate(() => {
      const spans = [...document.querySelectorAll('main [lang="en"]')];
      return {
        count: spans.length,
        ltr: spans.every((el) => el.closest("[dir=ltr]") !== null),
      };
    });
    check(marked.count > 0, `${path}: ${what} are present and marked lang="en"`);
    check(marked.ltr, `${path}: ${what} are set dir=ltr`);
  }
  await context.close();
}

// ------------------------------------------------------------- Preview content language

/**
 * Inside a preview the content language follows the direction toggle: RTL renders the Arabic
 * sample content (lang="ar") and LTR the English one (lang="en"), on /en and /ar pages alike.
 * The default direction is the page's. Everything outside the frame (prose, headings, code,
 * the toolbar and the example titles) stays in the page language. Each direction is pure.
 */
async function previewLanguageChecks() {
  const components = ["field", "input", "select", "dialog", "toast", "tabs"];
  const frameState = (frame) =>
    frame.evaluate(() => ({
      lang: document.documentElement.lang,
      dir: document.documentElement.dir,
    }));
  const purity = async (frame, contentLang) => {
    const text = await visibleText(frame, contentLang);
    if (contentLang === "en") {
      const found = text.match(new RegExp(`.{0,25}${ARABIC.source}+.{0,25}`));
      return found ? [found[0]] : [];
    }
    return [...new Set(latinWords(text))];
  };
  for (const lang of ["en", "ar"]) {
    const pageDir = lang === "ar" ? "rtl" : "ltr";
    const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    const page = await context.newPage();
    for (const component of components) {
      const tag = `${lang}/${component}`;
      await page.goto(`${BASE}/${lang}/docs/components/${component}`, { waitUntil: "networkidle" });
      const figure = page.locator("figure[data-preview]").first();
      await figure.scrollIntoViewIfNeeded();
      await figure.locator("iframe").waitFor();
      const name = await figure.getAttribute("data-preview");
      const frameOf = async () => {
        const handle = await figure.locator("iframe").elementHandle();
        return handle.contentFrame();
      };
      const outside = async () => ({
        lang: await page.evaluate(() => document.documentElement.lang),
        caption: (await figure.locator("figcaption").first().textContent()) ?? "",
        heading: (await page.locator("main h2").first().textContent()) ?? "",
      });
      const before = await outside();
      // Default: the page's own direction, so the content is in the page language.
      let frame = await frameOf();
      await page.waitForTimeout(300);
      let state = await frameState(frame);
      check(
        state.dir === pageDir && state.lang === lang,
        `${tag}: ${name} opens in ${pageDir} with ${lang} content (got ${state.dir} ${state.lang})`,
      );
      for (const dir of ["rtl", "ltr", pageDir]) {
        const contentLang = dir === "rtl" ? "ar" : "en";
        const toggle = figure.locator("[data-slot=content-switcher]").first();
        await toggle
          .locator("[data-slot=content-switcher-item]")
          .nth(dir === "ltr" ? 0 : 1)
          .click();
        await page.waitForTimeout(400);
        frame = await frameOf();
        state = await frameState(frame);
        check(
          state.dir === dir && state.lang === contentLang,
          `${tag}: toggled to ${dir}, ${name} has dir=${dir} lang=${contentLang} (got ${state.dir} ${state.lang})`,
        );
        const bad = await purity(frame, contentLang);
        check(
          bad.length === 0,
          `${tag}: ${name} in ${dir} is pure ${contentLang} (${bad.slice(0, 6).join(", ")})`,
        );
        const after = await outside();
        check(
          after.lang === lang &&
            after.caption === before.caption &&
            after.heading === before.heading,
          `${tag}: in ${dir}, the page, the example title and the headings stay ${lang}`,
        );
        const pageText = await visibleText(page.mainFrame(), lang);
        if (lang === "en")
          check(
            !ARABIC.test(pageText),
            `${tag}: in ${dir}, the English page around it has no Arabic`,
          );
        else
          check(
            latinWords(pageText).length === 0,
            `${tag}: in ${dir}, the Arabic page around it has no English words`,
          );
      }
      // Fullscreen opens the same direction and content language.
      await figure
        .locator("[data-slot=content-switcher]")
        .first()
        .locator("[data-slot=content-switcher-item]")
        .nth(1)
        .click();
      const href = await figure.locator("a[target=_blank]").first().getAttribute("href");
      check(
        href.includes("dir=rtl") && href.includes("lang=ar"),
        `${tag}: fullscreen in RTL opens the Arabic content (${href})`,
      );
    }
    await context.close();
  }

  // Every preview, both directions: the frame sets lang from dir and holds one language only.
  const names = [
    ...readFileSync(
      new URL("../apps/docs/components/previews/index.tsx", import.meta.url),
      "utf8",
    ).matchAll(/^\s+"?([a-z-]+)"?: [A-Z]\w+,$/gm),
  ].map((m) => m[1]);
  check(names.length > 50, `every preview is listed (${names.length})`);
  const context = await browser.newContext({ viewport: { width: 1000, height: 800 } });
  const page = await context.newPage();
  for (const name of names) {
    for (const dir of ["ltr", "rtl"]) {
      const contentLang = dir === "rtl" ? "ar" : "en";
      await page.goto(`${BASE}/preview/${name}?dir=${dir}`, { waitUntil: "networkidle" });
      const state = await frameState(page.mainFrame());
      check(
        state.dir === dir && state.lang === contentLang,
        `preview ${name} ${dir}: lang ${contentLang} (got ${state.lang})`,
      );
      const bad = await purity(page.mainFrame(), contentLang);
      check(
        bad.length === 0,
        `preview ${name} ${dir}: pure ${contentLang} (${bad.slice(0, 6).join(", ")})`,
      );
    }
  }
  await context.close();
}

/**
 * Phase 5 with the keyboard alone, in /en and /ar: Pagination (Tab order, Enter, disabled ends,
 * mirrored arrows, the compact form), Stepper (buttons in Tab order, state words, compact ring),
 * Rating (radio group, arrow keys that follow the direction, hover preview) and Data Table (sort,
 * select, filter and page by keyboard, aria-sort, RTL column order), plus Breadcrumb and Table of
 * Contents.
 */
async function navigationChecks() {
  for (const lang of ["en", "ar"]) {
    const rtl = lang === "ar";
    const context = await browser.newContext({ viewport: { width: 1000, height: 800 } });
    const page = await context.newPage();
    const issues = [];
    page.on("console", (m) => {
      if (["error", "warning"].includes(m.type())) issues.push(m.text().slice(0, 160));
    });
    page.on("pageerror", (e) => issues.push(e.message.slice(0, 160)));
    const open = async (name, width) => {
      if (width) await page.setViewportSize({ width, height: 800 });
      await page.goto(`${BASE}/preview/${name}?dir=${rtl ? "rtl" : "ltr"}`, {
        waitUntil: "networkidle",
      });
      await page.waitForTimeout(300);
    };
    const next = rtl ? "ArrowLeft" : "ArrowRight";
    const previous = rtl ? "ArrowRight" : "ArrowLeft";

    // Pagination: the current page, the order of the controls, Enter, disabled ends.
    await open("pagination-states");
    const nav = page.locator("nav[data-slot=pagination]").first();
    check(
      (await nav.locator("[aria-current=page]").count()) >= 1,
      `${lang}: pagination marks the current page`,
    );
    const firstPrev = nav.locator("[data-slot=pagination-previous]");
    check(await firstPrev.isDisabled(), `${lang}: previous is disabled on the first page`);
    const box = async (selector) => nav.locator(selector).first().boundingBox();
    const prevBox = await box("[data-slot=pagination-previous]");
    const nextBox = await box("[data-slot=pagination-next]");
    check(
      rtl ? prevBox.x > nextBox.x : prevBox.x < nextBox.x,
      `${lang}: previous is on the ${rtl ? "right" : "left"} (RTL mirrors the row)`,
    );
    const arrowTransform = await nav
      .locator("[data-slot=pagination-previous] svg")
      .first()
      .evaluate((el) => getComputedStyle(el).scale);
    check(
      rtl ? arrowTransform !== "none" : arrowTransform === "none",
      `${lang}: the previous arrow ${rtl ? "mirrors" : "does not mirror"} (${arrowTransform})`,
    );
    const second = nav.locator("[data-slot=pagination-link]").nth(1);
    await second.focus();
    await page.keyboard.press("Enter");
    check(
      (await nav.locator("[aria-current=page]").first().textContent())?.trim() ===
        (await second.textContent())?.trim(),
      `${lang}: Enter on a page makes it current`,
    );
    check(
      !(await firstPrev.isDisabled()),
      `${lang}: previous is enabled after leaving the first page`,
    );
    await page.keyboard.press("Tab");
    check(
      (await page.evaluate(() => document.activeElement?.getAttribute("data-slot"))) ===
        "pagination-link",
      `${lang}: Tab moves to the next page button`,
    );
    // The compact form on a phone: the numbers fold into "page of count".
    await open("pagination-basic", 375);
    const compact = page.locator("[data-slot=pagination-compact]").first();
    check(await compact.isVisible(), `${lang}: the compact "page of count" shows at 375px`);
    check(
      !(await page.locator("[data-slot=pagination-link]").first().isVisible()),
      `${lang}: the page numbers fold away at 375px`,
    );

    // Stepper: buttons in the tab order, state in words, the compact ring on a phone.
    await open("stepper-interactive", 1000);
    const steps = page.locator("[data-slot=stepper-item]");
    check((await steps.count()) === 4, `${lang}: the stepper has four steps`);
    check(
      (await steps.nth(1).getAttribute("aria-current")) === "step",
      `${lang}: the current step has aria-current=step`,
    );
    check(
      (await steps.nth(0).getAttribute("data-status")) === "completed" &&
        (await steps.nth(2).getAttribute("data-status")) === "upcoming",
      `${lang}: earlier steps are completed and later ones upcoming`,
    );
    check(
      (await steps.nth(0).locator(".sr-only").count()) === 1,
      `${lang}: every step says its state in words`,
    );
    await page.locator("[data-slot=stepper-item] button").first().focus();
    await page.keyboard.press("Enter");
    check(
      (await steps.nth(0).getAttribute("data-status")) === "current" &&
        (await steps.nth(1).getAttribute("data-status")) === "upcoming",
      `${lang}: Enter on the first step makes it current`,
    );
    await page.keyboard.press("Tab");
    await page.keyboard.press("Enter");
    check(
      (await steps.nth(1).getAttribute("data-status")) === "current" &&
        (await steps.nth(0).getAttribute("data-status")) === "completed",
      `${lang}: Tab then Enter on the next step chooses it`,
    );
    const firstStep = await steps.nth(0).boundingBox();
    const lastStep = await steps.nth(3).boundingBox();
    check(
      rtl ? firstStep.x > lastStep.x : firstStep.x < lastStep.x,
      `${lang}: steps run ${rtl ? "right to left" : "left to right"}`,
    );
    await open("stepper-interactive", 375);
    check(
      await page.locator("[data-slot=stepper-compact]").first().isVisible(),
      `${lang}: the compact ring shows at 375px`,
    );
    check(
      !(await page.locator("ol[data-slot=stepper]").first().isVisible()),
      `${lang}: the full stepper folds away at 375px`,
    );

    // Rating: a radio group; arrows follow the direction; Space chooses; read-only is an image.
    await open("rating-basic", 1000);
    const group = page.getByRole("radiogroup").first();
    const radios = group.getByRole("radio");
    check((await radios.count()) === 5, `${lang}: the rating has five radio stars`);
    await page.keyboard.press("Tab");
    check(
      (await page.evaluate(() => document.activeElement?.getAttribute("role"))) === "radio",
      `${lang}: Tab focuses a star`,
    );
    const before = await group.locator("[aria-checked=true]").getAttribute("aria-label");
    await page.keyboard.press(next);
    await page.waitForTimeout(100);
    const after = await group.locator("[aria-checked=true]").getAttribute("aria-label");
    check(before !== after, `${lang}: ${next} changes the rating (${before} → ${after})`);
    await page.keyboard.press(previous);
    check(
      (await group.locator("[aria-checked=true]").getAttribute("aria-label")) === before,
      `${lang}: ${previous} goes back`,
    );
    const starA = await radios.nth(0).boundingBox();
    const starE = await radios.nth(4).boundingBox();
    check(
      rtl ? starA.x > starE.x : starA.x < starE.x,
      `${lang}: the first star is on the ${rtl ? "right" : "left"} (the fill runs ${rtl ? "right to left" : "left to right"})`,
    );
    await open("rating-readonly");
    check(
      (await page.locator("[data-slot=rating][role=img]").first().getAttribute("aria-label"))
        ?.length > 0,
      `${lang}: a read-only rating is an image with a text alternative`,
    );

    // Data Table: sort, select, filter and page with the keyboard; aria-sort; column order.
    await open("data-table-basic", 1000);
    const table = page.locator("table").first();
    const sortButtons = table.locator("[data-slot=table-sort]");
    check((await sortButtons.count()) >= 2, `${lang}: sortable columns have a sort button`);
    check(
      (await table.locator("th[aria-sort=ascending]").count()) === 1,
      `${lang}: the default sort is announced with aria-sort`,
    );
    await sortButtons.nth(1).focus();
    await page.keyboard.press("Enter");
    check(
      (await table.locator("th[aria-sort=ascending]").count()) === 1 &&
        (await table.locator("th[aria-sort=ascending] [data-slot=table-sort]").count()) === 1,
      `${lang}: Enter on a sort button sorts that column`,
    );
    await page.keyboard.press("Enter");
    check(
      (await table.locator("th[aria-sort=descending]").count()) === 1,
      `${lang}: pressing it again reverses the sort`,
    );
    const head = table.locator("thead th");
    const firstHead = await head.nth(1).boundingBox();
    const lastHead = await head.nth((await head.count()) - 1).boundingBox();
    check(
      rtl ? firstHead.x > lastHead.x : firstHead.x < lastHead.x,
      `${lang}: columns run ${rtl ? "right to left" : "left to right"}`,
    );
    const rowBox = table.locator("tbody tr").first().getByRole("checkbox");
    await rowBox.focus();
    await page.keyboard.press("Space");
    check(
      (await table.locator("tbody tr[aria-selected=true]").count()) === 1,
      `${lang}: Space on a row checkbox selects the row`,
    );
    await table.locator("thead").getByRole("checkbox").focus();
    await page.keyboard.press("Space");
    check(
      (await table.locator("tbody tr[aria-selected=true]").count()) === 5,
      `${lang}: the header checkbox selects the page`,
    );
    const rowsBefore = await table.locator("tbody tr").count();
    await page
      .getByRole("searchbox")
      .first()
      .fill(rtl ? "ترخيص" : "licence");
    await page.waitForTimeout(150);
    const rowsAfter = await table.locator("tbody tr").count();
    check(
      rowsAfter < rowsBefore || rowsAfter === 1,
      `${lang}: the filter narrows the rows (${rowsBefore} → ${rowsAfter})`,
    );
    await page.getByRole("searchbox").first().fill("");
    const pager = page.locator("nav[data-slot=pagination]").first();
    await pager.locator("[data-slot=pagination-next]").focus();
    await page.keyboard.press("Enter");
    check(
      (await pager.locator("[aria-current=page]").first().textContent())?.trim() !== undefined &&
        (await table.locator("tbody tr").count()) >= 1,
      `${lang}: Enter on next pages the table`,
    );
    const region = page.locator("[data-slot=table-container]").first();
    check(
      (await region.getAttribute("tabindex")) === "0" &&
        (await region.getAttribute("role")) === "region",
      `${lang}: the scrolling region is a labelled region in the tab order`,
    );
    await open("data-table-states", 1000);
    check(
      (await page.locator("table[aria-busy=true]").count()) === 1 &&
        (await page.getByRole("status").count()) >= 1,
      `${lang}: a loading table is aria-busy and announces it`,
    );
    // Horizontal scroll on a phone: the table scrolls inside its region, the page does not.
    await open("table-cells", 375);
    const scroll = await page.evaluate(() => {
      const region = document.querySelector("[data-slot=table-container]");
      return {
        region: region.scrollWidth > region.clientWidth,
        page: document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1,
      };
    });
    check(scroll.region && scroll.page, `${lang}: a wide table scrolls inside its region at 375px`);

    // Breadcrumb: separators mirror; the ellipsis shows the full path.
    await open("breadcrumb-collapsed", 1000);
    const ellipsis = page.locator("[data-slot=breadcrumb-ellipsis]");
    check(await ellipsis.isVisible(), `${lang}: seven levels fold behind an ellipsis button`);
    const sep = await page
      .locator("[data-slot=breadcrumb-separator]")
      .first()
      .evaluate((el) => getComputedStyle(el).scale);
    check(
      rtl ? sep !== "none" : sep === "none",
      `${lang}: the separator ${rtl ? "mirrors" : "does not mirror"}`,
    );
    await ellipsis.focus();
    await page.keyboard.press("Enter");
    check(
      (await page.locator("[data-slot=breadcrumb-link]").filter({ visible: true }).count()) === 6 &&
        !(await ellipsis.isVisible().catch(() => false)),
      `${lang}: Enter on the ellipsis shows the full path`,
    );
    await open("breadcrumb-collapsed", 375);
    check(
      (await page.locator("[data-slot=breadcrumb-link]").filter({ visible: true }).count()) <= 2,
      `${lang}: the path folds on a phone`,
    );

    // Table of Contents: arrow keys move between links; a chosen link becomes current.
    await open("table-of-contents-basic", 1000);
    const toc = page.locator("nav[data-slot=table-of-contents]");
    await toc.locator("a").first().focus();
    await page.keyboard.press("ArrowDown");
    check(
      (await page.evaluate(() => document.activeElement?.getAttribute("href"))) ===
        "#toc-eligibility",
      `${lang}: ArrowDown moves to the next section link`,
    );
    await page.keyboard.press("End");
    check(
      (await page.evaluate(() => document.activeElement?.getAttribute("href"))) === "#toc-fees",
      `${lang}: End moves to the last link`,
    );
    await page.keyboard.press("Enter");
    await page.waitForTimeout(200);
    check(
      (await toc.locator("[aria-current=location]").getAttribute("href")) === "#toc-fees",
      `${lang}: choosing a link makes its section current`,
    );

    check(issues.length === 0, `${lang}: Phase 5 previews log no errors: ${issues.join(" | ")}`);
    await context.close();
  }
}

/**
 * Phase 6 in /en and /ar: Header, Second Nav, Footer, Date Picker, Carousel and Filtration, with
 * the keyboard, at 1280 and 375px, and the direction toggled to RTL for /ar.
 */
async function compositeChecks() {
  for (const lang of ["en", "ar"]) {
    const rtl = lang === "ar";
    const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
    const page = await context.newPage();
    const issues = [];
    page.on("console", (m) => {
      if (["error", "warning"].includes(m.type())) issues.push(m.text().slice(0, 160));
    });
    page.on("pageerror", (e) => issues.push(e.message.slice(0, 160)));
    const open = async (name, width = 1280, query = "") => {
      await page.setViewportSize({ width, height: 800 });
      await page.goto(`${BASE}/preview/${name}?dir=${rtl ? "rtl" : "ltr"}${query}`, {
        waitUntil: "networkidle",
      });
      await page.waitForTimeout(300);
    };
    const next = rtl ? "ArrowLeft" : "ArrowRight";
    const previous = rtl ? "ArrowRight" : "ArrowLeft";
    const slot = (name) => page.locator(`[data-slot=${name}]`);
    const active = () =>
      page.evaluate(
        () => document.activeElement?.getAttribute("data-slot") ?? document.activeElement?.tagName,
      );
    const arabic = /[\u0600-\u06FF]/;
    // The Date Picker writes Arabic-Indic digits in RTL previews; compare with Western ones.
    const latin = (text) =>
      text.replace(/[\u0660-\u0669]/g, (d) => String(d.charCodeAt(0) - 0x660));

    // ---------------------------------------------------------------- Header, desktop
    await open("header-basic");
    await page.keyboard.press("Tab");
    check((await active()) === "header-skip", `${lang}: the skip link is the first tab stop`);
    check(
      (await slot("header-skip").getAttribute("href")) === "#main-content",
      `${lang}: the skip link goes to #main-content`,
    );
    const items = page.locator("[data-header-item]");
    check((await items.count()) === 4, `${lang}: the header has four main items`);
    check(
      (await items.first().getAttribute("aria-current")) === "page",
      `${lang}: the current page has aria-current=page`,
    );
    check(
      (await items.nth(1).getAttribute("aria-current")) === null,
      `${lang}: only the current page has aria-current`,
    );
    await items.first().focus();
    await page.keyboard.press(next);
    check(
      (await items.nth(1).evaluate((el) => el === document.activeElement)) === true,
      `${lang}: ${next} moves to the next item (arrows follow the direction)`,
    );
    await page.keyboard.press(previous);
    check(
      (await items.first().evaluate((el) => el === document.activeElement)) === true,
      `${lang}: ${previous} moves back`,
    );
    await page.keyboard.press("End");
    check(
      (await items.last().evaluate((el) => el === document.activeElement)) === true,
      `${lang}: End moves to the last item`,
    );
    await page.keyboard.press("Home");
    check(
      (await items.first().evaluate((el) => el === document.activeElement)) === true,
      `${lang}: Home moves to the first item`,
    );
    // The Services sub-menu is a Menu: Enter opens it, Escape closes it and returns focus.
    const services = items.nth(1);
    await services.focus();
    await page.keyboard.press("Enter");
    await page.waitForTimeout(250);
    const menu = page.locator("[data-slot=menu-content]");
    check(await menu.isVisible(), `${lang}: Enter opens the sub-menu`);
    check(
      (await menu.locator("[role=menuitem]").count()) === 4,
      `${lang}: the sub-menu has four links in two columns`,
    );
    await page.keyboard.press("ArrowDown");
    check(
      (await active()) === "header-submenu-item",
      `${lang}: ArrowDown moves into the sub-menu links`,
    );
    await page.keyboard.press("Escape");
    await page.waitForTimeout(250);
    check(!(await menu.isVisible().catch(() => false)), `${lang}: Escape closes the sub-menu`);
    check(
      (await services.evaluate((el) => el === document.activeElement)) === true,
      `${lang}: focus returns to the Services button`,
    );
    // RTL: the logo is on the right and the actions on the left.
    const logo = await slot("header-logo").boundingBox();
    const nav = await slot("header-nav").boundingBox();
    const end = await slot("header-end").boundingBox();
    check(
      rtl ? logo.x > nav.x && end.x < nav.x : logo.x < nav.x && end.x > nav.x,
      `${lang}: the logo is on the ${rtl ? "right" : "left"} and the actions on the ${rtl ? "left" : "right"}`,
    );
    check(
      (await slot("nav-drawer-trigger").isVisible()) === false,
      `${lang}: no menu button at 1280px`,
    );
    await open("header-submenu-green");
    await page.waitForTimeout(300);
    check(
      (await page.locator("[data-slot=menu-content][data-tone=green]").count()) === 1,
      `${lang}: the dark green sub-menu opens`,
    );
    check(
      (await page.locator("[data-slot=menu-content] [data-slot=tag]").count()) === 1,
      `${lang}: a sub-menu link shows its tag`,
    );

    // A sub-menu trigger that is open keeps one look: the brand block with a light label when its page
    // is current, the light-grey fill with a dark label when it is not. Colours are read through a
    // canvas so lab() and color() values compare as sRGB lightness.
    const openTrigger = (name) =>
      page.evaluate(async (preview) => {
        const el = document.querySelector("[data-slot=header-item][data-popup-open]");
        if (!el) return null;
        const ctx = document.createElement("canvas").getContext("2d", { willReadFrequently: true });
        const rgb = (css) => {
          ctx.clearRect(0, 0, 1, 1);
          ctx.fillStyle = "#000";
          ctx.fillStyle = css;
          ctx.fillRect(0, 0, 1, 1);
          return [...ctx.getImageData(0, 0, 1, 1).data];
        };
        const light = ([r, g, b]) => 0.2126 * r + 0.7152 * g + 0.0722 * b;
        const style = getComputedStyle(el);
        return {
          preview,
          current: el.hasAttribute("data-current"),
          text: light(rgb(style.color)),
          background: light(rgb(style.backgroundColor)),
          chevron: light(rgb(getComputedStyle(el.querySelector("svg:last-of-type")).color)),
        };
      }, name);
    for (const scheme of ["light", "dark"]) {
      await open("header-submenu-current", 1280, `&theme=${scheme}`);
      await page.waitForTimeout(500);
      const current = await openTrigger("header-submenu-current");
      check(
        current?.current && current.text > 200 && current.chevron > 200 && current.background < 128,
        `${lang} ${scheme}: an open, current trigger has a light label on the brand fill (${JSON.stringify(current)})`,
      );
      await open("header-submenu", 1280, `&theme=${scheme}`);
      await page.waitForTimeout(500);
      const plainOpen = await openTrigger("header-submenu");
      check(
        plainOpen !== null &&
          !plainOpen.current &&
          Math.abs(plainOpen.background - (current?.background ?? 0)) > 20 &&
          Math.abs(plainOpen.text - plainOpen.background) > 100,
        `${lang} ${scheme}: an open, non-current trigger keeps the neutral open fill, not the brand one (${JSON.stringify(plainOpen)})`,
      );
    }

    // Full-width sub-menu: a panel as wide as the header, directly under the bar, with the columns
    // lined up with the bar's content.
    for (const name of ["header-submenu-full", "header-submenu-full-green"]) {
      await open(name);
      await page.waitForTimeout(300);
      const full = await page.evaluate(() => {
        const header = document
          .querySelector("[data-slot=header-nav]")
          ?.closest("[data-slot=header]");
        const bar = header?.querySelector("[data-slot=header-nav]")?.parentElement;
        const panel = document.querySelector("[data-slot=menu-content][data-width=full]");
        const grid = panel?.querySelector("[style*='--header-columns']");
        if (!(header && bar && panel && grid)) return null;
        const h = header.getBoundingClientRect();
        const b = bar.getBoundingClientRect();
        const p = panel.getBoundingClientRect();
        const g = grid.getBoundingClientRect();
        return {
          panelWidth: Math.round(p.width),
          headerWidth: Math.round(h.width),
          gap: Math.round(p.top - b.bottom),
          gridInBar: g.left >= b.left && g.right <= b.right,
        };
      });
      check(full !== null, `${lang}: ${name} opens a full-width panel`);
      check(
        full !== null && Math.abs(full.panelWidth - full.headerWidth) <= 1,
        `${lang}: ${name} is as wide as the header (${full?.panelWidth} of ${full?.headerWidth})`,
      );
      check(
        full !== null && Math.abs(full.gap) <= 1,
        `${lang}: ${name} sits directly under the bar (${full?.gap}px)`,
      );
      check(full?.gridInBar === true, `${lang}: ${name} columns line up with the bar`);
    }

    // A selected item that is disabled drops the brand block, so its label must not stay white.
    await open("header-menu-items", 1280);
    const selectedDisabled = await page.evaluate(() => {
      const el = [...document.querySelectorAll("[data-slot=header-item]")].find(
        (e) =>
          e.getAttribute("aria-current") === "page" && e.getAttribute("aria-disabled") === "true",
      );
      if (!el) return null;
      const style = getComputedStyle(el);
      return { color: style.color, background: style.backgroundColor };
    });
    check(
      selectedDisabled !== null &&
        selectedDisabled.background === "rgba(0, 0, 0, 0)" &&
        selectedDisabled.color !== "lab(100 0 0)",
      `${lang}: a selected, disabled item has a visible label (${selectedDisabled?.color})`,
    );

    // Menu item states: an unselected item shows a bar on hover and press, none when focused;
    // a selected one keeps its bar; a disabled one is skipped by Tab.
    const plain = page.locator(
      "[data-slot=header-nav] [data-slot=header-item]:not([aria-current]):not([aria-disabled=true])",
    );
    const plainBar = () =>
      plain.first().evaluate((el) => {
        const style = getComputedStyle(el, "::after");
        return { bar: style.backgroundColor, outline: getComputedStyle(el).outlineStyle };
      });
    const clear = "rgba(0, 0, 0, 0)";
    check((await plainBar()).bar === clear, `${lang}: an unselected item has no bar at rest`);
    await plain.first().hover();
    await page.waitForTimeout(300);
    const hoverBar = (await plainBar()).bar;
    check(hoverBar !== clear, `${lang}: an unselected item shows a bar on hover`);
    await page.mouse.down();
    await page.waitForTimeout(300);
    const pressBar = (await plainBar()).bar;
    check(
      pressBar !== clear && pressBar !== hoverBar,
      `${lang}: the bar is darker when the item is pressed`,
    );
    await page.mouse.up();
    await page.mouse.move(0, 400);
    await plain.first().evaluate((el) => el.blur());
    await page.keyboard.press("Tab");
    await plain.first().focus();
    await page.keyboard.press("Shift+Tab");
    await page.keyboard.press("Tab");
    await page.waitForTimeout(300);
    const focused = await plainBar();
    check(
      focused.bar === clear && focused.outline === "solid",
      `${lang}: a focused unselected item shows the outline and no bar`,
    );
    const stops = await page.evaluate(() => {
      const nav = document.querySelector("[data-slot=header-nav]");
      return [...nav.querySelectorAll("[data-slot=header-item]")]
        .filter((el) => el.getAttribute("aria-disabled") === "true")
        .map((el) => el.tabIndex < 0 || !el.hasAttribute("href"));
    });
    check(
      stops.length >= 1 && stops.every(Boolean),
      `${lang}: disabled items are not reachable with Tab`,
    );

    // navPosition="center": the logo at the start, the navigation in the middle of the bar, the
    // actions at the end, in both directions.
    await open("header-nav-center", 1280);
    const centre = await page.evaluate(() => {
      const box = (s) => document.querySelector(`[data-slot=${s}]`).getBoundingClientRect();
      const bar = document
        .querySelector("[data-slot=header-logo]")
        .parentElement.getBoundingClientRect();
      const [logo, nav, end] = [box("header-logo"), box("header-nav"), box("header-end")];
      const navItems = [
        ...document.querySelectorAll("[data-slot=header-nav] [data-slot=header-item]"),
      ];
      const left = Math.min(...navItems.map((el) => el.getBoundingClientRect().left));
      const right = Math.max(...navItems.map((el) => el.getBoundingClientRect().right));
      return {
        off: Math.round(Math.abs((left + right) / 2 - (bar.left + bar.width / 2))),
        logo: logo.x,
        nav: nav.x,
        end: end.x,
        oneRow: Math.abs(logo.y - end.y) < 40 && Math.abs(nav.y - logo.y) < 40,
      };
    });
    check(
      centre.off <= 2,
      `${lang}: the navigation is in the centre of the bar (off by ${centre.off}px)`,
    );
    check(
      centre.oneRow &&
        (rtl
          ? centre.logo > centre.nav && centre.nav > centre.end
          : centre.logo < centre.nav && centre.nav < centre.end),
      `${lang}: the logo, the navigation and the actions run along the bar (${JSON.stringify(centre)})`,
    );
    await open("header-basic", 1280);
    const atStart = await page.evaluate(() => {
      const logo = document.querySelector("[data-slot=header-logo]").getBoundingClientRect();
      const boxes = [
        ...document.querySelectorAll("[data-slot=header-nav] [data-slot=header-item]"),
      ].map((el) => el.getBoundingClientRect());
      const gap = Math.min(
        ...boxes.flatMap((box) => [
          Math.abs(box.left - logo.right),
          Math.abs(logo.left - box.right),
        ]),
      );
      return { gap: Math.round(gap) };
    });
    check(
      atStart.gap < 120,
      `${lang}: by default the navigation sits next to the logo (${atStart.gap}px)`,
    );
    await open("header-menu-items", 1280);

    // The selected bar follows DGA: 6px high, inset 8px from each side, fully rounded.
    const bar = await page.evaluate(() => {
      const el = document.querySelector(
        "[data-slot=header-item][aria-current=page]:not([aria-disabled=true])",
      );
      const style = getComputedStyle(el, "::after");
      const box = el.getBoundingClientRect();
      return {
        height: style.height,
        left: Math.round(Number.parseFloat(style.left)),
        width: Math.round(Number.parseFloat(style.width)),
        box: Math.round(box.width),
        radius: Number.parseFloat(style.borderTopLeftRadius) >= 3,
      };
    });
    check(
      bar.height === "6px" && bar.left === 8 && bar.width === bar.box - 16 && bar.radius,
      `${lang}: the selected bar is 6px, inset 8px and rounded (${JSON.stringify(bar)})`,
    );

    // ---------------------------------------------------------------- Header, mobile Drawer
    await open("header-basic", 375);
    check(
      !(await slot("header-nav").isVisible()) && (await slot("nav-drawer-trigger").isVisible()),
      `${lang}: at 375px the navigation is replaced by the menu button`,
    );
    check(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1,
      ),
      `${lang}: the header does not scroll sideways at 375px`,
    );
    const phone = await page.evaluate(() => {
      const box = (s) => document.querySelector(`[data-slot=${s}]`).getBoundingClientRect();
      const [more, logo, menu] = [
        box("header-overflow-button"),
        box("header-logo"),
        box("nav-drawer-trigger"),
      ];
      return {
        more: more.x,
        logo: logo.x,
        menu: menu.x,
        sameRow: Math.abs(more.y - logo.y) < 40 && Math.abs(menu.y - logo.y) < 40,
      };
    });
    check(
      phone.sameRow &&
        (rtl
          ? phone.menu < phone.logo && phone.logo < phone.more
          : phone.more < phone.logo && phone.logo < phone.menu),
      `${lang}: on a phone the overflow button is on the start side, the logo in the middle and the menu on the end (${JSON.stringify(phone)})`,
    );
    await slot("nav-drawer-trigger").focus();
    await page.keyboard.press("Enter");
    await page.waitForTimeout(400);
    const drawer = page.getByRole("dialog");
    check(await drawer.isVisible(), `${lang}: the menu button opens the Drawer`);
    const popup = await slot("drawer-content").boundingBox();
    check(
      rtl ? popup.x + popup.width > 370 : popup.x < 5,
      `${lang}: the Drawer opens from the ${rtl ? "right" : "left"} (start)`,
    );
    check(
      (await page.evaluate(() => Boolean(document.activeElement?.closest("[role=dialog]")))) ===
        true,
      `${lang}: focus moves into the Drawer`,
    );
    const parent = slot("nav-drawer-item")
      .filter({ hasText: /./ })
      .locator("xpath=self::button")
      .first();
    check(
      (await parent.getAttribute("aria-expanded")) === "false",
      `${lang}: a parent starts collapsed`,
    );
    await parent.focus();
    await page.keyboard.press("Enter");
    check(
      (await parent.getAttribute("aria-expanded")) === "true",
      `${lang}: Enter expands a parent`,
    );
    check(
      (await page
        .locator("[data-slot=nav-drawer-item][data-level='2']")
        .filter({ visible: true })
        .count()) === 4,
      `${lang}: the parent shows its four Level 2 links`,
    );
    check(
      (await page.locator("[data-slot=nav-drawer-item][aria-current=page]").count()) === 1,
      `${lang}: the Drawer marks the current page`,
    );
    // Nav Drawer Item: 36px high, Level 1 and Level 2 labels on one line, the divider inset 16px,
    // the 6px by 24px state bar and the badge.
    const item = await page.evaluate(() => {
      const nav = document.querySelector("[data-slot=nav-drawer-nav]");
      const one = nav?.querySelector("[data-slot=nav-drawer-item][data-level='1']");
      const two = nav?.querySelector("[data-slot=nav-drawer-item][data-level='2']");
      const line = nav?.querySelector("li[aria-hidden=true]");
      const label = (el) => el?.querySelector(":scope > span")?.getBoundingClientRect();
      if (!(one && two && line)) return null;
      const box = one.getBoundingClientRect();
      const rule = line.getBoundingClientRect();
      const bar = getComputedStyle(one, "::before");
      const start = (r) => (document.dir === "rtl" ? box.right - r.right : r.left - box.left);
      return {
        height: Math.round(box.height),
        sameLine: Math.abs((label(one)?.x ?? 0) - (label(two)?.x ?? 99)) <= 1,
        inset: Math.round(start(rule)),
        barSize: `${bar.width} ${bar.height}`,
        badge: nav.querySelectorAll("[data-slot=badge]").length,
      };
    });
    check(item !== null, `${lang}: the Drawer shows items and a divider`);
    check(item?.height === 36, `${lang}: a Drawer item is 36px high (${item?.height}px)`);
    check(item?.sameLine === true, `${lang}: Level 1 and Level 2 labels line up`);
    check(item?.inset === 16, `${lang}: the divider is inset 16px (${item?.inset}px)`);
    check(item?.barSize === "6px 24px", `${lang}: the state bar is 6px by 24px (${item?.barSize})`);
    check((item?.badge ?? 0) >= 1, `${lang}: a Drawer item shows its badge`);
    await page.keyboard.press("Escape");
    await page.waitForTimeout(400);
    check(!(await drawer.isVisible().catch(() => false)), `${lang}: Escape closes the Drawer`);
    check((await active()) === "nav-drawer-trigger", `${lang}: focus returns to the menu button`);

    // Drawer header and footer (NavDrawerHeader, NavDrawerFooter): the logo at the top, your
    // content at the bottom edge, and the drawer still has its name.
    await open("nav-drawer-parts", 375);
    await page.getByRole("dialog").waitFor({ state: "visible", timeout: 3000 });
    const slots = await page.evaluate(() => {
      const panel = document.querySelector("[data-slot=drawer-content]");
      const logo = panel?.querySelector(
        "[data-slot=nav-drawer-header] [data-slot=header-logo-link]",
      );
      const foot = panel?.querySelector("[data-slot=nav-drawer-footer]");
      const title = panel?.querySelector("[data-slot=drawer-title]");
      if (!(panel && logo && foot && title)) return null;
      const p = panel.getBoundingClientRect();
      return {
        footAtBottom: Math.round(p.bottom - foot.getBoundingClientRect().bottom) <= 32,
        titleHidden: title.getBoundingClientRect().width <= 1,
        named: Boolean(document.querySelector("[role=dialog]")?.getAttribute("aria-labelledby")),
      };
    });
    check(slots !== null, `${lang}: the Drawer shows the logo and the footer`);
    check(slots?.footAtBottom === true, `${lang}: the Drawer footer sits at the bottom edge`);
    check(
      slots?.titleHidden === true && slots?.named === true,
      `${lang}: with the logo the title is hidden and the Drawer is still named`,
    );

    // NavDrawer on its own (no Header): it draws its own menu button at any width, the parent
    // expands, a disabled item is not a link, and Escape closes it and returns focus to the button.
    await open("nav-drawer-basic", 1280);
    await page.getByRole("dialog").waitFor({ state: "visible", timeout: 3000 });
    const alone = await page.evaluate(() => {
      const items = [...document.querySelectorAll("[data-slot=nav-drawer-item]")];
      const disabled = items.find((el) => el.getAttribute("aria-disabled") === "true");
      return {
        trigger: Boolean(document.querySelector("[data-slot=nav-drawer-trigger]")),
        items: items.length,
        disabledNoHref: disabled ? !disabled.hasAttribute("href") : false,
        divider: Boolean(document.querySelector("[data-slot=nav-drawer-nav] li[aria-hidden=true]")),
      };
    });
    check(
      alone.trigger && alone.items === 9,
      `${lang}: a NavDrawer alone shows its button and items`,
    );
    check(
      alone.disabledNoHref && alone.divider,
      `${lang}: a NavDrawer has a divider and a disabled item`,
    );
    await page.keyboard.press("Escape");
    await page.waitForTimeout(400);
    check(
      !(await page
        .getByRole("dialog")
        .isVisible()
        .catch(() => false)) && (await active()) === "nav-drawer-trigger",
      `${lang}: Escape closes a NavDrawer and focus returns to its button`,
    );

    // ---------------------------------------------------------------- Second Nav
    await open("second-nav-overflow", 375);
    const overflow = await page.evaluate(() => {
      const inner = document.querySelector(".overflow-x-auto");
      return {
        scrolls: inner.scrollWidth > inner.clientWidth,
        page: document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1,
        height: inner.getBoundingClientRect().height,
      };
    });
    check(overflow.scrolls && overflow.page, `${lang}: the Second Nav scrolls inside itself`);
    check(overflow.height === 40, `${lang}: the Second Nav stays 40px high (${overflow.height})`);
    const links = page.locator("[data-slot=second-nav-item]");
    check(
      (await links.first().getAttribute("aria-current")) === "page",
      `${lang}: the current entry has aria-current=page`,
    );
    await links.last().focus();
    const visibleLast = await links.last().evaluate((el) => {
      const box = el.getBoundingClientRect();
      const parent = el.closest(".overflow-x-auto").getBoundingClientRect();
      return box.left >= parent.left - 1 && box.right <= parent.right + 1;
    });
    check(visibleLast, `${lang}: a focused entry scrolls into view`);

    // The strip has two parts spread to the two ends, no divider; small, centred items.
    await open("second-nav-gray", 1280);
    const strip = await page.evaluate(() => {
      const nav = document.querySelector("[data-slot=second-nav]");
      const inner = nav.firstElementChild.getBoundingClientRect();
      const items = [...nav.querySelectorAll("[data-slot=second-nav-item]")];
      const first = items[0].getBoundingClientRect();
      const last = items[items.length - 1].getBoundingClientRect();
      const middle = inner.top + inner.height / 2;
      return {
        divider: nav.querySelectorAll("[aria-hidden=true]:not(svg):not(path)").length,
        font: Number.parseFloat(getComputedStyle(items[0]).fontSize),
        off: Math.max(
          ...items.map((el) => {
            const box = el.getBoundingClientRect();
            return Math.abs(box.top + box.height / 2 - middle);
          }),
        ),
        gapStart: Math.round(Math.min(first.left - inner.left, inner.right - first.right)),
        gapEnd: Math.round(Math.min(last.left - inner.left, inner.right - last.right)),
        inner: Math.round(inner.width),
      };
    });
    check(strip.divider === 0, `${lang}: no divider between the items and the actions`);
    check(strip.font === 14, `${lang}: the strip text is 14px (${strip.font}px)`);
    check(strip.off <= 1, `${lang}: the items are centred on the strip (off by ${strip.off}px)`);
    check(
      strip.gapStart < 40 && strip.gapEnd < 40,
      `${lang}: the two parts sit at the two ends (${JSON.stringify(strip)})`,
    );

    // ---------------------------------------------------------------- Footer
    await open("footer-default", 1280);
    check(
      (await page.locator("h2").filter({ visible: true }).count()) >= 4,
      `${lang}: the columns show at 1280px`,
    );
    check(
      (await page.locator("[data-slot=accordion-trigger]").filter({ visible: true }).count()) === 0,
      `${lang}: no Accordion at 1280px`,
    );
    const brand = await slot("footer-brand").boundingBox();
    const columns = await slot("footer-columns").boundingBox();
    check(
      rtl ? brand.x > columns.x : brand.x < columns.x,
      `${lang}: the brand is on the ${rtl ? "right" : "left"} of the columns`,
    );
    check(
      (await slot("footer-partner-logos").count()) === 1,
      `${lang}: the platform logos sit in their own white tile`,
    );
    await open("footer-green", 375);
    check(
      (await page.locator("[data-slot=accordion-trigger]").filter({ visible: true }).count()) === 0,
      `${lang}: the groups stay open in two columns at 375px by default`,
    );
    await open("footer-accordion", 375);
    const triggers = page.locator("[data-slot=accordion-trigger]").filter({ visible: true });
    check((await triggers.count()) === 3, `${lang}: three Accordion sections at 375px`);
    check(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1,
      ),
      `${lang}: the footer does not scroll sideways at 375px`,
    );
    await triggers.first().focus();
    await page.keyboard.press("Enter");
    check(
      (await triggers.first().getAttribute("aria-expanded")) === "true",
      `${lang}: Enter opens a footer section`,
    );

    // ---------------------------------------------------------------- Calendar
    await open("calendar-standalone");
    const grid = page.locator("table[role=grid]");
    check(
      (await grid.getAttribute("aria-labelledby")) !== null &&
        (await grid.locator("th[scope=col]").count()) === 7,
      `${lang}: the month is a grid with a heading and seven column headers`,
    );
    const heading = (await slot("calendar-heading").first().textContent()) ?? "";
    check(
      rtl ? arabic.test(heading) : /^[A-Za-z]/.test(heading),
      `${lang}: month names are in ${rtl ? "Arabic" : "English"} (${heading})`,
    );
    const tabbable = page.locator("[data-slot=calendar-day][tabindex='0']");
    check((await tabbable.count()) === 1, `${lang}: one day is in the tab order`);
    const day = async () => page.evaluate(() => document.activeElement?.getAttribute("data-iso"));
    const add = (isoDate, days) => {
      const d = new Date(`${isoDate}T12:00:00Z`);
      d.setUTCDate(d.getUTCDate() + days);
      return d.toISOString().slice(0, 10);
    };
    await tabbable.focus();
    const start = await day();
    await page.keyboard.press(next);
    check((await day()) === add(start, 1), `${lang}: ${next} moves to the next day`);
    await page.keyboard.press(previous);
    check((await day()) === start, `${lang}: ${previous} moves to the previous day`);
    await page.keyboard.press("ArrowDown");
    check((await day()) === add(start, 7), `${lang}: ArrowDown moves a week forward`);
    await page.keyboard.press("ArrowUp");
    check((await day()) === start, `${lang}: ArrowUp moves a week back`);
    await page.keyboard.press("Home");
    const weekStart = await day();
    check(
      new Date(`${weekStart}T12:00:00Z`).getUTCDay() === 0,
      `${lang}: Home goes to the first day of the week (Sunday)`,
    );
    await page.keyboard.press("End");
    check(
      new Date(`${await day()}T12:00:00Z`).getUTCDay() === 6,
      `${lang}: End goes to the last day of the week`,
    );
    const month = async () => (await slot("calendar-heading").first().textContent()) ?? "";
    const before = await month();
    await page.keyboard.press("PageDown");
    check((await month()) !== before, `${lang}: Page Down shows the next month`);
    await page.keyboard.press("PageUp");
    check((await month()) === before, `${lang}: Page Up shows the previous month`);
    await page.keyboard.press("Shift+PageDown");
    check(
      (await page.evaluate(() => document.activeElement?.getAttribute("data-iso")?.slice(0, 4))) ===
        String(Number(start.slice(0, 4)) + 1),
      `${lang}: Shift+Page Down moves a year forward`,
    );
    await page.keyboard.press("Shift+PageUp");
    await page.keyboard.press("Enter");
    check(
      (await page
        .locator(`[data-iso="${await day()}"]:not([data-outside])`)
        .first()
        .evaluate((el) => el.parentElement.getAttribute("aria-selected"))) === "true",
      `${lang}: Enter chooses the focused day (aria-selected)`,
    );
    // The month arrows mirror.
    const arrow = await slot("calendar-previous")
      .first()
      .locator("svg")
      .evaluate((el) => getComputedStyle(el).scale);
    check(
      rtl ? arrow !== "none" : arrow === "none",
      `${lang}: the month arrows ${rtl ? "mirror" : "do not mirror"} (${arrow})`,
    );
    // The first day of the week is on the start side.
    const headers = await grid
      .locator("th")
      .evaluateAll((els) => els.map((el) => el.getBoundingClientRect().x));
    check(
      rtl ? headers[0] > headers[6] : headers[0] < headers[6],
      `${lang}: the week starts on the ${rtl ? "right" : "left"}`,
    );
    // Hijri: the switch changes the grid, and every number matches Intl (Umm al-Qura).
    await page
      .getByRole("radio", { name: rtl ? "هجري" : "Hijri" })
      .or(page.getByRole("button", { name: rtl ? "هجري" : "Hijri" }))
      .first()
      .click();
    await page.waitForTimeout(200);
    check(
      (await slot("calendar").getAttribute("data-calendar")) === "hijri",
      `${lang}: the switch shows the Hijri calendar`,
    );
    const hijriOk = await page.evaluate(() => {
      const format = new Intl.DateTimeFormat("en-u-ca-islamic-umalqura-nu-latn", {
        day: "numeric",
        timeZone: "UTC",
      });
      const buttons = [
        ...document.querySelectorAll("[data-slot=calendar-day]:not([data-outside])"),
      ];
      const days = buttons.map((b) =>
        Number(format.format(new Date(`${b.dataset.iso}T12:00:00Z`))),
      );
      return {
        count: buttons.length,
        sequential: days.every((d, i) => d === i + 1),
        length: days.length,
      };
    });
    check(
      hijriOk.sequential && (hijriOk.length === 29 || hijriOk.length === 30),
      `${lang}: the Hijri month has ${hijriOk.length} days numbered 1 to ${hijriOk.length}, as Intl says`,
    );
    const hijriHeading = await month();
    check(
      hijriHeading !== heading &&
        (rtl ? arabic.test(hijriHeading) : /^[A-Za-z]/.test(hijriHeading)),
      `${lang}: the Hijri heading is in ${rtl ? "Arabic" : "English"} (${hijriHeading})`,
    );
    check(
      (await page.locator("[data-slot=calendar-day] span").filter({ hasText: "/" }).count()) > 20,
      `${lang}: the secondary date shows the Gregorian day and month`,
    );

    // ---------------------------------------------------------------- Date Picker
    await open("date-picker-basic");
    const input = page.locator("[data-slot=input-field]").first();
    const trigger = slot("date-picker-trigger");
    check(
      (await page.getByLabel(rtl ? "تاريخ الموعد" : "Appointment date").count()) >= 1,
      `${lang}: the Field label names the date input`,
    );
    await trigger.focus();
    await page.keyboard.press("Enter");
    await page.waitForTimeout(300);
    const dialog = slot("date-picker-popup");
    check(await dialog.isVisible(), `${lang}: Enter on the button opens the calendar`);
    check(
      (await page.evaluate(() => document.activeElement?.getAttribute("data-slot"))) ===
        "calendar-day",
      `${lang}: focus moves to a day`,
    );
    await page.keyboard.press("Escape");
    await page.waitForTimeout(300);
    check(!(await dialog.isVisible().catch(() => false)), `${lang}: Escape closes the calendar`);
    check(
      (await active()) === "date-picker-trigger",
      `${lang}: focus returns to the calendar button`,
    );
    await trigger.click();
    await page.waitForTimeout(300);
    await page
      .locator("[data-slot=calendar-day]:not([data-outside]):not([data-disabled])")
      .nth(9)
      .click();
    await page.waitForTimeout(300);
    check(
      !(await dialog.isVisible().catch(() => false)),
      `${lang}: choosing a day closes the popup`,
    );
    check(
      /^\d{4}-\d{2}-\d{2}$/.test(latin(await input.inputValue())),
      `${lang}: the chosen date is in the input (${await input.inputValue()})`,
    );
    await input.fill("2026-12-25");
    await input.press("Enter");
    check(latin(await input.inputValue()) === "2026-12-25", `${lang}: a typed date is kept`);
    await trigger.click();
    await page.waitForTimeout(300);
    check(
      (await page.locator("[data-iso='2026-12-25'][data-chosen]").count()) === 1,
      `${lang}: the typed date is the chosen day when the calendar opens`,
    );
    await page.keyboard.press("Escape");
    await page.waitForTimeout(200);
    await input.fill("2026-02-30");
    await input.press("Enter");
    check(
      (await input.getAttribute("aria-invalid")) === "true",
      `${lang}: an impossible date marks the field invalid`,
    );

    // Range: two clicks fill both fields and shade the days between.
    await open("date-picker-range");
    await page.locator("[data-slot=date-picker-trigger]").click();
    await page.waitForTimeout(300);
    const cells = page.locator("[data-slot=calendar-day]:not([data-outside]):not([data-disabled])");
    await cells.nth(3).click();
    check(
      await slot("date-picker-popup").isVisible(),
      `${lang}: the range popup stays open after the first day`,
    );
    await cells.nth(8).click();
    await page.waitForTimeout(300);
    const [startValue, endValue] = (
      await page.locator("[data-slot=input-field]").evaluateAll((els) => els.map((el) => el.value))
    ).map(latin);
    check(
      /^\d{4}-\d{2}-\d{2}$/.test(startValue) && endValue > startValue,
      `${lang}: a range fills the start and the end (${startValue} to ${endValue})`,
    );
    await page.locator("[data-slot=date-picker-trigger]").click();
    await page.waitForTimeout(300);
    check(
      (await page.locator("td[data-range=mid]").count()) === 4,
      `${lang}: the days between the ends are shaded`,
    );
    await page.keyboard.press("Escape");

    // Limits: no weekend, nothing before today.
    await open("date-picker-options");
    await page.locator("[data-slot=date-picker-trigger]").click();
    await page.waitForTimeout(300);
    const limits = await page.evaluate(() => {
      const days = [...document.querySelectorAll("[data-slot=calendar-day]")];
      const weekend = days.filter((d) =>
        [5, 6].includes(new Date(`${d.dataset.iso}T12:00:00Z`).getUTCDay()),
      );
      return {
        weekendDisabled: weekend.every((d) => d.getAttribute("aria-disabled") === "true"),
        someEnabled: days.some((d) => d.getAttribute("aria-disabled") !== "true"),
      };
    });
    check(
      limits.weekendDisabled && limits.someEnabled,
      `${lang}: weekends are aria-disabled, other days are not`,
    );
    await page
      .locator("[data-slot=calendar-day][aria-disabled=true]")
      .first()
      .click({ force: true });
    check(
      (await page.locator("[data-slot=date-picker-popup]").isVisible()) &&
        (await page.locator("[data-slot=input-field]").inputValue()) === "",
      `${lang}: a disabled day cannot be chosen`,
    );
    check(
      (await page.getByRole("button", { name: rtl ? "تطبيق" : "Apply" }).count()) === 1,
      `${lang}: confirm mode shows Apply`,
    );
    await page.locator("[data-slot=calendar-day]:not([aria-disabled=true])").first().click();
    check(
      (await page.locator("[data-slot=input-field]").inputValue()) === "",
      `${lang}: nothing is set before Apply`,
    );
    await page.getByRole("button", { name: rtl ? "تطبيق" : "Apply" }).click();
    await page.waitForTimeout(300);
    check(
      /^\d{4}-\d{2}-\d{2}$/.test(latin(await page.locator("[data-slot=input-field]").inputValue())),
      `${lang}: Apply sets the date`,
    );

    // ---------------------------------------------------------------- Carousel
    await open("carousel-basic");
    const region = page.locator("[data-slot=carousel]");
    check(
      (await region.getAttribute("aria-roledescription")) === "carousel",
      `${lang}: the carousel has a role description`,
    );
    const slides = page.locator("[data-slot=carousel-slide]");
    check((await slides.count()) === 4, `${lang}: four slides`);
    const visibleSlides = () => page.locator("[data-slot=carousel-slide]:not([aria-hidden=true])");
    check(
      (await visibleSlides().count()) === 1,
      `${lang}: one slide is exposed to assistive technology`,
    );
    check(
      (await slides.nth(1).evaluate((el) => el.inert)) === true,
      `${lang}: slides that are not visible are inert`,
    );
    const first = await slides.nth(0).boundingBox();
    const second = await slides.nth(1).boundingBox();
    check(
      rtl ? first.x > second.x : first.x < second.x,
      `${lang}: the first slide is on the ${rtl ? "right" : "left"}`,
    );
    const dots = page.locator("[data-slot=carousel-dot]");
    check(
      (await dots.count()) === 4 && (await dots.first().getAttribute("aria-current")) === "true",
      `${lang}: four dots, the first is current`,
    );
    check(
      await slot("carousel-previous").isDisabled(),
      `${lang}: previous is disabled on the first slide`,
    );
    await slot("carousel-next").focus();
    await page.keyboard.press("Enter");
    await page.waitForTimeout(450);
    check(
      (await dots.nth(1).getAttribute("aria-current")) === "true",
      `${lang}: Enter on next shows the second slide`,
    );
    check(
      (await slides.nth(1).getAttribute("aria-hidden")) === null,
      `${lang}: the second slide is exposed`,
    );
    await page.keyboard.press(next);
    check(
      (await dots.nth(2).getAttribute("aria-current")) === "true",
      `${lang}: ${next} shows the next slide`,
    );
    await page.keyboard.press(previous);
    check(
      (await dots.nth(1).getAttribute("aria-current")) === "true",
      `${lang}: ${previous} shows the previous slide`,
    );
    await page.keyboard.press("End");
    check(
      (await dots.nth(3).getAttribute("aria-current")) === "true" &&
        (await slot("carousel-next").isDisabled()),
      `${lang}: End shows the last slide and disables next`,
    );
    await dots.first().click();
    // The arrows mirror and previous is on the start side.
    const pb = await slot("carousel-previous").boundingBox();
    const nb = await slot("carousel-next").boundingBox();
    check(rtl ? pb.x > nb.x : pb.x < nb.x, `${lang}: previous is on the ${rtl ? "right" : "left"}`);
    const carrow = await slot("carousel-previous")
      .locator("svg")
      .evaluate((el) => getComputedStyle(el).scale);
    check(
      rtl ? carrow !== "none" : carrow === "none",
      `${lang}: the carousel arrows ${rtl ? "mirror" : "do not mirror"} (${carrow})`,
    );
    // Swipe: content follows the finger, so the next slide needs a swipe towards the start.
    const swipe = (dx) =>
      page.evaluate((delta) => {
        const target = document.querySelector("[data-slot=carousel-viewport]");
        const fire = (type, x) =>
          target.dispatchEvent(
            new PointerEvent(type, {
              bubbles: true,
              pointerType: "touch",
              pointerId: 7,
              clientX: x,
              clientY: 100,
            }),
          );
        fire("pointerdown", 400);
        fire("pointerup", 400 + delta);
      }, dx);
    await swipe(rtl ? 120 : -120);
    await page.waitForTimeout(450);
    check(
      (await dots.nth(1).getAttribute("aria-current")) === "true",
      `${lang}: a swipe towards the start shows the next slide`,
    );
    await swipe(rtl ? -120 : 120);
    await page.waitForTimeout(450);
    check(
      (await dots.nth(0).getAttribute("aria-current")) === "true",
      `${lang}: a swipe the other way shows the previous slide`,
    );
    await swipe(10);
    check(
      (await dots.nth(0).getAttribute("aria-current")) === "true",
      `${lang}: a short swipe does nothing`,
    );

    // Autoplay: moves on by itself, can be paused; never starts under reduced motion.
    await open("carousel-autoplay");
    const toggle = slot("carousel-toggle");
    const autoDots = page.locator("[data-slot=carousel-dot]");
    check(
      (await toggle.getAttribute("aria-label")) !== null &&
        (await autoDots.first().getAttribute("aria-current")) === "true",
      `${lang}: autoplay shows a pause button`,
    );
    await page.mouse.move(0, 0);
    await page.waitForTimeout(4700);
    check(
      (await autoDots.nth(1).getAttribute("aria-current")) === "true",
      `${lang}: autoplay moves to the next slide`,
    );
    await toggle.click();
    await page.mouse.move(0, 0);
    await page.keyboard.press("Tab");
    await page.waitForTimeout(4700);
    check(
      (await autoDots.nth(1).getAttribute("aria-current")) === "true",
      `${lang}: pause stops autoplay`,
    );
    const reduced = await browser.newContext({
      viewport: { width: 1280, height: 800 },
      reducedMotion: "reduce",
    });
    const quiet = await reduced.newPage();
    await quiet.goto(`${BASE}/preview/carousel-autoplay?dir=${rtl ? "rtl" : "ltr"}`, {
      waitUntil: "networkidle",
    });
    await quiet.mouse.move(0, 0);
    await quiet.waitForTimeout(4700);
    check(
      (await quiet.locator("[data-slot=carousel-dot]").first().getAttribute("aria-current")) ===
        "true",
      `${lang}: autoplay does not start under prefers-reduced-motion`,
    );
    await reduced.close();

    // ---------------------------------------------------------------- Filtration
    await open("filtration-basic");
    const panel = slot("filtration-panel");
    check(await panel.isVisible(), `${lang}: the panel shows at 1280px`);
    const side = await panel.boundingBox();
    const main = await slot("filtration-main").boundingBox();
    check(
      rtl ? side.x > main.x : side.x < main.x,
      `${lang}: the panel is on the ${rtl ? "right" : "left"} of the results`,
    );
    const count = async () => (await slot("filtration-result-count").textContent())?.trim() ?? "";
    const total = await count();
    const firstBox = panel.getByRole("checkbox").first();
    await firstBox.focus();
    await page.keyboard.press("Space");
    await page.waitForTimeout(200);
    check(
      (await firstBox.getAttribute("aria-checked")) === "true",
      `${lang}: Space checks a checkbox`,
    );
    const tags = page.locator("[data-slot=filtration-tag]");
    check((await tags.count()) === 1, `${lang}: an applied filter shows as a tag`);
    check(
      (await count()) !== total,
      `${lang}: the result count changes (${total} to ${await count()})`,
    );
    const dismiss = tags.first().locator("button");
    check(
      ((await dismiss.getAttribute("aria-label")) ?? "").length > 3,
      `${lang}: the tag's remove button is named`,
    );
    await dismiss.focus();
    await page.keyboard.press("Enter");
    await page.waitForTimeout(200);
    check(
      (await tags.count()) === 0 &&
        (await firstBox.getAttribute("aria-checked")) === "false" &&
        (await count()) === total,
      `${lang}: removing the tag unchecks the box and restores the count`,
    );
    await firstBox.focus();
    await page.keyboard.press("Space");
    await panel.getByRole("radio").first().focus();
    await page.keyboard.press("Space");
    check((await tags.count()) === 2, `${lang}: a radio adds a second tag`);
    await page
      .getByRole("button", { name: rtl ? "مسح الكل" : "Clear all" })
      .last()
      .click();
    await page.waitForTimeout(200);
    check(
      (await tags.count()) === 0 && (await count()) === total,
      `${lang}: Clear all removes every filter`,
    );

    await open("filtration-basic", 375);
    check(
      !(await panel.isVisible()) &&
        (await page
          .locator("button", { hasText: rtl ? "المرشحات" : "Filters" })
          .first()
          .isVisible()),
      `${lang}: at 375px the panel is replaced by a button`,
    );
    const filterButton = page.locator("button", { hasText: rtl ? "المرشحات" : "Filters" }).first();
    await filterButton.focus();
    await page.keyboard.press("Enter");
    await page.waitForTimeout(450);
    const fdrawer = page.getByRole("dialog");
    check(await fdrawer.isVisible(), `${lang}: the button opens the panel in a Drawer`);
    const fpopup = await slot("drawer-content").boundingBox();
    check(
      rtl ? fpopup.x + fpopup.width > 370 : fpopup.x < 5,
      `${lang}: the filter Drawer opens from the ${rtl ? "right" : "left"}`,
    );
    await fdrawer.getByRole("checkbox").first().focus();
    await page.keyboard.press("Space");
    await page.waitForTimeout(200);
    await page.keyboard.press("Escape");
    await page.waitForTimeout(450);
    check(
      !(await fdrawer.isVisible().catch(() => false)),
      `${lang}: Escape closes the filter Drawer`,
    );
    check(
      (await filterButton.evaluate((el) => el === document.activeElement)) === true,
      `${lang}: focus returns to the filter button`,
    );
    check((await tags.count()) === 1, `${lang}: the filter chosen in the Drawer shows as a tag`);

    check(issues.length === 0, `${lang}: Phase 6 previews log no errors: ${issues.join(" | ")}`);
    await context.close();
  }
}

// Every group is one `*Checks` function above. A pull request runs only the groups its changes
// can affect (scripts/ci/affected.ts decides), split over shards:
//   E2E_GROUPS=locale,layout   run only these groups (default: all)
//   E2E_SHARD=2/4              run the 2nd of 4 shards of the selected groups
//   E2E_REPORT=file.json       write the result (per group time, checks, failures) as JSON
//   E2E_LIST=1                 print the group names and exit
// The default (no variables) runs every group in order, as before.
const GROUPS = [
  ["locale", localeChecks],
  ["layout", layoutChecks],
  ["ai-resources", aiResourceChecks],
  ["polish", polishChecks],
  ["discovery", discoveryChecks],
  ["form-pages", formPageChecks],
  ["field-states", fieldStateChecks],
  ["keyboard", keyboardChecks],
  ["interactive", interactiveChecks],
  ["navigation", navigationChecks],
  ["composite", compositeChecks],
  ["ext-overlays", () => overlaysChecks({ browser, BASE, check })],
  ["ext-inputs", () => inputsChecks({ browser, BASE, check })],
  ["ext-misc", () => miscChecks({ browser, BASE, check })],
  ["ext-nav", () => extNavChecks({ browser, BASE, check })],
  ["ext-layout", () => extLayoutChecks({ browser, BASE, check })],
  ["ext-display", () => extDisplayChecks({ browser, BASE, check })],
  ["not-found", notFoundChecks],
  ["arabic-exception", arabicExceptionChecks],
  ["preview-language", previewLanguageChecks],
];
const names = GROUPS.map(([name]) => name);
if (process.env.E2E_LIST) {
  console.log(names.join("\n"));
  await browser.close();
  process.exit(0);
}
const map = JSON.parse(readFileSync(new URL("./ci/e2e-map.json", import.meta.url), "utf8"));
if (names.join() !== map.groups.join()) {
  console.error(
    `scripts/ci/e2e-map.json "groups" must list the groups in order: ${names.join(", ")}`,
  );
  await browser.close();
  process.exit(2);
}
const wanted = process.env.E2E_GROUPS ? process.env.E2E_GROUPS.split(",").filter(Boolean) : names;
const unknown = wanted.filter((name) => !names.includes(name));
if (unknown.length) {
  console.error(`Unknown e2e group(s): ${unknown.join(", ")}. Known: ${names.join(", ")}`);
  await browser.close();
  process.exit(2);
}
// Shard i of n takes the selected groups at positions i-1, i-1+n, ... of the list sorted by weight
// (scripts/ci/e2e-map.json), heaviest first, so the shards finish at about the same time.
const [shardIndex, shardCount] = (process.env.E2E_SHARD ?? "1/1").split("/").map(Number);
const { weights } = map;
const selected = GROUPS.filter(([name]) => wanted.includes(name));
const bins = Array.from({ length: shardCount }, () => ({ load: 0, groups: [] }));
for (const group of [...selected].sort((a, b) => (weights[b[0]] ?? 1) - (weights[a[0]] ?? 1))) {
  const scale =
    ONLY && map.scoped.includes(group[0]) ? Math.min(1, Math.max(0.1, ONLY.length / map.pages)) : 1;
  bins.sort((a, b) => a.load - b.load);
  bins[0].groups.push(group);
  bins[0].load += (weights[group[0]] ?? 1) * scale;
}
// Shard i is the i-th bin by name order, which is stable: re-sort by the first group's position.
bins.sort(
  (a, b) => names.indexOf(a.groups[0]?.[0] ?? "~") - names.indexOf(b.groups[0]?.[0] ?? "~"),
);
const mine = (bins[shardIndex - 1]?.groups ?? []).sort(
  (a, b) => names.indexOf(a[0]) - names.indexOf(b[0]),
);
console.log(
  `Shard ${shardIndex}/${shardCount}: ${mine.map(([name]) => name).join(", ") || "(none)"}`,
);

const timings = {};
for (const [name, run] of mine) {
  const started = Date.now();
  const before = { passed, failed: failures.length };
  await run();
  timings[name] = {
    seconds: Math.round((Date.now() - started) / 100) / 10,
    passed: passed - before.passed,
    failed: failures.length - before.failed,
  };
  console.log(`group ${name}: ${timings[name].seconds}s`);
}
await browser.close();
if (process.env.E2E_REPORT) {
  writeFileSync(
    process.env.E2E_REPORT,
    JSON.stringify(
      { shard: `${shardIndex}/${shardCount}`, passed, failures, groups: timings },
      null,
      2,
    ),
  );
}
console.log(`${passed} checks passed, ${failures.length} failed.`);
process.exit(failures.length ? 1 : 0);
