import { getExcursionCards } from "@/enities/excursion/api/getExcursionCards";
import { CardsList } from "@/enities/excursion/ui/cardsList/CardsList";
import { ExcursionCards } from "@/shared/types/excursion";

import styles from "./styles.module.scss";

export const Cards = async () => {
  const excursionCards: ExcursionCards = await getExcursionCards();

  return (
    <section className={styles.excursionList}>
      <CardsList excursionCards={excursionCards} />
    </section>
  );
};
