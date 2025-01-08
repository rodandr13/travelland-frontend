import { client } from "@/shared/lib/sanity/client";
import { ExcursionCards } from "@/shared/types/excursion";

export const getAllExcursionSlugs = async () => {
  const query = `
  *[_type == "excursion"]{
  "slug": slug.current,
}
  `;
  return await client.fetch<ExcursionCards>(query);
};
