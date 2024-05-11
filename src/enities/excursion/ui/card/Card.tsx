"use client";

import React from "react";

import Link from "next/link";

import { IExcursionCard } from "@/src/enities/excursion/model/types/ExcursionCard";
import { PriceBlock } from "@/src/shared/ui/priceBlock";
import { ImageSlider } from "@/src/shared/ui/slider";
import { WeekDays } from "@/src/shared/ui/weekDays";

import styles from "./styles.module.scss";

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

export const Card = ({ addFavorite, card }: Props) => {
  const filledDays = daysOfWeek.map((day) =>
    card.weekdays.includes(day) ? day : ""
  );

  const allPrices = [
    card.basePrices,
    ...(card.promotionalPrices || []),
    ...(card.priceCorrections || []),
  ];
  const minPrice = Math.min(...allPrices);
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
        <div className={styles.excursionCard__duration}>
          {card.duration} hours
        </div>
        <PriceBlock price={minPrice} basePrice={card.basePrices} />
      </Link>
    </article>
  );
};
