import { LayoutProvider, QuizContent, RedirectToRoot } from "@/app/_component";

export default async function Quiz() {
  return (
    <LayoutProvider>
      <QuizContent />
      <RedirectToRoot />
    </LayoutProvider>
  );
}
