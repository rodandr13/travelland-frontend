"use client";

import styles from "./styles.module.scss";
import { ExcursionCard } from "@/src/enities/excursion";
import { ExcursionCardsType } from "@/src/enities/excursion/model/types/ExcursionCard";
import { useAppDispatch, useAppSelector } from "@/src/shared/lib/redux/hooks";
import { useEffect } from "react";
import { setFilter } from "@/src/features/excursion/excursionFilter/model/filtetSlice";

interface Props {
  addFavorite: React.ReactNode;
  excursionCards: ExcursionCardsType;
}

export const ExcursionList = ({ addFavorite, excursionCards }: Props) => {
  const { activeFilter } = useAppSelector((state) => state.filter);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setFilter(""));
  }, [dispatch]);

  const filteredExcursions = activeFilter
    ? excursionCards.filter(
        (excursion) =>
          excursion.category === activeFilter ||
          excursion.subcategory.some((item) => item === activeFilter)
      )
    : excursionCards;

  return (
    <section className={styles.excursionList}>
      {filteredExcursions.length > 0 ? (
        filteredExcursions.map((card) => (
          <ExcursionCard key={card._id} addFavorite={addFavorite} card={card} />
        ))
      ) : (
        <div>Ничего не найдено</div>
      )}
    </section>
  );
};
