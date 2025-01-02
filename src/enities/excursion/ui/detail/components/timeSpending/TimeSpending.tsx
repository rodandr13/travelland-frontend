import styles from "./styles.module.scss";
import { formatDuration } from "../../../../lib/formatDuration";

import { getEndTime } from "@/src/shared/lib/getEndTime";
import { Duration, StartTime, Weekdays } from "@/src/shared/types/excursion";
import { WeekDays } from "@/src/shared/ui/weekDays";

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

interface Props {
  duration: Duration;
  weekdays: Weekdays;
  startTime: StartTime;
}

export const TimeSpending = ({ duration, weekdays, startTime }: Props) => {
  const formattedDuration = formatDuration(duration);
  const endTimes = getEndTime(startTime, duration);
  const filledDays = (weekdays: string[]) => {
    return daysOfWeek.map((day) => (weekdays.includes(day) ? day : ""));
  };
  return (
    <div className={styles.timeSpending}>
      <div className={styles.timeSpending__weekdays}>
        <h3 className={styles.timeSpending__smallTitle}>Дни проведения</h3>
        <WeekDays days={filledDays(weekdays)} />
      </div>
      <div className={styles.timeSpending__time}>
        <table className={styles.timeSpending__timeTable}>
          <thead>
            <tr>
              <th className={styles.timeSpending__smallTitle}>Начало</th>
              <th className={styles.timeSpending__smallTitle}>Окончание</th>
            </tr>
          </thead>
          <tbody>
            {startTime.map((item, i) => (
              <tr key={i}>
                <td className={styles.timeSpending__timeStart}>
                  <span>{item}</span>
                </td>
                <td className={styles.timeSpending__timeEnd}>{endTimes[i]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.timeSpending__duration}>
        <h3 className={styles.timeSpending__smallTitle}>Длительность</h3>
        <p className={styles.timeSpending__durationValue}>
          {formattedDuration}
        </p>
      </div>
    </div>
  );
};
