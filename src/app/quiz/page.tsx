import { LayoutProvider } from "@/app/_component";
import { QuizContent } from "@/app/_component";

export default async function Quiz() {
  return (
    <LayoutProvider>
      <QuizContent />
    </LayoutProvider>
  );
}
