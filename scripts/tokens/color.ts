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
