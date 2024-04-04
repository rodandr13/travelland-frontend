import styles from "./styles.module.scss";
import { ExcursionList } from "@/src/enities/excursion";
import { ExcursionFilter } from "../../../features/excursion/excursionFilter";
import { AddFavorite } from "@/src/features/excursion/addFavorite";
import { getFilters } from "@/src/widgets/excursionCatalog/api/getFilters";
import { getExcursionCards } from "@/src/widgets/excursionCatalog/api/getExcursionCards";

export const ExcursionCatalog = async () => {
  const [filters, excursionCards] = await Promise.all([
    getFilters(),
    getExcursionCards(),
  ]);

  return (
    <section className={styles.excursionCatalog}>
      <ExcursionFilter
        className={styles.excursionCatalog__filters}
        filters={filters}
      />
      <ExcursionList
        excursionCards={excursionCards}
        addFavorite={<AddFavorite />}
      />
    </section>
  );
};
