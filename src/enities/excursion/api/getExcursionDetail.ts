import { client } from "@/src/shared/lib/sanity/client";
import { ExcursionType } from "@/src/enities/excursion/model/types/ExcursionDetail";

export const getExcursionDetail = async () => {
  const query = `
  *[_type == "excursion" && slug.current == "town-of-cesky-krumlov-and-hluboka-nad-vltavou-castle" ]{
    excursionSubcategory[]->{"title":title[_key == "ru"][0].value, "icon":icon.asset._ref},
  _id,
  title,
  "slug":slug.current,
  description,
  city->{"title":title[_key == "ru"][0].value, "country":country->{"title":title[_key == "ru"][0].value}},
  excursionCategory->{"title":title[_key == "ru"][0].value},
  included[]->{"title":title[_key == "ru"][0].value},
  surcharge[]->{"title":title[_key == "ru"][0].value},
  meetingPoint->{"title":title[_key == "ru"][0].value, "description":description[_key == "ru"][0].value, location{lng, lat} },
  route[]->{"title":title[_key == "ru"][0].value, "description":description[_key == "ru"][0].value, "gallery":gallery[].asset._ref},
  "gallery": gallery[].asset._ref,
  "schedule": schedule[] {
    weekdays,
    dates,
    "startTime":startTime->time,
    "duration": duration->hours,
    "prices": prices[] {
      price,
      "category": category -> {
        "title": title[_key == "ru"][0].value,
        "description": description[_key == "ru"][0].value
      }
    }
  }
}[0]
`;
  return await client.fetch<ExcursionType>(query);
};
