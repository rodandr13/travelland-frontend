import {
  Duration,
  GalleryImage,
  PromotionalPrice,
  Weekdays,
} from "@/src/enities/excursion/model/types/ExcursionDetail";

export interface IExcursionCard {
  _id: string;
  title: string;
  slug: string;
  gallery: GalleryImage[];
  weekdays: Weekdays;
  category: string;
  duration: Duration;
  subcategory: string[];
  basePrices: number;
  promotionalPrices: PromotionalPrice[];
  priceCorrections: PromotionalPrice[];
}

export type ExcursionCardsType = IExcursionCard[];
