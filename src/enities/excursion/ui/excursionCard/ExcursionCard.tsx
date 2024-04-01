"use client";

import styles from "./styles.module.scss";
import Image from "next/image";
import clsx from "clsx";
import { NavigateBefore, NavigateNext } from "@mui/icons-material";
import { WeekDays } from "@/src/shared/ui/weekDays";
import { PriceBlock } from "@/src/shared/ui/priceBlock";
import Link from "next/link";
import React from "react";
import { urlFor } from "@/src/shared/lib/sanity/client";

interface Props {
  addFavorite: React.ReactNode;
  card: any;
}

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export const ExcursionCard = ({ addFavorite, card }: Props) => {
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
  };
  const imageUrl = urlFor(card.gallery[1]);
  const price = card.schedule[1].prices[0].price;
  const duration = card.schedule[1].duration.hours;
  const weekdays = card.schedule[1].weekdays;
  const filledDays = daysOfWeek.map((day) =>
    weekdays.includes(day) ? day : ""
  );
  return (
    <article className={styles.excursionCard}>
      <Link href="/excursion" className={styles.excursionCard__link}>
        <div className={styles.excursionCard__imageContainer}>
          <Image
            className={styles.excursionCard__image}
            src={imageUrl}
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
        <WeekDays days={filledDays} />
        <h3 className={styles.excursionCard__header}>{card.title}</h3>
        <div className={styles.excursionCard__duration}>{duration} hours</div>
        <PriceBlock price={price} />
      </Link>
    </article>
  );
};
