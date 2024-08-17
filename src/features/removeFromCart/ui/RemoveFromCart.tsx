"use client";

import styles from "./styles.module.scss";

interface Props {
  id: string;
}

export const RemoveFromCart = ({ id }: Props) => {
  const handleClick = () => {};

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
