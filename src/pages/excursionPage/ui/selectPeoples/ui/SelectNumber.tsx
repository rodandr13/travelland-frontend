import styles from "./styles.module.scss";

export const SelectNumber = () => {
  return (
    <div className={styles.selectNumber}>
      <select className={styles.selectNumber__select} name="" id="">
        {Array.from(Array(10).keys()).map((_, i) => (
          <option key={i} value={i}>
            {i}
          </option>
        ))}
      </select>
    </div>
  );
};
