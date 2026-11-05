"use client";

import { ArrowUpRight01Icon, GithubIcon } from "@hugeicons/core-free-icons";
import { useT } from "@/lib/locale-context";
import { githubUrl } from "@/lib/shared";
import { Button } from "@/registry/bases/base/ui/button";
import { Icon } from "./icon";

export function GithubLink() {
  const t = useT();
  return (
    <Button
      variant="subtle"
      nativeButton={false}
      className="hidden lg:inline-flex"
      render={<a href={githubUrl} target="_blank" rel="noopener noreferrer" />}
    >
      <Icon icon={GithubIcon} data-icon="inline-start" />
      {t("github")}
      <Icon icon={ArrowUpRight01Icon} data-icon="inline-end" className="rtl:-scale-x-100" />
      <span className="sr-only"> {t("newTab")}</span>
    </Button>
  );
}
