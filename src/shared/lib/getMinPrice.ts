import { Price } from "@/src/shared/types/booking";
import { AgeCategory, CategoryKey } from "@/src/shared/types/excursion";

interface PriceData {
  basePrices: Price[];
  priceCorrections?: Price[];
  promotionalPrices?: Price[];
}

export const getMinPrice = (
  excursionPrices: PriceData,
  categoryKey: CategoryKey
): number | undefined => {
  let minPrice: number = Infinity;

  Object.values(excursionPrices)
    .filter((priceArray): priceArray is Price[] => priceArray !== undefined)
    .forEach((priceArray) => {
      if (categoryKey === CategoryKey.Group) {
        priceArray
          .filter((price) => price.key === AgeCategory.Adult)
          .forEach((item) => {
            minPrice = item.price < minPrice ? item.price : minPrice;
          });
      } else if (categoryKey === CategoryKey.Individual) {
        priceArray.forEach((item) => {
          minPrice = item.price < minPrice ? item.price : minPrice;
        });
      }
    });

  return minPrice === Infinity ? undefined : minPrice;
};
