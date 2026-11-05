"use client";

import { Copy01Icon, Tick02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { cn } from "cn";
import { type CSSProperties, type ReactNode, useId, useRef, useState } from "react";
import { Button } from "@/registry/bases/base/ui/button";

/** Lines shown before a block collapses. */
export const COLLAPSE_AT = 16;

/**
 * A code block: file name, language pill and copy button in the header, line numbers for
 * multi-line code, and a collapsed state with an "Expand code" button past 16 lines.
 *
 * The body is always `dir="ltr"` with `unicode-bidi: isolate` (see global.css), so Arabic
 * strings inside JSX render in the right order instead of being reordered by the page's
 * direction.
 */
export function CodeBlock({
  title,
  lang,
  lines,
  className,
  style,
  children,
  ...rest
}: {
  title?: ReactNode;
  lang?: string;
  /** Number of lines. Decides line numbers and collapsing. */
  lines: number;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  const id = useId();
  const body = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const collapsible = lines > COLLAPSE_AT;
  const [expanded, setExpanded] = useState(false);
  const collapsed = collapsible && !expanded;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(body.current?.textContent ?? "");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <figure
      {...rest}
      data-slot="code-block"
      data-lines={lines > 1 ? "multi" : "single"}
      className={cn(
        "dga-code shiki not-prose my-4 overflow-hidden rounded-md border border-border-neutral-secondary bg-background-neutral-50 text-text-default",
        className,
      )}
      style={style}
    >
      <div className="flex h-10 items-center gap-2 border-b border-border-neutral-secondary bg-background-white ps-3 pe-1.5">
        <figcaption className="min-w-0 flex-1 truncate text-[0.8125rem] text-text-primary-paragraph">
          {title}
        </figcaption>
        {lang ? (
          <span className="rounded-xs bg-background-neutral-100 px-1.5 py-0.5 font-mono text-xs text-text-primary-paragraph uppercase">
            {lang}
          </span>
        ) : null}
        <Button
          variant="subtle"
          size="sm"
          iconOnly
          onClick={copy}
          aria-label={copied ? "Copied" : "Copy code"}
        >
          <HugeiconsIcon icon={copied ? Tick02Icon : Copy01Icon} />
        </Button>
        <span aria-live="polite" className="sr-only">
          {copied ? "Code copied" : ""}
        </span>
      </div>
      <div className="relative">
        <section
          ref={body}
          id={id}
          dir="ltr"
          // biome-ignore lint/a11y/noNoninteractiveTabindex: scrollable region must be keyboard reachable
          tabIndex={0}
          aria-label={typeof title === "string" ? `${title} code` : "Code"}
          className="dga-code-body overflow-x-auto overflow-y-hidden py-3"
          style={collapsed ? { maxHeight: `calc(${COLLAPSE_AT} * 1.5rem + 1.5rem)` } : undefined}
        >
          {children}
        </section>
        {collapsed ? (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-background-neutral-50 to-transparent"
          />
        ) : null}
      </div>
      {collapsible ? (
        <div className="flex justify-center border-t border-border-neutral-secondary bg-background-white py-1.5">
          <Button
            variant="subtle"
            size="sm"
            aria-expanded={expanded}
            aria-controls={id}
            onClick={() => setExpanded((v) => !v)}
          >
            {expanded ? "Collapse code" : `Expand code (${lines} lines)`}
          </Button>
        </div>
      ) : null}
    </figure>
  );
}
