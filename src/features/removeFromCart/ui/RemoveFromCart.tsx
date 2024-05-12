"use client";

import { removeItem } from "@/src/enities/cart/model/cartSlice";
import { useAppDispatch } from "@/src/shared/lib/redux/hooks";

import styles from "./styles.module.scss";

interface Props {
  itemKey: string;
}

export const RemoveFromCart = ({ itemKey }: Props) => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(removeItem(itemKey));
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
