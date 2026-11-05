import { Step, Steps } from "fumadocs-ui/components/steps";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import { TypeTable } from "fumadocs-ui/components/type-table";
import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";
import type { ComponentType } from "react";
import type { Locale } from "@/lib/i18n";
import { ApiReference } from "./docs/api-reference";
import { Callout } from "./docs/callout";
import { ComponentContrast } from "./docs/contrast";
import { ContrastReport } from "./docs/contrast-report";
import { ComponentDeviations } from "./docs/deviations";
import { ComponentInstall } from "./docs/install";
import { MdxPre } from "./docs/mdx-pre";
import { DarkNeutrals } from "./foundations/dark-neutrals";
import { DeviationsTable } from "./foundations/deviations-table";
import { IconBrowser } from "./foundations/icon-browser";
import { PrimitivePalettes } from "./foundations/palettes";
import {
  AliasTable,
  BreakpointTable,
  GridTable,
  RadiusTable,
  SemanticColors,
  ShadcnMapping,
  ShadowTable,
  SpacingScale,
  SpacingTokens,
  TypeScaleTable,
  WeightTable,
} from "./foundations/tables";
import { ThemeCompare } from "./foundations/theme-compare";
import { DirectionCompare, Preview } from "./preview/preview";

/** Gives a server component the page's language, so its text follows the locale. */
const withLang =
  <P extends { lang?: Locale }>(Component: ComponentType<P>, lang: Locale) =>
  (props: Omit<P, "lang">) => <Component {...(props as P)} lang={lang} />;

export function getMDXComponents(components?: MDXComponents, lang: Locale = "en") {
  return {
    ...defaultMdxComponents,
    // Every code block gets a file header, like the owner's other docs sites.
    pre: MdxPre,
    Step,
    Steps,
    Tab,
    Tabs,
    Preview,
    DirectionCompare,
    TypeTable,
    PrimitivePalettes: withLang(PrimitivePalettes, lang),
    SemanticColors,
    ShadcnMapping: withLang(ShadcnMapping, lang),
    AliasTable: withLang(AliasTable, lang),
    TypeScaleTable: withLang(TypeScaleTable, lang),
    WeightTable: withLang(WeightTable, lang),
    SpacingScale,
    SpacingTokens: withLang(SpacingTokens, lang),
    BreakpointTable: withLang(BreakpointTable, lang),
    GridTable: withLang(GridTable, lang),
    RadiusTable: withLang(RadiusTable, lang),
    ShadowTable: withLang(ShadowTable, lang),
    IconBrowser,
    DeviationsTable,
    DarkNeutrals: withLang(DarkNeutrals, lang),
    ThemeCompare: withLang(ThemeCompare, lang),
    ApiReference: withLang(ApiReference, lang),
    Callout,
    ContrastReport,
    ComponentInstall: withLang(ComponentInstall, lang),
    ComponentContrast: withLang(ComponentContrast, lang),
    ComponentDeviations: withLang(ComponentDeviations, lang),
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
