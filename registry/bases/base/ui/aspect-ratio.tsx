import type * as React from "react";
import { cn } from "@/registry/bases/base/lib/utils";

type AspectRatioProps = React.ComponentProps<"div"> & {
  /** Width divided by height: `16 / 9`, `4 / 3` or `1`. */
  ratio?: number;
  /** How an image or video inside fills the box: `cover` crops it, `contain` shows all of it. */
  fit?: "cover" | "contain";
};

/**
 * A box that keeps a fixed width to height ratio (Platform Code extension, not part of DGA). It
 * sets the CSS `aspect-ratio`, so it needs no script and has no layout shift. An `img`, `video`
 * or `iframe` inside fills it. Base UI has no primitive for this, so it is a plain element. It
 * does not replace anything in DGA: the Card has no ratio of its own.
 */
function AspectRatio({
  ratio = 16 / 9,
  fit = "cover",
  className,
  style,
  ...props
}: AspectRatioProps) {
  return (
    <div
      data-slot="aspect-ratio"
      data-fit={fit}
      style={{ "--ratio": ratio, ...style } as React.CSSProperties}
      className={cn("cn-aspect-ratio", className)}
      {...props}
    />
  );
}

export { AspectRatio };
