import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { getPageMarkdown, source } from "@/lib/source";

export const revalidate = false;

export async function GET(_req: Request, { params }: RouteContext<"/[lang]/llms.mdx/[[...slug]]">) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();
  const page = source.getPage(slug?.[0] === "index" ? [] : slug, lang);
  if (!page) notFound();
  return new Response(await getPageMarkdown(page), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}

export function generateStaticParams() {
  return [
    ...source.generateParams().filter((p) => p.slug.length > 0),
    ...["en", "ar"].map((lang) => ({ lang, slug: ["index"] })),
  ];
}
