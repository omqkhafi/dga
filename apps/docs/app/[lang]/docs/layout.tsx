import { notFound } from "next/navigation";
import { SidebarNav } from "@/components/shell/sidebar";
import { latestVersion } from "@/lib/changelog";
import { isLocale } from "@/lib/i18n";
import { source } from "@/lib/source";

export default async function Layout({ children, params }: LayoutProps<"/[lang]/docs">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return (
    <div className="flex flex-1">
      <aside className="sticky top-14 hidden h-[calc(100dvh-3.5rem)] w-75 shrink-0 overflow-y-auto bg-background-white md:block">
        <SidebarNav tree={source.getPageTree(lang)} version={latestVersion()} />
      </aside>
      <div className="flex min-w-0 flex-1">{children}</div>
    </div>
  );
}
