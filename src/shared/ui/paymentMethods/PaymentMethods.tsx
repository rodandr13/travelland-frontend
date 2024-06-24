import styles from "./styles.module.scss";

export const PaymentMethods = () => {
  return (
    <section className={styles.paymentMethods}>
      <h2>Выберите способ оплаты</h2>
      <ul className={styles.paymentMethods__list}>
        <li className={styles.paymentMethods__item}>
          <label className={styles.paymentMethods__label}>
            <input
              className={styles.paymentMethods__input}
              type="radio"
              name="payment"
              value="cash"
            />
            <span>Наличными</span>
          </label>
        </li>
        <li className={styles.paymentMethods__item}>
          <label className={styles.paymentMethods__label}>
            <input
              className={styles.paymentMethods__input}
              type="radio"
              name="payment"
              value="card"
            />
            <span>Оплата картой онлайн или через СБП</span>
          </label>
        </li>
        <li className={styles.paymentMethods__item}>
          <label className={styles.paymentMethods__label}>
            <input
              className={styles.paymentMethods__input}
              type="radio"
              name="payment"
              value="split"
            />
            <span>Оплата частями</span>
          </label>
        </li>
      </ul>
    </section>
  );
};
