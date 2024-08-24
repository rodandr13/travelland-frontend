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

export const saveCartToLocalStorage = (cart: Cart) => {
  try {
    localStorage.setItem("cart", JSON.stringify(cart));
  } catch (error) {
    console.error("Failed to save cart to localStorage:", error);
  }
};

export const calculateTotals = (items: CartItem[]) => {
  let totalItems = items.length;
  let totalCurrentPrice = 0;
  let totalBasePrice = 0;

  items.forEach((item) => {
    totalCurrentPrice += item.totalCurrentPrice;
    totalBasePrice += item.totalBasePrice;
  });

  return { totalItems, totalCurrentPrice, totalBasePrice };
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
