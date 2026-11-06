"use client";

import { Input as InputPrimitive } from "@base-ui/react/input";
import { Cancel01Icon, Search01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import * as React from "react";
import { inputVariants } from "@/components/dga/input";
import { cn } from "@/registry/bases/base/lib/utils";

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
      <span aria-hidden="true" className="cn-input-adornment">
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
        className={cn("cn-input-field", inputClassName)}
        {...props}
      />
      {text && !disabled && !readOnly ? (
        <button
          type="button"
          data-slot="search-clear"
          aria-label={clearLabel}
          className="cn-search-clear"
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
