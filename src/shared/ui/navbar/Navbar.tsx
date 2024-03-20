import styles from "./styles.module.scss";
import Link from "next/link";

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
      <div>Logo</div>
      <div>
        {links.map((link) => (
          <Link href={link.path} key={link.title}>
            {link.title}
          </Link>
        ))}
      </div>
      <div className={styles.pageSettings}>
        <ul className={styles.pageSettings__list}>
          <li className={`${styles.pageSettings__item} ${styles.language}`}>English</li>
          <li className={`${styles.pageSettings__item} ${styles.currency}`}>USD</li>
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
