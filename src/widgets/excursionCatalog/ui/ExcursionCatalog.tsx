import styles from "./styles.module.scss";
import { ExcursionList } from "@/src/enities/excursion/ui";
import { ExcursionFilter } from "../../../features/excursion/excursionFilter";
import { AddFavorite } from "@/src/features/excursion/addFavorite";

export const ExcursionCatalog = () => {
  return (
    <section className={styles.excursionCatalog}>
      <ExcursionFilter className={styles.excursionCatalog__filters} />
      <ExcursionList addFavorite={<AddFavorite />} />
    </section>
  );
};
