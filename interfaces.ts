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
  quiz: QuizData | null;
  chosenAnswerItems: string[];
  unanswerdQuestionIds: number[];
  showAnswer: boolean;
  result: Answer | null;
}
interface ActionTypes {
  type: string;
  payload: string | string[] | boolean;
}

export type { QuizData, Answer, Content, Question, StateTypes, ActionTypes };
