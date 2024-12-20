import React from "react";

import { Navbar } from "./navbar";
import styles from "./styles.module.scss";

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__topNav}>
        <div className={styles.header__topNavContainer}>
          <p className={styles.header__contacts}>+429 725 841 086</p>
        </div>
      </div>
      <div className={styles.header__container}>
        <Navbar />
      </div>
    </header>
  );
};
