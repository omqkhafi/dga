import type { Metadata } from "next";
import { NotFoundView } from "@/components/shell/not-found-view";
import { getDictionary } from "@/lib/dictionary";
import { ibmPlexSansArabic } from "@/lib/fonts";
import { LocaleProvider } from "@/lib/locale-context";
import "./global.css";

export const metadata: Metadata = { title: "Page not found | Platform Code" };

// This page bypasses the layouts, so it sets the theme itself, before first paint. A URL that
// matches no route has no locale, so the message is English with the Arabic line under it, and
// the links go to /en.
const theme = `(() => { try { const t = localStorage.getItem("theme"); const dark = t === "dark" || ((!t || t === "system") && matchMedia("(prefers-color-scheme: dark)").matches); document.documentElement.classList.toggle("dark", dark); document.documentElement.style.colorScheme = dark ? "dark" : "light"; } catch {} })();`;

export default function GlobalNotFound() {
  return (
    <html lang="en" dir="ltr" className={ibmPlexSansArabic.variable} suppressHydrationWarning>
      <head>
        <script
          // biome-ignore lint/security/noDangerouslySetInnerHtml: a fixed string, no user input
          dangerouslySetInnerHTML={{ __html: theme }}
        />
      </head>
      <body className="flex min-h-screen flex-col bg-background-body text-text-default">
        <LocaleProvider lang="en" dictionary={getDictionary("en")}>
          <NotFoundView />
        </LocaleProvider>
      </body>
    </html>
  );
}
