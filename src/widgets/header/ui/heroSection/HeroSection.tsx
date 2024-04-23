"use client";

import styles from "./styles.module.scss";
import React, { ReactNode } from "react";
import Image from "next/image";
import { Search } from "@/src/widgets/header/ui/search";

export const HeroSection = ({ children }: { children: ReactNode }) => {
  return (
    <section className={styles.hero}>
      {children}
      <div className={styles.hero__container}>
        <Search />
      </div>
      <div className={styles.hero__imageContainer}>
        <Image className={styles.hero__image} src="/header.jpg" alt="" fill />
      </div>
    </section>
  );
};
