import React from "react";

import { cookies } from "next/headers";

import { apiClient } from "@/src/shared/api";

import { Navbar } from "./navbar/";
import styles from "./styles.module.scss";

export const revalidate = "no-store";

export const Header = async () => {
  const accessToken = cookies().get("accessToken")?.value;

  const { email, id } = await apiClient("/auth/me", {
    method: "GET",
    headers: {
      Cookie: `accessToken=${accessToken}`,
    },
  });

  console.log(email, id);
  return (
    <header className={styles.header}>
      <div className={styles.header__topNav}>
        <div className={styles.header__topNavContainer}>
          {email}
          <p className={styles.header__contacts}>+429 725 841 086</p>
        </div>
      </div>
      <div className={styles.header__container}>
        <Navbar />
      </div>
    </header>
  );
};
