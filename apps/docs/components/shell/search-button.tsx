"use client";

import { Search01Icon } from "@hugeicons/core-free-icons";
import { useSearchContext } from "fumadocs-ui/contexts/search";
import { useEffect, useState } from "react";
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
  const { setOpenSearch } = useSearchContext();
  const [mac, setMac] = useState(true);
  useEffect(() => setMac(/Mac|iPhone|iPad/.test(navigator.platform)), []);
  if (compact) {
    return (
      <Button
        variant="subtle"
        iconOnly
        aria-label="Search"
        onClick={() => {
          onOpen?.();
          setOpenSearch(true);
        }}
      >
        <Icon icon={Search01Icon} />
      </Button>
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
      Search
      <kbd className="ms-auto rounded-xs border border-border-neutral-secondary px-1.5 font-sans text-xs font-medium">
        {mac ? "⌘" : "Ctrl "}K
      </kbd>
    </Button>
  );
}
