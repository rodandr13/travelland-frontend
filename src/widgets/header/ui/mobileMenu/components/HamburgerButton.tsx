"use client";

import { useEffect } from "react";

import clsx from "clsx";

import styles from "./styles.module.scss";

import sharedStyles from "@/src/shared/styles/styles.module.scss";

interface Props {
  open: () => void;
  opened: boolean;
}

export const HamburgerButton = ({ opened, open }: Props) => {
  const handleResize = () => {
    if (window.innerWidth >= 750 && opened) {
      document.body.classList.remove(sharedStyles.disableScroll);
      const pagePosition = parseInt(
        document.body.dataset.position != null
          ? document.body.dataset.position
          : "0",
        10
      );
      window.scrollTo(0, pagePosition);
      document.body.style.top = "";
      document.body.removeAttribute("data-position");
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [opened]);

  useEffect(() => {
    const body = document.body;
    if (opened) {
      const pagePosition = window.scrollY;
      body.dataset.position = pagePosition.toString();
      body.style.top = -pagePosition + "px";
      body.classList.add(sharedStyles.disableScroll);
    } else {
      body.style.top = "";
      body.classList.remove(sharedStyles.disableScroll);
      const pagePosition = parseInt(
        body.dataset.position != null ? body.dataset.position : "0",
        10
      );
      window.scrollTo(0, pagePosition);
      body.removeAttribute("data-position");
    }
  }, [opened]);

  return (
    <>
      <button
        className={clsx(
          styles.hamburger,
          opened
            ? styles.hamburger__button_type_close
            : styles.hamburger__button
        )}
        aria-label="Меню"
        type="button"
        onClick={open}
      >
        <span className={`${styles.hamburger__buttonLine}`} />
        <span className={`${styles.hamburger__buttonLine}`} />
        <span className={`${styles.hamburger__buttonLine}`} />
      </button>
    </>
  );
};
