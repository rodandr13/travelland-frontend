import React from "react";

import { cookies } from "next/headers";

import { apiClient } from "@/src/shared/api";

import { Navbar } from "./navbar/";
import styles from "./styles.module.scss";

export const Header = async () => {
  const accessToken = cookies().get("accessToken")?.value;
  let user = null;

  if (accessToken) {
    try {
      user = await apiClient("/auth/me", {
        method: "GET",
        headers: {
          Cookie: `accessToken=${accessToken}`,
        },
      });
    } catch (error) {
      console.log("Ошибка получения данных пользователя:", error);
    }
  }

  return (
    <header className={styles.header}>
      <div className={styles.header__topNav}>
        <div className={styles.header__topNavContainer}>
          <p className={styles.header__contacts}>+429 725 841 086</p>
        </div>
      </div>
      <div className={styles.header__container}>
        <Navbar user={user} />
      </div>
    </header>
  );
};
