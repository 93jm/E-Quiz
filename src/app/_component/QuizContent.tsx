"use client";

import { NewQuiz, Quiz } from "@/model/quiz";
import { Fragment, useEffect, useState } from "react";
import ActiveButton from "./ActiveButton";
import style from "./quizContent.module.css";
import { useRouter } from "next/navigation";
import cx from "classnames";
import Skeleton from "react-loading-skeleton";

interface Props {
  data: Quiz[];
}

export default function QuizContent({ data = [] }: Props) {
  const router = useRouter();

  const [quizList, setQuizList] = useState<NewQuiz[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isDisabled, setIsDisabled] = useState(true);
  const [btnChecked, setBtnChecked] = useState({
    idx: -1,
    text: "",
  });
  const [result, setResult] = useState([]);

  const handleAnswerClick = (answer: string, idx: number) => {
    if (btnChecked.idx !== -1) {
      return;
    }
    //버튼 누르면 next 버튼 열리면서 누른 버튼 인덱스 주입
    setIsDisabled(false);
    setBtnChecked({
      idx,
      text: answer,
    });
  };

  const getNextItem = () => {
    //다음 문제로 이동시 틀린 문제였다면 오답노트 기록
    if (btnChecked.text !== quizList[currentIdx].correct_answer) {
      console.log(" >> ", quizList[currentIdx]);
    }

    //현재 퀴즈의 인덱스 체크 및 결과 페이지로 오픈 유무 체크
    if (currentIdx !== data.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      setCurrentIdx(0);
    }

    //reset
    setIsDisabled(true);
    setBtnChecked({
      idx: -1,
      text: "",
    });
    // setbuttonCheckIdx(-1);
  };

  useEffect(() => {
    if (!data.length) {
      router.replace("/");
    } else {
      const newData = data.map((quiz) => ({
        ...quiz,
        totalAnswer: [...quiz.incorrect_answers, quiz.correct_answer].sort(
          () => Math.random() - 0.5
        ),
      }));
      setQuizList(newData);
    }
  }, [data]);

  return (
    <>
      <h3>{`Quiz ${currentIdx + 1} / ${data.length}`}</h3>
      <div className={style.question}>
        {quizList.length > 0 ? (
          quizList[currentIdx]?.question
        ) : (
          <Skeleton width={"50%"} />
        )}
      </div>
      <div className={style.answerListWrapper}>
        {quizList.length > 0
          ? quizList[currentIdx]?.totalAnswer.map((item, idx) => {
              const correct = quizList[currentIdx]?.correct_answer;
              //next 버튼 disabled가 풀리고 체크한 버튼일 경우에
              const isValid = !isDisabled && btnChecked.idx === idx;

              return (
                <Fragment key={idx}>
                  <button
                    className={cx(
                      style.answerButton,
                      //정답을 눌렀을때
                      isValid &&
                        correct === btnChecked.text &&
                        style.answerButtonExcellent,
                      //오답을 눌렀을때
                      isValid &&
                        correct !== btnChecked.text &&
                        style.answerButtonWrong
                    )}
                    onClick={() => handleAnswerClick(item, idx)}
                    disabled={!isDisabled && btnChecked.idx !== idx}
                  >{`${idx + 1}. ${item}`}</button>
                </Fragment>
              );
            })
          : Array(4)
              .fill("")
              .map((_, idx) => (
                <Fragment key={idx}>
                  <Skeleton height={48} />
                </Fragment>
              ))}
      </div>
      <ActiveButton
        type={`${currentIdx === data.length - 1 ? "Score" : "Next"}`}
        btnDisabled={isDisabled}
        onClick={getNextItem}
      />
    </>
  );
}