"use client";

import { Input as InputPrimitive } from "@base-ui/react/input";
import { Cancel01Icon, Search01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import * as React from "react";
import { cn } from "@/registry/bases/base/lib/utils";
import { inputVariants } from "@/registry/bases/base/ui/input";

type SearchBoxProps = Omit<InputPrimitive.Props, "size" | "type" | "onChange" | "onValueChange"> & {
  /** Height: `md` 32px, `lg` 40px. */
  size?: "md" | "lg";
  /** Fill style. `lighter` and `darker` keep the border. */
  appearance?: "default" | "lighter" | "darker";
  /** Called with the new text whenever it changes, including when it is cleared. */
  onValueChange?: (value: string) => void;
  /** Accessible name of the clear button. Translate it on Arabic pages. */
  clearLabel?: string;
  /** Class names for the native `<input>`. `className` styles the box around it. */
  inputClassName?: string;
  /** Ref to the native `<input>`. */
  ref?: React.Ref<HTMLInputElement>;
};

/**
 * A search field with a search icon on the start side and a clear button on the end side
 * that appears once there is text. It is `type="search"`, so Escape clears it too.
 */
function SearchBox({
  className,
  inputClassName,
  size,
  appearance,
  value,
  defaultValue,
  onValueChange,
  clearLabel = "Clear search",
  disabled,
  readOnly,
  ref,
  ...props
}: SearchBoxProps) {
  const inner = React.useRef<HTMLInputElement>(null);
  const [internal, setInternal] = React.useState(String(defaultValue ?? ""));
  const text = value === undefined ? internal : String(value);
  const setRefs = (node: HTMLInputElement | null) => {
    inner.current = node;
    if (typeof ref === "function") ref(node);
    else if (ref) (ref as React.RefObject<HTMLInputElement | null>).current = node;
  };

  const change = (next: string) => {
    if (value === undefined) setInternal(next);
    onValueChange?.(next);
  };

  return (
    <div
      data-slot="search-box"
      data-size={size ?? "lg"}
      className={cn(inputVariants({ size, appearance }), className)}
    >
      <span aria-hidden="true" className="inline-flex shrink-0 items-center text-text-primary-paragraph [&_svg]:shrink-0 [&_svg]:text-icon-default-500">
        <HugeiconsIcon icon={Search01Icon} />
      </span>
      <InputPrimitive
        data-slot="input-field"
        type="search"
        ref={setRefs}
        value={text}
        onChange={(event) => change(event.currentTarget.value)}
        disabled={disabled}
        readOnly={readOnly}
        className={cn("h-full min-w-0 flex-1 bg-transparent p-0 text-inherit [outline:0_none] placeholder:text-(--field-placeholder) disabled:cursor-not-allowed disabled:text-text-default-disabled disabled:placeholder:text-text-default-disabled read-only:text-field-text-readonly [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none", inputClassName)}
        {...props}
      />
      {text && !disabled && !readOnly ? (
        <button
          type="button"
          data-slot="search-clear"
          aria-label={clearLabel}
          className="-me-1 inline-flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-xs text-icon-default-500 transition-colors hover:bg-button-background-neutral-default hover:text-icon-default active:bg-button-background-neutral-pressed focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-1 focus-visible:outline-border-black [&_svg]:size-4"
          onClick={() => {
            change("");
            inner.current?.focus();
          }}
        >
          <HugeiconsIcon icon={Cancel01Icon} aria-hidden className="size-4" />
        </button>
      ) : null}
    </div>
  );
}

export type { SearchBoxProps };
export { SearchBox };
