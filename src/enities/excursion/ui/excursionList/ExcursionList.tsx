import styles from "./styles.module.scss";
import { ExcursionCard } from "@/src/enities/excursion/ui";
const cards = [1, 2, 3, 4, 5, 6];
export const ExcursionList = () => {
  return (
    <section className={styles.excursionList}>
      {cards.map((card) => (
        <ExcursionCard key={card} />
      ))}
    </section>
  );
};
