import { buildSearchIndex } from "@/lib/search-index";

// Prebuilt at build time: the search dialog fetches this once and filters it in memory.
export const dynamic = "force-static";

export async function GET() {
  return Response.json(await buildSearchIndex(), {
    headers: { "Cache-Control": "public, max-age=3600" },
  });
}
