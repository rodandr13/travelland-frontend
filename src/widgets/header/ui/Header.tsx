import React from "react";

import { Navbar } from "./navbar/";
import styles from "./styles.module.scss";

interface Props {
  user: {
    first_name: string;
    id: number;
    email: string;
  };
}

export const Header = ({ user }: Props) => {
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
