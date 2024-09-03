import { Input } from "@mantine/core";
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
  } = useFormContext<ContactsData>();

  return (
    <section className={styles.contacts}>
      <h2>Заполните информацию о себе</h2>
      <div className={styles.contacts__form}>
        <Controller
          name="name"
          control={control}
          defaultValue=""
          rules={{ required: "Имя обязательно" }}
          render={({ field }) => (
            <Input.Wrapper label="Имя" error={errors.name?.message}>
              <Input placeholder="Введите имя" {...field} />
            </Input.Wrapper>
          )}
        />

        <Controller
          name="phone"
          control={control}
          defaultValue=""
          rules={{ required: "Телефон обязателен" }}
          render={({ field }) => (
            <Input.Wrapper label="Телефон" error={errors.phone?.message}>
              <Input placeholder="Введите телефон" {...field} />
            </Input.Wrapper>
          )}
        />

        <Controller
          name="email"
          control={control}
          defaultValue=""
          rules={{
            required: "Почта обязательна",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i,
              message: "Неверный формат почты",
            },
          }}
          render={({ field }) => (
            <Input.Wrapper label="Почта" error={errors.email?.message}>
              <Input placeholder="Введите почту" {...field} />
            </Input.Wrapper>
          )}
        />
      </div>
    </section>
  );
};
