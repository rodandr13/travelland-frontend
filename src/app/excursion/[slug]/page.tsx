import { ExcursionPage } from "@/src/pages/excursionPage";
import { getAllExcursionSlugs } from "@/src/shared/lib/sanity/getAllExcursionSlugs";

export async function generateStaticParams() {
  return await getAllExcursionSlugs();
}

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  return <ExcursionPage slug={params.slug} />;
}
