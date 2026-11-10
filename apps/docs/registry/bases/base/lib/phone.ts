// The data and the logic behind PhoneInput. No React and no packages, so it also runs on a server
// and in tests. Country names are not stored: they come from `Intl.DisplayNames` in any language.

/** One country. `dial` is the calling code without the plus sign. */
type PhoneCountry = {
  /** ISO 3166-1 alpha-2 code, upper case (`SA`). */
  iso: string;
  /** Country calling code without `+` (`966`). */
  dial: string;
  /** Shortest and longest national number, in digits, without the trunk prefix. */
  length: [min: number, max: number];
  /** Pattern of a typical number. `X` is a digit; spaces mark the groups (`5X XXX XXXX`). */
  pattern: string;
};

const DEFAULT_LENGTH: [number, number] = [6, 12];

/**
 * [ISO, calling code, length range, pattern]. A missing range means 6 to 12 digits, a missing
 * pattern means the digits are grouped by three. The ranges and patterns are the ones people
 * dial; they check the length, not whether the operator has issued that prefix.
 */
const DATA: [string, string, [number, number]?, string?][] = [
  ["AF", "93", [9, 9], "7X XXX XXXX"],
  ["AL", "355", [8, 9]],
  ["DZ", "213", [9, 9], "5XX XX XX XX"],
  ["AS", "1", [10, 10], "XXX XXX XXXX"],
  ["AD", "376", [6, 9]],
  ["AO", "244", [9, 9], "9XX XXX XXX"],
  ["AI", "1", [10, 10], "XXX XXX XXXX"],
  ["AG", "1", [10, 10], "XXX XXX XXXX"],
  ["AR", "54", [10, 11]],
  ["AM", "374", [8, 8], "XX XXX XXX"],
  ["AW", "297", [7, 7], "XXX XXXX"],
  ["AU", "61", [9, 9], "4XX XXX XXX"],
  ["AT", "43", [10, 13]],
  ["AZ", "994", [9, 9], "XX XXX XX XX"],
  ["BS", "1", [10, 10], "XXX XXX XXXX"],
  ["BH", "973", [8, 8], "XXXX XXXX"],
  ["BD", "880", [10, 10], "1X XXXX XXXX"],
  ["BB", "1", [10, 10], "XXX XXX XXXX"],
  ["BY", "375", [9, 9], "XX XXX XX XX"],
  ["BE", "32", [8, 9]],
  ["BZ", "501", [7, 7], "XXX XXXX"],
  ["BJ", "229", [8, 10]],
  ["BM", "1", [10, 10], "XXX XXX XXXX"],
  ["BT", "975", [7, 8]],
  ["BO", "591", [8, 8], "XXXX XXXX"],
  ["BA", "387", [8, 9]],
  ["BW", "267", [7, 8]],
  ["BR", "55", [10, 11], "XX XXXXX XXXX"],
  ["IO", "246", [7, 7]],
  ["VG", "1", [10, 10], "XXX XXX XXXX"],
  ["BN", "673", [7, 7], "XXX XXXX"],
  ["BG", "359", [8, 9]],
  ["BF", "226", [8, 8], "XX XX XX XX"],
  ["BI", "257", [8, 8], "XX XX XXXX"],
  ["KH", "855", [8, 9]],
  ["CM", "237", [9, 9], "X XX XX XX XX"],
  ["CA", "1", [10, 10], "XXX XXX XXXX"],
  ["CV", "238", [7, 7], "XXX XXXX"],
  ["BQ", "599", [7, 7], "XXX XXXX"],
  ["KY", "1", [10, 10], "XXX XXX XXXX"],
  ["CF", "236", [8, 8], "XX XX XX XX"],
  ["TD", "235", [8, 8], "XX XX XX XX"],
  ["CL", "56", [9, 9], "X XXXX XXXX"],
  ["CN", "86", [11, 11], "1XX XXXX XXXX"],
  ["CX", "61", [9, 9]],
  ["CC", "61", [9, 9]],
  ["CO", "57", [10, 10], "3XX XXX XXXX"],
  ["KM", "269", [7, 7], "XXX XXXX"],
  ["CG", "242", [9, 9]],
  ["CD", "243", [9, 9], "XXX XXX XXX"],
  ["CK", "682", [5, 5]],
  ["CR", "506", [8, 8], "XXXX XXXX"],
  ["CI", "225", [8, 10]],
  ["HR", "385", [8, 9]],
  ["CU", "53", [8, 8], "X XXX XXXX"],
  ["CW", "599", [7, 8]],
  ["CY", "357", [8, 8], "XX XXXXXX"],
  ["CZ", "420", [9, 9], "XXX XXX XXX"],
  ["DK", "45", [8, 8], "XX XX XX XX"],
  ["DJ", "253", [8, 8], "XX XX XX XX"],
  ["DM", "1", [10, 10], "XXX XXX XXXX"],
  ["DO", "1", [10, 10], "XXX XXX XXXX"],
  ["EC", "593", [9, 9], "XX XXX XXXX"],
  ["EG", "20", [10, 10], "1XX XXX XXXX"],
  ["SV", "503", [8, 8], "XXXX XXXX"],
  ["GQ", "240", [9, 9]],
  ["ER", "291", [7, 7], "X XXX XXX"],
  ["EE", "372", [7, 8]],
  ["SZ", "268", [8, 8], "XXXX XXXX"],
  ["ET", "251", [9, 9], "XX XXX XXXX"],
  ["FK", "500", [5, 5]],
  ["FO", "298", [6, 6]],
  ["FJ", "679", [7, 7], "XXX XXXX"],
  ["FI", "358", [5, 12]],
  ["FR", "33", [9, 9], "X XX XX XX XX"],
  ["GF", "594", [9, 9]],
  ["PF", "689", [8, 8], "XX XX XX XX"],
  ["GA", "241", [7, 8]],
  ["GM", "220", [7, 7], "XXX XXXX"],
  ["GE", "995", [9, 9], "XXX XX XX XX"],
  ["DE", "49", [10, 11], "1XX XXXXXXXX"],
  ["GH", "233", [9, 9], "XX XXX XXXX"],
  ["GI", "350", [8, 8], "XXXX XXXX"],
  ["GR", "30", [10, 10], "XXX XXX XXXX"],
  ["GL", "299", [6, 6]],
  ["GD", "1", [10, 10], "XXX XXX XXXX"],
  ["GP", "590", [9, 9]],
  ["GU", "1", [10, 10], "XXX XXX XXXX"],
  ["GT", "502", [8, 8], "XXXX XXXX"],
  ["GG", "44", [10, 10]],
  ["GN", "224", [9, 9], "XXX XX XX XX"],
  ["GW", "245", [7, 9]],
  ["GY", "592", [7, 7], "XXX XXXX"],
  ["HT", "509", [8, 8], "XX XX XXXX"],
  ["HN", "504", [8, 8], "XXXX XXXX"],
  ["HK", "852", [8, 8], "XXXX XXXX"],
  ["HU", "36", [8, 9]],
  ["IS", "354", [7, 9], "XXX XXXX"],
  ["IN", "91", [10, 10], "XXXXX XXXXX"],
  ["ID", "62", [9, 12], "8XX XXXX XXXX"],
  ["IR", "98", [10, 10], "9XX XXX XXXX"],
  ["IQ", "964", [10, 10], "7XX XXX XXXX"],
  ["IE", "353", [7, 9]],
  ["IM", "44", [10, 10]],
  ["IL", "972", [8, 9], "5X XXX XXXX"],
  ["IT", "39", [6, 11], "3XX XXX XXXX"],
  ["JM", "1", [10, 10], "XXX XXX XXXX"],
  ["JP", "81", [9, 10], "XX XXXX XXXX"],
  ["JE", "44", [10, 10]],
  ["JO", "962", [8, 9], "7 XXXX XXXX"],
  ["KZ", "7", [10, 10], "XXX XXX XXXX"],
  ["KE", "254", [9, 9], "7XX XXX XXX"],
  ["KI", "686", [5, 8]],
  ["XK", "383", [8, 9]],
  ["KW", "965", [8, 8], "XXXX XXXX"],
  ["KG", "996", [9, 9], "XXX XXX XXX"],
  ["LA", "856", [8, 10]],
  ["LV", "371", [8, 8], "XX XXX XXX"],
  ["LB", "961", [7, 8], "XX XXX XXX"],
  ["LS", "266", [8, 8], "XXXX XXXX"],
  ["LR", "231", [7, 9]],
  ["LY", "218", [9, 10], "9X XXX XXXX"],
  ["LI", "423", [7, 9]],
  ["LT", "370", [8, 8], "XXX XXXXX"],
  ["LU", "352", [4, 11]],
  ["MO", "853", [8, 8], "XXXX XXXX"],
  ["MG", "261", [9, 10], "XX XX XXX XX"],
  ["MW", "265", [7, 9]],
  ["MY", "60", [9, 10], "1X XXXX XXXX"],
  ["MV", "960", [7, 7], "XXX XXXX"],
  ["ML", "223", [8, 8], "XX XX XX XX"],
  ["MT", "356", [8, 8], "XXXX XXXX"],
  ["MH", "692", [7, 7], "XXX XXXX"],
  ["MQ", "596", [9, 9]],
  ["MR", "222", [8, 8], "XX XX XX XX"],
  ["MU", "230", [7, 8], "XXXX XXXX"],
  ["YT", "262", [9, 9]],
  ["MX", "52", [10, 10], "XX XXXX XXXX"],
  ["FM", "691", [7, 7], "XXX XXXX"],
  ["MD", "373", [8, 8], "XX XXX XXX"],
  ["MC", "377", [8, 9]],
  ["MN", "976", [8, 8], "XXXX XXXX"],
  ["ME", "382", [8, 9]],
  ["MS", "1", [10, 10], "XXX XXX XXXX"],
  ["MA", "212", [9, 9], "6XX XX XX XX"],
  ["MZ", "258", [8, 9]],
  ["MM", "95", [7, 10]],
  ["NA", "264", [8, 10]],
  ["NR", "674", [7, 7], "XXX XXXX"],
  ["NP", "977", [8, 10], "9XX XXX XXXX"],
  ["NL", "31", [9, 9], "6 XXXX XXXX"],
  ["NC", "687", [6, 6], "XX XX XX"],
  ["NZ", "64", [8, 10]],
  ["NI", "505", [8, 8], "XXXX XXXX"],
  ["NE", "227", [8, 8], "XX XX XX XX"],
  ["NG", "234", [10, 10], "XXX XXX XXXX"],
  ["NU", "683", [4, 4]],
  ["NF", "672", [6, 6]],
  ["KP", "850", [8, 10]],
  ["MK", "389", [8, 8], "XX XXX XXX"],
  ["MP", "1", [10, 10], "XXX XXX XXXX"],
  ["NO", "47", [8, 8], "XXX XX XXX"],
  ["OM", "968", [8, 8], "XXXX XXXX"],
  ["PK", "92", [10, 10], "3XX XXXXXXX"],
  ["PW", "680", [7, 7], "XXX XXXX"],
  ["PS", "970", [9, 9], "5X XXX XXXX"],
  ["PA", "507", [7, 8]],
  ["PG", "675", [7, 8]],
  ["PY", "595", [9, 9], "XXX XXX XXX"],
  ["PE", "51", [9, 9], "XXX XXX XXX"],
  ["PH", "63", [10, 10], "9XX XXX XXXX"],
  ["PL", "48", [9, 9], "XXX XXX XXX"],
  ["PT", "351", [9, 9], "XXX XXX XXX"],
  ["PR", "1", [10, 10], "XXX XXX XXXX"],
  ["QA", "974", [8, 8], "XXXX XXXX"],
  ["RE", "262", [9, 9]],
  ["RO", "40", [9, 9], "XXX XXX XXX"],
  ["RU", "7", [10, 10], "XXX XXX XX XX"],
  ["RW", "250", [9, 9], "XXX XXX XXX"],
  ["BL", "590", [9, 9]],
  ["SH", "290", [4, 5]],
  ["KN", "1", [10, 10], "XXX XXX XXXX"],
  ["LC", "1", [10, 10], "XXX XXX XXXX"],
  ["MF", "590", [9, 9]],
  ["PM", "508", [6, 6]],
  ["VC", "1", [10, 10], "XXX XXX XXXX"],
  ["WS", "685", [5, 7]],
  ["SM", "378", [6, 10]],
  ["ST", "239", [7, 7], "XXX XXXX"],
  ["SA", "966", [9, 9], "5X XXX XXXX"],
  ["SN", "221", [9, 9], "XX XXX XX XX"],
  ["RS", "381", [8, 9]],
  ["SC", "248", [7, 7], "X XX XX XX"],
  ["SL", "232", [8, 8], "XX XXXXXX"],
  ["SG", "65", [8, 8], "XXXX XXXX"],
  ["SX", "1", [10, 10], "XXX XXX XXXX"],
  ["SK", "421", [9, 9], "XXX XXX XXX"],
  ["SI", "386", [8, 8], "XX XXX XXX"],
  ["SB", "677", [5, 7]],
  ["SO", "252", [7, 9]],
  ["ZA", "27", [9, 9], "XX XXX XXXX"],
  ["KR", "82", [9, 10], "10 XXXX XXXX"],
  ["SS", "211", [9, 9], "XXX XXX XXX"],
  ["ES", "34", [9, 9], "XXX XX XX XX"],
  ["LK", "94", [9, 9], "XX XXX XXXX"],
  ["SD", "249", [9, 9], "XX XXX XXXX"],
  ["SR", "597", [6, 7]],
  ["SJ", "47", [8, 8]],
  ["SE", "46", [7, 13], "XX XXX XX XX"],
  ["CH", "41", [9, 9], "XX XXX XX XX"],
  ["SY", "963", [9, 9], "9XX XXX XXX"],
  ["TW", "886", [9, 9], "9XX XXX XXX"],
  ["TJ", "992", [9, 9], "XX XXX XXXX"],
  ["TZ", "255", [9, 9], "XXX XXX XXX"],
  ["TH", "66", [9, 9], "XX XXX XXXX"],
  ["TL", "670", [7, 8]],
  ["TG", "228", [8, 8], "XX XX XX XX"],
  ["TK", "690", [4, 4]],
  ["TO", "676", [5, 7]],
  ["TT", "1", [10, 10], "XXX XXX XXXX"],
  ["TN", "216", [8, 8], "XX XXX XXX"],
  ["TR", "90", [10, 10], "5XX XXX XX XX"],
  ["TM", "993", [8, 8], "XX XXXXXX"],
  ["TC", "1", [10, 10], "XXX XXX XXXX"],
  ["TV", "688", [5, 6]],
  ["VI", "1", [10, 10], "XXX XXX XXXX"],
  ["UG", "256", [9, 9], "XXX XXX XXX"],
  ["UA", "380", [9, 9], "XX XXX XXXX"],
  ["AE", "971", [9, 9], "5X XXX XXXX"],
  ["GB", "44", [10, 10], "7XXX XXXXXX"],
  ["US", "1", [10, 10], "XXX XXX XXXX"],
  ["UY", "598", [8, 9]],
  ["UZ", "998", [9, 9], "XX XXX XX XX"],
  ["VU", "678", [5, 7]],
  ["VA", "39", [6, 11]],
  ["VE", "58", [10, 10], "XXX XXX XXXX"],
  ["VN", "84", [9, 10], "XX XXX XXXX"],
  ["WF", "681", [6, 6]],
  ["EH", "212", [9, 9]],
  ["YE", "967", [9, 9], "7XX XXX XXX"],
  ["ZM", "260", [9, 9], "XX XXX XXXX"],
  ["ZW", "263", [9, 10]],
  ["AX", "358", [5, 12]],
];

