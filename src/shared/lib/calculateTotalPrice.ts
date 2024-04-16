import { PricesValue } from "@/src/shared/types/excursion";

export const calculateTotalPrice = (
  prices: PricesValue,
  participants: number[]
) => {
  if (!prices || !participants || !prices.prices || participants.length === 0)
    return 0;
  return prices.prices.reduce((total, price, i) => {
    if (participants[i]) {
      total += price.price * participants[i];
    }
    return total;
  }, 0);
};
