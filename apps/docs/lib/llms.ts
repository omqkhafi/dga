import { getT } from "./dictionary";
import type { Locale } from "./i18n";
import { siteUrl } from "./shared";
import { getPageMarkdown, source } from "./source";

const mdUrl = (url: string, lang: Locale) =>
  `${siteUrl}${url === `/${lang}/docs` ? `/${lang}/docs/index` : url}.md`;

/** llms.txt for one locale: what the project is, how to install it, and every page as Markdown. */
export function llmsIndex(lang: Locale) {
  const t = getT(lang);
  const groups = new Map<string, string[]>();
  for (const page of source.getPages(lang)) {
    const group = page.slugs.length > 1 ? (page.slugs[0] as string) : "";
    const line = `- [${page.data.title}](${mdUrl(page.url, lang)})${page.data.description ? `: ${page.data.description}` : ""}`;
    groups.set(group, [...(groups.get(group) ?? []), line]);
  }
  const titles: Record<string, string> = {
    "": t("search.crumb.docs"),
    foundations: t("search.crumb.foundations"),
    components: t("search.crumb.components"),
  };
  const body = [...groups]
    .map(([group, lines]) => `## ${titles[group] ?? group}\n\n${lines.join("\n")}`)
    .join("\n\n");
  const other: Locale = lang === "en" ? "ar" : "en";
  return `# ${t("app.name")}

> ${t("meta.llmsSummary")}

Install: \`npx shadcn@latest init ${siteUrl}/r/dga.json\`, then \`npx shadcn@latest add @dga/button\`.
Every docs page is available as Markdown at its URL plus \`.md\`. Full text: ${siteUrl}/${lang}/llms-full.txt
${lang === "en" ? "Arabic" : "English"}: ${siteUrl}/${other}/llms.txt

${body}
`;
}

/** Every page of a locale as Markdown, in one file. */
export async function llmsFull(lang: Locale) {
  const pages = await Promise.all(source.getPages(lang).map((page) => getPageMarkdown(page)));
  return pages.join("\n\n---\n\n");
}

export const textHeaders = { "Content-Type": "text/plain; charset=utf-8" };
