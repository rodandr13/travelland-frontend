import styles from "./styles.module.scss";
import Link from "next/link";
import Image from "next/image";

export const Navbar = () => {
  const links = [
    {
      title: "Главная",
      path: "/",
    },
    {
      title: "Экскурсии",
      path: "/",
    },
    {
      title: "О компании",
      path: "/",
    },
  ];

  return (
    <div className={styles.navbar}>
      <div className={styles.navbar__logo}>
        <Link href="/">
          <Image src="/logo.png" width={173} height={44} alt="Logo" />
        </Link>
      </div>
      <div className={`${styles.navbar__menu} ${styles.menu}`}>
        <ul className={styles.menu__list}>
          {links.map((link) => (
            <li className={styles.menu__item} key={link.title}>
              <Link href={link.path} className={styles.menu__link}>
                {link.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className={`${styles.navbar__pageSettings} ${styles.pageSettings}`}>
        <ul className={styles.pageSettings__list}>
          <li className={`${styles.pageSettings__item} ${styles.language}`}>
            English
          </li>
          <li className={`${styles.pageSettings__item} ${styles.currency}`}>
            USD
          </li>
        </ul>
      </div>
      <div className={styles.contacts}>
        <div className={styles.contacts__telephone}>
          <span className={styles.contacts__telephoneCode}>+429</span> 725 841
          086
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
  );
};
