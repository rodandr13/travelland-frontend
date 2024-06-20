import { client } from "@/src/shared/lib/sanity/client";
import { ExcursionCards } from "@/src/shared/types/excursion";

export const getAllExcursionSlugs = async () => {
  const query = `
  *[_type == "excursion"]{
  "slug": slug.current,
}
  `;
  return await client.fetch<ExcursionCards>(query);
};
