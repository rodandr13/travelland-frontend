"use client";

import { useEffect } from "react";

import clsx from "clsx";

import { useAppDispatch, useAppSelector } from "@/src/shared/lib/redux/hooks";
import sharedStyles from "@/src/shared/styles/styles.module.scss";
import { toggleMenu } from "@/src/widgets/header/model/menuSlice";

import styles from "./styles.module.scss";

export const HamburgerButton = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.menu.isOpen);

  const handleResize = () => {
    if (window.innerWidth >= 750 && isOpen) {
      dispatch(toggleMenu());
      document.body.classList.remove(sharedStyles.disableScroll);
      const pagePosition = parseInt(document.body.dataset.position || "0", 10);
      window.scrollTo(0, pagePosition);
      document.body.style.top = "";
      document.body.removeAttribute("data-position");
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen]);

  useEffect(() => {
    const body = document.body;
    if (isOpen) {
      const pagePosition = window.scrollY;
      body.dataset.position = pagePosition.toString();
      body.style.top = -pagePosition + "px";
      body.classList.add(sharedStyles.disableScroll);
    } else {
      body.style.top = "";
      body.classList.remove(sharedStyles.disableScroll);
      const pagePosition = parseInt(body.dataset.position || "0", 10);
      window.scrollTo(0, pagePosition);
      body.removeAttribute("data-position");
    }
  }, [isOpen]);

  const handleClick = () => {
    dispatch(toggleMenu());
  };
  return (
    <button
      className={clsx(
        styles.hamburger,
        isOpen ? styles.hamburger__button_type_close : styles.hamburger__button
      )}
      aria-label="Меню"
      type="button"
      onClick={handleClick}
    >
      <span className={`${styles.hamburger__buttonLine}`} />
      <span className={`${styles.hamburger__buttonLine}`} />
      <span className={`${styles.hamburger__buttonLine}`} />
    </button>
  );
};
