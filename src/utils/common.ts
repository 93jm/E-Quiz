export const setTime = (type: "start" | "end") => {
  const time = new Date().getTime();
  sessionStorage.setItem(type, String(time));
};

export const getTime = () => {
  const start = sessionStorage.getItem("start");
  const end = sessionStorage.getItem("end");

  if (!start || !end) {
    return [];
  }

  const milliSecound = Number(end) - Number(start);
  const minutes = Math.floor(milliSecound / (1000 * 60));
  const seconds = Math.floor((milliSecound % (1000 * 60)) / 1000);

  return [minutes, seconds];
};
