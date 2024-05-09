import { PricesMap } from "@/src/shared/types/booking";

export const findAdultMinPrice = (priceMap: PricesMap) => {
  let minPrice = Infinity;
  priceMap.forEach((day) => {
    const adultPrice = day.prices.find((price) => price.title === "Взрослые");
    if (adultPrice && minPrice > adultPrice?.price) {
      minPrice = adultPrice?.price;
    }
  });

  return minPrice === Infinity ? undefined : minPrice;
};
