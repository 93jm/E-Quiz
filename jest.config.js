const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  //테스트 실행 전에 실행할 파일을 지정
  setupFilesAfterEnv: ["./jest.setup.js"],
  //브라우저와 유사한 환경 설정
  testEnvironment: "jsdom",
};

// 두가지를 결합해서 최종 Jest 구성
module.exports = createJestConfig(customJestConfig);
