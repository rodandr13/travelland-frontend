import styles from "./styles.module.scss";
import { FilterItem } from "../filterItem";
import clsx from "clsx";

const filters = [1, 2, 3, 4, 5, 6];

interface Props {
  className: string;
}

export const FilterList = ({ className }: Props) => {
  return (
    <section className={clsx(styles.filterList, className)}>
      <form className={styles.filterList__form}>
        {filters.map((filter) => (
          <FilterItem key={filter} />
        ))}
      </form>
    </section>
  );
};
