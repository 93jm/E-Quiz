"use client";

import { NewQuiz, Quiz } from "@/model/quiz";
import { Fragment, MouseEvent, useEffect, useState } from "react";
import ActiveButton from "./ActiveButton";
import style from "./quizContent.module.css";
import { useRouter } from "next/navigation";

interface Props {
  data: Quiz[];
}

export default function QuizContent({ data = [] }: Props) {
  return <div>contents</div>;
}
