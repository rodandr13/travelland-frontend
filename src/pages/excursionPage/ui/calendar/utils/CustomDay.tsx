import { getDate } from "date-fns";
import { isSelectableDate } from "./isSelectableDate";

export const CustomDay = (day: number, date: Date) => {
  const tooltipText = `Tooltip for date: ${date}`;
  const showPrice = isSelectableDate(date);
  return (
    <div className={`react-datepicker__priceContainer`} title={tooltipText}>
      <span className="react-datepicker__dayValue">{getDate(date)}</span>
      {showPrice && <span className="react-datepicker__price">€ 254.90</span>}
    </div>
  );
};
