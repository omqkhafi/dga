import { llmsFull, textHeaders } from "@/lib/llms";

export const revalidate = false;

export async function GET() {
  return new Response(await llmsFull("en"), { headers: textHeaders });
}
