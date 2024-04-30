import styles from "./styles.module.scss";
import { Navbar } from "./navbar/";
import React from "react";

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <Navbar />
      </div>
    </header>
  );
};
