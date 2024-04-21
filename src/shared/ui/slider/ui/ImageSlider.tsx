import Image from "next/image";
import styles from "./styles.module.scss";
import clsx from "clsx";
import React, { useRef, useState } from "react";
import { urlFor } from "@/src/shared/lib/sanity/client";
import { GalleryImage } from "@/src/enities/excursion/model/types/ExcursionDetail";
import { SlideButton } from "@/src/shared/ui/";
import { getScaleStyle } from "@/src/shared/ui/slider/lib/getScaleStyle";
import { goToSlide } from "@/src/shared/ui/slider/lib/goToSlide";
import { setSlideRef } from "@/src/shared/ui/slider/lib/setSlideRef";

interface Props {
  images: GalleryImage[];
}

export const ImageSlider = ({ images }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [controlsTranslateX, setControlsTranslateX] = useState(0);
  const slideRefs = useRef<HTMLElement[]>([]);
  const sliderControlsRef = useRef<HTMLUListElement>(null);

  const transform = {
    transform: `translateX(${controlsTranslateX}px)`,
  };

  const handleGoToSlide = (index: number) => {
    goToSlide(index, images, setCurrentIndex, slideRefs);
  };

  return (
    <div className={styles.container}>
      <section className={styles.imageSlider}>
        <ul className={styles.imageSlider__list}>
          {images.map((image, i) => (
            <li
              key={i}
              className={styles.imageSlider__item}
              ref={(ref) => setSlideRef(slideRefs, ref, i)}
            >
              <Image
                className={styles.imageSlider__image}
                src={urlFor(image.src)}
                placeholder="blur"
                blurDataURL={image.lqip}
                fill
                sizes="(max-width: 500px) 70vw, (max-width: 768px) 50vw, (max-width: 1200px) 30vw, 20vw"
                alt="ExcursionCard image"
              />
            </li>
          ))}
        </ul>
      </section>

      <div className={styles.imageSlider__buttonsContainer}>
        <SlideButton
          direction="prev"
          disabled={currentIndex <= 0}
          onClick={(e) => {
            e.preventDefault();
            handleGoToSlide(currentIndex - 1);
            if (currentIndex >= 3 && currentIndex < images.length - 2) {
              setControlsTranslateX((current) => current + 10);
            }
          }}
        />

        <SlideButton
          direction="next"
          disabled={currentIndex >= images.length - 1}
          onClick={(e) => {
            e.preventDefault();
            handleGoToSlide(currentIndex + 1);
            if (currentIndex >= 2 && currentIndex < images.length - 3) {
              setControlsTranslateX((current) => current - 10);
            }
          }}
        />
      </div>

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
              style={getScaleStyle(i, currentIndex, images.length)}
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
