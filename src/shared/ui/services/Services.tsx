"use client";

import React, { useRef } from "react";

import Image from "next/image";

import { urlFor } from "@/src/shared/lib/sanity/client";
import { Service } from "@/src/shared/types/service";

import styles from "./styles.module.scss";

interface Props {
  services: Service[];
}

export const Services = ({ services }: Props) => {
  const slideRefs = useRef<HTMLElement[]>([]);

  return (
    <section className={styles.services}>
      <div className={styles.services__containerHeader}>
        <h2>Экскурсионное сопровождение в Европе</h2>
        <p className={styles.services__subheader}>
          Экскурсии и другой разнообразный сервис от лицензированной компании.
          Гарантия качества на все виды услуг: экскурсии, туры, трансферы,
          билеты на мероприятия и много другое
        </p>
      </div>
      <div className={styles.services__container}>
        <div className={styles.services__buttonsContainer}>
          {/*<SlideButton*/}
          {/*  direction="prev"*/}
          {/*  disabled={currentIndex <= 0}*/}
          {/*  onClick={(e) => {*/}
          {/*    e.preventDefault();*/}
          {/*    handleGoToSlide(currentIndex - 1);*/}
          {/*  }}*/}
          {/*/>*/}
          {/*<SlideButton*/}
          {/*  direction="next"*/}
          {/*  disabled={currentIndex >= slidesLength - 2}*/}
          {/*  onClick={(e) => {*/}
          {/*    e.preventDefault();*/}
          {/*    handleGoToSlide(currentIndex + 1);*/}
          {/*  }}*/}
          {/*/>*/}
        </div>
        <ul className={styles.services__list}>
          {services.map((service, i) => (
            <li key={i} className={styles.services__item}>
              <div className={styles.services__containerText}>
                <span className={styles.services__caption}>
                  {service.title}
                </span>
                <h3 className={styles.services__title}>
                  {service.description}
                </h3>
              </div>
              <Image
                className={styles.services__image}
                src={urlFor(service.image.src)}
                alt=""
                placeholder="blur"
                blurDataURL={service.image.lqip}
                fill
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
