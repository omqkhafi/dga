import { Switch as SwitchPrimitive } from "@base-ui/react/switch";
import { Tick02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { cn } from "@/registry/bases/base/lib/utils";

type SwitchProps = SwitchPrimitive.Root.Props & {
  /** Shows a check mark in the thumb while the switch is on. */
  icon?: boolean;
};

/**
 * Turns a setting on or off right away (DGA: Switch). Use a Checkbox for choices that are
 * only applied when the form is submitted. Label it with a Field (`orientation="horizontal"`).
 */
function Switch({ className, icon = false, ...props }: SwitchProps) {
  return (
    <SwitchPrimitive.Root data-slot="switch" className={cn("cn-switch", className)} {...props}>
      <SwitchPrimitive.Thumb data-slot="switch-thumb" className="cn-switch-thumb">
        {icon ? <HugeiconsIcon icon={Tick02Icon} aria-hidden className="cn-switch-icon" /> : null}
      </SwitchPrimitive.Thumb>
    </SwitchPrimitive.Root>
  );
}

export type { SwitchProps };
export { Switch };
