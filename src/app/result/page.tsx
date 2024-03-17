"use client";

import {
  LayoutProvider,
  ResultContent,
  RedirectToRoot,
} from "@/app/_component";

export default function Result() {
  return (
    <LayoutProvider>
      <ResultContent />
      <RedirectToRoot />
    </LayoutProvider>
  );
}
