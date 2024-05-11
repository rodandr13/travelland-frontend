import { getExcursionCards } from "@/src/enities/excursion/api/getExcursionCards";
import { ExcursionCardsType } from "@/src/enities/excursion/model/types/ExcursionCard";
import { CardsList } from "@/src/enities/excursion/ui/cardsList/CardsList";

import styles from "./styles.module.scss";

export const Cards = async () => {
  const excursionCards: ExcursionCardsType = await getExcursionCards();

  return (
    <section className={styles.excursionList}>
      <CardsList excursionCards={excursionCards} />
    </section>
  );
};
