import {
  Duration,
  GalleryImage,
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
  promotionalPrices: number[];
  priceCorrections: number[];
}

export type ExcursionCardsType = IExcursionCard[];
