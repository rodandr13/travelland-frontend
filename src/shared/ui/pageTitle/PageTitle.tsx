import { ReactNode } from "react";

import styles from "./styles.module.scss";

interface Props {
  children: ReactNode;
}
export const PageTitle = ({ children }: Props) => {
  return <h1 className={styles.pageHeader}>{children}</h1>;
};
