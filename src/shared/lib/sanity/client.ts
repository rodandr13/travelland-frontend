import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION;

interface UrlForParams {
  width?: number;
  height?: number;
}

export const client = createClient({
  perspective: "published",
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});

const builder = imageUrlBuilder(client);

export const urlFor = (
  source: string,
  { width, height }: UrlForParams = {}
) => {
  let imageBuilder = builder.image(source);

  // Применяем ширину и высоту, если они указаны
  if (width) {
    imageBuilder = imageBuilder.width(width);
  }
  if (height) {
    imageBuilder = imageBuilder.height(height);
  }

  return imageBuilder.url();
};
