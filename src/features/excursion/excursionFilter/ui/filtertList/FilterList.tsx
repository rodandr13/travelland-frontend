import styles from "./styles.module.scss";
import { FilterItem } from "../filterItem";
import clsx from "clsx";
import { FiltersType } from "@/src/widgets/excursionCatalog/model/types/FiltersType";

interface Props {
  className: string;
  filters: FiltersType;
}

export const FilterList = ({ className, filters }: Props) => {
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
