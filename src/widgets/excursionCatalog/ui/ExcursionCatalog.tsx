import { FilterList } from "./filtertList/FilterList";
import styles from "./styles.module.scss";

import { Cards } from "@/src/enities/excursion";

export const ExcursionCatalog = () => {
  return (
    <section className={styles.excursionCatalog}>
      <FilterList className={styles.excursionCatalog__filters} />
      <Cards />
    </section>
  );
};
