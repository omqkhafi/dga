// Browser checks for the Phase 7 work stream "misc": Combobox, Command and Digital Stamp (and the
// Header's stamp slot). Called from scripts/e2e.mjs with the shared helpers.
//   - every page fits at 375 and 1280px in /en and /ar, with no console errors
//   - Combobox with the keyboard: open, type, arrows, Enter, Escape, multiple chips and Backspace,
//     creatable, async, Arabic spelling variants, RTL popup alignment
//   - Command: type, arrows, Enter runs, the empty state, the dialog and focus return, RTL order
//   - Digital Stamp: the disclosure with the keyboard, Escape, the Header slot, 375px, RTL
//   - preview purity: each of these previews is one language per direction
import { readFileSync } from "node:fs";

const ALLOWED = new Set(
  JSON.parse(readFileSync(new URL("../locale-allowlist.json", import.meta.url), "utf8")).words.map(
    (w) => w.toLowerCase(),
  ),
);
const ARABIC = /[؀-ٟ٭-ۯۺ-ۿݐ-ݿﭐ-﷿ﹰ-﻿]/;

const visibleText = (page, pageLang) =>
  page.evaluate((pageLang) => {
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
      .replace(/`[^`]*`/g, " ")
      .replace(/https?:\/\/\S+/g, " ")
      .replace(/[\w.-]+(\/[\w.-]+)+/g, " ")
      .replace(/\w+="[^"]*"/g, " ")
      .match(/[A-Za-z][\w.+-]*/g) ?? []
  ).filter((raw) => {
    const w = raw.replace(/[.-]+$/, "");
    if (w.length < 2 || ALLOWED.has(w.toLowerCase())) return false;
    if (/^[A-Z][a-z0-9]+([A-Z][a-z0-9]*)+$/.test(w) || /^[a-z]+[A-Z]\w*$/.test(w)) return false;
    if (/^[a-z0-9]+(-[a-z0-9]+)+$/.test(w) || /^[a-z0-9-]+(\.[a-z0-9-]+)+$/.test(w)) return false;
    return !/^\d/.test(w);
  });

const PAGES = ["combobox", "command", "digital-stamp", "header"];

const PREVIEWS = [
  "combobox-basic",
  "combobox-states",
  "combobox-open",
  "combobox-multiple",
  "combobox-groups",
  "combobox-creatable",
  "combobox-async",
  "command-basic",
  "command-empty",
  "command-dialog",
  "digital-stamp-closed",
  "digital-stamp-open",
  "digital-stamp-domains",
  "header-stamp",
];

export async function miscChecks({ browser, BASE, check }) {
  for (const lang of ["en", "ar"]) {
    const rtl = lang === "ar";
    const dir = rtl ? "rtl" : "ltr";
    const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
    const page = await context.newPage();
    const issues = [];
    page.on("console", (m) => {
      if (["error", "warning"].includes(m.type())) issues.push(m.text().slice(0, 160));
    });
    page.on("pageerror", (e) => issues.push(e.message.slice(0, 160)));
    const open = async (name, width = 1280, query = "") => {
      await page.setViewportSize({ width, height: 800 });
      await page.goto(`${BASE}/preview/${name}?dir=${dir}${query}`, { waitUntil: "networkidle" });
      await page.waitForTimeout(300);
    };
    const slot = (name) => page.locator(`[data-slot=${name}]`);
    const focused = (locator) => locator.evaluate((el) => el === document.activeElement);
    const t = (en, ar) => (rtl ? ar : en);

    // ---------------------------------------------------------------- pages fit
    for (const width of [375, 1280]) {
      await page.setViewportSize({ width, height: 800 });
      for (const name of PAGES) {
        await page.goto(`${BASE}/${lang}/docs/components/${name}`, { waitUntil: "networkidle" });
        const overflow = await page.evaluate(
          () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
        );
        check(overflow <= 1, `${lang}: ${name} fits at ${width}px (overflow ${overflow})`);
      }
    }
    // The Extension badge and note on Combobox and Command, but not on Digital Stamp.
    await page.setViewportSize({ width: 1280, height: 800 });
    for (const name of ["combobox", "command"]) {
      await page.goto(`${BASE}/${lang}/docs/components/${name}`, { waitUntil: "networkidle" });
      check(
        (await page.locator("main aside").first().textContent())?.includes(
          t("not part of DGA", "ليس جزءًا من DGA"),
        ) === true,
        `${lang}: ${name} says it is a Platform Code extension`,
      );
    }
    await page.goto(`${BASE}/${lang}/docs/components/digital-stamp`, { waitUntil: "networkidle" });
    check(
      !((await page.locator("main").first().textContent()) ?? "").includes(
        t("Platform Code extension, not", "امتداد من كود المنصات وليس"),
      ),
      `${lang}: Digital Stamp is a DGA component, with no extension note`,
    );

    // ---------------------------------------------------------------- Combobox
    await open("combobox-basic");
    const input = page.getByRole("combobox").first();
    check(
      (await input.getAttribute("aria-expanded")) === "false",
      `${lang}: the combobox starts closed`,
    );
    await input.focus();
    await page.keyboard.type(t("pass", "جواز"));
    await page.waitForTimeout(250);
    const listbox = page.getByRole("listbox");
    check(await listbox.isVisible(), `${lang}: typing opens the list`);
    check(
      (await page.getByRole("option").count()) === 1,
      `${lang}: typing narrows the list to one option`,
    );
    check((await input.getAttribute("aria-expanded")) === "true", `${lang}: aria-expanded is true`);
    await page.keyboard.press("ArrowDown");
    check(
      (await page.getByRole("option").first().getAttribute("data-highlighted")) !== null,
      `${lang}: ArrowDown highlights the option and focus stays in the field`,
    );
    check(await focused(input), `${lang}: focus stays in the field`);
    await page.keyboard.press("Enter");
    await page.waitForTimeout(250);
    check(
      (await input.inputValue()) === t("Renew passport", "تجديد جواز السفر"),
      `${lang}: Enter chooses the option and writes its label`,
    );
    check(!(await listbox.isVisible().catch(() => false)), `${lang}: choosing closes the list`);
    // Escape closes an open list.
    await input.click();
    await page.keyboard.press("ArrowDown");
    await page.waitForTimeout(250);
    check(await listbox.isVisible(), `${lang}: ArrowDown opens the list`);
    await page.keyboard.press("Escape");
    await page.waitForTimeout(250);
    check(!(await listbox.isVisible().catch(() => false)), `${lang}: Escape closes the list`);
    // Case-insensitive search; Arabic spelling variants.
    await input.fill("");
    await input.focus();
    await page.keyboard.type(t("RENEW", "تجديد"));
    await page.waitForTimeout(250);
    check((await page.getByRole("option").count()) === 1, `${lang}: search ignores case`);
    if (rtl) {
      await input.fill("");
      await page.keyboard.type("اقامه");
      await page.waitForTimeout(250);
      check(
        (await page.getByRole("option").count()) === 1,
        "ar: إقامة is found by اقامه (hamza and ta marbuta)",
      );
      await input.fill("");
      await page.keyboard.type("هويه وطنيه");
      await page.waitForTimeout(250);
      check(
        (await page.getByRole("option").count()) === 1,
        "ar: هوية وطنية is found by هويه وطنيه",
      );
      await input.fill("");
      await page.keyboard.type("xyz");
      await page.waitForTimeout(250);
      check((await page.getByRole("option").count()) === 0, "ar: no match shows no options");
      check(
        ((await slot("combobox-empty").textContent()) ?? "").includes("لا توجد"),
        "ar: the empty text is Arabic",
      );
    }
    // Popup alignment: the start edge of the field in LTR and RTL.
    await input.fill("");
    await input.click();
    await page.keyboard.press("ArrowDown");
    await page.waitForTimeout(250);
    const control = await slot("combobox-control").boundingBox();
    const popup = await slot("combobox-content").boundingBox();
    check(
      rtl
        ? Math.abs(popup.x + popup.width - (control.x + control.width)) < 3
        : Math.abs(popup.x - control.x) < 3,
      `${lang}: the list lines up with the ${rtl ? "right" : "left"} (start) edge of the field`,
    );
    check(popup.width >= control.width - 2, `${lang}: the list is at least as wide as the field`);
    await page.keyboard.press("Escape");

    // States: disabled and read-only, error.
    await open("combobox-states");
    check(
      (await page
        .getByRole("combobox")
        .evaluateAll((els) => els.filter((e) => e.disabled).length)) === 1,
      `${lang}: one combobox is disabled`,
    );
    check(
      (await page
        .getByRole("combobox")
        .evaluateAll((els) => els.filter((e) => e.readOnly).length)) === 1,
      `${lang}: one combobox is read-only`,
    );
    check(
      (await page.locator("[aria-invalid=true]").count()) >= 1,
      `${lang}: the error combobox is aria-invalid`,
    );

    // Multiple: chips, Backspace, remove button, wrapping.
    await open("combobox-multiple");
    const chips = slot("combobox-chip");
    check((await chips.count()) === 2, `${lang}: two chips to begin with`);
    const chipInput = page.getByRole("combobox").first();
    const oneRow = (await slot("combobox-control").boundingBox()).height;
    await chipInput.focus();
    await page.keyboard.press("Backspace");
    await page.waitForTimeout(200);
    check(
      (await chips.count()) === 1,
      `${lang}: Backspace in the empty field removes the last chip`,
    );
    await page.keyboard.type(t("fine", "مخالفة"));
    await page.waitForTimeout(250);
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("Enter");
    await page.waitForTimeout(250);
    check((await chips.count()) === 2, `${lang}: Enter adds a chip`);
    check(
      (await chipInput.inputValue()) === "",
      `${lang}: the field is cleared after choosing in a multiple combobox`,
    );
    await chips.first().locator("[data-slot=combobox-chip-remove]").click();
    await page.waitForTimeout(200);
    check((await chips.count()) === 1, `${lang}: the remove button removes its chip`);
    check(
      ((await chips.first().getAttribute("aria-label")) ?? "").length > 0,
      `${lang}: a chip is named by its label`,
    );
    await chipInput.focus();
    for (const q of t(["Renew", "Issue", "Driving"], ["تجديد", "إصدار", "رخصة"])) {
      await page.keyboard.type(q);
      await page.keyboard.press("ArrowDown");
      await page.keyboard.press("Enter");
      await page.waitForTimeout(150);
    }
    const tall = (await slot("combobox-control").boundingBox()).height;
    check(tall >= oneRow, `${lang}: the box keeps every chip visible (${tall}px, was ${oneRow}px)`);
    check(
      (await slot("combobox-control").boundingBox()).width <= 1280,
      `${lang}: chips wrap inside the box`,
    );

    // Creatable.
    await open("combobox-creatable");
    const cInput = page.getByRole("combobox").first();
    await cInput.focus();
    await page.keyboard.type(t("Zebra", "زيبرا"));
    await page.waitForTimeout(250);
    const create = page.locator("[data-slot=combobox-item][data-creatable]");
    check((await create.count()) === 1, `${lang}: a create row appears for new text`);
    check(
      ((await create.textContent()) ?? "").includes(t("Zebra", "زيبرا")) &&
        ((await create.textContent()) ?? "").includes(t("Add", "إضافة")),
      `${lang}: the create row names the new tag`,
    );
    // The create row is the only match, so one ArrowDown reaches it from the field.
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("Enter");
    await page.waitForTimeout(300);
    check((await chips.count()) === 1, `${lang}: choosing the create row adds a chip`);
    check(
      ((await chips.first().textContent()) ?? "").includes(t("Zebra", "زيبرا")),
      `${lang}: the chip is the new tag`,
    );
    await page.keyboard.type(t("Zebra", "زيبرا"));
    await page.waitForTimeout(250);
    check((await create.count()) === 0, `${lang}: no create row once the tag exists`);
    await page.keyboard.press("Escape");

    // Async.
    await open("combobox-async");
    const aInput = page.getByRole("combobox").first();
    await aInput.focus();
    await page.keyboard.type(t("pass", "جواز"));
    await page.waitForTimeout(150);
    check(
      await slot("combobox-loading").isVisible(),
      `${lang}: the loading text shows while loading`,
    );
    await page.waitForTimeout(900);
    check((await page.getByRole("option").count()) === 1, `${lang}: results arrive after loading`);
    check(
      (await slot("combobox-loading").count()) === 0,
      `${lang}: the loading text is gone once results arrive`,
    );
    // Groups.
    await open("combobox-groups");
    await page.getByRole("combobox").first().focus();
    await page.keyboard.press("ArrowDown");
    await page.waitForTimeout(250);
    check((await slot("combobox-label").count()) === 3, `${lang}: three group headings`);
    check((await page.getByRole("option").count()) === 7, `${lang}: seven cities in the groups`);
    await page.keyboard.press("Escape");

    // ---------------------------------------------------------------- Command
    await open("command-basic");
    const cmd = page.getByRole("combobox").first();
    check((await slot("command-item").count()) === 6, `${lang}: six actions are listed`);
    check((await slot("command-group").count()) === 2, `${lang}: two groups`);
    await cmd.focus();
    check(
      (await page.locator("[data-slot=command-item][data-highlighted]").count()) === 1,
      `${lang}: the first action is highlighted`,
    );
    await page.keyboard.press("ArrowDown");
    check(
      (await slot("command-item").nth(1).getAttribute("data-highlighted")) !== null,
      `${lang}: ArrowDown moves the highlight`,
    );
    await page.keyboard.type(t("pay", "سداد"));
    await page.waitForTimeout(250);
    check((await slot("command-item").count()) === 1, `${lang}: typing filters the actions`);
    check(
      (await slot("command-item").first().getAttribute("data-highlighted")) !== null,
      `${lang}: the first match is highlighted as you type`,
    );
    await page.keyboard.press("Enter");
    await page.waitForTimeout(200);
    check(
      ((await page.locator("p[aria-live=polite]").textContent()) ?? "").includes(
        t("Pay a fee", "سداد رسم"),
      ),
      `${lang}: Enter runs the highlighted action`,
    );
    await cmd.fill("");
    await page.keyboard.type(t("go", "الانتقال"));
    await page.waitForTimeout(250);
    check(
      (await slot("command-item").count()) === 1,
      `${lang}: search finds an action by its words`,
    );
    await cmd.fill("");
    await page.waitForTimeout(250);
    // The shortcut sits on the end side and reads left to right.
    const item = slot("command-item").first();
    const label = await item.locator(".cn-command-item-text, span").first().boundingBox();
    const short = await slot("command-shortcut").first().boundingBox();
    check(
      rtl ? short.x < label.x : short.x > label.x,
      `${lang}: the shortcut is on the ${rtl ? "left" : "right"} (end) side`,
    );
    check(
      (await slot("command-shortcut").first().getAttribute("dir")) === "ltr",
      `${lang}: the shortcut reads left to right`,
    );
    // Arabic search variants.
    if (rtl) {
      await cmd.fill("");
      await page.keyboard.type("حسابي");
      await page.waitForTimeout(200);
      check((await slot("command-item").count()) === 1, "ar: search finds حسابي");
    }
    // The disabled action cannot run.
    await open("command-basic");
    await page.getByRole("combobox").first().focus();
    await page.keyboard.type(t("Settings", "الإعدادات"));
    await page.waitForTimeout(250);
    check(
      (await slot("command-item").first().getAttribute("aria-disabled")) === "true",
      `${lang}: a disabled action is aria-disabled`,
    );
    // Empty state.
    await open("command-empty");
    check(
      await slot("command-empty").isVisible(),
      `${lang}: the empty text shows when nothing matches`,
    );
    check(
      ((await slot("command-empty").textContent()) ?? "").includes(t("No commands", "لا توجد")),
      `${lang}: the empty text is in the content language`,
    );
    check((await slot("command-item").count()) === 0, `${lang}: no actions in the empty state`);
    // Dialog.
    await open("command-dialog");
    const trigger = page.getByRole("button").first();
    await trigger.click();
    await page.waitForTimeout(400);
    const dialog = page.getByRole("dialog");
    check(await dialog.isVisible(), `${lang}: the button opens the command dialog`);
    check(
      (await dialog.getAttribute("aria-labelledby")) !== null,
      `${lang}: the dialog has a title`,
    );
    check(await focused(dialog.getByRole("combobox")), `${lang}: focus goes to the search box`);
    await page.keyboard.press("Escape");
    await page.waitForTimeout(400);
    check(!(await dialog.isVisible().catch(() => false)), `${lang}: Escape closes the dialog`);
    check(await focused(trigger), `${lang}: focus returns to the button`);
    await trigger.click();
    await page.waitForTimeout(400);
    await page.keyboard.type(t("home", "الصفحة"));
    await page.waitForTimeout(250);
    await page.keyboard.press("Enter");
    await page.waitForTimeout(400);
    check(
      !(await dialog.isVisible().catch(() => false)),
      `${lang}: running an action closes the dialog`,
    );
    check(
      ((await page.locator("p[aria-live=polite]").textContent()) ?? "").length > 0,
      `${lang}: the action ran`,
    );
    check(await focused(trigger), `${lang}: focus returns to the button after an action`);

    // ---------------------------------------------------------------- Digital Stamp
    await open("digital-stamp-closed");
    const toggle = slot("digital-stamp-toggle");
    const panel = slot("digital-stamp-panel");
    check(
      (await toggle.getAttribute("aria-expanded")) === "false",
      `${lang}: the stamp starts closed`,
    );
    check(!(await panel.isVisible()), `${lang}: the panel is hidden when closed`);
    check(
      (await toggle.getAttribute("aria-controls")) === (await panel.getAttribute("id")),
      `${lang}: the toggle controls the panel`,
    );
    const strip = await slot("digital-stamp").boundingBox();
    check(
      Math.abs(strip.height - 32) <= 1,
      `${lang}: the closed strip is 32px high (${strip.height}px)`,
    );
    await page.keyboard.press("Tab");
    check(await focused(toggle), `${lang}: the toggle is the only tab stop`);
    await page.keyboard.press("Enter");
    await page.waitForTimeout(200);
    check(
      (await toggle.getAttribute("aria-expanded")) === "true",
      `${lang}: Enter opens the panel`,
    );
    check(await panel.isVisible(), `${lang}: the panel shows`);
    check(
      (await panel.locator("[data-slot=digital-stamp-item]").count()) === 2 &&
        (await panel.locator("[data-slot=digital-stamp-registration]").count()) === 1,
      `${lang}: the panel has the domain and HTTPS items and the registration card`,
    );
    check(
      (await panel.locator("bdi[dir=ltr]").first().textContent())?.trim() === ".gov.sa",
      `${lang}: the domain suffix is shown`,
    );
    await page.keyboard.press("Escape");
    await page.waitForTimeout(200);
    check(
      (await toggle.getAttribute("aria-expanded")) === "false",
      `${lang}: Escape closes the panel`,
    );
    check(await focused(toggle), `${lang}: focus stays on the toggle`);
    await page.keyboard.press("Space");
    check((await toggle.getAttribute("aria-expanded")) === "true", `${lang}: Space opens it too`);
    // RTL: the flag and the label start on the right.
    const flag = await slot("digital-stamp").locator("svg").first().boundingBox();
    const bar = await slot("digital-stamp").boundingBox();
    check(
      rtl ? flag.x + flag.width > bar.x + bar.width - 80 : flag.x < bar.x + 80,
      `${lang}: the flag icon starts on the ${rtl ? "right" : "left"}`,
    );
    // Mobile.
    await open("digital-stamp-open", 375);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    check(overflow <= 1, `${lang}: the open stamp fits at 375px (overflow ${overflow})`);
    check(
      (await slot("digital-stamp-panel").locator("[data-slot=digital-stamp-item]").count()) === 2 &&
        (await slot("digital-stamp-panel").isVisible()),
      `${lang}: the panel shows its rows at 375px`,
    );
    // The six domains.
    await open("digital-stamp-domains");
    const suffixes = await page.locator("[data-slot=digital-stamp-domain]").allTextContents();
    check(
      ["gov.sa", "edu.sa", "med.sa", "org.sa", "sch.sa", ".sa"].every(
        (d, i) => suffixes[i]?.trim() === (d.startsWith(".") ? d : `.${d}`),
      ),
      `${lang}: the six domain suffixes show (${suffixes.slice(0, 12).join(" ")})`,
    );
    // In the Header: the stamp is the first thing above the bar.
    await open("header-stamp");
    const stamp = await slot("digital-stamp").boundingBox();
    const headerBar = await page
      .locator(".cn-header-bar, [data-slot=header] > div")
      .last()
      .boundingBox();
    check(stamp.y < headerBar.y, `${lang}: the stamp sits above the Header bar`);
    check(
      (await page.evaluate(() =>
        document.querySelector("[data-slot=header]").firstElementChild?.getAttribute("data-slot"),
      )) === "header-skip",
      `${lang}: the skip link stays the first thing in the Header`,
    );
    await page.keyboard.press("Tab");
    check(
      (await page.evaluate(() => document.activeElement?.getAttribute("data-slot"))) ===
        "header-skip",
      `${lang}: the skip link is still the first tab stop`,
    );
    await page.keyboard.press("Tab");
    check(await focused(slot("digital-stamp-toggle")), `${lang}: then the stamp toggle`);

    // ---------------------------------------------------------------- Purity of every preview
    for (const name of PREVIEWS) {
      await open(name);
      const text = await visibleText(page, lang === "ar" ? "ar" : "en");
      if (!rtl) {
        const found = text.match(new RegExp(`.{0,25}${ARABIC.source}+.{0,25}`));
        check(!found, `preview ${name} ltr: pure en (${found?.[0] ?? ""})`);
      } else {
        const words = [...new Set(latinWords(text))];
        check(words.length === 0, `preview ${name} rtl: pure ar (${words.slice(0, 6).join(", ")})`);
      }
    }

    check(
      issues.length === 0,
      `${lang}: Combobox, Command and Digital Stamp log no errors: ${issues.join(" | ")}`,
    );
    await context.close();
  }
}
