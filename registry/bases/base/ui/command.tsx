"use client";

import { Autocomplete as AutocompletePrimitive } from "@base-ui/react/autocomplete";
import { Search01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import * as React from "react";
import { matchesQuery } from "@/components/dga/combobox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/dga/dialog";
import { inputVariants } from "@/components/dga/input";
import { AutoDirection } from "@/lib/dga/direction";
import { cn } from "@/registry/bases/base/lib/utils";

/** One action in the list. */
type CommandOption = {
  /** Unique id of the action. */
  value: string;
  /** What people read and search. */
  label: string;
  /** A Hugeicons icon before the label. */
  icon?: IconSvgElement;
  /** Keys shown at the end, such as `⌘K`. They only describe the shortcut: you wire it up. */
  shortcut?: string;
  /** Extra words that also match the search. */
  keywords?: string[];
  disabled?: boolean;
  /** Runs when the action is chosen with Enter or a click. */
  onSelect?: () => void;
};

/** A heading with its actions. */
type CommandGroupData = { label: string; items: CommandOption[] };

type CommandProps = Omit<
  AutocompletePrimitive.Root.Props<CommandOption>,
  "items" | "children" | "inline" | "open" | "filter" | "onValueChange"
> & {
  /** The actions, in groups. */
  items: CommandGroupData[];
  /** Called after an action is chosen, with that action. */
  onSelect?: (option: CommandOption) => void;
  /** The hint in the empty search box. Translate it on Arabic pages. */
  placeholder?: string;
  /** Accessible name of the search box. Translate it on Arabic pages. */
  inputLabel?: string;
  /** Shown when nothing matches. Translate it on Arabic pages. */
  emptyText?: React.ReactNode;
  /** The text read to screen readers when the number of results changes. */
  countLabel?: (count: number) => string;
  /** The text typed into the search box. Use it to control the search. */
  query?: string;
  /** Called when the search text changes. */
  onQueryChange?: (query: string) => void;
  /** Custom matching. The default ignores case and Arabic diacritics. */
  filter?: ((option: CommandOption, query: string) => boolean) | null;
  /** Class names for the outer box. */
  className?: string;
};

/**
 * A search box over a list of actions (shadcn: Command, a Platform Code extension; the look is
 * DGA's Search Box and Menu). It runs actions, it does not store a value: for a form field that
 * stores a choice use Combobox. Type to filter, arrow keys move, Enter runs the highlighted
 * action. The first match is highlighted as you type. Put it in a CommandDialog for a palette.
 * Built on Base UI Autocomplete, so there is no cmdk dependency.
 */
function Command({
  className,
  items,
  onSelect,
  placeholder = "Type a command or search…",
  inputLabel = "Search commands",
  emptyText = "No results found.",
  countLabel = (count) => (count === 1 ? "1 result" : `${count} results`),
  query,
  onQueryChange,
  filter,
  ...props
}: CommandProps) {
  const match = filter === undefined ? matchesQuery : filter;
  return (
    <AutoDirection>
      <AutocompletePrimitive.Root
        open
        inline
        items={items}
        autoHighlight="always"
        keepHighlight
        itemToStringValue={(option) => option.label}
        value={query}
        onValueChange={(text) => onQueryChange?.(text)}
        filter={match === null ? null : (option, text) => match(option, text)}
        {...props}
      >
        <div data-slot="command" className={cn("cn-command", className)}>
          <div className={cn(inputVariants({ size: "lg" }), "cn-command-search")}>
            <span aria-hidden="true" className="cn-input-adornment">
              <HugeiconsIcon icon={Search01Icon} />
            </span>
            <AutocompletePrimitive.Input
              data-slot="command-input"
              className="cn-input-field"
              aria-label={inputLabel}
              placeholder={placeholder}
            />
          </div>
          <CommandResults emptyText={emptyText} countLabel={countLabel} onSelect={onSelect} />
        </div>
      </AutocompletePrimitive.Root>
    </AutoDirection>
  );
}

function CommandResults({
  emptyText,
  countLabel,
  onSelect,
}: {
  emptyText: React.ReactNode;
  countLabel: (count: number) => string;
  onSelect?: (option: CommandOption) => void;
}) {
  const filtered = AutocompletePrimitive.useFilteredItems<CommandGroupData>();
  const count = filtered.reduce((n, group) => n + group.items.length, 0);
  return (
    <>
      <AutocompletePrimitive.Status className="sr-only">
        {countLabel(count)}
      </AutocompletePrimitive.Status>
      <div className="cn-command-results">
        <AutocompletePrimitive.Empty data-slot="command-empty" className="cn-command-empty">
          {emptyText}
        </AutocompletePrimitive.Empty>
        <AutocompletePrimitive.List data-slot="command-list" className="cn-command-list">
          {(group: CommandGroupData) => (
            <AutocompletePrimitive.Group
              key={group.label}
              items={group.items}
              data-slot="command-group"
              className="cn-command-group"
            >
              <AutocompletePrimitive.GroupLabel className="cn-command-label">
                {group.label}
              </AutocompletePrimitive.GroupLabel>
              <AutocompletePrimitive.Collection>
                {(option: CommandOption) => (
                  <AutocompletePrimitive.Item
                    key={option.value}
                    value={option}
                    disabled={option.disabled}
                    data-slot="command-item"
                    className="cn-command-item"
                    onClick={() => {
                      option.onSelect?.();
                      onSelect?.(option);
                    }}
                  >
                    {option.icon ? <HugeiconsIcon icon={option.icon} aria-hidden /> : null}
                    <span className="cn-command-item-text">{option.label}</span>
                    {option.shortcut ? <CommandShortcut>{option.shortcut}</CommandShortcut> : null}
                  </AutocompletePrimitive.Item>
                )}
              </AutocompletePrimitive.Collection>
            </AutocompletePrimitive.Group>
          )}
        </AutocompletePrimitive.List>
      </div>
    </>
  );
}

/** Keys at the end of an action. They stay left to right in Arabic. */
function CommandShortcut({ className, ...props }: React.ComponentProps<"kbd">) {
  return (
    <kbd
      data-slot="command-shortcut"
      dir="ltr"
      className={cn("cn-command-shortcut", className)}
      {...props}
    />
  );
}

type CommandDialogProps = Omit<CommandProps, "className"> & {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** The name of the dialog, read when it opens. Translate it on Arabic pages. */
  title?: string;
  /** Explains the dialog to screen readers. Translate it on Arabic pages. */
  description?: string;
  /** Closes the dialog after an action runs. Default `true`. */
  closeOnSelect?: boolean;
  /** The button that opens it. */
  trigger?: React.ReactElement;
};

/**
 * Command in a Dialog, centred over the page. Open it from a button with `trigger`, or control
 * `open` yourself and listen for <kbd>Ctrl</kbd>+<kbd>K</kbd> or <kbd>⌘</kbd>+<kbd>K</kbd> in
 * your app: the component does not bind keys on its own. Focus goes to the search box, Escape
 * closes it and focus returns to what had it before.
 */
function CommandDialog({
  open,
  defaultOpen,
  onOpenChange,
  title = "Command menu",
  description = "Search for an action and press Enter to run it.",
  closeOnSelect = true,
  trigger,
  onSelect,
  ...props
}: CommandDialogProps) {
  const [inner, setInner] = React.useState(defaultOpen ?? false);
  const isOpen = open ?? inner;
  const change = (next: boolean) => {
    if (open === undefined) setInner(next);
    onOpenChange?.(next);
  };
  return (
    <Dialog open={isOpen} onOpenChange={change}>
      {trigger ? <DialogTrigger render={trigger} /> : null}
      <DialogContent size="md" showCloseButton={false} className="cn-command-dialog">
        <DialogTitle className="sr-only">{title}</DialogTitle>
        <DialogDescription className="sr-only">{description}</DialogDescription>
        <Command
          {...props}
          className="cn-command-in-dialog"
          onSelect={(option) => {
            onSelect?.(option);
            if (closeOnSelect) change(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
}

export type { CommandDialogProps, CommandGroupData, CommandOption, CommandProps };
export { Command, CommandDialog, CommandShortcut };
