"use client";

import { quizItemList } from "@/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";

export default function RedirectToRoot() {
  const defaultList = useRecoilValue(quizItemList);
  const router = useRouter();

  useEffect(() => {
    if (!defaultList.length) {
      router.replace("/");
    }
  }, []);

  return null;
}
