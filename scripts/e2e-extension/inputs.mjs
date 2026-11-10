// Browser checks for the Phase 7 inputs work stream (Slider, Input OTP, Toggle, Toggle Group,
// Input Group, Button Group). Called from scripts/e2e.mjs with the shared helpers.
//   1. Every page fits at 375 and 1280 px in /en and /ar with no console errors; extension pages
//      carry the Extension badge in the header and the sidebar, the Slider (a DGA component) does not.
//   2. Slider: arrows, Home, End and Page Up and Down, in LTR and RTL (the keys mirror, the fill
//      and the thumbs sit on the start side), and a range keeps its thumbs in order.
//   3. Input OTP: typing moves on, Backspace goes back, paste fills every box, Arabic-Indic digits
//      become Western ones, onValueComplete fires, and the boxes run left to right in RTL.
//   3b. Phone Input: the list opens with a code column and a name on each row, search finds a
//      country by either language, the code or the ISO code, an excluded country is gone, typing
//      and pasting set the country and the value, the label focuses the number, in LTR and RTL.
//   4. Toggle Group: roving focus, arrows that follow the direction, single and multiple.
//   5. Every preview of these components is pure in both directions.
import { readFileSync } from "node:fs";

const SLUGS = [
  "slider",
  "input-otp",
  "phone-input",
  "toggle",
  "toggle-group",
  "input-group",
  "button-group",
];
const EXTENSIONS = SLUGS.filter((s) => s !== "slider");

const ALLOWED = new Set(
  JSON.parse(readFileSync(new URL("../locale-allowlist.json", import.meta.url), "utf8")).words.map(
    (w) => w.toLowerCase(),
  ),
);
const ARABIC = /[؀-ٟ٭-ۯۺ-ۿݐ-ݿﭐ-﷿ﹰ-﻿]/;

const visibleText = (page, pageLang) =>
  page.evaluate((pageLang) => {
    // Runs the page marks as another language are the accepted exception (Deviation reasons).
    const skip = `pre,code,kbd,samp,script,style,svg,noscript,.font-mono,[data-skip-purity],a[hreflang],${
      pageLang ? `[lang]:not([lang=${pageLang}])` : "[lang=never]"
    }`;
    const out = [];
    const walk = (node) => {
      if (node.nodeType === 3) return out.push(node.textContent);
      if (node.nodeType !== 1 || node.matches(skip)) return;
      for (const child of node.childNodes) walk(child);
    };
    walk(document.querySelector("main") ?? document.body);
    // Names and placeholders are read by assistive technology too.
    for (const el of (document.querySelector("main") ?? document.body).querySelectorAll(
      "[aria-label],[placeholder]",
    )) {
      out.push(el.getAttribute("aria-label") ?? "", el.getAttribute("placeholder") ?? "");
    }
    return out.join(" ");
  }, pageLang);

