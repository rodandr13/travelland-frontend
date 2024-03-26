import styles from "./styles.module.scss";
import { WeekDays } from "@/src/shared/ui/weekDays";

export const TimeSpending = () => {
  return (
    <div className={styles.timeSpending}>
      <div className={styles.timeSpending__weekdays}>
        <h3 className={styles.timeSpending__smallTitle}>Days of the event</h3>
        <WeekDays />
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
            <tr>
              <td className={styles.timeSpending__timeStart}>
                <span>8:00</span>
              </td>
              <td className={styles.timeSpending__timeEnd}>16:00</td>
            </tr>
            <tr>
              <td className={styles.timeSpending__timeStart}>
                <span>9:00</span>
              </td>
              <td className={styles.timeSpending__timeEnd}>19:00</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className={styles.timeSpending__duration}>
        <h3 className={styles.timeSpending__smallTitle}>Duration</h3>
        <p className={styles.timeSpending__durationValue}>8 hours</p>
      </div>
    </div>
  );
};
