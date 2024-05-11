"use client";

import { useEffect } from "react";

import { Card } from "@/src/enities/excursion";
import { ExcursionCardsType } from "@/src/enities/excursion/model/types/ExcursionCard";
import { AddToFavorite } from "@/src/features/addToFavorite";
import { useAppDispatch, useAppSelector } from "@/src/shared/lib/redux/hooks";
import { setFilter } from "@/src/widgets/excursionCatalog/model/filterSlice";

interface Props {
  excursionCards: ExcursionCardsType;
}

export const CardsList = ({ excursionCards }: Props) => {
  // Нельзя обращаться к верхним слоям, нужно исправить
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
    <>
      {filteredExcursions.length > 0 ? (
        filteredExcursions.map((card) => (
          <Card key={card._id} addFavorite={<AddToFavorite />} card={card} />
        ))
      ) : (
        <h3>Экскурсий не найдено</h3>
      )}
    </>
  );
};