const latinWords = (text) =>
  (text.replace(/`[^`]*`/g, " ").match(/[A-Za-z][\w.+-]*/g) ?? []).filter((raw) => {
    const w = raw.replace(/[.-]+$/, "");
    if (w.length < 2 || ALLOWED.has(w.toLowerCase())) return false;
    if (/^[A-Z][a-z0-9]+([A-Z][a-z0-9]*)+$/.test(w) || /^[a-z]+[A-Z]\w*$/.test(w)) return false;
    if (/^[a-z0-9]+(-[a-z0-9]+)+$/.test(w) || /^[a-z0-9-]+(\.[a-z0-9-]+)+$/.test(w)) return false;
    return !(/^v\d/.test(w) || /^[a-f0-9]{6,}$/.test(w) || /^\d/.test(w));
  });

const previewNames = () =>
  [
    ...readFileSync(
      new URL("../../apps/docs/components/previews/ext-inputs.tsx", import.meta.url),
      "utf8",
    ).matchAll(/^\s+"([a-z-]+)": [A-Z]\w+,$/gm),
  ].map((m) => m[1]);

export async function inputsChecks({ browser, BASE, check }) {
  // ------------------------------------------------------------------ pages
  for (const lang of ["en", "ar"]) {
    for (const width of [375, 1280]) {
      const context = await browser.newContext({ viewport: { width, height: 900 } });
      const page = await context.newPage();
      const issues = [];
      page.on("console", (m) => {
        if (m.type() === "error") issues.push(m.text());
      });
      page.on("pageerror", (e) => issues.push(String(e)));
      for (const slug of SLUGS) {
        await page.goto(`${BASE}/${lang}/docs/components/${slug}`, { waitUntil: "networkidle" });
        const overflow = await page.evaluate(
          () => document.documentElement.scrollWidth - window.innerWidth,
        );
        check(overflow <= 1, `${lang} ${slug} @${width}: no sideways scroll (${overflow}px)`);
        const badge = await page
          .locator("main header")
          .getByText(/^(Extension|امتداد)$/)
          .count();
        check(
          badge === (EXTENSIONS.includes(slug) ? 1 : 0),
          `${lang} ${slug}: ${EXTENSIONS.includes(slug) ? "has" : "has no"} Extension badge in the header`,
        );
        if (width === 1280) {
          const pageText = await visibleText(page, lang);
          const bad =
            lang === "en"
              ? (pageText.match(new RegExp(`.{0,25}${ARABIC.source}+.{0,25}`)) ?? []).slice(0, 1)
              : [...new Set(latinWords(pageText))];
          check(bad.length === 0, `${lang} ${slug}: the page is pure ${lang} (${bad.join(", ")})`);
          const note = (await page.locator("main aside").allTextContents()).join(" ");
          check(
            EXTENSIONS.includes(slug)
              ? /(Platform Code extension|امتداد من كود المنصات)/.test(note)
              : !/(Platform Code extension|امتداد من كود المنصات)/.test(note),
            `${lang} ${slug}: the extension note ${EXTENSIONS.includes(slug) ? "is" : "is not"} on the page`,
          );
        }
      }
      check(issues.length === 0, `${lang} @${width}: pages log no errors: ${issues.join(" | ")}`);
      await context.close();
    }
  }

  // ------------------------------------------------------------------ Slider
  for (const dir of ["ltr", "rtl"]) {
    const rtl = dir === "rtl";
    const context = await browser.newContext({ viewport: { width: 1000, height: 800 } });
    const page = await context.newPage();
    await page.goto(`${BASE}/preview/slider-range?dir=${dir}`, { waitUntil: "networkidle" });
    const thumbs = page.locator("input[type=range]");
    check((await thumbs.count()) === 4, `slider ${dir}: two ranges give four thumbs`);
    const first = thumbs.nth(0);
    const second = thumbs.nth(1);
    const x = async (loc) =>
      (await loc.evaluate((el) => el.parentElement.getBoundingClientRect())).x;
    check(
      rtl ? (await x(first)) > (await x(second)) : (await x(first)) < (await x(second)),
      `slider ${dir}: the minimum is on the ${rtl ? "right" : "left"}`,
    );
    const names = await Promise.all([0, 1].map((i) => thumbs.nth(i).getAttribute("aria-label")));
    check(names.every(Boolean), `slider ${dir}: range thumbs have names (${names.join(", ")})`);

    await first.focus();
    const before = Number(await first.inputValue());
    await page.keyboard.press("ArrowRight");
    const afterRight = Number(await first.inputValue());
    check(
      rtl ? afterRight === before - 1 : afterRight === before + 1,
      `slider ${dir}: ArrowRight ${rtl ? "lowers" : "raises"} the value (${before} → ${afterRight})`,
    );
    await page.keyboard.press("ArrowLeft");
    await page.keyboard.press("ArrowLeft");
    const afterLeft = Number(await first.inputValue());
    check(
      rtl ? afterLeft === before + 1 : afterLeft === before - 1,
      `slider ${dir}: ArrowLeft ${rtl ? "raises" : "lowers"} the value (${afterLeft})`,
    );
    await page.keyboard.press("ArrowUp");
    check(
      Number(await first.inputValue()) === afterLeft + 1,
      `slider ${dir}: ArrowUp raises the value`,
    );
    await page.keyboard.press("Home");
    check(Number(await first.inputValue()) === 0, `slider ${dir}: Home goes to the minimum`);
    await page.keyboard.press("PageUp");
    check(Number(await first.inputValue()) === 10, `slider ${dir}: Page Up adds the large step`);
    await page.keyboard.press("PageDown");
    check(Number(await first.inputValue()) === 0, `slider ${dir}: Page Down subtracts it`);
    await page.keyboard.press("End");
    const stopped = Number(await first.inputValue());
    const secondValue = Number(await second.inputValue());
    check(
      stopped <= secondValue,
      `slider ${dir}: the first thumb stops at the second (${stopped} <= ${secondValue})`,
    );
    await second.focus();
    await page.keyboard.press("End");
    check(Number(await second.inputValue()) === 100, `slider ${dir}: End goes to the maximum`);
    // The fill is the part between the thumbs; the maximum is on the end side.
    const fill = page.locator("[data-slot=slider-indicator]").first();
    const fillBox = await fill.boundingBox();
    const trackBox = await page.locator("[data-slot=slider-track]").first().boundingBox();
    check(
      rtl
        ? Math.abs(fillBox.x - trackBox.x) <= 2
        : Math.abs(fillBox.x + fillBox.width - (trackBox.x + trackBox.width)) <= 2,
      `slider ${dir}: with the maximum at 100 the fill reaches the ${rtl ? "left" : "right"} end`,
    );
    // Pointer: clicking the track moves the nearest thumb to that spot, from the start side.
    await page.goto(`${BASE}/preview/slider-states?dir=${dir}`, { waitUntil: "networkidle" });
    const single = page.locator("input[type=range]").first();
    const track2 = await page.locator("[data-slot=slider-track]").first().boundingBox();
    await page.mouse.click(track2.x + track2.width * 0.9, track2.y + track2.height / 2);
    const clicked = Number(await single.inputValue());
    check(
      rtl ? clicked < 40 : clicked > 60,
      `slider ${dir}: clicking 90% along the track gives ${rtl ? "a low" : "a high"} value (${clicked})`,
    );
    await context.close();
  }

  // ------------------------------------------------------------------ Input OTP
  for (const dir of ["ltr", "rtl"]) {
    const context = await browser.newContext({ viewport: { width: 1000, height: 800 } });
    const page = await context.newPage();
    await page.goto(`${BASE}/preview/input-otp-basic?dir=${dir}`, { waitUntil: "networkidle" });
    await context.grantPermissions([]).catch(() => {});
    const boxes = page.locator("[data-slot=input-otp-input]");
    check((await boxes.count()) === 6, `otp ${dir}: six boxes`);
    const xs = [];
    for (let i = 0; i < 6; i++) xs.push((await boxes.nth(i).boundingBox()).x);
    check(
      xs.every((v, i) => i === 0 || v > (xs[i - 1] ?? 0)),
      `otp ${dir}: the boxes run left to right (${xs.map((v) => Math.round(v)).join(", ")})`,
    );
    const attrs = await boxes.first().evaluate((el) => ({
      mode: el.getAttribute("inputmode"),
      ac: el.getAttribute("autocomplete"),
      label: el.ownerDocument
        .querySelectorAll("[data-slot=input-otp-input]")[1]
        .getAttribute("aria-label"),
    }));
    check(attrs.mode === "numeric", `otp ${dir}: numeric keyboard (${attrs.mode})`);
    check(attrs.ac === "one-time-code", `otp ${dir}: one-time-code autofill (${attrs.ac})`);
    check(
      /[0-9٠-٩]/.test(attrs.label ?? ""),
      `otp ${dir}: the other boxes have names (${attrs.label})`,
    );
    const value = async () =>
      (await boxes.evaluateAll((els) => els.map((el) => el.value))).join("");
    await boxes.first().focus();
    await page.keyboard.type("123");
    check((await value()) === "123", `otp ${dir}: typing fills the boxes (${await value()})`);
    check(
      (await boxes.nth(3).evaluate((el) => el === document.activeElement)) === true,
      `otp ${dir}: focus moves to the next box`,
    );
    await page.keyboard.press("Backspace");
    check(
      (await value()) === "12",
      `otp ${dir}: Backspace goes back and clears (${await value()})`,
    );
    await page.keyboard.insertText("٣");
    check(
      (await value()) === "123",
      `otp ${dir}: an Arabic-Indic digit becomes a Western one (${await value()})`,
    );
    // Paste a whole code.
    await boxes.first().focus();
    await page.evaluate(() => {
      const data = new DataTransfer();
      data.setData("text/plain", "٤٥٦٧٨٩");
      document.activeElement.dispatchEvent(
        new ClipboardEvent("paste", { clipboardData: data, bubbles: true, cancelable: true }),
      );
    });
    await page.waitForTimeout(150);
    check((await value()) === "456789", `otp ${dir}: paste fills every box (${await value()})`);
    await context.close();
  }
  {
    const context = await browser.newContext({ viewport: { width: 1000, height: 800 } });
    const page = await context.newPage();
    await page.goto(`${BASE}/preview/input-otp-verify?dir=ltr`, { waitUntil: "networkidle" });
    const boxes = page.locator("[data-slot=input-otp-input]");
    await boxes.first().focus();
    await page.keyboard.type("1234");
    await page.waitForTimeout(150);
    check(
      /Code entered/.test((await page.locator("[role=status]").textContent()) ?? ""),
      "otp: onValueComplete fires when the code is full",
    );
    await context.close();
  }

  // ------------------------------------------------------------------ Phone Input
  for (const dir of ["ltr", "rtl"]) {
    const rtl = dir === "rtl";
    const context = await browser.newContext({ viewport: { width: 800, height: 800 } });
    const page = await context.newPage();
    const issues = [];
    page.on("pageerror", (e) => issues.push(String(e)));
    await page.goto(`${BASE}/preview/phone-input-countries?dir=${dir}`, {
      waitUntil: "networkidle",
    });
    const boxes = page.locator("[data-slot=phone-input]");
    // The second box excludes the United States and Canada.
    const box = boxes.nth(1);
    const button = box.locator("[data-slot=phone-country]");
    const number = box.locator("input[type=tel]");
    check((await button.innerText()).trim() === "+966", `phone ${dir}: the button shows the code`);
    const xs = await page.evaluate(() => {
      const b = document.querySelectorAll("[data-slot=phone-input]")[1];
      return [
        b.querySelector("[data-slot=phone-country]").getBoundingClientRect().x,
        b.querySelector("input[type=tel]").getBoundingClientRect().x,
      ];
    });
    check(rtl ? xs[0] > xs[1] : xs[0] < xs[1], `phone ${dir}: the country is on the start side`);
    check(
      (await number.getAttribute("dir")) === "ltr" && (await number.getAttribute("type")) === "tel",
      `phone ${dir}: the number is left to right and a tel field`,
    );
    await button.click();
    await page.waitForSelector("[data-slot=phone-item]");
    const items = page.locator("[data-slot=phone-item]");
    const all = await items.allInnerTexts();
    check(all.length > 200, `phone ${dir}: every country is listed (${all.length})`);
    check(
      !all.some((t) => /United States|Canada|الولايات المتحدة|كندا/.test(t)),
      `phone ${dir}: excluded countries are not listed`,
    );
    const rows = await page.evaluate(() =>
      [...document.querySelectorAll("[data-slot=phone-item]")].slice(0, 12).map((row) => {
        const dial = row.querySelector(".cn-phone-item-dial, bdi").getBoundingClientRect();
        const name = row.querySelector("span:not([aria-hidden])").getBoundingClientRect();
        return { w: Math.round(dial.width), sameLine: Math.abs(dial.top - name.top) < 8 };
      }),
    );
    check(
      new Set(rows.map((r) => r.w)).size === 1 && rows.every((r) => r.sameLine),
      `phone ${dir}: the code column has one width and the name is on the same line`,
    );
    for (const [query, expected] of [
      ["egypt", "+20"],
      ["مصر", "+20"],
      ["EG", "+20"],
      ["+971", "+971"],
      ["0966", "+966"],
    ]) {
      await page.keyboard.press("Control+a");
      await page.keyboard.type(query);
      await page.waitForTimeout(150);
      const texts = await items.allInnerTexts();
      check(
        texts.some((t) => t.startsWith(expected)),
        `phone ${dir}: searching "${query}" finds ${expected} (${texts.slice(0, 3).join(" / ").replace(/\n/g, " ")})`,
      );
    }
    await page.keyboard.press("Control+a");
    await page.keyboard.type("united states");
    await page.waitForTimeout(150);
    check((await items.count()) === 0, `phone ${dir}: an excluded country is not found`);
    await page.keyboard.press("Control+a");
    await page.keyboard.type("egypt");
    await page.waitForTimeout(150);
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("Enter");
    await page.waitForTimeout(200);
    check((await button.innerText()).trim() === "+20", `phone ${dir}: Enter chooses the country`);
    check(
      (await page.evaluate(() => document.activeElement?.getAttribute("type"))) === "tel",
      `phone ${dir}: focus returns to the number`,
    );
    await number.fill("");
    await number.pressSequentially("٠١٠٠١٢٣٤٥٦٧");
    check(
      (await number.inputValue()) === "100 123 4567",
      `phone ${dir}: Arabic-Indic digits become Western and the leading 0 goes (${await number.inputValue()})`,
    );
    await number.fill("+966501234567");
    check(
      (await button.innerText()).trim() === "+966" && (await number.inputValue()) === "50 123 4567",
      `phone ${dir}: a pasted + number picks its country (${await number.inputValue()})`,
    );
    await number.fill("+12125551234");
    check(
      (await button.innerText()).trim() === "+966",
      `phone ${dir}: an excluded code is not recognised`,
    );
    check(issues.length === 0, `phone ${dir}: no errors (${issues.join("; ")})`);
    await context.close();
  }
  {
    // The form example: the value, the label and the touched error.
    const context = await browser.newContext({ viewport: { width: 800, height: 800 } });
    const page = await context.newPage();
    await page.goto(`${BASE}/preview/phone-input-form?dir=ltr`, { waitUntil: "networkidle" });
    await page.locator("label").first().click();
    check(
      (await page.evaluate(() => document.activeElement?.getAttribute("type"))) === "tel",
      "phone: the label focuses the number",
    );
    const number = page.locator("input[type=tel]");
    await number.pressSequentially("0512345678");
    check(
      ((await page.locator("p bdi").textContent()) ?? "").trim() === "+966512345678",
      "phone: the value is the international number",
    );
    await number.fill("5123");
    await page.locator("[data-slot=phone-country]").focus();
    await page.waitForTimeout(150);
    check(
      (await number.getAttribute("aria-invalid")) === "true",
      "phone: a short number is marked invalid after leaving the field",
    );
    await context.close();
  }

  // ------------------------------------------------------------------ Toggle Group
  for (const dir of ["ltr", "rtl"]) {
    const rtl = dir === "rtl";
    const context = await browser.newContext({ viewport: { width: 1000, height: 800 } });
    const page = await context.newPage();
    await page.goto(`${BASE}/preview/toggle-group-single?dir=${dir}`, { waitUntil: "networkidle" });
    const group = page.locator("[data-slot=toggle-group]").first();
    const items = group.locator("[data-slot=toggle]");
    const xs = [];
    for (let i = 0; i < 3; i++) xs.push((await items.nth(i).boundingBox()).x);
    check(
      rtl ? xs[0] > xs[1] && xs[1] > xs[2] : xs[0] < xs[1] && xs[1] < xs[2],
      `toggle group ${dir}: the first item is on the ${rtl ? "right" : "left"}`,
    );
    check(
      (await items.nth(0).getAttribute("aria-pressed")) === "true",
      `toggle group ${dir}: the default item is pressed`,
    );
    // One item is in the tab order.
    const tabbable = await items.evaluateAll((els) => els.filter((e) => e.tabIndex === 0).length);
    check(tabbable === 1, `toggle group ${dir}: one item is in the tab order (${tabbable})`);
    await items.nth(0).focus();
    await page.keyboard.press(rtl ? "ArrowLeft" : "ArrowRight");
    check(
      (await items.nth(1).evaluate((el) => el === document.activeElement)) === true,
      `toggle group ${dir}: ${rtl ? "ArrowLeft" : "ArrowRight"} moves to the next item`,
    );
    await page.keyboard.press(rtl ? "ArrowRight" : "ArrowLeft");
    check(
      (await items.nth(0).evaluate((el) => el === document.activeElement)) === true,
      `toggle group ${dir}: ${rtl ? "ArrowRight" : "ArrowLeft"} moves back`,
    );
    await page.keyboard.press(rtl ? "ArrowLeft" : "ArrowRight");
    await page.keyboard.press("Space");
    check(
      (await items.nth(1).getAttribute("aria-pressed")) === "true" &&
        (await items.nth(0).getAttribute("aria-pressed")) === "false",
      "toggle group: pressing another item releases the first in single mode",
    );
    await page.keyboard.press("Space");
    check(
      (await items.nth(1).getAttribute("aria-pressed")) === "false",
      "toggle group: pressing the pressed item releases it",
    );

    await page.goto(`${BASE}/preview/toggle-group-multiple?dir=${dir}`, {
      waitUntil: "networkidle",
    });
    const multi = page.locator("[data-slot=toggle-group]").first().locator("[data-slot=toggle]");
    check(
      (await multi.nth(0).getAttribute("aria-pressed")) === "true" &&
        (await multi.nth(2).getAttribute("aria-pressed")) === "true",
      `toggle group ${dir}: multiple keeps several pressed`,
    );
    await multi.nth(1).click();
    check(
      (await multi.evaluateAll((els) => els.filter((e) => e.ariaPressed === "true").length)) === 3,
      `toggle group ${dir}: pressing a third item keeps the others`,
    );
    await context.close();
  }

  // ------------------------------------------------------------------ Toggle
  {
    const context = await browser.newContext({ viewport: { width: 1000, height: 800 } });
    const page = await context.newPage();
    await page.goto(`${BASE}/preview/toggle-variants?dir=ltr`, { waitUntil: "networkidle" });
    const toggle = page.locator("[data-slot=toggle]").first();
    check((await toggle.getAttribute("aria-pressed")) === "false", "toggle: off at first");
    await toggle.focus();
    await page.keyboard.press("Enter");
    check((await toggle.getAttribute("aria-pressed")) === "true", "toggle: Enter presses it");
    await page.keyboard.press("Space");
    check((await toggle.getAttribute("aria-pressed")) === "false", "toggle: Space releases it");
    await context.close();
  }

  // ------------------------------------------------------------------ previews are pure
  const names = previewNames();
  check(names.length >= 18, `inputs: every preview is listed (${names.length})`);
  const context = await browser.newContext({ viewport: { width: 1000, height: 800 } });
  const page = await context.newPage();
  const issues = [];
  page.on("console", (m) => {
    if (m.type() === "error") issues.push(`${m.text()}`);
  });
  page.on("pageerror", (e) => issues.push(String(e)));
  for (const name of names) {
    for (const dir of ["ltr", "rtl"]) {
      const contentLang = dir === "rtl" ? "ar" : "en";
      await page.goto(`${BASE}/preview/${name}?dir=${dir}`, { waitUntil: "networkidle" });
      const state = await page.evaluate(() => ({
        lang: document.documentElement.lang,
        dir: document.documentElement.dir,
      }));
      check(
        state.dir === dir && state.lang === contentLang,
        `preview ${name} ${dir}: lang ${contentLang} (got ${state.lang})`,
      );
      const text = await visibleText(page);
      const bad =
        contentLang === "en"
          ? (text.match(new RegExp(`.{0,25}${ARABIC.source}+.{0,25}`)) ?? []).slice(0, 1)
          : [...new Set(latinWords(text))];
      check(bad.length === 0, `preview ${name} ${dir}: pure ${contentLang} (${bad.join(", ")})`);
    }
  }
  check(issues.length === 0, `inputs previews log no errors: ${issues.join(" | ")}`);
  await context.close();
}
