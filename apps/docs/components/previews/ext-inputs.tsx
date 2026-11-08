// The Phase 7 inputs previews. The demos are client components (ext-inputs-demos.tsx); this map has
// no "use client", because a server module cannot spread an object exported from a client one.
import type { ComponentType } from "react";
import {
  ButtonGroupBasic,
  ButtonGroupParts,
  ButtonGroupVertical,
  InputGroupAddons,
  InputGroupButtons,
  InputGroupStates,
  OtpBasic,
  OtpGroups,
  OtpStates,
  OtpVerify,
  SliderBasic,
  SliderRange,
  SliderStates,
  ToggleGroupMultiple,
  ToggleGroupSingle,
  ToggleGroupVertical,
  ToggleSizes,
  ToggleVariants,
} from "./ext-inputs-demos";

/** Names are the `<Preview name>` values on the docs pages. */
export const inputsPreviews = {
  "slider-basic": SliderBasic,
  "slider-range": SliderRange,
  "slider-states": SliderStates,
  "input-otp-basic": OtpBasic,
  "input-otp-groups": OtpGroups,
  "input-otp-states": OtpStates,
  "input-otp-verify": OtpVerify,
  "toggle-variants": ToggleVariants,
  "toggle-sizes": ToggleSizes,
  "toggle-group-single": ToggleGroupSingle,
  "toggle-group-multiple": ToggleGroupMultiple,
  "toggle-group-vertical": ToggleGroupVertical,
  "input-group-addons": InputGroupAddons,
  "input-group-buttons": InputGroupButtons,
  "input-group-states": InputGroupStates,
  "button-group-basic": ButtonGroupBasic,
  "button-group-parts": ButtonGroupParts,
  "button-group-vertical": ButtonGroupVertical,
} satisfies Record<string, ComponentType>;
