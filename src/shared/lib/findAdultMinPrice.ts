import { ADULT_CATEGORY_ID } from "@/src/shared/lib/constants";
import { PricesMap } from "@/src/shared/types/booking";

export const findAdultMinPrice = (priceMap: PricesMap) => {
  let minPrice = Infinity;
  priceMap.forEach((participants) => {
    const adultPrice = participants.find(
      (price) => price.id === ADULT_CATEGORY_ID
    );
    if (adultPrice && minPrice > adultPrice?.currentPrice) {
      minPrice = adultPrice?.currentPrice;
    }
  });

  return minPrice === Infinity ? undefined : minPrice;
};
