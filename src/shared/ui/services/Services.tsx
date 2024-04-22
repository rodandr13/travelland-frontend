"use client";

import styles from "./styles.module.scss";
import { SlideButton } from "@/src/shared/ui";
import { setSlideRef } from "@/src/shared/ui/slider/lib/setSlideRef";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { goToSlide } from "@/src/shared/ui/slider/lib/goToSlide";
import { urlFor } from "@/src/shared/lib/sanity/client";
import { Service } from "@/src/shared/types/service";

interface Props {
  services: Service[];
}

export const Services = ({ services }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideRefs = useRef<HTMLElement[]>([]);
  const slidesLength = services.length;
  const handleGoToSlide = (index: number) => {
    goToSlide(index, slidesLength, setCurrentIndex, slideRefs);
  };
  return (
    <section className={styles.services}>
      <div className={styles.services__container}>
        <div className={styles.services__buttonsContainer}>
          <SlideButton
            direction="prev"
            disabled={currentIndex <= 0}
            onClick={(e) => {
              e.preventDefault();
              handleGoToSlide(currentIndex - 1);
            }}
          />
          <SlideButton
            direction="next"
            disabled={currentIndex >= slidesLength - 1}
            onClick={(e) => {
              e.preventDefault();
              handleGoToSlide(currentIndex + 1);
            }}
          />
        </div>
        <ul className={styles.services__list}>
          {services.map((service, i) => (
            <li
              key={i}
              className={styles.services__item}
              ref={(ref) => setSlideRef(slideRefs, ref, i)}
            >
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
                fill
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
