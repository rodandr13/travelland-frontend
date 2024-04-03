import { ExcursionPage } from "@/src/pages/excursionPage";
import { getAllExcursionSlugs } from "@/src/shared/lib/sanity/getAllExcursionSlugs";

export async function generateStaticParams() {
  return await getAllExcursionSlugs();
}

export default function Page({ params }: { params: { slug: string } }) {
  return <ExcursionPage slug={params.slug} />;
}
