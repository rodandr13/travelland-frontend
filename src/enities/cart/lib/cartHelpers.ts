import { getCartFromLocalStorage } from "@/src/enities/cart";
import { Cart, CartItem } from "@/src/shared/types/cart";

export const isItemExistInCart = (itemId: string): boolean => {
  const cart = getCartFromLocalStorage();
  return cart.items.some((item) => item.id === itemId);
};

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
  cart.totalBasePrice = cart.items.reduce(
    (total, item) => total + item.totalBasePrice,
    0
  );
  cart.totalCurrentPrice = cart.items.reduce(
    (total, item) => total + item.totalCurrentPrice,
    0
  );

  return cart;
};
