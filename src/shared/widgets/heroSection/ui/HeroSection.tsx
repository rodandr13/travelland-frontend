import styles from "./styles.module.scss";
import { ReactNode } from "react";

export const HeroSection = ({ children }: { children: ReactNode }) => {
  return (
    <section className={styles.hero}>
      {children}
      <div className={styles.hero__container}>
        <h1 className={styles.hero__title}>Book unique places for rest and entertainment</h1>
        <button className={styles.hero__button}>VIEW EXCURSIONS</button>
      </div>
    </section>
  );
};