const PATTERN_GROUPS = (pattern: string) => pattern.split(" ").map((group) => group.length);

/** Every country, in the order of ISO code. */
const PHONE_COUNTRIES: readonly PhoneCountry[] = DATA.map(([iso, dial, length, pattern]) => ({
  iso,
  dial,
  length: length ?? DEFAULT_LENGTH,
  pattern: pattern ?? "XXX XXX XXX",
}));

const BY_ISO = new Map(PHONE_COUNTRIES.map((country) => [country.iso, country]));

/** The country that owns a calling code shared with others (+1 is the United States, +44 the UK). */
const MAIN_COUNTRY: Record<string, string> = {
  "1": "US",
  "7": "RU",
  "39": "IT",
  "44": "GB",
  "47": "NO",
  "61": "AU",
  "212": "MA",
  "262": "RE",
  "358": "FI",
  "590": "GP",
  "599": "CW",
};

/** Area codes (+1) and prefixes that tell the countries of one calling code apart. */
const AREA_CODES: Record<string, string[]> = {
  AS: ["684"],
  AI: ["264"],
  AG: ["268"],
  BS: ["242"],
  BB: ["246"],
  BM: ["441"],
  VG: ["284"],
  KY: ["345"],
  DM: ["767"],
  DO: ["809", "829", "849"],
  GD: ["473"],
  GU: ["671"],
  JM: ["876", "658"],
  MS: ["664"],
  MP: ["670"],
  PR: ["787", "939"],
  KN: ["869"],
  LC: ["758"],
  VC: ["784"],
  SX: ["721"],
  TT: ["868"],
  TC: ["649"],
  VI: ["340"],
  KZ: ["6", "7"],
  CA: [
    "204",
    "226",
    "236",
    "249",
    "250",
    "263",
    "289",
    "306",
    "343",
    "354",
    "365",
    "367",
    "368",
    "382",
    "403",
    "416",
    "418",
    "428",
    "431",
    "437",
    "438",
    "450",
    "468",
    "474",
    "506",
    "514",
    "519",
    "548",
    "579",
    "581",
    "584",
    "587",
    "604",
    "613",
    "639",
    "647",
    "672",
    "683",
    "705",
    "709",
    "742",
    "753",
    "778",
    "780",
    "782",
    "807",
    "819",
    "825",
    "867",
    "873",
    "879",
    "902",
    "905",
  ],
};

