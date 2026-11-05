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
      <aside className="sticky top-(--topbar-h) hidden h-[calc(100dvh-var(--topbar-h))] w-(--left-pane-w) shrink-0 overflow-y-auto border-e border-border-neutral-secondary bg-background-white lg:block">
        <SidebarNav tree={source.getPageTree(lang)} version={latestVersion()} />
      </aside>
      <div className="flex min-w-0 flex-1">{children}</div>
    </div>
  );
}
