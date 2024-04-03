import styles from "./styles.module.scss";
import { WeekDays } from "@/src/shared/ui/weekDays";
import { ScheduleItem } from "@/src/enities/excursion/model/types/ExcursionDetail";

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
  schedule: ScheduleItem[];
}

export const TimeSpending = ({ schedule }: Props) => {
  const endTime = (startTime: string, duration: number) => {
    const [hour, minute] = startTime.split(":");
    return `${parseInt(hour, 10) + duration}:${minute}`;
  };

  const uniqueTimes = new Map();
  let weekdaysSet = new Set<string>();

  schedule.forEach((item) => {
    const key = `${item.startTime}-${item.duration}`;
    if (!uniqueTimes.has(key)) {
      uniqueTimes.set(key, {
        startTime: item.startTime,
        duration: item.duration,
        endTime: endTime(item.startTime, item.duration),
      });
    }
    item.weekdays.forEach((day) => weekdaysSet.add(day));
  });

  const uniqueSchedule = Array.from(uniqueTimes.values());
  const uniqueDurations = Array.from(
    new Set(uniqueSchedule.map((item) => item.duration))
  ).sort();
  const uniqueWeekdays = Array.from(weekdaysSet);

  const filledDays = (weekdays: string[]) => {
    return daysOfWeek.map((day) => (weekdays.includes(day) ? day : ""));
  };
  return (
    <div className={styles.timeSpending}>
      <div className={styles.timeSpending__weekdays}>
        <h3 className={styles.timeSpending__smallTitle}>Days of the event</h3>
        <WeekDays days={filledDays(uniqueWeekdays)} />
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
            {uniqueSchedule.map((item, i) => (
              <tr key={i}>
                <td className={styles.timeSpending__timeStart}>
                  <span>{item.startTime}</span>
                </td>
                <td className={styles.timeSpending__timeEnd}>{item.endTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.timeSpending__duration}>
        <h3 className={styles.timeSpending__smallTitle}>Duration</h3>
        <p className={styles.timeSpending__durationValue}>
          {uniqueDurations.join(", ")} hours
        </p>
      </div>
    </div>
  );
};
