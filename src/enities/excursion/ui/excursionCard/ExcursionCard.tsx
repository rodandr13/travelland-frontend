"use client";

import styles from "./styles.module.scss";
import { WeekDays } from "@/src/shared/ui/weekDays";
import { PriceBlock } from "@/src/shared/ui/priceBlock";
import Link from "next/link";
import React from "react";
import { ImageSlider } from "@/src/shared/ui/slider";
import { IExcursionCard } from "@/src/enities/excursion/model/types/ExcursionCard";

interface Props {
  addFavorite: React.ReactNode;
  card: IExcursionCard;
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
  const price = card.schedule[1].prices[0].price.toString();
  const duration = card.schedule[1].duration.hours;
  const weekdays = card.schedule[1].weekdays;
  const filledDays = daysOfWeek.map((day) =>
    weekdays.includes(day) ? day : ""
  );
  return (
    <article className={styles.excursionCard}>
      <Link
        href={`excursion/${card.slug}`}
        className={styles.excursionCard__link}
      >
        <div className={styles.excursionCard__imageContainer}>
          <div className={styles.excursionCard__favorites}>{addFavorite}</div>
          <ImageSlider images={card.gallery} />
        </div>
        <WeekDays days={filledDays} />
        <h3 className={styles.excursionCard__header}>{card.title}</h3>
        <div className={styles.excursionCard__duration}>{duration} hours</div>
        <PriceBlock price={price} />
      </Link>
    </article>
  );
};
