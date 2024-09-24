"use client";

import { Input } from "@mantine/core";
import { Controller, useFormContext } from "react-hook-form";

import { useAuth } from "@/src/app/providers/AuthProvider";

import styles from "../styles.module.scss";

type ContactsData = {
  name: string;
  phone: string;
  email: string;
};

export const Contacts = () => {
  const { authUser } = useAuth();
  const {
    control,
    formState: { errors },
  } = useFormContext<ContactsData>();

  return (
    <section className={styles.contacts}>
      <h2>Контактные данные</h2>
      <div className={styles.contacts__form}>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <Input.Wrapper
              label="Имя"
              error={errors.name?.message}
              withAsterisk
            >
              <Input
                placeholder="Введите имя"
                {...field}
                readOnly={Boolean(authUser?.first_name)}
                className={styles.input}
              />
            </Input.Wrapper>
          )}
        />

        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <Input.Wrapper
              label="Телефон"
              error={errors.phone?.message}
              withAsterisk
            >
              <Input
                placeholder="Введите телефон"
                {...field}
                readOnly={Boolean(authUser?.phone_number)}
                className={styles.input}
              />
            </Input.Wrapper>
          )}
        />

        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input.Wrapper
              label="Почта"
              error={errors.email?.message}
              withAsterisk
            >
              <Input
                placeholder="Введите почту"
                {...field}
                readOnly={Boolean(authUser?.email)}
                className={styles.input}
              />
            </Input.Wrapper>
          )}
        />
      </div>
    </section>
  );
};
