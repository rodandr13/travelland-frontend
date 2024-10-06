import { ADULT_CATEGORY_ID } from "@/src/shared/lib/constants";
import { Price } from "@/src/shared/types/booking";

export const findAdultBasePrice = (prices: Price[]) => {
  const adultPrice = prices.find((price) => {
    return price.categoryId === ADULT_CATEGORY_ID;
  });
  return adultPrice?.price;
};
