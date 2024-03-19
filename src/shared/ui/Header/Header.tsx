import styles from "./styles.module.scss";
import { ReactNode } from "react";

export const Header = ({ children }: { children: ReactNode }) => {
  return <header className={styles.header}>{children}</header>;
};
