"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Checkbox,
  Divider,
  Group,
  PasswordInput,
  Stack,
  TextInput,
} from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { GoogleButton } from "@/src/shared/ui/googleButton";

import styles from "./styles.module.scss";

const schema = z
  .object({
    email: z.string().email("Некорректный формат email"),
    password: z.string().min(8, "Пароль должен быть не менее 8 символов"),
    firstName: z.string().min(2, "Имя должно быть не менее 2 символов"),
    confirmPassword: z.string(),
    isTermsAccepted: z.boolean().refine((val) => val, {
      message: "Необходимо принять условия",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });

interface FormData {
  email: string;
  firstName: string;
  password: string;
  confirmPassword: string;
  isTermsAccepted: boolean;
}

export const SignUp = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<FormData>({
    mode: "all",
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      confirmPassword: "",
      isTermsAccepted: false,
    },
  });

  const onSubmit = async (data: FormData) => {
    const { confirmPassword, isTermsAccepted, ...submitData } = data;
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:4000/api/auth/register", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(submitData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage =
          errorData.message || "Ошибка регистрации. Попробуйте снова.";
        throw new Error(errorMessage);
      }
      reset();
      await router.replace("/");
      router.refresh();
      setApiError("");
    } catch (error: any) {
      setApiError(error.message || "Произошла ошибка. Попробуйте снова.");
    } finally {
      setIsLoading(false);
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
            <TextInput
              required
              label="Имя"
              placeholder="Имя"
              {...register("firstName")}
              error={errors.firstName?.message}
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
            <PasswordInput
              required
              label="Повторите пароль"
              placeholder="Пароль еще раз"
              {...register("confirmPassword")}
              error={errors.confirmPassword?.message}
              radius="md"
            />
            <Checkbox
              label="Я принимаю условия обработки персональных данных и политику конфиденциальности"
              {...register("isTermsAccepted")}
              error={errors.isTermsAccepted && "Необходимо принять условия"}
            />
          </Stack>

          <Group justify="space-between" mt="xl">
            {apiError && (
              <p className={styles.registration__formError}>{apiError}</p>
            )}
            <p className={styles.registration__caption}>
              Уже есть аккаунт?{" "}
              <Link className={styles.registration__link} href={"/signin"}>
                Войти
              </Link>
            </p>
            <Button
              loading={isLoading}
              type="submit"
              radius="md"
              disabled={isLoading || !isValid}
            >
              Регистрация
            </Button>
          </Group>
        </form>
        <Divider label="или через соцсети" labelPosition="center" my="lg" />
        <Group grow mb="md" mt="md">
          <GoogleButton radius="xl">Google</GoogleButton>
        </Group>
      </div>
    </section>
  );
};
