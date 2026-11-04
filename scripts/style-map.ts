// Inlines the cn-* style map (registry/styles/style-dga.css) into component source.
//
// shadcn's transformStyle only rewrites cva base/variant strings and className literals, and
// skips compoundVariants and cn(...) arguments. This replaces every cn-* class in any string
// literal, and fails on a cn-* class the style map does not define (catches typos).

import { createStyleMap } from "shadcn/utils";

const STRING = /(["'`])((?:\\.|(?!\1)[^\\])*)\1/g;
const CLASS = /(?<![\w/-])cn-[a-z0-9-]+(?![\w-])/g;

export function loadStyleMap(css: string): Record<string, string> {
  return createStyleMap(css) as Record<string, string>;
}

export function inlineStyles(source: string, map: Record<string, string>, file = "component") {
  const unknown = new Set<string>();
  const out = source.replace(STRING, (literal, quote: string, body: string) => {
    if (!body.includes("cn-")) return literal;
    const replaced = body
      .replace(CLASS, (name) => {
        const utilities = map[name];
        if (utilities === undefined) {
          unknown.add(name);
          return name;
        }
        return utilities;
      })
      .replace(/\s{2,}/g, " ")
      .trim();
    return `${quote}${replaced}${quote}`;
  });
  if (unknown.size > 0) {
    throw new Error(`${file}: cn-* classes missing from style-dga.css: ${[...unknown].join(", ")}`);
  }
  return out;
}
