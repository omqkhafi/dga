import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { appName, githubUrl } from "./shared";

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <span className="inline-flex items-center gap-2 font-semibold">
          <span aria-hidden className="size-3 rounded-xs bg-primary" />
          {appName}
        </span>
      ),
    },
    githubUrl,
  };
}
