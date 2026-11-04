import { loader } from "fumadocs-core/source";
import { metaSchema, pageSchema } from "fumadocs-core/source/schema";
import { defineDocs } from "fumadocs-mdx/macro";
import { docsRoute } from "./shared";

const docs = defineDocs({
  dir: "content/docs",
  docs: { schema: pageSchema, postprocess: { includeProcessedMarkdown: true } },
  meta: { schema: metaSchema },
});

export const source = loader({
  baseUrl: docsRoute,
  source: docs.toFumadocsSource(),
});

export type DocsPage = NonNullable<ReturnType<typeof source.getPage>>;

/** The page as Markdown, for "Copy page", /docs/*.md and llms-full.txt. */
export async function getPageMarkdown(page: DocsPage) {
  // Drop the heading ids fumadocs appends ("## Usage [#usage]").
  const body = (await page.data.getText("processed")).replace(/^(#{1,6} .*?) \[#[^\]]+\]$/gm, "$1");
  return `# ${page.data.title}\n\n${page.data.description ? `${page.data.description}\n\n` : ""}${body}`;
}
