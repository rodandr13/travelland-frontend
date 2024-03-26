"use client";

import styles from "./styles.module.scss";
import { usePathname } from "next/navigation";
import { Navbar } from "./navbar/";
import { HeroSection } from "./heroSection";
import React from "react";

export const Header = () => {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    <header className={styles.header}>
      {isHomePage && (
        <HeroSection>
          <Navbar />
        </HeroSection>
      )}
      {!isHomePage && <Navbar />}
    </header>
  );
};
