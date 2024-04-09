import { client } from "@/src/shared/lib/sanity/client";
import { ExcursionCardsType } from "@/src/enities/excursion/model/types/ExcursionCard";

export const getExcursionCards = async () => {
  const query = `
  *[_type == "excursion"]{
  _id,
  title,
  "category": excursionCategory->title[_key == "ru"][0].value,
  "subcategory": excursionSubcategory[]->title[0].value,
  "gallery": gallery[].asset._ref,
  "slug": slug.current,
  "weekdays": weekdays,
  "duration": duration[]->hours,
  "basePrices": prices[]{price, "title":category->{title[_key == "ru"]}.title[0].value, "description":category->{description[_key == "ru"]}.description[0].value},
  "promotionalPrices": promotionalPrices[]{weekdays, title, dates, "prices": prices[]{price, "title":category->{title[_key == "ru"]}.title[0].value, "description":category->{description[_key == "ru"]}.description[0].value}},
}
`;
  return await client.fetch<ExcursionCardsType>(query);
};
