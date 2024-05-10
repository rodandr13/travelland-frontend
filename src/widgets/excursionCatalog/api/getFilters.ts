import { client } from "@/src/shared/lib/sanity/client";

import { FiltersType } from "../model/types/FiltersType";

export const getFilters = async () => {
  const query = `
  *[_type == "excursionSubcategory" || _type == "excursionCategory"]{
  _id,
  "icon": icon.asset._ref,
  "title": title[_key == "ru"][0].value
}
  `;
  return await client.fetch<FiltersType>(
    query,
    {},
    {
      next: {
        revalidate: 60,
      },
    }
  );
};
