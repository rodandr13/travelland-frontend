import styles from "./styles.module.scss";
import { Calendar } from "../calendar";

export const Booking = () => {
  return (
    <section className={styles.booking}>
      <h2>Выберите дату</h2>
      <Calendar />
    </section>
  );
};
