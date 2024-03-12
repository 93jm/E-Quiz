export async function getQuizItems() {
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_QUIZ}`).then((res) =>
    res.json()
  );

  return data;
}
