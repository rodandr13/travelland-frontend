import { useFormContext } from "react-hook-form";

import styles from "../styles.module.scss";

export const PaymentMethods = () => {
  const { register, setValue, watch } = useFormContext();
  const selectedMethod = watch("paymentMethod", "cash");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValue("paymentMethod", value);
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
              value="cash"
              {...register("paymentMethod")}
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
              value="card"
              {...register("paymentMethod")}
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
              value="prepayment"
              {...register("paymentMethod")}
              onChange={handleChange}
              checked={selectedMethod === "prepayment"}
            />
            <span>Оплата частями</span>
          </label>
        </li>
      </ul>
    </section>
  );
};
