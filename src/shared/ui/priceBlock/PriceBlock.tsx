import styles from "./styles.module.scss";
import clsx from "clsx";

interface Props {
  price?: number;
  basePrice?: number;
  size?: "s" | "m";
  parent?: string;
}

export const PriceBlock = ({ price, basePrice, size, parent }: Props) => {
  let discount;
  if (price !== undefined && basePrice !== undefined && basePrice > 0) {
    discount = Math.round(((basePrice - price) / basePrice) * 100);
  }
  return (
    <section
      className={clsx(styles.priceBlock, {
        [styles.priceBlock_size_m]: size === "m",
      })}
    >
      <ul
        className={clsx(styles.priceBlock__list, {
          [styles[`priceBlock_${parent}__list`]]: parent,
        })}
      >
        <li
          className={clsx({
            [styles[`priceBlock_${parent}__price`]]: parent,
          })}
        >
          от <span className={clsx(styles.priceBlock__price)}>{price} €</span>
        </li>
        {basePrice && (
          <li
            className={clsx(styles.priceBlock__oldPrice, {
              [styles[`priceBlock_${parent}__oldPrice`]]: parent,
            })}
          >
            {basePrice} €
          </li>
        )}
        {discount && (
          <li
            className={clsx(styles.priceBlock__discount, {
              [styles[`priceBlock_${parent}__discount`]]: parent,
            })}
          >
            -{discount}%
          </li>
        )}
      </ul>
    </section>
  );
};
