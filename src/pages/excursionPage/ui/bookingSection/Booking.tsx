import styles from "./styles.module.scss";
import { Calendar } from "../calendar";
import clsx from "clsx";
import { SelectPeoples } from "../selectPeoples";

export const Booking = () => {
  return (
    <section className={styles.booking}>
      <div>
        <h2 className={styles.booking__title}>Выберите дату</h2>
        <Calendar />
      </div>
      <div>
        <h2 className={styles.booking__title}>Время</h2>
        <div className={styles.booking__timeGroup}>
          <button className={styles.time}>
            <div className={styles.time__container}>
              <span className={styles.time__title}>Начало</span>
              <span className={styles.time__value}>8:00</span>
            </div>
            <div
              className={clsx(
                styles.time__container,
                styles.time__container_end
              )}
            >
              <span
                className={clsx(styles.time__title, styles.time__title_end)}
              >
                Конец
              </span>
              <span
                className={clsx(styles.time__value, styles.time__value_end)}
              >
                ≈16:00
              </span>
            </div>
          </button>
          <button className={styles.time}>
            <div className={styles.time__container}>
              <span className={styles.time__title}>Начало</span>
              <span className={styles.time__value}>9:00</span>
            </div>
            <div
              className={clsx(
                styles.time__container,
                styles.time__container_end
              )}
            >
              <span
                className={clsx(styles.time__title, styles.time__title_end)}
              >
                Конец
              </span>
              <span
                className={clsx(styles.time__value, styles.time__value_end)}
              >
                ≈17:00
              </span>
            </div>
          </button>
        </div>
      </div>
      <div>
        <h2 className={styles.booking__title}>Количество человек</h2>
        <SelectPeoples />
      </div>
    </section>
  );
};
