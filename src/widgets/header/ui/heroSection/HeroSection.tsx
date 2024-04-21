import styles from "./styles.module.scss";
import { ReactNode } from "react";
import Image from "next/image";

export const HeroSection = ({ children }: { children: ReactNode }) => {
  return (
    <section className={styles.hero}>
      {children}
      <div className={styles.hero__container}>
        <h1 className={styles.hero__title}>
          Экскурсионное обслуживание в Праге
        </h1>
        <section className={styles.services}>
          <ul className={styles.services__list}>
            <li className={styles.services__item}>
              <div className={styles.services__containerText}>
                <span className={styles.services__caption}>Экскурсии</span>
                <h3 className={styles.services__title}>
                  Коллекция уникальных экскурсий
                </h3>
              </div>
              <Image
                className={styles.services__image}
                src="/ser1.jpg"
                alt=""
                fill
              />
            </li>
            <li className={styles.services__item}>
              <div className={styles.services__containerText}>
                <span className={styles.services__caption}>Туры</span>
                <h3 className={styles.services__title}>
                  Многодневные туры по Европе
                </h3>
              </div>
              <Image
                className={styles.services__image}
                src="/ser2.jpg"
                alt=""
                fill
              />
            </li>
            <li className={styles.services__item}>
              <div className={styles.services__containerText}>
                <span className={styles.services__caption}>Трансферы</span>
                <h3 className={styles.services__title}>
                  Быстро и с комфортом из аэропорта
                </h3>
              </div>
              <Image
                className={styles.services__image}
                src="/ser3.jpg"
                alt=""
                fill
              />
            </li>
            <li className={styles.services__item}>
              <div className={styles.services__containerText}>
                <span className={styles.services__caption}>Трансферы</span>
                <h3 className={styles.services__title}>
                  Быстро и с комфортом из аэропорта
                </h3>
              </div>
              <Image
                className={styles.services__image}
                src="/ser3.jpg"
                alt=""
                fill
              />
            </li>
          </ul>
        </section>
      </div>
    </section>
  );
};