/** Countries whose numbers are dialled with a leading 0 that is part of the number (Italy). */
const KEEPS_LEADING_ZERO = new Set(["IT", "VA", "SM"]);

/** The longest a whole international number can be, calling code included (ITU-T E.164). */
const E164_MAX_DIGITS = 15;

/** The country for an ISO code, or `undefined`. */
function getCountry(iso: string | undefined | null) {
  return iso ? BY_ISO.get(iso.toUpperCase()) : undefined;
}

const ARABIC_INDIC = /[٠-٩]/g;
const PERSIAN = /[۰-۹]/g;

/** Western digits only: ٠-٩ and ۰-۹ become 0-9, everything that is not a digit is dropped. */
function digitsOf(text: string) {
  return text
    .replace(ARABIC_INDIC, (d) => String(d.charCodeAt(0) - 0x0660))
    .replace(PERSIAN, (d) => String(d.charCodeAt(0) - 0x06f0))
    .replace(/\D/g, "");
}

type CountryFilter = {
  /** Only these countries (ISO codes). Everything else is left out. */
  only?: readonly string[];
  /** These countries (ISO codes) are left out. */
  exclude?: readonly string[];
};

/** The countries left after `only` and `exclude`, in a stable order. */
function filterCountries({ only, exclude }: CountryFilter = {}) {
  const allow = only ? new Set(only.map((iso) => iso.toUpperCase())) : null;
  const deny = new Set((exclude ?? []).map((iso) => iso.toUpperCase()));
  return PHONE_COUNTRIES.filter(
    (country) => !deny.has(country.iso) && (allow === null || allow.has(country.iso)),
  );
}

