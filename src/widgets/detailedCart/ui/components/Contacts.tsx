import { Controller, useFormContext } from "react-hook-form";

import styles from "../styles.module.scss";

type ContactsData = {
  name: string;
  phone: string;
  email: string;
};

export const Contacts = () => {
  const {
    control,
    formState: { errors },
    trigger,
  } = useFormContext<ContactsData>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    trigger(name as keyof ContactsData);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    trigger(name as keyof ContactsData);
  };

  return (
    <section className={styles.contacts}>
      <h2>Заполните информацию о себе</h2>
      <div className={styles.contacts__form}>
        <Controller
          name="name"
          control={control}
          defaultValue=""
          rules={{ required: "Поле 'Имя' обязательно" }}
          render={({ field }) => (
            <input
              type="text"
              placeholder="Имя"
              {...field}
              onChange={(e) => {
                field.onChange(e);
                handleChange(e);
              }}
              onBlur={handleBlur}
            />
          )}
        />
        {errors.name && <p className={styles.error}>{errors.name.message}</p>}

        <Controller
          name="phone"
          control={control}
          defaultValue=""
          rules={{ required: "Поле 'Телефон' обязательно" }}
          render={({ field }) => (
            <input
              type="text"
              placeholder="Телефон"
              {...field}
              onChange={(e) => {
                field.onChange(e);
                handleChange(e);
              }}
              onBlur={handleBlur}
            />
          )}
        />
        {errors.phone && <p className={styles.error}>{errors.phone.message}</p>}

        <Controller
          name="email"
          control={control}
          defaultValue=""
          rules={{
            required: "Поле 'Почта' обязательно",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Неверный формат почты",
            },
          }}
          render={({ field }) => (
            <input
              type="text"
              placeholder="Почта"
              {...field}
              onChange={(e) => {
                field.onChange(e);
                handleChange(e);
              }}
              onBlur={handleBlur}
            />
          )}
        />
        {errors.email && <p className={styles.error}>{errors.email.message}</p>}
      </div>
    </section>
  );
};
