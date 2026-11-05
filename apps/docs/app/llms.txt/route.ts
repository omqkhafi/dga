import { llmsIndex, textHeaders } from "@/lib/llms";

export const revalidate = false;

// The unprefixed address keeps working and serves English; /ar/llms.txt is the Arabic index.
export const GET = () => new Response(llmsIndex("en"), { headers: textHeaders });
