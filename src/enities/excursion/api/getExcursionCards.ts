import { client } from "@/src/shared/lib/sanity/client";
import { ExcursionCardsType } from "@/src/enities/excursion/model/types/ExcursionCard";

export const getExcursionCards = async () => {
  const query = `
  *[_type == "excursion"]{
  _id,
  title,
  "gallery": gallery[].asset._ref,
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
