"use client";

import { Button } from "@mantine/core";
import { useRouter } from "next/navigation";

import { useAuth } from "@/src/app/providers/AuthProvider";

export const SignOut = () => {
  const auth = useAuth();
  const router = useRouter();

  const handleClick = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        auth.setUser(null);
        await router.replace("/");
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return <Button onClick={handleClick}>Выйти</Button>;
};
