import styles from "./styles.module.scss";

export const Contacts = () => {
  return (
    <section className={styles.contacts}>
      <h2>Заполните информацию о себе</h2>
      <form action="#" className={styles.contacts__form}>
        <input type="text" placeholder="Имя" />
        <input type="text" placeholder="Телефон" />
        <input type="text" placeholder="Почта" />
      </form>
    </section>
  );
};
