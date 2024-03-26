import styles from "./styles.module.scss";
import Image from "next/image";
import { PageTitle } from "@/src/shared/ui/pageTitle/PageTitle";
import { WeekDays } from "@/src/shared/ui/weekDays";
import clsx from "clsx";

export const ExcursionPage = () => {
  return (
    <section className={styles.excursionPage}>
      <section className={styles.gallery}>
        <div className={styles.gallery__item}>
          <Image
            className={styles.gallery__image}
            fill={true}
            src="/img1.jpg"
            alt=""
          />
        </div>
        <div className={styles.gallery__item}>
          <Image
            className={styles.gallery__image}
            fill={true}
            src="/img2.jpg"
            alt=""
          />
        </div>
        <div className={styles.gallery__item}>
          <Image
            className={styles.gallery__image}
            fill={true}
            src="/img3.jpg"
            alt=""
          />
        </div>
        <div className={styles.gallery__item}>
          <Image
            className={styles.gallery__image}
            fill={true}
            src="/img4.jpg"
            alt=""
          />
        </div>
        <div className={styles.gallery__item}>
          <Image
            className={styles.gallery__image}
            fill={true}
            src="/img5.jpg"
            alt=""
          />
        </div>
      </section>
      <div className={styles.excursionPage__container}>
        <section className={styles.breadcrumbs}>
          <ul className={styles.breadcrumbs__list}>
            <li className={styles.breadcrumbs__item}>Home</li>
            <li className={styles.breadcrumbs__item}>
              Cesky Krumlov and Hluboka Castle over the Vltava
            </li>
          </ul>
        </section>
        <PageTitle>Cesky Krumlov and Hluboka Castle over the Vltava</PageTitle>
        <div className={styles.excursionPage__containerDescription}>
          <div className={styles.flexContainer}>
            <div className={styles.excursionPage__weekdays}>
              <h3 className={styles.excursionPage__smallTitle}>
                Days of the event
              </h3>
              <WeekDays />
            </div>
            <div className={styles.excursionPage__time}>
              <table className={styles.excursionPage__timeTable}>
                <thead>
                  <tr>
                    <th className={styles.excursionPage__smallTitle}>Start</th>
                    <th className={styles.excursionPage__smallTitle}>End</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className={styles.excursionPage__timeStart}>
                      <span>8:00</span>
                    </td>
                    <td className={styles.excursionPage__timeEnd}>16:00</td>
                  </tr>
                  <tr>
                    <td className={styles.excursionPage__timeStart}>
                      <span>9:00</span>
                    </td>
                    <td className={styles.excursionPage__timeEnd}>19:00</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className={styles.excursionPage__duration}>
              <h3 className={styles.excursionPage__smallTitle}>Duration</h3>
              <p className={styles.excursionPage__durationValue}>8 hours</p>
            </div>
          </div>
          <h3>What awaits you?</h3>
          <p>
            Do you want to immerse yourself in the romance of the Middle Ages,
            feel the breath of that time and walk along those same narrow
            streets? This is possible on our field trip “Czech Krumlov and
            Hluboká nad Vltavou Castle”. The sights, as well as the stories and
            legends from our guide, will not leave you. Cesky Krumlov is a
            preserved piece of the Middle Ages, it looks like a picture from a
            fairy tale book. Buildings in the Gothic, Baroque and Renaissance
            styles are mixed here, and the streets are narrower and more winding
            than in Prague. The city has been preserved almost unchanged, and
            that is why it is now considered an important part of the cultural
            heritage and is under the protection of UNESCO.
          </p>
          <div className={styles.flexContainer}>
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
                <li className={styles.options__item}>
                  Дополнительных условий нет
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
