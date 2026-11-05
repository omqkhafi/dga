import { loader } from "fumadocs-core/source";
import { metaSchema, pageSchema } from "fumadocs-core/source/schema";
import { defineDocs } from "fumadocs-mdx/macro";
import { i18n, type Locale } from "./i18n";
import { docsRoute } from "./shared";

const docs = defineDocs({
  dir: "content/docs",
  docs: { schema: pageSchema, postprocess: { includeProcessedMarkdown: true } },
  meta: { schema: metaSchema },
});

export const source = loader({
  baseUrl: docsRoute,
  i18n,
  source: docs.toFumadocsSource(),
});

export type DocsPage = NonNullable<ReturnType<typeof source.getPage>>;

/** The page as Markdown, for "Copy page", /{lang}/docs/*.md and llms-full.txt. */
export async function getPageMarkdown(page: DocsPage, options: { keepIds?: boolean } = {}) {
  // Drop the heading ids fumadocs appends ("## Usage [#usage]").
  const processed = await page.data.getText("processed");
  const body = options.keepIds
    ? processed
    : processed.replace(/^(#{1,6} .*?) \[#[^\]]+\]$/gm, "$1");
  // Internal links stay on the page's language: `](/docs/x)` → `](/ar/docs/x)`.
  const text = body.replace(
    /\]\(\/(?!en\/|ar\/|\/)/g,
    `](/${page.locale ?? i18n.defaultLanguage}/`,
  );
  return `# ${page.data.title}\n\n${page.data.description ? `${page.data.description}\n\n` : ""}${text}`;
}

export const pagesFor = (lang: Locale) => source.getPages(lang);
