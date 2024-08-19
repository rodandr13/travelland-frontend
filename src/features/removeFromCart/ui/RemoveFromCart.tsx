"use client";

import { getCartFromLocalStorage } from "@/src/enities/cart";
import { Cart } from "@/src/shared/types/cart";

import styles from "./styles.module.scss";

interface Props {
  itemId: string;
}

export const RemoveFromCart = ({ itemId }: Props) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const cart = getCartFromLocalStorage();
    const updatedItems = cart.items.filter((item) => item.id !== itemId);
    const updatedCart: Cart = {
      ...cart,
      items: updatedItems,
      totalItems: updatedItems.length,
      totalBasePrice: updatedItems.reduce(
        (total, item) => total + item.totalBasePrice,
        0
      ),
      totalCurrentPrice: updatedItems.reduce(
        (total, item) => total + item.totalCurrentPrice,
        0
      ),
    };

    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <button
      className={styles.removeFromCart}
      type="button"
      onClick={handleClick}
    >
      <span>Удалить</span>
    </button>
  );
};
