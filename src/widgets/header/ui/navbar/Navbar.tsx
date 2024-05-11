"use client";

import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

import { CompactCart } from "@/src/enities/cart";
import { useAppSelector } from "@/src/shared/lib/redux/hooks";
import { HamburgerButton } from "@/src/widgets/header/ui/navbar/ui";

import styles from "./styles.module.scss";

export const Navbar = () => {
  const isOpen = useAppSelector((state) => state.menu.isOpen);
  const links = [
    {
      title: "Экскурсии",
      path: "/#excursion",
    },
    {
      title: "О компании",
      path: "/#aboutUs",
    },
  ];

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
          <div className={styles.contacts}>
            <div className={styles.contacts__telephone}>
              <span className={styles.contacts__telephoneCode}>+429</span> 725
              841 086
            </div>
            <ul className={styles.contacts__social}>
              <li
                className={`${styles.contacts__socialItem} ${styles.contacts__telegram}`}
              >
                Telegram
              </li>
              <li
                className={`${styles.contacts__socialItem} ${styles.contacts__whatsapp}`}
              >
                WhatsApp
              </li>
            </ul>
          </div>
        </div>
        <HamburgerButton />
      </div>
    </div>
  );
};
