import styles from "./styles.module.scss";
import { PriceBlock } from "@/src/shared/ui/priceBlock";
import { Button } from "@/src/shared/ui/button";

interface Props {
  minPrice: number | undefined;
  basePrice: number | undefined;
}

export const PriceSection = ({ minPrice, basePrice }: Props) => {
  const priceProps =
    minPrice === basePrice
      ? {
          price: minPrice,
        }
      : { price: minPrice, basePrice: basePrice };
  return (
    <section className={styles.priceSection}>
      <div>
        <PriceBlock parent="priceSection" {...priceProps} size="m" />
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
      <Button title="Бронировать" />
    </section>
  );
};
