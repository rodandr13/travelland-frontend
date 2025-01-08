import { ADULT_CATEGORY_ID } from "@/shared/lib/constants";
import { Price } from "@/shared/types/booking";

export const findAdultBasePrice = (prices: Price[]) => {
  const adultPrice = prices.find((price) => {
    return price.categoryId === ADULT_CATEGORY_ID;
  });
  return adultPrice?.price;
};
