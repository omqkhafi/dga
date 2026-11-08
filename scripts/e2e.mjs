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
//   4. Forms: every form component page fits at 375 and 1280 px in both languages, and the
//      service request form can be completed with the keyboard alone in /en and /ar.
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { chromium } from "playwright";

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
      [...FORM_PAGES, ...INTERACTIVE_PAGES].every((name) =>
        xml.includes(`/${lang}/docs/components/${name}`),
      ),
      `/sitemap/${lang}.xml lists every form and interactive component page`,
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
        for (const name of [...FORM_PAGES, ...INTERACTIVE_PAGES]) {
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
    `form and interactive pages: no console errors or warnings: ${[...issues].join(" | ")}`,
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
    for (const path of pages) {
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
  for (const width of [1280, 375]) {
    const context = await browser.newContext({ viewport: { width, height: 900 } });
    const page = await context.newPage();
    await page.goto(`${BASE}/en/docs/components/badge`, { waitUntil: "networkidle" });
    await page
      .locator("#rtl")
      .scrollIntoViewIfNeeded()
      .catch(() => {});
    await scrollThrough(page);
    const compare = await page.evaluate(() => {
      const figures = [...document.querySelectorAll("[data-preview-direction]")];
      return figures.map((fig) => {
        const frame = fig.querySelector("iframe");
        const f = fig.getBoundingClientRect();
        const i = frame.getBoundingClientRect();
        return {
          top: Math.round(f.top),
          width: Math.round(f.width),
          frame: Math.round(i.width) * 1,
          scale: i.width / frame.offsetWidth,
        };
      });
    });
    check(compare.length === 2, `badge @${width}: two RTL comparison panels`);
    for (const c of compare) {
      check(
        Math.abs(c.width - 2 - c.frame) <= 3,
        `badge @${width}: the panel is filled by its frame, no dead space (${c.width} vs ${c.frame})`,
      );
    }
    if (width === 375)
      check(compare[1].top > compare[0].top + 40, "badge @375: the two panels are stacked");
    else
      check(
        Math.abs(compare[1].top - compare[0].top) < 4,
        "badge @1280: the two panels sit side by side",
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

await localeChecks();
await layoutChecks();
await aiResourceChecks();
await polishChecks();
await discoveryChecks();
await formPageChecks();
await fieldStateChecks();
await keyboardChecks();
await interactiveChecks();
await notFoundChecks();
await arabicExceptionChecks();
await previewLanguageChecks();
await browser.close();
console.log(`${passed} checks passed, ${failures.length} failed.`);
process.exit(failures.length ? 1 : 0);
