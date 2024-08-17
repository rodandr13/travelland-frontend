import { CartParticipants } from "@/src/shared/types/cart";
import { GalleryImage } from "@/src/shared/types/excursion";

export type Price = {
  price: number;
  title: string;
  description: string;
};

export type PricesValue = {
  currentPrices: Price[];
  basePrices: Price[];
};

export type Participants = {
  id: string;
  title: string;
  count: number;
};

export type PricesMap = Map<string, CartParticipants[]>;

export type BookingDetails = {
  title: string;
  image: GalleryImage;
  selectedDate: string;
  participants: Participants[];
  selectedTime: string;
  prices: PricesValue;
  totalPrice: number;
};
