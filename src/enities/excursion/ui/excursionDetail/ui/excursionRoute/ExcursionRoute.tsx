import styles from "./styles.module.scss";
import clsx from "clsx";
import Image from "next/image";
import { RouteItem } from "@/src/enities/excursion/model/types/ExcursionDetail";
import { urlFor } from "@/src/shared/lib/sanity/client";

interface Props {
  routes: RouteItem[];
}

export const ExcursionRoute = ({ routes }: Props) => {
  return (
    <section className={styles.route}>
      <h2 className={styles.route__title}>Маршрут экскурсии</h2>
      <ol className={styles.route__list}>
        <li className={clsx(styles.route__item, styles.route__item_type_start)}>
          <div className={styles.route__container}>
            <h3 className={styles.route__subheader}>Место сбора</h3>
            <p className={styles.route__description}>
              Станция мето Мустек, выход в сторону улиц Йиндржишска и Водичкова.
              Адрес места встречи: Vaclavske nam. 791/32,110 00 Praha.
            </p>
            <p className={styles.route__caption}>
              На месте сбора вас будет ждать наш представитель с табличкой
              «iTRAVEX»
            </p>
          </div>
          <div className={styles.route__gallery}>
            <div className={styles.route__imageContainer}>
              <Image
                className={styles.route__image}
                src="/img_start.jpg"
                alt=""
                fill
              />
            </div>
          </div>
        </li>
        {routes.map((route, i) => (
          <li key={i} className={clsx(styles.route__item)}>
            <div className={styles.route__container}>
              <h3 className={styles.route__subheader}>{route.title}</h3>
              <p className={styles.route__description}>{route.description}</p>
            </div>
            <div className={styles.route__gallery}>
              <div className={styles.route__imageContainer}>
                {route.gallery.map((image, i) => (
                  <Image
                    key={i}
                    className={styles.route__image}
                    src={urlFor(image)}
                    alt=""
                    fill
                  />
                ))}
              </div>
            </div>
          </li>
        ))}
        <li className={clsx(styles.route__item, styles.route__item_type_end)}>
          <div className={styles.route__container}>
            <h3 className={styles.route__subheader}>Место окончания</h3>
            <p className={styles.route__description}>
              Станция мето Мустек, выход в сторону улиц Йиндржишска и Водичкова.
              Адрес места встречи: Vaclavske nam. 791/32,110 00 Praha.
            </p>
          </div>
        </li>
      </ol>
    </section>
  );
};
