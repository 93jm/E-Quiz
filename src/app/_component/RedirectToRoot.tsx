"use client";

import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { useRouter } from "next/navigation";
import { quizItemList } from "@/store";

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
