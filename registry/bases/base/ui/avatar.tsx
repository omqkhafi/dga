"use client";

import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar";
import { UserIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { cn } from "@/registry/bases/base/lib/utils";

const avatarVariants = cva("cn-avatar", {
  variants: {
    size: {
      24: "cn-avatar-size-24",
      32: "cn-avatar-size-32",
      40: "cn-avatar-size-40",
      48: "cn-avatar-size-48",
      64: "cn-avatar-size-64",
      80: "cn-avatar-size-80",
      120: "cn-avatar-size-120",
    },
    square: { true: "cn-avatar-square", false: "" },
    bordered: { true: "cn-avatar-bordered", false: "" },
  },
  compoundVariants: [{ size: 120, bordered: true, class: "cn-avatar-bordered-120" }],
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
      {src ? <AvatarPrimitive.Image src={src} alt={alt} className="cn-avatar-image" /> : null}
      <AvatarPrimitive.Fallback className="cn-avatar-fallback">
        {children ??
          (initials ? (
            <span className="cn-avatar-initials">{initials}</span>
          ) : (
            <HugeiconsIcon icon={UserIcon} className="cn-avatar-icon" aria-hidden />
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
      className={cn("cn-avatar-group", stacked ? "cn-avatar-group-stacked" : "", className)}
      {...props}
    />
  );
}

export type { AvatarGroupProps, AvatarProps };
export { Avatar, AvatarGroup, avatarVariants };
