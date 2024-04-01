import { client } from "@/src/shared/lib/sanity/client";

export const getFilters = async () => {
  const query = `*[_type == "excursionSubcategory" || _type == "excursionCategory"]{_id, icon, "title": title[_key == "ru"][0]{value}}`;
  return await client.fetch<Filters>(query);
};
