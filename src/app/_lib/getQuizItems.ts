export async function getQuizItems() {
  const data = await fetch(
    "https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple"
  ).then((res) => res.json());

  return data;
}
