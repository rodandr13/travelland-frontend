import styles from "./styles.module.scss";
import { ExcursionCard } from "@/src/enities/excursion/ui";

const cards = [1, 2, 3, 4, 5, 6];

interface Props {
  addFavorite: React.ReactNode;
}

export const ExcursionList = ({ addFavorite }: Props) => {
  return (
    <section className={styles.excursionList}>
      {cards.map((card) => (
        <ExcursionCard key={card} addFavorite={addFavorite} />
      ))}
    </section>
  );
};
