import styles from "../styles.module.scss";

export const EditItem = () => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  return (
    <button
      className={styles.detailedCart__editItem}
      type="button"
      onClick={handleClick}
    >
      <span>Изменить</span>
    </button>
  );
};
