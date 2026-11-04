import { ogImage } from "@/lib/og";

export const revalidate = false;

export function GET() {
  return ogImage({
    title: "The DGA design system for shadcn",
    description:
      "Tokens, themes and components for the Saudi DGA unified design system. Arabic-first, light and dark, WCAG AA.",
    eyebrow: "Platforms Code",
  });
}
