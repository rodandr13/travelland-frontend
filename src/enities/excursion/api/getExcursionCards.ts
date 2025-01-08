import { client } from "@/shared/lib/sanity/client";
import { ExcursionCards } from "@/shared/types/excursion";

export const getExcursionCards = async () => {
  const query = `
  *[_type == "excursion"]{
  _id,
  _type,
  "title": title,
  "slug": slug.current,
  "weekdays": weekdays,
  "duration": durationObject{days, hours, minutes},
  "dates": dates,
  "basePrices": prices[]{price, "groupSize": category->size, "title":category->{title[_key == "ru"]}.title[0].value, "categoryId": category->_id, "description":category->{description[_key == "ru"]}.description[0].value, "key": category->key, "type": category->_type},
  "promotionalPrices": promotionalPrices[]{weekdays, title, dates, "prices": prices[]{price, "groupSize": category->size, "categoryId": category->_id, "title":category->{title[_key == "ru"]}.title[0].value, "description":category->{description[_key == "ru"]}.description[0].value, "key": category->key, "type": category->_type}},
  "priceCorrections": priceCorrections[]{weekdays, title, dates, "prices": prices[]{price, "groupSize": category->size, "categoryId": category->_id, "title":category->{title[_key == "ru"]}.title[0].value, "description":category->{description[_key == "ru"]}.description[0].value, "key": category->key, "type": category->_type}},
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
  "gallery": gallery[]{"src": asset._ref, "lqip": asset->metadata.lqip},
}
`;
  return await client.fetch<ExcursionCards>(query);
};
