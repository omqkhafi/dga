// ci timing test
// Colour helpers for the WCAG 2.x contrast audit.

export type RGBA = { r: number; g: number; b: number; a: number };

export function parseHex(hex: string): RGBA {
  const value = hex.trim().replace(/^#/, "");
  if (!/^([0-9a-f]{6}|[0-9a-f]{8})$/i.test(value)) {
    throw new Error(`Not a 6 or 8 digit hex colour: ${hex}`);
  }
  const channel = (i: number) => Number.parseInt(value.slice(i, i + 2), 16) / 255;
  return {
    r: channel(0),
    g: channel(2),
    b: channel(4),
    a: value.length === 8 ? channel(6) : 1,
  };
}

/** Paint `top` over an opaque `bottom` (alpha compositing). */
export function composite(top: RGBA, bottom: RGBA): RGBA {
  const a = top.a;
  return {
    r: top.r * a + bottom.r * (1 - a),
    g: top.g * a + bottom.g * (1 - a),
    b: top.b * a + bottom.b * (1 - a),
    a: 1,
  };
}

function linear(channel: number) {
  return channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
}

export function luminance(color: RGBA) {
  return 0.2126 * linear(color.r) + 0.7152 * linear(color.g) + 0.0722 * linear(color.b);
}

/**
 * WCAG contrast ratio of `fg` on `bg`. Translucent colours are composited:
 * `bg` over `base` first (defaults to white), then `fg` over the result.
 */
export function contrastRatio(fg: string, bg: string, base = "#ffffff") {
  const background = composite(parseHex(bg), parseHex(base));
  const foreground = composite(parseHex(fg), background);
  const l1 = luminance(foreground);
  const l2 = luminance(background);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}

export function roundRatio(ratio: number) {
  // Floor, so a ratio that rounds up to 4.5 is never reported as passing.
  return Math.floor(ratio * 100) / 100;
}

function toOklab(hex: string): [number, number, number] {
  const { r, g, b } = parseHex(hex);
  const [lr, lg, lb] = [r, g, b].map(linear) as [number, number, number];
  const l = Math.cbrt(0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb);
  const m = Math.cbrt(0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb);
  const s = Math.cbrt(0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb);
  return [
    0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
    0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s,
  ];
}

/** OKLCH hue in degrees of an opaque colour. */
export function oklchHue(hex: string) {
  const [, a, b] = toOklab(hex);
  return ((Math.atan2(b, a) * 180) / Math.PI + 360) % 360;
}

function fromOklch(L: number, C: number, hue: number): [number, number, number] {
  const a = C * Math.cos((hue * Math.PI) / 180);
  const b = C * Math.sin((hue * Math.PI) / 180);
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
  return [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ];
}

/**
 * `#rrggbb` at OKLCH lightness `L`, hue `hue` and the largest chroma up to `maxChroma` that
 * still fits in sRGB. One lightness and one chroma target for every hue gives a family of
 * tints that read as equally strong, with no hue drifting to brown.
 */
export function oklchHex(L: number, maxChroma: number, hue: number) {
  let lo = 0;
  let hi = maxChroma;
  const inGamut = (c: number) => fromOklch(L, c, hue).every((v) => v >= -0.0005 && v <= 1.0005);
  if (inGamut(hi)) lo = hi;
  else {
    for (let i = 0; i < 24; i++) {
      const mid = (lo + hi) / 2;
      if (inGamut(mid)) lo = mid;
      else hi = mid;
    }
  }
  const encode = (v: number) => {
    const x = Math.max(0, Math.min(1, v));
    const e = x <= 0.0031308 ? 12.92 * x : 1.055 * x ** (1 / 2.4) - 0.055;
    return Math.round(e * 255)
      .toString(16)
      .padStart(2, "0");
  };
  return `#${fromOklch(L, lo, hue).map(encode).join("")}`;
}

// ---------------------------------------------------------------------------
// OKLCH output. The Figma hex values stay the source of truth; the CSS is emitted as oklch().
// The matrices are the CSS Color 4 ones (sRGB → XYZ D65 → LMS → OKLab), so browsers read the
// emitted value back to the same sRGB colour.
// ---------------------------------------------------------------------------

type Matrix = [[number, number, number], [number, number, number], [number, number, number]];

const SRGB_TO_XYZ: Matrix = [
  [0.41239079926595934, 0.357584339383878, 0.1804807884018343],
  [0.21263900587151027, 0.715168678767756, 0.07219231536073371],
  [0.01933081871559182, 0.11919477979462598, 0.9505321522496607],
];
const XYZ_TO_LMS: Matrix = [
  [0.819022437996703, 0.3619062600528904, -0.1288737815209879],
  [0.0329836539323885, 0.9292868615863434, 0.0361446663506424],
  [0.0481771893596242, 0.2642395317527308, 0.6335478284694309],
];
const LMS_TO_LAB: Matrix = [
  [0.210454268309314, 0.7936177747023054, -0.0040720430116193],
  [1.9779985324311684, -2.42859224204858, 0.450593709617411],
  [0.0259040424655478, 0.7827717124575296, -0.8086757549230774],
];

const multiply = (a: Matrix, b: Matrix): Matrix =>
  a.map((row) =>
    [0, 1, 2].map(
      (j) => row[0] * (b[0][j] ?? 0) + row[1] * (b[1][j] ?? 0) + row[2] * (b[2][j] ?? 0),
    ),
  ) as Matrix;

function invert(m: Matrix): Matrix {
  const [[a, b, c], [d, e, f], [g, h, i]] = m;
  const det = a * (e * i - f * h) - b * (d * i - f * g) + c * (d * h - e * g);
  return [
    [(e * i - f * h) / det, (c * h - b * i) / det, (b * f - c * e) / det],
    [(f * g - d * i) / det, (a * i - c * g) / det, (c * d - a * f) / det],
    [(d * h - e * g) / det, (b * g - a * h) / det, (a * e - b * d) / det],
  ];
}

const apply = (m: Matrix, v: number[]) =>
  m.map((row) => row[0] * (v[0] ?? 0) + row[1] * (v[1] ?? 0) + row[2] * (v[2] ?? 0)) as [
    number,
    number,
    number,
  ];

const SRGB_TO_LMS = multiply(XYZ_TO_LMS, SRGB_TO_XYZ);
const LMS_TO_SRGB = invert(SRGB_TO_LMS);
const LAB_TO_LMS = invert(LMS_TO_LAB);

const toLinear = (c: number) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const fromLinear = (c: number) => (c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055);

export type Oklch = { l: number; c: number; h: number; alpha: number };

/** Decimal places kept in the emitted value. Enough for an exact 8-bit sRGB round trip. */
const PRECISION = { l: 5, c: 5, h: 3, alpha: 4 };

const trim = (n: number, places: number) => {
  const text = n
    .toFixed(places)
    .replace(/(\.\d*?)0+$/, "$1")
    .replace(/\.$/, "");
  return text === "-0" ? "0" : text;
};

export function hexToOklch(hex: string): Oklch {
  const { r, g, b, a } = parseHex(hex);
  const lms = apply(SRGB_TO_LMS, [toLinear(r), toLinear(g), toLinear(b)]).map(Math.cbrt);
  const [l, A, B] = apply(LMS_TO_LAB, lms);
  const c = Math.hypot(A, B);
  const h = c < 1e-6 ? 0 : ((Math.atan2(B, A) * 180) / Math.PI + 360) % 360;
  return { l, c, h, alpha: a };
}

/** `oklch(L C H)` or `oklch(L C H / alpha)` for a `#rrggbb` or `#rrggbbaa` colour. */
export function hexToOklchCss(hex: string) {
  const { l, c, h, alpha } = hexToOklch(hex);
  const chroma = c < 0.5 * 10 ** -PRECISION.c ? 0 : c;
  const parts = [
    trim(l, PRECISION.l),
    trim(chroma, PRECISION.c),
    chroma === 0 ? "0" : trim(h, PRECISION.h),
  ].join(" ");
  const opacity = alpha < 1 ? ` / ${trim(alpha, PRECISION.alpha)}` : "";
  return `oklch(${parts}${opacity})`;
}

const OKLCH = /^oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*([\d.]+))?\s*\)$/;

