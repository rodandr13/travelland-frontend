import styles from "./styles.module.scss";
import { ExcursionCard } from "../../";
import { ExcursionCardsType } from "@/src/enities/excursion/model/types/ExcursionCard";
import { getExcursionCards } from "@/src/enities/excursion/api/getExcursionCards";
import { AddToFavorite } from "@/src/features/addToFavorite";
// import { setFilter } from "@/src/features/excursion/excursionFilter/model/filtetSlice";
// import { useAppDispatch, useAppSelector } from "@/src/shared/lib/redux/hooks";

interface Props {
  excursionCards: ExcursionCardsType;
}

export const ExcursionList = async () => {
  const excursionCards = await getExcursionCards();
  // const { activeFilter } = useAppSelector((state) => state.filter);
  // const dispatch = useAppDispatch();
  //
  // useEffect(() => {
  //   dispatch(setFilter(""));
  // }, [dispatch]);
  // const filteredExcursions = activeFilter
  //   ? excursionCards.filter(
  //       (excursion) =>
  //         excursion.category === activeFilter ||
  //         excursion.subcategory.some((item) => item === activeFilter)
  //     )
  //   : excursionCards;

  return (
    <section className={styles.excursionList}>
      {excursionCards.length > 0 ? (
        excursionCards.map((card) => (
          <ExcursionCard
            key={card._id}
            addFavorite={<AddToFavorite />}
            card={card}
          />
        ))
      ) : (
        <h3>Экскурсий не найдено</h3>
      )}
    </section>
  );
};
