"use client";

import { useSelectedLayoutSegment } from "next/navigation";
import styles from "./activeButton.module.css";
import Link from "next/link";

type TProps = "Main" | "Next" | "Score";

interface Props {
  type: TProps;
  btnDisabled?: boolean;
}

export default function ActiveButton({ type, btnDisabled = false }: Props) {
  const segment = useSelectedLayoutSegment();

  const text =
    type === "Main" ? "Start" : type === "Next" ? "Next" : "Check Score";

  if (type === "Next") {
    return (
      <button className={styles.button} disabled={btnDisabled}>
        {text}
      </button>
    );
  }

  return (
    <Link
      href={type === "Main" ? "/quiz" : "/result"}
      className={styles.button}
    >
      {text}
    </Link>
  );
}
