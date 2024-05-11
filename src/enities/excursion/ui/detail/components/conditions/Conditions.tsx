import clsx from "clsx";

import {
  AdditionalTerms,
  Included,
  Surcharge,
} from "@/src/enities/excursion/model/types/ExcursionDetail";

import styles from "./styles.module.scss";

interface Props {
  surcharge: Surcharge;
  included: Included;
  additionalTerms: AdditionalTerms;
}

export const Conditions = ({ surcharge, included, additionalTerms }: Props) => {
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
          {included?.map((item, i) => (
            <li key={i} className={styles.options__item}>
              {item}
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
          {surcharge?.map((item, i) => (
            <li key={i} className={styles.options__item}>
              {item}
            </li>
          ))}
        </ul>
      </div>
      {additionalTerms && (
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
            {additionalTerms.map((item, i) => (
              <li key={i} className={styles.options__item}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};
