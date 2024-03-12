"use client";

import {
  usePathname,
  useRouter,
  useSelectedLayoutSegment,
} from "next/navigation";
import styles from "./activeButton.module.css";
import { getGameEndTime, setStartTime } from "../utils/common";

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
  // const pathname = usePathname();
  const router = useRouter();
  const text =
    type === "Main" ? "Start" : type === "Next" ? "Next" : "Check Score";

  const startGame = () => {
    switch (type) {
      case "Main":
        setStartTime();
        router.push("/quiz");
        break;
      case "Next":
        onClick?.();
        break;
      case "Score":
        router.push("/result");
        getGameEndTime();
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
