import styles from "./styles.module.scss";
import clsx from "clsx";

export const Conditions = () => {
  return (
    <section className={styles.conditions}>
      <div className={styles.options}>
        <h3
          className={clsx(
            styles.options__title,
            styles.options__title_included
          )}
        >
          Что включено
        </h3>
        <ul className={styles.options__list}>
          <li className={styles.options__item}>Транспорт</li>
          <li className={styles.options__item}>
            Обслуживание лицензированного гида
          </li>
          <li className={styles.options__item}>Свободное время</li>
          <li className={styles.options__item}>Наушники</li>
        </ul>
      </div>
      <div className={styles.options}>
        <h3
          className={clsx(
            styles.options__title,
            styles.options__title_notIncluded
          )}
        >
          Доплаты
        </h3>
        <ul className={styles.options__list}>
          <li className={styles.options__item}>Билеты в замки</li>
        </ul>
      </div>
      <div className={styles.options}>
        <h3
          className={clsx(
            styles.options__title,
            styles.options__title_additional
          )}
        >
          Дополнительные условия
        </h3>
        <ul className={styles.options__list}>
          <li className={styles.options__item}>Дополнительных условий нет</li>
        </ul>
      </div>
    </section>
  );
};
