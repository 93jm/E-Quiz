export const setStartTime = () => {
  const startTime = new Date().getTime(); // 현재 시간을 밀리초로 가져옴
  sessionStorage.setItem("startTime", String(startTime));
};

export const getGameEndTime = () => {
  const startTime = sessionStorage.getItem("startTime");

  if (!startTime) {
    return;
  }

  const endTime = new Date().getTime(); // 현재 시간을 밀리초로 가져옴
  const milliSecound = endTime - Number(startTime); // 경과 시간 계산
  const minutes = Math.floor(milliSecound / (1000 * 60));
  const seconds = Math.floor((milliSecound % (1000 * 60)) / 1000);

  // 사용자에게 걸린 시간을 알림
  alert("퀴즈를 푸는 데 걸린 시간: " + minutes + "분" + seconds + "초");

  // 필요에 따라 세션 스토리지에서 시작 시간 데이터 삭제
  sessionStorage.removeItem("startTime");
};
