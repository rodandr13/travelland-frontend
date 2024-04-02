import styles from "./styles.module.scss";
import Image from "next/image";
import { urlFor } from "@/src/shared/lib/sanity/client";
import { IFilterItem } from "@/src/features/excursion/excursionFilter/model/types/FiltersType";

interface Props {
  filter: IFilterItem;
}

export const FilterItem = ({ filter }: Props) => {
  const imageUrl = urlFor(filter.icon.asset._ref);
  return (
    <div className={styles.filterItem}>
      <input
        className={styles.filterItem__input}
        id={filter._id}
        type="radio"
        name="filterGroup"
        value={filter.title.value}
      />
      <label htmlFor={filter._id} className={styles.filterItem__label}>
        <Image src={imageUrl} alt="" width="40" height="40" />
        <span className={styles.filterItem__caption}>{filter.title.value}</span>
      </label>
    </div>
  );
};
