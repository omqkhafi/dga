import { notFound } from "next/navigation";
import { i18n, isLocale } from "@/lib/i18n";
import { llmsCatalog } from "@/lib/llms";

export const revalidate = false;

export async function GET(_req: Request, { params }: RouteContext<"/[lang]/llms.json">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return Response.json(llmsCatalog(lang), {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}

export function generateStaticParams() {
  return i18n.languages.map((lang) => ({ lang }));
}
