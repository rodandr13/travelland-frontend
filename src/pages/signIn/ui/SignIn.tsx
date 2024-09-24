"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Divider,
  Group,
  PasswordInput,
  TextInput,
} from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { useAuth } from "@/src/app/providers/AuthProvider";
import { GoogleButton } from "@/src/shared/ui/googleButton";

import styles from "./styles.module.scss";

const schema = z.object({
  email: z.string().email("Некорректный формат email"),
  password: z.string().min(8, "Пароль должен быть не менее 8 символов"),
});

interface FormData {
  email: string;
  password: string;
}

export const SignIn = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const { setAuthUser } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    const { ...submitData } = data;
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:4000/api/auth/login", {
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
          errorData.message || "Ошибка авторизации. Попробуйте снова.";
        throw new Error(errorMessage);
      }
      const data = await response.json();
      setAuthUser(data);
      reset();
      router.replace("/");
    } catch (error: any) {
      setApiError(error.message || "Ошибка авторизации. Попробуйте снова.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className={styles.registration}>
      <div className={styles.registration__container}>
        <h1 className={styles.registration__title}>Вход в аккаунт</h1>
        <form
          className={styles.registration__form}
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
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
          <Link
            className={styles.registration__forgottenPassword}
            href="/signin"
          >
            Забыли пароль?
          </Link>

          <Group justify="space-between" mt="xl">
            {apiError && (
              <p className={styles.registration__formError}>{apiError}</p>
            )}
            <p className={styles.registration__caption}>
              У вас нет аккаунта?{" "}
              <Link className={styles.registration__link} href={"/signup"}>
                Регистрация
              </Link>
            </p>
            <Button
              loading={isLoading}
              type="submit"
              radius="md"
              disabled={isLoading || !isValid}
            >
              Войти
            </Button>
          </Group>
        </form>
        <Divider label="или через соцсети" labelPosition="center" my="lg" />
        <Group grow mb="md" mt="md">
          <GoogleButton radius="md">Google</GoogleButton>
        </Group>
      </div>
    </section>
  );
};
