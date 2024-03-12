export interface Quiz {
  type: string;
  difficulty: string;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface NewQuiz extends Quiz {
  totalAnswer: string[];
}
