import { SidebarNav } from "@/components/shell/sidebar";
import { latestVersion } from "@/lib/changelog";
import { source } from "@/lib/source";

export default function Layout({ children }: LayoutProps<"/docs">) {
  return (
    <div className="flex flex-1">
      <aside className="sticky top-14 hidden h-[calc(100dvh-3.5rem)] w-75 shrink-0 overflow-y-auto bg-background-white md:block">
        <SidebarNav tree={source.getPageTree()} version={latestVersion()} />
      </aside>
      <div className="flex min-w-0 flex-1">{children}</div>
    </div>
  );
}
