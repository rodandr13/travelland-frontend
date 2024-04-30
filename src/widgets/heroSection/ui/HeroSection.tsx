"use client";

import styles from "./styles.module.scss";
import React from "react";
import Image from "next/image";
import { Search } from "@/src/widgets/header/ui/search";

export const HeroSection = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.hero__container}>
        <Search />
      </div>
      <div className={styles.hero__imageContainer}>
        <Image
          className={styles.hero__image}
          src="/header.jpg"
          alt=""
          fill
          sizes="(max-width: 500px) 100vw, (max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
        />
      </div>
    </section>
  );
};
