import { RootProvider } from "fumadocs-ui/provider/next";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/shell/footer";
import { Header } from "@/components/shell/header";
import SearchDialog from "@/components/shell/search-lazy";
import { latestVersion } from "@/lib/changelog";
import { getDictionary, getT } from "@/lib/dictionary";
import { ibmPlexSansArabic } from "@/lib/fonts";
import { dirOf, i18n, isLocale } from "@/lib/i18n";
import { LocaleProvider } from "@/lib/locale-context";
import { appName, siteUrl } from "@/lib/shared";
import { source } from "@/lib/source";
import "../global.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return i18n.languages.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getT(lang);
  return {
    metadataBase: new URL(siteUrl),
    title: { default: t("meta.title"), template: `%s | ${appName}` },
    description: t("meta.description"),
    openGraph: {
      type: "website",
      siteName: appName,
      url: `${siteUrl}/${lang}`,
      locale: lang === "ar" ? "ar_SA" : "en_US",
      alternateLocale: lang === "ar" ? ["en_US"] : ["ar_SA"],
      images: [{ url: `/og/${lang}/home/image.png`, width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image" },
    alternates: { types: { "text/plain": `/${lang}/llms.txt` } },
  };
}

export default async function Layout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dir = dirOf(lang);
  const dictionary = getDictionary(lang);
  const version = latestVersion();

  return (
    <html lang={lang} dir={dir} className={ibmPlexSansArabic.variable} suppressHydrationWarning>
      <body className="flex min-h-screen flex-col bg-background-body text-text-default">
        <LocaleProvider lang={lang} dictionary={dictionary}>
          <RootProvider dir={dir} search={{ SearchDialog }}>
            <a
              href="#main"
              className="sr-only z-50 rounded-sm bg-background-white px-3 py-2 focus:not-sr-only focus:fixed focus:start-2 focus:top-2"
            >
              {dictionary.skip}
            </a>
            <Header tree={source.getPageTree(lang)} version={version} />
            {children}
            <Footer lang={lang} version={version} />
          </RootProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
