import clsx from "clsx";
import styles from "./styles.module.scss";
import { useAppDispatch, useAppSelector } from "@/src/shared/lib/redux/hooks";
import { toggleMenu } from "@/src/widgets/header/model/menuSlice";

export const HamburgerButton = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.menu.isOpen);

  return (
    <button
      className={clsx(
        styles.hamburger,
        isOpen ? styles.hamburger__button_type_close : styles.hamburger__button
      )}
      aria-label="Меню"
      type="button"
      onClick={() => dispatch(toggleMenu())}
    >
      <span className={`${styles.hamburger__buttonLine}`} />
      <span className={`${styles.hamburger__buttonLine}`} />
      <span className={`${styles.hamburger__buttonLine}`} />
    </button>
  );
};
