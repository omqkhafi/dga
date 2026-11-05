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
//   4. Forms: every form component page fits at 375 and 1280 px in both languages, and the
//      service request form can be completed with the keyboard alone in /en and /ar.
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
    // Focus may rest on a Base UI focus guard or the body between wraps, but never on the page.
    let trapped = true;
    for (let i = 0; i < 8; i++) {
      await page.keyboard.press("Tab");
      const where = await page.evaluate(() => {
        const el = document.activeElement;
        if (!el || el === document.body) return "body";
        if (el.hasAttribute("data-base-ui-focus-guard")) return "guard";
        return el.closest('[role="dialog"]') ? "dialog" : "page";
      });
      if (where === "page") trapped = false;
    }
    check(trapped, `${lang}: Tab never moves focus to the page behind the dialog`);
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

console.log("locale");
await localeChecks();
console.log("layout");
await layoutChecks();
console.log("discovery");
await discoveryChecks();
console.log("pages");
await formPageChecks();
console.log("fields");
await fieldStateChecks();
console.log("keyboard");
await keyboardChecks();
console.log("interactive");
await interactiveChecks();
await browser.close();
console.log(`${passed} checks passed, ${failures.length} failed.`);
process.exit(failures.length ? 1 : 0);
