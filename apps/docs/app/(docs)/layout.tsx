import { RootProvider } from "fumadocs-ui/provider/next";
import type { Metadata } from "next";
import { ibmPlexSansArabic } from "@/lib/fonts";
import { appName, siteUrl } from "@/lib/shared";
import "../global.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: `${appName}: DGA design system for shadcn`, template: `%s | ${appName}` },
  description:
    "A shadcn registry for the Saudi DGA unified design system (Platforms Code), built on Base UI and Tailwind CSS v4.",
};

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" dir="ltr" className={ibmPlexSansArabic.variable} suppressHydrationWarning>
      <body className="flex min-h-screen flex-col">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
