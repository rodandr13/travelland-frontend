import { client } from "@/src/shared/lib/sanity/client";

export const getHero = async () => {
  const query = `
  *[_type == "settingsApp"]{
  _id,
  "image": heroImage{"src": asset._ref, "lqip": asset->metadata.lqip},
  "title": heroTitle[_key == "ru"][0].value,
}[0]
  `;
  return await client.fetch(
    query,
    {},
    {
      next: {
        revalidate: 60,
      },
    }
  );
};
