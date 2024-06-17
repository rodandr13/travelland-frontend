import {
  Duration,
  StartTime,
} from "@/src/enities/excursion/model/types/ExcursionDetail";

export const getEndTime = (startTime: StartTime, duration: Duration) => {
  const endTimes = [];
  // const durationInMinutes =
  //   duration.days * 24 * 60 + duration.hours + duration.minutes;
  for (let start of startTime) {
    const [hour, minute] = start.split(":");
    const endTime = `${parseInt(hour, 10) + Math.floor(100 / 60)}:${minute}`;
    endTimes.push(endTime);
  }
  return endTimes;
};