/**
 * Finds the country of an international number given as digits that start with the calling code
 * (`966512345678`). Picks the longest matching code, then the area code, then the main country of
 * that code. Only countries in `among` are considered. Returns the country and the digits left.
 */
function detectCountry(digits: string, among: readonly PhoneCountry[] = PHONE_COUNTRIES) {
  for (const size of [3, 2, 1]) {
    const dial = digits.slice(0, size);
    const sharing = among.filter((country) => country.dial === dial);
    if (sharing.length === 0) continue;
    const rest = digits.slice(size);
    const byArea = sharing.find((country) =>
      (AREA_CODES[country.iso] ?? []).some((area) => rest.startsWith(area)),
    );
    const main = sharing.find((country) => country.iso === MAIN_COUNTRY[dial]);
    // Countries told apart by area code (+1) are not guessed: with the main country left out, an
    // unknown area code is not recognised.
    const guessable = sharing.every((country) => !AREA_CODES[country.iso]);
    const country = byArea ?? main ?? (guessable ? sharing[0] : undefined);
    if (country) return { country, rest };
  }
  return undefined;
}

/** The most digits the national number can have: the E.164 limit, or the country's own longest. */
function maxNationalDigits(country: PhoneCountry) {
  return Math.min(E164_MAX_DIGITS - country.dial.length, Math.max(country.length[1], 4));
}

