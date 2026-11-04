import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { LinkSquare02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { cn } from "@/registry/bases/base/lib/utils";

const linkVariants = cva("cn-link", {
  variants: {
    variant: {
      primary: "cn-link-variant-primary",
      neutral: "cn-link-variant-neutral",
      "on-color": "cn-link-variant-on-color",
    },
    size: {
      sm: "cn-link-size-sm",
      md: "cn-link-size-md",
    },
    inline: { true: "cn-link-inline", false: "" },
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
                <HugeiconsIcon icon={LinkSquare02Icon} aria-hidden className="cn-link-icon" />
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
