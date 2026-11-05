import { getT } from "./dictionary";
import type { Locale } from "./i18n";
import { FORM_COMPONENTS, INTERACTIVE_COMPONENTS } from "./nav";
import { siteUrl } from "./shared";
import { getPageMarkdown, source } from "./source";

const mdUrl = (url: string, lang: Locale) =>
  `${siteUrl}${url === `/${lang}/docs` ? `/${lang}/docs/index` : url}.md`;

/** llms.txt for one locale: what the project is, how to install it, and every page as Markdown. */
export function llmsIndex(lang: Locale) {
  const t = getT(lang);
  const groups = new Map<string, string[]>();
  for (const page of source.getPages(lang)) {
    const isForm = page.slugs[0] === "components" && FORM_COMPONENTS.includes(page.slugs[1] ?? "");
    const isInteractive =
      page.slugs[0] === "components" && INTERACTIVE_COMPONENTS.includes(page.slugs[1] ?? "");
    const group = isForm
      ? "forms"
      : isInteractive
        ? "interactive"
        : page.slugs.length > 1
          ? (page.slugs[0] as string)
          : "";
    const line = `- [${page.data.title}](${mdUrl(page.url, lang)})${page.data.description ? `: ${page.data.description}` : ""}`;
    groups.set(group, [...(groups.get(group) ?? []), line]);
  }
  const titles: Record<string, string> = {
    "": t("search.crumb.docs"),
    foundations: t("search.crumb.foundations"),
    components: t("search.crumb.components"),
    forms: t("search.crumb.forms"),
    interactive: t("search.crumb.interactive"),
    ai: t("search.crumb.ai"),
  };
  const body = [...groups]
    .map(([group, lines]) => `## ${titles[group] ?? group}\n\n${lines.join("\n")}`)
    .join("\n\n");
  const other: Locale = lang === "en" ? "ar" : "en";
  return `# ${t("app.name")}

> ${t("meta.llmsSummary")}

${t("llms.install", { init: `\`npx shadcn@latest init ${siteUrl}/r/dga.json\``, add: "`npx shadcn@latest add @dga/button @dga/field @dga/input`" })}
${t("llms.markdown", { full: `${siteUrl}/${lang}/llms-full.txt` })}
${t("llms.json", { url: `${siteUrl}/${lang}/llms.json` })}
${t("llms.skills", { url: `${siteUrl}/.well-known/agent-skills/index.json` })}
${t("llms.otherLang", { url: `${siteUrl}/${other}/llms.txt` })}

${body}
`;
}

/** Every page of a locale as Markdown, in one file. */
export async function llmsFull(lang: Locale) {
  const pages = await Promise.all(source.getPages(lang).map((page) => getPageMarkdown(page)));
  return `${pages.join("\n\n---\n\n")}\n\n---\n\n[${getT(lang)("llms.indexLink")}](${siteUrl}/${lang}/llms.txt)\n`;
}

/** One row of llms.json. */
export type LlmsCatalog = ReturnType<typeof llmsCatalog>;

/** llms.json for one locale: every page with its HTML and Markdown URL. */
export function llmsCatalog(lang: Locale) {
  const t = getT(lang);
  return {
    name: t("app.name"),
    description: t("meta.llmsSummary"),
    lang,
    origin: siteUrl,
    index: `${siteUrl}/${lang}/llms.txt`,
    full: `${siteUrl}/${lang}/llms-full.txt`,
    skills: `${siteUrl}/.well-known/agent-skills/index.json`,
    pages: source
      .getPages(lang)
      .map((page) => ({
        slug: page.slugs.join("/") || "index",
        title: page.data.title,
        description: page.data.description ?? "",
        html: `${siteUrl}${page.url}`,
        markdown: mdUrl(page.url, lang),
      }))
      .sort((a, b) => a.html.localeCompare(b.html)),
  };
}

export const textHeaders = { "Content-Type": "text/plain; charset=utf-8" };
