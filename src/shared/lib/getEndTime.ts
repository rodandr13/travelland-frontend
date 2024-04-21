export const getEndTime = (startTime: string[], duration: string) => {
  const endTimes = [];
  for (let start of startTime) {
    const [hour, minute] = start.split(":");
    const endTime = `${parseInt(hour, 10) + parseInt(duration, 10)}:${minute}`;
    endTimes.push(endTime);
  }
  return endTimes;
};
