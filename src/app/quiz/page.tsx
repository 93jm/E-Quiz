import LayoutProvider from "../_component/LayoutProvider";
import QuizContent from "../_component/QuizContent";
import { getQuizItems } from "../_lib/getQuizItems";

export default async function Quiz() {
  const quizData = await getQuizItems();

  return (
    <LayoutProvider>
      <QuizContent data={quizData.results} />
    </LayoutProvider>
  );
}
