import styles from "./styles.module.scss";
import clsx from "clsx";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
}

export const Button = ({ title, type, className }: Props) => {
  return (
    <button className={clsx(styles.button, className)} type={type}>
      {title}
    </button>
  );
};
