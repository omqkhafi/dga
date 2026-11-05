// Browser checks against a running docs site: `bun run test:e2e` (set E2E_BASE_URL, default
// http://localhost:3000; set CHROMIUM_PATH to use an existing Chromium).
//   1. Locale: the dga_locale cookie wins over Accept-Language, which wins over English, and the
//      language switcher writes the cookie.
//   2. Layout: the header and page fit at 375, 768, 1024 and 1280 px in LTR and RTL, light and
//      dark, with the lockup on the start side, and nothing is logged to the console.
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

await localeChecks();
await layoutChecks();
await browser.close();
console.log(`${passed} checks passed, ${failures.length} failed.`);
process.exit(failures.length ? 1 : 0);
