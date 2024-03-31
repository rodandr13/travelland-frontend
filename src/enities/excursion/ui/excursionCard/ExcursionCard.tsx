"use client";

import styles from "./styles.module.scss";
import Image from "next/image";
import clsx from "clsx";
import { NavigateBefore, NavigateNext } from "@mui/icons-material";
import { WeekDays } from "@/src/shared/ui/weekDays";
import { PriceBlock } from "@/src/shared/ui/priceBlock";
import Link from "next/link";
import React from "react";

interface Props {
  addFavorite: React.ReactNode;
}
const handleClick = (e: React.MouseEvent<HTMLElement>) => {
  e.preventDefault();
};

export const ExcursionCard = ({ addFavorite }: Props) => {
  return (
    <article className={styles.excursionCard}>
      <Link href="/excursion" className={styles.excursionCard__link}>
        <div className={styles.excursionCard__imageContainer}>
          <Image
            className={styles.excursionCard__image}
            src="/excursion-image.jpg"
            fill={true}
            alt="ExcursionCard image"
          />
          <div className={styles.excursionCard__favorites}>{addFavorite}</div>
          <ul
            className={clsx(
              styles.sliderControls,
              styles.excursionCard__imageIncidator
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
          <button
            onClick={handleClick}
            className={clsx(styles.slideButton, styles.slideButton_prev)}
          >
            <NavigateBefore />
          </button>
          <button
            onClick={handleClick}
            className={clsx(styles.slideButton, styles.slideButton_next)}
          >
            <NavigateNext />
          </button>
        </div>
        <WeekDays />
        <h3 className={styles.excursionCard__header}>
          Kutna Hora and Cesky Sternberk Castle
        </h3>
        <div className={styles.excursionCard__duration}>12 hours</div>
        <PriceBlock price="35.90" oldPrice="45.90" discount="15" />
      </Link>
    </article>
  );
};
