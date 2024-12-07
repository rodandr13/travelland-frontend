import clsx from "clsx";

import styles from "../styles.module.scss";

interface Props {
  direction: "prev" | "next";
}

export const ArrowIcon = ({ direction }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      aria-hidden="true"
      role="presentation"
      focusable="false"
      className={clsx(styles.slideButton__icon)}
    >
      {direction === "prev" ? (
        <path fill="none" d="M20 28L8.7 16.7a1 1 0 0 1 0-1.4L20 4"></path>
      ) : (
        <path fill="none" d="M12 4L23.3 16.7a1 1 0 0 1 0 1.4L12 28"></path>
      )}
    </svg>
  );
};
