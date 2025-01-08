import { Duration, StartTime } from "@/shared/types/excursion";

export const getEndTime = (startTime: StartTime, duration: Duration) => {
  const endTimes = [];
  for (const start of startTime) {
    let [hour, minute] = start.split(":").map(Number);
    hour += duration.hours;
    minute += duration.minutes;

    if (minute >= 60) {
      hour += Math.floor(minute / 60);
      minute = minute % 60;
    }

    const formattedHour = String(hour).padStart(2, "0");
    const formattedMinute = String(minute).padStart(2, "0");

    const endTime = `${formattedHour}:${formattedMinute}`;
    endTimes.push(endTime);
  }
  return endTimes;
};
