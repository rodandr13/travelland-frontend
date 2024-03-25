import styles from "./styles.module.scss";
import Image from "next/image";
import clsx from "clsx";
import { NavigateBefore, NavigateNext } from "@mui/icons-material";
import { WeekDays } from "@/src/shared/ui/weekDays";

interface Props {
  addFavorite: React.ReactNode;
}
export const ExcursionCard = ({ addFavorite }: Props) => {
  return (
    <article className={styles.excursionCard}>
      <div className={styles.excursionCard__imageContainer}>
        <Image
          className={styles.excursionCard__image}
          src="/excursion-image.jpg"
          fill={true}
          alt="ExcursionCard image"
        />
        <div className={styles.excursionCard__favorites}>{addFavorite}</div>
        <ul
          className={clsx(
            styles.sliderControls,
            styles.excursionCard__imageIncidator
          )}
        >
          <li className={styles.sliderControls__item}>
            <button className={styles.sliderControls__button} />
          </li>
          <li className={styles.sliderControls__item}>
            <button className={styles.sliderControls__button} />
          </li>
          <li className={styles.sliderControls__item}>
            <button className={styles.sliderControls__button} />
          </li>
          <li className={styles.sliderControls__item}>
            <button className={styles.sliderControls__button} />
          </li>
          <li className={styles.sliderControls__item}>
            <button className={styles.sliderControls__button} />
          </li>
        </ul>
        <button className={clsx(styles.slideButton, styles.slideButton_prev)}>
          <NavigateBefore />
        </button>
        <button className={clsx(styles.slideButton, styles.slideButton_next)}>
          <NavigateNext />
        </button>
      </div>
      <WeekDays />
      <h3 className={styles.excursionCard__header}>
        Kutna Hora and Cesky Sternberk Castle
      </h3>
      <div className={styles.excursionCard__duration}>12 hours</div>
      <ul className={styles.excursionCard__priceBlock}>
        <li className={styles.excursionCard__price}>35.90 €</li>
        <li className={styles.excursionCard__oldPrice}>45.90 €</li>
        <li className={styles.excursionCard__discount}>-15%</li>
      </ul>
    </article>
  );
};
