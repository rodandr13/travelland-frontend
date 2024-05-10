import styles from "./styles.module.scss";
import { ExcursionList } from "@/src/enities/excursion";
import { ExcursionFilter } from "../../../features/excursion/excursionFilter";
import { getFilters } from "@/src/widgets/excursionCatalog/api/getFilters";

export const ExcursionCatalog = async () => {
  const filters = await getFilters();

  return (
    <section className={styles.excursionCatalog}>
      <ExcursionFilter
        className={styles.excursionCatalog__filters}
        filters={filters}
      />
      <ExcursionList />
    </section>
  );
};
