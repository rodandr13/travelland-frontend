"use client";

import { useRouter } from "next/navigation";

export const useSignOut = () => {
  const router = useRouter();

  return async () => {
    try {
      const response = await fetch("http://localhost:4000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        router.refresh();
      }
    } catch (error) {
      console.error("Ошибка при выходе из аккаунта:", error);
    }
  };
};
