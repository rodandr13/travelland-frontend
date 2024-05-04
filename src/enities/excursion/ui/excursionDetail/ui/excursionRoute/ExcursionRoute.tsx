import styles from "./styles.module.scss";
import clsx from "clsx";
import Image from "next/image";
import {
  IMeetingPoint,
  RouteItem,
} from "@/src/enities/excursion/model/types/ExcursionDetail";
import { urlFor } from "@/src/shared/lib/sanity/client";
import { MeetingPoint } from "@/src/shared/ui";

interface Props {
  routes: RouteItem[];
  startingPlace: IMeetingPoint;
  endingPlace: IMeetingPoint;
}

export const ExcursionRoute = ({
  routes,
  startingPlace,
  endingPlace,
}: Props) => {
  return (
    <section className={styles.route}>
      <h2 className={styles.route__title}>Маршрут экскурсии</h2>
      <ol className={styles.route__list}>
        <li className={clsx(styles.route__item, styles.route__item_type_start)}>
          <MeetingPoint meetingPlace={startingPlace} isStart />
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
                    src={urlFor(image.src)}
                    placeholder="blur"
                    blurDataURL={image.lqip}
                    sizes="10vw"
                    alt=""
                    fill
                  />
                ))}
              </div>
            </div>
          </li>
        ))}
        <li className={clsx(styles.route__item, styles.route__item_type_end)}>
          <MeetingPoint meetingPlace={endingPlace} />
        </li>
      </ol>
    </section>
  );
};
