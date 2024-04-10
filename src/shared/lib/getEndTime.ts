export const getEndTime = (startTime: string[], duration: number) => {
  const endTimes = [];
  for (let start of startTime) {
    const [hour, minute] = start.split(":");
    const endTime = `${parseInt(hour, 10) + duration}:${minute}`;
    endTimes.push(endTime);
  }
  return endTimes;
};
