import React from "react";

import { Navbar } from "./navbar/";
import styles from "./styles.module.scss";

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <Navbar />
      </div>
    </header>
  );
};
