import { RootProvider } from "fumadocs-ui/provider/next";
import type { Metadata } from "next";
import { Header } from "@/components/shell/header";
import SearchDialog from "@/components/shell/search-lazy";
import { latestVersion } from "@/lib/changelog";
import { ibmPlexSansArabic } from "@/lib/fonts";
import { appName, siteUrl } from "@/lib/shared";
import { source } from "@/lib/source";
import "../global.css";

const description =
  "A shadcn registry for the Saudi DGA unified design system (Platforms Code), built on Base UI and Tailwind CSS v4.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: `${appName}: DGA design system for shadcn`, template: `%s | ${appName}` },
  description,
  openGraph: {
    type: "website",
    siteName: appName,
    url: siteUrl,
    images: [{ url: "/og/home/image.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
  alternates: { types: { "text/plain": "/llms.txt" } },
};

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" dir="ltr" className={ibmPlexSansArabic.variable} suppressHydrationWarning>
      <body className="flex min-h-screen flex-col bg-background-body text-text-default">
        <RootProvider search={{ SearchDialog }}>
          <a
            href="#main"
            className="sr-only z-50 rounded-sm bg-background-white px-3 py-2 focus:not-sr-only focus:fixed focus:start-2 focus:top-2"
          >
            Skip to content
          </a>
          <Header tree={source.getPageTree()} version={latestVersion()} />
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
