import { client } from "@/src/shared/lib/sanity/client";
import { ExcursionCards } from "@/src/shared/types/excursion";

export const getExcursionCards = async () => {
  const query = `
  *[_type == "excursion"]{
  _id,
  title,
    "category": excursionCategory->{_id, "title":title[_key == "ru"][0].value, "icon": icon.asset._ref},
  "subcategory": excursionSubcategory[]->{_id, "title":title[_key == "ru"][0].value, "icon": icon.asset._ref},
  "gallery": gallery[]{"src": asset._ref, "lqip": asset->metadata.lqip},
  "slug": slug.current,
  "weekdays": weekdays,
  "duration": durationObject{days, hours, minutes},
  "basePrices": prices[]{price, "title":category->{title[_key == "ru"]}.title[0].value, "description":category->{description[_key == "ru"]}.description[0].value},
  "promotionalPrices": promotionalPrices[]{weekdays, title, dates, "prices": prices[]{price, "title":category->{title[_key == "ru"]}.title[0].value, "description":category->{description[_key == "ru"]}.description[0].value}}[dates.dateFrom <= now() && dates.dateTo >= now()],
  "priceCorrections": priceCorrections[]{weekdays, title, dates, "prices": prices[]{price, "title":category->{title[_key == "ru"]}.title[0].value, "description":category->{description[_key == "ru"]}.description[0].value}}[dates.dateFrom <= now() && dates.dateTo >= now()],
  }
`;
  return await client.fetch<ExcursionCards>(
    query,
    {},
    {
      next: {
        revalidate: 60,
      },
    }
  );
};
