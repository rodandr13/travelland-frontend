import { Price } from "@/src/enities/excursion/model/types/ExcursionDetail";

export const findAdultBasePrice = (prices: Price[]) => {
  const adultPrice = prices.find((price) => {
    return price.title === "Взрослые";
  });
  return adultPrice?.price;
};
