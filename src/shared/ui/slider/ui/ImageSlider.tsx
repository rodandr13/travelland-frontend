import React, { useCallback, useEffect, useState } from "react";

import clsx from "clsx";
import { EmblaCarouselType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import Link from "next/link";

import styles from "./styles.module.scss";

import { urlFor } from "@/src/shared/lib/sanity/client";
import { ExcursionCard } from "@/src/shared/types/excursion";
import { usePrevNextButtons } from "@/src/shared/ui/slider/lib/usePrevNextButtons";
import {
  DotButton,
  useDotButton,
} from "@/src/shared/ui/slider/ui/components/DotButton";
import { SlideButton } from "@/src/shared/ui/slider/ui/components/SlideButton";

interface Props {
  card: ExcursionCard;
}

export const ImageSlider = ({ card }: Props) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
  });
  const [slidesInView, setSlidesInView] = useState<number[]>([]);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  const updateSlidesInView = useCallback((emblaApi: EmblaCarouselType) => {
    setSlidesInView((slidesInView) => {
      if (slidesInView.length === emblaApi.slideNodes().length) {
        emblaApi.off("slidesInView", updateSlidesInView);
      }

      const inView = emblaApi
        .slidesInView()
        .filter((index) => !slidesInView.includes(index));

      return slidesInView.concat(inView);
    });
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    updateSlidesInView(emblaApi);
    emblaApi.on("slidesInView", updateSlidesInView);
    emblaApi.on("reInit", updateSlidesInView);

    return () => {
      emblaApi.off("select", updateSlidesInView);
      emblaApi.off("resize", updateSlidesInView);
    };
  }, [emblaApi, updateSlidesInView]);

  return (
    <div className={styles.container}>
      <section className={clsx(styles.imageSlider)}>
        <div ref={emblaRef}>
          <ul className={clsx(styles.imageSlider__list)}>
            {card.gallery.map((image, index) => (
              <li key={index} className={clsx(styles.imageSlider__item)}>
                <Link href={`excursion/${card.slug}`}>
                  {slidesInView.includes(index) && (
                    <Image
                      className={styles.imageSlider__image}
                      src={urlFor(image.src)}
                      placeholder="blur"
                      blurDataURL={image.lqip}
                      fill
                      sizes="(max-width: 500px) 70vw, (max-width: 768px) 50vw, (max-width: 1200px) 30vw, 20vw"
                      alt=""
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <SlideButton
            direction="prev"
            ariaLabel=""
            disabled={prevBtnDisabled}
            onClick={onPrevButtonClick}
          />
          <SlideButton
            direction="next"
            ariaLabel=""
            disabled={nextBtnDisabled}
            onClick={onNextButtonClick}
          />
          <div
            className={clsx(
              styles.sliderControls,
              styles.imageSlider__imageIncidator
            )}
          >
            <ul className={clsx(styles.sliderControls__list)}>
              {scrollSnaps.map((_, index) => (
                <li key={index} className={styles.sliderControls__item}>
                  <DotButton
                    onClick={() => onDotButtonClick(index)}
                    className={
                      index === selectedIndex
                        ? styles.sliderControls__button_active
                        : ""
                    }
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};
