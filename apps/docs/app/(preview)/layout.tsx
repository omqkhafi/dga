import type { Metadata } from "next";
import Script from "next/script";
import { FrameBridge, initialStateScript } from "@/components/preview/frame-bridge";
import { ibmPlexSansArabic } from "@/lib/fonts";
import "../global.css";

export const metadata: Metadata = { robots: { index: false } };

// Bare root layout for preview iframes: no docs chrome and no next-themes, so the
// parent page fully controls dir and theme.
export default function PreviewLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" dir="ltr" className={ibmPlexSansArabic.variable} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <Script id="preview-state" strategy="beforeInteractive">
          {initialStateScript}
        </Script>
        <FrameBridge />
        {children}
      </body>
    </html>
  );
}
