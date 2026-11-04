"use client";

import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar";
import { UserIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { cn } from "@/registry/bases/base/lib/utils";

const avatarVariants = cva("relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-button-background-neutral-default text-text-default select-none", {
  variants: {
    size: {
      24: "size-6 text-2xs font-bold [&_svg]:size-4",
      32: "size-8 text-xs font-semibold [&_svg]:size-6",
      40: "size-10 text-sm font-semibold [&_svg]:size-8",
      48: "size-12 text-md font-semibold [&_svg]:size-8",
      64: "size-16 text-xl font-medium [&_svg]:size-10",
      80: "size-20 text-display-sm font-normal [&_svg]:size-14",
      120: "size-30 text-display-md font-normal [&_svg]:size-20",
    },
    square: { true: "rounded-md", false: "" },
    bordered: { true: "ring-2 ring-border-white", false: "" },
  },
  compoundVariants: [{ size: 120, bordered: true, class: "ring-4" }],
  defaultVariants: { size: 40, square: false, bordered: false },
});

type AvatarProps = AvatarPrimitive.Root.Props &
  VariantProps<typeof avatarVariants> & {
    /** Image URL. Falls back to the initials or icon if it is missing or fails to load. */
    src?: string;
    /** Alternative text for the image. Use the person's name. */
    alt?: string;
    /** One or two letters shown when there is no image. */
    initials?: string;
  };

/** A person's picture, initials or a generic user icon. */
function Avatar({
  className,
  size,
  square,
  bordered,
  src,
  alt = "",
  initials,
  children,
  ...props
}: AvatarProps) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(avatarVariants({ size, square, bordered }), className)}
      {...props}
    >
      {src ? <AvatarPrimitive.Image src={src} alt={alt} className="size-full object-cover" /> : null}
      <AvatarPrimitive.Fallback className="flex size-full items-center justify-center">
        {children ??
          (initials ? (
            <span className="leading-none uppercase [unicode-bidi:plaintext]">{initials}</span>
          ) : (
            <HugeiconsIcon icon={UserIcon} className="text-icon-default" aria-hidden />
          ))}
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  );
}

type AvatarGroupProps = React.ComponentProps<"div"> & {
  /** Overlap the avatars (Figma: Stacked). */
  stacked?: boolean;
};

/** A row of avatars. Put an Avatar with initials like "+3" last for the remainder. */
function AvatarGroup({ className, stacked = true, ...props }: AvatarGroupProps) {
  return (
    <div
      data-slot="avatar-group"
      className={cn("flex items-center gap-2", stacked ? "gap-0 *:not-first:-ms-1 *:ring-2 *:ring-border-white" : "", className)}
      {...props}
    />
  );
}

export type { AvatarGroupProps, AvatarProps };
export { Avatar, AvatarGroup, avatarVariants };
