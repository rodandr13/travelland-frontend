import { client } from "@/shared/lib/sanity/client";
import { ExcursionType } from "@/shared/types/excursion";

interface Props {
  slug: string;
}

export const getExcursionDetail = async ({ slug }: Props) => {
  const query = `
*[_type == "excursion" && slug.current == "${slug}"]{
  _id,
  _type,
  "title": title,
  "slug": slug.current,
  "description": description,
  "weekdays": weekdays,
  "startTime":startTime[]->time,
  "duration": durationObject{days, hours, minutes},
  "dates": dates,
  "basePrices": prices[]{price, "groupSize": category->size, "title":category->{title[_key == "ru"]}.title[0].value, "categoryId": category->_id, "description":category->{description[_key == "ru"]}.description[0].value, "key": category->key, "type": category->_type},
  "promotionalPrices": promotionalPrices[]{weekdays, title, dates, "prices": prices[]{price, "groupSize": category->size, "categoryId": category->_id, "title":category->{title[_key == "ru"]}.title[0].value, "description":category->{description[_key == "ru"]}.description[0].value, "key": category->key, "type": category->_type}},
  "priceCorrections": priceCorrections[]{weekdays, title, dates, "prices": prices[]{price,"groupSize": category->size, "categoryId": category->_id, "title":category->{title[_key == "ru"]}.title[0].value, "description":category->{description[_key == "ru"]}.description[0].value, "key": category->key, "type": category->_type}},
  "city": city->title[_key == "ru"][0].value,
  "country": city->country->title[_key == "ru"][0].value,
  "category": excursionCategory->{
    "title": title[_key == "ru"][0].value,
    "icon": icon.asset._ref,
    key
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
    "gallery": gallery[]{"src": asset._ref, "lqip": asset->metadata.lqip},
  },
  "endingPlace": startingPlace->{
    "description":description[_key == "ru"][0].value,
    location{lng, lat},
    "gallery": gallery[]{"src": asset._ref, "lqip": asset->metadata.lqip},
  },
  "route": visitPlaces[]->{"title":title[_key == "ru"][0].value, "description":description[_key == "ru"][0].value, "gallery":gallery[]{"src": asset._ref, "lqip": asset->metadata.lqip}},
  "gallery": gallery[]{"src": asset._ref, "lqip": asset->metadata.lqip},
}[0]
`;
  return await client.fetch<ExcursionType>(query);
};
