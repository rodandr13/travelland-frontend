"use client";

import { Button } from "@mantine/core";

import { useSignOut } from "@/src/features/signOut/model/signOut";

export const SignOutButton = () => {
  const signOut = useSignOut();

  return <Button onClick={signOut}>Выйти</Button>;
};
