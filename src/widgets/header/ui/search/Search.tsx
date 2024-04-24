import styles from "./styles.module.scss";
import Select from "react-select";
import { Button } from "@/src/shared/ui/button";
import clsx from "clsx";

export const Search = () => {
  const options = [{ value: "prague", label: "Прага" }];
  return (
    <section className={styles.search}>
      <h1 className={styles.search__title}>
        Забронируйте уникальные места для отдыха и развлечения
      </h1>
      <div className={styles.search__services}>
        <ul className={styles.search__list}>
          <li className={styles.search__item}>
            <span
              className={clsx(
                styles.search__itemValue,
                styles.search__itemValue_active
              )}
            >
              Экскурсии
            </span>
          </li>
          <li className={styles.search__item}>
            <span className={styles.search__itemValue}>Трансферы</span>
          </li>
          <li className={styles.search__item}>
            <span className={styles.search__itemValue}>Туры</span>
          </li>
        </ul>
      </div>
      <div className={styles.search__selectContainer}>
        <span className={styles.search__caption}>Где</span>
        <Select
          options={options}
          placeholder=""
          isSearchable
          instanceId="test"
        />
      </div>
      <div className={styles.search__buttonContainer}>
        <Button title="Найти" color="green" />
      </div>
    </section>
  );
};
