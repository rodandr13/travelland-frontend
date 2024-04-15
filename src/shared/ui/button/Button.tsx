import styles from "./styles.module.scss";
import clsx from "clsx";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  disabled?: boolean;
}

export const Button = ({ title, type, className, disabled }: Props) => {
  return (
    <button
      className={clsx(styles.button, className)}
      type={type}
      disabled={disabled}
    >
      {title}
    </button>
  );
};
