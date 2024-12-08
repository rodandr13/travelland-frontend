import { client } from "@/src/shared/lib/sanity/client";
import { slow } from "@/src/shared/lib/slow";
import { Service } from "@/src/shared/types/service";

export const getServices = async () => {
  await slow(3000);

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
