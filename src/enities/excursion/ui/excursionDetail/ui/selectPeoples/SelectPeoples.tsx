"use client";

import { PriceBlock } from "@/src/shared/ui/priceBlock";
import { SelectNumber } from "./ui/";
import styles from "./styles.module.scss";
import { PricesMap } from "@/src/shared/types/excursion";
import { useState } from "react";

interface Props {
  prices: PricesMap;
}
export const SelectPeoples = ({ prices }: Props) => {
  const tempPrice = prices.get("2024-05-20");
  const basePrice = prices.get("2024-05-20")?.basePrice;
  let values: number[] = [];
  if (tempPrice && tempPrice.prices) {
    const valuesLength = tempPrice.prices.length;
    values = new Array(valuesLength).fill(0);
    if (values.length > 0) {
      values[0] = 2;
    }
  }
  const [selectedValues, setSelectedValues] = useState<number[]>(values);
  const handleNumberChange = (index: number, newValue: number) => {
    const updatedValues = [...selectedValues];
    updatedValues[index] = newValue;
    setSelectedValues(updatedValues);
  };

  return (
    <section className={styles.selectPeoples}>
      {tempPrice &&
        tempPrice.prices.map((price, i) => (
          <div key={i} className={styles.selectPeoples__container}>
            <div>
              <h4 className={styles.selectPeoples__title}>
                {price.title}
                <span className={styles.selectPeoples__age}>
                  &nbsp;{price.description}
                </span>
              </h4>
              <PriceBlock
                actualPrice
                price={price.price}
                basePrice={basePrice && basePrice[i].price}
              />
            </div>
            <div className={styles.selectPeoples__container}>
              <SelectNumber
                value={selectedValues[i]}
                onNumberChange={(newValue) => handleNumberChange(i, newValue)}
              />
              <span className={styles.selectPeoples__sum}>
                = {(price.price * selectedValues[i]).toFixed(2)} €
              </span>
            </div>
          </div>
        ))}
    </section>
  );
};
