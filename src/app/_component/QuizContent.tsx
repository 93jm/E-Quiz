"use client";

import { Fragment, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import cx from "classnames";
import Skeleton from "react-loading-skeleton";
import { quizItemList, quizWrongList } from "@/store";
import ActiveButton from "./ActiveButton";
import style from "./quizContent.module.css";
import { quizStep } from "@/store/quiz";

export default function QuizContent() {
  const [isDisabled, setIsDisabled] = useState(true);
  const [btnChecked, setBtnChecked] = useState({
    idx: -1,
    text: "",
  });
  const [currentIdx, setCurrentIdx] = useRecoilState(quizStep);
  const quizList = useRecoilValue(quizItemList);
  const setQuizWrongList = useSetRecoilState(quizWrongList);

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

  const moveToNextStep = () => {
    //다음 문제로 이동시 틀린 문제였다면 오답노트 기록
    if (btnChecked.text !== quizList[currentIdx].correct_answer) {
      const selectedAnswer = btnChecked.text;
      setQuizWrongList((prev) => [
        ...prev,
        { ...quizList[currentIdx], selectedAnswer },
      ]);
    }

    //현재 퀴즈의 인덱스 체크 및 결과 페이지로 오픈 유무 체크
    if (currentIdx !== quizList.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    }

    //reset
    setIsDisabled(true);
    setBtnChecked({
      idx: -1,
      text: "",
    });
  };

  return (
    <>
      <h3>{`Quiz ${currentIdx + 1} / ${quizList.length}`}</h3>
      <div className={style.question}>
        {quizList.length > 0 ? (
          quizList[currentIdx]?.question
        ) : (
          <Skeleton width={"50%"} />
        )}
      </div>
      <div data-testid="quiz-content" className={style.answerListWrapper}>
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
        type={`${currentIdx === quizList.length - 1 ? "Score" : "Next"}`}
        btnDisabled={isDisabled}
        onClick={moveToNextStep}
      />
    </>
  );
}
