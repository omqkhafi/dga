"use client";

import { Search01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useSearchContext } from "fumadocs-ui/contexts/search";
import { useEffect, useState } from "react";
import { Button } from "@/registry/bases/base/ui/button";

/** Opens the ⌘K search dialog. */
export function SearchButton({ compact = false }: { compact?: boolean }) {
  const { setOpenSearch } = useSearchContext();
  const [mac, setMac] = useState(true);
  useEffect(() => setMac(/Mac|iPhone|iPad/.test(navigator.platform)), []);
  if (compact) {
    return (
      <Button variant="subtle" iconOnly aria-label="Search" onClick={() => setOpenSearch(true)}>
        <HugeiconsIcon icon={Search01Icon} />
      </Button>
    );
  }
  return (
    <Button
      variant="outline"
      className="w-full justify-start text-text-secondary-paragraph"
      onClick={() => setOpenSearch(true)}
    >
      <HugeiconsIcon icon={Search01Icon} data-icon="inline-start" />
      Search
      <kbd className="ms-auto rounded-xs border border-border-neutral-secondary px-1.5 font-sans text-2xs font-medium">
        {mac ? "⌘" : "Ctrl "}K
      </kbd>
    </Button>
  );
}
