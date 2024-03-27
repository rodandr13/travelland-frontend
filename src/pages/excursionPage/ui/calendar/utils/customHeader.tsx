interface Props {
  monthDate: Date;
  customHeaderCount: number;
  decreaseMonth: () => void;
  increaseMonth: () => void;
}

export const customHeader = ({
  monthDate,
  customHeaderCount,
  decreaseMonth,
  increaseMonth,
}: Props) => (
  <div>
    <button
      aria-label="Предыдущий месяц"
      className={
        "react-datepicker__navigation react-datepicker__navigation--previous"
      }
      style={customHeaderCount === 1 ? { visibility: "hidden" } : undefined}
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
      style={customHeaderCount === 0 ? { visibility: "hidden" } : undefined}
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
