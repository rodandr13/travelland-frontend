import { GalleryImage } from "@/src/shared/types/excursion";

export type Price = {
  price: number;
  title: string;
  description: string;
};

export type PricesValue = {
  prices: Price[];
  basePrice: Price[];
};

export type Participants = {
  id: string;
  title: string;
  count: number;
};

export type PricesMap = Map<string, PricesValue>;

export type BookingDetails = {
  title: string;
  image: GalleryImage;
  selectedDate: string;
  participants: Participants[];
  time: string;
  prices: PricesValue;
  totalPrice: number;
};