export function parseOklchCss(css: string): Oklch {
  const match = OKLCH.exec(css.trim());
  if (!match) throw new Error(`Not an oklch() value: ${css}`);
  return {
    l: Number(match[1]),
    c: Number(match[2]),
    h: Number(match[3]),
    alpha: match[4] === undefined ? 1 : Number(match[4]),
  };
}

/** The 8-bit sRGB `#rrggbb` (or `#rrggbbaa` when translucent) an oklch() value displays as. */
export function oklchToHex(value: string | Oklch) {
  const { l, c, h, alpha } = typeof value === "string" ? parseOklchCss(value) : value;
  const a = c * Math.cos((h * Math.PI) / 180);
  const b = c * Math.sin((h * Math.PI) / 180);
  const lms = apply(LAB_TO_LMS, [l, a, b]).map((v) => v ** 3);
  const byte = (v: number) =>
    Math.round(Math.min(1, Math.max(0, fromLinear(v))) * 255)
      .toString(16)
      .padStart(2, "0");
  const [r, g, bl] = apply(LMS_TO_SRGB, lms);
  const rgb = `#${byte(r)}${byte(g)}${byte(bl)}`;
  return alpha < 1
    ? `${rgb}${Math.round(alpha * 255)
        .toString(16)
        .padStart(2, "0")}`
    : rgb;
}

/** Normalises `#rgb`-free hex to lower-case `#rrggbb` / `#rrggbbaa`, dropping an opaque `ff` alpha. */
export function normalizeHex(hex: string) {
  const value = hex.trim().toLowerCase().replace(/^#/, "");
  parseHex(value);
  return `#${value.length === 8 && value.endsWith("ff") ? value.slice(0, 6) : value}`;
}

export const isHexColor = (value: string) => /^#([0-9a-f]{6}|[0-9a-f]{8})$/i.test(value.trim());
