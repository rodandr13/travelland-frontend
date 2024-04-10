import styles from "./styles.module.scss";
import clsx from "clsx";

interface Props {
  price: string;
  oldPrice?: string;
  discount?: string;
  size?: "s" | "m";
  parent?: string;
}

export const PriceBlock = ({
  price,
  oldPrice,
  discount,
  size,
  parent,
}: Props) => {
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
          от <span className={clsx(styles.priceBlock__price)}>{price}€</span>
        </li>
        {oldPrice && (
          <li
            className={clsx(styles.priceBlock__oldPrice, {
              [styles[`priceBlock_${parent}__oldPrice`]]: parent,
            })}
          >
            {oldPrice} €
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
