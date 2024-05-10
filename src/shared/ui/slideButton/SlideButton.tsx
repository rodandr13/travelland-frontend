import React from "react";

import clsx from "clsx";

import styles from "./styles.module.scss";

interface Props {
  direction: "prev" | "next";
  disabled: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const SlideButton = ({ direction, disabled, onClick }: Props) => {
  const iconPath =
    direction === "prev"
      ? "M20 28 8.7 16.7a1 1 0 0 1 0-1.4L20 4"
      : "M12 4l11.3 11.3a1 1 0 0 1 0 1.4L12 28";

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={clsx(styles.slideButton, {
        [styles.slideButton_prev]: direction === "prev",
        [styles.slideButton_next]: direction === "next",
      })}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        aria-hidden="true"
        role="presentation"
        focusable="false"
        className={clsx({
          [styles.slideButton__prevIcon]: direction === "prev",
          [styles.slideButton__nextIcon]: direction === "next",
        })}
      >
        <path fill="none" d={iconPath}></path>
      </svg>
    </button>
  );
};

export default SlideButton;
