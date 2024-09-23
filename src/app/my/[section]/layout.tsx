import { ReactNode } from "react";

import { IconListDetails, IconUserScan } from "@tabler/icons-react";
import clsx from "clsx";
import Link from "next/link";

import styles from "./styles.module.scss";

interface LayoutProps {
  children: ReactNode;
  params: {
    section: string;
  };
}

const navData = [
  {
    link: "/my/profile",
    title: "Профиль",
    label: "profile",
    icon: IconUserScan,
  },
  {
    link: "/my/orders",
    title: "Мои заказы",
    label: "orders",
    icon: IconListDetails,
  },
];

export default function Layout({ children, params }: LayoutProps) {
  const currentSection = params.section;

  return (
    <section className={styles.layout}>
      <nav className={styles.navbar}>
        <div className={styles.navbarMain}>
          {navData.map((item) => {
            const isActive = currentSection === item.link.split("/").pop();

            return (
              <Link
                key={item.label}
                href={item.link}
                data-active={item.label === currentSection || undefined}
                className={clsx(styles.link, {
                  [styles.link_active]: isActive,
                })}
              >
                <item.icon className={styles.linkIcon} stroke={1.5} />
                <span>{item.title}</span>
              </Link>
            );
          })}
        </div>
      </nav>
      {children}
    </section>
  );
}
