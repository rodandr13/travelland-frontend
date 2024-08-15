import { GalleryImage } from "@/src/shared/types/excursion";

export type CartParticipants = {
  id: string;
  title: string;
  price: number;
  count: number;
};

export type CartItem = {
  id: string;
  type: string;
  title: string;
  image: GalleryImage;
  selectedDate: string;
  selectedTime: string;
  participants: CartParticipants[];
  totalPrice: number;
};

export type Cart = {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
};
