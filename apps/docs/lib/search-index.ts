import { getT } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";
import {
  COMPOSITE_COMPONENTS,
  FORM_COMPONENTS,
  INTERACTIVE_COMPONENTS,
  NAVIGATION_COMPONENTS,
} from "@/lib/nav";
import { getPageMarkdown, source } from "@/lib/source";

/** One searchable unit: a page, or one heading section of a page. */
export type SearchEntry = {
  /** URL including the heading anchor. */
  url: string;
  /** Section heading, or the page title for the page entry. */
  title: string;
  page: string;
  pageUrl: string;
  /** For example "Components". */
  crumb: string;
  /** Plain text, markdown and JSX stripped. */
  text: string;
};

const strip = (markdown: string) =>
  markdown
    .replace(/```[\s\S]*?```/g, " ") // code fences
    .replace(/<[A-Za-z][^>]*\/>/g, " ") // self-closing JSX such as <Preview … />
    .replace(/<\/?[A-Za-z][^>]*>/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/\|?\s*:?-{3,}:?\s*(?=\||$)/gm, " ") // table dividers
    .replace(/[`*_>#|]/g, " ")
    .replace(/^\s*-{3,}\s*$/gm, " ")
    .replace(/\s+/g, " ")
    .trim();

/** One index per locale, built at build time (see app/search-index/[lang]). Small enough to ship whole. */
export async function buildSearchIndex(lang: Locale): Promise<SearchEntry[]> {
  const t = getT(lang);
  const entries: SearchEntry[] = [];
  for (const page of source.getPages(lang)) {
    const segment = page.slugs.length > 1 ? (page.slugs[0] ?? "") : "";
    const crumb =
      segment === "components" && FORM_COMPONENTS.includes(page.slugs[1] ?? "")
        ? t("search.crumb.forms")
        : segment === "components" && INTERACTIVE_COMPONENTS.includes(page.slugs[1] ?? "")
          ? t("search.crumb.interactive")
          : segment === "components" && NAVIGATION_COMPONENTS.includes(page.slugs[1] ?? "")
            ? t("search.crumb.navigation")
            : segment === "components" && COMPOSITE_COMPONENTS.includes(page.slugs[1] ?? "")
              ? t("search.crumb.composite")
              : segment === "components"
                ? t("search.crumb.components")
                : segment === "foundations"
                  ? t("search.crumb.foundations")
                  : segment === "ai"
                    ? t("search.crumb.ai")
                    : t("search.crumb.docs");
    const base = { page: page.data.title, pageUrl: page.url, crumb };
    const pageEntry: SearchEntry = {
      ...base,
      url: page.url,
      title: page.data.title,
      text: page.data.description ?? "",
    };
    entries.push(pageEntry);
    const intro: string[] = [];
    // The processed markdown keeps heading ids ("## Usage [#usage]").
    const raw = await getPageMarkdown(page, { keepIds: true });
    let current: { id: string; title: string; lines: string[] } | null = null;
    const flush = () => {
      if (!current) return;
      const text = strip(current.lines.join("\n"));
      if (text)
        entries.push({ ...base, url: `${page.url}#${current.id}`, title: current.title, text });
    };
    for (const line of raw.split("\n")) {
      const heading = /^(#{2,3}) (.*?)(?: \[#([^\]]+)\])?$/.exec(line);
      if (heading) {
        flush();
        current = {
          id: heading[3] ?? "",
          title: strip(heading[2] ?? ""),
          lines: [],
        };
      } else if (current) current.lines.push(line);
      else intro.push(line);
    }
    flush();
    pageEntry.text = `${pageEntry.text} ${strip(intro.join("\n"))}`.trim();
  }
  return entries;
}
