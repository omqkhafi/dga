// Phone Input (0.7.9): the country data and number logic, the registry entry and the source rules.
// Behaviour in the browser (the list, the caret, paste) is checked by scripts/e2e-extension/inputs.mjs.
import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import {
  countryName,
  detectCountry,
  digitsOf,
  filterCountries,
  formatNational,
  getCountry,
  getPhoneDetails,
  maxNationalDigits,
  PHONE_COUNTRIES,
  parsePhone,
  stripTrunkPrefix,
} from "../registry/bases/base/lib/phone";

const read = (path: string) => readFileSync(path, "utf8");
const sa = getCountry("SA");
if (!sa) throw new Error("SA is missing");

describe("country data", () => {
  test("every country has a unique ISO code and a numeric calling code", () => {
    const isos = PHONE_COUNTRIES.map((c) => c.iso);
    expect(new Set(isos).size).toBe(isos.length);
    for (const c of PHONE_COUNTRIES) {
      expect(c.iso).toMatch(/^[A-Z]{2}$/);
      expect(c.dial).toMatch(/^[1-9]\d{0,3}$/);
      expect(c.length[0]).toBeLessThanOrEqual(c.length[1]);
      expect(c.dial.length + c.length[1]).toBeLessThanOrEqual(15);
    }
  });

  test("it covers the world: at least 240 countries and territories", () => {
    expect(PHONE_COUNTRIES.length).toBeGreaterThanOrEqual(240);
    for (const iso of ["SA", "AE", "EG", "US", "GB", "IN", "CN", "BR", "ZA", "AU", "JP", "XK"]) {
      expect(getCountry(iso)).toBeDefined();
    }
  });

  test("every country has a name in English and Arabic", () => {
    for (const c of PHONE_COUNTRIES) {
      expect(countryName(c.iso, "en")).not.toBe(c.iso);
      expect(countryName(c.iso, "ar")).not.toBe(c.iso);
    }
    expect(countryName("SA", "ar")).toBe("المملكة العربية السعودية");
  });
});

describe("filtering", () => {
  test("exclude removes countries, only keeps a set, both together", () => {
    expect(filterCountries({ exclude: ["US", "ca"] }).some((c) => c.iso === "US")).toBe(false);
    expect(filterCountries({ exclude: ["US", "ca"] }).some((c) => c.iso === "CA")).toBe(false);
    expect(
      filterCountries({ only: ["SA", "AE"] })
        .map((c) => c.iso)
        .sort(),
    ).toEqual(["AE", "SA"]);
    expect(filterCountries({ only: ["SA", "AE"], exclude: ["AE"] }).map((c) => c.iso)).toEqual([
      "SA",
    ]);
  });
});

describe("detecting the country", () => {
  test("longest calling code wins", () => {
    expect(detectCountry("966512345678")?.country.iso).toBe("SA");
    expect(detectCountry("971501234567")?.country.iso).toBe("AE");
    expect(detectCountry("201001234567")?.country.iso).toBe("EG");
  });

  test("shared codes go by area code, then by the main country", () => {
    expect(detectCountry("16845551234")?.country.iso).toBe("AS");
    expect(detectCountry("14165551234")?.country.iso).toBe("CA");
    expect(detectCountry("12125551234")?.country.iso).toBe("US");
    expect(detectCountry("447911123456")?.country.iso).toBe("GB");
    expect(detectCountry("77011234567")?.country.iso).toBe("KZ");
    expect(detectCountry("79161234567")?.country.iso).toBe("RU");
  });

  test("excluded countries are not recognised", () => {
    const among = filterCountries({ exclude: ["SA"] });
    expect(detectCountry("966512345678", among)).toBeUndefined();
  });

  test("an unknown area code of +1 is not guessed when the main country is left out", () => {
    const among = filterCountries({ exclude: ["US", "CA"] });
    expect(detectCountry("12125551234", among)).toBeUndefined();
    expect(detectCountry("18765551234", among)?.country.iso).toBe("JM");
  });
});

