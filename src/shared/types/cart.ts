export type CartItemParticipants = {
  id?: number;
  category_id: string;
  price_type: string;
  base_price: number;
  current_price: number;
  quantity: number;
  category_title: string;
  category_description: string;
  total_base_price: number;
  total_current_price: number;
};

export type CartItem = {
  service_id: string;
  service_type: string;
  date: string;
  time: string;
  slug: string;
  title: string;
  image_lqip: string;
  image_src: string;
  total_base_price: number;
  total_current_price: number;
  cart_item_options: CartItemParticipants[];
};

export type Cart = {
  id: number;
  status: string;
  user_id: number | null;
  guest_session_id: string | null;
  total_base_price: number;
  total_current_price: number;
  cart_items: CartItem[];
};
