import styles from "./styles.module.scss";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <div className={styles.footer__item}>
          <p className={styles.footer__text}>© 2023 TRAVELLAND CZ, s.r.o.</p>
          <p className={styles.footer__text}>
            International tour operator activity
          </p>
          <p className={styles.footer__text}>Insurance policy No. 0201902044</p>
        </div>
        <div className={styles.footer__item}>
          <p className={styles.footer__text}>+420 774 309 712</p>
          <p className={styles.footer__text}>travellandcz@travellandcz.com</p>
        </div>
        <div className={styles.footer__item}>
          <p className={styles.footer__text}>
            Mandatory guarantee insurance in case of bankruptcy of a travel
            agency
          </p>
          <p className={styles.footer__text}>
            Insurer: Vienna Insurance Group cestovní kancelář, Losenická 1602/3,
            Praha 10 Uhříněves, 10400, Česká republika
          </p>
        </div>
      </div>
    </footer>
  );
};
