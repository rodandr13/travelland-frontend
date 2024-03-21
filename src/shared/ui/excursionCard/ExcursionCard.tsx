import styles from "./styles.module.scss";
import Image from "next/image";
import clsx from "clsx";
import {
  NavigateBefore,
  NavigateNext,
  NavigateNextTwoTone,
} from "@mui/icons-material";

export const ExcursionCard = () => {
  return (
    <article className={styles.excursionCard}>
      <div className={styles.excursionCard__imageContainer}>
        <Image
          className={styles.excursionCard__image}
          src="/excursion-image.jpg"
          fill={true}
          alt="Card image"
        />
        <div className={styles.excursionCard__favorites}>Like</div>
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
      <ul className={clsx(styles.weekDays)}>
        <li className={clsx(styles.weekDays__day, styles.weekDays__day_active)}>
          Пн
        </li>
        <li className={clsx(styles.weekDays__day)}>Вт</li>
        <li className={styles.weekDays__day}>Ср</li>
        <li className={clsx(styles.weekDays__day)}>Чт</li>
        <li className={styles.weekDays__day}>Пт</li>
        <li className={clsx(styles.weekDays__day, styles.weekDays__day_active)}>
          Сб
        </li>
        <li className={clsx(styles.weekDays__day, styles.weekDays__day_active)}>
          Вс
        </li>
      </ul>
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
