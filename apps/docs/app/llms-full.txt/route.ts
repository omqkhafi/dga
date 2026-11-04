import { getPageMarkdown, source } from "@/lib/source";

export const revalidate = false;

export async function GET() {
  const pages = await Promise.all(source.getPages().map(getPageMarkdown));
  return new Response(pages.join("\n\n---\n\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
