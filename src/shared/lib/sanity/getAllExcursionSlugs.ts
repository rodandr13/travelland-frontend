import { client } from "@/src/shared/lib/sanity/client";
import { ExcursionCardsType } from "@/src/enities/excursion/model/types/ExcursionCard";

export const getAllExcursionSlugs = async () => {
  const query = `
  *[_type == "excursion"]{
  "slug": slug.current,
}
  `;
  return await client.fetch<ExcursionCardsType>(query);
};
