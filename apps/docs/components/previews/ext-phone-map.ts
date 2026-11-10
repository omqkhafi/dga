// The map of the Phone Input previews, outside the "use client" file for the same reason as the
// other ext-*-map files.
import type { ComponentType } from "react";
import { PhoneBasic, PhoneCountries, PhoneForm, PhoneOpen, PhoneStates } from "./ext-phone";

export const phonePreviews = {
  "phone-input-basic": PhoneBasic,
  "phone-input-states": PhoneStates,
  "phone-input-open": PhoneOpen,
  "phone-input-countries": PhoneCountries,
  "phone-input-form": PhoneForm,
} satisfies Record<string, ComponentType>;
