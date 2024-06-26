import clsx from "clsx";

import styles from "./styles.module.scss";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  disabled?: boolean;
  color?: "green" | "blue";
  onClick?: () => void;
}

export const Button = ({ title, type, color, disabled, onClick }: Props) => {
  return (
    <button
      className={clsx(styles.button, {
        [styles.button_green]: color === "green",
      })}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {title}
    </button>
  );
};
