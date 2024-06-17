import { ExcursionType } from "@/src/enities/excursion/model/types/ExcursionDetail";
import { client } from "@/src/shared/lib/sanity/client";

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
  "duration": durationObject{days, hours, minutes},
  "dates": dates,
  "basePrices": prices[]{price, "title":category->{title[_key == "ru"]}.title[0].value, "description":category->{description[_key == "ru"]}.description[0].value},
  "promotionalPrices": promotionalPrices[]{weekdays, title, dates, "prices": prices[]{price, "title":category->{title[_key == "ru"]}.title[0].value, "description":category->{description[_key == "ru"]}.description[0].value}},
  "priceCorrections": priceCorrections[]{weekdays, title, dates, "prices": prices[]{price, "title":category->{title[_key == "ru"]}.title[0].value, "description":category->{description[_key == "ru"]}.description[0].value}},
  "city": city->title[_key == "ru"][0].value,
  "country": city->country->title[_key == "ru"][0].value,
  "category": excursionCategory->{
    "title": title[_key == "ru"][0].value,
    "icon": icon.asset._ref
  },
  "subcategory": excursionSubcategory[]->{
    "title": title[0].value,
    "icon": icon.asset._ref
  },
  "included": included[]->title[_key == "ru"][0].value,
  "surcharge": surcharge[]->title[_key == "ru"][0].value,
  "parameters": excursionParameters[]->{"title": title[_key == "ru"][0].value, "value": value[_key == "ru"][0].value,"icon": icon.asset._ref},
  "additionalTerms": additionalTerms[]->title[_key == "ru"][0].value,
    "startingPlace": startingPlace->{
    "description":description[_key == "ru"][0].value,
    location{lng, lat},
    image{"src": asset._ref, "lqip": asset->metadata.lqip},
  },
  "endingPlace": startingPlace->{
    "description":description[_key == "ru"][0].value,
    location{lng, lat},
    image{"src": asset._ref, "lqip": asset->metadata.lqip},
  },
  "route": route[]->{"title":title[_key == "ru"][0].value, "description":description[_key == "ru"][0].value, "gallery":gallery[]{"src": asset._ref, "lqip": asset->metadata.lqip}},
  "gallery": gallery[]{"src": asset._ref, "lqip": asset->metadata.lqip},
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