/** Drops the leading 0 people dial inside their own country (`0512345678` becomes `512345678`). */
function stripTrunkPrefix(country: PhoneCountry, national: string) {
  if (KEEPS_LEADING_ZERO.has(country.iso)) return national;
  if (country.dial === "1") return national.startsWith("1") ? national.slice(1) : national;
  return national.startsWith("0") ? national.replace(/^0+/, "") : national;
}

/** Groups national digits by the country's pattern; digits past the pattern follow in threes. */
function formatNational(country: PhoneCountry, national: string) {
  if (!national) return "";
  const groups = PATTERN_GROUPS(country.pattern);
  const parts: string[] = [];
  let at = 0;
  for (const size of groups) {
    if (at >= national.length) break;
    parts.push(national.slice(at, at + size));
    at += size;
  }
  while (at < national.length) {
    parts.push(national.slice(at, at + 3));
    at += 3;
  }
  return parts.join(" ");
}

/** A sample number for the placeholder: the pattern with its digits, such as `5X XXX XXXX`. */
function examplePattern(country: PhoneCountry) {
  return country.pattern.replace(/X/g, "0");
}

type PhoneDetails = {
  /** ISO code of the country, or `""` when none is chosen. */
  country: string;
  /** Calling code without the plus sign. */
  dial: string;
  /** National digits only, no trunk prefix, no spaces. */
  national: string;
  /** The number in international format without spaces (`+966512345678`), or `""` when empty. */
  e164: string;
  /** The national digits grouped for reading (`51 234 5678`). */
  formatted: string;
  /** The number is in the right length range for its country. */
  isPossible: boolean;
  /** Possible, and complete (not still being typed). Same as `isPossible` for the built-in data. */
  isValid: boolean;
};

