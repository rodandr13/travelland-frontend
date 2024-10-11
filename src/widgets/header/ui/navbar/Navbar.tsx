"use client";

import { Avatar } from "@mantine/core";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

import { useAuth } from "@/src/app/providers/AuthProvider";
import { CompactCart } from "@/src/enities/cart";
import { useAppSelector } from "@/src/shared/lib/redux/hooks";
import { AccountButton } from "@/src/shared/ui/accountButton/AccountButton";
import { HamburgerButton } from "@/src/widgets/header/ui/navbar/ui";

import styles from "./styles.module.scss";

export const Navbar = () => {
  const { authUser } = useAuth();
  const isOpen = useAppSelector((state) => state.menu.isOpen);
  return (
    <div className={styles.navbar}>
      <div className={styles.navbar__logo}>
        <Link href="/">
          <Image
            src="/logo.png"
            width={173}
            height={44}
            alt="Logo"
            loading="eager"
          />
        </Link>
      </div>
      <div
        className={clsx(styles.navbar__container, {
          [styles.navbar__container_isOpen]: isOpen,
        })}
      >
        <div
          className={clsx(
            styles.navbar__containerMenu,
            styles.navbar__containerMenu_mobile,
            {
              [styles.navbar__containerMenu_isOpen]: isOpen,
            }
          )}
        >
          <div className={`${styles.navbar__menu} ${styles.menu}`}>
            {/*<ul className={styles.menu__list}>*/}
            {/*  {links.map((link) => (*/}
            {/*    <li className={styles.menu__item} key={link.title}>*/}
            {/*      <Link href={link.path} className={styles.menu__link}>*/}
            {/*        {link.title}*/}
            {/*      </Link>*/}
            {/*    </li>*/}
            {/*  ))}*/}
            {/*</ul>*/}
          </div>
          {/*<div*/}
          {/*  className={`${styles.navbar__pageSettings} ${styles.pageSettings}`}*/}
          {/*>*/}
          {/*  <ul className={styles.pageSettings__list}>*/}
          {/*    <li className={`${styles.pageSettings__item} ${styles.language}`}>*/}
          {/*      English*/}
          {/*    </li>*/}
          {/*    <li className={`${styles.pageSettings__item} ${styles.currency}`}>*/}
          {/*      USD*/}
          {/*    </li>*/}
          {/*  </ul>*/}
          {/*</div>*/}
          <div className={styles.navbar__cart}>
            <CompactCart />
          </div>
          <div>
            {authUser ? (
              <AccountButton user={authUser} />
            ) : (
              <div className={styles.navbar__account}>
                <Avatar
                  src={null}
                  alt=""
                  variant="transparent"
                  color="rgba(77, 77, 77, 1)"
                />
                <Link className={styles.navbar__accountLink} href="/signin">
                  Войти
                </Link>
              </div>
            )}
          </div>
        </div>
        <HamburgerButton />
      </div>
    </div>
  );
};
