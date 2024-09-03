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
          rules={{
            required: "Имя обязательно",
            minLength: {
              value: 2,
              message: "Имя должно содержать минимум 2 символа",
            },
            maxLength: {
              value: 30,
              message: "Имя должно содержать не более 30 символов",
            },
          }}
          render={({ field }) => (
            <Input.Wrapper
              label="Имя"
              error={errors.name?.message}
              withAsterisk
            >
              <Input placeholder="Введите имя" {...field} />
            </Input.Wrapper>
          )}
        />

        <Controller
          name="phone"
          control={control}
          defaultValue=""
          rules={{
            required: "Телефон обязателен",
            minLength: {
              value: 6,
              message: "Телефон должен содержать минимум 6 символов",
            },
            maxLength: {
              value: 15,
              message: "Телефон должен содержать не более 15 символов",
            },
            pattern: {
              value: /^[\d\s()+-]+$/,
              message: "Неверный формат телефона",
            },
          }}
          render={({ field }) => (
            <Input.Wrapper
              label="Телефон"
              error={errors.phone?.message}
              withAsterisk
            >
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
            minLength: {
              value: 5,
              message: "Почта должна содержать минимум 5 символов",
            },
            maxLength: {
              value: 30,
              message: "Почта должна содержать не более 30 символов",
            },
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i,
              message: "Неверный формат почты",
            },
          }}
          render={({ field }) => (
            <Input.Wrapper
              label="Почта"
              error={errors.email?.message}
              withAsterisk
            >
              <Input placeholder="Введите почту" {...field} />
            </Input.Wrapper>
          )}
        />
      </div>
    </section>
  );
};
