import clsx from "clsx";

import { getFilters } from "@/widgets/excursionCatalog/api/getFilters";

import styles from "./styles.module.scss";
import { FilterItem } from "../filterItem/FilterItem";

interface Props {
  className: string;
}

export const FilterList = async ({ className }: Props) => {
  const filters = await getFilters();
  return (
    <section className={clsx(styles.filterList, className)}>
      <form className={styles.filterList__form}>
        {filters.map((filter) => (
          <FilterItem key={filter._id} filter={filter} />
        ))}
      </form>
    </section>
  );
};
