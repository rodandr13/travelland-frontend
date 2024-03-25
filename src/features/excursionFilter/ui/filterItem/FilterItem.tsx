import styles from "./styles.module.scss";
import Image from "next/image";

export const FilterItem = () => {
  return (
    <div className={styles.filterItem}>
      <input
        className={styles.filterItem__input}
        id="castle"
        type="radio"
        name="filter"
        value="castle"
      />
      <label htmlFor="castle" className={styles.filterItem__label}>
        <Image
          src="/castle_icon.svg"
          alt="Иконка замка"
          width="40"
          height="40"
        />
        <span className={styles.filterItem__caption}>Замки</span>
      </label>
    </div>
  );
};
