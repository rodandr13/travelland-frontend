"use client";

import styles from "./styles.module.scss";

import { removeCartItem } from "@/src/enities/cart/model/thunks";
import { useAppDispatch } from "@/src/shared/lib/redux/hooks";

interface Props {
  itemId?: string;
}

export const RemoveFromCart = ({ itemId }: Props) => {
  const dispatch = useAppDispatch();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (itemId) dispatch(removeCartItem(itemId));
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
