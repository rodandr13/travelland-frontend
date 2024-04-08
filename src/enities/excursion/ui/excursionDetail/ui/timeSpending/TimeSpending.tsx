import styles from "./styles.module.scss";
import { WeekDays } from "@/src/shared/ui/weekDays";
import {
  Duration,
  StartTime,
  Weekdays,
} from "@/src/enities/excursion/model/types/ExcursionDetail";

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
  const endTime = (startTime: string, duration: number) => {
    const [hour, minute] = startTime.split(":");
    return `${parseInt(hour, 10) + duration}:${minute}`;
  };
  const filledDays = (weekdays: string[]) => {
    return daysOfWeek.map((day) => (weekdays.includes(day) ? day : ""));
  };
  return (
    <div className={styles.timeSpending}>
      <div className={styles.timeSpending__weekdays}>
        <h3 className={styles.timeSpending__smallTitle}>Days of the event</h3>
        <WeekDays days={filledDays(weekdays)} />
      </div>
      <div className={styles.timeSpending__time}>
        <table className={styles.timeSpending__timeTable}>
          <thead>
            <tr>
              <th className={styles.timeSpending__smallTitle}>Start</th>
              <th className={styles.timeSpending__smallTitle}>End</th>
            </tr>
          </thead>
          <tbody>
            {startTime.map((item, i) => (
              <tr key={i}>
                <td className={styles.timeSpending__timeStart}>
                  <span>{item}</span>
                </td>
                <td className={styles.timeSpending__timeEnd}>
                  {endTime(item, duration[0])}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.timeSpending__duration}>
        <h3 className={styles.timeSpending__smallTitle}>Duration</h3>
        <p className={styles.timeSpending__durationValue}>
          {duration.join(", ")} hours
        </p>
      </div>
    </div>
  );
};
