import styles from "./styles.module.scss";
import { ExcursionCard } from "@/src/enities/excursion/ui";
import { getExcursionCards } from "@/src/enities/excursion/api/getExcursionCards";

interface Props {
  addFavorite: React.ReactNode;
}

export const ExcursionList = async ({ addFavorite }: Props) => {
  const excursionCards = await getExcursionCards();
  console.log(excursionCards);
  return (
    <section className={styles.excursionList}>
      {excursionCards.map((card) => (
        <ExcursionCard key={card._id} addFavorite={addFavorite} card={card} />
      ))}
    </section>
  );
};
