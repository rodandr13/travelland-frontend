"use client";

import React from "react";

import Link from "next/link";

import { findAdultBasePrice } from "@/src/shared/lib/findAdultBasePrice";
import { getMinPrice } from "@/src/shared/lib/getMinPrice";
import { Price } from "@/src/shared/types/booking";
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

interface PriceData {
  basePrices: Price[];
  priceCorrections?: Price[];
  promotionalPrices?: Price[];
}

export const Card = ({ addFavorite, card }: Props) => {
  const filledDays = daysOfWeek.map((day) =>
    card.weekdays.includes(day) ? day : ""
  );

  const priceData: PriceData = {
    basePrices: card.basePrices,
  };

  if (card.priceCorrections) {
    priceData.priceCorrections = card.priceCorrections.flatMap(
      (promo) => promo.prices
    );
  }

  if (card.promotionalPrices) {
    priceData.promotionalPrices = card.promotionalPrices.flatMap(
      (promo) => promo.prices
    );
  }

  const baseAdultPrice = findAdultBasePrice(card.basePrices);
  const minPrice = getMinPrice(priceData, card.category.key);

  return (
    <article className={styles.excursionCard}>
      <div className={styles.excursionCard__imageContainer}>
        <div className={styles.excursionCard__favorites}>{addFavorite}</div>
        <ImageSlider card={card} />
      </div>
      <Link
        href={`excursion/${card.slug}`}
        className={styles.excursionCard__link}
      >
        <WeekDays days={filledDays} />
        <h3 className={styles.excursionCard__header}>{card.title}</h3>
        <p className={styles.excursionCard__duration}>
          {formatDuration(card.duration)}
        </p>
        <PriceBlock currentPrice={minPrice} basePrice={baseAdultPrice} />
      </Link>
    </article>
  );
};
