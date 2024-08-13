import clsx from "clsx";

import styles from "./styles.module.scss";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  disabled?: boolean;
  color?: "green" | "blue";
  onClick?: () => void;
  variant?: string;
}

export const Button = ({
  title,
  type,
  color,
  disabled,
  onClick,
  variant,
}: Props) => {
  return (
    <button
      className={clsx(styles.button, {
        [styles.button_green]: color === "green",
        [styles.button_addToCart]: variant === "add-to-cart",
        [styles.button_booking]: variant === "booking",
      })}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {title}
    </button>
  );
};
