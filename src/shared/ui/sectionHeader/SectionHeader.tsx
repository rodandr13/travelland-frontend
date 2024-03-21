import { ReactNode } from "react";
import clsx from "clsx";
import styles from "./styles.module.scss";

export const SectionHeader = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return <h2 className={clsx(styles.sectionHeader, className)}>{children}</h2>;
};
