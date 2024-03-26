import styles from "./styles.module.scss";
import clsx from "clsx";

interface Props {
  price: string;
  oldPrice: string;
  discount: string;
  size?: "s" | "m";
}

export const PriceBlock = ({ price, oldPrice, discount, size }: Props) => {
  return (
    <section
      className={clsx(styles.priceBlock, {
        [styles.priceBlock_size_m]: size === "m",
      })}
    >
      <ul className={styles.priceBlock__list}>
        <li className={styles.priceBlock__price}>{price}€</li>
        <li className={styles.priceBlock__oldPrice}>{oldPrice} €</li>
        <li className={styles.priceBlock__discount}>-{discount}%</li>
      </ul>
    </section>
  );
};
