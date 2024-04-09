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
  const baseAdultPrice = card.basePrices[0].price;
  let newPrice = baseAdultPrice;
  let oldPrice = baseAdultPrice;

  if (card.promotionalPrices && card.promotionalPrices.length > 0) {
    newPrice = card.promotionalPrices[0].prices[0].price;
    oldPrice = baseAdultPrice;
  }
  const filledDays = daysOfWeek.map((day) =>
    card.weekdays.includes(day) ? day : ""
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
        <div className={styles.excursionCard__duration}>
          {card.duration.join(", ")} hours
        </div>
        <PriceBlock
          price={newPrice.toString()}
          oldPrice={oldPrice.toString()}
        />
      </Link>
    </article>
  );
};
