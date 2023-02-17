import { ACTION_TYPES } from './quizActionTypes';

export const INITIAL_STATE = {
  // initial state to be passed to reducer
  quiz: {},
  chosenAnswerItems: [],
  unanswerdQuestionIds: [],
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
    default:
      return state;
  }
};
