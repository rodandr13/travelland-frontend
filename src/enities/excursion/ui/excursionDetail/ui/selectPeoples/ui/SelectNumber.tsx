import styles from "./styles.module.scss";

interface Props {
  onNumberChange: (value: number) => void;
  value: number;
}

export const SelectNumber = ({ value, onNumberChange }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
  };
  return (
    <div className={styles.selectNumber}>
      <select
        className={styles.selectNumber__select}
        onChange={(e) => onNumberChange(parseInt(e.target.value, 10))}
        name=""
        id=""
        value={value}
      >
        {Array.from(Array(10).keys()).map((_, i) => (
          <option key={i} value={i}>
            {i}
          </option>
        ))}
      </select>
    </div>
  );
};
