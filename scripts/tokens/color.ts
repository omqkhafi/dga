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
