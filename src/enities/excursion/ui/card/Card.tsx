"use client";

import React from "react";

import Link from "next/link";

import { ExcursionCard } from "@/src/shared/types/excursion";
import { PriceBlock } from "@/src/shared/ui/priceBlock";
import { ImageSlider } from "@/src/shared/ui/slider";
import { WeekDays } from "@/src/shared/ui/weekDays";

import styles from "./styles.module.scss";
import { formatDuration } from "../../lib/formatDuration";

interface Props {
  addFavorite: React.ReactNode;
  card: ExcursionCard;
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
  const formattedDuration = formatDuration(card.duration);

  const priceCorrections =
    card.priceCorrections?.flatMap((pricesObj) =>
      pricesObj.prices.flatMap((price) => price.price)
    ) || [];
  const promotionalPrices =
    card.promotionalPrices?.flatMap((pricesObj) =>
      pricesObj.prices.flatMap((price) => price.price)
    ) || [];
  const basePrices =
    card.basePrices.map((priceObj) => priceObj.price)[0] ?? null;
  const allPrices = [
    basePrices,
    ...priceCorrections,
    ...promotionalPrices,
  ].filter((price) => price != null);
  const minPrice = allPrices.length > 0 ? Math.min(...allPrices) : basePrices;
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
          {formattedDuration}
        </div>
        <PriceBlock price={minPrice} basePrice={basePrices} />
      </Link>
    </article>
  );
};
