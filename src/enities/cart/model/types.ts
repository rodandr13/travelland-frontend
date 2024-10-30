export type CartItemDto = {
  title: string;
  image_src: string;
  image_lqip: string;
  service_id: string;
  service_type: string;
  slug: string;
  date: Date;
  time: string;
  cart_item_options: CartItemOptionDto[];
};

export type CartItemOptionDto = {
  price_type: string;
  quantity: number;
};

export type Cart = {
  id: number;
  status: string;
  user_id: number;
  guest_session_id: string;
  items: CartItemDto[];
};
