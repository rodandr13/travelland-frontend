"use client";

import { useRouter } from "next/navigation";

import { useAuth } from "@/src/app/providers/AuthProvider";

export const useSignOut = () => {
  const auth = useAuth();
  const router = useRouter();

  return async () => {
    try {
      const response = await fetch("http://localhost:4000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        auth.setUser(null);
        router.replace("/");
        router.refresh();
      }
    } catch (error) {
      console.error("Ошибка при выходе из аккаунта:", error);
    }
  };
};
