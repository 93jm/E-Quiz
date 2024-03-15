"use client";

import { useRouter } from "next/navigation";
import { setTime } from "@/utils";
import styles from "./activeButton.module.css";
import { useResetRecoilState, useSetRecoilState } from "recoil";
import { quizItemList, resetQuizInformation } from "@/store/quiz";
import { Quiz } from "@/model/quiz";

type TProps = "Main" | "Next" | "Score";

interface Props {
  type: TProps;
  btnDisabled?: boolean;
  onClick?: () => void;
}

export default function ActiveButton({
  type,
  btnDisabled = false,
  onClick,
}: Props) {
  const setQuizList = useSetRecoilState(quizItemList);
  const resetQuiz = useResetRecoilState(resetQuizInformation);

  const router = useRouter();

  const handleFetch = async () => {
    const data = await fetch(`${process.env.NEXT_PUBLIC_API_QUIZ}`).then(
      (res) => res.json()
    );

    const newResult = ((data.results as Quiz[]) || []).map((quiz) => ({
      ...quiz,
      totalAnswer: [...quiz.incorrect_answers, quiz.correct_answer].sort(
        () => Math.random() - 0.5
      ),
    }));

    setQuizList(newResult);
  };

  const text =
    type === "Main" ? "Start" : type === "Next" ? "Next" : "Check Score";

  const startGame = () => {
    switch (type) {
      case "Main":
        resetQuiz();
        setTime("start");
        handleFetch();
        router.push("/quiz");
        break;
      case "Next":
        onClick?.();
        break;
      case "Score":
        setTime("end");
        onClick?.();
        router.replace("/result");
    }
  };

  return (
    <button
      className={styles.button}
      disabled={btnDisabled}
      onClick={startGame}
    >
      {text}
    </button>
  );
}
