import { notFound } from "next/navigation";
import { getT } from "@/lib/dictionary";
import { i18n, isLocale } from "@/lib/i18n";
import { ogImage } from "@/lib/og";

export const revalidate = false;

export async function GET(_req: Request, { params }: RouteContext<"/og/[lang]/home/image.png">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getT(lang);
  return ogImage({
    lang,
    brand: t("app.name"),
    title: t("meta.ogTitle"),
    description: t("meta.ogDescription"),
    eyebrow: t("meta.ogEyebrow"),
    footer: t("meta.ogFooter"),
  });
}

export function generateStaticParams() {
  return i18n.languages.map((lang) => ({ lang }));
}
