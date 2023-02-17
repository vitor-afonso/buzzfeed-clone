interface QuizData {
  title: string;
  subtitle: string;
  quizId: string;
  content: Content[];
  answers: Answer[];
}

interface Answer {
  text: string;
  image: string;
  alt: string;
  combination: string[];
}

interface Content {
  id: number;
  text: string;
  questions: Question[];
}

interface Question {
  text: string;
  image: string;
  alt: string;
  credit: string;
}
interface StateTypes {
  quiz: QuizData;
  chosenAnswerItems: string[];
  unanswerdQuestionIds: number[];
}

export type { QuizData, Answer, Content, Question, StateTypes };
