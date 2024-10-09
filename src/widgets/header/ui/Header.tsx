import React from "react";

import { cookies } from "next/headers";

import { apiClient } from "@/src/shared/api";
import { ApiError } from "@/src/shared/api/apiClient";
import {
  AUTH_ENDPOINTS,
  EXTERNAL_API_BASE_URL,
} from "@/src/shared/lib/constants";

import { Navbar } from "./navbar/";
import styles from "./styles.module.scss";

type UserResponse = {
  first_name: string;
  id: number;
  email: string;
  phone_number: string;
};

export const Header = async () => {
  console.log("RENDER HEADER");
  const accessToken = cookies().get("accessToken")?.value;
  let user = null;
  if (accessToken) {
    try {
      const url = `${EXTERNAL_API_BASE_URL}${AUTH_ENDPOINTS.ME}`;
      user = await apiClient<UserResponse>(url, {
        credentials: "include",
        headers: {
          Cookie: `accessToken=${accessToken}`,
        },
      });
    } catch (error: any) {
      user = null;
      if (error instanceof ApiError) {
        console.error(
          `API Error: ${error.message} (Status: ${error.statusCode})`,
          error.data
        );
      } else {
        console.error("Unexpected Error:", error);
      }
      throw error;
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