describe("reading a number", () => {
  test("international forms give the same result", () => {
    for (const text of [
      "+966 51 234 5678",
      "00966512345678",
      "+966-(51)-2345678",
      "+٩٦٦٥١٢٣٤٥٦٧٨",
    ]) {
      const d = parsePhone(text);
      expect(d.country).toBe("SA");
      expect(d.national).toBe("512345678");
      expect(d.e164).toBe("+966512345678");
    }
  });

  test("a national number uses the fallback country and drops the leading 0", () => {
    expect(parsePhone("0512345678", "SA").e164).toBe("+966512345678");
    expect(parsePhone("512345678", "SA").e164).toBe("+966512345678");
  });

  test("digits: Arabic-Indic and Persian become Western, the rest is dropped", () => {
    expect(digitsOf("٠٥ ١٢٣-۴۵۶")).toBe("05123456");
  });

  test("the trunk prefix is dropped except where it is part of the number", () => {
    expect(stripTrunkPrefix(sa, "0512345678")).toBe("512345678");
    expect(stripTrunkPrefix(getCountry("IT") ?? sa, "0612345678")).toBe("0612345678");
    expect(stripTrunkPrefix(getCountry("US") ?? sa, "12125551234")).toBe("2125551234");
  });
});

describe("details", () => {
  test("length decides whether a number is possible", () => {
    expect(getPhoneDetails("SA", "512345678").isPossible).toBe(true);
    expect(getPhoneDetails("SA", "51234567").isPossible).toBe(false);
    expect(getPhoneDetails("SA", "5123456789").isPossible).toBe(false);
    expect(getPhoneDetails("SA", "").e164).toBe("");
  });

  test("grouping follows the pattern and continues past it in threes", () => {
    expect(formatNational(sa, "512345678")).toBe("51 234 5678");
    expect(formatNational(sa, "5123")).toBe("51 23");
    expect(formatNational(sa, "51234567890")).toBe("51 234 5678 90");
    expect(formatNational(getCountry("US") ?? sa, "2125551234")).toBe("212 555 1234");
  });

  test("a national number never passes 15 digits with its code", () => {
    for (const c of PHONE_COUNTRIES) {
      expect(c.dial.length + maxNationalDigits(c)).toBeLessThanOrEqual(15);
    }
  });
});

describe("registry and source", () => {
  type Item = { name: string; registryDependencies?: string[]; dependencies?: string[] };
  const registry = JSON.parse(read("registry/registry.json")) as { items: Item[] };
  const item = (name: string) => registry.items.find((i) => i.name === name);
  const ref = (name: string) => `{{REGISTRY_URL}}/r/${name}.json`;

  test("phone-input depends on the items it imports and on no new package", () => {
    const entry = item("phone-input");
    const source = read("registry/bases/base/ui/phone-input.tsx");
    for (const [, name] of source.matchAll(/from "@\/components\/dga\/([\w-]+)"/g)) {
      expect(entry?.registryDependencies).toContain(ref(name as string));
    }
    for (const [, name] of source.matchAll(/from "@\/lib\/dga\/([\w-]+)"/g)) {
      expect(entry?.registryDependencies).toContain(ref(name as string));
    }
    for (const dep of entry?.dependencies ?? []) {
      expect([
        "@base-ui/react",
        "class-variance-authority",
        "@hugeicons/react",
        "@hugeicons/core-free-icons",
      ]).toContain(dep);
    }
    expect(item("phone")).toBeDefined();
  });

  test("the logic file has no imports at all", () => {
    expect(read("registry/bases/base/lib/phone.ts")).not.toMatch(/^import /m);
  });

  test("the number is left to right, numeric and telephone typed", () => {
    const source = read("registry/bases/base/ui/phone-input.tsx");
    expect(source).toContain('dir="ltr"');
    expect(source).toContain('type="tel"');
    expect(source).toContain('inputMode="tel"');
    expect(source).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
    expect(source).toMatch(/cn-phone/);
  });

  test("it is listed as an extension and in the forms section", () => {
    expect(read("apps/docs/lib/extension-slugs.ts")).toContain('"phone-input"');
    expect(read("apps/docs/lib/component-sections.ts")).toContain('"phone-input"');
    expect(read("apps/docs/lib/extensions.ts")).toContain('slug: "phone-input"');
  });

  test("the page exists in both languages", () => {
    expect(read("apps/docs/content/docs/components/phone-input.mdx")).toContain("<ApiReference");
    expect(read("apps/docs/content/docs/components/phone-input.ar.mdx")).toContain("sourceHash:");
  });
});
