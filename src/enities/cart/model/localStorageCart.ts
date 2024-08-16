import { updateCart } from "@/src/enities/cart/lib/cartHelpers";
import { Cart, CartItem } from "@/src/shared/types/cart";

export const getCartFromLocalStorage = (): Cart => {
  if (typeof window !== "undefined") {
    const cartData = localStorage.getItem("cart");
    if (cartData) {
      return JSON.parse(cartData) as Cart;
    }
  }

  return { items: [], totalItems: 0, totalBasePrice: 0, totalCurrentPrice: 0 };
};

export const addItemToLocalStorageCart = (newItem: CartItem): void => {
  const cart = getCartFromLocalStorage();
  const updatedCard = updateCart(cart, newItem);
  localStorage.setItem("cart", JSON.stringify(updatedCard));
};
