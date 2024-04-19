import Image from "next/image";
import styles from "./styles.module.scss";
import clsx from "clsx";
import React, { useRef, useState } from "react";
import { urlFor } from "@/src/shared/lib/sanity/client";
import scrollIntoView from "scroll-into-view-if-needed";
import { GalleryImage } from "@/src/enities/excursion/model/types/ExcursionDetail";

interface Props {
  images: GalleryImage[];
}

export const ImageSlider = ({ images }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [controlsTranslateX, setControlsTranslateX] = useState(0);
  const slideRefs = useRef<HTMLElement[]>([]);
  const sliderControlsRef = useRef<HTMLUListElement>(null);
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

  const transform = {
    transform: `translateX(${controlsTranslateX}px)`,
  };

  const getScaleStyle = (index: number) => {
    let scale = 0.66; // Базовое значение масштаба

    // Проверяем, находится ли индекс в начале или конце массива, и применяем условия
    const isStart = currentIndex < 3;
    const isEnd = currentIndex >= images.length - 3;
    const distanceFromCurrent = Math.abs(currentIndex - index);

    if (isStart) {
      if (index <= 2) scale = 1;
      else if (index === 3) scale = 0.83;
    } else if (isEnd) {
      if (images.length - index <= 3)
        scale = 1; // Последние 3 элемента
      else if (images.length - index <= 5 && images.length - index > 3)
        scale = 0.83; // Предпоследние 2 перед последними тремя
    } else {
      // Средние индексы массива
      if (distanceFromCurrent <= 1) scale = 1;
      else if (distanceFromCurrent === 2) scale = 0.83;
    }

    return { transform: `scale(${scale})` };
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
                src={urlFor(image.src, { width: 500 })}
                placeholder="blur"
                blurDataURL={image.lqip}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                alt="ExcursionCard image"
              />
            </li>
          ))}
        </ul>
      </section>
      <button
        disabled={currentIndex <= 0}
        onClick={(e) => {
          e.preventDefault();
          goToSlide(currentIndex - 1);
          if (currentIndex >= 3 && currentIndex < images.length - 2) {
            setControlsTranslateX((current) => current + 10);
          }
        }}
        className={clsx(styles.slideButton, styles.slideButton_prev)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          aria-hidden="true"
          role="presentation"
          focusable="false"
          className={styles.slideButton__prevIcon}
        >
          <path fill="none" d="M20 28 8.7 16.7a1 1 0 0 1 0-1.4L20 4"></path>
        </svg>
      </button>
      <button
        disabled={currentIndex >= images.length - 1}
        onClick={(e) => {
          e.preventDefault();
          goToSlide(currentIndex + 1);
          if (currentIndex >= 2 && currentIndex < images.length - 3) {
            setControlsTranslateX((current) => current - 10);
          }
        }}
        className={clsx(styles.slideButton, styles.slideButton_next)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          aria-hidden="true"
          role="presentation"
          focusable="false"
          className={styles.slideButton__nextIcon}
        >
          <path fill="none" d="M20 28 8.7 16.7a1 1 0 0 1 0-1.4L20 4"></path>
        </svg>
      </button>
      <div
        className={clsx(
          styles.sliderControls,
          styles.imageSlider__imageIncidator
        )}
      >
        <ul
          className={clsx(styles.sliderControls__list)}
          ref={sliderControlsRef}
          style={transform}
        >
          {Array.from({ length: images.length }, (_, i) => (
            <li
              key={i}
              className={styles.sliderControls__item}
              style={getScaleStyle(i)}
            >
              <button
                className={clsx(styles.sliderControls__button, {
                  [styles.sliderControls__button_active]: i === currentIndex,
                })}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
