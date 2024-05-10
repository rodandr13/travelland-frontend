import { Cards } from "@/src/enities/excursion";

import { FilterList } from "./filtertList/FilterList";
import styles from "./styles.module.scss";
import { getFilters } from "../api/getFilters";

export const ExcursionCatalog = async () => {
  const filters = await getFilters();

  return (
    <section className={styles.excursionCatalog}>
      <FilterList
        className={styles.excursionCatalog__filters}
        filters={filters}
      />
      <Cards />
    </section>
  );
};
