import { notFound } from "next/navigation";
import { previewNames, previews } from "@/components/previews";

export default async function PreviewPage(props: PageProps<"/preview/[name]">) {
  const { name } = await props.params;
  const Demo = previews[name as keyof typeof previews];
  if (!Demo) notFound();
  return (
    <main className="p-4">
      <Demo />
    </main>
  );
}

export function generateStaticParams() {
  return previewNames.map((name) => ({ name }));
}

export const dynamicParams = false;
