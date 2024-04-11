import { client } from "@/src/shared/lib/sanity/client";
import { ExcursionType } from "@/src/enities/excursion/model/types/ExcursionDetail";

interface Props {
  slug: string;
}

export const getExcursionDetail = async ({ slug }: Props) => {
  const query = `
*[_type == "excursion" && slug.current == "${slug}"]{
  _id,
  "title": title,
  "slug": slug.current,
  "description": description,
  "weekdays": weekdays,
  "startTime":startTime[]->time,
  "duration": duration->hours,
  "dates": dates,
  "basePrices": prices[]{price, "title":category->{title[_key == "ru"]}.title[0].value, "description":category->{description[_key == "ru"]}.description[0].value},
  "promotionalPrices": promotionalPrices[]{weekdays, title, dates, "prices": prices[]{price, "title":category->{title[_key == "ru"]}.title[0].value, "description":category->{description[_key == "ru"]}.description[0].value}},
  "priceCorrections": priceCorrections[]{weekdays, title, dates, "prices": prices[]{price, "title":category->{title[_key == "ru"]}.title[0].value, "description":category->{description[_key == "ru"]}.description[0].value}},
  "city": city->title[_key == "ru"][0].value,
  "country": city->country->title[_key == "ru"][0].value,
  "category": excursionCategory->title[_key == "ru"][0].value,
  "subcategory": excursionSubcategory[]->title[0].value,
  "included": included[]->title[_key == "ru"][0].value,
  "surcharge": surcharge[]->title[_key == "ru"][0].value,
  "additionalTerms": additionalTerms[]->title[_key == "ru"][0].value,
  "meetingPoint": meetingPoint->{"title":title[_key == "ru"][0].value, "description":description[_key == "ru"][0].value, location{lng, lat} },
  "route": route[]->{"title":title[_key == "ru"][0].value, "description":description[_key == "ru"][0].value, "gallery":gallery[].asset._ref},
  "gallery": gallery[].asset._ref,
}[0]
`;
  return await client.fetch<ExcursionType>(
    query,
    {},
    {
      next: {
        revalidate: 60,
      },
    }
  );
};
