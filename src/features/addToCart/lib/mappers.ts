import { CartItemDto } from "@/src/enities/cart/model/types";
import { CartItem } from "@/src/shared/types/cart";

export const mapToDto = (item: CartItem): CartItemDto => ({
  title: item.title,
  image_lqip: item.image_lqip,
  image_src: item.image_src,
  slug: item.slug,
  service_id: item.service_id,
  service_type: item.service_type.toUpperCase(),
  date: new Date(item.date),
  time: item.time,
  options: item.options.map((participant) => ({
    base_price: participant.base_price,
    current_price: participant.current_price,
    category_title: participant.category_title,
    category_description: participant.category_description,
    price_type: participant.price_type,
    quantity: participant.quantity || 0,
  })),
});
