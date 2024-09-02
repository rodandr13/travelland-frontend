import styles from "../styles.module.scss";

interface Props {
  contactsData: {
    name: string;
    phone: string;
    email: string;
  };
  onInputChange: (field: string, value: string) => void;
}

export const Contacts = ({ contactsData, onInputChange }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onInputChange(name, value);
  };

  return (
    <section className={styles.contacts}>
      <h2>Заполните информацию о себе</h2>
      <div className={styles.contacts__form}>
        <input
          type="text"
          name="name"
          value={contactsData.name}
          placeholder="Имя"
          onChange={handleChange}
        />
        <input
          type="text"
          name="phone"
          value={contactsData.phone}
          placeholder="Телефон"
          onChange={handleChange}
        />
        <input
          type="text"
          name="email"
          value={contactsData.email}
          placeholder="Почта"
          onChange={handleChange}
        />
      </div>
    </section>
  );
};
