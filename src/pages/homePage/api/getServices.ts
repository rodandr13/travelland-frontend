import { client } from "@/src/shared/lib/sanity/client";
import { Service } from "@/src/shared/types/service";

export const getServices = async () => {
  const query = `
  *[_type == "service"]{
  _id,
  "image": image{"src": asset._ref, "lqip": asset->metadata.lqip},
  "title": title[_key == "ru"][0].value,
  "description": description[_key == "ru"][0].value
}
  `;
  return await client.fetch<Service[]>(query);
};
