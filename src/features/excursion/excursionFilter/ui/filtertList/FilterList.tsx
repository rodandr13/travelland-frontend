import styles from "./styles.module.scss";
import { FilterItem } from "../filterItem";
import clsx from "clsx";
import { getFilters } from "@/src/features/excursion/excursionFilter/api/getFilters";

interface Props {
  className: string;
}

export const FilterList = async ({ className }: Props) => {
  const filters = await getFilters();
  return (
    <section className={clsx(styles.filterList, className)}>
      <form className={styles.filterList__form}>
        {filters.map((filter: FilterItem) => (
          <FilterItem key={filter._id} filter={filter} />
        ))}
      </form>
    </section>
  );
};
