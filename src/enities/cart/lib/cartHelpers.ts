import { Cart, CartItem } from "@/src/shared/types/cart";

export const updateCart = (
  cart: Cart,
  newItem: CartItem,
  shouldUpdateItem: boolean = false
): Cart => {
  const existingItemIndex = cart.items.findIndex(
    (item) => item.id === newItem.id
  );

  if (existingItemIndex >= 0) {
    if (shouldUpdateItem) {
      cart.items[existingItemIndex] = {
        ...cart.items[existingItemIndex],
        ...newItem,
      };
    }
  } else {
    cart.items.push(newItem);
  }

  cart.totalItems = cart.items.length;
  cart.totalPrice = cart.items.reduce(
    (total, item) => total + item.totalPrice,
    0
  );

  return cart;
};
