import styles from "./styles.module.scss";
import { PriceBlock } from "@/src/shared/ui/priceBlock";
import { Button } from "@/src/shared/ui/button";

export const PriceSection = () => {
  return (
    <section className={styles.priceSection}>
      <div>
        <PriceBlock price="35.90" oldPrice="45.90" discount="15" size="m" />
        <p className={styles.priceSection__caption}>за 1 взрослого</p>
      </div>
      <ul className={styles.priceSection__advantages}>
        <li className={styles.priceSection__advantagesItem}>
          Лучшая цена гарантирована
        </li>
        <li className={styles.priceSection__advantagesItem}>
          Бесплатная отмена
        </li>
        <li className={styles.priceSection__advantagesItem}>
          Скидка 5% при оплате картой
        </li>
      </ul>
      <Button
        title="Перейти к оформлению"
        className={styles.priceSection__button}
      />
    </section>
  );
};
