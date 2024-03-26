import styles from "./styles.module.scss";
import clsx from "clsx";
export const Advantages = () => {
  return (
    <section className={styles.advantages}>
      <ul className={styles.advantages__list}>
        <li
          className={clsx(
            styles.advantages__item,
            styles.advantages__item_adv1
          )}
        >
          <h4 className={styles.advantages__title}>Электронный ваучер</h4>
          <p className={styles.advantages__description}>Не нужно печатать</p>
        </li>
        <li
          className={clsx(
            styles.advantages__item,
            styles.advantages__item_adv2
          )}
        >
          <h4 className={styles.advantages__title}>Комфортабельный автобус</h4>
          <p className={styles.advantages__description}>Группы до 50 человек</p>
        </li>
        <li
          className={clsx(
            styles.advantages__item,
            styles.advantages__item_adv3
          )}
        >
          <h4 className={styles.advantages__title}>
            Много достопримечательностей
          </h4>
          <p className={styles.advantages__description}>
            Вам будет, что вспомнить
          </p>
        </li>
        <li
          className={clsx(
            styles.advantages__item,
            styles.advantages__item_adv4
          )}
        >
          <h4 className={styles.advantages__title}>
            Бесплатная отмена или обмен
          </h4>
          <p className={styles.advantages__description}>
            Онлайн, в личном кабинете
          </p>
        </li>
        <li
          className={clsx(
            styles.advantages__item,
            styles.advantages__item_adv5
          )}
        >
          <h4 className={styles.advantages__title}>Лицензированные гиды</h4>
          <p className={styles.advantages__description}>Опыт более 10 лет</p>
        </li>
      </ul>
    </section>
  );
};
