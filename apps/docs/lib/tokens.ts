import deviationsData from "./generated/deviations.json";
import data from "./generated/tokens.json";

export const tokens = data;
export const deviations = deviationsData;
export type Deviation = (typeof deviationsData)[number];
export type SemanticToken = (typeof data.semantic)[number];
export type PrimitiveToken = (typeof data.primitives)[number];
