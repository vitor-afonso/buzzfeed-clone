import { StateTypes } from '../interfaces';
import { ACTION_TYPES } from './quizActionTypes';

export const INITIAL_STATE = {
  quiz: {},
  chosenAnswerItems: [],
  unanswerdQuestionIds: [],
  showAnswer: false,
  result: {},
};

export const quizReducer = (state: any, action: any) => {
  switch (action.type) {
    case ACTION_TYPES.FETCH_QUIZ:
      return { ...state, quiz: action.payload };
    case ACTION_TYPES.ANSWER_ITEM:
      return {
        ...state,
        chosenAnswerItems: [...state.chosenAnswerItems, action.payload],
      };
    case ACTION_TYPES.UNANSWERD_QUESTION_ID:
      return {
        ...state,
        unanswerdQuestionIds: action.payload,
      };
    case ACTION_TYPES.SHOW_ANSWER:
      return {
        ...state,
        showAnswer: action.payload,
      };
    case ACTION_TYPES.RESULT:
      console.log('state.result => ', { result: action.payload });
      return {
        ...state,
        result: action.payload,
      };
    default:
      return state;
  }
};
