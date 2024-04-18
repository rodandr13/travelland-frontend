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

interface UrlForParams {
  width?: number;
  height?: number;
  blur?: number;
}

export const urlFor = (
  source: string,
  { width, height, blur }: UrlForParams = {}
) => {
  let imageBuilder = builder.image(source);

  if (width) {
    imageBuilder = imageBuilder.width(width);
  }
  if (height) {
    imageBuilder = imageBuilder.height(height);
  }
  if (blur) {
    imageBuilder = imageBuilder.blur(blur);
  }

  return imageBuilder.url();
};
