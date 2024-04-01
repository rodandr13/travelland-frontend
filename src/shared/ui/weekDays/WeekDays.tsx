import styles from "./styles.module.scss";
import clsx from "clsx";

interface Props {
  days: string[];
}

const daysOfWeek = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

export const WeekDays = ({ days }: Props) => {
  console.log(days);
  return (
    <ul className={clsx(styles.weekDays)}>
      {days.map((day, i) => (
        <li
          key={day + i}
          className={clsx(styles.weekDays__day, {
            [styles.weekDays__day_active]: day,
          })}
        >
          {daysOfWeek[i]}
        </li>
      ))}
    </ul>
  );
};
