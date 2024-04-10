import styles from "./styles.module.scss";
import { PriceBlock } from "@/src/shared/ui/priceBlock";
import { Button } from "@/src/shared/ui/button";
import { PromotionalPrice } from "@/src/enities/excursion/model/types/ExcursionDetail";

interface Props {
  todayPriceForAdult: number;
  promoPrices?: PromotionalPrice[];
}
export const PriceSection = ({ todayPriceForAdult, promoPrices }: Props) => {
  const baseAdultPrice = todayPriceForAdult;
  let newPrice = baseAdultPrice;
  let oldPrice = baseAdultPrice;

  if (promoPrices && promoPrices.length > 0) {
    newPrice = promoPrices[0].prices[0].price;
    oldPrice = baseAdultPrice;
  }

  return (
    <section className={styles.priceSection}>
      <div>
        <PriceBlock
          parent="priceSection"
          price={baseAdultPrice.toString()}
          size="m"
        />
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
      <Button title="Забронировать" />
    </section>
  );
};
