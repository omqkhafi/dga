import { notFound } from "next/navigation";
import { getT } from "@/lib/dictionary";
import { isLocale } from "@/lib/i18n";
import { ogImage } from "@/lib/og";
import { source } from "@/lib/source";

export const revalidate = false;

export async function GET(_req: Request, { params }: RouteContext<"/og/[lang]/docs/[...slug]">) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();
  const page = source.getPage(slug.slice(0, -1), lang);
  if (!page) notFound();
  const t = getT(lang);
  return ogImage({
    lang,
    brand: t("app.name"),
    title: page.data.title,
    description: page.data.description,
    eyebrow: t("meta.ogDocs"),
    footer: t("meta.ogFooter"),
  });
}

export function generateStaticParams() {
  return source.generateParams().map((p) => ({ lang: p.lang, slug: [...p.slug, "image.png"] }));
}
