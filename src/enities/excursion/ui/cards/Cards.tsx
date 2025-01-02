import styles from "./styles.module.scss";

import { getExcursionCards } from "@/src/enities/excursion/api/getExcursionCards";
import { CardsList } from "@/src/enities/excursion/ui/cardsList/CardsList";
import { ExcursionCards } from "@/src/shared/types/excursion";

export const Cards = async () => {
  const excursionCards: ExcursionCards = await getExcursionCards();

  return (
    <section className={styles.excursionList}>
      <CardsList excursionCards={excursionCards} />
    </section>
  );
};
