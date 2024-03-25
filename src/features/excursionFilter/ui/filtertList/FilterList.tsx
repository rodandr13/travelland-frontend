import styles from "./styles.module.scss";
import { FilterItem } from "../filterItem";

const filters = [1, 2, 3, 4, 5, 6];

export const FilterList = () => {
  return (
    <section className={styles.filterList}>
      <form className={styles.filterList__form}>
        {filters.map((filter) => (
          <FilterItem key={filter} />
        ))}
      </form>
    </section>
  );
};
