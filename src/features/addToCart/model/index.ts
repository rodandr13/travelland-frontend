import { addItemToLocalStorageCart } from "@/src/enities/cart";
import { CartItem } from "@/src/shared/types/cart";

export const addItemToCartFeature = (item: CartItem): void => {
  addItemToLocalStorageCart(item);
};
