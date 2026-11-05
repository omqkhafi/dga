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
    <SwitchPrimitive.Root data-slot="switch" className={cn("relative inline-flex h-6 w-12 shrink-0 cursor-pointer items-center rounded-full border-0 bg-control-border p-0.5 transition-colors focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-border-black data-checked:bg-control-primary-checked hover:data-checked:not-data-disabled:bg-control-primary-hovered active:data-checked:not-data-disabled:bg-control-primary-pressed data-invalid:not-data-checked:outline-2 data-invalid:not-data-checked:outline-solid data-invalid:not-data-checked:outline-field-border-error data-disabled:cursor-not-allowed data-disabled:bg-border-disabled data-disabled:data-checked:bg-border-disabled data-readonly:cursor-default data-readonly:bg-transparent data-readonly:ring-1 data-readonly:ring-control-border data-readonly:ring-inset motion-reduce:transition-none", className)} {...props}>
      <SwitchPrimitive.Thumb data-slot="switch-thumb" className="pointer-events-none flex size-5 shrink-0 items-center justify-center rounded-full bg-control-thumb transition-[margin] ms-0 data-checked:ms-6 motion-reduce:transition-none [[data-readonly]>&]:bg-icon-default-500">
        {icon ? <HugeiconsIcon icon={Tick02Icon} aria-hidden className="hidden size-3.5 text-control-primary-checked [[data-checked]>&]:block" /> : null}
      </SwitchPrimitive.Thumb>
    </SwitchPrimitive.Root>
  );
}

export type { SwitchProps };
export { Switch };
