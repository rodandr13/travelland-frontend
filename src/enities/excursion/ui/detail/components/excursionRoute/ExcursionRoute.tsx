import clsx from "clsx";

import styles from "./styles.module.scss";

import { RouteItem } from "@/src/shared/types/excursion";
import { RoutePoint } from "@/src/shared/ui";

interface Props {
  routes: RouteItem[];
  startingPlace: RouteItem;
  endingPlace: RouteItem;
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
          <RoutePoint place={startingPlace} position="START" isOpen={true} />
        </li>
        {routes.map((route, i) => (
          <li key={i} className={clsx(styles.route__item)}>
            <RoutePoint place={route} position="POINT" />
          </li>
        ))}
        <li className={clsx(styles.route__item, styles.route__item_type_end)}>
          <RoutePoint place={endingPlace} position="END" />
        </li>
      </ol>
    </section>
  );
};
