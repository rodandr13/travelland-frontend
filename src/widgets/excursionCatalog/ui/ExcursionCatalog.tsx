import styles from "./styles.module.scss";
import { ExcursionList } from "@/src/enities/excursion/ui";
import { ExcursionFilter } from "@/src/features/excursionFilter";

export const ExcursionCatalog = () => {
  return (
    <section className={styles.excursionCatalog}>
      <ExcursionFilter />
      <ExcursionList />
    </section>
  );
};
