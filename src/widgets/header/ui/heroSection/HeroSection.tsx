"use client";

import styles from "./styles.module.scss";
import React, { ReactNode } from "react";

export const HeroSection = ({ children }: { children: ReactNode }) => {
  return (
    <section className={styles.hero}>
      {children}
      <div className={styles.hero__container}>
        <h1 className={styles.hero__title}>
          Экскурсионное обслуживание в Праге
        </h1>
      </div>
    </section>
  );
};