/** Everything about a number: its E.164 form, grouping and whether the length is right. */
function getPhoneDetails(countryIso: string | undefined | null, national: string): PhoneDetails {
  const country = getCountry(countryIso);
  const digits = digitsOf(national);
  if (!country) {
    return {
      country: "",
      dial: "",
      national: digits,
      e164: "",
      formatted: digits,
      isPossible: false,
      isValid: false,
    };
  }
  const possible = digits.length >= country.length[0] && digits.length <= country.length[1];
  return {
    country: country.iso,
    dial: country.dial,
    national: digits,
    e164: digits ? `+${country.dial}${digits}` : "",
    formatted: formatNational(country, digits),
    isPossible: possible,
    isValid: possible,
  };
}

/**
 * Reads an international number (`+966 51 234 5678`, `00966512345678`, `966512345678`) into a
 * country and national digits. `fallback` is used when the code is not in `among`.
 */
function parsePhone(
  text: string,
  fallback?: string,
  among: readonly PhoneCountry[] = PHONE_COUNTRIES,
): PhoneDetails {
  const trimmed = text.trim();
  const digits = digitsOf(trimmed);
  const international = trimmed.startsWith("+") || digits.startsWith("00");
  if (international) {
    const found = detectCountry(digits.replace(/^00/, ""), among);
    if (found) return getPhoneDetails(found.country.iso, found.rest);
  }
  const country = getCountry(fallback);
  return getPhoneDetails(country?.iso ?? "", country ? stripTrunkPrefix(country, digits) : digits);
}

/** Flag emoji of a country (two regional-indicator letters). Windows shows the letters instead. */
function flagOf(iso: string) {
  return String.fromCodePoint(...[...iso.toUpperCase()].map((c) => 0x1f1a5 + c.charCodeAt(0)));
}

/** The name of a country in a language (`SA` in `ar` is `السعودية`). Falls back to the ISO code. */
function countryName(iso: string, locale = "en") {
  try {
    return new Intl.DisplayNames([locale], { type: "region" }).of(iso) ?? iso;
  } catch {
    return iso;
  }
}

export type { CountryFilter, PhoneCountry, PhoneDetails };
export {
  AREA_CODES,
  countryName,
  detectCountry,
  digitsOf,
  E164_MAX_DIGITS,
  examplePattern,
  filterCountries,
  flagOf,
  formatNational,
  getCountry,
  getPhoneDetails,
  MAIN_COUNTRY,
  maxNationalDigits,
  PHONE_COUNTRIES,
  parsePhone,
  stripTrunkPrefix,
};
