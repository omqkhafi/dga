import { llms } from "fumadocs-core/source/llms";
import { appName, siteUrl } from "@/lib/shared";
import { source } from "@/lib/source";

export const revalidate = false;

export function GET() {
  // The generated index starts with its own "# DGA UI" title.
  const index = llms(source)
    .index()
    .replace(/^# .*\n+/, "");
  const header = `# ${appName}

> A shadcn registry for the Saudi DGA unified design system, built on Base UI and Tailwind CSS v4. Arabic-first (RTL), light and dark, WCAG 2.1 AA.

Install: \`npx shadcn@latest init ${siteUrl}/r/dga.json\`, then \`npx shadcn@latest add @dga/button\`.
Every docs page is available as Markdown at its URL plus \`.md\`. Full text: ${siteUrl}/llms-full.txt

`;
  return new Response(
    header +
      index.replace(
        /\]\((\/docs[^)]*)\)/g,
        (_, url: string) => `](${siteUrl}${url === "/docs" ? "/docs/index" : url}.md)`,
      ),
    {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    },
  );
}
