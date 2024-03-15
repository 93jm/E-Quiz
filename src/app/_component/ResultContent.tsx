"use client";

import { quizItemList, quizWrongList, resetQuizInformation } from "@/store";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { Fragment, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import { getTime } from "@/utils";
import style from "./resultContent.module.css";
import ICON_ARROW_BOTTOM from "/public/arrow-bottom.png";
import ICON_ARROW_TOP from "/public/arrow-top.png";
import ResultChart from "./ResultChart";

export default function ResultContent() {
  const router = useRouter();
  const wrongList = useRecoilValue(quizWrongList);
  const defaultList = useRecoilValue(quizItemList);
  const times = getTime();

  const resetWrongList = useResetRecoilState(resetQuizInformation);

  const [isOpenWrongList, setIsOpenWrongList] = useState(false);

  const moveToRoot = () => {
    resetWrongList();
    router.replace("/");
  };

  return (
    <>
      <div className={style.title}>
        You have completed <br /> 🎉 all the quizzes 🎉
      </div>
      <>
        {!defaultList.length || !wrongList.length ? (
          <div className={style.flexColumnWrapper}>
            <Skeleton height={200} />
            <Skeleton height={48} />
            <Skeleton height={48} />
          </div>
        ) : (
          <>
            <section className={style.chartWrapper}>
              <ResultChart />
            </section>
            <h4>{`Time : ${times[0] ?? 0}m ${times[1] ?? 0}s`}</h4>
            <h4>Total : 10</h4>
            <h4>{`Correct : ${defaultList.length - wrongList.length}`}</h4>
            <h4>{`Incorrect : ${wrongList.length}`}</h4>
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
          </>
        )}
      </>
      {isOpenWrongList && wrongList.length > 0 && (
        <div className={style.flexColumnWrapper}>
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
