"use client";

import { Search01Icon } from "@hugeicons/core-free-icons";
import { useSearchContext } from "fumadocs-ui/contexts/search";
import { useEffect, useState } from "react";
import { useT } from "@/lib/locale-context";
import { Button } from "@/registry/bases/base/ui/button";
import { Icon } from "./icon";

/** Opens the ⌘K search dialog. */
export function SearchButton({
  compact = false,
  onOpen,
}: {
  compact?: boolean;
  /** Called before the dialog opens, for example to close a drawer that sits on top. */
  onOpen?: () => void;
}) {
  const t = useT();
  const { setOpenSearch } = useSearchContext();
  const [mac, setMac] = useState(true);
  useEffect(() => setMac(/Mac|iPhone|iPad/.test(navigator.platform)), []);
  if (compact) {
    return (
      <button
        type="button"
        aria-label={t("search.button")}
        onClick={() => {
          onOpen?.();
          setOpenSearch(true);
        }}
        className="inline-flex size-8 items-center justify-center rounded-sm text-text-secondary-paragraph transition-colors duration-150 hover:text-text-default motion-reduce:transition-none"
      >
        <Icon icon={Search01Icon} />
      </button>
    );
  }
  return (
    <Button
      variant="outline"
      className="w-full justify-start text-text-secondary-paragraph"
      onClick={() => {
        onOpen?.();
        setOpenSearch(true);
      }}
    >
      <Icon icon={Search01Icon} data-icon="inline-start" />
      {t("search.button")}
      <kbd
        dir="ltr"
        className="ms-auto rounded-xs border border-border-neutral-secondary px-1.5 font-sans text-xs font-medium"
      >
        {mac ? "⌘" : "Ctrl "}K
      </kbd>
    </Button>
  );
}
