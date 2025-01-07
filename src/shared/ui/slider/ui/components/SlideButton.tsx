import { ButtonHTMLAttributes } from "react";

import clsx from "clsx";

import { ArrowIcon } from "@/src/shared/ui/slider/ui/components/ArrowIcon";

import styles from "../styles.module.scss";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  direction: "prev" | "next";
  ariaLabel: string;
}

export const SlideButton = ({ direction, ariaLabel, ...otherProps }: Props) => {
  return (
    <button
      type="button"
      className={clsx(styles.slideButton, {
        [styles.slideButton_prev]: direction === "prev",
        [styles.slideButton_next]: direction === "next",
      })}
      aria-label={ariaLabel}
      {...otherProps}
    >
      <ArrowIcon direction={direction} />
    </button>
  );
};
