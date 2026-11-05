import { llmsCatalog } from "@/lib/llms";

export const revalidate = false;

// The unprefixed address keeps working and serves English, like /llms.txt.
export const GET = () =>
  Response.json(llmsCatalog("en"), {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
