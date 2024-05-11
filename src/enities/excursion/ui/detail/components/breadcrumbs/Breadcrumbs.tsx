import Link from "next/link";

import styles from "./styles.module.scss";

interface Props {
  title: string;
}

export const Breadcrumbs = ({ title }: Props) => {
  return (
    <section className={styles.breadcrumbs}>
      <ul className={styles.breadcrumbs__list}>
        <li className={styles.breadcrumbs__item}>
          <Link className={styles.breadcrumbs__link} href="/">
            Главная
          </Link>
        </li>
        <li className={styles.breadcrumbs__item}>{title}</li>
      </ul>
    </section>
  );
};
