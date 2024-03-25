import styles from "./styles.module.scss";
import clsx from "clsx";

export const WeekDays = () => {
  return (
    <ul className={clsx(styles.weekDays)}>
      <li className={clsx(styles.weekDays__day, styles.weekDays__day_active)}>
        Пн
      </li>
      <li className={clsx(styles.weekDays__day)}>Вт</li>
      <li className={styles.weekDays__day}>Ср</li>
      <li className={clsx(styles.weekDays__day)}>Чт</li>
      <li className={styles.weekDays__day}>Пт</li>
      <li className={clsx(styles.weekDays__day, styles.weekDays__day_active)}>
        Сб
      </li>
      <li className={clsx(styles.weekDays__day, styles.weekDays__day_active)}>
        Вс
      </li>
    </ul>
  );
};
