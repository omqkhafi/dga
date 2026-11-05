import type { Metadata } from "next";
import { NotFoundView } from "@/components/shell/not-found-view";
import { ibmPlexSansArabic } from "@/lib/fonts";
import "./global.css";

export const metadata: Metadata = { title: "Page not found | DGA UI" };

// This page bypasses the layouts, so it sets the theme itself, before first paint.
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
        <NotFoundView />
      </body>
    </html>
  );
}
