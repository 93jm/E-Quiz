"use client";

import { quizWrongList } from "@/store";
import { useRecoilValue } from "recoil";

export default function ResultContent() {
  const wrongList = useRecoilValue(quizWrongList);

  return <div>123</div>;
}
