import { client } from "@/src/shared/lib/sanity/client";
import { ExcursionCardsType } from "@/src/enities/excursion/model/types/ExcursionCard";

export const getExcursionCards = async () => {
  const query = `
  *[_type == "excursion"]{
  _id,
  title,
  "category": excursionCategory->title[_key == "ru"][0].value,
  "subcategory": excursionSubcategory[]->title[0].value,
  "gallery": gallery[]{"src": asset._ref, "lqip": asset->metadata.lqip},
  "slug": slug.current,
  "weekdays": weekdays,
  "duration": duration->hours,
  "basePrices": prices[category->{title[_key == "ru"]}.title[0].value == "Взрослые"][0].price,
  "promotionalPrices": promotionalPrices[].prices[category->{title[_key == "ru"]}.title[0].value == "Взрослые"][0].price,
  "priceCorrections": priceCorrections[].prices[category->{title[_key == "ru"]}.title[0].value == "Взрослые"][0].price,
  }
`;
  return await client.fetch<ExcursionCardsType>(
    query,
    {},
    {
      next: {
        revalidate: 60,
      },
    }
  );
};
