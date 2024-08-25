import clsx from "clsx";

import styles from "./styles.module.scss";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  disabled?: boolean;
  onClick?: () => void;
  variant?: "confirm" | "booking" | "inline";
}

export const Button = ({ title, type, disabled, onClick, variant }: Props) => {
  return (
    <button
      className={clsx(styles.button, {
        [styles.button_addToCart]: variant === "confirm",
        [styles.button_booking]: variant === "booking",
        [styles.button_inline]: variant === "inline",
      })}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {title}
    </button>
  );
};
