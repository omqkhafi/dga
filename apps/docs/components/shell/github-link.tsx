"use client";

import { ArrowUpRight01Icon, GithubIcon } from "@hugeicons/core-free-icons";
import { useT } from "@/lib/locale-context";
import { githubUrl } from "@/lib/shared";
import { Icon } from "./icon";

/** The solid block at the end of the desktop header, as on the other omqkhafi docs sites. */
export function GithubLink() {
  const t = useT();
  return (
    <a
      href={githubUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex shrink-0 items-center gap-2 bg-text-default px-5 text-[0.8125rem] font-medium tracking-wider text-background-white uppercase transition-opacity duration-150 hover:opacity-90 motion-reduce:transition-none focus-visible:-outline-offset-4"
    >
      <Icon icon={GithubIcon} />
      {t("github")}
      <Icon icon={ArrowUpRight01Icon} className="rtl:-scale-x-100" />
      <span className="sr-only"> {t("newTab")}</span>
    </a>
  );
}
