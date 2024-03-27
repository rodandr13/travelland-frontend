export const customHeader = ({
  monthDate,
  customHeaderCount,
  decreaseMonth,
  increaseMonth,
}) => (
  <div>
    <button
      aria-label="Previous Month"
      className={
        "react-datepicker__navigation react-datepicker__navigation--previous"
      }
      style={customHeaderCount === 1 ? { visibility: "hidden" } : null}
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
        {monthDate.toLocaleString("ru-RU", { month: "long" })}
      </span>
      <span className="react-datepicker__custom-year">
        {monthDate.toLocaleString("ru-RU", { year: "numeric" })}
      </span>
    </div>
    <button
      aria-label="Next Month"
      className={
        "react-datepicker__navigation react-datepicker__navigation--next"
      }
      style={customHeaderCount === 0 ? { visibility: "hidden" } : null}
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
