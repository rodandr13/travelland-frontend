import { client } from "@/src/shared/lib/sanity/client";
import { ExcursionCardsType } from "@/src/enities/excursion/model/types/ExcursionCard";

export const getExcursionCards = async () => {
  const query = `
  *[_type == "excursion"]{
  _id,
  title,
  excursionCategory->{"title":title[_key == "ru"][0].value},
  excursionSubcategory[]->{"title":title[_key == "ru"][0].value},
  "gallery": gallery[].asset._ref,
  "slug": slug.current,
  "schedule": schedule[] {
    weekdays,
    duration -> {
      hours
    },
    "prices": prices[] {
      price,
      "category": category -> {
        "title": title[_key == "ru"][0].value,
        "description": description[_key == "ru"][0].value
      }
    }
  }
}
  `;
  return await client.fetch<ExcursionCardsType>(query);
};