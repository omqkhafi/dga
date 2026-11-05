import { notFound } from "next/navigation";
import { i18n, isLocale } from "@/lib/i18n";
import { llmsIndex, textHeaders } from "@/lib/llms";

export const revalidate = false;

export async function GET(_req: Request, { params }: RouteContext<"/[lang]/llms.txt">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return new Response(llmsIndex(lang), { headers: textHeaders });
}

export function generateStaticParams() {
  return i18n.languages.map((lang) => ({ lang }));
}
