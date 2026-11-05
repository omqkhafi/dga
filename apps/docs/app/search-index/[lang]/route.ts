import { notFound } from "next/navigation";
import { i18n, isLocale } from "@/lib/i18n";
import { buildSearchIndex } from "@/lib/search-index";

// Prebuilt at build time, one file per language: the search dialog fetches the active
// language's file once and filters it in memory, so results never mix languages.
export const dynamic = "force-static";

export async function GET(_req: Request, { params }: RouteContext<"/search-index/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return Response.json(await buildSearchIndex(lang), {
    headers: { "Cache-Control": "public, max-age=3600" },
  });
}

export function generateStaticParams() {
  return i18n.languages.map((lang) => ({ lang }));
}
