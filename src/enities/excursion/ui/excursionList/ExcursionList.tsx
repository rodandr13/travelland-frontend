"use client";

import styles from "./styles.module.scss";
import { ExcursionCard } from "@/src/enities/excursion";
import { ExcursionCardsType } from "@/src/enities/excursion/model/types/ExcursionCard";
import { useAppSelector } from "@/src/shared/lib/redux/hooks";

interface Props {
  addFavorite: React.ReactNode;
  excursionCards: ExcursionCardsType;
}

export const ExcursionList = ({ addFavorite, excursionCards }: Props) => {
  const { activeFilter } = useAppSelector((state) => state.filter);
  const filteredExcursions = activeFilter
    ? excursionCards.filter(
        (excursion) =>
          excursion.excursionCategory.title === activeFilter ||
          excursion.excursionSubcategory.some(
            (subcategory) => subcategory.title === activeFilter
          )
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
