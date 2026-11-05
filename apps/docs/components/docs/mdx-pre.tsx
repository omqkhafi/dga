import type { ComponentProps, ReactNode } from "react";
import { Children, isValidElement } from "react";
import { CodeBlock } from "./code-block";

/** Counts the `.line` spans Shiki renders, so the client block knows when to collapse. */
export function countLines(node: ReactNode): number {
  let count = 0;
  const walk = (n: ReactNode) => {
    Children.forEach(n, (child) => {
      if (!isValidElement<{ className?: string; children?: ReactNode }>(child)) return;
      if (
        typeof child.props.className === "string" &&
        /(^| )line( |$)/.test(child.props.className)
      ) {
        count++;
        return;
      }
      walk(child.props.children);
    });
  };
  walk(node);
  return count;
}

/** The MDX `pre`: every fenced block becomes a DGA code block. */
export function MdxPre({
  title,
  children,
  className,
  style,
  ...props
}: ComponentProps<"pre"> & { title?: string }) {
  const lang = (props as Record<string, unknown>)["data-language"] as string | undefined;
  const pre = <pre className="min-w-full w-max *:flex *:flex-col">{children}</pre>;
  return (
    <CodeBlock
      title={title ?? "Code"}
      lang={lang}
      lines={countLines(children)}
      className={className}
      style={style}
    >
      {pre}
    </CodeBlock>
  );
}
