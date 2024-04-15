import styles from "./styles.module.scss";
import clsx from "clsx";

interface Props {
  price?: number;
  basePrice?: number;
  size?: "s" | "m";
  parent?: string;
  actualPrice?: boolean | undefined;
}

export const PriceBlock = ({
  price,
  basePrice,
  size,
  parent,
  actualPrice,
}: Props) => {
  let discount: number | undefined = undefined;
  let showBasePrice = true;

  if (price !== undefined && basePrice !== undefined && basePrice > 0) {
    if (price !== basePrice) {
      discount = Math.round(((basePrice - price) / basePrice) * 100);
    } else {
      showBasePrice = false;
      discount = undefined;
    }
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
          {!actualPrice && `от `}
          <span className={clsx(styles.priceBlock__price)}>
            {price !== undefined ? price.toFixed(2) : ""} €
          </span>
        </li>
        {showBasePrice && basePrice && (
          <li
            className={clsx(styles.priceBlock__oldPrice, {
              [styles[`priceBlock_${parent}__oldPrice`]]: parent,
            })}
          >
            {basePrice.toFixed(2)} €
          </li>
        )}
        {discount !== undefined && discount > 0 && (
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
