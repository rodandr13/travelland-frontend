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
      {links.map((link) => (
        <Link href={link.path} key={link.title}>
          {link.title}
        </Link>
      ))}
    </div>
  );
};
