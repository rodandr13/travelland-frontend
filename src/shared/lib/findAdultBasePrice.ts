import { Price } from "@/src/shared/types/booking";

export const findAdultBasePrice = (prices: Price[]) => {
  const adultPrice = prices.find((price) => {
    return price.title === "Взрослые";
  });
  return adultPrice?.price;
};
