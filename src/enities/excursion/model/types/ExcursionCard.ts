import {
  Category,
  Duration,
  Price,
  PromotionalPrice,
  Subcategory,
  Weekdays,
} from "@/src/enities/excursion/model/types/ExcursionDetail";

export interface IExcursionCard {
  _id: string;
  title: string;
  slug: string;
  gallery: string[];
  weekdays: Weekdays;
  category: Category;
  duration: Duration;
  subcategory: Subcategory[];
  basePrices: Price[];
  promotionalPrices: PromotionalPrice[];
}

export type ExcursionCardsType = IExcursionCard[];
