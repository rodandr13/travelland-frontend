import styles from "./styles.module.scss";
import { PriceBlock } from "@/src/shared/ui/priceBlock";
import { Button } from "@/src/shared/ui/button";
import { ScheduleItem } from "@/src/enities/excursion/model/types/ExcursionDetail";

interface Props {
  schedule: ScheduleItem[];
}

export const PriceSection = ({ schedule }: Props) => {
  const prices = schedule[0].prices;
  return (
    <section className={styles.priceSection}>
      <div>
        <PriceBlock
          parent="priceSection"
          price={prices[0].price.toString()}
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
