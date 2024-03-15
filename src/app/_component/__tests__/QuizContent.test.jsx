import { render, screen, fireEvent } from "@testing-library/react";
import QuizContent from "../QuizContent";
import { RecoilRoot } from "recoil";
import { quizItemList } from "../../../store/quiz";
import "@testing-library/jest-dom";

//useRouter를 jest에 모킹을 해야함
jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      replace: () => null,
    };
  },
}));

const initialData = [
  {
    question: "테스트 질문",
    totalAnswer: ["A", "B", "C", "D"],
    correct_answer: "A",
  },
];

describe("QuizContent", () => {
  it("QuizContent 렌더링시에 콘텐츠 영역이 뜨는가 ?", () => {
    render(
      <RecoilRoot>
        <QuizContent />
      </RecoilRoot>
    );

    const quizContentLoader = screen.getByTestId("quiz-content");

    expect(quizContentLoader).toBeInTheDocument();
  });

  it("퀴즈 리스트가 있을 경우 퀴즈 질문이 정상적으로 렌더링 되는가 ?", () => {
    const { getByText } = render(
      <RecoilRoot
        initializeState={(snapshot) => snapshot.set(quizItemList, initialData)}
      >
        <QuizContent />
      </RecoilRoot>
    );
    expect(getByText("테스트 질문")).toBeInTheDocument();
  });

  it("퀴즈 정답을 클릭할때에 문구 스타일 정상 변경되는지 확인", () => {
    const { getByText } = render(
      <RecoilRoot
        initializeState={(snapshot) => snapshot.set(quizItemList, initialData)}
      >
        <QuizContent />
      </RecoilRoot>
    );
    fireEvent.click(getByText("1. A"));
    expect(getByText("1. A").classList.contains("answerButtonExcellent")).toBe(
      true
    );
  });

  it("퀴즈 오답을 클릭할때에 문구 스타일 정상 변경되는지 확인", () => {
    const { getByText } = render(
      <RecoilRoot
        initializeState={(snapshot) => snapshot.set(quizItemList, initialData)}
      >
        <QuizContent />
      </RecoilRoot>
    );
    fireEvent.click(getByText("2. B"));
    expect(getByText("2. B").classList.contains("answerButtonWrong")).toBe(
      true
    );
  });

  it("퀴즈 마지막 문제를 답했을때에 액티브 버튼 문구 Score로 변경되는지 체크", () => {
    const { getByText } = render(
      <RecoilRoot
        initializeState={(snapshot) => snapshot.set(quizItemList, initialData)}
      >
        <QuizContent />
      </RecoilRoot>
    );
    fireEvent.click(getByText("1. A"));
    expect(getByText("Check Score")).toBeInTheDocument(); // Next question rendered
  });
});
