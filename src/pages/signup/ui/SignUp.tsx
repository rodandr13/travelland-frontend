"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Anchor,
  Button,
  Checkbox,
  Divider,
  Group,
  PasswordInput,
  Stack,
  TextInput,
} from "@mantine/core";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { apiClient } from "@/src/shared/api";
import { GoogleButton } from "@/src/shared/ui/googleButton";

import styles from "./styles.module.scss";

const schema = z.object({
  email: z.string().email("Некорректный формат email"),
  password: z.string().min(8, "Пароль должен быть не менее 8 символов"),
});

export const SignUp = () => {
  const router = useRouter();
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: any) => {
    const { terms, ...submitData } = data;

    try {
      const result = await apiClient("/auth/register", {
        method: "POST",
        body: JSON.stringify(submitData),
      });
      await router.replace("/");
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className={styles.registration}>
      <div className={styles.registration__container}>
        <h1 className={styles.registration__title}>Регистрация</h1>
        <form
          className={styles.registration__form}
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <Stack>
            <TextInput
              required
              label="Email"
              placeholder="info@traventico.com"
              {...register("email")}
              error={errors.email?.message}
              radius="md"
            />
            <PasswordInput
              required
              label="Пароль"
              placeholder="Ваш пароль"
              {...register("password")}
              error={errors.password?.message}
              radius="md"
            />
            <Checkbox
              label="Я принимаю условия обработки персональных данных и политику конфиденциальности"
              checked={isTermsAccepted}
              onChange={(event) =>
                setIsTermsAccepted(event.currentTarget.checked)
              }
            />
          </Stack>

          <Group justify="space-between" mt="xl">
            <Anchor component="button" type="button" c="dimmed" size="xs">
              Уже есть аккаунт? Войти
            </Anchor>
            <Button type="submit" radius="xl" disabled={!isTermsAccepted}>
              Регистрация
            </Button>
          </Group>
        </form>
        <Divider label="или" labelPosition="center" my="lg" />
        <Group grow mb="md" mt="md">
          <GoogleButton radius="xl">Google</GoogleButton>
        </Group>
      </div>
    </section>
  );
};
