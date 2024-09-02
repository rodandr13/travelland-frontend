import { useState } from "react";

import styles from "../styles.module.scss";

interface Props {
  setPaymentMethod: (paymentMethod: string) => void;
}

export const PaymentMethods = ({ setPaymentMethod }: Props) => {
  const [selectedMethod, setSelectedMethod] = useState<string>("cash");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSelectedMethod(value);
    setPaymentMethod(value);
  };

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
              onChange={handleChange}
              checked={selectedMethod === "cash"}
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
              onChange={handleChange}
              checked={selectedMethod === "card"}
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
              onChange={handleChange}
              checked={selectedMethod === "split"}
            />
            <span>Оплата частями</span>
          </label>
        </li>
      </ul>
    </section>
  );
};
