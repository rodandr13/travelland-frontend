import Image from "next/image";
import styles from "./styles.module.scss";
import clsx from "clsx";
import { NavigateBefore, NavigateNext } from "@mui/icons-material";
import React, { useRef, useState } from "react";
import { urlFor } from "@/src/shared/lib/sanity/client";
import scrollIntoView from "scroll-into-view-if-needed";

interface Props {
  images: string[];
}

export const ImageSlider = ({ images }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideRefs = useRef<HTMLElement[]>([]);
  const goToSlide = (index: number) => {
    if (index < 0 || index >= images.length) return;
    setCurrentIndex(index);
    scrollIntoView(slideRefs.current[index], {
      scrollMode: "if-needed",
      block: "nearest",
      inline: "nearest",
      behavior: "smooth",
    });
  };

  const setSlideRef = (ref: HTMLLIElement | null, index: number) => {
    if (ref) slideRefs.current[index] = ref;
  };

  return (
    <div className={styles.container}>
      <section className={styles.imageSlider}>
        <ul className={styles.imageSlider__list}>
          {images.map((image, i) => (
            <li
              key={i}
              className={styles.imageSlider__item}
              ref={(ref) => setSlideRef(ref, i)}
            >
              <Image
                className={styles.imageSlider__image}
                src={urlFor(image)}
                fill
                alt="ExcursionCard image"
              />
            </li>
          ))}
        </ul>
      </section>
      <button
        onClick={(e) => {
          e.preventDefault();
          goToSlide(currentIndex - 1);
        }}
        className={clsx(styles.slideButton, styles.slideButton_prev)}
      >
        <NavigateBefore />
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          goToSlide(currentIndex + 1);
        }}
        className={clsx(styles.slideButton, styles.slideButton_next)}
      >
        <NavigateNext />
      </button>
      <ul
        className={clsx(
          styles.sliderControls,
          styles.imageSlider__imageIncidator
        )}
      >
        <li className={styles.sliderControls__item}>
          <button className={styles.sliderControls__button} />
        </li>
        <li className={styles.sliderControls__item}>
          <button className={styles.sliderControls__button} />
        </li>
        <li className={styles.sliderControls__item}>
          <button className={styles.sliderControls__button} />
        </li>
        <li className={styles.sliderControls__item}>
          <button className={styles.sliderControls__button} />
        </li>
        <li className={styles.sliderControls__item}>
          <button className={styles.sliderControls__button} />
        </li>
      </ul>
    </div>
  );
};
