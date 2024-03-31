"use client";

import { PriceBlock } from "@/src/shared/ui/priceBlock";
import { SelectNumber } from "./ui/";
import styles from "./styles.module.scss";

export const SelectPeoples = () => {
  return (
    <section className={styles.selectPeoples}>
      <div className={styles.selectPeoples__container}>
        <div>
          <h4 className={styles.selectPeoples__title}>
            Взрослые
            <span className={styles.selectPeoples__age}> (18 - 65 лет)</span>
          </h4>
          <PriceBlock price="25.90" oldPrice="35.90" discount="15" />
        </div>
        <div className={styles.selectPeoples__container}>
          <SelectNumber />
          <span className={styles.selectPeoples__sum}>= € 25.90</span>
        </div>
      </div>
      <div className={styles.selectPeoples__container}>
        <div>
          <h4 className={styles.selectPeoples__title}>
            Дети
            <span className={styles.selectPeoples__age}> (до 13 лет)</span>
          </h4>
          <PriceBlock price="17.90" oldPrice="27.90" discount="15" />
        </div>
        <div className={styles.selectPeoples__container}>
          <SelectNumber />
          <span className={styles.selectPeoples__sum}>= € 0</span>
        </div>
      </div>
    </section>
  );
};
