import styles from "./styles.module.scss";
import { Button } from "@/src/shared/ui/button";
import { ReactNode } from "react";

export const HeroSection = ({ children }: { children: ReactNode }) => {
  return (
    <section className={styles.hero}>
      {children}
      <div className={styles.hero__container}>
        <h1 className={styles.hero__title}>
          Book unique places for rest and entertainment
        </h1>
        <Button
          type="button"
          title="VIEW EXCURSIONS"
          className={styles.hero__button}
        />
      </div>
    </section>
  );
};
