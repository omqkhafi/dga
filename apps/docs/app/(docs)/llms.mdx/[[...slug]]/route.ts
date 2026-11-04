import { notFound } from "next/navigation";
import { getPageMarkdown, source } from "@/lib/source";

export const revalidate = false;

export async function GET(_req: Request, { params }: RouteContext<"/llms.mdx/[[...slug]]">) {
  const { slug } = await params;
  const page = source.getPage(slug?.[0] === "index" ? [] : slug);
  if (!page) notFound();
  return new Response(await getPageMarkdown(page), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}

export function generateStaticParams() {
  return [{ slug: ["index"] }, ...source.generateParams().filter((p) => p.slug.length > 0)];
}
