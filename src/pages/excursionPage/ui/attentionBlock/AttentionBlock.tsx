import styles from "./styles.module.scss";
export const AttentionBlock = () => {
  return (
    <section className={styles.attentionBlock}>
      <h4 className={styles.attentionBlock__title}>Внимание!</h4>
      <p className={styles.attentionBlock__description}>
        Бронирование возможно только за 3 дня до начала экскурсии.
      </p>
    </section>
  );
};
