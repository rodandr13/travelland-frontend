"use client";

import { PriceBlock } from "@/src/shared/ui/priceBlock";
import { SelectNumber } from "./ui/";
import styles from "./styles.module.scss";
import { PricesValue } from "@/src/shared/types/excursion";

interface Props {
  prices: PricesValue | undefined;
}
export const SelectPeoples = ({ prices }: Props) => {
  return (
    <section className={styles.selectPeoples}>
      {prices &&
        prices.prices.map((price, i) => (
          <div key={i} className={styles.selectPeoples__container}>
            <div>
              <h4 className={styles.selectPeoples__title}>
                {price.title}
                <span className={styles.selectPeoples__age}>
                  &nbsp;{price.description}
                </span>
              </h4>
              <PriceBlock price={price.price.toString()} />
            </div>
            <div className={styles.selectPeoples__container}>
              <SelectNumber />
              <span className={styles.selectPeoples__sum}>
                = € {price.price}
              </span>
            </div>
          </div>
        ))}
    </section>
  );
};
