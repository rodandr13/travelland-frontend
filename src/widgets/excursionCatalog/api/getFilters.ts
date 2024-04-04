import { client } from "@/src/shared/lib/sanity/client";
import { FiltersType } from "@/src/widgets/excursionCatalog/model/types/FiltersType";

export const getFilters = async () => {
  const query = `*[_type == "excursionSubcategory" || _type == "excursionCategory"]{_id, icon, "title": title[_key == "ru"][0]{value}}`;
  return await client.fetch<FiltersType>(query);
};
