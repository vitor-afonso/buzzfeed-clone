import React, { useReducer } from 'react';
import { Question, StateTypes } from '../../interfaces';
import { ACTION_TYPES } from '../quizActionTypes';

const QuestionBlock = ({ question, quizItemId, state, dispatch }: { question: Question; quizItemId: number; state: StateTypes; dispatch: Function }) => {
  const handleClick = () => {
    dispatch({ type: ACTION_TYPES.ANSWER_ITEM, payload: question.text });
    dispatch({ type: ACTION_TYPES.UNANSWERD_QUESTION_ID, payload: state.unanswerdQuestionIds.filter((id: number) => id !== quizItemId) });
  };

  const validPick = !state.unanswerdQuestionIds?.includes(quizItemId);

  return (
    <button className='question-block' onClick={handleClick} disabled={validPick}>
      <img src={question.image} alt={question.alt} height='286' />
      <h3>{question.text}</h3>
      <p>
        <a href={question.image}>{question.credit} </a>
        <a href='https://www.unsplash.com'>Unsplash</a>
      </p>
    </button>
  );
};

export default QuestionBlock;
