import { GalleryImage } from "@/src/shared/types/excursion";

export type CartParticipants = {
  id: string;
  title: string;
  description: string;
  currentPrice: number;
  basePrice: number;
  count: number | null;
};

export type CartItem = {
  id: string;
  type: string;
  title: string;
  image: GalleryImage;
  selectedDate: string;
  selectedTime: string;
  participants: CartParticipants[];
  totalCurrentPrice: number;
  totalBasePrice: number;
};

export type Cart = {
  items: CartItem[];
  totalItems: number;
  totalCurrentPrice: number;
  totalBasePrice: number;
};
