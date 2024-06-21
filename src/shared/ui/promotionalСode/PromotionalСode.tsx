import { Button } from "@/src/shared/ui/button";

import styles from "./styles.module.scss";

export const PromotionalCode = () => {
  return (
    <section className={styles.promotionalCode}>
      <input className={styles.promotionalCode__input} placeholder="Промокод" />
      <Button title="Применить" disabled />
    </section>
  );
};
