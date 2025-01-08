import clsx from "clsx";

import { formatCurrency } from "@/shared/lib/formatCurrency";

import styles from "./styles.module.scss";

interface Props {
  currentPrice?: number;
  basePrice?: number;
  size?: "s" | "m";
  parent?: string;
  actualPrice?: boolean | undefined;
}

export const PriceBlock = ({
  currentPrice,
  basePrice,
  size,
  parent,
  actualPrice,
}: Props) => {
  let discount: number | undefined = undefined;
  let showBasePrice = true;

  if (currentPrice !== undefined && basePrice !== undefined && basePrice > 0) {
    if (currentPrice !== basePrice) {
      discount = Math.round(((basePrice - currentPrice) / basePrice) * 100);
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
            {currentPrice !== undefined ? formatCurrency(currentPrice) : ""}
          </span>
        </li>
        {showBasePrice && basePrice !== undefined && basePrice > 0 && (
          <li
            className={clsx(styles.priceBlock__oldPrice, {
              [styles[`priceBlock_${parent}__oldPrice`]]: parent,
            })}
          >
            {formatCurrency(basePrice)}
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
