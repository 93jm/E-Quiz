import { NewQuiz } from "@/model/quiz";
import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

interface WrongQuiz extends NewQuiz {
  selectedAnswer: string;
}

const sessionStorage =
  typeof window !== "undefined" ? window.sessionStorage : undefined;

const { persistAtom } = recoilPersist({
  key: "sessionStorage",
  storage: sessionStorage,
});

export const quizItemList = atom<NewQuiz[]>({
  default: [],
  key: "quiz-list",
  effects_UNSTABLE: [persistAtom],
});

export const quizWrongList = atom<WrongQuiz[]>({
  default: [],
  key: "quiz-wrong-list",
  effects_UNSTABLE: [persistAtom],
});

export const resetQuizInformation = selector({
  key: "reset-quiz-information",
  get: () => undefined,
  set: ({ reset }) => {
    reset(quizItemList);
    reset(quizWrongList);
  },
});
