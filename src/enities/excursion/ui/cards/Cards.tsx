import { Card } from "@/src/enities/excursion";
import { getExcursionCards } from "@/src/enities/excursion/api/getExcursionCards";
import { AddToFavorite } from "@/src/features/addToFavorite";

import styles from "./styles.module.scss";
// import { setFilter } from "@/src/features/excursion/excursionFilter/model/filterSlice";
// import { useAppDispatch, useAppSelector } from "@/src/shared/lib/redux/hooks";

export const Cards = async () => {
  const excursionCards = await getExcursionCards();
  // const { activeFilter } = useAppSelector((state) => state.filter);
  // const dispatch = useAppDispatch();
  //
  // useEffect(() => {
  //   dispatch(setFilter(""));
  // }, [dispatch]);
  // const filteredExcursions = activeFilter
  //   ? cards.filter(
  //       (excursion) =>
  //         excursion.category === activeFilter ||
  //         excursion.subcategory.some((item) => item === activeFilter)
  //     )
  //   : cards;

  return (
    <section className={styles.excursionList}>
      {excursionCards.length > 0 ? (
        excursionCards.map((card) => (
          <Card key={card._id} addFavorite={<AddToFavorite />} card={card} />
        ))
      ) : (
        <h3>Экскурсий не найдено</h3>
      )}
    </section>
  );
};
