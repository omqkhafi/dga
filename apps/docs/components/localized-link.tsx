import type { ComponentProps, ComponentType } from "react";
import { type Locale, localePath } from "@/lib/i18n";

type AnchorProps = ComponentProps<"a">;

/** Registry items, downloads and machine endpoints have one address for every language. */
const FILES = /^\/(r|agents|\.well-known|og|preview|search-index|api|sitemap|llms|webmcp)(\/|\.|$)/;

/**
 * MDX writes internal links as `/docs/...` or `/changelog`. Prefix them with the
 * page's locale so an Arabic reader stays on the Arabic site. Relative links, hashes
 * and external URLs pass through untouched.
 */
export function localizedLink(Base: ComponentType<AnchorProps>, lang: Locale) {
  return function LocalizedLink({ href, ...props }: AnchorProps) {
    const local =
      typeof href === "string" &&
      href.startsWith("/") &&
      !href.startsWith("//") &&
      !FILES.test(href)
        ? localePath(lang, href)
        : href;
    return <Base {...props} href={local} />;
  };
}
