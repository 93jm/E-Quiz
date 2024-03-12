"use client";

import { quizListSelector, quizWrongList } from "@/store";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { Fragment, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import style from "./resultContent.module.css";
import ICON_ARROW_BOTTOM from "/public/arrow-bottom.png";
import ICON_ARROW_TOP from "/public/arrow-top.png";

export default function ResultContent() {
  const router = useRouter();
  const wrongList = useRecoilValue(quizWrongList);
  const defaultList = useRecoilValue(quizListSelector);

  const resetWrongList = useResetRecoilState(quizWrongList);

  const [isOpenWrongList, setIsOpenWrongList] = useState(false);

  const moveToRoot = () => {
    resetWrongList();
    router.replace("/");
  };

  console.log(
    "맞춘 문제 >> ",
    defaultList.length - wrongList.length,
    "틀린 갯수 >> ",
    wrongList.length
  );
  return (
    <>
      <div className={style.title}>
        You have completed <br /> 🎉 all the quizzes 🎉
      </div>
      <section className={style.chartWrapper}>차트</section>
      <button
        className={style.basicButton}
        onClick={moveToRoot}
        style={{ color: "#00c896" }}
      >
        Retry
      </button>
      <button
        className={style.basicButton}
        onClick={() => setIsOpenWrongList(!isOpenWrongList)}
      >
        <Image
          src={isOpenWrongList ? ICON_ARROW_TOP : ICON_ARROW_BOTTOM}
          alt="icon_arrow"
          width={20}
          height={20}
          style={{ marginRight: 15 }}
        />
        Check incorrect answers
        <Image
          src={isOpenWrongList ? ICON_ARROW_TOP : ICON_ARROW_BOTTOM}
          alt="icon_arrow"
          width={20}
          height={20}
          style={{ marginLeft: 15 }}
        />
      </button>
      {isOpenWrongList && wrongList.length > 0 && (
        <div className={style.wrongWrapper}>
          {wrongList.map((quiz, idx) => {
            return (
              <Fragment key={idx}>
                <div className={style.wrongCard}>
                  <p>{quiz.question}</p>
                  {quiz.totalAnswer.map((answer, answerIdx) => (
                    <div
                      key={answerIdx}
                      className={
                        answer === quiz.correct_answer
                          ? style.correctAnswer
                          : answer === quiz.selectedAnswer
                          ? style.wrongAnswer
                          : style.answer
                      }
                    >
                      {answer}
                    </div>
                  ))}
                </div>
              </Fragment>
            );
          })}
        </div>
      )}
    </>
  );
}
