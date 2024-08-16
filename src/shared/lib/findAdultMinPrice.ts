import { PricesMap } from "@/src/shared/types/booking";

export const findAdultMinPrice = (priceMap: PricesMap) => {
  let minPrice = Infinity;
  priceMap.forEach((partipants) => {
    const adultPrice = partipants.find((price) => price.title === "Взрослые");
    if (adultPrice && minPrice > adultPrice?.currentPrice) {
      minPrice = adultPrice?.currentPrice;
    }
  });

  return minPrice === Infinity ? undefined : minPrice;
};
