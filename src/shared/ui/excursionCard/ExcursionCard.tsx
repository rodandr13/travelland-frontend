import styles from "./styles.module.scss";
import Image from "next/image";
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
        <div className={styles.excursionCard__imageIncidator}>Indicator</div>
      </div>
      <div className={styles.excursionCard__weekDays}>WeekDaysBlock</div>
      <h3 className={styles.excursionCard__header}>
        Kutna Hora and Cesky Sternberk Castle
      </h3>
      <div className={styles.excursionCard__duration}>12 hours</div>
      <ul className={styles.excursionCard__priceBlock}>
        <li className={styles.excursionCard__price}>35.90 €</li>
        <li className={styles.excursionCard__oldPrice}>45.90 €</li>
        <li className={styles.excursionCard__discount}>
          -15%
        </li>
      </ul>
    </article>
  );
};
