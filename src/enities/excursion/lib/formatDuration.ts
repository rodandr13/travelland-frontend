import { Duration } from "../model/types/ExcursionDetail";

export const formatDuration = (duration: Duration): String => {
  const parts = [];
  if (duration.days !== 0) {
    parts.push(`${duration.days} дней`);
  }
  if (duration.hours !== 0) {
    parts.push(`${duration.hours} часов`);
  }
  if (duration.minutes !== 0) {
    parts.push(`${duration.minutes} минут`);
  }
  return parts.join(" ");
};
