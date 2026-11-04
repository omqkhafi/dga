import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { LinkSquare02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { cn } from "@/registry/bases/base/lib/utils";

const linkVariants = cva("inline-flex cursor-pointer items-center rounded-xs font-normal underline-offset-4 transition-colors hover:underline active:underline focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-border-black data-disabled:pointer-events-none data-disabled:no-underline data-disabled:text-text-default-disabled [&_svg]:shrink-0 [&_svg]:rtl:-scale-x-100", {
  variants: {
    variant: {
      primary: "text-link-primary hover:text-link-primary-hovered active:text-link-primary-pressed visited:text-link-primary-visited",
      neutral: "text-link-neutral hover:text-link-neutral-hovered active:text-link-neutral-pressed visited:text-link-primary-visited",
      "on-color": "text-link-oncolor hover:text-link-oncolor-hovered active:text-link-oncolor-pressed visited:text-link-oncolor-visited focus-visible:outline-icon-oncolor data-disabled:text-link-oncolor-disabled",
    },
    size: {
      sm: "gap-link-sm-gap text-sm [&_svg]:size-4",
      md: "gap-link-md-gap text-md [&_svg]:size-5",
    },
    inline: { true: "inline underline [&_svg]:ms-1 [&_svg]:inline [&_svg]:align-[-0.125em]", false: "" },
  },
  defaultVariants: { variant: "primary", size: "md", inline: false },
});

type LinkProps = useRender.ComponentProps<"a"> &
  VariantProps<typeof linkVariants> & {
    /** Opens in a new tab, adds rel="noopener noreferrer" and an external-link icon. */
    external?: boolean;
    /** Screen-reader text added to external links. Translate it on Arabic pages. */
    externalLabel?: string;
    /** Renders without an href, with aria-disabled. */
    disabled?: boolean;
  };

function Link({
  className,
  variant,
  size,
  inline,
  external = false,
  externalLabel = "(opens in a new tab)",
  disabled = false,
  render,
  children,
  ...props
}: LinkProps) {
  return useRender({
    defaultTagName: "a",
    render,
    props: mergeProps<"a">(
      {
        "data-slot": "link",
        className: cn(linkVariants({ variant, size, inline }), className),
        children: (
          <>
            {children}
            {external ? (
              <>
                <HugeiconsIcon icon={LinkSquare02Icon} aria-hidden className="pointer-events-none" />
                <span className="sr-only"> {externalLabel}</span>
              </>
            ) : null}
          </>
        ),
        ...(external && { target: "_blank", rel: "noopener noreferrer" }),
      } as React.ComponentProps<"a">,
      props,
      (disabled
        ? {
            href: undefined,
            "aria-disabled": true,
            "data-disabled": "",
            role: "link",
            tabIndex: -1,
          }
        : {}) as React.ComponentProps<"a">,
    ),
  });
}

export type { LinkProps };
export { Link, linkVariants };
