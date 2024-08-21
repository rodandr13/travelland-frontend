"use client";

import { removeItem } from "@/src/enities/cart/model/cartSlice";
import { useAppDispatch } from "@/src/shared/lib/redux/hooks";

import styles from "./styles.module.scss";

interface Props {
  itemId: string;
}

export const RemoveFromCart = ({ itemId }: Props) => {
  const dispatch = useAppDispatch();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(removeItem(itemId));
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
