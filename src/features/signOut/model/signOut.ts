"use client";

import { useRouter } from "next/navigation";

import { useAuth } from "@/src/app/providers/AuthProvider";

export const useSignOut = () => {
  const router = useRouter();
  const { setAuthUser } = useAuth();

  return async () => {
    try {
      const response = await fetch("http://localhost:4000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        setAuthUser(null);
        router.replace("/");
      }
    } catch (error) {
      console.error("Ошибка при выходе из аккаунта:", error);
    }
  };
};
