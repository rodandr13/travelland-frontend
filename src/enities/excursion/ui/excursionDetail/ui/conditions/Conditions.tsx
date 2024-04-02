import styles from "./styles.module.scss";
import clsx from "clsx";

interface Props {
  surcharge: Array<{ title: string }>;
  included: Array<{ title: string }>;
}

export const Conditions = ({ surcharge, included }: Props) => {
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
          {included.map((item, i) => (
            <li key={i} className={styles.options__item}>
              {item.title}
            </li>
          ))}
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
          {surcharge.map((item, i) => (
            <li key={i} className={styles.options__item}>
              {item.title}
            </li>
          ))}
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
          <li className={styles.options__item}>Добавить блок в админку</li>
        </ul>
      </div>
    </section>
  );
};
