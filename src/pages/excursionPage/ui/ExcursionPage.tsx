import styles from "./styles.module.scss";
import { ExcursionDetail } from "@/src/enities/excursion";

export const ExcursionPage = () => {
  return (
    <section className={styles.excursionPage}>
      <ExcursionDetail />
    </section>
  );
};
