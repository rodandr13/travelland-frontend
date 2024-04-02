import styles from "./styles.module.scss";

export const Breadcrumbs = () => {
  return (
    <section className={styles.breadcrumbs}>
      <ul className={styles.breadcrumbs__list}>
        <li className={styles.breadcrumbs__item}>Home</li>
        <li className={styles.breadcrumbs__item}>
          Cesky Krumlov and Hluboka Castle over the Vltava
        </li>
      </ul>
    </section>
  );
};
