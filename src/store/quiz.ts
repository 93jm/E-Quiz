import { getQuizItems } from "@/app/_lib";
import { NewQuiz, Quiz } from "@/model/quiz";
import { atom, selector } from "recoil";

interface WrongQuiz extends NewQuiz {
  selectedAnswer: string;
}

export const quizWrongList = atom<WrongQuiz[]>({
  default: [],
  key: "quiz-wrong-list",
});

export const quizListSelector = selector<NewQuiz[]>({
  key: "quiz-list",
  get: async () => {
    const data = await getQuizItems();
    const newResult = ((data.results as Quiz[]) || []).map((quiz) => ({
      ...quiz,
      totalAnswer: [...quiz.incorrect_answers, quiz.correct_answer].sort(
        () => Math.random() - 0.5
      ),
    }));
    return newResult;
  },
});
