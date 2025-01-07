"use client";

import { Stack, TextInput } from "@mantine/core";
import { Controller, useFormContext } from "react-hook-form";

import { useAuth } from "@/src/app/providers/AuthProvider";

import styles from "../styles.module.scss";

type ContactsData = {
  name: string;
  phone: string;
  email: string;
};

const FIELDS = [
  {
    name: "name" as const,
    label: "Имя",
    placeholder: "Введите имя",
    authField: "first_name" as const,
  },
  {
    name: "phone" as const,
    label: "Телефон",
    placeholder: "Введите телефон",
    authField: "phone_number" as const,
  },
  {
    name: "email" as const,
    label: "Почта",
    placeholder: "Введите почту",
    authField: "email" as const,
  },
] as const;

export const Contacts = () => {
  const { authUser } = useAuth();
  const {
    control,
    formState: { errors },
  } = useFormContext<ContactsData>();

  return (
    <section className={styles.contacts}>
      <h2>Контактные данные</h2>
      <Stack gap="md" className={styles.contacts__form}>
        {FIELDS.map(({ name, label, placeholder, authField }) => (
          <Controller
            key={name}
            name={name}
            control={control}
            render={({ field }) => (
              <TextInput
                {...field}
                value={field.value || ""}
                label={label}
                placeholder={placeholder}
                error={errors[name]?.message}
                withAsterisk
                readOnly={Boolean(authUser?.[authField])}
                className={styles.input}
                radius="md"
                size="md"
                autoComplete={name === "email" ? "email" : "off"}
                type={name === "email" ? "email" : "text"}
              />
            )}
          />
        ))}
      </Stack>
    </section>
  );
};
