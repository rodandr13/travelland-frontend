import { Participants, PricesValue } from "@/src/shared/types/booking";

export const calculateTotalPrice = (
  prices: PricesValue,
  participants: Participants[]
) => {
  if (!prices || !participants || !prices.prices || participants.length === 0)
    return 0;
  return prices.prices.reduce((total, price, i) => {
    if (participants[i]) {
      total += price.price * participants[i].count;
    }
    return total;
  }, 0);
};
