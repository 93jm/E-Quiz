import { render } from "@testing-library/react";
import ResultContent from "../ResultContent";
import { RecoilRoot } from "recoil";
import { quizItemList, quizWrongList } from "../../../store/quiz";
import "@testing-library/jest-dom";

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      replace: () => null,
    };
  },
}));

//CommonJS 형식이 아닌 ECMAScript 형식인 ECharts를 가져오기 위해 수동으로 모킹을 해야함,,
jest.mock("echarts-for-react", () => {
  return {
    __esModule: true,
    default: jest.fn(),
  };
});

const correctData = [
  {
    question: "기본 질문 1",
    totalAnswer: ["A", "B", "C", "D"],
    correct_answer: "A",
  },
  {
    question: "기본 질문 2",
    totalAnswer: ["A", "B", "C", "D"],
    correct_answer: "A",
  },
];

const inCorrectData = [
  {
    question: "기본 질문 2",
    totalAnswer: ["A", "B", "C", "D"],
    correct_answer: "A",
    selectedAnswer: "B",
  },
];

describe("ResultContent", () => {
  it("ResultContent 렌더링시에 콘텐츠 영역이 뜨는가 ?", () => {
    const { getByTestId } = render(
      <RecoilRoot
        initializeState={(snapshot) => {
          snapshot.set(quizItemList, correctData);
          snapshot.set(quizWrongList, inCorrectData);
        }}
      >
        <ResultContent />
      </RecoilRoot>
    );
    const quizContentLoader = getByTestId("result-content");
    expect(quizContentLoader).toBeInTheDocument();
  });
});
