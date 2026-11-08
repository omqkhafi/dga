// The map of the Phase 7 "misc" previews. It lives outside the "use client" file because a server
// component (the preview index) cannot read an object exported from a client module.
import type { ComponentType } from "react";
import {
  ComboboxAsync,
  ComboboxBasic,
  ComboboxCreatable,
  ComboboxGroups,
  ComboboxMultiple,
  ComboboxOpen,
  ComboboxStates,
  CommandBasic,
  CommandDialogDemo,
  CommandEmpty,
  DigitalStampClosed,
  DigitalStampDomains,
  DigitalStampOpen,
} from "./ext-misc";

export const miscPreviews = {
  "combobox-basic": ComboboxBasic,
  "combobox-states": ComboboxStates,
  "combobox-open": ComboboxOpen,
  "combobox-multiple": ComboboxMultiple,
  "combobox-groups": ComboboxGroups,
  "combobox-creatable": ComboboxCreatable,
  "combobox-async": ComboboxAsync,
  "command-basic": CommandBasic,
  "command-empty": CommandEmpty,
  "command-dialog": CommandDialogDemo,
  "digital-stamp-closed": DigitalStampClosed,
  "digital-stamp-open": DigitalStampOpen,
  "digital-stamp-domains": DigitalStampDomains,
} satisfies Record<string, ComponentType>;
