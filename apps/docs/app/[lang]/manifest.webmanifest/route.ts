import { notFound } from "next/navigation";
import { getT } from "@/lib/dictionary";
import { dirOf, i18n, isLocale } from "@/lib/i18n";

export const revalidate = false;

/** One web app manifest per language, so the installed app is named in the reader's language. */
export async function GET(_req: Request, { params }: RouteContext<"/[lang]/manifest.webmanifest">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getT(lang);
  return Response.json(
    {
      name: t("app.name"),
      short_name: t("app.name"),
      description: t("meta.description"),
      lang,
      dir: dirOf(lang),
      id: `/${lang}`,
      start_url: `/${lang}`,
      scope: `/${lang}`,
      display: "standalone",
      background_color: "#f9fafb",
      theme_color: "#1b8354",
      icons: [
        { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
        { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
      ],
    },
    { headers: { "Content-Type": "application/manifest+json" } },
  );
}

export function generateStaticParams() {
  return i18n.languages.map((lang) => ({ lang }));
}
