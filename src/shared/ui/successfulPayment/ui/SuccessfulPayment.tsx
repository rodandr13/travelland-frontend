import Link from "next/link";

import styles from "./styles.module.scss";

interface Props {
  orderNumber: number;
}

export const SuccessfulPayment = ({ orderNumber }: Props) => {
  return (
    <section className={styles.successfulOrder}>
      <div>
        <h1 className={styles.header}>Спасибо!</h1>
        <p
          className={styles.subheader}
        >{`Ваш заказ  №${orderNumber} создан и успешно оплачен.`}</p>
      </div>
      <p>
        На почту test@test.ru выслано подтверждение заказа. Информацию о заказе
        всегда можно посмотреть в <Link href="/my">личном кабинете</Link>.
      </p>
      <div className={styles.contacts}>
        <p className={styles.contacts__title}>
          При возникновении вопросов обращайтесь в наш контактный центр:
        </p>
        <p className={styles.contacts__phone}>+429 725 841 086</p>
      </div>
      <Link href="/" className="link_cart">
        Вернуться на главную страницу
      </Link>
    </section>
  );
};
