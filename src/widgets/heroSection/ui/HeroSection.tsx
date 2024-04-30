import styles from "./styles.module.scss";
import React from "react";
import Image from "next/image";
import { Search } from "@/src/widgets/header/ui/search";
import { getHero } from "@/src/widgets/heroSection/api/getHero";
import { urlFor } from "@/src/shared/lib/sanity/client";

export const HeroSection = async () => {
  const hero = await getHero();
  return (
    <section className={styles.hero}>
      <div className={styles.hero__container}>
        <Search title={hero.title} />
      </div>
      <div className={styles.hero__imageContainer}>
        <Image
          className={styles.hero__image}
          src={urlFor(hero.image.src)}
          placeholder="blur"
          blurDataURL={hero.image.lqip}
          alt=""
          fill
          sizes="(max-width: 500px) 100vw, (max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
        />
      </div>
    </section>
  );
};
