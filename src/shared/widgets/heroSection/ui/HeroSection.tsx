import styles from "./styles.module.scss";
import { ReactNode } from "react";

export const HeroSection = ({ children }: { children: ReactNode }) => {
  return (
    <section className={styles.hero}>
      <div className={styles.hero__container}>{children}</div>
    </section>
  );
};
