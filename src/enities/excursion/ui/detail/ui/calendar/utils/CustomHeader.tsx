interface Props {
  monthDate: Date;
  customHeaderCount: number;
  decreaseMonth: () => void;
  increaseMonth: () => void;
  monthShown: number;
}

export const CustomHeader = ({
  monthDate,
  customHeaderCount,
  decreaseMonth,
  increaseMonth,
  monthShown,
}: Props) => {
  const isSingleMonth = monthShown === 1;
  return (
    <div>
      <button
        aria-label="Предыдущий месяц"
        className={
          "react-datepicker__navigation react-datepicker__navigation--previous"
        }
        style={
          !isSingleMonth && customHeaderCount === 1
            ? { visibility: "hidden" }
            : undefined
        }
        onClick={decreaseMonth}
      >
        <span
          className={
            "react-datepicker__navigation-icon react-datepicker__navigation-icon--previous"
          }
        >
          {"<"}
        </span>
      </button>
      <div className="react-datepicker__current-month">
        <span className="react-datepicker__custom-month">
          {monthDate.toLocaleString("ru", { month: "long" })}
        </span>
        <span className="react-datepicker__custom-year">
          {monthDate.toLocaleString("ru", { year: "numeric" })}
        </span>
      </div>
      <button
        aria-label="Следующий месяц"
        className={
          "react-datepicker__navigation react-datepicker__navigation--next"
        }
        onClick={increaseMonth}
      >
        <span
          className={
            "react-datepicker__navigation-icon react-datepicker__navigation-icon--next"
          }
        >
          {">"}
        </span>
      </button>
    </div>
  );
};
